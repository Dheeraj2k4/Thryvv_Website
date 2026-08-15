import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "72px",
              height: "72px",
              borderRadius: "18px",
              background: "#ff5a1f",
              color: "white",
              fontSize: "44px",
              fontWeight: 800,
            }}
          >
            T
          </div>
          <div style={{ color: "white", fontSize: "40px", fontWeight: 800 }}>
            Thryvv
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              color: "white",
              fontSize: "76px",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-2px",
            }}
          >
            Turn Your Business
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "76px",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-2px",
            }}
          >
            <span style={{ color: "white" }}>Into a Global&nbsp;</span>
            <span style={{ color: "#ff5a1f" }}>Pulse.</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#9a9a9a",
            fontSize: "26px",
          }}
        >
          <div style={{ display: "flex" }}>
            Precision digital growth agency
          </div>
          <div style={{ display: "flex", color: "#ff7a4a" }}>
            {siteConfig.email}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
