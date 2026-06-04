import { Metadata } from "next";
import Link from "next/link";
import { appcastUrl, getReleases, releasesFeedUrl } from "@/lib/releases";
import { Footer, Nav } from "../page";

export const metadata: Metadata = {
  title: "Changelog - Transcript",
  description: "Release notes and downloads for Transcript.",
};

function formatDate(value: string | null): string {
  if (!value) {
    return "Latest release";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function ReleaseNotes({ notes }: { notes: string }) {
  const lines = notes
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const bullets = lines
    .filter((line) => line.startsWith("- "))
    .map((line) => line.slice(2));
  const paragraphs = lines.filter((line) => !line.startsWith("- "));

  return (
    <div className="space-y-3 text-sm leading-7 text-[#aeb5a8]">
      {paragraphs.map((line) => (
        <p key={line}>{line.replace(/^#+\s*/, "")}</p>
      ))}
      {bullets.length > 0 && (
        <ul className="list-disc space-y-2 pl-5">
          {bullets.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default async function Changelog() {
  const releases = await getReleases();

  return (
    <>
      <Nav />
      <main className="overflow-x-hidden bg-[#11130f] pt-14 text-[#f5f7ef]">
        <section className="border-b border-white/10">
          <div className="mx-auto max-w-6xl px-5 pb-14 pt-16 sm:px-6 sm:pt-20">
            <p className="mb-4 rounded-md border border-[#d9ff72]/25 bg-[#d9ff72]/10 px-3 py-1.5 text-[13px] text-[#ecffae] sm:inline-flex">
              Synced from the public release feed
            </p>
            <h1 className="max-w-3xl text-4xl font-semibold leading-[1.05] sm:text-6xl">
              Changelog
            </h1>
            <p className="mt-5 max-w-2xl break-words text-base leading-8 text-[#c3c8ba]">
              Every Transcript app release lands here automatically. The release
              script publishes the changelog feed next to the DMG and appcast.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/download"
                className="inline-flex items-center justify-center rounded-md bg-[#d9ff72] px-5 py-3 text-sm font-semibold text-[#15170f] transition hover:bg-[#ecffae]"
              >
                Download latest
              </a>
              <a
                href={releasesFeedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md border border-white/15 px-5 py-3 text-sm font-semibold text-[#f5f7ef] transition hover:border-white/35"
              >
                Release feed
              </a>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-6xl px-5 sm:px-6">
            <div className="space-y-4">
              {releases.map((release, index) => (
                <article
                  key={release.tag}
                  className="rounded-lg border border-white/10 bg-[#171a14] p-5 sm:p-7"
                >
                  <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <h2 className="text-2xl font-semibold">
                          Transcript {release.version}
                        </h2>
                        {index === 0 && (
                          <span className="rounded-md bg-[#d9ff72]/10 px-2 py-1 text-[11px] font-medium text-[#ecffae]">
                            Latest
                          </span>
                        )}
                      </div>
                      <p className="text-[13px] text-[#8d9286]">
                        {formatDate(release.publishedAt)}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <a
                        href={release.downloadUrl}
                        className="rounded-md border border-[#d9ff72]/25 bg-[#d9ff72]/10 px-3 py-2 text-[13px] font-medium text-[#ecffae] transition hover:border-[#d9ff72]/50"
                      >
                        DMG
                      </a>
                      {release.url && (
                        <a
                          href={release.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-md border border-white/15 px-3 py-2 text-[13px] font-medium text-[#f5f7ef] transition hover:border-white/35"
                        >
                          Details
                        </a>
                      )}
                    </div>
                  </div>
                  <ReleaseNotes notes={release.notes} />
                </article>
              ))}
            </div>

            <div className="mt-10 border-t border-white/10 pt-6">
              <Link
                href="/"
                className="text-sm text-[#8d9286] transition-colors hover:text-white"
              >
                &larr; Back to home
              </Link>
              <a
                href={appcastUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-5 text-sm text-[#8d9286] transition-colors hover:text-white"
              >
                Appcast
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
