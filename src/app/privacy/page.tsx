import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";
import { Footer, Nav } from "../page";

export const metadata = createPageMetadata({
  path: "/privacy",
  title: "Privacy Policy - Transcript",
  description:
    "Privacy Policy for Transcript, the private macOS meeting recorder and AI recap app.",
});

export default function Privacy() {
  return (
    <>
      <Nav />
      <main className="bg-[#11130f] pt-14 text-[#f5f7ef]">
        <article className="mx-auto max-w-3xl px-6 pb-24 pt-16">
          <h1 className="mb-2 text-3xl font-semibold">Privacy Policy</h1>
          <p className="mb-10 text-sm text-[#8d9286]">
            Last updated: June 4, 2026
          </p>

          <div className="space-y-8 text-sm leading-relaxed text-[#aeb5a8] [&_a]:text-[#d9ff72] [&_a]:underline [&_a]:underline-offset-2 [&_code]:rounded [&_code]:bg-white/[0.06] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[13px] [&_code]:text-[#ecffae] [&_h2]:mb-3 [&_h2]:text-base [&_h2]:font-semibold [&_h2]:text-[#f5f7ef] [&_li]:pl-1 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5">
            <section>
              <h2>Overview</h2>
              <p>
                Transcript is a macOS application and bundled CLI for recording
                meetings, transcribing audio, and generating AI recaps. There is
                no Transcript-operated backend, analytics service, ad network,
                or telemetry pipeline.
              </p>
            </section>

            <section>
              <h2>Data We Collect</h2>
              <p>
                <strong className="text-[#f5f7ef]">
                  We do not collect, store, or sell your personal data on our
                  servers.
                </strong>{" "}
                The app stores your recordings, transcripts, recaps, tags,
                prompts, metadata, and settings on your Mac.
              </p>
            </section>

            <section>
              <h2>Recordings and Transcripts</h2>
              <ul>
                <li>
                  Recordings are saved locally in your configured Transcript data
                  folder. The default location is{" "}
                  <code>~/Documents/Transcript-App</code>.
                </li>
                <li>
                  Local Whisper transcription processes audio on your device.
                </li>
                <li>
                  If you choose a cloud transcription or recap provider, the app
                  or CLI sends the relevant audio, transcript, recap input, or
                  prompt directly to that provider from your Mac.
                </li>
                <li>
                  You can delete recordings, transcripts, recaps, and metadata
                  from Finder at any time.
                </li>
              </ul>
            </section>

            <section>
              <h2>Local/Remote Diarization</h2>
              <p>
                When Local/Remote diarization is enabled, Transcript writes a
                hidden <code>.channels/activity.json</code> file next to the
                recording. This file contains derived RMS and peak activity by
                second for microphone and system audio. It is not an audio file
                and cannot reconstruct speech.
              </p>
            </section>

            <section>
              <h2>Google Calendar Integration</h2>
              <p>
                Google Calendar connection is optional and uses OAuth 2.0. When
                enabled:
              </p>
              <ul>
                <li>
                  Transcript requests read-only calendar access and your email
                  address.
                </li>
                <li>
                  Calendar data is used to match a recording with the meeting
                  happening at the same time, display meeting context, and infer
                  a local-speaker hint from the calendar account.
                </li>
                <li>
                  OAuth tokens are stored in the macOS Keychain and are not sent
                  to any Transcript server.
                </li>
                <li>
                  Transcript does not create, edit, or delete calendar events.
                </li>
              </ul>
            </section>

            <section>
              <h2>Third-Party Services</h2>
              <p>
                Depending on your settings, Transcript may communicate with:
              </p>
              <ul>
                <li>
                  Google Gemini API, OpenAI API, Codex CLI, or Claude Code for
                  transcription, recap, title generation, or related AI tasks.
                </li>
                <li>
                  Google Calendar API for optional read-only calendar matching.
                </li>
                <li>
                  Sparkle and Cloudflare R2 for app update checks and download
                  assets.
                </li>
              </ul>
              <p className="mt-2">
                Third-party providers process data according to their own terms
                and policies. Transcript does not proxy these requests through a
                Transcript server.
              </p>
            </section>

            <section>
              <h2>Credentials</h2>
              <ul>
                <li>
                  Google OAuth tokens are stored in the macOS Keychain.
                </li>
                <li>
                  API keys and local AI tool credentials stay on your Mac in the
                  app settings or the relevant CLI configuration.
                </li>
                <li>
                  You can revoke Google access from Transcript settings or from
                  your{" "}
                  <a
                    href="https://myaccount.google.com/permissions"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google Account permissions
                  </a>
                  .
                </li>
              </ul>
            </section>

            <section>
              <h2>Children&apos;s Privacy</h2>
              <p>
                Transcript is not directed at children under 13. We do not
                knowingly collect information from children.
              </p>
            </section>

            <section>
              <h2>Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Changes
                will be posted on this page with an updated revision date.
              </p>
            </section>

            <section>
              <h2>Contact</h2>
              <p>
                If you have questions about this Privacy Policy, contact{" "}
                <a href="mailto:diegomarvid99@gmail.com">
                  diegomarvid99@gmail.com
                </a>
                .
              </p>
            </section>
          </div>

          <div className="mt-12 border-t border-white/10 pt-6">
            <Link
              href="/"
              className="text-sm text-[#8d9286] transition-colors hover:text-white"
            >
              &larr; Back to home
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
