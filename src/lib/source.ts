import { docs, blog as blogPosts, product } from "@/.source";
import { loader } from "fumadocs-core/source";
import { createMDXSource } from "fumadocs-mdx";

export const docsI18nConfig = {
  parser: "dir" as const,
};
const docsSource = docs.toFumadocsSource();

export const source = loader({
  baseUrl: "/docs",
  source: docsSource,
});

export const blog = loader({
  baseUrl: "/blog",
  source: createMDXSource(blogPosts),
});

export const products = loader({
  baseUrl: "/products",
  source: createMDXSource(product),
});
