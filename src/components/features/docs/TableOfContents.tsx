'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { Search, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from '@/components/ui/input'

interface TocItem {
  id: string
  text: string
  level: number
  children?: TocItem[]
}

interface TableOfContentsProps {
  source: string
}

export function TableOfContents({ source }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState('')
  const [isExpanded, setIsExpanded] = useState(true)
  
  // 构建层级目录结构
  useEffect(() => {
    // 修改正则表达式以更准确地匹配 Markdown 标题
    // 1. 确保标题位于行首 (^)
    // 2. 匹配 1-6 个 # 号
    // 3. 后面必须跟着至少一个空格
    // 4. 捕获标题文本直到行尾
    const headingRegex = /^#{1,6}\s+([^\n]+)$/gm
    
    // 过滤掉代码块中的内容
    const processSource = (source: string) => {
      // 移除代码块内容
      const withoutCodeBlocks = source.replace(/```[\s\S]*?```/g, '')
      // 移除内联代码
      return withoutCodeBlocks.replace(/`[^`]*`/g, '')
    }

    const cleanedSource = processSource(source)
    const matches = Array.from(cleanedSource.matchAll(headingRegex))
    
    const items = matches.map(match => {
      const text = match[1]
      const level = match[0].split('#').length - 1
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
        .replace(/^-+|-+$/g, '')
      
      return { id, text, level }
    })

    // 构建树形结构
    const buildTree = (items: TocItem[]): TocItem[] => {
      const root: TocItem[] = []
      const stack: TocItem[] = []

      items.forEach(item => {
        while (stack.length > 0 && stack[stack.length - 1].level >= item.level) {
          stack.pop()
        }

        if (stack.length === 0) {
          root.push(item)
        } else {
          const parent = stack[stack.length - 1]
          parent.children = parent.children || []
          parent.children.push(item)
        }

        stack.push(item)
      })

      return root
    }

    setHeadings(buildTree(items))
  }, [source])

  // 滚动监听逻辑
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-80px 0% -80% 0%',
        threshold: 1.0,
      }
    )

    const observeHeadings = (items: TocItem[]) => {
      items.forEach(item => {
        const element = document.getElementById(item.id)
        if (element) {
          observer.observe(element)
        }
        if (item.children) {
          observeHeadings(item.children)
        }
      })
    }

    observeHeadings(headings)

    return () => observer.disconnect()
  }, [headings])

  // 点击处理
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      const yOffset = -80
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  // 修改渲染目录项的样式
  const renderTocItem = (item: TocItem) => {
    const isActive = activeId === item.id
    const isVisible = !searchTerm || 
      item.text.toLowerCase().includes(searchTerm.toLowerCase())

    if (!isVisible) return null

    return (
      <li key={item.id}>
        <div
          style={{ paddingLeft: `${(item.level - 1) * 16}px` }}
          className="relative group flex items-center"
        >
          <motion.div
            initial={false}
            animate={{
              opacity: isActive ? 1 : 0,
              x: isActive ? 0 : -4
            }}
            className="absolute -left-[6px] w-[2px] h-[14px] 
              bg-primary rounded-full"
          />
          <a
            href={`#${item.id}`}
            onClick={(e) => handleClick(e, item.id)}
            className={cn(
              'relative block py-1.5 text-sm transition-all duration-200',
              'hover:text-gray-900 dark:hover:text-gray-100',
              isActive
                ? 'text-gray-900 dark:text-gray-100 font-medium'
                : 'text-gray-500/90 dark:text-gray-400/90'
            )}
          >
            {item.text}
          </a>
        </div>
        {item.children && item.children.length > 0 && (
          <ul className="space-y-0.5 mt-0.5">
            {item.children.map(renderTocItem)}
          </ul>
        )}
      </li>
    )
  }

  if (headings.length === 0) return null

  return (
    <nav className="hidden lg:block fixed w-64">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400">
          目录
        </h4>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md 
            transition-colors duration-200"
        >
          <ChevronDown
            className={cn(
              'w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform duration-200',
              isExpanded ? 'transform rotate-180' : ''
            )}
          />
        </button>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            <div className="relative mb-6">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="搜索目录..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 dark:bg-gray-800/80 
              
                "
              />
            </div>

            <div className="relative overflow-y-auto max-h-[calc(100vh-15rem)]">
              <ul className="space-y-0.5 pl-2.5">
                {headings.map(renderTocItem)}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
} 