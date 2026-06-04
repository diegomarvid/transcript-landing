const r2BaseUrl = "https://pub-7d99cd07d4d741d296b2c69112c91153.r2.dev";
const fallbackVersion = "1.0.50";

export const releaseRevalidateSeconds = 300;
export const releasesFeedUrl = `${r2BaseUrl}/releases.json`;
export const appcastUrl = `${r2BaseUrl}/appcast.xml`;
export const fallbackDownloadUrl = `${r2BaseUrl}/Transcript-${fallbackVersion}.dmg`;

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
  downloadUrl: string;
  publishedAt: string | null;
};

function r2DownloadUrl(version: string): string {
  return `${r2BaseUrl}/Transcript-${version}.dmg`;
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
    downloadUrl: item.downloadUrl?.trim() || r2DownloadUrl(version),
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

function releaseFromAppcast(xml: string): AppRelease | null {
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
  try {
    const response = await fetch(appcastUrl, {
      next: { revalidate: releaseRevalidateSeconds },
    });

    if (!response.ok) {
      return [fallbackRelease()];
    }

    const release = releaseFromAppcast(await response.text());
    return release ? [release] : [fallbackRelease()];
  } catch {
    return [fallbackRelease()];
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

export async function getLatestRelease(): Promise<AppRelease> {
  const releases = await getReleases();
  return releases[0] ?? fallbackRelease();
}

function fallbackRelease(): AppRelease {
  return {
    tag: `v${fallbackVersion}`,
    version: fallbackVersion,
    title: `Transcript ${fallbackVersion}`,
    notes: "- Latest Transcript release",
    url: null,
    downloadUrl: fallbackDownloadUrl,
    publishedAt: null,
  };
}
