import type { Metadata } from "next";
import { NotFoundPage } from "@/components/not-found/NotFoundPage";

export const metadata: Metadata = {
  title: "404 — Page not found",
  description: "The page you are looking for doesn't exist or has been moved.",
};

export default function RootNotFound() {
  return <NotFoundPage />;
}