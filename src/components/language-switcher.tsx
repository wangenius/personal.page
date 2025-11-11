"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLanguage } from "@/components/language-provider";
import type { Locale } from "@/lib/i18n/dictionaries";
import { cn } from "@/lib/utils";
import { getLocalizedDocPath } from "@/lib/i18n/routing";

interface LanguageSwitcherProps {
  variant?: "compact" | "full";
  className?: string;
}

const toggleLanguage = (current: Locale): Locale => (current === "en" ? "zh" : "en");

export function LanguageSwitcher({ variant = "compact", className }: LanguageSwitcherProps) {
  const { language, setLanguage, dictionary } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();
  const { languageSwitcher } = dictionary.navigation;
  const nextLanguage = toggleLanguage(language);
  const handleSwitchLanguage = () => {
    setLanguage(nextLanguage);
    const nextDocPath = pathname ? getLocalizedDocPath(pathname, nextLanguage) : null;
    if (nextDocPath && nextDocPath !== pathname) {
      router.push(nextDocPath);
    }
  };

  return (
    <div className={cn(variant === "full" ? "flex flex-col gap-2" : "flex items-center gap-2", className)}>
      {variant === "full" && (
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {languageSwitcher.title}
        </span>
      )}
      <button
        type="button"
        aria-label={languageSwitcher.ariaLabel}
        onClick={handleSwitchLanguage}
        className="inline-flex items-center justify-center rounded-full border border-white/20 bg-background/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground transition hover:text-foreground"
      >
        {languageSwitcher.options[language].short}
      </button>
    </div>
  );
}
