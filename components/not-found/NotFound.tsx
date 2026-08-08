"use client";

import { useTranslation } from "react-i18next";
import Link from "next/link";
import Image from "next/image";

export function NotFound() {
  const { t } = useTranslation();

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden flex items-center justify-center px-4">
      <div className="fixed inset-0 -z-10 bg-surface" aria-hidden="true">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-brand-600/10 blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-brand-400/[0.08] blur-3xl animate-pulse-slow animate-delay-200" />
      </div>
      <div className="w-full max-w-lg space-y-6 text-center animate-fade-in">
        <Image
          alt="GetMedia Logo"
          title="GetMedia Logo"
          src="/getmedia_icon_512x512.png"
          className="w-auto h-16 mx-auto"
          width={64}
          height={64}
        />
        <h1 className="text-7xl sm:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-brand-300 to-brand-500">
          404
        </h1>
        <p className="text-xl font-semibold text-[var(--text-primary)]">
          {t("notFound.title")}
        </p>
        <p className="text-sm text-[var(--text-secondary)]">
          {t("notFound.message")}
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white/80 shadow-lg shadow-brand-900/30 hover:shadow-brand-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 ease-out"
        >
          {t("notFound.back")}
        </Link>
      </div>
    </main>
  );
}