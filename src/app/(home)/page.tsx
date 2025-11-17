import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { Timeline } from "@/components/Timeline";

export default function HomePage() {
  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-6xl px-4 mx-auto py-12 md:py-16">
        <Hero />
        <Timeline />
        <Contact />
      </div>
    </div>
  );
}
