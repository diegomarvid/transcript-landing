import { NextResponse, type NextRequest } from "next/server";
import { assertLicenseConfig } from "@/lib/license/config";
import {
  activatePolarLicense,
  deactivatePolarLicense,
  findPolarActivationIdForDevice,
  PolarLicenseError,
  type ActivateLicenseInput,
  type PolarLicenseSnapshot,
} from "@/lib/license/polar";
import { checkLicenseRateLimit } from "@/lib/license/rate-limit";
import { activateLicenseSchema } from "@/lib/license/schema";
import type { LicenseDevice } from "@/lib/license/schema";
import {
  createLicenseResponse,
  deviceLabel,
  deviceMeta,
  handleLicenseError,
  jsonError,
} from "@/lib/license/service";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const rateLimitResponse = checkLicenseRateLimit(request, "activate");
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    const body = await request.json().catch(() => null);
    const parsed = activateLicenseSchema.safeParse(body);

    if (!parsed.success) {
      return jsonError(
        "bad_request",
        "Invalid license activation request.",
        400,
        parsed.error.flatten(),
      );
    }

    const config = assertLicenseConfig();
    const activationInput: ActivateLicenseInput = {
      accessToken: config.polarAccessToken,
      organizationId: config.polarOrganizationId,
      licenseKey: parsed.data.licenseKey,
      label: deviceLabel(parsed.data.device),
      meta: deviceMeta(parsed.data.device),
    };

    let snapshot: PolarLicenseSnapshot;
    try {
      snapshot = await activatePolarLicense(activationInput);
    } catch (error) {
      const recovered = await reactivateSameDevice(
        error,
        config.polarBenefitId,
        activationInput,
        parsed.data.device,
      );
      if (!recovered) {
        throw error;
      }
      snapshot = recovered;
    }

    return NextResponse.json(
      createLicenseResponse(snapshot, parsed.data.device),
    );
  } catch (error) {
    return handleLicenseError(error);
  }
}

/// A Mac that lost its local license record (reinstall, keychain reset,
/// "Reset local license" in the app) still owns its Polar activation slot, so
/// re-activating hits the 1-Mac limit with no self-serve way out. When the
/// stale activation was created by this same device, releasing it and
/// activating again keeps the limit honest while unblocking the owner. Any
/// failure here surfaces the original activation_limit_reached instead.
async function reactivateSameDevice(
  error: unknown,
  benefitId: string,
  activationInput: ActivateLicenseInput,
  device: LicenseDevice,
): Promise<PolarLicenseSnapshot | null> {
  if (
    !(error instanceof PolarLicenseError) ||
    error.code !== "activation_limit_reached"
  ) {
    return null;
  }

  try {
    const staleActivationId = await findPolarActivationIdForDevice({
      accessToken: activationInput.accessToken,
      organizationId: activationInput.organizationId,
      benefitId,
      licenseKey: activationInput.licenseKey,
      deviceId: device.id,
    });

    if (!staleActivationId) {
      console.info("license.activation_limit_other_device", {
        platform: device.platform,
      });
      return null;
    }

    await deactivatePolarLicense({
      accessToken: activationInput.accessToken,
      organizationId: activationInput.organizationId,
      licenseKey: activationInput.licenseKey,
      activationId: staleActivationId,
    });

    const snapshot = await activatePolarLicense(activationInput);

    console.info("license.same_device_reactivated", {
      licenseId: snapshot.licenseId,
      platform: device.platform,
    });

    return snapshot;
  } catch (recoveryError) {
    console.warn("license.same_device_reactivation_failed", {
      code:
        recoveryError instanceof PolarLicenseError
          ? recoveryError.code
          : "unhandled",
    });
    return null;
  }
}
