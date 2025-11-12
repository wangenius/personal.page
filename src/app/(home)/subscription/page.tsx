"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Zap, Minus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

const plans = [
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
    buttonVariant: "outline" as const,
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
    buttonVariant: "default" as const,
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
    buttonVariant: "default" as const,
    popular: false,
  },
];

export default function SubscriptionPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

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

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className="relative h-full border bg-white/95 dark:bg-slate-950"
            >
              <CardHeader className="text-center pb-8 space-y-2">
                <Badge variant="secondary" className="mx-auto w-fit">{plan.badge}</Badge>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.tagline}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
                <p className="text-sm text-primary font-medium">{plan.highlight}</p>
              </CardHeader>

              <CardContent>
                <Button
                  className="w-full"
                  variant={plan.buttonVariant}
                  size="lg"
                  onClick={() => handleCheckout(plan.href)}
                  disabled={isPending}
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
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
                { label: "公开内容访问", free: true, monthly: true, yearly: true, lifetime: true },
                { label: "全站深度内容访问", free: false, monthly: true, yearly: true, lifetime: true },
                { label: "案例拆解与实操模板", monthly: true, yearly: true, lifetime: true },
                { label: "知识库持续更新", monthly: true, yearly: true, lifetime: true },
                { label: "所有产品内测资格", free: false, monthly: true, yearly: true, lifetime: true },
                { label: "会员社群与每日答疑", free: false, monthly: true, yearly: true, lifetime: true },
                { label: "邮件简报与主题洞察", free: true, monthly: true, yearly: true, lifetime: true },
                { label: "私有资源库下载权限", free: false, monthly: true, yearly: true, lifetime: true },
                { label: "路线图抢先与资料库更新", free: false, monthly: true, yearly: true, lifetime: true },
                { label: "资源位推荐与曝光支持", monthly: false, yearly: true, lifetime: true },
                { label: "季度主题工作坊", monthly: false, yearly: true, lifetime: true },
                { label: "1v1 深度辅导", monthly: false, yearly: true, lifetime: true },
                { label: "优先客服与 SLA", monthly: false, yearly: true, lifetime: true },
                { label: "发票与企业采购支持", monthly: false, yearly: true, lifetime: true },
                { label: "终身权益与未来新品授权", monthly: false, yearly: false, lifetime: true },
              ].map((f) => (
                <div key={f.label} className="grid grid-cols-5 gap-4 items-center py-3 border-t">
                  <div className="text-sm">{f.label}</div>
                  <div className="flex justify-center">{f.free ? <CheckCircle className="h-4 w-4 text-primary" /> : <Minus className="h-4 w-4 text-muted-foreground" />}</div>
                  <div className="flex justify-center">{f.monthly ? <CheckCircle className="h-4 w-4 text-primary" /> : <Minus className="h-4 w-4 text-muted-foreground" />}</div>
                  <div className="flex justify-center">{f.yearly ? <CheckCircle className="h-4 w-4 text-primary" /> : <Minus className="h-4 w-4 text-muted-foreground" />}</div>
                  <div className="flex justify-center">{f.lifetime ? <CheckCircle className="h-4 w-4 text-primary" /> : <Minus className="h-4 w-4 text-muted-foreground" />}</div>
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
            支付成功后立即开通会员权限，可登录仪表盘管理发票和续订。需要协助？欢迎通过
            {" "}
            <Link href="/about" className="text-primary underline decoration-dotted underline-offset-4">
              联系方式
            </Link>
            {" "}
            与我们沟通。
          </p>
        </div>
      </div>
    </div>
  );
}
