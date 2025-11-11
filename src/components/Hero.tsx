"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";

export const Hero = () => {
  const { dictionary } = useLanguage();
  const hero = dictionary.hero;
  const { profile, heroSignals, personaStages, personaTags, cta, mission, lab, introLabel, closing } = hero;

  return (
    <section
      className="relative mb-12 overflow-hidden rounded-[32px]"
      aria-labelledby="profile-hero-heading"
    >
      <div className="pointer-events-none absolute inset-0 opacity-80">
        <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-fd-accent/30 blur-[120px]" />
        <div className="absolute -bottom-32 left-0 h-72 w-72 rounded-full bg-fd-secondary/30 blur-[140px]" />
      </div>
      <div className="relative grid gap-10 lg:grid-cols-[3fr,2fr]">
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-fd-muted-foreground">
            <span className="h-px w-10 bg-fd-muted-foreground/40" />
            <span>{introLabel}</span>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-fd-muted-foreground">
              {profile.subtitle}
            </p>
            <h1
              id="profile-hero-heading"
              className="text-4xl font-semibold tracking-tight text-fd-foreground sm:text-5xl"
            >
              {profile.name}
            </h1>
            <p className="text-2xl font-medium text-fd-foreground/90 md:text-[2.1rem]">
              {profile.tagline}
            </p>
            <p className="text-base text-fd-muted-foreground md:text-lg">
              {profile.description}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button size="sm" className="px-5" asChild>
              <Link href="/docs">{cta.primary}</Link>
            </Button>
            <Button size="sm" variant="ghost" className="px-5" asChild>
              <Link href="/subscription">{cta.secondary}</Link>
            </Button>
          </div>
          <p className="text-xs text-fd-muted-foreground/80">
            {mission}
          </p>
        </div>
        <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-background p-6">
          <div className="relative flex flex-col gap-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-4">
                <Image
                  src={profile.avatar}
                  alt={profile.name}
                  width={100}
                  height={100}
                  className="rounded-2xl border"
                />
                <div>
                  <p className="text-[11px] uppercase tracking-[0.35em] text-fd-muted-foreground">
                    {lab.title}
                  </p>
                  <p className="text-2xl font-semibold text-fd-foreground">
                    {profile.name}
                  </p>
                  <p className="text-sm text-fd-muted-foreground">
                    {lab.description}
                  </p>
                </div>
              </div>
              <div className="sm:ml-auto text-right">
                <p className="text-xs uppercase tracking-[0.3em] text-fd-muted-foreground">
                  {lab.statusLabel}
                </p>
                <p className="text-sm font-medium text-fd-foreground">
                  {lab.statusValue}
                </p>
                <p className="text-xs text-fd-muted-foreground">
                  {lab.statusMeta}
                </p>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-fd-card/30 p-4">
              <div className="relative space-y-4">
                <span
                  className="absolute left-[6px] top-4 hidden h-[calc(100%-32px)] w-px bg-white/15 sm:block"
                  aria-hidden
                />
                {personaStages.map((stage) => (
                  <div key={stage.label} className="relative pl-0 sm:pl-8">
                    <span className="absolute left-0 top-2 hidden h-3 w-3 rounded-full border border-white/40 bg-fd-foreground sm:block" />
                    <p className="text-[11px] uppercase tracking-[0.35em] text-fd-muted-foreground">
                      {stage.label}
                    </p>
                    <p className="text-sm font-semibold text-fd-foreground">
                      {stage.value}
                    </p>
                    <p className="text-xs text-fd-muted-foreground">
                      {stage.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {heroSignals.map((signal) => (
                <div
                  key={signal.label}
                  className="rounded-2xl border border-white/10 bg-fd-card/40 p-4"
                >
                  <p className="text-[11px] uppercase tracking-wide text-fd-muted-foreground">
                    {signal.label}
                  </p>
                  <p className="mt-2 text-sm font-medium text-fd-foreground">
                    {signal.value}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {personaTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/15 bg-fd-secondary/20 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-fd-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="rounded-2xl border border-white/5 bg-fd-secondary/10 p-4 text-sm text-fd-muted-foreground">
              <p className="font-medium text-fd-foreground">
                {closing.title}
              </p>
              <p>{closing.body}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
