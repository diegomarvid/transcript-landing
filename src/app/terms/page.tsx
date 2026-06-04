import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";
import { Footer, Nav } from "../page";

export const metadata = createPageMetadata({
  path: "/terms",
  title: "Terms of Service - Transcript",
  description:
    "Terms of Service for Transcript, the private macOS meeting recorder and AI recap app.",
});

export default function Terms() {
  return (
    <>
      <Nav />
      <main className="bg-[#11130f] pt-14 text-[#f5f7ef]">
        <article className="mx-auto max-w-3xl px-6 pb-24 pt-16">
          <h1 className="mb-2 text-3xl font-semibold">Terms of Service</h1>
          <p className="mb-10 text-sm text-[#8d9286]">
            Last updated: June 4, 2026
          </p>

          <div className="space-y-8 text-sm leading-relaxed text-[#aeb5a8] [&_a]:text-[#d9ff72] [&_a]:underline [&_a]:underline-offset-2 [&_h2]:mb-3 [&_h2]:text-base [&_h2]:font-semibold [&_h2]:text-[#f5f7ef] [&_li]:pl-1 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5">
            <section>
              <h2>Acceptance of Terms</h2>
              <p>
                By downloading, installing, or using Transcript, you agree to
                these Terms of Service. If you do not agree, do not use the app
                or CLI.
              </p>
            </section>

            <section>
              <h2>Description of Service</h2>
              <p>
                Transcript is a macOS desktop application and bundled command
                line tool for recording microphone and system audio,
                transcribing meetings, generating AI recaps, exporting notes,
                tagging sessions, and optionally matching recordings with
                read-only Google Calendar events.
              </p>
            </section>

            <section>
              <h2>User Responsibilities</h2>
              <ul>
                <li>
                  You are responsible for ensuring you have the legal right and
                  required consent to record conversations in your jurisdiction.
                </li>
                <li>
                  You are responsible for safeguarding recordings, transcripts,
                  recaps, credentials, API keys, and local AI tool accounts on
                  your device.
                </li>
                <li>
                  You are responsible for any third-party provider costs,
                  account limits, or usage terms that apply to AI providers or
                  calendar services you configure.
                </li>
                <li>
                  You should review AI-generated transcripts and recaps before
                  relying on them for decisions, commitments, or records.
                </li>
              </ul>
            </section>

            <section>
              <h2>Google Calendar Access</h2>
              <p>
                If you connect Google Calendar, you authorize Transcript to read
                calendar events and your account email for meeting matching and
                local-speaker hints. Access is read-only and can be revoked from
                Transcript settings or from your{" "}
                <a
                  href="https://myaccount.google.com/permissions"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Account permissions
                </a>
                .
              </p>
            </section>

            <section>
              <h2>Third-Party Services</h2>
              <p>
                Transcript can use third-party tools and services such as Google
                Gemini API, OpenAI API, Codex CLI, Claude Code, Google Calendar
                API, Sparkle, and Cloudflare R2. Your use of those services is
                subject to their respective terms and policies.
              </p>
            </section>

            <section>
              <h2>Ownership</h2>
              <p>
                Transcript and its original software, design, and branding are
                owned by the developer. Your recordings, transcripts, recaps,
                tags, and exports belong to you.
              </p>
            </section>

            <section>
              <h2>Disclaimer of Warranties</h2>
              <p>
                Transcript is provided as is and as available, without
                warranties of any kind. We do not guarantee that recording,
                transcription, diarization, recap generation, calendar matching,
                updates, or exports will be accurate, complete, uninterrupted, or
                error-free.
              </p>
            </section>

            <section>
              <h2>Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by applicable law, the developer
                is not liable for indirect, incidental, special, consequential,
                punitive, or similar damages, including loss of profits,
                revenues, data, goodwill, or business opportunities arising from
                your use of Transcript.
              </p>
            </section>

            <section>
              <h2>Changes to These Terms</h2>
              <p>
                We may update these Terms from time to time. Updated terms will
                be posted on this page with a new revision date. Continued use
                of Transcript after changes means you accept the updated terms.
              </p>
            </section>

            <section>
              <h2>Contact</h2>
              <p>
                If you have questions about these Terms, contact{" "}
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
