"use client";

import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import Typed from "typed.js";

const HERO_LINKS = [
  { href: "https://www.youtube.com/", label: "YouTube" },
  { href: "https://www.instagram.com/", label: "Instagram" },
  { href: "https://www.tiktok.com/", label: "TikTok" },
];
const TYPED_ANCHORS = HERO_LINKS.map(
  (link) =>
    `<a href="${link.href}" target="_blank" rel="noopener noreferrer"
        class="text-gradient hover:opacity-80 transition-opacity"
     >${link.label}</a>`,
);

export function HeroSection() {
  const { t } = useTranslation();
  const elementRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!elementRef.current) return;
    /*
     * The element starts with the first site pre-written (see the JSX below),
     * so typed.js reads the existing content, begins by erasing it and then
     * types/erases the remaining sites in an infinite loop.
     *
     * Starting the animation is deferred until the browser is idle (or after
     * a 2s timeout) so the initial load/interaction window isn't affected by
     * continuous main-thread DOM work — the pre-written text is already in the
     * HTML.
     */
    let typed: Typed | null = null;
    let idleId: number | null = null;
    let timeoutId: number | null = null;

    const start = () => {
      if (!elementRef.current || typed) return;
      typed = new Typed(elementRef.current, {
        strings: TYPED_ANCHORS,
        typeSpeed: 60,
        backSpeed: 40,
        loop: true,
        loopCount: Infinity,
        smartBackspace: true,
        cursorChar: "_",
      });
    };

    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(start, { timeout: 2000 });
    } else {
      timeoutId = window.setTimeout(start, 1000);
    }

    return () => {
      if (idleId !== null && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
      typed?.destroy();
      typed = null;
    };
  }, []);

  return (
    <section
      className="text-center space-y-6 pt-8 animate-fade-in"
      aria-label={t("hero.titleLine1")}
    >
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
        <span className="text-[var(--text-primary)]">
          {t("hero.titleLine1")}
        </span>
        <br />
        <span className="text-gradient">{t("hero.titleLine2")}</span>
      </h1>
      <div className="text-base sm:text-lg text-[var(--text-secondary)] max-w-full mx-auto leading-relaxed">
        <p>
          {t("hero.subtitleSupport")}{" "}
          <strong className="text-[var(--text-primary)]">
            <span ref={elementRef}></span>
          </strong>{" "}
          {t("hero.subtitleOthers")}
        </p>
        <p>{t("hero.subtitleQuality")}</p>
      </div>
      <div className="flex items-center justify-center gap-8 pt-2">
        {[
          { label: t("hero.statSites"), value: "1000+" },
          { label: t("hero.statFormats"), value: "10+" },
          { label: t("hero.statFree"), value: "100%" },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-2xl font-bold text-gradient">{stat.value}</p>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
