import { ImageResponse } from "next/og";

export const runtime = "edge";

/** Share card, 1200×630. A title plus the two proof rings, in the site palette. */
export function GET(request: Request) {
  const raw = new URL(request.url).searchParams.get("title") ?? "Andamio";
  const title = raw.replace(/\s+/g, " ").trim().slice(0, 90) || "Andamio";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#0b121b",
          color: "#efe9dd",
          padding: "72px",
        }}
      >
        <div
          style={{ display: "flex", flexDirection: "column", maxWidth: 760 }}
        >
          <div style={{ fontSize: 22, letterSpacing: 3, color: "#3fd9e8" }}>
            ANDAMIO
          </div>
          <div
            style={{
              fontSize: 68,
              fontWeight: 600,
              lineHeight: 1.05,
              marginTop: 28,
            }}
          >
            {title}
          </div>
        </div>
        <svg width="300" height="300" viewBox="0 0 300 300">
          <circle
            cx="150"
            cy="150"
            r="128"
            fill="none"
            stroke="#3fd9e8"
            strokeWidth="10"
          />
          <circle
            cx="150"
            cy="150"
            r="92"
            fill="none"
            stroke="#ff6b35"
            strokeWidth="8"
          />
          <circle cx="150" cy="150" r="16" fill="#efe9dd" />
        </svg>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
