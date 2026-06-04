import type { Metadata } from "next";

export const siteUrl = "https://transcriptprivate.com";
export const siteName = "Transcript";
export const supportEmail = "support@transcriptprivate.com";

export const defaultDescription =
  "Private macOS meeting recorder that captures mic and system audio, transcribes locally with Whisper, and turns calls into polished AI recaps.";

export const baseRobots = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
} satisfies Metadata["robots"];

export function absoluteUrl(path = "") {
  const cleanPath = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${cleanPath}`;
}

type PageMetadata = {
  path?: string;
  title: string;
  description: string;
  keywords?: string[];
};

export function createPageMetadata({
  path = "",
  title,
  description,
  keywords,
}: PageMetadata): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url,
      siteName,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: `${siteName} meeting recap preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/twitter-image"],
    },
    robots: baseRobots,
  };
}

export const sharedMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  title: {
    default: "Transcript - Private meeting recaps for macOS",
    template: `%s - ${siteName}`,
  },
  description: defaultDescription,
  robots: baseRobots,
  category: "productivity",
  icons: {
    icon: "/favicon.png",
    apple: "/app-icon-128.png",
  },
};
