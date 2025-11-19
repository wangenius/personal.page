"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/components/language-provider";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type Experience = Dictionary["timeline"]["experiences"][number];

const currentYear = new Date().getFullYear();
const CAREER_START_YEAR = 2022;

type TimelineItem = Experience & {
  nodeLabel: string;
  startYear: number;
  endYear: number;
};

const extractYear = (value?: string | null) => {
  if (!value) return null;
  const match = value.match(/\d{4}/);
  return match ? Number(match[0]) : null;
};

const normalizePeriod = (period: string) => {
  const [rawStart, rawEnd] = period
    .split("-")
    .map((part) => part?.trim() ?? "");
  const startYear = extractYear(rawStart) ?? currentYear;
  const hasExplicitEnd = Boolean(rawEnd);
  const endIsNow = hasExplicitEnd && /(now|present)/i.test(rawEnd);
  const parsedEnd = hasExplicitEnd ? extractYear(rawEnd) : null;
  const endYear = endIsNow ? currentYear : (parsedEnd ?? startYear);
  const normalizedStart = Math.max(startYear, CAREER_START_YEAR);
  const normalizedEnd = Math.max(endYear, normalizedStart);
  return {
    startYear: normalizedStart,
    endYear: normalizedEnd,
  };
};

export const Timeline = () => {
  const { dictionary } = useLanguage();
  const timeline = dictionary.timeline;
  const workHistory = timeline.experiences;

  const timelineItems: TimelineItem[] = useMemo(() => {
    const totalItems = workHistory.length;
    return workHistory.map((item, index) => ({
      ...item,
      nodeLabel: (totalItems - index).toString().padStart(2, "0"),
      ...normalizePeriod(item.period),
    }));
  }, [workHistory]);

  const timelineEntries = useMemo(() => {
    const typePriority = (type: TimelineItem["type"]) =>
      type === "product" ? 1 : 0;
    return [...timelineItems].sort((a, b) => {
      if (b.startYear === a.startYear) {
        const priorityDiff = typePriority(a.type) - typePriority(b.type);
        if (priorityDiff !== 0) {
          return priorityDiff;
        }
        if (b.endYear !== a.endYear) {
          return b.endYear - a.endYear;
        }
      }
      return b.startYear - a.startYear;
    });
  }, [timelineItems]);

  const timelineRows = useMemo(() => {
    const map = new Map<number, TimelineItem[]>();
    timelineEntries.forEach((item) => {
      const list = map.get(item.startYear) ?? [];
      list.push(item);
      map.set(item.startYear, list);
    });
    return Array.from(map.entries())
      .map(([year, items]) => ({ year, items }))
      .sort((a, b) => b.year - a.year);
  }, [timelineEntries]);

  const [selectedItem, setSelectedItem] = useState<TimelineItem | null>(null);
  const [hoveredRange, setHoveredRange] = useState<{ start: number; end: number } | null>(null);
  const closeModal = useCallback(() => {
    setSelectedItem(null);
  }, []);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [closeModal]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <section className="space-y-12 mb-24">
      <div className="space-y-4">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs font-medium uppercase tracking-widest text-fd-muted-foreground"
        >
          {timeline.section.label}
        </motion.p>
        <div className="flex items-baseline justify-between border-b border-fd-border pb-4">
          <motion.h2
            initial={{ opacity: 0, y: 5 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-medium text-fd-foreground"
          >
            {timeline.section.title}
          </motion.h2>
          <Link
            href="/products"
            className="text-sm text-fd-muted-foreground hover:text-fd-foreground transition-colors"
          >
            {timeline.section.viewProducts}
          </Link>
        </div>
      </div>

      <motion.div
        className="space-y-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {timelineRows.map((row) => (
          <div key={row.year} className="grid md:grid-cols-[100px_1fr] gap-8">
            <div className="pt-2">
              <span className={cn(
                "text-2xl font-medium font-mono transition-colors duration-300",
                hoveredRange && row.year >= hoveredRange.start && row.year <= hoveredRange.end ? "text-fd-foreground animate-pulse" : "text-fd-muted-foreground/40"
              )}>
                {row.year}
              </span>
            </div>
            <div className="flex flex-wrap gap-4">
              {row.items.map((item) => (
                <motion.button
                  key={item.nodeLabel}
                  variants={itemVariants}
                  type="button"
                  onClick={() => setSelectedItem(item)}
                  onMouseEnter={() => setHoveredRange({ start: item.startYear, end: item.endYear })}
                  onMouseLeave={() => setHoveredRange(null)}
                  className={cn(
                    "group flex aspect-square w-[300px] max-w-full flex-col items-start justify-between rounded-xl border p-6 text-left transition-all hover:-translate-y-1 hover:shadow-md",
                    item.type === "product"
                      ? "bg-fd-foreground text-fd-background border-fd-foreground hover:bg-fd-foreground/90"
                      : "bg-fd-card border-fd-border hover:border-fd-foreground/50"
                  )}
                >
                  <div className="space-y-4 w-full">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between gap-2 w-full">
                        {item.type === "product" && (
                          <span className="inline-flex shrink-0 rounded-full border border-fd-background/20 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide">
                            Product
                          </span>
                        )}
                        {item.company && (
                          <span className={cn(
                            "text-xs font-medium uppercase tracking-wider",
                            item.type === "product" ? "text-fd-background/70" : "text-fd-muted-foreground"
                          )}>
                            {item.company}
                          </span>
                        )}
                      </div>
                      <h3
                        className={cn(
                          "text-xl font-bold tracking-tight leading-tight",
                          item.type === "product"
                            ? "text-fd-background"
                            : "text-fd-foreground"
                        )}
                      >
                        {item.title}
                      </h3>
                    </div>
                  </div>
                  <p
                    className={cn(
                      "text-sm leading-relaxed line-clamp-4",
                      item.type === "product"
                        ? "text-fd-background/80"
                        : "text-fd-muted-foreground"
                    )}
                  >
                    {item.description}
                  </p>
                </motion.button>
              ))}
            </div>
          </div>
        ))}
      </motion.div>

      <AnimatePresence>
        {selectedItem ? (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-fd-background/80 backdrop-blur-sm px-4 py-10"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className={cn(
                "relative w-full max-w-[600px] border p-8 shadow-2xl rounded-2xl overflow-hidden",
                selectedItem.type === "product"
                  ? "bg-fd-foreground text-fd-background border-fd-foreground"
                  : "bg-fd-card border-fd-border"
              )}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={closeModal}
                className={cn(
                  "absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors",
                  selectedItem.type === "product"
                    ? "bg-fd-background/10 text-fd-background hover:bg-fd-background/20"
                    : "bg-fd-muted/50 text-fd-muted-foreground hover:text-fd-foreground"
                )}
              >
                &times;
              </button>

              <div className="space-y-6 relative">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3
                      className={cn(
                        "text-2xl font-bold",
                        selectedItem.type === "product"
                          ? "text-fd-background"
                          : "text-fd-foreground"
                      )}
                    >
                      {selectedItem.title}
                    </h3>
                    {selectedItem.type === "product" && (
                      <span className="rounded-full border border-fd-background/30 bg-fd-background/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-fd-background">
                        Product
                      </span>
                    )}
                  </div>
                  {selectedItem.company && (
                    <p className={cn(
                      "uppercase tracking-wider text-xs font-medium",
                      selectedItem.type === "product" ? "text-fd-background/70" : "text-fd-muted-foreground"
                    )}>
                      @ {selectedItem.company}
                    </p>
                  )}
                </div>

                <div className={cn(
                  "text-base leading-relaxed",
                  selectedItem.type === "product" ? "text-fd-background/80" : "text-fd-muted-foreground"
                )}>
                  {selectedItem.description}
                </div>

                {selectedItem.context && (
                  <div className={cn(
                    "pl-4 border-l-2 italic text-sm",
                    selectedItem.type === "product"
                      ? "border-fd-background/50 text-fd-background/80"
                      : "border-fd-border/50 text-fd-muted-foreground/80"
                  )}>
                    {selectedItem.context}
                  </div>
                )}

                {selectedItem.skills && (
                  <div className="flex flex-wrap gap-2 pt-4">
                    {selectedItem.skills.map((skill) => (
                      <span
                        key={skill}
                        className={cn(
                          "text-xs border rounded-md px-2 py-1",
                          selectedItem.type === "product"
                            ? "border-fd-background/20 bg-fd-background/10 text-fd-background/90"
                            : "border-fd-border text-fd-muted-foreground bg-fd-muted/20"
                        )}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </section>
  );
};
