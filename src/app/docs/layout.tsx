import DocsNav from "@/components/features/docs/DocsNav"
import { getDocsNavigation } from "@/lib/docs"

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
	const sections = getDocsNavigation()

  return (
      <div className="flex w-full gap-8 justify-between">
        <aside className="w-72 shrink-0">
          <div className="fixed top-0 pt-8 w-72 h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
            <div className="pr-4">
              <DocsNav sections={sections} />
            </div>
          </div>
        </aside>
        <main className="flex-1 min-w-0 py-8">
          <div className="prose prose-slate max-w-3xl">
            {children}
          </div>
        </main>
      </div>
  )
} 