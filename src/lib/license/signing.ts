import { createPrivateKey, createSign } from "crypto";
import { transcriptLicense } from "@/lib/license/config";

export type LicenseEntitlementPayload = {
  version: 1;
  issuer: string;
  audience: string;
  subject: string;
  plan: string;
  features: string[];
  licenseId: string;
  displayKey: string;
  activationId: string;
  deviceId: string;
  customerId: string;
  customerEmail: string | null;
  status: "granted";
  issuedAt: string;
  offlineUntil: string;
  polar: {
    organizationId: string;
    benefitId: string;
  };
};

export type SignedLicenseEntitlement = {
  algorithm: "ES256-DER";
  keyId: string;
  payload: string;
  signature: string;
};

export function signLicenseEntitlement(
  payload: LicenseEntitlementPayload,
  privateKeyBase64: string,
): SignedLicenseEntitlement {
  const privateKeyPem = Buffer.from(privateKeyBase64, "base64").toString("utf8");
  const privateKey = createPrivateKey(privateKeyPem);
  const payloadBase64 = base64url(JSON.stringify(payload));
  const signer = createSign("SHA256");

  signer.update(payloadBase64);
  signer.end();

  const signature = signer.sign(privateKey);

  return {
    algorithm: "ES256-DER",
    keyId: transcriptLicense.keyId,
    payload: payloadBase64,
    signature: base64url(signature),
  };
}

export function base64url(input: string | Buffer) {
  return Buffer.from(input)
    .toString("base64")
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
}

export function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setUTCDate(next.getUTCDate() + days);
  return next;
}
