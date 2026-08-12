"use client";

import { useTranslation } from "react-i18next";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { isSupportedLanguage } from "@/i18n/languages";
import { Footer } from "@/components/footer/Footer";

interface LegalSection {
  heading: string;
  paragraphs: string[];
}

interface LegalPageProps {
  type: "privacy" | "terms";
}

/**
 * Legal pages (Privacy Policy / Terms of Use) rendered with the site's visual
 * language: ambient background with an accent glow, the GetMedia header,
 * a glass content card, theme-aware text and the site footer.
 */
export function LegalPage({ type }: LegalPageProps) {
  const { t } = useTranslation();
  const pathname = usePathname();
  const pathLanguage = pathname.split("/").filter(Boolean)[0] ?? "";
  const language = isSupportedLanguage(pathLanguage) ? pathLanguage : "en";
  const sections = t(`legal.${type}.sections`, {
    returnObjects: true,
  }) as unknown as LegalSection[];

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden flex flex-col">
      {/* Ambient background */}
      <div className="fixed inset-0 -z-10 bg-surface" aria-hidden="true">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-brand-600/10 blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-brand-400/[0.08] blur-3xl animate-pulse-slow animate-delay-200" />
      </div>
      <div className="mx-auto max-w-3xl px-4 py-12 relative w-full">
        {/* Header */}
        <header className="w-full flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center justify-center gap-2">
            <Image
              alt="GetMedia Logo"
              title="GetMedia Logo"
              src="/getmedia_icon_80x80.png"
              className="w-auto h-10"
              width={40}
              height={40}
            />
            <Image
              alt="GetMedia Icon"
              title="GetMedia Icon"
              src="/getmedia_413x80.png"
              className="w-auto h-10"
              width={205}
              height={40}
            />
          </div>
          <Link
            href={`/${language}`}
            className="group flex items-center h-10 rounded-xl glass text-[var(--text-secondary)] hover:text-brand-400 hover:border-brand-400/40 transition-colors duration-300 px-4 gap-1.5 text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("legal.backHome")}
          </Link>
        </header>

        {/* Content card */}
        <div className="rounded-2xl border border-surface-border card-gradient p-6 sm:p-8 space-y-8 animate-fade-in">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)]">
            {t(`legal.${type}.title`)}
          </h1>
          {sections.map((section, index) => (
            <section key={index} className="space-y-2">
              <h2 className="text-lg font-bold text-[var(--text-primary)]">
                {section.heading}
              </h2>
              {section.paragraphs.map((paragraph, paragraphIndex) => (
                <p
                  key={paragraphIndex}
                  className="text-sm text-[var(--text-secondary)] leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8">
          <Footer />
        </div>
      </div>
    </main>
  );
}
