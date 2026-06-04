import { ImageResponse } from "next/og";
import { absoluteUrl, siteName } from "@/lib/seo";

export const alt = "Transcript private meeting recap preview";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#11130f",
          color: "#f5f7ef",
          padding: 64,
          fontFamily: "Arial",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(217,255,114,0.18), transparent 34%), linear-gradient(315deg, rgba(255,138,101,0.16), transparent 30%), repeating-linear-gradient(90deg, rgba(255,255,255,0.055) 0, rgba(255,255,255,0.055) 1px, transparent 1px, transparent 88px)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <img
            src={absoluteUrl("/app-icon.png")}
            alt=""
            width="82"
            height="82"
            style={{ borderRadius: 18 }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 30, fontWeight: 700 }}>{siteName}</div>
            <div style={{ color: "#d9ff72", fontSize: 22 }}>
              Local-first meeting recaps for macOS
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              maxWidth: 900,
              fontSize: 78,
              lineHeight: 0.96,
              fontWeight: 700,
              letterSpacing: "-1px",
            }}
          >
            Private meeting recaps from your Mac.
          </div>
          <div
            style={{
              display: "flex",
              gap: 14,
              color: "#11130f",
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            {["Private by default", "Local Whisper", "Your AI", "No bot"].map(
              (item, index) => (
                <div
                  key={item}
                  style={{
                    borderRadius: 10,
                    padding: "12px 18px",
                    background:
                      index === 0
                        ? "#d9ff72"
                        : index === 1
                          ? "#7bf0ce"
                          : index === 2
                            ? "#ff8a65"
                            : "#f5f7ef",
                  }}
                >
                  {item}
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
