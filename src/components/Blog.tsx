"use client";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { RainbowButton } from "@/components/ui/rainbow-button";

export const Blog = () => {
  return (
    <section id={"blog"} className="bg-muted py-20">
      <div className="flex flex-col items-center justify-center">
        <h2 className="mb-2 text-center text-3xl font-bold">My Blog</h2>
        <div
          className={cn(
            "mx-auto mb-2 max-w-[600px] text-center text-muted-foreground",
          )}
        >
          Life is short, so I write it down.
        </div>
        <div
          className={cn(
            "mx-auto mb-12 max-w-[600px] text-center text-muted-foreground",
          )}
        >
          克服羞涩，上传博客，记录生活。
        </div>
        <div className="flex flex-col items-center justify-center">
          <RainbowButton
            onClick={() => {
              window.open(
                "https://evening-earthquake-ba7.notion.site/2024-Blog-121f1b3a7f178021a372fd84ab230255?pvs=4",
              );
            }}
          >
            Visit My Blog <ExternalLink className="h-4 w-4 ml-2" />
          </RainbowButton>
        </div>
      </div>
    </section>
  );
};
