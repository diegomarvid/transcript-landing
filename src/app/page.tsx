import Image from "next/image";
import Link from "next/link";
import { getLatestRelease } from "@/lib/releases";

const features = [
  {
    title: "Works with any meeting app",
    desc: "Google Meet, Zoom, Teams, Slack huddles, browser calls, screen shares, or any audio your Mac can hear.",
  },
  {
    title: "No bot joins the room",
    desc: "Transcript records from your Mac, so there is no extra meeting participant, calendar guest, or bot account.",
  },
  {
    title: "Deep recaps with your agents",
    desc: "Send structured meeting context to Codex or Claude Code using the accounts and tools you already use.",
  },
  {
    title: "Local Whisper transcript",
    desc: "Transcribe privately on-device with Whisper before any recap provider sees the text input.",
  },
  {
    title: "Speaker-aware recap input",
    desc: "Optional Local, Remote, and Overlap hints help recaps preserve who said what without saving duplicate audio.",
  },
  {
    title: "Calendar context",
    desc: "Read-only Google Calendar matching adds title, attendees, and local-speaker clues when available.",
  },
];

const connectors = [
  ["Codex", "Recommended for complete meeting recaps with strong structure and follow-up extraction."],
  ["Claude Code", "Use Claude.ai subscription auth for long-form synthesis and nuanced written notes."],
  ["Gemini / OpenAI", "Bring API keys when you want direct model calls or audio-first Gemini processing."],
  ["Bundled CLI", "Automate recording, transcribing, recap generation, export, tagging, and sharing."],
];

const proofPoints = [
  {
    value: "Any call",
    label: "Meet, Zoom, Teams, browser audio, local video, or system sound.",
  },
  {
    value: "No bot",
    label: "Nothing joins the meeting, announces itself, or needs host approval.",
  },
  {
    value: "Your AI",
    label: "Codex, Claude Code, Gemini, or OpenAI run through your own setup.",
  },
];

const workflow = [
  ["Capture", "Record mic plus system audio from whichever meeting app you use."],
  ["Transcribe", "Whisper writes a timestamped local transcript first."],
  ["Recap", "Codex or Claude Code gets compact, speaker-aware meeting context."],
  ["Organize", "Calendar metadata, tags, exports, and AI rename keep sessions findable."],
];

function Nav() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#11130f]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 text-sm font-semibold">
          <Image
            src="/app-icon-128.png"
            alt="Transcript"
            width={28}
            height={28}
            className="rounded-[7px]"
          />
          Transcript
        </Link>
        <div className="flex items-center gap-4 text-[13px] text-[#b7baad] sm:gap-5">
          <a
            href="/download"
            className="hidden rounded-md border border-[#d9ff72]/25 bg-[#d9ff72]/10 px-3 py-1.5 text-[#ecffae] transition hover:border-[#d9ff72]/50 sm:inline-flex"
          >
            Download
          </a>
          <Link href="/changelog" className="transition-colors hover:text-white">
            Changes
          </Link>
          <Link
            href="/privacy"
            className="hidden transition-colors hover:text-white min-[460px]:inline"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="hidden transition-colors hover:text-white min-[520px]:inline"
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
    <footer className="border-t border-white/10 bg-[#0d0f0c] py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 text-[13px] text-[#8d9286] sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-2.5">
          <Image
            src="/app-icon-128.png"
            alt=""
            width={24}
            height={24}
            className="rounded-md"
          />
          <span>&copy; {new Date().getFullYear()} Transcript.</span>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          <Link href="/privacy" className="transition-colors hover:text-white">
            Privacy Policy
          </Link>
          <Link href="/changelog" className="transition-colors hover:text-white">
            Changelog
          </Link>
          <Link href="/terms" className="transition-colors hover:text-white">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}

