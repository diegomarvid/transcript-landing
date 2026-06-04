import { NextResponse, type NextRequest } from "next/server";
import { assertLicenseConfig } from "@/lib/license/config";
import { validatePolarLicense } from "@/lib/license/polar";
import { validateLicenseSchema } from "@/lib/license/schema";
import {
  createLicenseResponse,
  handleLicenseError,
  jsonError,
} from "@/lib/license/service";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    const parsed = validateLicenseSchema.safeParse(body);

    if (!parsed.success) {
      return jsonError(
        "bad_request",
        "Invalid license validation request.",
        400,
        parsed.error.flatten(),
      );
    }

    const config = assertLicenseConfig();
    const snapshot = await validatePolarLicense({
      accessToken: config.polarAccessToken,
      organizationId: config.polarOrganizationId,
      benefitId: config.polarBenefitId,
      licenseKey: parsed.data.licenseKey,
      activationId: parsed.data.activationId,
    });

    return NextResponse.json(
      createLicenseResponse(snapshot, parsed.data.device),
    );
  } catch (error) {
    return handleLicenseError(error);
  }
}
