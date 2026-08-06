"use client"

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Settings, Info } from "lucide-react";
import { HeroSection } from "@/components/hero-section/HeroSection";
import { DownloadSection } from "@/components/download-section/DownloadSection";
import { Footer } from "@/components/footer/Footer";
import { SettingsModal } from "@/components/settings-modal/SettingsModal";
import { AboutModal } from "@/components/about-modal/AboutModal";
import { ToastNotification } from "@/components/toast-notification/ToastNotification";
import Image from "next/image";

export function HomePage() {
  const { t } = useTranslation();
  const [toast, setToast] = useState<{ type: "errorType" | "warnType" | "successType"; message: string } | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden">
      {/* Ambient background */}
      <div className="fixed inset-0 -z-10 bg-surface" aria-hidden="true">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-brand-600/10 blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-brand-400/[0.08] blur-3xl animate-pulse-slow animate-delay-200" />
      </div>
      <header className="w-full absolute top-6 place-self-center flex items-center justify-center gap-2">
        <Image alt="GetMedia Logo" src="/getmedia_icon_512x512.png" className="w-auto h-10" width={50} height={50} />
        <Image alt="GetMedia Icon" src="/getmedia.png" className="w-auto h-10" width={100} height={50}/>
      </header>
      <div className="mx-auto max-w-5xl px-4 py-12 space-y-12 relative">
        {/* Top-bar buttons — fixed right cluster (History + About + Settings) */}
        <div className="fixed top-6 right-6 z-40 flex items-center gap-2">

          {/* About button */}
          <button
            id="about-btn"
            onClick={() => setAboutOpen(true)}
            className="group flex items-center h-10 rounded-xl glass text-[var(--text-secondary)] hover:text-brand-400 hover:border-brand-400/40 transition-colors duration-300 overflow-hidden"
          >
            <span className="flex items-center justify-center w-10 h-10 flex-none">
              <Info className="w-5 h-5" />
            </span>
            <span className="flex items-center text-sm font-medium whitespace-nowrap overflow-hidden opacity-0 max-w-0 group-hover:pr-4 group-hover:max-w-[200px] group-hover:opacity-100 transition-all duration-500">
              {t("about.title")}
            </span>
          </button>

          {/* Settings button */}
          <button
            id="settings-btn"
            onClick={() => setSettingsOpen(true)}
            className="group flex items-center h-10 rounded-xl glass text-[var(--text-secondary)] hover:text-brand-400 hover:border-brand-400/40 transition-colors duration-300 overflow-hidden"
          >
            <span className="flex items-center justify-center w-10 h-10 flex-none">
              <Settings className="w-5 h-5" />
            </span>
            <span className="flex items-center text-sm font-medium whitespace-nowrap overflow-hidden opacity-0 max-w-0 group-hover:pr-4 group-hover:max-w-[200px] group-hover:opacity-100 transition-all duration-500">
              {t("settings.title")}
            </span>
          </button>
        </div>
        <HeroSection />
        {/* <DownloadSection/> */}
        <Footer />
      </div>
      {/* Settings modal */}
      <SettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
      {/* About modal */}
      <AboutModal isOpen={aboutOpen} onClose={() => setAboutOpen(false)} />
      {/* Toast */}
      {toast && (
        <ToastNotification
          type={toast.type}
          message={toast.message}
          clearUseState={() => setToast(null)}
        />
      )}
    </main>
  );
}