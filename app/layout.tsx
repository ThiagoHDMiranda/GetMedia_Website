import { GoogleAnalytics } from "@next/third-parties/google";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";
import { DocumentLanguage } from "@/components/document-language/DocumentLanguage";

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
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <DocumentLanguage />
        {children}
        <GoogleAnalytics gaId="G-W60LR2SKXX" />
      </body>
    </html>
  );
}