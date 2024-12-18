"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { type DocItem, type DocSection } from "@/lib/navigations";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface DirectoryInfo {
  path: string;
  meta: {
    title: string;
    order: number;
    description?: string;
  } | null;
}

interface DocsNavProps {
  sections: DocSection[];
}

function NavItem({ item, level = 0 }: { item: DocItem; level?: number }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const hasItems = item.items && item.items.length > 0;
  const isDirectory = !item.href;
  const isActive = pathname === item.href;

  const handleClick = (e: React.MouseEvent) => {
    if (hasItems) {
      e.preventDefault();
      e.stopPropagation();
      setIsOpen(!isOpen);
    }
  };

  return (
    <li className="relative select-none">
      <div
        className={cn(
          "group flex items-center h-8 text-[13px] rounded-md transition-all duration-200",
          isDirectory 
            ? "hover:bg-gray-100/80 dark:hover:bg-gray-800/50" 
            : "hover:bg-gray-100/80 dark:hover:bg-gray-800/50",
          isActive && [
            "bg-primary/[0.08] dark:bg-primary/10",
            "text-primary dark:text-primary",
            "font-medium"
          ],
          !isActive && [
            "text-gray-600 dark:text-gray-300",
            "hover:text-gray-900 dark:hover:text-gray-100"
          ],
          level === 0 && "font-medium"
        )}
        onClick={hasItems ? handleClick : undefined}
        style={{ 
          paddingLeft: level === 0 ? '0.75rem' : `${level * 1}rem`,
          marginLeft: level === 0 ? '0' : '0.25rem'
        }}
      >
        {hasItems && (
          <button
            onClick={handleClick}
            className="flex items-center focus:outline-none"
          >
            <ChevronRight
              className={cn(
                "h-3.5 w-3.5 shrink-0 transition-transform duration-200",
                isOpen && "rotate-90",
                isActive 
                  ? "text-primary/70" 
                  : "text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400"
              )}
            />
          </button>
        )}
        {isDirectory ? (
          <span
            className={cn(
              "ml-2 transition-colors duration-200 flex-1 cursor-pointer",
              level === 0 && "uppercase tracking-wide text-[12px] font-semibold",
              !isActive && level === 0 && "text-gray-400 dark:text-gray-500"
            )}
            onClick={hasItems ? handleClick : undefined}
          >
            {item.metadata?.title || item.title}
          </span>
        ) : (
          <Link
            href={item.href}
            className={cn(
              "ml-5 block w-full flex-1 transition-colors duration-200"
            )}
          >
            {item.metadata?.title || item.title}
          </Link>
        )}
      </div>
      {hasItems && isOpen && item.items && (
        <ul className={cn(
          "relative pl-3",
          level === 0 && "mt-1 mb-4",
          level !== 0 && "mt-0.5 mb-1"
        )}>
          {item.items.map((subItem) => (
            <NavItem
              key={subItem.href || subItem.title}
              item={subItem}
              level={level + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function DocsNav({ sections }: DocsNavProps) {
  // 使用目录的 meta 信息来增强现有的 sections
  const enhancedSections = sections.map((section) => {
    return {
      ...section,
      title: section.title,
      order: section.order ?? Infinity,
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
    <aside className="w-72 shrink-0">
      <div className="fixed top-10 pt-8 w-92 h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
        <div className="pr-4">
          <ScrollArea className="w-72 select-none flex-shrink-0 border-r border-border/10">
            <nav className="px-4 py-8">
              {sortedSections.map((section) => (
                <div key={section.title} className="mb-8 last:mb-0">
                  <div className="mb-4 text-xs font-medium text-foreground/40 uppercase tracking-wider px-2">
                    {section.title}
                  </div>
                  <ul className="relative space-y-0.5">
                    {section.items.map((item) => (
                      <NavItem key={item.href || item.title} item={item} />
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </ScrollArea>
        </div>
      </div>
    </aside>
  );
}
