import { NextResponse } from "next/server";
import { getLatestRelease, ReleaseUnavailableError } from "@/lib/releases";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const release = await getLatestRelease({ fresh: true });
    return NextResponse.redirect(release.downloadUrl);
  } catch (error) {
    if (error instanceof ReleaseUnavailableError) {
      return NextResponse.json(
        {
          ok: false,
          error: "download_unavailable",
          message: "Transcript download is not available right now.",
        },
        { status: 503 },
      );
    }

    throw error;
  }
}
