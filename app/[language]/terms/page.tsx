import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isSupportedLanguage, SUPPORTED_LANGUAGES } from "@/i18n/languages";
import { getSiteUrl } from "@/lib/site-url";
import { LegalPage } from "@/components/legal-page/LegalPage";
import en from "@/locales/en/translation.json";
import ptBR from "@/locales/pt-BR/translation.json";
import es from "@/locales/es/translation.json";

const SITE_URL = getSiteUrl();

const resources: Record<string, typeof en> = {
  en,
  "pt-BR": ptBR,
  es,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ language: string }>;
}): Promise<Metadata> {
  const { language } = await params;
  const lang = isSupportedLanguage(language) ? language : "en";
  const { title, metaDescription } = resources[lang].legal.terms;

  return {
    title: `${title} — GetMedia`,
    description: metaDescription,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: `/${lang}/terms`,
      languages: Object.fromEntries([
        ...SUPPORTED_LANGUAGES.map((l) => [l, `/${l}/terms`]),
        ["x-default", `/${SUPPORTED_LANGUAGES[0]}/terms`],
      ]),
    },
  };
}

export default async function TermsOfServicePage({
  params,
}: {
  params: Promise<{ language: string }>;
}) {
  const { language } = await params;

  if (!isSupportedLanguage(language)) {
    notFound();
  }

  return <LegalPage type="terms" />;
}