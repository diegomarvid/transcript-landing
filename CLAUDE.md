# Transcript Landing Notes

## Polar Free License Codes

Use the local script when Diego asks for a free Transcript license, coupon, or
gratis license for someone:

```bash
npm run polar:free-license -- --name Alan
```

It creates a one-use, 100% Polar discount for the Transcript Personal License
product and prints a checkout URL like:

```txt
https://transcriptprivate.com/buy?discount_code=CODE
```

The recipient should complete the `$0` checkout. Polar then generates the normal
Transcript macOS license key under the purchase "Benefit Grants", which can be
activated in the app like any paid license.

Useful options:

```bash
npm run polar:free-license -- --name "Alan Gomez" --code ALANFREE1
npm run polar:free-license -- --name "Support Gift" --redemptions 1
```

The script reads `.env.local` for `POLAR_ACCESS_TOKEN`. The token must include
`discounts:write`; `discounts:read` is useful because the script verifies the
created discount before printing it.

Safety defaults:

- `basisPoints: 10000` means 100% off.
- `maxRedemptions: 1` by default.
- Limited to the Transcript Personal License product ID.
- No email is required; the license belongs to the email used at checkout.
