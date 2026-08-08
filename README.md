# GetMedia Website

The official landing page for **[GetMedia](https://getmedia-app.vercel.app)** — a Windows desktop app (Electron) for downloading videos and audio from YouTube and other sites, powered by `yt-dlp` and `ffmpeg`.

The desktop app lives in the separate repository [ThiagoHDMiranda/GetMedia_Desktop](https://github.com/ThiagoHDMiranda/GetMedia_Desktop); this repository is only its web download page. It is built with [Next.js 16](https://nextjs.org) (App Router), `react-i18next` and Tailwind CSS.

## Live site

- **Website:** <https://getmedia-app.vercel.app>
- **Desktop app:** <https://github.com/ThiagoHDMiranda/GetMedia_Desktop>
- **Latest release:** <https://github.com/ThiagoHDMiranda/GetMedia_Desktop/releases/latest>

## Features

- **Multi-language routes** — each language has its own URL (`/en`, `/pt-BR`, `/es`); `/` redirects based on the `language` cookie or the `Accept-Language` header, and `/pt` redirects to the canonical `/pt-BR`. Languages are toggled from the settings modal, which writes the cookie and navigates to the matching route.
- **Direct download** — the "Download" button fetches `app/api/latest-release` (a server-side proxy for the GitHub API that caches for 1h) and downloads the `.exe` of the latest release directly, without opening the GitHub page.
- **SEO-ready** — localized titles/meta descriptions, hreflang + `x-default`, canonical URLs, `sitemap.xml` (localized entries), `robots.txt`, `apple-touch-icon`, Open Graph/Twitter cards with a generated per-language share image, and JSON-LD `SoftwareApplication` + `Organization` + `Person` schema.
- **Custom 404 page** — localized, with a "Back to home" link.
- **Google Analytics 4** (lazy-loaded via `@next/third-parties`).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment variables

Create a `.env.local` file (see `.env.example` if present) with any of the following:

| Variable | Description |
| --- | --- |
| `GITHUB_API_TOKEN` | Optional GitHub token (read access). Used server-side by `app/api/latest-release/route.ts` to raise the unauthenticated API rate limit — never exposed to the browser. |
| `NEXT_PUBLIC_SITE_URL` | Absolute public URL used for canonical / Open Graph / Twitter metadata. Defaults to `https://getmedia-app.vercel.app`. |

## Scripts

- `npm run dev` — start the development server
- `npm run build` — production build (`/en`, `/pt-BR`, `/es`, `robots.txt`, `sitemap.xml` and the OG images are statically prerendered)
- `npm run start` — start the production server
- `npm run lint` — run ESLint

## Project structure

| Path | Purpose |
| --- | --- |
| `app/[language]/` | Localized page: layout (metadata, JSON-LD, translation provider) + `page.tsx` (home). |
| `app/api/latest-release/` | Server-side proxy that fetches the latest GetMedia release from the GitHub API. |
| `app/robots.ts`, `app/sitemap.ts` | SEO files. |
| `app/not-found.tsx`, `app/[language]/not-found.tsx` | Custom 404 pages. |
| `app/[language]/opengraph-image.tsx` | Per-language OG/Twitter share image (1200×630, generated with `next/og`). |
| `components/` | UI: hero, download section, settings/about modals, footer, and the shared 404 UI. |
| `locales/` | i18next translation files: `en`, `pt-BR`, `es`. |
| `lib/` | App info (read from `package.json`), site URL helper. |
| `proxy.ts` | Locale proxy (Next.js 16 replacement for the `middleware` convention). |

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## License

MIT