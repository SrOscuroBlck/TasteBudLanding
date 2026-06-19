import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

// Build-time generated social share image (1200×630), applied site-wide via the
// Next.js file convention — no static asset to maintain. Uses the brand glyph
// and palette so link previews look on-brand on every platform.

export const alt = `${site.name} — ${site.tagline}`;
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
          padding: "72px 80px",
          background:
            "radial-gradient(ellipse at 75% 15%, #2a0f08 0%, #0c0c0c 55%)",
          color: "#FFF0DB",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <svg viewBox="3372 1671 1029 733" width="92" height="66">
            <path
              d="M3382.03 1681.53L3382.03 1851.53L3595.03 1851.53L3595.03 2393.53L3795.03 2393.53L3795.03 1851.53L3796.19 1681.53L3382.03 1681.53Z"
              fill="#FFF0DB"
            />
            <path
              d="M3845 1682L3845 2022.16C3892.24 2083.11 3968.99 2126.05 4078.75 2125.97C4204.86 2125.87 4246.72 2102.38 4256.28 2126.31C4283.19 2193.67 4023.1 2165.89 3938.81 2183.03C3896.14 2191.71 3862.22 2222.75 3845 2243.06L3845 2393.53L4036 2393.53C4073.49 2393 4124.17 2393 4153.5 2393C4202.17 2393 4239.17 2392.53 4275.5 2370.53C4311.83 2348.53 4340.17 2318.36 4360.5 2280.03C4380.83 2241.7 4391 2197.53 4391 2147.53C4391 2097.53 4380.83 2053.2 4360.5 2014.53C4340.17 1975.86 4311.83 1945.7 4275.5 1924.03C4239.17 1902.36 4196.67 1891.53 4148 1891.53C4118.67 1891.53 4147.99 1891.52 4043.41 1893.16C4042.51 1893.17 4041.87 1893.23 4041 1893.25L4041 1682L3845 1682Z"
              fill="#AB1F00"
            />
            <path
              d="M4112.69 1681.53C4112.69 1681.53 4117.5 1707.87 4129.57 1729.47C4170.37 1802.48 4213.01 1827.2 4260.07 1849.94L4260.07 1681.53L4112.69 1681.53Z"
              fill="#AB1F00"
            />
          </svg>
          <div style={{ fontSize: 44, fontWeight: 800, letterSpacing: -1 }}>{site.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 84,
              fontWeight: 800,
              lineHeight: 1.04,
              letterSpacing: -2,
              maxWidth: 980,
            }}
          >
            <div>Stop scrolling menus.</div>
            <div style={{ color: "#E0532B" }}>Start tasting.</div>
          </div>
          <div style={{ marginTop: 28, fontSize: 30, color: "rgba(255,240,219,0.72)", maxWidth: 880, lineHeight: 1.4 }}>
            The dishes worth ordering — at any restaurant, each with a warm reason why.
          </div>
        </div>

        <div style={{ fontSize: 26, color: "rgba(255,240,219,0.6)" }}>{site.domain}</div>
      </div>
    ),
    { ...size }
  );
}
