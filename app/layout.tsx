import Script from "next/script";
import { Inter } from "next/font/google";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";
import { DocumentLanguage } from "@/components/document-language/DocumentLanguage";

const GA_ID = "G-W60LR2SKXX";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

export const metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: "GetMedia",
  description:
    "GetMedia is a free and open-source video and audio downloader for Windows, built on yt-dlp and FFmpeg.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <DocumentLanguage />
        {children}
        {/*
         * GA4 loaded on browser idle (lazyOnload) instead of right after
         * hydration: analytics doesn't need to run before the page is
         * interactive, so it no longer competes for the main thread during
         * the load/INP window. Same init behavior as @next/third-parties'
         * GoogleAnalytics component, but with a deferred strategy.
         */}
        <Script
          id="_next-ga-init"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
          window['dataLayer'] = window['dataLayer'] || [];
          function gtag(){window['dataLayer'].push(arguments);}
          gtag('js', new Date());

          gtag('config', '${GA_ID}');`,
          }}
        />
        <Script
          id="_next-ga"
          strategy="lazyOnload"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        />
      </body>
    </html>
  );
}