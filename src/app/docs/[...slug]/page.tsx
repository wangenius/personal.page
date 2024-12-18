import SideNav from "@/components/features/docs/SideNav";
import { TableOfContents } from "@/components/features/docs/TableOfContents";
import { getNavigation } from "@/lib/navigations";
import { useMDXComponents } from "@/mdx-components";
import fs from "fs/promises";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import path from "path";
import { cache } from "react";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
interface Props {
  params: {
    slug: string[];
  };
}

// 缓存 MDX 文件内容
const getDocFromParams = cache(async (slug: string[]) => {
  const docPath = path.join(
    process.cwd(),
    "src/app/docs",
    `${slug.join("/")}.mdx`
  );

  try {
    const doc = await fs.readFile(docPath, "utf8");
    const { content, data } = matter(doc);
    return { content, frontmatter: data };
  } catch (error) {
    return null;
  }
});

// 缓存 MDX 组件
const components = cache(() => useMDXComponents({}))();

// 生成静态页面参数
export const generateStaticParams = async () => {
  // 获取所有 MDX 文件路径
  const paths = await getAllDocPaths();
  return paths.map((path) => ({
    slug: path.split("/"),
  }));
};

// 配置静态生成
export const dynamic = "force-static";
export const revalidate = 3600; // 1小时更新一次

// 缓存所有文档路径
const getAllDocPaths = cache(async () => {
  const docsDir = path.join(process.cwd(), "src/app/docs");
  const paths: string[] = [];

  async function scanDir(dir: string) {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = path.relative(docsDir, fullPath);

      if (entry.isDirectory()) {
        await scanDir(fullPath);
      } else if (entry.name.endsWith(".mdx")) {
        paths.push(relativePath.replace(/\.mdx$/, ""));
      }
    }
  }

  await scanDir(docsDir);
  return paths;
});

export default async function DocPage({ params }: Props) {
  const doc = await getDocFromParams(params.slug);

  if (!doc) {
    notFound();
  }

  return (
    <div className="flex flex-1 gap-16 relative px-4">
      <SideNav sections={getNavigation(`docs/${params.slug[0]}`)} />
      <div className="flex-1">
        <MDXRemote
          source={doc.content}
          components={components}
          options={{
            parseFrontmatter: false,
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [rehypeSlug],
              format: "mdx",
            },
          }}
        />
      </div>
      <div className="w-64 flex-none">
        <TableOfContents source={doc.content} />
      </div>
    </div>
  );
}
