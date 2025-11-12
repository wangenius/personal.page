import {
  defineCollections,
  defineConfig,
  defineDocs,
  frontmatterSchema,
  metaSchema,
} from "fumadocs-mdx/config";
import z from "zod";
import {
  remarkAdmonition,
  remarkImage,
  remarkHeading,
} from "fumadocs-core/mdx-plugins";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

// You can customise Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.vercel.app/docs/mdx/collections#define-docs
const DOC_ROOT = "content/docs";

const accessControlledFrontmatter = frontmatterSchema.extend({
  free: z.enum(["yes", "no"]).default("no"),
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
    remarkPlugins: [remarkAdmonition, remarkMath, remarkImage, remarkHeading],
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

export const product = defineCollections({
  type: "doc",
  dir: "content/products",
  async: true,
  schema: frontmatterSchema.extend({
    author: z.string().optional(),
    date: z.union([z.string(), z.date()]).optional(),
  }),
});
