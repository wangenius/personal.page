import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";

export function SubscriptionNotice() {
  return (
    <Card className="relative mb-8 overflow-hidden border border-white/10 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 text-slate-50 shadow-lg">
      <div className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen">
        <div className="absolute -left-24 top-0 h-40 w-40 rounded-full bg-emerald-400 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-32 w-32 rounded-full bg-cyan-400 blur-[100px]" />
      </div>
      <CardHeader className="relative space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-100">
          <Sparkles className="h-3.5 w-3.5" />
          Member
        </div>
        <CardTitle className="text-2xl font-semibold leading-tight text-white">订阅后解锁全文</CardTitle>
        <CardDescription className="text-slate-200">
          全站深度内容、模板资产与社群支持将在订阅后即时开放。
        </CardDescription>
      </CardHeader>
      <CardContent className="relative flex flex-col gap-4 text-sm text-slate-100 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-slate-200/80">月付 ¥79 · 年付 ¥799 · 永久 ¥2499</p>
        <Button
          asChild
          variant="secondary"
          size="lg"
          className="w-full gap-2 rounded-full bg-white/90 text-slate-900 hover:bg-white sm:w-auto"
        >
          <Link href="/subscription">
            立即订阅
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
