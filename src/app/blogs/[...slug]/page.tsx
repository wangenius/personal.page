import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import path from 'path'
import fs from 'fs/promises'
import matter from 'gray-matter'
import { useMDXComponents } from '@/mdx-components'
import { TableOfContents } from '@/components/features/docs/TableOfContents'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

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
  
  if (!doc) {
    notFound()
  }

  return (
    <div className="flex gap-16 relative max-w-7xl mx-auto px-4">
      <article className="w-full prose max-w-3xl flex-grow">
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