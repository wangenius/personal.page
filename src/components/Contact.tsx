"use client";

import Link from "next/link";
import { Mail, Twitter, Github, ExternalLink } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

export const Contact = () => {
  const { dictionary } = useLanguage();
  const contact = dictionary.contact;

  return (
    <section id="contact" className="mt-16 space-y-6">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
          {contact.section.label}
        </p>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 md:text-3xl">
          {contact.section.title}
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          {contact.section.description}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1 text-sm text-slate-700 dark:text-slate-200">
          <p className="text-[11px] uppercase tracking-[0.25em] text-slate-400">
            {contact.wechat.label}
          </p>
          <p className="font-medium">wzdoing</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {contact.wechat.note}
          </p>
        </div>

        <div className="space-y-1 text-sm text-slate-700 dark:text-slate-200">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-slate-400">
            <Mail className="h-3 w-3" />
            <span>{contact.email.label}</span>
          </div>
          <Link
            href="mailto:iamwangenius@gmail.com"
            className="font-medium underline-offset-2 hover:underline"
          >
            iamwangenius@gmail.com
          </Link>
        </div>

        <div className="space-y-1 text-sm text-slate-700 dark:text-slate-200">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-slate-400">
            <Twitter className="h-3 w-3" />
            <span>{contact.twitter.label}</span>
          </div>
          <Link
            href="https://x.com/iamwangenius"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-medium underline-offset-2 hover:underline"
          >
            <span>@iamwangenius</span>
            <ExternalLink className="h-3 w-3" />
          </Link>
        </div>

        <div className="space-y-1 text-sm text-slate-700 dark:text-slate-200">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-slate-400">
            <Github className="h-3 w-3" />
            <span>{contact.github.label}</span>
          </div>
          <Link
            href="https://github.com/wangenius"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-medium underline-offset-2 hover:underline"
          >
            <span>github.com/wangenius</span>
            <ExternalLink className="h-3 w-3" />
          </Link>
        </div>

        <div className="space-y-1 text-sm text-slate-700 dark:text-slate-200">
          <p className="text-[11px] uppercase tracking-[0.25em] text-slate-400">
            {contact.bento.label}
          </p>
          <Link
            href="https://bento.me/wangenius"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-medium underline-offset-2 hover:underline"
          >
            <span>bento.me/wangenius</span>
            <ExternalLink className="h-3 w-3" />
          </Link>
        </div>

        <div className="space-y-1 text-sm text-slate-700 dark:text-slate-200">
          <p className="text-[11px] uppercase tracking-[0.25em] text-slate-400">
            {contact.wechatOfficial.label}
          </p>
          <p className="font-medium">wangenius</p>
        </div>
      </div>
    </section>
  );
};

