import { NextResponse } from "next/server";
import {
  assertLicenseConfig,
  LicenseConfigError,
  transcriptLicense,
} from "@/lib/license/config";
import type { LicenseDevice } from "@/lib/license/schema";
import {
  addDays,
  signLicenseEntitlement,
  type LicenseEntitlementPayload,
} from "@/lib/license/signing";
import {
  PolarLicenseError,
  type PolarLicenseSnapshot,
} from "@/lib/license/polar";

export type LicenseApiResponse = {
  ok: true;
  status: "active";
  license: {
    id: string;
    displayKey: string;
    activationId: string;
    customerId: string;
    customerEmail: string | null;
    activationLimit: number | null;
    offlineUntil: string;
  };
  entitlement: ReturnType<typeof signLicenseEntitlement>;
};

export function createLicenseResponse(
  snapshot: PolarLicenseSnapshot,
  device: LicenseDevice,
): LicenseApiResponse {
  const config = assertLicenseConfig();
  assertLicenseBenefitMatches(snapshot, config.polarBenefitId);
  assertSingleMacActivationLimit(snapshot);

  const now = new Date();
  const offlineUntil = addDays(now, transcriptLicense.offlineDays).toISOString();
  const payload: LicenseEntitlementPayload = {
    version: 1,
    issuer: transcriptLicense.issuer,
    audience: transcriptLicense.audience,
    subject: snapshot.licenseId,
    plan: transcriptLicense.plan,
    features: [...transcriptLicense.features],
    licenseId: snapshot.licenseId,
    displayKey: snapshot.displayKey,
    activationId: snapshot.activationId,
    deviceId: device.id,
    customerId: snapshot.customerId,
    customerEmail: snapshot.customerEmail,
    status: snapshot.status,
    issuedAt: now.toISOString(),
    offlineUntil,
    polar: {
      organizationId: config.polarOrganizationId,
      benefitId: config.polarBenefitId,
    },
  };

  return {
    ok: true,
    status: "active",
    license: {
      id: snapshot.licenseId,
      displayKey: snapshot.displayKey,
      activationId: snapshot.activationId,
      customerId: snapshot.customerId,
      customerEmail: snapshot.customerEmail,
      activationLimit: snapshot.activationLimit,
      offlineUntil,
    },
    entitlement: signLicenseEntitlement(
      payload,
      config.signingPrivateKeyBase64,
    ),
  };
}

export function assertLicenseBenefitMatches(
  snapshot: PolarLicenseSnapshot,
  benefitId: string,
) {
  if (snapshot.benefitId === benefitId) {
    return;
  }

  throw new PolarLicenseError("invalid_license", 403, {
    reason: "license_benefit_mismatch",
  });
}

export function assertSingleMacActivationLimit(snapshot: PolarLicenseSnapshot) {
  if (snapshot.activationLimit === transcriptLicense.requiredActivationLimit) {
    return;
  }

  console.error("license.activation_limit_misconfigured", {
    licenseId: snapshot.licenseId,
    activationLimit: snapshot.activationLimit,
    requiredActivationLimit: transcriptLicense.requiredActivationLimit,
  });

  throw new PolarLicenseError("polar_error", 502, {
    reason: "activation_limit_misconfigured",
  });
}

export function assertActivationDeviceMatches(
  snapshot: PolarLicenseSnapshot,
  device: LicenseDevice,
) {
  const activationDeviceId = snapshot.activationMeta?.device_id;

  if (activationDeviceId === device.id) {
    return;
  }

  throw new PolarLicenseError("invalid_license", 403, {
    reason: "activation_device_mismatch",
    hasActivationDeviceId: typeof activationDeviceId === "string",
  });
}

export function deviceLabel(device: LicenseDevice) {
  return device.name ?? device.model ?? "Transcript macOS";
}

export function deviceMeta(device: LicenseDevice) {
  return {
    app: "transcript",
    device_id: device.id,
    platform: device.platform,
    ...(device.name ? { device_name: device.name } : {}),
    ...(device.model ? { device_model: device.model } : {}),
    ...(device.appVersion ? { app_version: device.appVersion } : {}),
    ...(device.cliVersion ? { cli_version: device.cliVersion } : {}),
  };
}

export function jsonError(
  code: string,
  message: string,
  status: number,
  detail?: unknown,
) {
  return NextResponse.json(
    { ok: false, error: { code, message, detail } },
    { status },
  );
}

export function handleLicenseError(error: unknown) {
  if (error instanceof LicenseConfigError) {
    console.error("license.config_missing", { missing: error.missing });
    return jsonError(
      "backend_not_configured",
      "License activation is not configured yet.",
      500,
      { missing: error.missing },
    );
  }

  if (error instanceof PolarLicenseError) {
    const status = error.code === "polar_error" ? 502 : 403;

    console.warn("license.polar_error", {
      code: error.code,
      status: error.status,
      hasDetail: error.detail != null,
    });

    return jsonError(error.code, messageForCode(error.code), status);
  }

  console.error("license.unhandled_error", error);
  return jsonError("server_error", "License request failed.", 500);
}

function messageForCode(code: PolarLicenseError["code"]) {
  switch (code) {
    case "activation_limit_reached":
      return "This license has reached its activation limit.";
    case "license_revoked":
      return "This license has been revoked.";
    case "license_disabled":
      return "This license is disabled.";
    case "invalid_license":
      return "This license key is not valid.";
    case "polar_error":
      return "Polar could not process the license request.";
  }
}
