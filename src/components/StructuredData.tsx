import { absoluteUrl, defaultDescription, siteName, siteUrl } from "@/lib/seo";

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    logo: absoluteUrl("/app-icon.png"),
    description: defaultDescription,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      availableLanguage: ["English", "Spanish"],
    },
    areaServed: {
      "@type": "Place",
      name: "Worldwide",
    },
    knowsAbout: [
      "Meeting transcription",
      "Meeting recaps",
      "macOS productivity software",
      "Whisper transcription",
      "AI meeting notes",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    description: defaultDescription,
    inLanguage: "en",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function SoftwareApplicationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Transcript",
    description: defaultDescription,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Meeting transcription software",
    operatingSystem: "macOS",
    url: siteUrl,
    image: absoluteUrl("/opengraph-image"),
    screenshot: absoluteUrl("/opengraph-image"),
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      url: absoluteUrl("/download"),
    },
    featureList: [
      "Mic and system audio recording",
      "Local Whisper transcription",
      "AI meeting recaps",
      "Speaker-aware recap context",
      "Google Calendar context",
      "CLI automation",
    ],
    provider: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function StructuredData() {
  return (
    <>
      <OrganizationSchema />
      <WebSiteSchema />
      <SoftwareApplicationSchema />
    </>
  );
}
