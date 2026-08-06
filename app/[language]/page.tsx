import { notFound } from "next/navigation";
import { isSupportedLanguage } from "@/i18n/languages";
import { HomePage } from "@/components/home-page/HomePage";

export default async function LanguagePage({
  params,
}: {
  params: Promise<{ language: string }>;
}) {
  const { language } = await params;

  if (!isSupportedLanguage(language)) {
    notFound();
  }

  return <HomePage />;
}