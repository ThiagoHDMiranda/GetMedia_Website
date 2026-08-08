"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { isSupportedLanguage } from "@/i18n/languages";

/**
 * Keeps the root <html lang> attribute in sync with the active language.
 *
 * The static root layout (app/layout.tsx) owns <html> and cannot read route
 * params, so the attribute starts as "en" in the SSR HTML and is corrected
 * here on mount and on every navigation. This keeps the SEO/a11y signal
 * accurate for /pt-BR and /es pages without making the root layout dynamic.
 */
export function DocumentLanguage() {
  const pathname = usePathname();

  useEffect(() => {
    const firstSegment = pathname.split("/").filter(Boolean)[0] ?? "";
    const lang = isSupportedLanguage(firstSegment) ? firstSegment : "en";
    document.documentElement.lang = lang;
  }, [pathname]);

  return null;
}