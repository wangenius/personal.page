import fs from 'fs'
import path from 'path'
import { cache } from 'react'
import matter from 'gray-matter'

export interface DocItem {
  title: string
  href: string
  metadata?: {
    title?: string
    description?: string
    date?: string
    order?: number
  }
  items?: DocItem[] // 支持子项
}

export interface DocSection {
  title: string
  items: DocItem[]
}

const DOCS_DIR = path.join(process.cwd(), 'src/app/docs')

// 从 MDX 文件中提取 frontmatter
function extractMetadata(filePath: string): {
  title?: string
  description?: string
  date?: string
  order?: number
} {
  if (!filePath || !fs.existsSync(filePath)) {
    return {}
  }
  const fileContent = fs.readFileSync(filePath, 'utf8')
  const { data } = matter(fileContent)
  return data
}

// 从文件名生成标题
function generateTitle(filename: string): string {
  return filename
    .replace(/\.mdx$/, '')
    .replace(/page$/, '') // 移除 page 后缀
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
    .trim()
}

// 递归扫描目录
function scanDirectory(dir: string, parentPath = ''): DocItem[] {
  const items: DocItem[] = []
  const entries = fs.readdirSync(dir, { withFileTypes: true })

  // 首先处理文件
  const files = entries.filter(entry => 
    entry.isFile() && 
    entry.name.endsWith('.mdx') && 
    !entry.name.startsWith('.') &&
    entry.name !== 'page.mdx' &&
    entry.name !== 'index.mdx'
  )

  for (const file of files) {
    const fullPath = path.join(dir, file.name)
    const relativePath = parentPath ? `${parentPath}/${file.name}` : file.name
    const metadata = extractMetadata(fullPath)

    items.push({
      title: metadata.title || generateTitle(file.name),
      href: '/docs/' + relativePath.replace(/\.mdx$/, '').replace(/\\/g, '/'),
      metadata
    })
  }

  // 然后处理目录
  const directories = entries.filter(entry => 
    entry.isDirectory() && 
    !entry.name.startsWith('.') && 
    !entry.name.startsWith('[')
  )

  for (const directory of directories) {
    const fullPath = path.join(dir, directory.name)
    const relativePath = parentPath ? `${parentPath}/${directory.name}` : directory.name
    const dirItems = scanDirectory(fullPath, relativePath)
    
    if (dirItems.length > 0) {
      // 检查是否有 index.mdx 或 page.mdx
      const indexFile = path.join(fullPath, 'index.mdx')
      const pageFile = path.join(fullPath, 'page.mdx')
      const metadata = {
        ...(fs.existsSync(indexFile) ? extractMetadata(indexFile) : {}),
        ...(fs.existsSync(pageFile) ? extractMetadata(pageFile) : {})
      }

      items.push({
        title: generateTitle(directory.name),
        href: '', // 空字符串表示这是一个目录
        metadata: {
          title: metadata.title || generateTitle(directory.name)
        },
        items: dirItems
      })
    }
  }

  // 根据 metadata.order 排序
  return items.sort((a, b) => {
    const orderA = a.metadata?.order || 0
    const orderB = b.metadata?.order || 0
    if (orderA === orderB) {
      return a.title.localeCompare(b.title)
    }
    return orderA - orderB
  })
}

// 将文档项按目录分组
function groupDocItems(items: DocItem[]): DocSection[] {
  const sections = new Map<string, DocItem[]>()

  // 处理顶层项目
  items.forEach(item => {
    if (item.href) {
      // 如果是文件
      const parts = item.href.split('/')
      const section = parts[2] || 'other'
      if (!sections.has(section)) {
        sections.set(section, [])
      }
      sections.get(section)!.push(item)
    } else {
      // 如果是目录
      if (item.title.toLowerCase() === 'person') {
        // 如果是 person 目录，直接将其子项添加到 person 分组
        if (!sections.has('person')) {
          sections.set('person', [])
        }
        if (item.items) {
          sections.get('person')!.push(...item.items)
        }
      } else {
        // 其他目录作为独立分组
        sections.set(item.title.toLowerCase(), [item])
      }
    }
  })

  return Array.from(sections.entries())
    .map(([title, items]) => ({
      title: generateTitle(title),
      items: items.sort((a, b) => {
        const orderA = a.metadata?.order || 0
        const orderB = b.metadata?.order || 0
        if (orderA === orderB) {
          return a.title.localeCompare(b.title)
        }
        return orderA - orderB
      })
    }))
    .sort((a, b) => a.title.localeCompare(b.title))
}

export const getDocsNavigation = cache((): DocSection[] => {
  const items = scanDirectory(DOCS_DIR)
  return groupDocItems(items)
}) 