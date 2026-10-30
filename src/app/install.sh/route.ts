import { NextResponse } from "next/server";

// `curl -fsSL https://transcriptprivate.com/install.sh | sh` installs the
// Linux CLI. The script lives next to the release tarballs in the update
// bucket, so it ships with each CLI release instead of with this site.
const INSTALL_SCRIPT_URL =
  "https://pub-7d99cd07d4d741d296b2c69112c91153.r2.dev/install.sh";

export function GET() {
  return NextResponse.redirect(INSTALL_SCRIPT_URL, 302);
}
