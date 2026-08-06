import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import en from "@/locales/en/translation.json";
import ptBR from "@/locales/pt-BR/translation.json";
import es from "@/locales/es/translation.json";

export const alt = "GetMedia — Download videos and audio";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

const logoData = await readFile(
  join(process.cwd(), "public/getmedia_icon_512x512.png"),
  "base64",
);
const logoSrc = `data:image/png;base64,${logoData}`;

const resources: Record<string, typeof en> = {
  en,
  "pt-BR": ptBR,
  es,
};

export default async function Image({
  params,
}: {
  params: Promise<{ language: string }>;
}) {
  const { language } = await params;
  const t = resources[language] ?? en;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0d0e1a",
          color: "#f0f2ff",
          fontFamily: "geist",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -200,
            left: "50%",
            width: 900,
            height: 900,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(0,94,206,0.45) 0%, rgba(0,94,206,0.0) 70%)",
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoSrc}
          alt="GetMedia logo"
          width={150}
          height={150}
          style={{ borderRadius: 28 }}
        />
        <div
          style={{
            display: "flex",
            marginTop: 36,
            fontSize: 88,
            lineHeight: 1,
            fontWeight: 600,
            letterSpacing: "-0.02em",
          }}
        >
          Get<span style={{ color: "#60a5fa" }}>Media</span>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 20,
            fontSize: 36,
            color: "#8298b0",
            textAlign: "center",
          }}
        >
          {t.hero.titleLine1} — {t.hero.titleLine2}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 40,
            padding: "14px 32px",
            borderRadius: 999,
            background: "rgba(0,94,206,0.16)",
            border: "1px solid rgba(96,165,250,0.4)",
            fontSize: 28,
            color: "#60a5fa",
          }}
        >
          {t.download.sectionTitle}
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}