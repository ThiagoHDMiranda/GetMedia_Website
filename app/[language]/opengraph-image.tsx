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

const iconData = await readFile(
  join(process.cwd(), "public/getmedia_icon_512x512.png"),
  "base64",
);
const iconSrc = `data:image/png;base64,${iconData}`;

const logoData = await readFile(
  join(process.cwd(), "public/getmedia.png"),
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
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        gap: "20px",
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
          // top: -200,
          // left: "50%",
          width: "100%",
          height: "100%",
          // borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,94,206,0.45) 10%, rgba(0,94,206,0.0) 70%)",
        }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={iconSrc}
        alt="GetMedia icon"
        width={350}
        height={350}
        style={{ borderRadius: 28 }}
      />
      <img
        src={logoSrc}
        alt="GetMedia logo"
        // width={}
        height={120}
        style={{ borderRadius: 28 }}
      />
    </div>,
    {
      ...size,
    },
  );
}