function ProductScene() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-x-0 bottom-0 top-16 hidden overflow-hidden opacity-75 sm:block"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(17,19,15,0.2),rgba(17,19,15,0.78)_70%,#11130f)]" />
      <div className="absolute left-1/2 top-10 h-[480px] w-[920px] -translate-x-1/2 rounded-[8px] border border-white/10 bg-[#181b16] shadow-2xl shadow-black/50 sm:top-14">
        <div className="flex h-9 items-center gap-2 border-b border-white/10 px-4">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b55]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffca57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#78df78]" />
          <span className="ml-4 font-mono text-[11px] text-[#7f8579]">
            23-03 - Recording Test
          </span>
        </div>
        <div className="grid h-[calc(100%-36px)] grid-cols-[240px_1fr]">
          <aside className="border-r border-white/10 bg-[#12140f] p-4">
            {["Recording", "Transcribing", "Recap", "Export"].map((item, i) => (
              <div
                key={item}
                className={`mb-2 rounded-md px-3 py-2 text-[12px] ${
                  i === 2
                    ? "bg-[#d9ff72]/12 text-[#ecffae]"
                    : "text-[#81877a]"
                }`}
              >
                {item}
              </div>
            ))}
            <div className="mt-7 rounded-md border border-white/10 bg-black/20 p-3">
              <p className="mb-2 text-[11px] uppercase text-[#8d9286]">
                Channel activity
              </p>
              <div className="space-y-2">
                <div className="h-2 rounded bg-[#6ee7b7]/70" />
                <div className="h-2 w-4/5 rounded bg-[#f4c95d]/80" />
                <div className="h-2 w-2/3 rounded bg-[#ff8a65]/80" />
              </div>
            </div>
          </aside>
          <div className="p-5">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-[11px] text-[#8d9286]">Generated recap</p>
                <p className="mt-1 text-lg font-semibold text-[#f5f7ef]">
                  Product sync recap
                </p>
              </div>
              <div className="rounded-md border border-[#d9ff72]/20 px-3 py-1.5 font-mono text-[11px] text-[#ecffae]">
                Whisper + Codex
              </div>
            </div>
            <div className="space-y-3 font-mono text-[12px] leading-6 text-[#c7cdbf]">
              <p>
                <span className="text-[#6ee7b7]">[00:06] Local:</span> Hi, I am
                Diego. I want to check whether this marks me as local.
              </p>
              <p>
                <span className="text-[#f4c95d]">[00:16] Remote:</span> This
                simulation was built from thousands of real matches.
              </p>
              <p>
                <span className="text-[#ff8a65]">[00:32] Overlap:</span> Both
                sides are active, so keep the attribution tentative.
              </p>
              <div className="my-4 h-px bg-white/10" />
              <p className="text-[#f5f7ef]">## Action Items</p>
              <p>
                1. Diego: confirm the GTM owner before Friday and send notes to
                the team.
              </p>
              <p>
                2. Product: split follow-ups by customer risk, launch date, and
                demo readiness.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.035)_0,rgba(255,255,255,0.035)_1px,transparent_1px,transparent_72px)]" />
    </div>
  );
}

export { Nav, Footer };

