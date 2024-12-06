import DocNav from "@/components/docNav";
import DocsNav from "@/components/features/docs/SideNav";
import { getNavigation } from "@/lib/navigations";
import Link from "next/link";

export default function DocsPage() {
  const sections = getNavigation("docs/ai/text2img");
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Web 应用文档</h1>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        </div>
      </div>
    </div>
  );
}
