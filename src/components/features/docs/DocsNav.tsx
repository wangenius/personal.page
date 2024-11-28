'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ScrollArea } from '@/components/ui/scroll-area'
import { type DocSection, type DocItem } from '@/lib/docs'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import path from 'path'

interface DirectoryInfo {
  path: string;
  meta: {
    title: string;
    order: number;
    description?: string;
  } | null;
}

interface DocsNavProps {
  sections: DocSection[]
}

function NavItem({ item, level = 0 }: { item: DocItem; level?: number }) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(true)
  const hasItems = item.items && item.items.length > 0
  const isDirectory = !item.href
  const isActive = pathname === item.href

  return (
    <li className={cn(
      'relative select-none',
      isActive && 'before:absolute before:-left-4 before:top-1/2 before:-translate-y-1/2 before:h-[calc(100%-0.5rem)] before:w-[2px] before:bg-primary before:rounded-full'
    )}>
      <div 
        className={cn(
          'group flex items-center py-1.5 text-sm rounded-md transition-colors duration-200',
          isDirectory ? 'text-foreground/70 hover:text-foreground hover:bg-foreground/[0.03]' : 'text-foreground/60',
          !isDirectory && 'hover:text-foreground hover:bg-foreground/[0.03] cursor-pointer',
          isActive && 'text-foreground font-medium bg-foreground/[0.05]'
        )}
        onClick={() => hasItems && setIsOpen(!isOpen)}
        style={{ paddingLeft: `${level * 1}rem` }}
      >
        {hasItems && (
          <ChevronRight 
            className={cn(
              'h-3 w-3 shrink-0 transition-transform duration-200 text-foreground/30 group-hover:text-foreground/60',
              isOpen && 'rotate-90'
            )}
          />
        )}
        {isDirectory ? (
          <span className="ml-2 font-medium transition-colors duration-200">
            {item.metadata?.title || item.title}
          </span>
        ) : (
          <Link 
            href={item.href} 
            className={cn(
              "ml-5 block w-full flex-1 transition-colors duration-200",
              "hover:text-foreground"
            )}
          >
            {item.metadata?.title || item.title}
          </Link>
        )}
      </div>
      {hasItems && isOpen && item.items && (
        <ul>
          {item.items.map((subItem) => (
            <NavItem key={subItem.href || subItem.title} item={subItem} level={level + 1} />
          ))}
        </ul>
      )}
    </li>
  )
}

export default function DocsNav({ sections }: DocsNavProps) {
  const [directories, setDirectories] = useState<DirectoryInfo[]>([]);
  
  useEffect(() => {
    fetch('/api/docs/directories')
      .then(res => res.json())
      .then(data => setDirectories(data))
      .catch(console.error);
  }, []);

  // 使用目录的 meta 信息来增强现有的 sections
  const enhancedSections = sections.map(section => {
    const sectionDir = directories.find(dir => 
      path.basename(dir.path).toLowerCase() === section.title.toLowerCase()
    );
    
    return {
      ...section,
      title: sectionDir?.meta?.title || section.title,
      order: sectionDir?.meta?.order ?? section.order ?? Infinity
    };
  });
  
  // 按照 order 从小到大排序
  const sortedSections = [...enhancedSections].sort((a, b) => {
    const orderA = a.order ?? Infinity;
    const orderB = b.order ?? Infinity;
    if (orderA === orderB) {
      return a.title.localeCompare(b.title);
    }
    return orderA - orderB;
  });

  return (
    <ScrollArea className="w-60 flex-shrink-0 border-r border-border/10">
      <nav className="px-4 py-8">
        {sortedSections.map((section) => (
          <div key={section.title} className="mb-8 last:mb-0">
            <div className="mb-4 text-xs font-medium text-foreground/40 uppercase tracking-wider px-2">
              {section.title}
            </div>
            <ul className="relative">
              {section.items.map((item) => (
                <NavItem key={item.href || item.title} item={item} />
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </ScrollArea>
  );
} 