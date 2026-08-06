import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { SUPPORTED_LANGUAGES, isSupportedLanguage } from "@/i18n/languages";
import { getSiteUrl } from "@/lib/site-url";
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

const SITE_URL = getSiteUrl();

interface LanguageLayoutProps {
  children: React.ReactNode;
  params: Promise<{ language: string }>;
}

interface LanguageMetadata {
  title: string;
  description: string;
  ogLocale: string;
}

const metadataByLanguage: Record<string, LanguageMetadata> = {
  en: {
    title: "GetMedia — Download videos and audio",
    description:
      "GetMedia is a free, open-source video and audio downloader for Windows, built on yt-dlp and FFmpeg.",
    ogLocale: "en_US",
  },
  "pt-BR": {
    title: "GetMedia — Baixar vídeos e áudios",
    description:
      "GetMedia é um downloader gratuito e de código aberto de vídeos e áudios para Windows, baseado em yt-dlp e FFmpeg.",
    ogLocale: "pt_BR",
  },
  es: {
    title: "GetMedia — Descarga vídeos y audio",
    description:
      "GetMedia es un descargador gratuito y de código abierto de vídeos y audio para Windows, basado en yt-dlp y FFmpeg.",
    ogLocale: "es_ES",
  },
};

export function generateStaticParams() {
  return SUPPORTED_LANGUAGES.map((language) => ({ language }));
}

export async function generateMetadata({
  params,
}: LanguageLayoutProps): Promise<Metadata> {
  const { language } = await params;
  const lang = isSupportedLanguage(language) ? language : "en";
  const { title, description, ogLocale } = metadataByLanguage[lang];

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical: `/${lang}`,
    },
    openGraph: {
      title,
      description,
      url: `/${lang}`,
      siteName: "GetMedia",
      locale: ogLocale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
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