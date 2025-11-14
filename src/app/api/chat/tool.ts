import { z } from "zod";
import { readFile } from "node:fs/promises";
import { getDocFullContentByPath } from "@/lib/docs-access";
import { blog, products, source } from "@/lib/source";
import { tool } from "ai";

const FRONTMATTER_REGEX = /^---[\r\n]+[\s\S]*?[\r\n]+---/;

export const get_doc_content = tool({
  description:
    "根据 /docs/... 路径获取对应文档的完整原始内容，用于回答与该文档直接相关的问题。",
  inputSchema: z.object({
    path: z.string().describe("文档路径，例如 /docs/anthropocene/example"),
  }),
  execute: async (input) => {
    try {
      const { path } = input;
      const content = await getDocFullContentByPath(path);
      if (!content) {
        return {
          error: "Document not found",
        } as const;
      }
      return {
        path,
        content,
      } as const;
    } catch (error: any) {
      return {
        error: error.message,
      } as const;
    }
  },
});

export const get_docs_tree = tool({
  description:
    "获取 /docs 下的文档树形结构和路径信息，可选指定语言（默认为 en）用于快速浏览文档结构。",
  inputSchema: z
    .object({
      lang: z
        .string()
        .optional()
        .describe("文档语言，例如 en 或 zh，不传则默认 en"),
    })
    .optional(),
  execute: async (input) => {
    try {
      const lang = input?.lang ?? "en";
      const tree = source.getPageTree(lang);

      const simplify = (node: any): any => ({
        title: node.data?.title ?? node.name,
        name: node.name,
        url: node.url,
        slugs: node.slugs,
        children: Array.isArray(node.children)
          ? node.children.map((child: any) => simplify(child))
          : [],
      });

      const simplified = Array.isArray(tree)
        ? tree.map((n: any) => simplify(n))
        : simplify(tree as any);

      return {
        lang,
        tree: simplified,
      } as const;
    } catch (error: any) {
      return {
        error: error.message,
      } as const;
    }
  },
});

export const get_blog_list = tool({
  description:
    "获取 blog 下所有文章的简要列表和路径信息，包括 slug、url、标题、描述和日期。",
  inputSchema: z.object({}).optional(),
  execute: async () => {
    try {
      const posts = [...blog.getPages()].sort(
        (a, b) =>
          new Date(b.data.date as string).getTime() -
          new Date(a.data.date as string).getTime()
      );

      return {
        posts: posts.map((post) => ({
          slug: post.slugs?.[0],
          url: post.url,
          title: post.data.title,
          description: post.data.description ?? null,
          date: post.data.date as string,
        })),
      } as const;
    } catch (error: any) {
      return {
        error: error.message,
      } as const;
    }
  },
});

export const get_blog_content = tool({
  description:
    "根据 blog 的 slug 获取对应文章的元信息和完整原始内容（去掉 frontmatter）。",
  inputSchema: z.object({
    slug: z.string().describe("blog 的 slug，例如 gorilla-game"),
  }),
  execute: async (input) => {
    try {
      const { slug } = input;
      const page = blog.getPage([slug]);

      if (!page) {
        return {
          error: "Blog post not found",
        } as const;
      }

      const filePath =
        (page as { absolutePath?: string } | undefined)?.absolutePath ??
        (page as any).absolutePath ??
        page.file?.path;

      if (!filePath) {
        return {
          error: "Blog file path not available",
        } as const;
      }

      const raw = await readFile(filePath, "utf-8");
      const content = raw.replace(FRONTMATTER_REGEX, "").trim();

      return {
        slug,
        url: page.url,
        meta: page.data,
        content,
      } as const;
    } catch (error: any) {
      return {
        error: error.message,
      } as const;
    }
  },
});

export const get_products_list = tool({
  description:
    "获取 products 下所有产品页面的简要列表和路径信息，包括 slug、url、标题和描述。",
  inputSchema: z.object({}).optional(),
  execute: async () => {
    try {
      const items = [...products.getPages()];

      return {
        products: items.map((item) => ({
          slug: item.slugs?.[0],
          url: item.url,
          title: item.data.title,
          description: item.data.description ?? null,
        })),
      } as const;
    } catch (error: any) {
      return {
        error: error.message,
      } as const;
    }
  },
});

export const get_product_content = tool({
  description:
    "根据 product 的 slug 获取对应产品页面的元信息和完整原始内容（去掉 frontmatter）。",
  inputSchema: z.object({
    slug: z.string().describe("product 的 slug，例如 arch_portfolio"),
  }),
  execute: async (input) => {
    try {
      const { slug } = input;
      const page = products.getPage([slug]);

      if (!page) {
        return {
          error: "Product not found",
        } as const;
      }

      const filePath =
        (page as { absolutePath?: string } | undefined)?.absolutePath ??
        (page as any).absolutePath ??
        page.file?.path;

      if (!filePath) {
        return {
          error: "Product file path not available",
        } as const;
      }

      const raw = await readFile(filePath, "utf-8");
      const content = raw.replace(FRONTMATTER_REGEX, "").trim();

      return {
        slug,
        url: page.url,
        meta: page.data,
        content,
      } as const;
    } catch (error: any) {
      return {
        error: error.message,
      } as const;
    }
  },
});
