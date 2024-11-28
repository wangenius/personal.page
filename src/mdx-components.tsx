import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import type { DetailedHTMLProps, ImgHTMLAttributes } from "react";
import { Callout } from "@/components/ui/callout"

// 定义 MDX img 组件的 props 类型
type MDXImgProps = DetailedHTMLProps<
  ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // 标题组件
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold mb-3 mt-8 text-gray-900 dark:text-gray-100">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold mb-2 mt-6 text-gray-900 dark:text-gray-100">
        {children}
      </h3>
    ),

    // 段落和文本组件
    p: ({ children }) => (
      <p className="mb-6 leading-7 text-gray-700 dark:text-gray-300">
        {children}
      </p>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-gray-900 dark:text-gray-50">
        {children}
      </strong>
    ),

    // 列表组件
    ul: ({ children }) => (
      <ul className="list-disc list-inside mb-6 ml-6 space-y-2 text-gray-700 dark:text-gray-300">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside mb-6 ml-6 space-y-2 text-gray-700 dark:text-gray-300">
        {children}
      </ol>
    ),

    // 链接组件
    a: ({ children, href }) => (
      <a
        href={href}
        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 underline transition-colors duration-200"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),

    // 代码块组件
    code: ({ children }) => (
      <code className="bg-gray-100 dark:bg-gray-800 rounded px-2 py-1 text-sm font-mono text-gray-800 dark:text-gray-200">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto mb-6 text-gray-800 dark:text-gray-200">
        {children}
      </pre>
    ),

    // 图片组件
    img: ({ src, alt, width, height, ...props }: MDXImgProps) => {
      if (!src) return null;

      return (
        <div className="my-8">
          <Image
            src={src}
            alt={alt || ""}
            width={800}
            height={400}
            className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            loading="lazy"
            quality={90}
            unoptimized
          />
        </div>
      );
    },

    // 引用块组件
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-6 my-6 italic text-gray-600 dark:text-gray-400">
        {children}
      </blockquote>
    ),

    // 添加 Callout 组件
    Callout: ({ children, type, title }) => (
      <Callout type={type} title={title}>
        {children}
      </Callout>
    ),

    ...components,
  };
}