export default async function Home() {
  const latestRelease = await getLatestRelease();

  return (
    <>
      <Nav />
      <main className="bg-[#11130f] pt-14 text-[#f5f7ef]">
        <section className="relative min-h-[82vh] overflow-hidden border-b border-white/10">
          <ProductScene />
          <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-start px-5 pb-20 pt-24 sm:px-6 sm:pt-28">
            <Image
              src="/app-icon.png"
              alt="Transcript app icon"
              width={82}
              height={82}
              className="mb-8 rounded-[18px] shadow-xl shadow-black/30"
              priority
            />
            <p className="mb-4 rounded-md border border-[#d9ff72]/25 bg-[#d9ff72]/10 px-3 py-1.5 text-[13px] text-[#ecffae]">
              Meet, Zoom, Teams, and any Mac audio - {latestRelease.tag}
            </p>
            <h1 className="max-w-3xl text-4xl font-semibold leading-[1.05] sm:text-7xl sm:leading-[1.02]">
              Complete meeting recaps without a bot in the room.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#c3c8ba]">
              Transcript records mic and system audio from any call, transcribes
              locally with Whisper, then hands structured context to Codex,
              Claude Code, Gemini, or OpenAI using your own setup.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="/download"
                className="inline-flex items-center justify-center rounded-md bg-[#d9ff72] px-5 py-3 text-sm font-semibold text-[#15170f] transition hover:bg-[#ecffae]"
              >
                Download for macOS
              </a>
              <Link
                href="/changelog"
                className="inline-flex items-center justify-center rounded-md border border-white/15 px-5 py-3 text-sm font-semibold text-[#f5f7ef] transition hover:border-white/35"
              >
                See what changed
              </Link>
            </div>
            <p className="mt-4 text-[13px] text-[#8d9286]">
              Requires macOS 15.7 or later. No meeting bot, extension, or
              platform-specific recorder required.
            </p>
          </div>
        </section>

        <section className="border-b border-white/10 bg-[#0d0f0c] py-20">
          <div className="mx-auto max-w-6xl px-5 sm:px-6">
            <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
              <div>
                <p className="mb-3 text-sm text-[#d9ff72]">AI connectors</p>
                <h2 className="text-3xl font-semibold sm:text-4xl">
                  Use the agents you already trust.
                </h2>
                <p className="mt-5 text-sm leading-7 text-[#aeb5a8]">
                  Transcript does not force a single recap backend. It prepares
                  the transcript, calendar context, and speaker hints, then lets
                  your Codex, Claude Code, Gemini, or OpenAI workflow produce
                  the final notes.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {connectors.map(([title, desc]) => (
                  <div
                    key={title}
                    className="rounded-lg border border-white/10 bg-[#171a14] p-5"
                  >
                    <h3 className="mb-2 text-base font-semibold text-[#f5f7ef]">
                      {title}
                    </h3>
                    <p className="text-sm leading-6 text-[#aeb5a8]">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 py-20">
          <div className="mx-auto max-w-6xl px-5 sm:px-6">
            <div className="mb-10 max-w-2xl">
              <p className="mb-3 text-sm text-[#6ee7b7]">Why it matters</p>
              <h2 className="text-3xl font-semibold sm:text-4xl">
                Capture anywhere. Keep the meeting private.
              </h2>
            </div>
            <div className="mb-6 grid gap-3 lg:grid-cols-3">
              {proofPoints.map((point) => (
                <div
                  key={point.value}
                  className="rounded-lg border border-[#6ee7b7]/20 bg-[#6ee7b7]/10 p-5"
                >
                  <p className="mb-2 text-2xl font-semibold text-[#e7fff5]">
                    {point.value}
                  </p>
                  <p className="text-sm leading-6 text-[#aeb5a8]">
                    {point.label}
                  </p>
                </div>
              ))}
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-lg border border-white/10 bg-[#171a14] p-5"
                >
                  <h3 className="mb-2 text-base font-semibold">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-6 text-[#aeb5a8]">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 bg-[#0d0f0c] py-20">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="mb-3 text-sm text-[#f4c95d]">Recap pipeline</p>
              <h2 className="text-3xl font-semibold sm:text-4xl">
                Small cues, richer recaps.
              </h2>
              <p className="mt-5 text-sm leading-7 text-[#aeb5a8]">
                Recap input is kept as structured WebVTT, but cues are split by
                speaker label, duration, and size. Codex gets tighter context
                for summaries, decisions, objections, and owner-specific
                follow-ups without changing the visible transcript.
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-[#171a14] p-4">
              <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-3">
                <span className="font-mono text-[12px] text-[#8d9286]">
                  .recap-input.vtt
                </span>
                <span className="rounded-md bg-[#d9ff72]/10 px-2 py-1 text-[11px] text-[#ecffae]">
                  speaker-aware
                </span>
              </div>
              <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-[12px] leading-6 text-[#c7cdbf]">
                {`00:00:06.640 --> 00:00:15.900
Local: Let's validate the recording flow.

00:00:16.000 --> 00:00:19.200
Remote: The demo audio is now playing.

00:00:19.200 --> 00:00:20.300
Local: Interesting, actually.`}
              </pre>
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 py-20">
          <div className="mx-auto max-w-6xl px-5 sm:px-6">
            <div className="grid gap-3 lg:grid-cols-4">
              {workflow.map(([title, desc], index) => (
                <div
                  key={title}
                  className="rounded-lg border border-white/10 bg-[#171a14] p-5"
                >
                  <p className="mb-5 font-mono text-[12px] text-[#8d9286]">
                    0{index + 1}
                  </p>
                  <h3 className="mb-2 text-lg font-semibold">{title}</h3>
                  <p className="text-sm leading-6 text-[#aeb5a8]">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto grid max-w-6xl gap-6 px-5 sm:px-6 lg:grid-cols-[1fr_1fr]">
            <div className="rounded-lg border border-white/10 bg-[#171a14] p-7">
              <h2 className="mb-4 text-2xl font-semibold">
                No duplicate diarization audio.
              </h2>
              <p className="text-sm leading-7 text-[#aeb5a8]">
                The Local/Remote beta stores derived RMS and peak activity per
                second in a hidden metadata file. It is not speech and cannot be
                used to reconstruct the meeting.
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-[#171a14] p-7">
              <h2 className="mb-4 text-2xl font-semibold">
                Terminal-friendly.
              </h2>
              <p className="mb-4 text-sm leading-7 text-[#aeb5a8]">
                Use the app, or automate the same flow with the bundled CLI.
              </p>
              <code className="block rounded-md border border-white/10 bg-black/25 p-4 font-mono text-[12px] text-[#ecffae]">
                transcript record --duration 60m
                <br />
                transcript transcribe latest
                <br />
                transcript recap latest
              </code>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
