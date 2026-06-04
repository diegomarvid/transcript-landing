import Image from "next/image";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getLatestRelease } from "@/lib/releases";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Transcript - Private AI meeting recaps for macOS",
  description:
    "Turn any Mac meeting into a polished recap with quotes, decisions, and action items. Record mic and system audio, transcribe locally with Whisper, and use your own AI setup.",
  keywords: [
    "meeting recaps",
    "AI meeting notes",
    "Mac meeting recorder",
    "Whisper transcription",
    "private meeting transcription",
    "Codex meeting summaries",
    "Claude Code meeting summaries",
  ],
});

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
  {
    title: "Codex",
    desc: "Recommended for complete meeting recaps with strong structure and follow-up extraction.",
    logo: "/provider-codex.png",
    logoAlt: "Codex",
    accent: "border-[#7ea6ff]/25 bg-[#7ea6ff]/10",
  },
  {
    title: "Claude Code",
    desc: "Use Claude.ai subscription auth for long-form synthesis and nuanced written notes.",
    logo: "/provider-claude.png",
    logoAlt: "Claude",
    accent: "border-[#d97757]/25 bg-[#d97757]/10",
  },
  {
    title: "Gemini",
    desc: "Bring a Gemini key when you want direct model calls or audio-first Gemini processing.",
    logo: "/provider-gemini.png",
    logoAlt: "Gemini",
    accent: "border-[#7bf0ce]/25 bg-[#7bf0ce]/10",
  },
  {
    title: "OpenAI",
    desc: "Use OpenAI models directly when you want API-key based recap generation.",
    logo: "/provider-openai.png",
    logoAlt: "OpenAI",
    accent: "border-white/15 bg-white/10",
  },
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

const heroHighlights = [
  {
    label: "Private by default",
    className: "border-[#7bf0ce]/35 bg-[#7bf0ce]/10 text-[#bdfbea]",
  },
  {
    label: "Local Whisper",
    className: "border-[#d9ff72]/35 bg-[#d9ff72]/10 text-[#ecffae]",
  },
  {
    label: "Your AI setup",
    className: "border-[#ff8a65]/35 bg-[#ff8a65]/10 text-[#ffc2ad]",
  },
];

const faqs = [
  {
    question: "Does my meeting audio leave my Mac?",
    answer:
      "Not in local or hybrid modes. Transcript records locally and can transcribe with Whisper on-device. If you use Gemini audio processing or Managed AI, the relevant audio/text is sent to that provider. Business Private can be configured so Transcript servers never receive meeting content.",
  },
  {
    question: "Can we use our company AI account instead of yours?",
    answer:
      "Yes. Users can bring their own Gemini or OpenAI key, use local Codex or Claude Code auth, or point Transcript at a company-controlled AI gateway. The gateway option keeps provider credentials off employee laptops.",
  },
  {
    question: "Do all employees need to paste an API key?",
    answer:
      "They can for a small pilot, but it is not the recommended team setup. For larger teams, use a team config or company gateway so IT controls the model provider, credentials, and policy centrally.",
  },
  {
    question: "Can Transcript publish recaps to Google Drive?",
    answer:
      "The app stores the full local archive first. Drive publishing is planned as a narrow integration for generated artifacts like recaps, transcripts, PDFs, and DOCX files. The goal is to use limited Drive access, not full Drive permissions.",
  },
  {
    question: "What happens after the first year of updates?",
    answer:
      "One-time licenses keep working. The annual updates and support plan covers new app releases, macOS compatibility, provider changes, prompt/template improvements, and support.",
  },
  {
    question: "Is there a Windows version?",
    answer:
      "Not yet. Transcript is macOS-first because reliable system audio capture and local Whisper performance are core to the product. A Windows version is on the roadmap for larger team deployments.",
  },
];

function FAQPageSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

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
      className="relative hidden h-[600px] min-w-0 overflow-visible lg:block"
    >
      <div className="absolute -inset-x-20 inset-y-0 bg-[linear-gradient(to_bottom,rgba(17,19,15,0.04),rgba(17,19,15,0.7)_76%,#11130f)]" />
      <div
        data-product-scene-window
        className="absolute left-0 top-8 h-[520px] w-[600px] rounded-[8px] border border-white/10 bg-[#181b16] opacity-90 shadow-2xl shadow-black/50 2xl:w-[760px]"
      >
        <div className="flex h-9 items-center gap-2 border-b border-white/10 px-4">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b55]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffca57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#78df78]" />
          <span className="ml-4 font-mono text-[11px] text-[#7f8579]">
            23-03 - Recording Test
          </span>
        </div>
        <div className="grid h-[calc(100%-36px)] grid-cols-[194px_1fr] 2xl:grid-cols-[220px_1fr]">
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
              <p className="mb-3 text-[11px] uppercase text-[#8d9286]">
                Recap sections
              </p>
              <div className="space-y-2 text-[11px] text-[#aeb5a8]">
                {["Topics", "Key quotes", "Decisions", "Action items"].map(
                  (item) => (
                    <div key={item} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#d9ff72]" />
                      {item}
                    </div>
                  ),
                )}
              </div>
            </div>
          </aside>
          <div className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-[11px] text-[#8d9286]">Generated recap</p>
                <p className="mt-1 text-lg font-semibold text-[#f5f7ef]">
                  Acme pilot rollout
                </p>
              </div>
              <div className="rounded-md border border-[#d9ff72]/20 px-3 py-1.5 font-mono text-[11px] text-[#ecffae]">
                Whisper + Codex
              </div>
            </div>
            <div
              data-product-recap-content
              className="space-y-3 text-[12px] leading-5 text-[#c7cdbf]"
            >
              <section>
                <h3 className="mb-1.5 text-[15px] font-semibold text-[#f5f7ef]">
                  Topics
                </h3>
                <p>
                  Acme wants private recaps for sales calls: share decisions and
                  next steps without exposing raw audio outside GCP.
                </p>
              </section>

              <section>
                <h3 className="mb-1.5 text-[15px] font-semibold text-[#f5f7ef]">
                  Decisions
                </h3>
                <ul className="list-disc space-y-1 pl-4 marker:text-[#d9ff72]">
                  <li>Start with 12 account managers for a two-week pilot.</li>
                  <li>
                    Publish recaps to Sales Drive; keep audio private by
                    default.
                  </li>
                </ul>
              </section>

              <section>
                <h3 className="mb-1.5 text-[15px] font-semibold text-[#f5f7ef]">
                  Key quotes
                </h3>
                <blockquote className="border-l-2 border-[#d9ff72]/55 pl-3 text-[#f5f7ef]">
                  <p>
                    &ldquo;If it lands in Drive before the next call, the team
                    will use it.&rdquo;
                  </p>
                  <p className="mt-1 text-[#8d9286]">Sarah Chen, VP Sales</p>
                </blockquote>
                <blockquote className="mt-2 border-l-2 border-[#6ee7b7]/55 pl-3 text-[#f5f7ef]">
                  <p>
                    &ldquo;Model calls can stay inside your GCP gateway.&rdquo;
                  </p>
                  <p className="mt-1 text-[#8d9286]">Diego, product demo</p>
                </blockquote>
              </section>

              <section>
                <h3 className="mb-1.5 text-[15px] font-semibold text-[#f5f7ef]">
                  Action items
                </h3>
                <ol className="list-decimal space-y-1 pl-4 marker:text-[#d9ff72]">
                  <li>
                    <span className="font-semibold text-[#f5f7ef]">Diego</span>:{" "}
                    send gateway spec and pilot pricing by Friday.
                  </li>
                  <li>
                    <span className="font-semibold text-[#f5f7ef]">Acme IT</span>:{" "}
                    confirm GCP project and Drive folder policy.
                  </li>
                </ol>
              </section>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute -inset-x-20 inset-y-0 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.03)_0,rgba(255,255,255,0.03)_1px,transparent_1px,transparent_72px)]" />
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
        <section className="relative overflow-hidden border-b border-white/10">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(115deg,rgba(123,240,206,0.1)_0,transparent_22%),linear-gradient(245deg,rgba(255,138,101,0.12)_0,transparent_24%)]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#7bf0ce,#d9ff72,#ff8a65,#7ea6ff)]"
          />
          <div className="mx-auto grid min-h-[82vh] max-w-7xl items-center gap-10 px-5 pb-20 pt-20 sm:px-6 sm:pt-24 lg:grid-cols-[minmax(0,540px)_minmax(0,1fr)] lg:gap-12 lg:pb-10 lg:pt-6 xl:grid-cols-[minmax(0,600px)_minmax(0,1fr)]">
            <div className="relative z-10 flex flex-col items-start">
              <Image
                src="/app-icon.png"
                alt="Transcript app icon"
                width={72}
                height={72}
                className="mb-6 rounded-[16px] shadow-xl shadow-black/30"
                priority
              />
              <p className="mb-3 rounded-md border border-[#d9ff72]/25 bg-[#d9ff72]/10 px-3 py-1.5 text-[13px] text-[#ecffae]">
                Meet, Zoom, Teams, and any Mac audio - {latestRelease.tag}
              </p>
              <h1 className="max-w-[15ch] text-4xl font-semibold leading-[1.05] sm:text-7xl sm:leading-[1.02] lg:text-[60px] xl:text-[64px] 2xl:text-[72px]">
                Private meeting recaps from your Mac.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[#c3c8ba] lg:max-w-[560px]">
                Transcript records mic plus system audio from any call,
                transcribes locally with Whisper, and turns the meeting into a
                clean recap using Codex, Claude Code, Gemini, or OpenAI through
                your own setup.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {heroHighlights.map((item) => (
                  <span
                    key={item.label}
                    className={`rounded-md border px-3 py-1.5 text-[13px] font-medium ${item.className}`}
                  >
                    {item.label}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
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

            <ProductScene />
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
                {connectors.map((connector) => (
                  <div
                    key={connector.title}
                    className="rounded-lg border border-white/10 bg-[#171a14] p-5"
                  >
                    <div className="mb-4 flex items-center gap-3">
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border ${connector.accent}`}
                      >
                        <Image
                          src={connector.logo}
                          alt={connector.logoAlt}
                          width={30}
                          height={30}
                          className="rounded-md"
                        />
                      </div>
                      <h3 className="text-base font-semibold text-[#f5f7ef]">
                        {connector.title}
                      </h3>
                    </div>
                    <p className="text-sm leading-6 text-[#aeb5a8]">
                      {connector.desc}
                    </p>
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

        <section className="border-t border-white/10 bg-[#0d0f0c] py-20">
          <FAQPageSchema />
          <div className="mx-auto max-w-6xl px-5 sm:px-6">
            <div className="mb-10 max-w-2xl">
              <p className="mb-3 text-sm text-[#d9ff72]">FAQ</p>
              <h2 className="text-3xl font-semibold sm:text-4xl">
                The things teams ask before installing it.
              </h2>
            </div>

            <Accordion className="flex max-w-3xl flex-col gap-3">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={faq.question}
                  value={`faq-${index}`}
                  className="rounded-lg border border-white/10 bg-[#171a14] px-5 transition-colors data-open:border-[#d9ff72]/25 data-open:bg-[#1b2016]"
                >
                  <AccordionTrigger className="py-5 text-base font-semibold text-[#f5f7ef] hover:no-underline [&_[data-slot=accordion-trigger-icon]]:text-[#d9ff72]">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 pr-7 text-sm leading-7 text-[#aeb5a8]">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
