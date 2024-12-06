import DocsNav from "@/components/features/docs/SideNav";
import { getNavigation } from "@/lib/navigations";
import Link from "next/link";

export default function DocsPage() {
  const sections = getNavigation("base/math");
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Web 应用文档</h1>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {sections.map((section) => (
            <div 
              key={section.title}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {section.title}
              </h2>
              <div className="space-y-3">
                {section.items.map((item) => (
                  <Link 
                    href={`${item.href}`} 
                    key={item.title}
                    className="block text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md px-3 py-2 transition-colors duration-200"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
