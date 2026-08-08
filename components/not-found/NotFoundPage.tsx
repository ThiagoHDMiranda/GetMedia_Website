"use client";

import { I18nextProvider } from "react-i18next";
import { NotFound } from "@/components/not-found/NotFound";
import { getI18nInstance } from "@/i18n";
import { DEFAULT_LANGUAGE } from "@/i18n/languages";

/**
 * Client boundary for the root `app/not-found.tsx`. The root 404 renders
 * outside the `[language]` layout's I18nProvider, so it supplies its own
 * default-language (English) i18next instance for the shared NotFound UI.
 */
export function NotFoundPage() {
  return (
    <I18nextProvider i18n={getI18nInstance(DEFAULT_LANGUAGE)}>
      <NotFound />
    </I18nextProvider>
  );
}