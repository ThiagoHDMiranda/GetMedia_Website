import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  SUPPORTED_LANGUAGES,
  DEFAULT_LANGUAGE,
  type Language,
} from "@/i18n/languages";

/**
 * Locale proxy (replaces the deprecated `middleware` convention).
 *
 * - "/pt" → redirects to the canonical "/pt-BR" route.
 * - "/" → resolves the language and redirects to "/[language]":
 *   1. the "language" cookie (set by the language switcher in SettingsModal),
 *   2. the browser's Accept-Language header,
 *   3. the default language.
 *
 * All other paths pass through untouched.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/pt") {
    return NextResponse.redirect(new URL("/pt-BR", request.url));
  }

  if (pathname !== "/") {
    return NextResponse.next();
  }

  let language: Language = DEFAULT_LANGUAGE;

  const saved = request.cookies.get("language")?.value;
  if (saved && SUPPORTED_LANGUAGES.includes(saved as Language)) {
    language = saved as Language;
  } else {
    const acceptLanguage = request.headers.get("accept-language") ?? "";
    if (acceptLanguage.trim().toLowerCase().startsWith("pt")) {
      language = "pt-BR";
    }
  }

  return NextResponse.redirect(new URL(`/${language}`, request.url));
}

export const config = {
  matcher: [
    /*
     * Match all request paths except API routes, internal assets and
     * favicon. The pathname guard in `proxy` only rewrites the root "/".
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};