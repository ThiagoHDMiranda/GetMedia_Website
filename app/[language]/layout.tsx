import type { Metadata } from "next";
import { SUPPORTED_LANGUAGES, isSupportedLanguage } from "@/i18n/languages";
import { getSiteUrl } from "@/lib/site-url";
import { APP_INFO } from "@/lib/app-info";
import { I18nProvider } from "@/components/i18n-provider/I18nProvider";

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
      "GetMedia is a free and open-source video and audio downloader for Windows, built on yt-dlp and FFmpeg.",
    ogLocale: "en_US",
  },
  "pt-BR": {
    title: "GetMedia — Baixar vídeos e áudios grátis para Windows",
    description:
      "GetMedia é um downloader gratuito e de código aberto de vídeos e áudios para Windows, baseado em yt-dlp e FFmpeg.",
    ogLocale: "pt_BR",
  },
  es: {
    title: "GetMedia — Descarga vídeos y audio gratis para Windows",
    description:
      "GetMedia es un descargador gratuito y de código abierto de vídeos y audio para Windows, basado en yt-dlp y FFmpeg.",
    ogLocale: "es_ES",
  },
};

const LANGUAGE_ALTERNATES: Record<string, string> = {
  ...Object.fromEntries(
    SUPPORTED_LANGUAGES.map((language) => [language, `/${language}`]),
  ),
  "x-default": `/${SUPPORTED_LANGUAGES[0]}`,
};

export function generateStaticParams() {
  return SUPPORTED_LANGUAGES.map((language) => ({ language }));
}

// Only the supported languages are valid routes. Anything else (e.g. "/foo")
// is rejected at the routing level and renders the custom root not-found page
// server-side, instead of matching this dynamic segment and falling back to
// Next's default "__next_error__" shell when the page throws notFound().
export const dynamicParams = false;

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
  const lang = isSupportedLanguage(language) ? language : "en";

  // NOTE: unsupported languages are handled by the page, which throws
  // notFound() — with the static root app/layout.tsx owning <html>/<body>,
  // that boundary now renders the custom not-found UI server-side instead of
  // falling back to Next's default "__next_error__" shell.

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "SoftwareApplication",
                name: APP_INFO.name,
                description: metadataByLanguage[lang].description,
                url: `${SITE_URL}/${lang}`,
                applicationCategory: "UtilitiesApplication",
                operatingSystem: "Windows",
                author: { "@id": `${SITE_URL}/#person` },
                publisher: { "@id": `${SITE_URL}/#organization` },
                offers: {
                  "@type": "Offer",
                  price: "0",
                  priceCurrency: "USD",
                },
                downloadUrl:
                  "https://github.com/ThiagoHDMiranda/GetMedia_Desktop/releases/latest",
              },
              {
                "@type": "Organization",
                "@id": `${SITE_URL}/#organization`,
                name: APP_INFO.name,
                url: SITE_URL,
                logo: `${SITE_URL}/getmedia_icon_512x512.png`,
                sameAs: ["https://github.com/ThiagoHDMiranda/GetMedia_Desktop"],
              },
              {
                "@type": "Person",
                "@id": `${SITE_URL}/#person`,
                name: APP_INFO.author,
                email: APP_INFO.authorEmail,
                url: "https://github.com/ThiagoHDMiranda",
                sameAs: ["https://github.com/ThiagoHDMiranda"],
              },
            ],
          }),
        }}
      />
      <I18nProvider language={language}>{children}</I18nProvider>
    </>
  );
}
