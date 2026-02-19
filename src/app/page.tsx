import Link from "next/link";

function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-[#09090b]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-sm font-semibold tracking-tight"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 text-[13px]">
            T
          </span>
          Transcript
        </Link>
        <div className="flex items-center gap-6 text-[13px] text-zinc-400">
          <Link
            href="/privacy"
            className="transition-colors hover:text-zinc-200"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="transition-colors hover:text-zinc-200"
          >
            Terms
          </Link>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 text-center text-[13px] text-zinc-500">
        <div className="flex gap-6">
          <Link
            href="/privacy"
            className="transition-colors hover:text-zinc-300"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="transition-colors hover:text-zinc-300"
          >
            Terms of Service
          </Link>
        </div>
        <p>
          &copy; {new Date().getFullYear()} Transcript. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export { Nav, Footer };

export default function Home() {
  return (
    <>
      <Nav />
      <main className="pt-14">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center_top,rgba(124,58,237,0.12),transparent_60%)]" />
          <div className="mx-auto max-w-5xl px-6 pb-24 pt-28 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.03] px-3.5 py-1 text-[13px] text-zinc-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              macOS Menu Bar App
            </div>
            <h1 className="mx-auto max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
              Automatic meeting{" "}
              <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                transcription
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-zinc-400">
              Transcript lives in your menu bar and records meetings in the
              background. When you&apos;re done, it generates a full transcript
              and summary using AI.
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="border-t border-white/[0.06] py-24">
          <div className="mx-auto grid max-w-5xl gap-4 px-6 sm:grid-cols-3">
            {[
              {
                title: "One-Click Recording",
                desc: "Start recording from the menu bar or with a global hotkey. Audio is captured locally as WAV.",
                icon: (
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
                    />
                  </svg>
                ),
              },
              {
                title: "AI Transcription",
                desc: "Audio is processed by Gemini to produce accurate transcripts with speaker identification.",
                icon: (
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z"
                    />
                  </svg>
                ),
              },
              {
                title: "Calendar Integration",
                desc: "Connects to Google Calendar to automatically tag recordings with meeting details and attendees.",
                icon: (
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                    />
                  </svg>
                ),
              },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6"
              >
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400">
                  {f.icon}
                </div>
                <h3 className="mb-1.5 text-sm font-medium">{f.title}</h3>
                <p className="text-[13px] leading-relaxed text-zinc-500">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Data & Privacy callout */}
        <section className="border-t border-white/[0.06] py-24">
          <div className="mx-auto max-w-5xl px-6">
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-8 sm:p-10">
              <h2 className="mb-3 text-lg font-semibold">
                Your data stays on your Mac
              </h2>
              <p className="max-w-2xl text-sm leading-relaxed text-zinc-400">
                Recordings are saved locally in{" "}
                <code className="rounded bg-white/[0.06] px-1.5 py-0.5 text-[13px] text-zinc-300">
                  ~/Documents/Transcript-App
                </code>
                . Audio is sent to the Gemini API only for transcription and is
                not stored by Google after processing. We do not collect, store,
                or share any of your audio, transcripts, or personal data. Google
                Calendar access is read-only and used solely to match recordings
                with your meetings.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
