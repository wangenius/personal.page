import { getFirstDocumentLink } from "@/lib/get";
import { ArrowRight, FileText } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { DocSection } from "@/lib/navigations";

export default function DocNav({ sections }: { sections: DocSection[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {sections.map((section) => (
        <div 
          key={section.title} 
          className="group rounded-xl border border-border/50 hover:border-foreground/20 bg-background p-6 transition-all duration-200"
        >
          {/* Section 标题区域 */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-xl font-medium text-foreground">
                {section.title}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                探索{section.title}相关的开发文档和指南
              </p>
            </div>
            <Link 
              href={getFirstDocumentLink(section.items) || '#'} 
              className="shrink-0"
            >
              <Button 
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
              >
                浏览全部
                <ArrowRight className="ml-2 h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>

          {/* 文档项目列表 */}
          <div className="space-y-4">
            {section.items.slice(0, 2).map((item) => (
              <Link key={item.title} href={getFirstDocumentLink(item) || '#'}>
                <div className="group/item p-4 rounded-lg hover:bg-secondary/40 transition-colors duration-200">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-md bg-secondary/50 flex items-center justify-center shrink-0">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <h3 className="font-medium text-sm text-foreground mb-1">
                        {item.title}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {item.metadata?.description || `了解${item.title}的核心概念和实践指南`}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover/item:text-foreground transition-colors shrink-0" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}