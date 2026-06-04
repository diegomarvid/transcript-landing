import { NextResponse } from "next/server";
import { getLatestRelease, ReleaseUnavailableError } from "@/lib/releases";

export const revalidate = 300;

export async function GET() {
  try {
    const release = await getLatestRelease();
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
