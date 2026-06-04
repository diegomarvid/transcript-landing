import { z } from "zod";

export const deviceSchema = z.object({
  id: z.string().trim().min(8).max(160),
  name: z.string().trim().min(1).max(120).optional(),
  model: z.string().trim().min(1).max(120).optional(),
  platform: z.literal("macos").default("macos"),
  appVersion: z.string().trim().min(1).max(40).optional(),
  cliVersion: z.string().trim().min(1).max(40).optional(),
});

export const activateLicenseSchema = z.object({
  licenseKey: z.string().trim().min(12).max(120),
  device: deviceSchema,
});

export const validateLicenseSchema = activateLicenseSchema.extend({
  activationId: z.string().trim().min(8).max(120),
});

export const deactivateLicenseSchema = validateLicenseSchema;

export type LicenseDevice = z.infer<typeof deviceSchema>;
export type ActivateLicenseRequest = z.infer<typeof activateLicenseSchema>;
export type ValidateLicenseRequest = z.infer<typeof validateLicenseSchema>;
export type DeactivateLicenseRequest = z.infer<typeof deactivateLicenseSchema>;
