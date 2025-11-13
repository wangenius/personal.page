"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, Zap, Minus } from "lucide-react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import {
  SubscriptionStatusDto,
  SubscriptionStatusResponse,
} from "@/lib/subscription";
import { PlanKey } from "@/lib/plans";

type SellingPoint = {
  title: string;
  description: string;
  emphasis?: boolean;
};

type SubscriptionPlan = {
  key: PlanKey;
  name: string;
  tagline: string;
  price: string;
  period: string;
  highlight: string;
  badge: string;
  sellingPoints: SellingPoint[];
  limitNote: string;
  cta: string;
  href: string;
  buttonVariant: "default" | "outline";
  popular: boolean;
};

type CheckoutFeedback = {
  title: string;
  description: string;
  variant: "info" | "success" | "error";
};

const STATUS_LABELS: Record<string, string> = {
  active: "已激活",
  trialing: "试用中",
  paid: "已支付",
  incomplete: "待处理",
  incomplete_expired: "付款失效",
  cancelled: "已取消",
  canceled: "已取消",
  unpaid: "待付款",
  past_due: "已逾期",
  expired: "已过期",
  unknown: "未知状态",
};

const zhDateFormatter = new Intl.DateTimeFormat("zh-CN", {
  dateStyle: "medium",
});

const formatExpirationDate = (value?: string | null) => {
  if (!value) return null;
  try {
    return zhDateFormatter.format(new Date(value));
  } catch {
    return null;
  }
};

const computeFallbackExpiration = (
  plan?: PlanKey,
  createdAt?: string | null
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

  return zhDateFormatter.format(fallback);
};

const plans: SubscriptionPlan[] = [
  {
    key: "monthly",
    name: "月度订阅",
    tagline: "轻松开启，随时取消",
    price: "¥79",
    period: "每月",
    highlight: "全站内容与社群支持",
    badge: "月付",
    sellingPoints: [
      {
        title: "全站内容即时解锁",
        description: "案例、模板与知识库持续更新",
      },
      {
        title: "社群支持",
        description: "每日答疑、资源推荐与同伴督促",
      },
      {
        title: "所有产品内测资格",
        description: "优先体验最新功能并参与反馈",
      },
    ],
    limitNote: "首批 100 名付费会员可锁定全年 1v1 配额",
    cta: "立即开通 · ¥79/月",
    href: "/api/checkout?plan=monthly",
    buttonVariant: "outline",
    popular: false,
  },
  {
    key: "yearly",
    name: "年度订阅",
    tagline: "年付立省，优先预约",
    price: "¥799",
    period: "每年",
    highlight: "立省 ¥149，全年 1v1 优先档期",
    badge: "年付推荐",
    sellingPoints: [
      {
        title: "全年 12 次 1v1",
        description: "按季度复盘与行动报告",
        emphasis: true,
      },
      {
        title: "所有产品内测资格",
        description: "第一时间体验与专属反馈通道",
      },
      {
        title: "季度主题工作坊",
        description: "与行业嘉宾共创，拆解实战案例",
      },
      {
        title: "资料库抢先更新",
        description: "路线图与专题内容优先推送",
      },
    ],
    limitNote: "年度会员享受 1v1 额度优先与季度复盘",
    cta: "立即开通 · ¥799/年",
    href: "/api/checkout?plan=yearly",
    buttonVariant: "default",
    popular: true,
  },
  {
    key: "lifetime",
    name: "永久订阅",
    tagline: "一次购买，终身受益",
    price: "¥2499",
    period: "终身",
    highlight: "一次付费，所有权益永久有效",
    badge: "终身",
    sellingPoints: [
      {
        title: "终身权益与未来新品授权",
        description: "所有现有及后续产品均享终身使用权",
        emphasis: true,
      },
      {
        title: "所有产品内测资格",
        description: "第一时间体验与专属反馈通道",
      },
      {
        title: "季度主题工作坊",
        description: "深入拆解与共创，长期陪伴成长",
      },
      {
        title: "优先客服与企业发票支持",
        description: "专属通道与标准开票流程",
      },
    ],
    limitNote: "一次付费，权益永久生效",
    cta: "立即开通 · ¥2499",
    href: "/api/checkout?plan=lifetime",
    buttonVariant: "default",
    popular: false,
  },
];

