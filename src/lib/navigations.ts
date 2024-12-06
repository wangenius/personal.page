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
    parentDir?: string
  }
  items?: DocItem[] // 支持子项
}

export interface DocSection {
  title: string
  items: DocItem[]
  order?: number
  slug: string
}

const DOCS_DIR = path.join(process.cwd(), 'src/app/docs')
const BLOGS_DIR = path.join(process.cwd(), 'src/app/blogs')

// 缓存文件 metadata
const metadataCache = new Map<string, any>();

// 缓存目录 meta.json
const directoryMetaCache = new Map<string, any>();

// 从 MDX 文件中提取 frontmatter，带缓存
function extractMetadata(filePath: string) {
  if (!filePath || !fs.existsSync(filePath)) {
    return {};
  }

  if (metadataCache.has(filePath)) {
    return metadataCache.get(filePath);
  }

  const fileContent = fs.readFileSync(filePath, 'utf8')
  const { data } = matter(fileContent)
  metadataCache.set(filePath, data);
  return data;
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

// 读取目录的 meta.json 文件，带缓存
function getDirectoryMeta(dirPath: string) {
  if (directoryMetaCache.has(dirPath)) {
    return directoryMetaCache.get(dirPath);
  }

  const metaPath = path.join(dirPath, 'meta.json')
  if (fs.existsSync(metaPath)) {
    try {
      const metaContent = fs.readFileSync(metaPath, 'utf8')
      const meta = JSON.parse(metaContent);
      directoryMetaCache.set(dirPath, meta);
      return meta;
    } catch (error) {
      console.error(`Error reading meta.json in ${dirPath}:`, error)
      directoryMetaCache.set(dirPath, null);
    }
  }
  return null;
}

// 递归扫描目录
function scanDirectory(dir: string, isRoot = true): DocItem[] {
  const items: DocItem[] = []
  const entries = fs.readdirSync(dir, { withFileTypes: true })

  // 获取当前目录的 meta.json
  const dirMeta = getDirectoryMeta(dir)

  const directories = entries.filter(entry => 
    entry.isDirectory() && 
    !entry.name.startsWith('.') && 
    !entry.name.startsWith('[')
  )

  for (const directory of directories) {
    const fullPath = path.join(dir, directory.name)
    const relativePath = path.relative(DOCS_DIR, fullPath)
    const dirItems = scanDirectory(fullPath, false)
    
    if (dirItems.length > 0) {
      const indexFile = path.join(fullPath, 'index.mdx')
      const pageFile = path.join(fullPath, 'page.mdx')
      const dirMeta = getDirectoryMeta(fullPath)
      const metadata = {
        ...(fs.existsSync(indexFile) ? extractMetadata(indexFile) : {}),
        ...(fs.existsSync(pageFile) ? extractMetadata(pageFile) : {}),
        ...dirMeta
      }

      items.push({
        title: generateTitle(directory.name),
        href: '', 
        metadata: {
          title: metadata.title || generateTitle(directory.name),
          order: metadata.order,
          description: metadata.description
        },
        items: dirItems
      })
    }
  }

  // 然后处理文件
  const files = entries.filter(entry => 
    entry.isFile() && 
    entry.name.endsWith('.mdx') && 
    !entry.name.startsWith('.') &&
    entry.name !== 'page.mdx' &&
    entry.name !== 'index.mdx'
  )

  for (const file of files) {
    const fullPath = path.join(dir, file.name)
    const relativePath = path.relative(DOCS_DIR, fullPath)
    const metadata = extractMetadata(fullPath)

    items.push({
      title: metadata.title || generateTitle(file.name),
      href: '/docs/' + relativePath.replace(/\.mdx$/, '').replace(/\\/g, '/'),
      metadata
    })
  }

  // 修改排序逻辑，考虑 meta.json 中的 order
  return items.sort((a, b) => {
    const orderA = a.metadata?.order ?? Infinity
    const orderB = b.metadata?.order ?? Infinity
    if (orderA === orderB) {
      return a.title.localeCompare(b.title)
    }
    return orderA - orderB
  })
}

// 修改 groupDocItems 函数
function groupDocItems(items: DocItem[]): DocSection[] {
  const sections = new Map<string, {
    items: DocItem[];
    meta: any;
    slug: string;
  }>()

  // 处理顶层项目
  items.forEach(item => {
    if (!item.href) {  // 如果是目录
      const dirName = item.title.toLowerCase()
      if (dirName === 'person') {
        // 对 person 目录特殊处理
        sections.set('person', {
          items: item.items || [], // 直接使用子项而不是整个目录项
          meta: getDirectoryMeta(path.join(DOCS_DIR, 'person')) || {},
          slug: 'person'
        })
      } else {
        // 其他目录也直接使用子项
        sections.set(dirName, {
          items: item.items || [],
          meta: getDirectoryMeta(path.join(DOCS_DIR, dirName)) || {},
          slug: dirName
        })
      }
    } else {
      // 处理不在任何目录下的文件
      const section = 'other'
      if (!sections.has(section)) {
        sections.set(section, {
          items: [],
          meta: { title: '其他', order: Infinity
          },
          slug: section
        })
      }
      sections.get(section)!.items.push(item)
    }
  })

  return Array.from(sections.entries())
    .map(([title, { items, meta }]) => ({
      title: meta.title || generateTitle(title),
      items: items.sort((a, b) => {
        const orderA = a.metadata?.order ?? Infinity
        const orderB = b.metadata?.order ?? Infinity
        if (orderA === orderB) {
          return a.title.localeCompare(b.title)
        }
        return orderA - orderB
      }),
      order: meta.order ?? Infinity,
      slug: title
    }))
    .sort((a, b) => {
      if (a.order === b.order) {
        return a.title.localeCompare(b.title)
      }
      return a.order - b.order
    })
}

// 修改为一个统一的函数,接收类型参数，使用 React cache
export const getNavigation = cache((type: string): DocSection[] => {
  const items = scanDirectory(`src/app/${type}`)
  return groupDocItems(items)
})