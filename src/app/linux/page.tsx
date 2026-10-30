import Link from "next/link";
import { createPageMetadata, supportEmail } from "@/lib/seo";
import { Footer, Nav } from "../page";

export const metadata = createPageMetadata({
  path: "/linux",
  title: "Transcript CLI for Linux",
  description:
    "Install the Transcript CLI on a Linux server: turn recordings into transcripts, recaps, and Google Drive docs without a Mac.",
});

function Code({ children }: { children: string }) {
  return (
    <pre className="my-3 overflow-x-auto rounded-md border border-white/10 bg-black/30 p-4 font-mono text-[12px] leading-6 text-[#ecffae]">
      {children}
    </pre>
  );
}

const serviceUnit = `mkdir -p ~/inbox ~/.config/systemd/user
cat > ~/.config/systemd/user/transcript-watch.service <<'EOF'
[Unit]
Description=Transcript inbox
After=network-online.target

[Service]
Environment=PATH=%h/.local/bin:/usr/local/bin:/usr/bin:/bin
ExecStart=%h/.local/bin/transcript watch %h/inbox
Restart=on-failure

[Install]
WantedBy=default.target
EOF
systemctl --user daemon-reload
systemctl --user enable --now transcript-watch
sudo loginctl enable-linger "$USER"   # keep running after logout`;

