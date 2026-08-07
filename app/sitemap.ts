import type { MetadataRoute } from "next";
import { SUPPORTED_LANGUAGES } from "@/i18n/languages";
import { getSiteUrl } from "@/lib/site-url";

const SITE_URL = getSiteUrl();

export default function sitemap(): MetadataRoute.Sitemap {
  const languages: Record<string, string> = {
    ...Object.fromEntries(
      SUPPORTED_LANGUAGES.map((language) => [language, `${SITE_URL}/${language}`]),
    ),
    "x-default": `${SITE_URL}/${SUPPORTED_LANGUAGES[0]}`,
  };

  return SUPPORTED_LANGUAGES.map((language) => ({
    url: `${SITE_URL}/${language}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1,
    alternates: { languages },
  }));
}