const r2BaseUrl = "https://pub-7d99cd07d4d741d296b2c69112c91153.r2.dev";
const fallbackVersion = "1.0.50";
export const minimumLicensedDownloadVersion = "1.0.51";

export const releaseRevalidateSeconds = 300;
export const releasesFeedUrl = `${r2BaseUrl}/releases.json`;
export const appcastUrl = `${r2BaseUrl}/appcast.xml`;

type ReleaseFetchMode = "cached" | "fresh";

function releaseFetchOptions(mode: ReleaseFetchMode) {
  return mode === "fresh"
    ? { cache: "no-store" as const }
    : { next: { revalidate: releaseRevalidateSeconds } };
}

type ReleaseFeedItem = {
  version: string;
  tag?: string;
  title?: string;
  notes?: string[] | string;
  downloadUrl?: string;
  url?: string | null;
  publishedAt?: string | null;
};

export type AppRelease = {
  tag: string;
  version: string;
  title: string;
  notes: string;
  url: string | null;
  downloadUrl?: string;
  publishedAt: string | null;
};

type DownloadableAppRelease = AppRelease & { downloadUrl: string };

export class ReleaseUnavailableError extends Error {
  constructor() {
    super("Transcript download is not available right now.");
    this.name = "ReleaseUnavailableError";
  }
}

function r2DownloadUrl(version: string): string {
  return `${r2BaseUrl}/Transcript-${version}.dmg`;
}

function isExpectedR2DownloadUrl(downloadUrl: string, version: string): boolean {
  try {
    const parsed = new URL(downloadUrl);
    const expected = new URL(r2DownloadUrl(version));
    return parsed.origin === expected.origin && parsed.pathname === expected.pathname;
  } catch {
    return false;
  }
}

function versionParts(version: string): number[] {
  return version
    .replace(/^v/i, "")
    .split(".")
    .map((part) => Number.parseInt(part, 10) || 0);
}

function isAtLeastVersion(version: string, minimum: string): boolean {
  const current = versionParts(version);
  const required = versionParts(minimum);
  const length = Math.max(current.length, required.length);

  for (let index = 0; index < length; index += 1) {
    const currentPart = current[index] ?? 0;
    const requiredPart = required[index] ?? 0;

    if (currentPart > requiredPart) {
      return true;
    }
    if (currentPart < requiredPart) {
      return false;
    }
  }

  return true;
}

export function isLicensedDownloadVersion(version: string): boolean {
  return isAtLeastVersion(version, minimumLicensedDownloadVersion);
}

function normalizeNotes(notes: ReleaseFeedItem["notes"]): string {
  if (Array.isArray(notes)) {
    const bullets = notes.map((note) => note.trim()).filter(Boolean);
    return bullets.length > 0
      ? bullets.map((note) => `- ${note}`).join("\n")
      : "- Bug fixes and improvements";
  }

  return notes?.trim() || "- Bug fixes and improvements";
}

function mapRelease(item: ReleaseFeedItem): AppRelease {
  const version = item.version.replace(/^v/i, "");
  return {
    tag: item.tag?.trim() || `v${version}`,
    version,
    title: item.title?.trim() || `Transcript ${version}`,
    notes: normalizeNotes(item.notes),
    url: item.url ?? null,
    publishedAt: item.publishedAt ?? null,
  };
}

function xmlDecode(value: string): string {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function firstMatch(value: string, pattern: RegExp): string | null {
  return value.match(pattern)?.[1]?.trim() ?? null;
}

function releaseFromAppcast(xml: string): DownloadableAppRelease | null {
  const item = xml.match(/<item>[\s\S]*?<\/item>/i)?.[0];
  if (!item) {
    return null;
  }

  const version = firstMatch(
    item,
    /<sparkle:shortVersionString>([^<]+)<\/sparkle:shortVersionString>/i,
  );
  const downloadUrl = firstMatch(item, /<enclosure[^>]*\surl="([^"]+)"/i);

  if (!version || !downloadUrl) {
    return null;
  }

  return {
    tag: `v${version}`,
    version,
    title: `Transcript ${version}`,
    notes: "- Latest Transcript release",
    url: null,
    downloadUrl: xmlDecode(downloadUrl),
    publishedAt: firstMatch(item, /<pubDate>([^<]+)<\/pubDate>/i),
  };
}

async function releasesFromAppcast(): Promise<AppRelease[]> {
  const release = await latestReleaseFromAppcast();
  return release ? [release] : [fallbackRelease()];
}

async function latestReleaseFromAppcast(
  mode: ReleaseFetchMode = "cached",
): Promise<DownloadableAppRelease | null> {
  try {
    const response = await fetch(appcastUrl, releaseFetchOptions(mode));

    if (!response.ok) {
      return null;
    }

    return releaseFromAppcast(await response.text());
  } catch {
    return null;
  }
}

async function latestReleaseFromFeed(
  mode: ReleaseFetchMode = "cached",
): Promise<AppRelease | null> {
  try {
    const response = await fetch(releasesFeedUrl, releaseFetchOptions(mode));

    if (!response.ok) {
      return null;
    }

    const releases = (await response.json()) as ReleaseFeedItem[];
    if (!Array.isArray(releases)) {
      return null;
    }

    const first = releases.find((release) => release.version);
    return first ? mapRelease(first) : null;
  } catch {
    return null;
  }
}

export async function getReleases(): Promise<AppRelease[]> {
  try {
    const response = await fetch(releasesFeedUrl, {
      next: { revalidate: releaseRevalidateSeconds },
    });

    if (!response.ok) {
      return releasesFromAppcast();
    }

    const releases = (await response.json()) as ReleaseFeedItem[];
    const published = Array.isArray(releases)
      ? releases.filter((release) => release.version)
      : [];

    return published.length > 0
      ? published.map(mapRelease)
      : releasesFromAppcast();
  } catch {
    return releasesFromAppcast();
  }
}

export async function getLatestRelease(
  options: { fresh?: boolean } = {},
): Promise<DownloadableAppRelease> {
  const mode: ReleaseFetchMode = options.fresh ? "fresh" : "cached";
  const appcastLatest = await latestReleaseFromAppcast(mode);
  if (
    appcastLatest?.downloadUrl &&
    isLicensedDownloadVersion(appcastLatest.version) &&
    isExpectedR2DownloadUrl(appcastLatest.downloadUrl, appcastLatest.version)
  ) {
    return appcastLatest;
  }

  const feedLatest = await latestReleaseFromFeed(mode);
  if (feedLatest && isLicensedDownloadVersion(feedLatest.version)) {
    return {
      ...feedLatest,
      downloadUrl: r2DownloadUrl(feedLatest.version),
    };
  }

  throw new ReleaseUnavailableError();
}

function fallbackRelease(): AppRelease {
  return {
    tag: `v${fallbackVersion}`,
    version: fallbackVersion,
    title: `Transcript ${fallbackVersion}`,
    notes: "- Latest Transcript release",
    url: null,
    publishedAt: null,
  };
}
