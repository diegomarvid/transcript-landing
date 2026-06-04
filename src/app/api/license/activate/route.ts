import { NextResponse, type NextRequest } from "next/server";
import { assertLicenseConfig } from "@/lib/license/config";
import { activatePolarLicense } from "@/lib/license/polar";
import { activateLicenseSchema } from "@/lib/license/schema";
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
    const snapshot = await activatePolarLicense({
      accessToken: config.polarAccessToken,
      organizationId: config.polarOrganizationId,
      licenseKey: parsed.data.licenseKey,
      label: deviceLabel(parsed.data.device),
      meta: deviceMeta(parsed.data.device),
    });

    return NextResponse.json(
      createLicenseResponse(snapshot, parsed.data.device),
    );
  } catch (error) {
    return handleLicenseError(error);
  }
}
