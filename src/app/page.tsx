"use client";

import { Toaster } from "@/components/ui/sonner";
import { useEffect, useRef, useState } from "react";
import { useScroll } from "framer-motion";
import Lenis from '@studio-freight/lenis';
import { Navigation } from "@/components/shared/Navigation";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/shared/Footer";
import { ChatBubble } from "@/components/ui/chat/ChatBubble";

export default function Home() {
  const { scrollY } = useScroll();
  
  // 使用 Lenis 实现平滑滚动
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: true,
      touchInertiaMultiplier: 2,
      infinite: false,
    } as any);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // 处理对话框状态
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleChatToggle = (isOpen: boolean) => {
    setIsChatOpen(isOpen);
  };

  const [activeSection, setActiveSection] = useState("hero");
  
  const sections = useRef([
    { id: "hero", name: "首页" },
    { id: "about", name: "关于" },
    { id: "projects", name: "项目" },
    { id: "experience", name: "经历" },
    { id: "contact", name: "联系" }
  ]).current;
  
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  const scrollToSection = (sectionId: string) => {
    const section = sectionRefs.current[sectionId];
    if (section) {
      const yOffset = -80;
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({
        top: y,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      for (const section of sections) {
        const element = sectionRefs.current[section.id];
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <main className="relative bg-gradient-to-b from-background via-background to-muted min-h-screen w-[100vw] overflow-x-hidden">
      <Toaster />

      <Navigation 
        sections={sections}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        scrollY={scrollY}
      />

      <div className="w-full">
        <section 
          ref={(el) => (sectionRefs.current.hero = el)}
          className="min-h-screen"
        >
          <Hero 
            scrollY={scrollY}
            scrollToSection={scrollToSection}
            onChatToggle={handleChatToggle}
          />
        </section>

        <section 
          ref={(el) => (sectionRefs.current.about = el)}
          className="py-16 md:py-24"
        >
          <About />
        </section>

        <section 
          ref={(el) => (sectionRefs.current.projects = el)}
          className="py-16 md:py-24"
        >
          <Projects />
        </section>

        <section 
          ref={(el) => (sectionRefs.current.experience = el)}
          className="py-16 md:py-24"
        >
          <Experience />
        </section>

        <section 
          ref={(el) => (sectionRefs.current.contact = el)}
          className="py-16 md:py-24"
        >
          <Contact />
        </section>

        <Footer />
      </div>

    </main>
  );
}

