import { NextResponse, type NextRequest } from "next/server";
import { assertLicenseConfig } from "@/lib/license/config";
import { deactivatePolarLicense } from "@/lib/license/polar";
import { deactivateLicenseSchema } from "@/lib/license/schema";
import { handleLicenseError, jsonError } from "@/lib/license/service";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    const parsed = deactivateLicenseSchema.safeParse(body);

    if (!parsed.success) {
      return jsonError(
        "bad_request",
        "Invalid license deactivation request.",
        400,
        parsed.error.flatten(),
      );
    }

    const config = assertLicenseConfig();
    await deactivatePolarLicense({
      accessToken: config.polarAccessToken,
      organizationId: config.polarOrganizationId,
      licenseKey: parsed.data.licenseKey,
      activationId: parsed.data.activationId,
    });

    return NextResponse.json({ ok: true, status: "deactivated" });
  } catch (error) {
    return handleLicenseError(error);
  }
}
