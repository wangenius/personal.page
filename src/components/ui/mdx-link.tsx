"use client";

import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import { cloneElement } from "react";

interface MDXLinkProps {
  href?: string;
  children: React.ReactNode;
  className?: string;
}

export function MDXLink({ href, children, className }: MDXLinkProps) {
  return (
    <span
      onClick={() => href && window.open(href, "_blank")}
      className={cn(
        "cursor-pointer px-1 text-blue-600 dark:text-blue-400",
        "hover:text-blue-800 dark:hover:text-blue-300",
        "underline-offset-4 hover:underline transition-colors",
        "inline-flex items-center gap-1",
        className
      )}
    >
      {children}
      {href?.startsWith("http") && (
        <ExternalLink className="w-[14px] h-[14px]" />
      )}
    </span>
  );
}

export const MDXBlockQuote = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{ fontStyle: "italic", fontSize: "0.8rem" }}
      className="border-l-4 border-gray-200 dark:border-gray-700 py-1 px-5 my-4 text-gray-500 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 rounded-r-lg"
    >
      {children}
    </div>
  );
};
