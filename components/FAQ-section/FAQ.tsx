"use client";

import { FAQ } from "@/constants/FAQ";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export function FrequentlyAskedQuestions() {
  const { t } = useTranslation();

  return (
    <section className="w-full" aria-label={t("faq.title")}>
      <h2 className="text-2xl font-bold py-5 text-[var(--text-primary)]">
        {t("faq.title")}
      </h2>
      <div className="flex flex-col gap-2">
        {FAQ.map((item, index) => (
          <FaqCard
            key={index}
            question={t(item.question)}
            answer={t(item.answer)}
          />
        ))}
      </div>
    </section>
  );
}

function FaqCard({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div
        className="flex items-center justify-between gap-2 border-b border-[var(--surface-border)] mb-2 text-[var(--text-primary)] font-bold p-2 cursor-pointer hover:bg-[var(--glass-hover)] transition-colors duration-200"
        role="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{question}</span>
        <span
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <ChevronDown />
        </span>
      </div>
      <div
        className={`${
          isOpen ? "max-h-96" : "max-h-0"
        } overflow-hidden transition-all duration-300`}
      >
        <p className="px-2 pb-4 text-[var(--text-secondary)]">{answer}</p>
      </div>
    </div>
  );
}