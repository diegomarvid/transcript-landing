import Link from "next/link";
import { createPageMetadata, supportEmail } from "@/lib/seo";
import { Footer, Nav } from "../page";

export const metadata = createPageMetadata({
  path: "/support",
  title: "Support - Transcript",
  description:
    "Support for Transcript, the private local transcription and AI recap app.",
});

export default function Support() {
  return (
    <>
      <Nav />
      <main className="bg-[#11130f] pt-14 text-[#f5f7ef]">
        <article className="mx-auto max-w-3xl px-6 pb-24 pt-16">
          <h1 className="mb-2 text-3xl font-semibold">Support</h1>
          <p className="mb-10 text-sm text-[#8d9286]">
            Help for Transcript on Mac and iPhone.
          </p>

          <div className="space-y-8 text-sm leading-relaxed text-[#aeb5a8] [&_a]:text-[#d9ff72] [&_a]:underline [&_a]:underline-offset-2 [&_h2]:mb-3 [&_h2]:text-base [&_h2]:font-semibold [&_h2]:text-[#f5f7ef] [&_li]:pl-1 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5">
            <section>
              <h2>Contact</h2>
              <p>
                Email{" "}
                <a href={`mailto:${supportEmail}`}>{supportEmail}</a>{" "}
                for account, purchase, installation, recording, transcription,
                calendar, or recap questions.
              </p>
            </section>

            <section>
              <h2>Before You Write</h2>
              <ul>
                <li>Include whether you are using Transcript on Mac or iPhone.</li>
                <li>Describe what you expected to happen and what happened.</li>
                <li>
                  If the issue involves a recording, include the model,
                  language, and whether local audio retention is enabled.
                </li>
                <li>
                  Do not send private recordings, transcripts, or recaps unless
                  you intentionally want support to review that content.
                </li>
              </ul>
            </section>

            <section>
              <h2>Privacy</h2>
              <p>
                Transcript is designed around local recording and local
                transcription. Read the{" "}
                <Link href="/privacy">Privacy Policy</Link> for details on
                audio, transcripts, AI handoff, Google Calendar, and local
                storage.
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
