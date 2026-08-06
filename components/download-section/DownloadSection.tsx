"use client"

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Download } from "lucide-react";

const REPO_URL = "https://github.com/ThiagoHDMiranda/GetMedia_Desktop";
const RELEASES_LATEST_URL = `${REPO_URL}/releases/latest`;
const LATEST_RELEASE_API_URL = "/api/latest-release";
const STORAGE_KEY = "getmedia:latestRelease";
const CACHE_MAX_AGE_MS = 60 * 60 * 1000; // 1 hour

interface LatestReleaseInfo {
  url: string;
  size: number;
  version: string;
  fetchedAt: number;
}

/**
 * Read the cached latest-release info from sessionStorage, so the GitHub
 * API is only hit once per tab session. Returns null when missing,
 * expired, malformed, or not pointing at this repo.
 */
function readCache(): LatestReleaseInfo | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as LatestReleaseInfo;
    if (
      typeof data.url !== "string" ||
      !data.url.startsWith(`${REPO_URL}/`) ||
      typeof data.version !== "string" ||
      typeof data.size !== "number" ||
      typeof data.fetchedAt !== "number"
    ) {
      return null;
    }
    if (Date.now() - data.fetchedAt > CACHE_MAX_AGE_MS) return null;
    return data;
  } catch {
    return null;
  }
}

function formatSize(bytes: number): string {
  if (!bytes || bytes <= 0) return "";
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * DownloadSection
 *
 * Landing-page card that prompts visitors to download the app. On mount it
 * fetches the latest release info from the server route (`/api/latest-release`),
 * caches the direct asset URL in sessionStorage and shows version + size.
 * If the request fails, the button falls back to the `/releases/latest` page.
 */
export function DownloadSection() {
  const { t } = useTranslation();
  const [release, setRelease] = useState<LatestReleaseInfo | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const cached = readCache();

      if (cached) {
        if (!cancelled) setRelease(cached);
      } else {
        try {
          const res = await fetch(LATEST_RELEASE_API_URL);
          if (!res.ok) return;

          const data = (await res.json()) as Omit<LatestReleaseInfo, "fetchedAt">;
          if (
            typeof data.url !== "string" ||
            !data.url.startsWith(`${REPO_URL}/`) ||
            typeof data.size !== "number" ||
            typeof data.version !== "string"
          ) {
            return;
          }

          const info: LatestReleaseInfo = {
            url: data.url,
            size: data.size,
            version: data.version,
            fetchedAt: Date.now(),
          };

          try {
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(info));
          } catch {
            /* storage unavailable (private mode, quota) — ignore */
          }

          if (!cancelled) setRelease(info);
        } catch {
          /* network / rate-limit error — fall back to releases/latest page */
        }
      }

      if (!cancelled) setIsChecking(false);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      className="glass rounded-2xl p-6 sm:p-8 space-y-2 animate-slide-up"
      aria-label={t("download.sectionAria")}
    >
      <div className="text-center space-y-2">
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
          {t("download.sectionTitle")}
        </h2>
      </div>

      <div className="flex flex-col items-center justify-center pt-2">
        <a
          href={release?.url ?? RELEASES_LATEST_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-xl px-8 py-3 text-base font-semibold
            bg-gradient-to-r from-brand-600 to-brand-500
            hover:from-brand-500 hover:to-brand-400
            text-white/80 shadow-lg shadow-brand-900/30
            hover:shadow-brand-600/40 hover:scale-[1.02] active:scale-[0.98]
            transition-all duration-200 ease-out"
        >
          
          {isChecking ? (
            <div className="w-4 h-4 border-b border-l border-t border-white/80 rounded-full animate-spin">
            </div>
          ) : (
            <Download className="w-5 h-5" />
          )}
          {t("download.downloadBtn")}
        </a>
        {release ? (
          <p className="mt-3 text-xs text-[var(--text-secondary)]">
            {t("download.releaseInfo", {
              version: release.version,
              size: formatSize(release.size),
            })}
          </p>
        ) : (
          <p className="mt-3 text-xs text-[var(--text-secondary)]">
            {t("download.latestNote")}
          </p>
        )}
      </div>
    </section>
  );
}