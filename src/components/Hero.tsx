"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { useLanguage } from "@/locales/LanguageProvider";
import { useSession } from "@/lib/auth-client";
import { useEffect, useState } from "react";

export const Hero = () => {
  const { dictionary } = useLanguage();
  const hero = dictionary.hero;
  const { data: session } = useSession();
  const [isSubscribed, setIsSubscribed] = useState<boolean | null>(null);
  const [lastReadPath, setLastReadPath] = useState<string | null>(null);
  const {
    profile,
    cta,
    introLabel,
    lab,
    heroSignals,
    personaStages,
    personaTags,
    mission,
  } = hero;

  useEffect(() => {
    let isMounted = true;
    if (!session) {
      setIsSubscribed(null);
      return () => {
        isMounted = false;
      };
    }

    fetch("/api/subscription/status", { cache: "no-store" })
      .then(async (res) => {
        if (!res.ok) return null;
        return (await res.json()) as {
          subscription?: { isActive?: boolean };
        } | null;
      })
      .then((payload) => {
        if (!isMounted) return;
        setIsSubscribed(Boolean(payload?.subscription?.isActive));
      })
      .catch(() => {
        if (!isMounted) return;
        setIsSubscribed(null);
      });

    return () => {
      isMounted = false;
    };
  }, [session]);

  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      const stored = window.localStorage.getItem("last-read-path");
      setLastReadPath(stored && stored.startsWith("/") ? stored : null);
    } catch {
      setLastReadPath(null);
    }
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      className="relative mb-32 pt-24 md:pt-40"
      aria-labelledby="profile-hero-heading"
    >
      <motion.div
        className="grid gap-16 lg:grid-cols-[1.2fr,0.8fr] lg:gap-32"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left Column: Narrative */}
        <div className="flex flex-col justify-between">
          <div className="space-y-10">
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-5"
            >
              <Image
                src={profile.avatar}
                alt={profile.name}
                width={72}
                height={72}
                className="rounded-full grayscale hover:grayscale-0 transition-all duration-500"
                priority
              />
              <span className="h-px w-12 bg-fd-foreground/10" />
              <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-fd-muted-foreground/80">
                {introLabel}
              </span>
            </motion.div>

            <div className="space-y-8">
              <motion.h1
                id="profile-hero-heading"
                variants={itemVariants}
                className="text-6xl font-medium tracking-tighter sm:text-8xl text-fd-foreground"
              >
                {profile.name}
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-xl sm:text-2xl text-fd-muted-foreground font-light tracking-wide max-w-xl leading-relaxed"
              >
                {profile.tagline}
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="space-y-6 max-w-lg pt-2"
              >
                <p className="text-base leading-loose text-fd-muted-foreground/80 font-light">
                  {profile.description}
                </p>
                <p className="text-sm text-fd-muted-foreground/50 italic font-serif tracking-wide">
                  &ldquo;{mission}&rdquo;
                </p>
              </motion.div>
            </div>
          </div>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-10 pt-16"
          >
            {/* Primary CTA */}
            {(!session || !isSubscribed) && (
              <Link
                href="/subscription"
                className="group flex items-center gap-3 text-sm font-medium text-fd-foreground transition-all hover:opacity-60"
              >
                <span className="border-b border-transparent group-hover:border-fd-foreground/50 transition-colors pb-0.5">
                  {cta.secondary}
                </span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            )}

            {/* Secondary CTA */}
            {session ? (
              <Link
                href="#contact"
                className="text-sm font-medium text-fd-muted-foreground hover:text-fd-foreground transition-colors"
              >
                {cta.contact}
              </Link>
            ) : (
              <Link
                href="/signin"
                className="text-sm font-medium text-fd-muted-foreground hover:text-fd-foreground transition-colors"
              >
                {cta.login}
              </Link>
            )}

            {/* Tertiary CTA */}
            {session && isSubscribed ? (
              <Link
                href={lastReadPath ?? "/subscription"}
                className="flex items-center gap-2 text-sm font-medium text-fd-muted-foreground hover:text-fd-foreground transition-colors"
              >
                {cta.lastRead}
                <ArrowUpRight className="h-3 w-3" />
              </Link>
            ) : null}
          </motion.div>
        </div>

        {/* Right Column: Data & Context (Minimalist/Editorial) */}
        <div className="flex flex-col gap-12 pt-8 lg:pt-0">
          {/* Lab Status */}
          <motion.div variants={itemVariants} className="py-2">
            <div className="flex items-baseline justify-between mb-4">
              <h3 className="text-[10px] font-medium uppercase tracking-[0.2em] text-fd-muted-foreground/60">
                Current Focus
              </h3>
              <div className="flex items-center gap-2">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500/50 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
                <span className="text-[9px] uppercase tracking-widest text-fd-foreground/80">
                  {lab.statusLabel}
                </span>
              </div>
            </div>
            <p className="text-lg font-normal text-fd-foreground leading-normal">
              {lab.description}
            </p>
            <div className="mt-6 flex justify-between items-end">
              <p className="text-3xl font-light tracking-tighter text-fd-foreground">
                {lab.statusValue}
              </p>
              <p className="text-[10px] text-fd-muted-foreground/60 text-right max-w-[150px] leading-tight">
                {lab.statusMeta}
              </p>
            </div>
          </motion.div>

          {/* Metrics Grid */}
          <motion.div variants={itemVariants} className="py-2">
            <h3 className="text-[10px] font-medium uppercase tracking-[0.2em] text-fd-muted-foreground/60 mb-8">
              Trajectory
            </h3>
            <div className="grid grid-cols-2 gap-12">
              {personaStages.map((stage) => (
                <div key={stage.label}>
                  <p className="text-3xl font-light tracking-tighter text-fd-foreground">
                    {stage.value}
                  </p>
                  <p className="text-[10px] text-fd-muted-foreground/60 mt-2 uppercase tracking-wider">
                    {stage.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Tags */}
          <motion.div variants={itemVariants} className="py-2">
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {personaTags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-medium text-fd-muted-foreground/40 hover:text-fd-foreground transition-colors cursor-default tracking-wide"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
