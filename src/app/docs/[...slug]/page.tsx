import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import path from 'path'
import fs from 'fs/promises'
import matter from 'gray-matter'
import { Callout } from '@/components/ui/callout'

interface Props {
  params: {
    slug: string[]
  }
}

// 定义 MDX 组件
const components = {
  Callout: Callout,
}

async function getDocFromParams(slug: string[]) {
  const docPath = path.join(process.cwd(), 'src/app/docs', `${slug.join('/')}.mdx`)
  
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
    <article className="prose prose-lg max-w-none">
      <MDXRemote 
        source={doc} 
        components={components}
      />
    </article>
  )
} 