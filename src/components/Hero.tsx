"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { useLanguage } from "@/components/language-provider";
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
    closing,
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
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section
      className="relative mb-32 pt-20 md:pt-32"
      aria-labelledby="profile-hero-heading"
    >
      <motion.div
        className="grid gap-12 lg:grid-cols-[1.2fr,0.8fr] lg:gap-24"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left Column: Narrative */}
        <div className="flex flex-col justify-between">
          <div className="space-y-8">
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4"
            >
              <Image
                src={profile.avatar}
                alt={profile.name}
                width={64}
                height={64}
                className="rounded-full"
                priority
              />
              <span className="h-px w-16 bg-fd-foreground/20" />
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-fd-muted-foreground">
                {introLabel}
              </span>
            </motion.div>

            <div className="space-y-6">
              <motion.h1
                id="profile-hero-heading"
                variants={itemVariants}
                className="text-5xl font-medium tracking-tighter sm:text-7xl text-fd-foreground"
              >
                {profile.name}
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-xl sm:text-2xl text-fd-muted-foreground font-light tracking-tight max-w-xl"
              >
                {profile.tagline}
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="space-y-4 max-w-lg pt-4"
              >
                <p className="text-base leading-relaxed text-fd-muted-foreground/80">
                  {profile.description}
                </p>
                <p className="text-sm text-fd-muted-foreground/60 italic font-serif">
                  &ldquo;{mission}&rdquo;
                </p>
              </motion.div>
            </div>
          </div>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-8 pt-12"
          >
            {/* Primary CTA */}
            {(!session || !isSubscribed) && (
              <Link
                href="/subscription"
                className="group flex items-center gap-2 text-sm font-medium text-fd-foreground transition-all hover:opacity-70"
              >
                <span className="border-b border-fd-foreground pb-0.5">
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
        <div className="flex flex-col gap-0 pt-4 lg:pt-0">
          {/* Lab Status */}
          <motion.div
            variants={itemVariants}
            className="border-t border-fd-border py-6"
          >
            <div className="flex items-baseline justify-between mb-3">
              <h3 className="text-xs font-medium uppercase tracking-widest text-fd-muted-foreground">
                Current Focus
              </h3>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-fd-foreground"></span>
                </span>
                <span className="text-[10px] uppercase tracking-wider text-fd-foreground">
                  {lab.statusLabel}
                </span>
              </div>
            </div>
            <p className="text-lg font-medium text-fd-foreground">
              {lab.description}
            </p>
            <div className="mt-4 flex justify-between items-end">
              <p className="text-2xl font-mono tracking-tight">
                {lab.statusValue}
              </p>
              <p className="text-xs text-fd-muted-foreground text-right max-w-[150px]">
                {lab.statusMeta}
              </p>
            </div>
          </motion.div>

          {/* Metrics Grid */}
          <motion.div
            variants={itemVariants}
            className="border-t border-fd-border py-6"
          >
            <h3 className="text-xs font-medium uppercase tracking-widest text-fd-muted-foreground mb-6">
              Trajectory
            </h3>
            <div className="grid grid-cols-2 gap-8">
              {personaStages.map((stage) => (
                <div key={stage.label}>
                  <p className="text-2xl font-mono font-medium text-fd-foreground">
                    {stage.value}
                  </p>
                  <p className="text-xs text-fd-muted-foreground mt-1">
                    {stage.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Signals */}
          <motion.div
            variants={itemVariants}
            className="border-t border-fd-border py-6"
          >
            <h3 className="text-xs font-medium uppercase tracking-widest text-fd-muted-foreground mb-6">
              Signals
            </h3>
            <div className="space-y-4">
              {heroSignals.map((signal) => (
                <div
                  key={signal.label}
                  className="flex justify-between items-baseline group"
                >
                  <span className="text-sm text-fd-muted-foreground group-hover:text-fd-foreground transition-colors">
                    {signal.label}
                  </span>
                  <span className="font-mono text-sm text-fd-foreground">
                    {signal.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Tags */}
          <motion.div
            variants={itemVariants}
            className="border-t border-fd-border py-6"
          >
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {personaTags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium text-fd-muted-foreground hover:text-fd-foreground transition-colors cursor-default"
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
