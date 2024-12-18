import SideNav from "@/components/features/docs/SideNav";
import { getNavigation } from "@/lib/navigations";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sections = getNavigation("blogs");

  return (
    <div className="flex flex-1 w-full m-auto gap-5 justify-between">
      <aside className="w-72 shrink-0">
        <div className="fixed top-0 pt-8 w-72 h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
          <div className="pr-4">
            <SideNav sections={sections} />
          </div>
        </div>
      </aside>
      <main className="flex-1 min-w-0 py-8">{children}</main>
    </div>
  );
}
