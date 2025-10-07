"use client";

import { motion } from "framer-motion";
import { workHistory } from "@/lib/data";

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-fd-container sm:px-4 md:py-12">
      <section className="mx-auto w-full max-w-fd-container px-4 md:py-16">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-wide text-fd-muted-foreground">
            Journey
          </p>
          <h2 className="mt-1 text-3xl font-bold tracking-tight md:text-4xl">
            Experience
          </h2>
        </div>

        <div className="space-y-4">
          {workHistory.map((item, index) => (
            <motion.div
              key={`${item.title}-${index}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
              className="rounded-xl border bg-fd-card p-5 transition-colors hover:bg-fd-accent"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:gap-6">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-semibold tracking-tight md:text-xl">
                      {item.title}
                    </h3>
                    {item.company ? (
                      <span className="text-sm text-fd-muted-foreground">
                        @ {item.company}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-2 text-sm text-fd-muted-foreground">
                    {item.description}
                  </p>
                  {item.skills && item.skills.length > 0 ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {item.skills.map((skill: string, i: number) => (
                        <span
                          key={`${skill}-${i}`}
                          className="rounded-full border bg-fd-secondary/20 px-2.5 py-1 text-xs text-fd-foreground/80"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
                <div className="md:text-right">
                  <span className="inline-flex items-center rounded-full border bg-fd-secondary/20 px-3 py-1 text-xs text-fd-foreground/80">
                    {item.period}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
