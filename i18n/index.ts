import i18n, { createInstance, type i18n as I18n } from "i18next";
import { initReactI18next } from "react-i18next";
import ptBR from "@/locales/pt-BR/translation.json";
import en from "@/locales/en/translation.json";
import es from "@/locales/es/translation.json";
import {
  DEFAULT_LANGUAGE,
  isSupportedLanguage,
} from "@/i18n/languages";

export * from "@/i18n/languages";

const resources = {
  "pt-BR": { translation: ptBR },
  en: { translation: en },
  es: { translation: es },
} as const;

/**
 * Language-driven i18n.
 *
 * The active language is driven by the URL route ("/[language]") and applied
 * through per-language i18next instances (see getI18nInstance below) — there
 * is no localStorage-based detection anymore. The root "/" is resolved by the
 * proxy (cookie → Accept-Language → default) which redirects to "/[language]".
 *
 * The default instance below is kept as a fallback for anything rendered
 * outside of the I18nextProvider (e.g. future 404 pages).
 */
i18n.use(initReactI18next).init({
  resources,
  lng: DEFAULT_LANGUAGE,
  fallbackLng: DEFAULT_LANGUAGE,
  interpolation: {
    escapeValue: false, // React already escapes
  },
});

const instances = new Map<string, I18n>();

/**
 * Returns a per-language i18next instance (created once and cached), used by
 * the I18nextProvider in app/[language]/layout.tsx.
 *
 * Because each route renders with its own instance, the prerendered HTML of
 * "/pt-BR" already contains the Portuguese strings — matching what the client
 * hydrates with, so there is no flash of the wrong language and no hydration
 * mismatch.
 */
export function getI18nInstance(language: string): I18n {
  let instance = instances.get(language);
  if (!instance) {
    instance = createInstance().use(initReactI18next);
    instance.init({
      resources,
      lng: isSupportedLanguage(language) ? language : DEFAULT_LANGUAGE,
      fallbackLng: DEFAULT_LANGUAGE,
      interpolation: {
        escapeValue: false,
      },
    });
    instances.set(language, instance);
  }
  return instance;
}

export default i18n;