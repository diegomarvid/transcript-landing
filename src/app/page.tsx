import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Mic,
  Video,
  X,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getLatestRelease } from "@/lib/releases";
import { personalLicensePrice } from "@/lib/commerce";
import { createPageMetadata, supportEmail } from "@/lib/seo";

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

const valuePoints = [
  {
    value: "$50 once",
    label: "One macOS license. No Transcript subscription.",
  },
  {
    value: "Whisper local",
    label: "Transcribe without a metered cloud transcription bill.",
  },
  {
    value: "Claude or ChatGPT",
    label: "Connects to Claude Code or Codex with the subscription you already have.",
  },
];

const overlayAlerts = [
  {
    label: "Meeting started",
    title: "Weekly product sync",
    detail: "You have not joined yet",
    icon: Video,
    accent: "text-[#7bf0ce]",
    iconBg: "bg-[#7bf0ce]/12 border-[#7bf0ce]/25",
    actions: ["Skip meeting", "Later", "Join"],
    primaryAction: "Join",
  },
  {
    label: "Meeting starting",
    title: "Customer check-in",
    detail: "Starts in 4 minutes",
    icon: Calendar,
    accent: "text-[#f4c95d]",
    iconBg: "bg-[#f4c95d]/12 border-[#f4c95d]/25",
    actions: ["Skip meeting", "Later", "Join"],
    primaryAction: "Join",
  },
  {
    label: "Call audio detected",
    title: "Start recording?",
    detail: "Mic and system audio are active",
    icon: Mic,
    accent: "text-[#ff8a65]",
    iconBg: "bg-[#ff8a65]/12 border-[#ff8a65]/25",
    actions: ["Skip", "Later", "Record"],
    primaryAction: "Record",
  },
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
    question: "How much does Transcript cost?",
    answer:
      "Transcript is sold as a one-time $50 license for one macOS user. After that, the core flow can be effectively free if you already pay for Claude or ChatGPT: Whisper transcription runs locally at no extra cost, and recaps can use Claude Code or Codex through the subscription you already have instead of another monthly meeting-notes subscription.",
  },
  {
    question: "Do I need an API key?",
    answer:
      "Not if you use Codex or Claude Code through your existing ChatGPT or Claude subscription. If you prefer direct model calls through Gemini or OpenAI, you can paste your own API key and keep that usage under your account.",
  },
  {
    question: "Does it work with Meet, Zoom, and Teams?",
    answer:
      "Yes. Transcript records microphone plus system audio from your Mac, so it works with Google Meet, Zoom, Teams, Slack huddles, browser calls, local videos, and anything else your Mac can play.",
  },
  {
    question: "Does my meeting audio stay private?",
    answer:
      "Recordings are saved locally on your Mac. Whisper transcription can run on-device. When you generate a recap with an AI provider, the relevant transcript or prompt is sent directly from your Mac to the provider you chose; Transcript does not need a backend to process your meetings.",
  },
  {
    question: "What do I get after recording a meeting?",
    answer:
      "You get a local recording, a Whisper transcript, and an AI recap with the useful parts pulled out: topics, key quotes, decisions, and action items. The app also keeps sessions organized with calendar context, tags, exports, and AI-generated names.",
  },
  {
    question: "Can I use it without a meeting bot?",
    answer:
      "Yes. Nothing joins the meeting, asks for host permission, or appears as an extra participant. Transcript records from your Mac, which is why it works across meeting apps without browser extensions or platform-specific setup.",
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
          <Link
            href="/buy"
            className="hidden rounded-md border border-[#d9ff72]/25 bg-[#d9ff72]/10 px-3 py-1.5 text-[#ecffae] transition hover:border-[#d9ff72]/50 sm:inline-flex"
          >
            Download
          </Link>
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
          <a
            href={`mailto:${supportEmail}`}
            className="transition-colors hover:text-white"
          >
            Support
          </a>
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

function OverlayPreview() {
  return (
    <div
      data-overlay-preview
      className="relative overflow-hidden rounded-lg border border-white/10 bg-[#0b0d0a] p-3 shadow-2xl shadow-black/40"
    >
      <div className="overflow-hidden rounded-[10px] border border-white/10 bg-[#11130f]">
        <div className="flex h-9 items-center justify-between border-b border-white/10 bg-black/25 px-4">
          <div className="flex items-center gap-2 text-[11px] text-[#8d9286]">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b55]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffca57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#78df78]" />
            <span className="ml-3">Transcript overlays</span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px] text-[#8d9286]">
            <Clock aria-hidden="true" className="size-3.5" />
            09:56
          </div>
        </div>

        <div className="relative min-h-[330px] overflow-hidden bg-[radial-gradient(circle_at_20%_14%,rgba(123,240,206,0.13),transparent_28%),linear-gradient(135deg,#11130f,#0d0f0c)] p-3 sm:p-6">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.035)_0,rgba(255,255,255,0.035)_1px,transparent_1px,transparent_74px)] opacity-45"
          />

          <div className="relative flex flex-col gap-3 pt-3">
            {overlayAlerts.map((alert, index) => {
              const Icon = alert.icon;
              const isPrimary = index === 0;

              return (
                <div
                  key={alert.label}
                  className={`border backdrop-blur-xl ${
                    isPrimary
                      ? "rounded-[28px] border-white/10 bg-black/85 px-4 py-4 shadow-xl shadow-black/40 sm:rounded-full sm:px-3 sm:py-2.5"
                      : "ml-4 rounded-full border-white/[0.08] bg-black/45 px-3 py-2 opacity-75 sm:ml-8"
                  }`}
                >
                  <div
                    className={`flex gap-3 ${
                      isPrimary
                        ? "flex-col sm:flex-row sm:items-center sm:justify-between"
                        : "items-center justify-between"
                    }`}
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div
                        className={`flex shrink-0 items-center justify-center rounded-full border ${
                          isPrimary ? "size-9" : "size-8"
                        } ${alert.iconBg}`}
                      >
                        <Icon
                          aria-hidden="true"
                          className={`${isPrimary ? "size-4.5" : "size-4"} ${alert.accent}`}
                        />
                      </div>
                      <div className="min-w-0">
                        <p className={`text-[11px] font-semibold ${alert.accent}`}>
                          {alert.label}
                        </p>
                        <p
                          className={`text-sm font-semibold text-[#f5f7ef] ${
                            isPrimary ? "sm:truncate" : "truncate"
                          }`}
                        >
                          {alert.title}
                        </p>
                        {isPrimary && (
                          <p className="text-[11px] leading-4 text-[#8d9286]">
                            {alert.detail}
                          </p>
                        )}
                      </div>
                    </div>

                    <div
                      className={`flex shrink-0 gap-2 ${
                        isPrimary
                          ? "w-full flex-wrap justify-end sm:w-auto"
                          : ""
                      }`}
                    >
                      {(isPrimary ? alert.actions : [alert.primaryAction]).map(
                        (action) => (
                          <span
                            key={action}
                            className={`inline-flex h-7 items-center gap-1.5 rounded-full px-3 text-[12px] font-semibold ${
                              action === alert.primaryAction
                                ? "bg-[#0a84ff] text-white"
                                : "bg-white/12 text-[#f5f7ef]"
                            }`}
                          >
                            {isPrimary &&
                            (action === "Skip meeting" ||
                              action === "Dismiss" ||
                              action === "Skip") ? (
                              <X aria-hidden="true" className="size-3" />
                            ) : null}
                            {action}
                          </span>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
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
                <Link
                  href="/buy"
                  className="inline-flex items-center justify-center rounded-md bg-[#d9ff72] px-5 py-3 text-sm font-semibold text-[#15170f] transition hover:bg-[#ecffae]"
                >
                  Download for macOS
                </Link>
                <a
                  href="/download"
                  className="inline-flex items-center justify-center rounded-md border border-white/15 px-5 py-3 text-sm font-semibold text-[#f5f7ef] transition hover:border-white/35"
                >
                  Already bought? Get latest
                </a>
              </div>
              <p className="mt-4 text-[13px] text-[#8d9286]">
                One-time {personalLicensePrice} license. Download starts after
                checkout. Requires macOS 15.7 or later.
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

        <section className="border-b border-white/10 py-16">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="mb-3 text-sm text-[#6ee7b7]">Individual license</p>
              <h2 className="max-w-xl text-3xl font-semibold sm:text-4xl">
                Pay once. Use the AI you already have.
              </h2>
              <Link
                href="/buy"
                className="mt-6 inline-flex items-center justify-center rounded-md bg-[#d9ff72] px-5 py-3 text-sm font-semibold text-[#15170f] transition hover:bg-[#ecffae]"
              >
                Download after checkout
              </Link>
            </div>
            <div className="rounded-lg border border-[#6ee7b7]/20 bg-[#6ee7b7]/10 p-5">
              <div className="grid gap-5 sm:grid-cols-3">
                {valuePoints.map((point) => (
                  <div key={point.value}>
                    <p className="mb-2 text-xl font-semibold text-[#e7fff5]">
                      {point.value}
                    </p>
                    <p className="text-sm leading-6 text-[#aeb5a8]">
                      {point.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 bg-[#0d0f0c] py-20">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="mb-3 text-sm text-[#7bf0ce]">Calendar overlays</p>
              <h2 className="max-w-xl text-3xl font-semibold sm:text-4xl">
                Transcript catches the meeting you forgot to join.
              </h2>
              <p className="mt-5 max-w-lg text-sm leading-7 text-[#aeb5a8]">
                If a calendar meeting starts and you are not in it, Transcript
                can nudge you to join, skip, or snooze. It can also remind you
                before the call and prompt recording when meeting audio is active.
              </p>
            </div>

            <OverlayPreview />
          </div>
        </section>

        <section className="border-b border-white/10 py-20">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="mb-3 text-sm text-[#d9ff72]">
                Codex-ready archive
              </p>
              <h2 className="max-w-xl text-3xl font-semibold sm:text-4xl">
                Ask Codex about any meeting later.
              </h2>
              <p className="mt-5 max-w-lg text-sm leading-7 text-[#aeb5a8]">
                Transcript stores meetings as local recordings, transcripts,
                recaps, tags, names, and exports on purpose. Codex or Claude
                Code can search that archive, regenerate summaries, compare
                calls, and prepare follow-ups without a new notes database.
              </p>

              <div className="mt-6 grid gap-3 text-sm text-[#c7cdbf]">
                <div className="rounded-lg border border-white/10 bg-[#171a14] p-4">
                  The bundled CLI lets Codex search by customer, topic, tag, or
                  week across your local meeting history.
                </div>
                <div className="rounded-lg border border-white/10 bg-[#171a14] p-4">
                  Use the CLI with Claude Code or Codex to regenerate recaps,
                  pull decisions, and draft follow-ups from the source files.
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg border border-white/10 bg-[#12150f]">
              <div className="flex items-center justify-between border-b border-white/10 bg-black/20 px-4 py-3">
                <span className="font-mono text-[12px] text-[#8d9286]">
                  local archive
                </span>
                <span className="rounded bg-[#d9ff72]/10 px-2 py-1 text-[11px] text-[#ecffae]">
                  bundled CLI
                </span>
              </div>

              <div className="grid gap-4 p-4">
                <div className="rounded-md border border-[#7bf0ce]/20 bg-[#7bf0ce]/8 p-4">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#7bf0ce]">
                    Codex / Claude Code prompt
                  </p>
                  <p className="font-mono text-[12px] leading-6 text-[#dfe6d8]">
                    Find every Transcript meeting I had with Acme this week,
                    pull out decisions, blockers, and promised next steps, then
                    draft a follow-up email I can send today.
                  </p>
                </div>

                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#8d9286]">
                    CLI creates the archive
                  </p>
                  <code className="block rounded-md border border-white/10 bg-black/30 p-4 font-mono text-[12px] leading-6 text-[#ecffae]">
                    transcript record --duration 60m
                    <br />
                    transcript transcribe latest
                    <br />
                    transcript summarize latest
                    <br />
                    transcript rename latest --apply
                  </code>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="mb-3 text-sm text-[#f4c95d]">
                Speaker-aware recap pipeline
              </p>
              <h2 className="text-3xl font-semibold sm:text-4xl">
                Better speaker cues before the recap.
              </h2>
              <p className="mt-5 text-sm leading-7 text-[#aeb5a8]">
                Transcript does not just dump a flat transcript into AI. It
                keeps mic and system audio cues aligned, marks Local, Remote,
                and Overlap segments, then sends a cleaner recap input so Codex
                or Claude Code has a better shot at who said what.
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-[#171a14] p-4">
              <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-3">
                <span className="font-mono text-[12px] text-[#8d9286]">
                  .recap-input.vtt
                </span>
                <span className="rounded-md bg-[#d9ff72]/10 px-2 py-1 text-[11px] text-[#ecffae]">
                  mic + system mix
                </span>
              </div>
              <div className="mb-4 grid gap-2 text-[11px] text-[#aeb5a8] sm:grid-cols-3">
                <span className="rounded border border-white/10 bg-black/20 px-2 py-1">
                  Local: mic
                </span>
                <span className="rounded border border-white/10 bg-black/20 px-2 py-1">
                  Remote: system
                </span>
                <span className="rounded border border-white/10 bg-black/20 px-2 py-1">
                  Overlap: tentative
                </span>
              </div>
              <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-[12px] leading-6 text-[#c7cdbf]">
                {`00:03:14.120 --> 00:03:19.480
Local: I can own the rollout notes by Friday.

00:03:19.540 --> 00:03:25.900
Remote: Great. Let's keep the beta group to ten customers.

00:03:26.020 --> 00:03:28.700
Overlap: Both sides are active; attribution is tentative.

00:03:31.400 --> 00:03:38.600
Remote: Support needs the migration checklist before launch.`}
              </pre>
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 bg-[#0d0f0c] py-20">
          <FAQPageSchema />
          <div className="mx-auto max-w-6xl px-5 sm:px-6">
            <div className="mb-10 max-w-2xl">
              <p className="mb-3 text-sm text-[#d9ff72]">FAQ</p>
              <h2 className="text-3xl font-semibold sm:text-4xl">
                Before you buy Transcript.
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
