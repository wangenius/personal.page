import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import path from 'path'
import fs from 'fs/promises'
import matter from 'gray-matter'
import { useMDXComponents } from '@/mdx-components'
import { TableOfContents } from '@/components/features/docs/TableOfContents'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import SideNav from '@/components/features/docs/SideNav'
import { getNavigation } from '@/lib/navigations'

interface Props {
  params: {
    slug: string[]
  }
}

// 获取 MDX 组件
const components = useMDXComponents({})

async function getDocFromParams(slug: string[]) {
  const docPath = path.join(process.cwd(), 'src/app/blogs', `${slug.join('/')}.mdx`)
  
  try {
    const doc = await fs.readFile(docPath, 'utf8')
    const { content } = matter(doc)
    return content
  } catch (error) {
    return null
  }
}

export default async function DocPage({ params }: Props) {
  const doc = await getDocFromParams(params.slug)
  const sections = getNavigation("blogs");
  
  if (!doc) {
    notFound()
  }

  return (
    <div className="flex-1 flex gap-16 relative max-w-[1600px] w-full mx-auto px-4">
      <aside className="w-72 shrink-0">
        <div className="fixed top-0 pt-8 w-72 h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
          <div className="pr-4">
            <SideNav sections={sections} />
          </div>
        </div>
      </aside>
      <article className="flex-1">
        <MDXRemote
          source={doc}
          components={components}
          options={{
            parseFrontmatter: true,
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [rehypeSlug],
              format: 'mdx'
            },
          }}
        />
      </article>
      <div className="w-64 flex-none">
        <TableOfContents source={doc} />
      </div>
    </div>
  )
} 