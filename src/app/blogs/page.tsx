import DocNav from "@/components/docNav";
import { getNavigation } from "@/lib/navigations";
import { cn } from "@/lib/utils";

interface BlogPost {
  title: string;
  description: string;
  date: string;
  slug: string;
}

// 这里暂时使用模拟数据，之后可以从实际的数据源获取
const MOCK_POSTS: BlogPost[] = [
  {
    title: "构建现代化的Next.js应用",
    description: "学习如何使用Next.js 14和React构建高性能的Web应用",
    date: "2024-03-20",
    slug: "building-modern-nextjs-apps"
  },
  {
    title: "React服务器组件详解",
    description: "深入理解React服务器组件的工作原理和最佳实践",
    date: "2024-03-15",
    slug: "understanding-react-server-components"
  }
];

export default function Blogs() {
  const sections = getNavigation('blogs')
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">博客文章</h1>
      <div className="grid gap-6">
       <DocNav sections={sections} />
      </div>
    </div>
  );
}
