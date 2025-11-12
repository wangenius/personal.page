import type { MDXComponents } from "mdx/types";
import type { MdxContent } from "@fumadocs/mdx-remote/client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface PaywallPreviewProps {
  segments: MdxContent[];
  components: MDXComponents;
}

export function PaywallPreview({
  segments,
  components,
}: PaywallPreviewProps) {
  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-2xl border border-slate-200/70 bg-background/95 shadow-sm dark:border-slate-800">
        <div className="max-h-[420px] overflow-hidden px-6 pb-10 pt-8 [mask-image:linear-gradient(180deg,#000_60%,rgba(0,0,0,0.1))]">
          <div className="prose prose-slate max-w-none text-base text-foreground dark:prose-invert">
            {segments.map((Segment, index) => (
              <Segment key={index} components={components} />
            ))}
          </div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background via-background/80 to-transparent dark:from-slate-900" />
      </div>
      <div className="flex items-center justify-between rounded-2xl border border-dashed border-slate-200 px-4 py-3 text-sm text-muted-foreground dark:border-slate-800">
        <span>订阅后可继续阅读剩余内容</span>
        <Link
          href="/subscription"
          className="inline-flex items-center gap-1 font-medium text-foreground"
        >
          立即订阅
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
