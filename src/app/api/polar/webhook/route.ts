import { Webhooks } from "@polar-sh/nextjs";
import { NextResponse, type NextRequest } from "next/server";

export const runtime = "nodejs";

type LicenseKeyProperties = {
  displayKey?: string;
  licenseKeyId?: string;
  userProvidedKey?: string;
};

function asLicenseKeyProperties(properties: unknown): LicenseKeyProperties {
  if (!properties || typeof properties !== "object") {
    return {};
  }

  return properties as LicenseKeyProperties;
}

function createWebhookHandler(webhookSecret: string) {
  return Webhooks({
    webhookSecret,
    onOrderPaid: async ({ data }) => {
      console.info("polar.order_paid", {
        orderId: data.id,
        checkoutId: data.checkoutId,
        customerId: data.customerId,
        customerEmail: data.customer.email,
        productId: data.productId,
        totalAmount: data.totalAmount,
        currency: data.currency,
      });
    },
    onOrderRefunded: async ({ data }) => {
      console.info("polar.order_refunded", {
        orderId: data.id,
        customerId: data.customerId,
        productId: data.productId,
        refundedAmount: data.refundedAmount,
        currency: data.currency,
      });
    },
    onBenefitGrantCreated: async ({ data }) => {
      const license = asLicenseKeyProperties(data.properties);

      console.info("polar.benefit_grant_created", {
        grantId: data.id,
        orderId: data.orderId,
        customerId: data.customerId,
        customerEmail: data.customer.email,
        benefitId: data.benefitId,
        licenseKeyId: license.licenseKeyId,
      });
    },
    onBenefitGrantRevoked: async ({ data }) => {
      const license = asLicenseKeyProperties(data.properties);

      console.info("polar.benefit_grant_revoked", {
        grantId: data.id,
        orderId: data.orderId,
        customerId: data.customerId,
        customerEmail: data.customer.email,
        benefitId: data.benefitId,
        licenseKeyId: license.licenseKeyId,
      });
    },
  });
}

export async function POST(request: NextRequest) {
  const webhookSecret = process.env.POLAR_WEBHOOK_SECRET;

  if (!webhookSecret) {
    return NextResponse.json(
      { received: false, error: "Missing POLAR_WEBHOOK_SECRET" },
      { status: 500 },
    );
  }

  return createWebhookHandler(webhookSecret)(request);
}