export default function Linux() {
  return (
    <>
      <Nav />
      <main className="bg-[#11130f] pt-14 text-[#f5f7ef]">
        <article className="mx-auto max-w-3xl px-6 pb-24 pt-16">
          <h1 className="mb-2 text-3xl font-semibold">Transcript CLI for Linux</h1>
          <p className="mb-10 text-sm text-[#8d9286]">
            Turn recordings into transcripts, recaps, and Google Drive docs on a
            server. Send a voice memo from your phone after a meeting and the
            recap lands in Drive on its own.
          </p>

          <div className="space-y-10 text-sm leading-relaxed text-[#aeb5a8] [&_a]:text-[#d9ff72] [&_a]:underline [&_a]:underline-offset-2 [&_h2]:mb-3 [&_h2]:text-base [&_h2]:font-semibold [&_h2]:text-[#f5f7ef] [&_li]:pl-1 [&_ol]:list-decimal [&_ol]:space-y-1 [&_ol]:pl-5 [&_p_code]:text-[#f5f7ef] [&_li_code]:text-[#f5f7ef] [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5">
            <section>
              <h2>1. Install</h2>
              <Code>{"curl -fsSL https://transcriptprivate.com/install.sh | sh"}</Code>
              <p>
                One static binary for x86_64 or ARM64 that runs on any
                distribution. It installs to <code>~/.local/bin</code> (or{" "}
                <code>/usr/local/bin</code> as root) after checking its
                SHA-256. Transcript also needs ffmpeg, and Python 3 with venv for
                local Whisper:
              </p>
              <Code>{"sudo apt install ffmpeg python3-venv   # Debian / Ubuntu"}</Code>
            </section>

            <section>
              <h2>2. Activate</h2>
              <Code>{"transcript license activate TRANSCRIPT-..."}</Code>
              <p>
                A server uses one activation of your license, like a Mac. Find
                your key in the Polar purchase email under Benefit Grants.
              </p>
            </section>

            <section>
              <h2>3. Choose who writes the recap</h2>
              <ul>
                <li>
                  <strong>Codex</strong> (recommended): run <code>codex login</code>{" "}
                  on the server. Transcript uses it automatically.
                </li>
                <li>
                  <strong>Claude Code</strong>: log in with your Claude.ai
                  subscription and pass <code>--provider claude</code>.
                </li>
                <li>
                  <strong>Gemini</strong>: works as a fallback, and is required to
                  recap straight from audio and to name sessions with AI:
                </li>
              </ul>
              <Code>{"transcript config --gemini-api-key YOUR_KEY"}</Code>
              <p>
                Secrets are saved in <code>~/.config/transcript-app/credentials.json</code>,
                readable only by your user.
              </p>
            </section>

            <section>
              <h2>4. Connect Google Drive (optional)</h2>
              <Code>{"transcript drive connect"}</Code>
              <ol>
                <li>Open the printed link on any device and sign in.</li>
                <li>Pick the Drive folder for your recaps.</li>
                <li>
                  The browser ends on a page that fails to load (
                  <code>127.0.0.1</code>). That is expected: copy that
                  page&apos;s full address and paste it into the terminal.
                </li>
              </ol>
              <p className="mt-3">
                Each recap uploads as a Google Doc, plus its metadata. Add{" "}
                <code>--include-transcript</code> or <code>--include-audio</code>{" "}
                to upload those too. Check it with{" "}
                <code>transcript drive status --check</code>.
              </p>
            </section>

            <section>
              <h2>5. Process recordings automatically</h2>
              <p>
                <code>transcript watch</code> turns a folder into an inbox. Each
                audio file that lands there (m4a, mp3, wav, ogg/opus voice
                notes, video…) is imported, transcribed, recapped, named, and
                uploaded. Files are picked up once they stop growing, so copies
                still in progress are safe.
              </p>
              <Code>{"transcript watch ~/inbox"}</Code>
              <p>Run it as a service so it survives logouts and reboots:</p>
              <Code>{serviceUnit}</Code>
              <p>
                Follow it with <code>journalctl --user -u transcript-watch -f</code>.
                Get recordings into <code>~/inbox</code> however you like:
                Syncthing, Tailscale Taildrop (
                <code>tailscale file get --loop ~/inbox</code>),{" "}
                <code>scp</code>, or a phone app that uploads over SFTP. Files that
                are not readable audio move to <code>~/inbox/failed/</code> with
                a note explaining why.
              </p>
            </section>

            <section>
              <h2>Speed and privacy</h2>
              <ul>
                <li>
                  Transcription runs locally with Whisper (faster-whisper) on the
                  CPU, or on an NVIDIA GPU when CUDA is available. The first run
                  installs it in a private Python environment and downloads the
                  model.
                </li>
                <li>
                  The default model, <code>large-v3-turbo</code>, gives the best
                  quality but can take longer than the meeting on a small
                  server. Choose a lighter one with{" "}
                  <code>--model small</code> (also on <code>watch</code>), or set{" "}
                  <code>TRANSCRIPT_WHISPER_MODEL=small</code>.
                </li>
                <li>
                  <code>transcript watch --from-audio</code> skips local
                  transcription and sends the audio to Gemini instead: faster on
                  small servers, but the audio leaves your machine.
                </li>
              </ul>
            </section>

            <section>
              <h2>One file at a time</h2>
              <Code>{`transcript import ~/meeting.m4a --json
transcript transcribe latest
transcript recap latest
transcript rename latest --apply
transcript drive upload latest`}</Code>
              <p>
                Every command supports <code>--json</code>, so scripts and AI
                agents can drive it. See <code>transcript --help</code>.
              </p>
            </section>

            <section>
              <h2>Update and uninstall</h2>
              <Code>{`transcript update
rm ~/.local/bin/transcript
rm -r ~/.config/transcript-app ~/.local/share/TranscriptPrivate`}</Code>
              <p>
                Recordings stay in <code>~/Documents/Transcript-App</code> until
                you delete them; change the location with{" "}
                <code>transcript config --data-dir /path</code>.
              </p>
            </section>

            <section>
              <h2>What only the Mac does</h2>
              <p>
                Recording system audio, live transcription, meeting detection,
                PDF export, and Google Calendar linking stay in the Mac app. On
                Linux, recordings arrive as files.
              </p>
            </section>

            <section>
              <h2>Help</h2>
              <p>
                Email <a href={`mailto:${supportEmail}`}>{supportEmail}</a> and
                include the output of <code>transcript --version</code>.
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
