"use client";

import { cn } from "@/lib/utils";
import { type ComponentProps, memo } from "react";
import {
  Streamdown,
  defaultRehypePlugins,
  defaultRemarkPlugins,
} from "streamdown";
import { harden } from "rehype-harden";

type ResponseProps = ComponentProps<typeof Streamdown>;

export const Response = memo(
  ({ className, ...props }: ResponseProps) => (
    <Streamdown
      rehypePlugins={[
        defaultRehypePlugins.raw,
        defaultRehypePlugins.katex,
        [
          harden,
          {
            // defaultOrigin 是 rehype-harden 要求的基础域名，用于解析相对链接
            // 如有需要，可以改成你自己的站点域名
            defaultOrigin: "https://wangenius.com",
            // 允许站内和常规 Web 链接前缀，避免被标记为 blocked
            allowedLinkPrefixes: ["/", "http:", "https:"],
            allowedImagePrefixes: ["/", "http:", "https:"],
          },
        ],
      ]}
      remarkPlugins={[defaultRemarkPlugins.gfm, defaultRemarkPlugins.math]}
      className={cn(
        "size-full [&>*:first-child]:mt-0 *:mb-0 space-y-0",
        className
      )}
      {...props}
    />
  ),
  (prevProps, nextProps) => prevProps.children === nextProps.children
);

Response.displayName = "Response";
