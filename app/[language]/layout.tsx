import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { SUPPORTED_LANGUAGES, isSupportedLanguage } from "@/i18n/languages";
import { I18nProvider } from "@/components/i18n-provider/I18nProvider";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

interface LanguageLayoutProps {
  children: React.ReactNode;
  params: Promise<{ language: string }>;
}

const metadataByLanguage: Record<string, Metadata> = {
  en: {
    title: "GetMedia — Download videos and audio",
    description:
      "GetMedia is a free, open-source video and audio downloader for Windows, built on yt-dlp and FFmpeg.",
  },
  "pt-BR": {
    title: "GetMedia — Baixar vídeos e áudios",
    description:
      "GetMedia é um downloader gratuito e de código aberto de vídeos e áudios para Windows, baseado em yt-dlp e FFmpeg.",
  },
  es: {
    title: "GetMedia — Descarga vídeos y audio",
    description:
      "GetMedia es un descargador gratuito y de código abierto de vídeos y audio para Windows, basado en yt-dlp y FFmpeg.",
  },
};

export function generateStaticParams() {
  return SUPPORTED_LANGUAGES.map((language) => ({ language }));
}

export async function generateMetadata({
  params,
}: LanguageLayoutProps): Promise<Metadata> {
  const { language } = await params;
  return isSupportedLanguage(language)
    ? metadataByLanguage[language]
    : metadataByLanguage.en;
}

export default async function LanguageLayout({
  children,
  params,
}: LanguageLayoutProps) {
  const { language } = await params;

  if (!isSupportedLanguage(language)) {
    notFound();
  }

  return (
    <html
      lang={language}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <I18nProvider language={language}>{children}</I18nProvider>
      </body>
    </html>
  );
}