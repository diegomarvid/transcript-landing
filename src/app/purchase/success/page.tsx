import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Download, KeyRound, Mail } from "lucide-react";
import { Footer, Nav } from "@/app/page";
import { personalLicenseLabel } from "@/lib/commerce";
import { createPageMetadata, supportEmail } from "@/lib/seo";

export const metadata = createPageMetadata({
  path: "/purchase/success",
  title: "Transcript purchase complete",
  description:
    "Download Transcript for macOS and keep your Polar license key for activation and updates.",
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
            <div>
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
                Transcript is ready for your Mac.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-[#c3c8ba]">
                Your {personalLicenseLabel} is tied to the license key in your
                Polar receipt. Keep that email handy for activation and future
                updates.
              </p>

              {checkoutId ? (
                <p className="mt-4 inline-flex max-w-full rounded-md border border-white/10 bg-black/25 px-3 py-2 font-mono text-[12px] text-[#8d9286]">
                  Checkout {checkoutId}
                </p>
              ) : null}

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href="/download"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-[#d9ff72] px-5 py-3 text-sm font-semibold text-[#15170f] transition hover:bg-[#ecffae]"
                >
                  <Download aria-hidden="true" className="size-4" />
                  Download for macOS
                </a>
                <a
                  href={`mailto:${supportEmail}`}
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-white/15 px-5 py-3 text-sm font-semibold text-[#f5f7ef] transition hover:border-white/35"
                >
                  <Mail aria-hidden="true" className="size-4" />
                  Contact support
                </a>
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-[#171a14] p-4 shadow-2xl shadow-black/30">
              <div className="rounded-md border border-white/10 bg-black/20 p-5">
                <p className="mb-4 font-mono text-[12px] text-[#8d9286]">
                  next steps
                </p>
                <div className="grid gap-3">
                  {[
                    {
                      title: "Save the Polar receipt",
                      body: "Polar sends the license key and payment receipt to the email used at checkout.",
                    },
                    {
                      title: "Install the latest build",
                      body: "Download Transcript for macOS, then open it from your Applications folder.",
                    },
                    {
                      title: "Keep the key for activation",
                      body: "The same key is used for license activation, device management, and future updates.",
                    },
                  ].map((item, index) => (
                    <div
                      key={item.title}
                      className="grid gap-3 rounded-lg border border-white/10 bg-[#11130f] p-4 sm:grid-cols-[38px_1fr]"
                    >
                      <div className="flex size-9 items-center justify-center rounded-full border border-[#d9ff72]/25 bg-[#d9ff72]/10 text-sm font-semibold text-[#ecffae]">
                        {index === 2 ? (
                          <KeyRound aria-hidden="true" className="size-4" />
                        ) : (
                          `0${index + 1}`
                        )}
                      </div>
                      <div>
                        <h2 className="text-base font-semibold text-[#f5f7ef]">
                          {item.title}
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-[#aeb5a8]">
                          {item.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-[#8d9286]">
                If the receipt does not arrive in a few minutes, check spam or
                email{" "}
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
              Bought by mistake or need the license moved to another email?
              Reply to the Polar receipt or contact support and include your
              checkout ID.
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
