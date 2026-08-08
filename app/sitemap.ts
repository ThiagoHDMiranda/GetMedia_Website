import type { MetadataRoute } from "next";
import { SUPPORTED_LANGUAGES } from "@/i18n/languages";
import { getSiteUrl } from "@/lib/site-url";

const SITE_URL = getSiteUrl();

const LEGAL_PAGES = ["privacy", "terms"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const languages: Record<string, string> = {
    ...Object.fromEntries(
      SUPPORTED_LANGUAGES.map((language) => [language, `${SITE_URL}/${language}`]),
    ),
    "x-default": `${SITE_URL}/${SUPPORTED_LANGUAGES[0]}`,
  };

  const homeEntries: MetadataRoute.Sitemap = SUPPORTED_LANGUAGES.map(
    (language) => ({
      url: `${SITE_URL}/${language}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
      alternates: { languages },
    }),
  );

  const legalEntries: MetadataRoute.Sitemap = LEGAL_PAGES.flatMap((page) =>
    SUPPORTED_LANGUAGES.map((language) => ({
      url: `${SITE_URL}/${language}/${page}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.2,
      alternates: {
        languages: {
          ...Object.fromEntries(
            SUPPORTED_LANGUAGES.map((lang) => [
              lang,
              `${SITE_URL}/${lang}/${page}`,
            ]),
          ),
          "x-default": `${SITE_URL}/${SUPPORTED_LANGUAGES[0]}/${page}`,
        },
      },
    })),
  );

  return [...homeEntries, ...legalEntries];
}