export default function SubscriptionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const statusParam = searchParams.get("status");
  const sessionIdParam = searchParams.get("session_id");
  const { data: session, isPending } = useSession();
  const [feedback, setFeedback] = useState<CheckoutFeedback | null>(null);
  const [processedSessionId, setProcessedSessionId] = useState<string | null>(
    null
  );
  const [subscriptionStatus, setSubscriptionStatus] =
    useState<SubscriptionStatusDto | null>(null);

  useEffect(() => {
    if (statusParam === "cancelled") {
      setFeedback({
        variant: "error",
        title: "订阅未完成",
        description: "你已取消支付，欢迎随时重新加入。",
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
      title: "正在确认订阅",
      description: "支付完成后正在同步会员权限，请稍后刷新即可解锁内容。",
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
          throw new Error(data?.error || "无法确认订阅身份");
        }
        setFeedback({
          variant: "success",
          title: "订阅已激活",
          description: "你已经解锁全站内容，欢迎继续探索。",
        });
      })
      .catch((error) => {
        setFeedback({
          variant: "error",
          title: "同步失败",
          description: error?.message || "确认失败，请稍后再试。",
        });
      });
  }, [processedSessionId, sessionIdParam, statusParam]);

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
  const currentStatusLabel = subscriptionStatus
    ? (STATUS_LABELS[subscriptionStatus.status.toLowerCase()] ??
      subscriptionStatus.status)
    : null;
  const expirationLabel = formatExpirationDate(subscriptionStatus?.expiresAt);
  const currentPlan = subscriptionStatus
    ? plans.find((plan) => plan.key === subscriptionStatus.plan)
    : null;
  const currentPlanName =
    currentPlan?.name ?? subscriptionStatus?.plan ?? "会员";
  const fallbackExpirationLabel = computeFallbackExpiration(
    subscriptionStatus?.plan,
    subscriptionStatus?.createdAt,
  );
  const isLifetimePlan = subscriptionStatus?.plan === "lifetime";
  const expirationDisplay =
    expirationLabel ??
    fallbackExpirationLabel ??
    (isLifetimePlan ? "永久有效" : "待确认");

  const handleCheckout = (href: string) => {
    if (!session) {
      const next = encodeURIComponent(href);
      router.push(`/signin?next=${next}`);
      return;
    }
    router.push(href);
  };
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">解锁会员 · 简洁高级</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            包含全站内容、所有产品内测资格、1v1辅导与社群支持
          </p>
        </div>

        {subscriptionStatus && (
          <Card className="mb-8 mx-auto max-w-3xl border border-slate-100 bg-slate-50/70 p-0 dark:border-slate-800 dark:bg-slate-900/60">
            <CardContent className="flex flex-col gap-3 px-6 py-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                  当前订阅
                </p>
                <p className="text-2xl font-semibold text-slate-900 dark:text-slate-50">
                  {currentPlanName}
                </p>
                <p className="text-sm text-muted-foreground">
                  {currentStatusLabel ?? "状态未知"}
                </p>
              </div>
              <div className="text-left md:text-right">
                <p className="text-sm font-medium text-muted-foreground">
                  到期时间
                </p>
                <p className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                  {expirationDisplay}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {feedback && (
          <Alert
            variant={feedback.variant === "error" ? "destructive" : "default"}
            className="mb-8"
          >
            <AlertTitle>{feedback.title}</AlertTitle>
            <AlertDescription>{feedback.description}</AlertDescription>
          </Alert>
        )}

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => {
            const isCurrentPlan = plan.key === subscriptionStatus?.plan;
            const cardClasses = cn(
              "relative h-full transition duration-150 ease-in-out border bg-white/95 text-slate-900 dark:bg-slate-950 dark:text-slate-50",
              isCurrentPlan
                ? "border-primary/80 bg-slate-900 text-white dark:border-primary/80 dark:bg-white/95 dark:text-slate-900"
                : "border-border/70 hover:border-primary/40 dark:border-slate-800"
            );
            return (
              <Card key={plan.name} className={cardClasses}>
                <CardHeader className="text-center pb-8 space-y-2">
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <Badge variant="secondary" className="mx-auto w-fit">
                      {plan.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.tagline}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">
                      /{plan.period}
                    </span>
                  </div>
                  <p className="text-sm font-medium">{plan.highlight}</p>
                </CardHeader>
                <CardContent>
                  <Button
                    className="w-full"
                    variant={plan.buttonVariant}
                    size="lg"
                    onClick={() => {
                      if (isSubscribed) return;
                      handleCheckout(plan.href);
                    }}
                    disabled={isPending || isSubscribed}
                    aria-label={isSubscribed ? "已是付费会员" : plan.cta}
                  >
                    {isSubscribed
                      ? plan.key === subscriptionStatus?.plan
                        ? "当前订阅"
                        : "已订阅"
                      : plan.cta}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-20 max-w-6xl mx-auto">
          <Card className="bg-white/95 dark:bg-slate-950">
            <CardHeader className="text-center">
              <CardTitle>会员权益对比</CardTitle>
              <CardDescription>含免费版与付费方案的分级对比</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-4 items-center mb-4 text-sm text-muted-foreground">
                <div>权益</div>
                <div className="text-center">免费</div>
                <div className="text-center">月度</div>
                <div className="text-center">年度</div>
                <div className="text-center">永久</div>
              </div>
              {[
                {
                  label: "公开内容访问",
                  free: true,
                  monthly: true,
                  yearly: true,
                  lifetime: true,
                },
                {
                  label: "全站深度内容访问",
                  free: false,
                  monthly: true,
                  yearly: true,
                  lifetime: true,
                },
                {
                  label: "案例拆解与实操模板",
                  monthly: true,
                  yearly: true,
                  lifetime: true,
                },
                {
                  label: "知识库持续更新",
                  monthly: true,
                  yearly: true,
                  lifetime: true,
                },
                {
                  label: "所有产品内测资格",
                  free: false,
                  monthly: true,
                  yearly: true,
                  lifetime: true,
                },
                {
                  label: "会员社群与每日答疑",
                  free: false,
                  monthly: true,
                  yearly: true,
                  lifetime: true,
                },
                {
                  label: "邮件简报与主题洞察",
                  free: true,
                  monthly: true,
                  yearly: true,
                  lifetime: true,
                },
                {
                  label: "私有资源库下载权限",
                  free: false,
                  monthly: true,
                  yearly: true,
                  lifetime: true,
                },
                {
                  label: "路线图抢先与资料库更新",
                  free: false,
                  monthly: true,
                  yearly: true,
                  lifetime: true,
                },
                {
                  label: "资源位推荐与曝光支持",
                  monthly: false,
                  yearly: true,
                  lifetime: true,
                },
                {
                  label: "季度主题工作坊",
                  monthly: false,
                  yearly: true,
                  lifetime: true,
                },
                {
                  label: "1v1 深度辅导",
                  monthly: false,
                  yearly: true,
                  lifetime: true,
                },
                {
                  label: "优先客服与 SLA",
                  monthly: false,
                  yearly: true,
                  lifetime: true,
                },
                {
                  label: "发票与企业采购支持",
                  monthly: false,
                  yearly: true,
                  lifetime: true,
                },
                {
                  label: "终身权益与未来新品授权",
                  monthly: false,
                  yearly: false,
                  lifetime: true,
                },
              ].map((f) => (
                <div
                  key={f.label}
                  className="grid grid-cols-5 gap-4 items-center py-3 border-t"
                >
                  <div className="text-sm">{f.label}</div>
                  <div className="flex justify-center">
                    {f.free ? (
                      <CheckCircle className="h-4 w-4 text-primary" />
                    ) : (
                      <Minus className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex justify-center">
                    {f.monthly ? (
                      <CheckCircle className="h-4 w-4 text-primary" />
                    ) : (
                      <Minus className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex justify-center">
                    {f.yearly ? (
                      <CheckCircle className="h-4 w-4 text-primary" />
                    ) : (
                      <Minus className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex justify-center">
                    {f.lifetime ? (
                      <CheckCircle className="h-4 w-4 text-primary" />
                    ) : (
                      <Minus className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Payment + Support Info */}
        <div className="mt-16 text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm text-slate-700 shadow">
            <Zap className="h-4 w-4 text-primary" />
            <span>所有订阅均通过 Stripe 安全扣款，支持国际卡与银联</span>
          </div>
          <p className="text-muted-foreground">
            支付成功后立即开通会员权限，可登录仪表盘管理发票和续订。需要协助？欢迎通过{" "}
            <Link
              href="/about"
              className="text-primary underline decoration-dotted underline-offset-4"
            >
              联系方式
            </Link>{" "}
            与我们沟通。
          </p>
        </div>
      </div>
    </div>
  );
}
