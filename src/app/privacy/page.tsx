import { Metadata } from "next";
import Link from "next/link";
import { Nav, Footer } from "../page";

export const metadata: Metadata = {
  title: "Privacy Policy — Transcript",
  description: "Privacy Policy for the Transcript macOS application.",
};

export default function Privacy() {
  return (
    <>
      <Nav />
      <main className="pt-14">
        <article className="mx-auto max-w-3xl px-6 pb-24 pt-16">
          <h1 className="mb-2 text-3xl font-bold tracking-tight">
            Privacy Policy
          </h1>
          <p className="mb-10 text-sm text-zinc-500">
            Last updated: February 19, 2026
          </p>

          <div className="space-y-8 text-sm leading-relaxed text-zinc-400 [&_h2]:mb-3 [&_h2]:text-base [&_h2]:font-semibold [&_h2]:text-zinc-200 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1">
            <section>
              <h2>Overview</h2>
              <p>
                Transcript (&quot;the App&quot;) is a macOS desktop application
                that records audio and generates AI-powered transcriptions. We
                are committed to protecting your privacy. This policy explains
                what data the App accesses, how it is used, and your rights.
              </p>
            </section>

            <section>
              <h2>Data We Collect</h2>
              <p>
                <strong className="text-zinc-300">
                  We do not collect, store, or transmit any personal data to our
                  servers.
                </strong>{" "}
                The App runs entirely on your Mac. There is no Transcript
                backend, no analytics, and no telemetry.
              </p>
            </section>

            <section>
              <h2>Audio Recordings</h2>
              <ul>
                <li>
                  All recordings are saved locally on your Mac in{" "}
                  <code className="rounded bg-white/[0.06] px-1.5 py-0.5 text-[13px] text-zinc-300">
                    ~/Documents/Transcript-App
                  </code>
                  .
                </li>
                <li>
                  Audio is sent to the Google Gemini API solely for the purpose
                  of transcription. Google processes the audio in real time and
                  does not retain it after the response is generated. See{" "}
                  <a
                    href="https://ai.google.dev/gemini-api/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-violet-400 underline underline-offset-2 hover:text-violet-300"
                  >
                    Google&apos;s Gemini API Terms
                  </a>{" "}
                  for details.
                </li>
                <li>
                  You are in full control of your recordings and can delete them
                  at any time from Finder.
                </li>
              </ul>
            </section>

            <section>
              <h2>Google Calendar Integration</h2>
              <p>
                The App optionally connects to your Google Calendar using
                OAuth 2.0. When enabled:
              </p>
              <ul>
                <li>
                  We request{" "}
                  <strong className="text-zinc-300">read-only</strong> access to
                  your calendar (
                  <code className="rounded bg-white/[0.06] px-1.5 py-0.5 text-[13px] text-zinc-300">
                    calendar.readonly
                  </code>
                  ) and your email address (
                  <code className="rounded bg-white/[0.06] px-1.5 py-0.5 text-[13px] text-zinc-300">
                    userinfo.email
                  </code>
                  ).
                </li>
                <li>
                  Calendar data is used solely to match recordings with meetings
                  happening at the same time, displaying the meeting title and
                  attendees alongside the transcript.
                </li>
                <li>
                  OAuth tokens are stored securely in the macOS Keychain on your
                  device. They are never sent to any server other than
                  Google&apos;s OAuth endpoints.
                </li>
                <li>
                  We do not read, modify, or delete any calendar events. Access
                  is strictly read-only.
                </li>
                <li>
                  You can disconnect your Google account at any time from the
                  App&apos;s settings, which removes all stored tokens.
                </li>
              </ul>
            </section>

            <section>
              <h2>Third-Party Services</h2>
              <p>The App communicates with the following third-party services:</p>
              <ul>
                <li>
                  <strong className="text-zinc-300">Google Gemini API</strong> —
                  for audio transcription. Audio is processed in transit and not
                  retained.
                </li>
                <li>
                  <strong className="text-zinc-300">Google Calendar API</strong>{" "}
                  — for reading calendar events (optional, user-initiated).
                </li>
                <li>
                  <strong className="text-zinc-300">Sparkle</strong> — for
                  checking app updates. Only your app version and macOS version
                  are included in the update check request.
                </li>
              </ul>
              <p className="mt-2">
                No other third-party services, analytics platforms, or ad
                networks are used.
              </p>
            </section>

            <section>
              <h2>Data Storage & Security</h2>
              <ul>
                <li>
                  All data (recordings, transcripts, metadata, settings) is
                  stored locally on your Mac.
                </li>
                <li>
                  OAuth tokens are stored in the macOS Keychain, which provides
                  hardware-backed encryption.
                </li>
                <li>
                  Your Gemini API key is stored in UserDefaults on your device
                  and is never transmitted anywhere except to the Gemini API.
                </li>
              </ul>
            </section>

            <section>
              <h2>Children&apos;s Privacy</h2>
              <p>
                The App is not directed at children under the age of 13. We do
                not knowingly collect information from children.
              </p>
            </section>

            <section>
              <h2>Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Changes will
                be posted on this page with an updated revision date. Continued
                use of the App after changes constitutes acceptance of the
                revised policy.
              </p>
            </section>

            <section>
              <h2>Contact</h2>
              <p>
                If you have questions about this Privacy Policy, please contact
                us at{" "}
                <a
                  href="mailto:diegomarvid99@gmail.com"
                  className="text-violet-400 underline underline-offset-2 hover:text-violet-300"
                >
                  diegomarvid99@gmail.com
                </a>
                .
              </p>
            </section>
          </div>

          <div className="mt-12 border-t border-white/[0.06] pt-6">
            <Link
              href="/"
              className="text-sm text-zinc-500 transition-colors hover:text-zinc-300"
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
