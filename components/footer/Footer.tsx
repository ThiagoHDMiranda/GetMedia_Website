import { useTranslation } from "react-i18next";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { APP_INFO } from "@/lib/app-info";
import { isSupportedLanguage } from "@/i18n/languages";
import Image from "next/image";

const GITHUB_REPO_URL = "https://github.com/ThiagoHDMiranda/GetMedia_Desktop";
const YT_DLP_URL = "https://github.com/yt-dlp/yt-dlp";

/**
 * Footer
 *
 * Simple site footer that mirrors the information shown in AboutModal: app
 * identity (logo + name + version), short description, author, license, and the
 * GitHub / yt-dlp links.
 */
export function Footer() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const pathLanguage = pathname.split("/").filter(Boolean)[0] ?? "";
  const language = isSupportedLanguage(pathLanguage) ? pathLanguage : "en";

  return (
    <footer className="flex flex-col items-center justify-around gap-2 border-t border-surface-border pt-6 text-center space-y-3 animate-fade-in sm:flex-row sm:gap-0">
      <div className="w-full flex flex-col gap-2">
        <div className="w-full place-self-center flex items-center justify-center gap-2">
          <Image
            alt="GetMedia Logo"
            title="GetMedia Logo"
            src="/getmedia_icon_512x512.png"
            className="w-auto h-6"
            width={24}
            height={24}
          />
          <Image
            alt="GetMedia Icon"
            title="GetMedia Icon"
            src="/getmedia.png"
            className="w-auto h-6"
            width={123}
            height={24}
          />
        </div>
        {APP_INFO.description && (
          <p className="text-xs text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed text-balance whitespace-pre-line">
            {t("about.description")}
          </p>
        )}
        <div className="flex items-center justify-center gap-5 text-xs mt-2">
          <Link
            href={`/${language}/privacy`}
            className="text-[var(--text-secondary)] hover:text-brand-400 transition-colors"
          >
            {t("legal.privacy.title")}
          </Link>
          <Link
            href={`/${language}/terms`}
            className="text-[var(--text-secondary)] hover:text-brand-400 transition-colors"
          >
            {t("legal.terms.title")}
          </Link>
        </div>
      </div>

      <div className="flex w-full h-full flex-col items-center justify-between gap-5 text-xs">
        <p className="text-xs text-[var(--text-secondary)]">
          {t("about.author")}: {APP_INFO.author} · {t("about.license")}:{" "}
          {APP_INFO.license}
        </p>
        <div className="flex items-center justify-center gap-5">
          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[var(--text-secondary)] hover:text-brand-400 transition-colors"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-3.5 h-3.5 flex-shrink-0"
              aria-hidden="true"
            >
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.111.82-.261.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            {t("about.repo")}
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href={YT_DLP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[var(--text-secondary)] hover:text-brand-400 transition-colors"
          >
            {t("about.poweredBy")}
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </footer>
  );
}
