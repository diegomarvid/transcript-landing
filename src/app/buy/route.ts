import { NextResponse } from "next/server";
import { polarCheckoutUrl } from "@/lib/commerce";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.redirect(polarCheckoutUrl);
}
