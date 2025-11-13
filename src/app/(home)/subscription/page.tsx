"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, Zap, Minus } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import {
  SubscriptionStatusDto,
  SubscriptionStatusResponse,
} from "@/lib/subscription";
import { PlanKey } from "@/lib/plans";
import { useLanguage } from "@/components/language-provider";
import type { Locale } from "@/lib/i18n/dictionaries";

type BenefitTierKey = "free" | "monthly" | "yearly" | "lifetime";

type BenefitRowKey =
  | "publicContentAccess"
  | "fullContentAccess"
  | "caseStudies"
  | "knowledgeUpdates"
  | "productEarlyAccess"
  | "communitySupport"
  | "newsletterInsights"
  | "privateDownloads"
  | "roadmapUpdates"
  | "exposureSupport"
  | "quarterlyWorkshops"
  | "oneOnOneCoaching"
  | "prioritySupport"
  | "invoiceSupport"
  | "lifetimePerks";

type BenefitRow = {
  key: BenefitRowKey;
} & Partial<Record<BenefitTierKey, boolean>>;

type CheckoutFeedback = {
  title: string;
  description: string;
  variant: "info" | "success" | "error";
};

const LOCALE_TAGS: Record<Locale, string> = {
  en: "en-US",
  "zh-cn": "zh-CN",
};

const PLAN_ORDER: PlanKey[] = ["monthly", "yearly", "lifetime"];

const planMeta: Record<PlanKey, { price: string; href: string; buttonVariant: "default" | "outline" }> = {
  monthly: {
    price: "¥59",
    href: "/api/checkout?plan=monthly",
    buttonVariant: "outline",
  },
  yearly: {
    price: "¥399",
    href: "/api/checkout?plan=yearly",
    buttonVariant: "default",
  },
  lifetime: {
    price: "¥1,199",
    href: "/api/checkout?plan=lifetime",
    buttonVariant: "default",
  },
};

const benefitRows: BenefitRow[] = [
  {
    key: "publicContentAccess",
    free: true,
    monthly: true,
    yearly: true,
    lifetime: true,
  },
  {
    key: "fullContentAccess",
    monthly: true,
    yearly: true,
    lifetime: true,
  },
  {
    key: "caseStudies",
    monthly: true,
    yearly: true,
    lifetime: true,
  },
  {
    key: "knowledgeUpdates",
    monthly: true,
    yearly: true,
    lifetime: true,
  },
  {
    key: "productEarlyAccess",
    monthly: true,
    yearly: true,
    lifetime: true,
  },
  {
    key: "communitySupport",
    monthly: true,
    yearly: true,
    lifetime: true,
  },
  {
    key: "newsletterInsights",
    free: true,
    monthly: true,
    yearly: true,
    lifetime: true,
  },
  {
    key: "privateDownloads",
    monthly: true,
    yearly: true,
    lifetime: true,
  },
  {
    key: "roadmapUpdates",
    monthly: true,
    yearly: true,
    lifetime: true,
  },
  {
    key: "exposureSupport",
    yearly: true,
    lifetime: true,
  },
  {
    key: "quarterlyWorkshops",
    yearly: true,
    lifetime: true,
  },
  {
    key: "oneOnOneCoaching",
    yearly: true,
    lifetime: true,
  },
  {
    key: "prioritySupport",
    yearly: true,
    lifetime: true,
  },
  {
    key: "invoiceSupport",
    yearly: true,
    lifetime: true,
  },
  {
    key: "lifetimePerks",
    lifetime: true,
  },
];

const benefitTierOrder: BenefitTierKey[] = ["free", "monthly", "yearly", "lifetime"];

const formatExpirationDate = (value?: string | null, locale = LOCALE_TAGS.en) => {
  if (!value) {
    return null;
  }
  try {
    return new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(new Date(value));
  } catch {
    return null;
  }
};

const computeFallbackExpiration = (
  plan?: PlanKey,
  createdAt?: string | null,
  locale = LOCALE_TAGS.en
) => {
  if (!plan || plan === "lifetime" || !createdAt) {
    return null;
  }

  const parsed = new Date(createdAt);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  const fallback = new Date(parsed);
  if (plan === "monthly") {
    fallback.setMonth(fallback.getMonth() + 1);
  } else if (plan === "yearly") {
    fallback.setFullYear(fallback.getFullYear() + 1);
  } else {
    return null;
  }

  return formatExpirationDate(fallback.toISOString(), locale);
};

function SubscriptionPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const statusParam = searchParams.get("status");
  const sessionIdParam = searchParams.get("session_id");
  const { data: session, isPending } = useSession();
  const { dictionary, language } = useLanguage();
  const {
    benefits,
    info,
    buttons,
    feedback: feedbackMessages,
    plans: localizedPlans,
    expiration,
  } = dictionary.subscription;
  const localeTag = LOCALE_TAGS[language] ?? LOCALE_TAGS.en;
  const [feedback, setFeedback] = useState<CheckoutFeedback | null>(null);
  const [processedSessionId, setProcessedSessionId] = useState<string | null>(null);
  const [subscriptionStatus, setSubscriptionStatus] =
    useState<SubscriptionStatusDto | null>(null);

  useEffect(() => {
    if (statusParam === "cancelled") {
      setFeedback({
        variant: "error",
        title: feedbackMessages.cancelled.title,
        description: feedbackMessages.cancelled.description,
      });
      return;
    }

    if (
      statusParam !== "success" ||
      !sessionIdParam ||
      processedSessionId === sessionIdParam
    ) {
      return;
    }

    setProcessedSessionId(sessionIdParam);
    setFeedback({
      variant: "info",
      title: feedbackMessages.processing.title,
      description: feedbackMessages.processing.description,
    });

    fetch("/api/subscription/complete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sessionId: sessionIdParam }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data?.error ?? feedbackMessages.syncError.description);
        }
        setFeedback({
          variant: "success",
          title: feedbackMessages.success.title,
          description: feedbackMessages.success.description,
        });
      })
      .catch((error) => {
        setFeedback({
          variant: "error",
          title: feedbackMessages.syncError.title,
          description:
            (error as Error)?.message ?? feedbackMessages.syncError.description,
        });
      });
  }, [feedbackMessages, processedSessionId, sessionIdParam, statusParam]);

  useEffect(() => {
    let isMounted = true;

    if (isPending || !session) {
      setSubscriptionStatus(null);
      return () => {
        isMounted = false;
      };
    }

    fetch("/api/subscription/status", { cache: "no-store" })
      .then(async (res) => {
        if (!res.ok) {
          return null;
        }
        return (await res.json()) as SubscriptionStatusResponse | null;
      })
      .then((payload) => {
        if (!isMounted) return;
        setSubscriptionStatus(payload?.subscription ?? null);
      })
      .catch(() => {
        if (!isMounted) return;
        setSubscriptionStatus(null);
      });
    return () => {
      isMounted = false;
    };
  }, [session, isPending]);

  const isSubscribed = Boolean(subscriptionStatus?.isActive);
  const expirationLabel = formatExpirationDate(subscriptionStatus?.expiresAt, localeTag);
  const fallbackExpirationLabel = computeFallbackExpiration(
    subscriptionStatus?.plan,
    subscriptionStatus?.createdAt,
    localeTag
  );
  const isLifetimePlan = subscriptionStatus?.plan === "lifetime";
  const formattedExpiration = isLifetimePlan
    ? expiration.permanent
    : expirationLabel ?? fallbackExpirationLabel ?? expiration.pending;
  const currentPlanButtonLabel = isLifetimePlan
    ? buttons.lifetimeActive
    : `${buttons.currentPlanPrefix}${formattedExpiration}`;

  const handleCheckout = (href: string) => {
    if (!session) {
      const next = encodeURIComponent(href);
      router.push(`/signin?next=${next}`);
      return;
    }
    router.push(href);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <div className="mx-auto w-full max-w-4xl px-4 py-16 space-y-10">
        {feedback && (
          <Alert
            variant={feedback.variant === "error" ? "destructive" : "default"}
            className="shadow-sm"
          >
            <AlertTitle>{feedback.title}</AlertTitle>
            <AlertDescription>{feedback.description}</AlertDescription>
          </Alert>
        )}

        <section className="space-y-3">
          {PLAN_ORDER.map((planKey) => {
            const planTranslation = localizedPlans[planKey];
            const planDetails = planMeta[planKey];
            const isCurrentPlan = planKey === subscriptionStatus?.plan;
            const buttonLabel = isSubscribed
              ? isCurrentPlan
                ? currentPlanButtonLabel
                : buttons.alreadyMember
              : planTranslation.cta;
            return (
              <Card
                key={planKey}
                className={cn(
                  "flex items-center justify-between border border-slate-200/70 bg-white/90 px-5 py-4 text-sm dark:border-slate-800 dark:bg-slate-900/70",
                  isCurrentPlan && "border-primary/70 shadow-sm"
                )}
              >
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {planTranslation.name}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {planTranslation.tagline}
                  </p>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-lg font-semibold">{planDetails.price}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {planTranslation.period}
                    </p>
                  </div>
                  <Button
                    variant={planDetails.buttonVariant}
                    size="sm"
                    onClick={() => handleCheckout(planDetails.href)}
                    disabled={isPending || isSubscribed}
                  >
                    {buttonLabel}
                  </Button>
                </div>
              </Card>
            );
          })}
        </section>

        <section id="membership-highlights">
          <Card className="border border-slate-200/70 bg-white/90 text-sm dark:border-slate-800 dark:bg-slate-900/70">
            <CardHeader className="grid grid-cols-5 gap-4 text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
              <div>{benefits.headerLabel}</div>
              {benefitTierOrder.map((tier) => (
                <div key={tier} className="text-center">
                  {benefits.tiers[tier]}
                </div>
              ))}
            </CardHeader>
            <CardContent className="space-y-2">
              {benefitRows.map((row) => (
                <div
                  key={row.key}
                  className="grid grid-cols-5 gap-4 rounded-2xl px-4 py-3 text-slate-600 dark:text-slate-300"
                >
                  <span className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
                    {benefits.rows[row.key]}
                  </span>
                  {benefitTierOrder.map((tier) => (
                    <div
                      key={`${row.key}-${tier}`}
                      className="text-center text-slate-500 dark:text-slate-400"
                    >
                      {row[tier] ? (
                        <CheckCircle className="mx-auto h-4 w-4 text-primary" />
                      ) : (
                        <Minus className="mx-auto h-4 w-4 text-slate-400" />
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
          <p className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-primary" />
            {info.payment}
          </p>
          <p>
            {info.support.beforeLink}
            <Link
              className="text-primary underline decoration-dotted"
              href="/about"
            >
              {info.support.linkText}
            </Link>
            {info.support.afterLink}
          </p>
        </section>
      </div>
    </div>
  );
}

export default function SubscriptionPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center px-4 py-12" />}>
      <SubscriptionPageContent />
    </Suspense>
  );
}
