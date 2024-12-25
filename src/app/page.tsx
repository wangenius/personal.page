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
    { id: "hero", name: "Home" },
    { id: "about", name: "About" },
    { id: "projects", name: "Projects" },
    { id: "experience", name: "Experience" },
    { id: "contact", name: "Contact" }
  ]).current;
  
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  // 简化滚动到指定区域的函数，使用原生平滑滚动
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

  // 简化滚动检测，只更新当前区域
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      // 找到当前可见的区域
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

  // 组件卸载时清理
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="relative bg-gradient-to-b from-background via-background to-muted min-h-screen">
     <Toaster />

      {/* 导航栏 */}
      <Navigation 
        sections={sections}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        scrollY={scrollY}
      />

      {/* 主要内容区域 */}
      <div 
        ref={(el) => (sectionRefs.current.hero = el)}
      >
        <Hero 
          scrollY={scrollY}
          scrollToSection={scrollToSection}
          onChatToggle={handleChatToggle}
        />
                </div>

      <div 
        ref={(el) => (sectionRefs.current.about = el)}
      >
        <About />
            </div>

      <div 
        ref={(el) => (sectionRefs.current.projects = el)}
      >
        <Projects />
            </div>

      <div 
        ref={(el) => (sectionRefs.current.experience = el)}
      >
        <Experience />
            </div>

      <div 
        ref={(el) => (sectionRefs.current.contact = el)}
      >
        <Contact />
            </div>

      <Footer />
    </div>
  );
}

