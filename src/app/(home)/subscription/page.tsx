"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Star, Zap } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "月度订阅",
    tagline: "灵活起步，随时取消",
    price: "¥79",
    period: "每月",
    highlight: "每月一次 45 分钟 1v1 咨询（限前100名付费会员）",
    badge: "灵活",
    sellingPoints: [
      {
        title: "全站深度内容即时解锁",
        description: "包含案例拆解、实操模板与持续更新的知识库。",
      },
      {
        title: "保底 1v1 咨询",
        description: "每月一次 45 分钟 1v1，梳理职业或产品策略，赠送会后行动清单。",
        emphasis: true,
      },
      {
        title: "实时社群反馈",
        description: "加入会员社群，获得每日答疑、资源位推荐与同伴督促。",
      },
    ],
    limitNote: "首批 100 名付费会员可锁定全年 1v1 配额。",
    cta: "Stripe 月度订阅 · ¥79",
    href: "/api/checkout?plan=monthly",
    buttonVariant: "outline" as const,
    popular: false,
  },
  {
    name: "年度订阅",
    tagline: "折扣最高，规划全年成长",
    price: "¥799",
    period: "每年",
    highlight: "一次性立省 ¥149，并锁定全年 1v1 时段优先权",
    badge: "推荐",
    sellingPoints: [
      {
        title: "全年 12 次 1v1 深度辅导",
        description: "按季度复盘目标、优先预约档期，输出个性化行动报告。",
        emphasis: true,
      },
      {
        title: "季度主题工作坊",
        description: "邀请行业嘉宾共创，拆解产品/商业案例，提供独家模板。",
      },
      {
        title: "资料库与路线图抢先更新",
        description: "包括经济专题、增长路线图等，第一时间推送到你的邮箱与社群。",
      },
    ],
    limitNote: "年度会员享受 1v1 额度优先分配与季度复盘服务。",
    cta: "Stripe 年度订阅 · ¥799",
    href: "/api/checkout?plan=yearly",
    buttonVariant: "default" as const,
    popular: true,
  },
];

export default function SubscriptionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">选择你的订阅计划</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            解锁更多优质内容和专业服务，开启你的成长之旅
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <Card 
              key={plan.name} 
              className={`relative h-full ${plan.popular ? 'ring-2 ring-primary shadow-lg scale-105' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">
                    <Star className="w-3 h-3 mr-1" />
                    最受欢迎
                  </Badge>
                </div>
              )}
              
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
                <ul className="space-y-5 mb-6">
                  {plan.sellingPoints.map((point) => (
                    <li key={point.title} className="flex gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <div className="text-left">
                        <p className={`font-semibold ${point.emphasis ? 'text-primary' : ''}`}>
                          {point.title}
                        </p>
                        <p className="text-sm text-muted-foreground">{point.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>

                {plan.limitNote && (
                  <div className="mb-6 flex items-start gap-2 rounded-xl bg-primary/5 p-4 text-left text-sm text-primary">
                    <Zap className="h-4 w-4 mt-0.5" />
                    <p>{plan.limitNote}</p>
                  </div>
                )}

                <Button className="w-full" variant={plan.buttonVariant} size="lg" asChild>
                  <Link href={plan.href}>{plan.cta}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
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
