import { NextResponse } from "next/server";
import { polarCheckoutUrl } from "@/lib/commerce";

export const dynamic = "force-dynamic";

export function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const checkoutUrl = new URL(polarCheckoutUrl);
  const discountCode = requestUrl.searchParams.get("discount_code");

  if (discountCode) {
    checkoutUrl.searchParams.set("discount_code", discountCode);
  }

  return NextResponse.redirect(checkoutUrl);
}
