type PolarLicenseStatus = "granted" | "revoked" | "disabled";

type PolarCustomer = {
  id?: string;
  email?: string | null;
  name?: string | null;
};

type RawPolarLicenseKey = {
  id?: string;
  customer_id?: string;
  customerId?: string;
  customer?: PolarCustomer;
  benefit_id?: string;
  benefitId?: string;
  display_key?: string;
  displayKey?: string;
  status?: PolarLicenseStatus;
  limit_activations?: number | null;
  limitActivations?: number | null;
};

type RawPolarActivation = {
  id?: string;
  license_key_id?: string;
  licenseKeyId?: string;
  license_key?: RawPolarLicenseKey;
  licenseKey?: RawPolarLicenseKey;
};

type RawPolarValidatedLicense = RawPolarLicenseKey & {
  activation?: {
    id?: string;
    license_key_id?: string;
    licenseKeyId?: string;
  } | null;
};

export type PolarLicenseSnapshot = {
  licenseId: string;
  displayKey: string;
  activationId: string;
  customerId: string;
  customerEmail: string | null;
  benefitId: string;
  status: "granted";
  activationLimit: number | null;
};

export type ActivateLicenseInput = {
  accessToken: string;
  organizationId: string;
  licenseKey: string;
  label: string;
  meta: Record<string, string | number | boolean>;
};

export type ValidateLicenseInput = {
  accessToken: string;
  organizationId: string;
  benefitId: string;
  licenseKey: string;
  activationId: string;
};

export type DeactivateLicenseInput = {
  accessToken: string;
  organizationId: string;
  licenseKey: string;
  activationId: string;
};

const polarApiBase = "https://api.polar.sh/v1";

export class PolarLicenseError extends Error {
  constructor(
    readonly code:
      | "invalid_license"
      | "license_revoked"
      | "license_disabled"
      | "activation_limit_reached"
      | "polar_error",
    readonly status: number,
    readonly detail?: unknown,
  ) {
    super(code);
    this.name = "PolarLicenseError";
  }
}

export async function activatePolarLicense({
  accessToken,
  organizationId,
  licenseKey,
  label,
  meta,
}: ActivateLicenseInput) {
  const data = await polarRequest<RawPolarActivation>(
    "/license-keys/activate",
    accessToken,
    {
      key: licenseKey,
      organization_id: organizationId,
      label,
      meta,
    },
  );

  return snapshotFromActivation(data);
}

export async function validatePolarLicense({
  accessToken,
  organizationId,
  benefitId,
  licenseKey,
  activationId,
}: ValidateLicenseInput) {
  const data = await polarRequest<RawPolarValidatedLicense>(
    "/license-keys/validate",
    accessToken,
    {
      key: licenseKey,
      organization_id: organizationId,
      benefit_id: benefitId,
      activation_id: activationId,
    },
  );

  return snapshotFromValidatedLicense(data, activationId);
}

export async function deactivatePolarLicense({
  accessToken,
  organizationId,
  licenseKey,
  activationId,
}: DeactivateLicenseInput) {
  await polarRequest<void>("/license-keys/deactivate", accessToken, {
    key: licenseKey,
    organization_id: organizationId,
    activation_id: activationId,
  });
}

async function polarRequest<T>(
  path: string,
  accessToken: string,
  body: Record<string, unknown>,
): Promise<T> {
  const response = await fetch(`${polarApiBase}${path}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (response.status === 204) {
    return undefined as T;
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new PolarLicenseError(
      mapPolarError(response.status, data),
      response.status,
      data,
    );
  }

  return data as T;
}

function mapPolarError(
  status: number,
  data: unknown,
): PolarLicenseError["code"] {
  const text = JSON.stringify(data ?? {}).toLowerCase();

  if (status === 404) {
    return "invalid_license";
  }

  if (status === 403 && text.includes("activation")) {
    return "activation_limit_reached";
  }

  if (status === 403) {
    return "invalid_license";
  }

  if (status === 422 && text.includes("revoked")) {
    return "license_revoked";
  }

  if (status === 422 && text.includes("disabled")) {
    return "license_disabled";
  }

  if (status === 422) {
    return "invalid_license";
  }

  return "polar_error";
}

function snapshotFromActivation(data: RawPolarActivation): PolarLicenseSnapshot {
  const activationId = requiredString(data.id, "activation id");
  const license = data.license_key ?? data.licenseKey;

  if (!license) {
    throw new PolarLicenseError("polar_error", 502, data);
  }

  return snapshotFromLicense(license, activationId);
}

function snapshotFromValidatedLicense(
  data: RawPolarValidatedLicense,
  fallbackActivationId: string,
): PolarLicenseSnapshot {
  const activationId = data.activation?.id ?? fallbackActivationId;
  return snapshotFromLicense(data, activationId);
}

function snapshotFromLicense(
  license: RawPolarLicenseKey,
  activationId: string,
): PolarLicenseSnapshot {
  const status = license.status;

  if (status === "revoked") {
    throw new PolarLicenseError("license_revoked", 403, license);
  }

  if (status === "disabled") {
    throw new PolarLicenseError("license_disabled", 403, license);
  }

  if (status !== "granted") {
    throw new PolarLicenseError("invalid_license", 403, license);
  }

  return {
    licenseId: requiredString(license.id, "license id"),
    displayKey: requiredString(
      license.display_key ?? license.displayKey,
      "display key",
    ),
    activationId,
    customerId: requiredString(
      license.customer_id ?? license.customerId ?? license.customer?.id,
      "customer id",
    ),
    customerEmail: license.customer?.email ?? null,
    benefitId: requiredString(
      license.benefit_id ?? license.benefitId,
      "benefit id",
    ),
    status,
    activationLimit: license.limit_activations ?? license.limitActivations ?? null,
  };
}

function requiredString(value: unknown, label: string) {
  if (typeof value !== "string" || value.length === 0) {
    throw new PolarLicenseError("polar_error", 502, { missing: label });
  }

  return value;
}
