import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { SUPPORTED_LANGUAGES, isSupportedLanguage } from "@/i18n/languages";
import { getSiteUrl } from "@/lib/site-url";
import { APP_INFO } from "@/lib/app-info";
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
    title: "GetMedia — Download videos and audio for Windows for free",
    description:
      "GetMedia is a free and open-source video and audio downloader for Windows, built on yt-dlp and FFmpeg. Download videos and audio from YouTube and other sites.",
    ogLocale: "en_US",
  },
  "pt-BR": {
    title: "GetMedia — Baixar vídeos e áudios grátis para Windows",
    description:
      "GetMedia é um downloader gratuito e de código aberto de vídeos e áudios para Windows, baseado em yt-dlp e FFmpeg. Baixe do YouTube e outros sites.",
    ogLocale: "pt_BR",
  },
  es: {
    title: "GetMedia — Descarga vídeos y audio gratis para Windows",
    description:
      "GetMedia es un descargador gratuito y de código abierto de vídeos y audio para Windows, basado en yt-dlp y FFmpeg. Descarga de YouTube y otros sitios.",
    ogLocale: "es_ES",
  },
};

const LANGUAGE_ALTERNATES: Record<string, string> = {
  ...Object.fromEntries(SUPPORTED_LANGUAGES.map((language) => [language, `/${language}`])),
  "x-default": `/${SUPPORTED_LANGUAGES[0]}`,
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
      languages: LANGUAGE_ALTERNATES,
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: APP_INFO.name,
              description: metadataByLanguage[language].description,
              url: `${SITE_URL}/${language}`,
              applicationCategory: "UtilitiesApplication",
              operatingSystem: "Windows",
              author: {
                "@type": "Person",
                name: APP_INFO.author,
              },
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              downloadUrl: "https://github.com/ThiagoHDMiranda/GetMedia_Desktop/releases/latest",
            }),
          }}
        />
        <I18nProvider language={language}>{children}</I18nProvider>
      </body>
    </html>
  );
}