export const transcriptLicense = {
  issuer: "transcriptprivate.com",
  audience: "transcript-macos",
  keyId: "transcript-license-v1",
  plan: "personal",
  features: ["record", "transcribe", "recap", "cli"] as const,
  requiredActivationLimit: 1,
  offlineDays: 14,
};

export type LicenseFeature = (typeof transcriptLicense.features)[number];

export function getLicenseConfig() {
  return {
    polarAccessToken: process.env.POLAR_ACCESS_TOKEN,
    polarOrganizationId:
      process.env.POLAR_ORGANIZATION_ID ??
      "b65f3a01-809d-4394-8162-fa2430b3d4c3",
    polarBenefitId:
      process.env.POLAR_LICENSE_BENEFIT_ID ??
      "0bb79f60-3b45-423b-a2b8-86c281bce2ad",
    signingPrivateKeyBase64: process.env.LICENSE_SIGNING_PRIVATE_KEY_B64,
  };
}

export function assertLicenseConfig() {
  const config = getLicenseConfig();
  const required: Array<[string, string | undefined]> = [
    ["POLAR_ACCESS_TOKEN", config.polarAccessToken],
    ["LICENSE_SIGNING_PRIVATE_KEY_B64", config.signingPrivateKeyBase64],
  ];
  const missing = required
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missing.length > 0) {
    throw new LicenseConfigError(missing);
  }

  return {
    polarAccessToken: config.polarAccessToken as string,
    polarOrganizationId: config.polarOrganizationId,
    polarBenefitId: config.polarBenefitId,
    signingPrivateKeyBase64: config.signingPrivateKeyBase64 as string,
  };
}

export class LicenseConfigError extends Error {
  constructor(readonly missing: string[]) {
    super(`Missing license configuration: ${missing.join(", ")}`);
    this.name = "LicenseConfigError";
  }
}
