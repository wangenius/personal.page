import { readFile } from "node:fs/promises";
import { createCompiler } from "@fumadocs/mdx-remote";
import type { MdxContent } from "@fumadocs/mdx-remote/client";
import { source } from "@/lib/source";

type DocPage = ReturnType<typeof source.getPage>;

const FREE_FLAG = "yes";

export function isDocFree(page?: DocPage): boolean {
  return Boolean(page && page.data?.free === FREE_FLAG);
}

export function requiresSubscription(page?: DocPage): boolean {
  return Boolean(page) && !isDocFree(page);
}

const FRONTMATTER_REGEX = /^---[\r\n]+[\s\S]*?[\r\n]+---/;
const previewCompiler = createCompiler({
  preset: "fumadocs",
});

export async function getDocPreviewSegments(
  page?: DocPage,
  limit = 2
): Promise<MdxContent[]> {
  const filePath =
    (page as { absolutePath?: string } | undefined)?.absolutePath ??
    page?.absolutePath;

  if (!filePath) return [];

  try {
    const raw = await readFile(filePath, "utf-8");
    const content = raw.replace(FRONTMATTER_REGEX, "").trim();

    const segments = content
      .split(/\r?\n\s*\r?\n/)
      .map((segment) => segment.trim())
      .filter(Boolean);

    const trimmedSegments = segments.slice(0, limit);

    const compiledSegments = await Promise.all(
      trimmedSegments.map(async (segment, index) => {
        const { body } = await previewCompiler.compile({
          source: segment,
          filePath: `${filePath}#preview-${index + 1}`,
        });

        return body;
      })
    );

    return compiledSegments;
  } catch (error) {
    console.error("Failed to build preview content:", error);
    return [];
  }
}
