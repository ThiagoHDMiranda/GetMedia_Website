const DEFAULT_SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://thiagohdmiranda.github.io/GetMedia_Website";

/** Absolute site URL used to build full URLs in metadata (OG/Twitter). */
export function getSiteUrl(): string {
  return DEFAULT_SITE_URL.replace(/\/+$/, "");
}