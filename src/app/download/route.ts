import { NextResponse } from "next/server";
import { getLatestRelease } from "@/lib/releases";

export const revalidate = 300;

export async function GET() {
  const release = await getLatestRelease();
  return NextResponse.redirect(release.downloadUrl);
}
