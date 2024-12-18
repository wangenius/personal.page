import { Callout } from "@/components/ui/callout";
import { CodeBlock } from "@/components/ui/code-block";
import { MDXBlockQuote, MDXLink } from "@/components/ui/mdx-link";
import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import type { DetailedHTMLProps, ImgHTMLAttributes } from "react";
import React, { createElement } from "react";
import { UserTag } from "@/components/ui/user-tag";

// 定义 MDX img 组件的 props 类型
type MDXImgProps = DetailedHTMLProps<
  ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // 标题组件优化
    h1: (props) =>
      createElement("h1", {
        ...props,
        className: "font-bold text-gray-900 dark:text-gray-50 mb-6 mt-8",

        id: props.children
          ?.toString()
          .toLowerCase()
          .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
          .replace(/^-+|-+$/g, ""),
      }),
    h2: (props) =>
      createElement("h2", {
        ...props,
        className:
          "text-3xl font-semibold text-gray-900 dark:text-gray-50 mb-5 mt-8",
        id: props.children
          ?.toString()
          .toLowerCase()
          .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
          .replace(/^-+|-+$/g, ""),
      }),
    h3: (props) =>
      createElement("h3", {
        ...props,
        className:
          "text-2xl font-semibold text-gray-900 dark:text-gray-50 mb-4 mt-6",
        id: props.children
          ?.toString()
          .toLowerCase()
          .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
          .replace(/^-+|-+$/g, ""),
      }),
    h4: (props) =>
      createElement("h4", {
        ...props,
        className:
          "text-xl font-semibold text-gray-900 dark:text-gray-50 mb-4 mt-6",
        id: props.children
          ?.toString()
          .toLowerCase()
          .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
          .replace(/^-+|-+$/g, ""),
      }),
    h5: (props) =>
      createElement("h5", {
        ...props,
        className:
          "text-lg font-semibold text-gray-900 dark:text-gray-50 mb-3 mt-5",
        id: props.children
          ?.toString()
          .toLowerCase()
          .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
          .replace(/^-+|-+$/g, ""),
      }),
    h6: (props) =>
      createElement("h6", {
        ...props,
        className:
          "text-base font-semibold text-gray-900 dark:text-gray-50 mb-3 mt-5",
        id: props.children
          ?.toString()
          .toLowerCase()
          .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
          .replace(/^-+|-+$/g, ""),
      }),

    // 段落样式优化 - 减小底部边距
    p: ({ children }) => (
      <p className="my-1 leading-6 text-base text-gray-700 dark:text-gray-200">
        {children}
      </p>
    ),

    // 加粗文本优化
    strong: ({ children }) => (
      <strong className="font-semibold text-gray-900 dark:text-gray-50">
        {children}
      </strong>
    ),

    // 列表样式优化 - 减小整体边距和行间距
    ul: ({ children }) => (
      <ul className="list-disc list-inside mb-4 ml-4 space-y-2 text-base text-gray-700 dark:text-gray-200">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside mb-4 ml-4 space-y-2 text-base text-gray-700 dark:text-gray-200">
        {children}
      </ol>
    ),

    // 链接样式优化
    a: ({ children, href }) => <MDXLink href={href}>{children}</MDXLink>,

    code: ({ children }) => {
      return (
        <span
          style={{
            display: "inline-block",
            borderRadius: "0.375rem",
            padding: "0 0.375rem",
            backgroundColor: "rgb(243 244 246)",
            color: "rgb(31 41 55)",
            fontFamily: "JetBrains Mono",
            fontSize: "0.875rem",
          }}
        >
          {children}
        </span>
      );
    },

    // 代码块处理
    pre: ({ children }) => {
      if (!React.isValidElement(children)) {
        return <pre>{children}</pre>;
      }

      const childProps = children.props;
      const language =
        childProps.className?.replace(/language-/, "") || "plaintext";
      const code =
        typeof childProps.children === "string" ? childProps.children : "";

      return (
        <div className="relative not-prose rounded-lg overflow-hidden">
          <CodeBlock language={language} code={code}>
            {children}
          </CodeBlock>
        </div>
      );
    },

    // 图片组件优化 - 减小上下边距
    img: ({ src, alt, width, height, ...props }: MDXImgProps) => {
      if (!src) return null;

      return (
        <div className="my-4">
          <Image
            src={src}
            alt={alt || ""}
            width={800}
            height={400}
            className="rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 w-full"
            loading="lazy"
            quality={95}
            unoptimized
          />
        </div>
      );
    },

    // 引用块样式优化 - 减小上下边距
    blockquote: ({ children }) => <MDXBlockQuote>{children}</MDXBlockQuote>,

    // 表格相关组件 - 减小上下边距
    table: ({ children }) => (
      <table className="min-w-full m-0 divide-y divide-gray-200 dark:divide-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg">
        {children}
      </table>
    ),

    thead: ({ children }) => (
      <thead className="bg-gray-50 dark:bg-gray-800">{children}</thead>
    ),

    tbody: ({ children }) => (
      <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
        {children}
      </tbody>
    ),

    tr: ({ children }) => (
      <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
        {children}
      </tr>
    ),

    th: ({ children }) => (
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
        {children}
      </th>
    ),

    td: ({ children }) => (
      <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-200">
        {children}
      </td>
    ),

    // Callout 组件保持不变
    Callout,
    UserTag,
    ...components,
  };
}
