"use client"

import { useMemo, type ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import { usePathname } from "next/navigation";
import { isSupportedLanguage } from "@/i18n/languages";
import { getI18nInstance } from "@/i18n";

interface I18nProviderProps {
  language: string;
  children: ReactNode;
}

/**
 * Provides the per-language i18next instance to the tree. Rendered by the
 * server layout, so both the prerendered HTML and the hydrated client use
 * the same language — no flash of the default language.
 *
 * The active language is derived from `usePathname()` rather than the
 * `language` prop (kept as a fallback for SSR/edge cases). This guarantees
 * that changing the language in SettingsModal — which navigates to the new
 * "/[language]" route — swaps the instance and re-renders every translated
 * consumer even when the layout is not re-propped during client-side
 * navigation. Instances are cached per language and treated as immutable.
 */
export function I18nProvider({ language, children }: I18nProviderProps) {
  const pathname = usePathname();
  const pathLanguage = pathname.split("/").filter(Boolean)[0] ?? "";
  const activeLanguage =
    isSupportedLanguage(pathLanguage) ? pathLanguage : language;

  const instance = useMemo(() => getI18nInstance(activeLanguage), [activeLanguage]);

  return <I18nextProvider i18n={instance}>{children}</I18nextProvider>;
}