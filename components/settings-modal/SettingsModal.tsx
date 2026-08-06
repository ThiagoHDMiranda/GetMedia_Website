"use client"

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { X, Globe, Sun, Moon,  SunMoon } from "lucide-react";
import { SUPPORTED_LANGUAGES } from "@/i18n";
import { useTheme, SUPPORTED_THEMES, type Theme } from "@/hooks/useTheme";


interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * SettingsModal
 *
 * A modal overlay (not a separate page) that shows app configuration
 * options. Opens when the user clicks the settings button in the
 * top-right corner and closes via the close button or backdrop click.
 *
 * Contains:
 * - Theme selector (dark / light, persisted in localStorage)
 * - Language selector (persists the `language` cookie and redirects to "/[language]")
 * - Download destination folder picker
 * - Update checker (when running in Electron)
 */
export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const [selectedLang, setSelectedLang] = useState(i18n.language);
  const { theme, setTheme } = useTheme();

  if (!isOpen) return null;

const handleLanguageChange = (lang: string) => {
    setSelectedLang(lang);
    // Instances are cached per language and immutable — never mutate them
    // here (it would desync other visits to that route). Translation switches
    // through the I18nProvider, which derives the active language from the URL
    // after the navigation below.
    // eslint-disable-next-line react-hooks/immutability -- document.cookie is an accessor property, not a mutation of component state
    document.cookie = `language=${lang}; path=/; max-age=31536000; SameSite=Lax`;
    router.push(`/${lang}`);
  };

  const handleThemeChange = (next: Theme) => {
    setTheme(next);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label={t("settings.title")}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-overlay backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal panel */}
      <div
        className="relative w-full max-w-lg rounded-2xl shadow-2xl animate-slide-up border border-surface-border bg-surface-card backdrop-blur-xl"
        style={{ backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-surface-border">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">
            {t("settings.title")}
          </h2>
          <button
            id="settings-close-btn"
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-glassHover transition-colors"
            aria-label={t("settings.closeAria")}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-6">
          {/* Theme selector */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
              <SunMoon className="w-4 h-4" />
              {t("settings.themeLabel")}
            </label>
            <div className="flex gap-2">
              {SUPPORTED_THEMES.map((th) => {
                const active = theme === th;
                const Icon = th === "dark" ? Moon : Sun;
                const label = th === "dark" ? t("settings.themeDark") : t("settings.themeLight");
                return (
                  <button
                    key={th}
                    id={`theme-${th}`}
                    onClick={() => handleThemeChange(th)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border transition-all duration-150 ${
                      active
                        ? "bg-brand-500 border-brand-400 text-white/80 shadow-sm shadow-brand-900/30"
                        : "bg-surface-muted border-surface-border text-[var(--text-secondary)] hover:border-brand-400/40 hover:text-[var(--text-primary)]"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Language selector */}
          <div className="space-y-2">
            <label
              htmlFor="language-select"
              className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]"
            >
              <Globe className="w-4 h-4" />
              {t("settings.languageLabel")}
            </label>
            <div className="flex gap-2">
              {SUPPORTED_LANGUAGES.map((lang) => (
                <button
                  key={lang}
                  id={`lang-${lang}`}
                  onClick={() => handleLanguageChange(lang)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-all duration-150 ${
                    selectedLang === lang
                      ? "bg-brand-500 border-brand-400 text-white/80 shadow-sm shadow-brand-900/30"
                      : "bg-surface-muted border-surface-border text-[var(--text-secondary)] hover:border-brand-400/40 hover:text-[var(--text-primary)]"
                  }`}
                >
                  {lang === "pt-BR" ? "Português" : "English"}
                </button>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
