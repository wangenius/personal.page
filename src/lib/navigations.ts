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
  metadata: {
    description?: string
  }
}

// 建议添加更严格的类型定义
interface DirectoryMeta {
  title?: string;
  order?: number;
  description?: string;
  [key: string]: any;
}

interface FileMetadata {
  title?: string;
  description?: string;
  date?: string;
  order?: number;
  parentDir?: string;
  [key: string]: any;
}

// 缓存文件 metadata
const metadataCache = new Map<string, any>();

// 缓存目录 meta.json
const directoryMetaCache = new Map<string, any>();

// 从 MDX 文件中提取 frontmatter，带缓存
function extractMetadata(filePath: string) {
  if (!filePath || !fs.existsSync(filePath)) {
    return {};
  }

  try {
    if (metadataCache.has(filePath)) {
      return metadataCache.get(filePath);
    }

    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { data } = matter(fileContent)
    metadataCache.set(filePath, data);
    return data;
  } catch (error) {
    console.error(`Error extracting metadata from ${filePath}:`, error)
    return {};
  }
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
function scanDirectory(dir: string, basePath = '', rootDir = ''): DocItem[] {
  const items: DocItem[] = []
  const entries = fs.readdirSync(dir, { withFileTypes: true })

  // 先获取当前目录的 meta.json
  const currentDirMeta = getDirectoryMeta(dir)

  const directories = entries.filter(entry => 
    entry.isDirectory() && 
    !entry.name.startsWith('.') && 
    !entry.name.startsWith('[')
  )

  for (const directory of directories) {
    const fullPath = path.join(dir, directory.name)
    const relativePath = basePath ? path.join(basePath, directory.name) : directory.name
    
    // 获取子目录的 meta.json
    const dirMeta = getDirectoryMeta(fullPath)
    const dirItems = scanDirectory(fullPath, relativePath, rootDir)
    
    const indexFile = path.join(fullPath, 'index.mdx')
    const pageFile = path.join(fullPath, 'page.mdx')
    
    // 合并元数据，优先使用 meta.json 中的配置
    const metadata = {
      ...dirMeta,
      ...(fs.existsSync(indexFile) ? extractMetadata(indexFile) : {}),
      ...(fs.existsSync(pageFile) ? extractMetadata(pageFile) : {})
    }

    const href = `/${path.join(rootDir, relativePath).replace(/\\/g, '/')}`

    items.push({
      title: metadata.title || generateTitle(directory.name),
      href, 
      metadata: {
        ...metadata,
        order: dirMeta?.order ?? metadata.order,
        parentDir: basePath
      },
      items: dirItems
    })
  }

  // 处理文件
  const files = entries.filter(entry => 
    entry.isFile() && 
    entry.name.endsWith('.mdx') && 
    !entry.name.startsWith('.') &&
    entry.name !== 'page.mdx' &&
    entry.name !== 'index.mdx'
  )

  for (const file of files) {
    const fullPath = path.join(dir, file.name)
    const metadata = extractMetadata(fullPath)
    const href = `/${path.join(
      rootDir,
      basePath,
      file.name.replace(/\.mdx$/, '')
    ).replace(/\\/g, '/')}`

    items.push({
      title: metadata.title || generateTitle(file.name),
      href,
      metadata: {
        ...metadata,
        order: metadata.order ?? Number.MAX_SAFE_INTEGER,
        parentDir: basePath
      }
    })
  }

  // 确保排序考虑 undefined 的情况
  return items.sort((a, b) => {
    const orderA = a.metadata?.order ?? Number.MAX_SAFE_INTEGER
    const orderB = b.metadata?.order ?? Number.MAX_SAFE_INTEGER
    if (orderA === orderB) {
      return a.title.localeCompare(b.title)
    }
    return orderA - orderB
  })
}

// 修改 groupDocItems 函数，确保正确处理顶层目录的排序
function groupDocItems(items: DocItem[], dir: string): DocSection[] {
  const sections = new Map<string, {
    items: DocItem[];
    meta: DirectoryMeta;
    slug: string;
  }>()

  // 处理所有项目
  items.forEach(item => {
    if (!item.metadata?.parentDir || item.metadata.parentDir === '') {
      if (item.items) {
        const dirName = item.href.split('/').pop() || ''
        const dirMeta = getDirectoryMeta(path.join('src/app', dir, dirName)) || {}
        sections.set(dirName, {
          items: item.items.sort((a, b) => {
            // 在这里就对子项进行排序
            const orderA = a.metadata?.order ?? Number.MAX_SAFE_INTEGER
            const orderB = b.metadata?.order ?? Number.MAX_SAFE_INTEGER
            return orderA === orderB ? 
              a.title.localeCompare(b.title) : 
              orderA - orderB
          }),
          meta: {
            ...dirMeta,
            title: dirMeta.title || item.title,
            order: item.metadata?.order ?? dirMeta.order
          },
          slug: dirName
        })
      } else {
        const section = 'other'
        if (!sections.has(section)) {
          sections.set(section, {
            items: [],
            meta: { title: '其他', order: Number.MAX_SAFE_INTEGER },
            slug: section
          })
        }
        sections.get(section)!.items.push(item)
      }
    }
  })

  // 对 other section 的 items 进行排序
  sections.forEach(section => {
    if (section.slug === 'other') {
      section.items.sort((a, b) => {
        const orderA = a.metadata?.order ?? Number.MAX_SAFE_INTEGER
        const orderB = b.metadata?.order ?? Number.MAX_SAFE_INTEGER
        return orderA === orderB ? 
          a.title.localeCompare(b.title) : 
          orderA - orderB
      })
    }
  })

  return Array.from(sections.entries())
    .map(([slug, { items, meta }]) => ({
      title: meta.title || generateTitle(slug),
      items, // items 已经在上面排序好了
      order: meta.order ?? Number.MAX_SAFE_INTEGER,
      slug,
      metadata: {
        description: meta.description
      }
    }))
    .sort((a, b) => {
      return a.order === b.order ? 
        a.title.localeCompare(b.title) : 
        a.order - b.order
    })
}

// 修改为一个统一的函数,接收类型参数，使用 React cache
export const getNavigation = cache((dir: string): DocSection[] => {
  const items = scanDirectory(`src/app/${dir}`, '', dir)
  return groupDocItems(items, dir)
})

// 建议添加缓存清理机制，避免内存泄漏
function clearCache() {
  metadataCache.clear();
  directoryMetaCache.clear();
}