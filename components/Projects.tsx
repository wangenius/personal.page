import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

const projects = [
  {
    title: "Seeder",
    description: "一个tauri开发的阅读器，云端同步，桌面隐藏阅读",
    link: "https://github.com/wangenius/seeder",
    cta: "Github"
  },
  {
    title: "《我的建筑作品简集》",
    description: "包含建筑设计生涯的部分作品",
    cta:"打开（可能需要网络环境）",
    link: "https://drive.google.com/file/d/1K3mrsC-mIvzLGRO4SqDZ9ZEjTUjJEfQs/view?usp=sharing",
  },
  {
    title: "《美术馆惊魂》",
    description: "twinmotion建筑动画：空间、动画、美术、剧情设计",
    link: "https://www.bilibili.com/video/BV1pv411k7AD/?spm_id_from=333.999.0.0",
    cta: "前往B站观看"
  },
];

const Projects = () => {
  return (
    <section id="portfolios" className="bg-muted py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-2 text-center text-3xl font-bold">My Portfolios</h2>
        <div
          className={cn(
            "mx-auto mb-2 max-w-[600px] text-center text-muted-foreground",
          )}
        >
          Masterpiece or Shit, you decide.
        </div>
        <div
          className={cn(
            "mx-auto mb-12 max-w-[600px] text-center text-muted-foreground",
          )}
        >
          这里记录我的一些拙作，大家随便看看。
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {projects.map((project, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{project.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.cta || "View Project"} <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
