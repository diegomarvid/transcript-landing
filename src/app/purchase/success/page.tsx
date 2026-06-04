import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  Copy,
  Download,
  KeyRound,
  Mail,
  MousePointerClick,
} from "lucide-react";
import { Footer, Nav } from "@/app/page";
import { personalLicenseLabel } from "@/lib/commerce";
import { createPageMetadata, supportEmail } from "@/lib/seo";

export const metadata = createPageMetadata({
  path: "/purchase/success",
  title: "Transcript purchase complete",
  description:
    "Download Transcript for macOS, open your Polar purchase email, and copy your license key for activation.",
});

type PurchaseSuccessProps = {
  searchParams?: Promise<{
    checkout_id?: string;
    checkoutId?: string;
  }>;
};

export default async function PurchaseSuccess({
  searchParams,
}: PurchaseSuccessProps) {
  const params = searchParams ? await searchParams : {};
  const checkoutId = params.checkout_id ?? params.checkoutId;

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-[#11130f] pt-14 text-[#f5f7ef]">
        <section className="relative overflow-hidden border-b border-white/10">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(115deg,rgba(123,240,206,0.12)_0,transparent_24%),linear-gradient(245deg,rgba(217,255,114,0.1)_0,transparent_28%)]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#7bf0ce,#d9ff72,#ff8a65,#7ea6ff)]"
          />

          <div className="relative mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-28">
            <div className="min-w-0">
              <Image
                src="/app-icon.png"
                alt="Transcript app icon"
                width={72}
                height={72}
                className="mb-6 rounded-[16px] shadow-xl shadow-black/30"
                priority
              />
              <p className="mb-3 inline-flex items-center gap-2 rounded-md border border-[#7bf0ce]/25 bg-[#7bf0ce]/10 px-3 py-1.5 text-[13px] text-[#bdfbea]">
                <CheckCircle2 aria-hidden="true" className="size-4" />
                Purchase complete
              </p>
              <h1 className="max-w-[14ch] text-4xl font-semibold leading-[1.05] sm:text-6xl">
                Copy your license key from Polar.
              </h1>
              <p className="mt-5 max-w-xl break-words text-base leading-7 text-[#c3c8ba]">
                Your {personalLicenseLabel} is ready. Download Transcript, then
                open the order confirmation email from Polar. Click{" "}
                <strong>Access purchase</strong> in that email to view and copy
                your Transcript license key.
              </p>

              {checkoutId ? (
                <p className="mt-4 inline-block max-w-full break-all rounded-md border border-white/10 bg-black/25 px-3 py-2 font-mono text-[12px] text-[#8d9286]">
                  Checkout {checkoutId}
                </p>
              ) : null}

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href="/download"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#d9ff72] px-5 py-3 text-sm font-semibold text-[#15170f] transition hover:bg-[#ecffae] sm:w-auto"
                >
                  <Download aria-hidden="true" className="size-4" />
                  Download for macOS
                </a>
                <a
                  href={`mailto:${supportEmail}`}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-white/15 px-5 py-3 text-sm font-semibold text-[#f5f7ef] transition hover:border-white/35 sm:w-auto"
                >
                  <Mail aria-hidden="true" className="size-4" />
                  Contact support
                </a>
              </div>
            </div>

            <div className="min-w-0 rounded-lg border border-white/10 bg-[#171a14] p-4 shadow-2xl shadow-black/30">
              <div className="rounded-md border border-white/10 bg-black/20 p-5">
                <p className="mb-4 font-mono text-[12px] text-[#8d9286]">
                  how to activate
                </p>
                <div className="grid gap-3">
                  {[
                    {
                      title: "Open the Polar email",
                      body: "Look for the Transcript order confirmation at the email used at checkout.",
                      icon: Mail,
                    },
                    {
                      title: "Click Access purchase",
                      body: "The email does not show the key directly. The button opens your Polar purchase page.",
                      icon: MousePointerClick,
                    },
                    {
                      title: "Copy the license key",
                      body: "Copy the Transcript macOS license key shown under Benefit Grants.",
                      icon: Copy,
                    },
                    {
                      title: "Paste it in Transcript",
                      body: "Open the app, choose Activate License, and paste the key when prompted.",
                      icon: KeyRound,
                    },
                  ].map((item, index) => (
                    <div
                      key={item.title}
                      className="grid gap-3 rounded-lg border border-white/10 bg-[#11130f] p-4 sm:grid-cols-[38px_1fr]"
                    >
                      <div className="flex size-9 items-center justify-center rounded-full border border-[#d9ff72]/25 bg-[#d9ff72]/10 text-sm font-semibold text-[#ecffae]">
                        <item.icon aria-hidden="true" className="size-4" />
                      </div>
                      <div>
                        <h2 className="text-base font-semibold text-[#f5f7ef]">
                          {`0${index + 1}. ${item.title}`}
                        </h2>
                        <p className="mt-1 break-words text-sm leading-6 text-[#aeb5a8]">
                          {item.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-[#8d9286]">
                If the Polar email does not arrive in a few minutes, check spam
                or email{" "}
                <a
                  href={`mailto:${supportEmail}`}
                  className="text-[#d9ff72] hover:text-[#ecffae]"
                >
                  {supportEmail}
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#0d0f0c] py-14">
          <div className="mx-auto max-w-6xl px-5 text-sm leading-7 text-[#aeb5a8] sm:px-6">
            <p>
              The email receipt and the license key are separate: the receipt
              confirms the purchase, and the <strong>Access purchase</strong>{" "}
              button opens the Polar page where the key can be copied. Bought by
              mistake or need the license moved to another email? Contact
              support and include your checkout ID.
            </p>
            <Link
              href="/"
              className="mt-4 inline-flex text-[#d9ff72] transition hover:text-[#ecffae]"
            >
              Back to Transcript
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
