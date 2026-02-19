import { Metadata } from "next";
import Link from "next/link";
import { Nav, Footer } from "../page";

export const metadata: Metadata = {
  title: "Terms of Service — Transcript",
  description: "Terms of Service for the Transcript macOS application.",
};

export default function Terms() {
  return (
    <>
      <Nav />
      <main className="pt-14">
        <article className="mx-auto max-w-3xl px-6 pb-24 pt-16">
          <h1 className="mb-2 text-3xl font-bold tracking-tight">
            Terms of Service
          </h1>
          <p className="mb-10 text-sm text-zinc-500">
            Last updated: February 19, 2026
          </p>

          <div className="space-y-8 text-sm leading-relaxed text-zinc-400 [&_h2]:mb-3 [&_h2]:text-base [&_h2]:font-semibold [&_h2]:text-zinc-200 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1">
            <section>
              <h2>Acceptance of Terms</h2>
              <p>
                By downloading, installing, or using Transcript (&quot;the
                App&quot;), you agree to be bound by these Terms of Service. If
                you do not agree, do not use the App.
              </p>
            </section>

            <section>
              <h2>Description of Service</h2>
              <p>
                Transcript is a macOS desktop application that records audio from
                your microphone and system audio, sends it to the Google Gemini
                API for transcription, and saves the results locally on your
                device. It optionally integrates with Google Calendar to
                associate recordings with calendar events.
              </p>
            </section>

            <section>
              <h2>User Responsibilities</h2>
              <ul>
                <li>
                  You are responsible for ensuring you have the legal right to
                  record conversations in your jurisdiction. Many regions require
                  consent from all parties being recorded.
                </li>
                <li>
                  You are responsible for providing your own Google Gemini API
                  key and any costs associated with its usage.
                </li>
                <li>
                  You are responsible for safeguarding your recordings,
                  transcripts, and any API keys stored on your device.
                </li>
              </ul>
            </section>

            <section>
              <h2>Google Calendar Access</h2>
              <p>
                If you choose to connect your Google Calendar, you authorize the
                App to access your calendar data in read-only mode. This access
                is used exclusively to display upcoming meetings and match
                recordings with calendar events. You can revoke access at any
                time from the App settings or from your{" "}
                <a
                  href="https://myaccount.google.com/permissions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-violet-400 underline underline-offset-2 hover:text-violet-300"
                >
                  Google Account permissions
                </a>
                .
              </p>
            </section>

            <section>
              <h2>Intellectual Property</h2>
              <p>
                The App and its original content, features, and functionality are
                owned by the developer. Your recordings and transcripts belong to
                you.
              </p>
            </section>

            <section>
              <h2>Third-Party Services</h2>
              <p>
                The App relies on third-party services (Google Gemini API, Google
                Calendar API) that have their own terms of service. Your use of
                these services through the App is subject to their respective
                terms:
              </p>
              <ul>
                <li>
                  <a
                    href="https://ai.google.dev/gemini-api/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-violet-400 underline underline-offset-2 hover:text-violet-300"
                  >
                    Google Gemini API Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="https://developers.google.com/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-violet-400 underline underline-offset-2 hover:text-violet-300"
                  >
                    Google APIs Terms of Service
                  </a>
                </li>
              </ul>
            </section>

            <section>
              <h2>Disclaimer of Warranties</h2>
              <p>
                The App is provided &quot;as is&quot; and &quot;as
                available&quot; without warranties of any kind, either express or
                implied. We do not guarantee that transcriptions will be
                accurate, complete, or error-free. The App depends on third-party
                APIs which may experience downtime or changes outside our
                control.
              </p>
            </section>

            <section>
              <h2>Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by applicable law, the developer
                shall not be liable for any indirect, incidental, special,
                consequential, or punitive damages, or any loss of profits or
                revenues, whether incurred directly or indirectly, or any loss of
                data, use, or goodwill arising from your use of the App.
              </p>
            </section>

            <section>
              <h2>Changes to These Terms</h2>
              <p>
                We may modify these Terms at any time. Updated terms will be
                posted on this page with a new revision date. Continued use of
                the App after changes constitutes acceptance of the modified
                terms.
              </p>
            </section>

            <section>
              <h2>Contact</h2>
              <p>
                If you have questions about these Terms, please contact us at{" "}
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
