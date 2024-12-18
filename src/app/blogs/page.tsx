import DocNav from "@/components/docNav";
import { getNavigation } from "@/lib/navigations";

export default function Blogs() {
  const sections = getNavigation("blogs");
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">博客文章</h1>
      <div className="grid gap-6">
        <DocNav sections={sections} />
      </div>
    </div>
  );
}
