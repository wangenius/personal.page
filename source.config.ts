import {
  defineCollections,
  defineConfig,
  defineDocs,
  frontmatterSchema,
  metaSchema,
} from "fumadocs-mdx/config";
import { optional, union, z } from "zod/v4/mini";
import {
  remarkImage,
  remarkHeading,
  remarkDirectiveAdmonition,
} from "fumadocs-core/mdx-plugins";

import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkDirective from "remark-directive";

// You can customise Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.vercel.app/docs/mdx/collections#define-docs
const DOC_ROOT = "content/docs";

const accessControlledFrontmatter = frontmatterSchema.extend({
  free: optional(z.boolean()),
});

export const docs = defineDocs({
  dir: DOC_ROOT,
  docs: {
    schema: accessControlledFrontmatter,
  },
  meta: {
    schema: metaSchema,
  },
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [
      remarkDirective,
      remarkDirectiveAdmonition,
      remarkMath,
      remarkImage,
      remarkHeading,
    ],
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
    author: optional(z.string()),
    date: optional(union([z.string(), z.date()])),
  }),
});

export const product = defineCollections({
  type: "doc",
  dir: "content/products",
  async: true,
  schema: frontmatterSchema.extend({
    author: optional(z.string()),
    date: optional(union([z.string(), z.date()])),
  }),
});
