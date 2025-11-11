import {
  defineCollections,
  defineConfig,
  defineDocs,
  frontmatterSchema,
  metaSchema,
} from "fumadocs-mdx/config";
import z from "zod";
import { remarkAdmonition } from "fumadocs-core/mdx-plugins";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

// You can customise Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.vercel.app/docs/mdx/collections#define-docs
const DOC_FOLDERS = ["content/en/docs", "content/zh/docs"] as const;

export const docs = defineDocs({
  docs: {
    dir: DOC_FOLDERS,
    schema: frontmatterSchema,
  },
  meta: {
    dir: DOC_FOLDERS,
    schema: metaSchema,
  },
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkAdmonition, remarkMath],
    rehypePlugins: (v) => [rehypeKatex, ...v],
    remarkImageOptions: {
      placeholder: "none",
    },
  },
});

export const blog = defineCollections({
  type: "doc",
  dir: "content/blog",
  async: true,
  schema: frontmatterSchema.extend({
    author: z.string().optional(),
    date: z.union([z.string(), z.date()]).optional(),
  }),
});

export const lesson = defineCollections({
  type: "doc",
  dir: "content/lesson",
  async: true,
  schema: frontmatterSchema.extend({
    author: z.string().optional(),
    date: z.union([z.string(), z.date()]).optional(),
  }),
});

export const product = defineCollections({
  type: "doc",
  dir: "content/products",
  async: true,
  schema: frontmatterSchema.extend({
    author: z.string().optional(),
    date: z.union([z.string(), z.date()]).optional(),
  }),
});
