# Transcript License Backend

This backend lets the macOS app activate Polar license keys without embedding a
Polar organization token in the app binary.

## Runtime Environment

Set these variables in Vercel:

```txt
POLAR_ACCESS_TOKEN=polar_oat_...
POLAR_ORGANIZATION_ID=b65f3a01-809d-4394-8162-fa2430b3d4c3
POLAR_LICENSE_BENEFIT_ID=0bb79f60-3b45-423b-a2b8-86c281bce2ad
LICENSE_SIGNING_PRIVATE_KEY_B64=<base64 PEM P-256 private key>
```

`POLAR_ACCESS_TOKEN` needs `license_keys:write`. `license_keys:read` is useful
for support tooling later, but the v1 endpoints only call activate, validate,
and deactivate.

## App API

### Activate

```http
POST /api/license/activate
Content-Type: application/json
```

```json
{
  "licenseKey": "TRANSCRIPT-...",
  "device": {
    "id": "stable-device-id",
    "name": "Diego's MacBook Pro",
    "model": "MacBookPro18,3",
    "platform": "macos",
    "appVersion": "1.0.50"
  }
}
```

The backend creates a Polar activation and returns a signed entitlement.

### Validate

```http
POST /api/license/validate
Content-Type: application/json
```

```json
{
  "licenseKey": "TRANSCRIPT-...",
  "activationId": "polar-activation-id",
  "device": {
    "id": "stable-device-id",
    "platform": "macos",
    "appVersion": "1.0.50"
  }
}
```

The backend validates the existing Polar activation and returns a fresh signed
entitlement.

### Deactivate

```http
POST /api/license/deactivate
Content-Type: application/json
```

```json
{
  "licenseKey": "TRANSCRIPT-...",
  "activationId": "polar-activation-id",
  "device": {
    "id": "stable-device-id",
    "platform": "macos"
  }
}
```

The backend deactivates this Mac in Polar.

## Successful Response

```json
{
  "ok": true,
  "status": "active",
  "license": {
    "id": "polar-license-id",
    "displayKey": "TRANSCRIPT-...",
    "activationId": "polar-activation-id",
    "customerId": "polar-customer-id",
    "customerEmail": "customer@example.com",
    "activationLimit": 1,
    "offlineUntil": "2026-06-18T00:00:00.000Z"
  },
  "entitlement": {
    "algorithm": "ES256-DER",
    "keyId": "transcript-license-v1",
    "payload": "base64url-json",
    "signature": "base64url-der-ecdsa-signature"
  }
}
```

The app should store `licenseKey`, `activationId`, and the signed entitlement in
Keychain.

## Entitlement Verification

The backend signs the exact `entitlement.payload` string with ECDSA P-256
SHA-256. The signature is DER encoded and base64url encoded.

Swift verification shape:

1. Decode `payload` from base64url.
2. Decode `signature` from base64url.
3. Verify the signature over the UTF-8 bytes of the original `payload` string.
4. Parse the decoded payload JSON.
5. Check:
   - `issuer == "transcriptprivate.com"`
   - `audience == "transcript-macos"`
   - `deviceId` matches this Mac
   - `status == "granted"`
   - `offlineUntil` is in the future

Public key for app verification:

```pem
-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEAIyXpVefquAjPbnFVAHUEKN2Vje6
rFueX93xoZ/FSVMEJPs9NCvUHyCSEz86pKD5s9+sxa8KtdHJsgN4rmdUtg==
-----END PUBLIC KEY-----
```

## Error Response

```json
{
  "ok": false,
  "error": {
    "code": "activation_limit_reached",
    "message": "This license has reached its activation limit."
  }
}
```

Stable error codes:

- `bad_request`
- `invalid_license`
- `activation_limit_reached`
- `license_revoked`
- `license_disabled`
- `backend_not_configured`
- `polar_error`
- `server_error`

## V1 Policy

- One license key is for one Mac.
- Polar activation limit must be exactly 1 device.
- The backend refuses to sign an entitlement if Polar returns any other
  activation limit, including `null`.
- Entitlements are valid offline for 14 days.
- No login is required.
- No Transcript database is required yet; Polar is the source of truth.
