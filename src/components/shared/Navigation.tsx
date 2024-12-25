"use client";

import { motion, useTransform, useSpring, MotionValue } from "framer-motion";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavigationProps {
  sections: { id: string; name: string }[];
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
  scrollY: MotionValue<number>;
}

export function Navigation({ sections, activeSection, scrollToSection, scrollY }: NavigationProps) {
  const smoothScroll = useSpring(scrollY, {
    stiffness: 35,
    damping: 20,
    mass: 0.2,
    restDelta: 0.001,
    restSpeed: 0.001,
    velocity: 2
  });

  const navOpacity = useSpring(
    useTransform(smoothScroll, [0, 100], [0, 1]),
    { 
      stiffness: 35, 
      damping: 20,
      mass: 0.2
    }
  );

  const navBackdrop = useSpring(
    useTransform(smoothScroll, [0, 100], [0, 12]),
    { 
      stiffness: 35, 
      damping: 20,
      mass: 0.2
    }
  );

  return (
    <motion.nav
      style={{ 
        opacity: navOpacity,
        backdropFilter: useTransform(navBackdrop, (value) => `blur(${value}px)`)
      }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-primary/10"
    >
      <div className="max-w-4xl mx-auto px-4 h-20 flex items-center justify-between">
        <motion.span 
          className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500"
          whileHover={{ scale: 1.05 }}
        >
          WANGENIUS
        </motion.span>
        
        <div className="hidden md:flex items-center gap-8">
          {sections.map((section) => (
            <motion.button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`relative px-2 py-1 text-sm transition-colors duration-200 ${
                activeSection === section.id
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary/80"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {section.name}
              {activeSection === section.id && (
                <motion.div
                  layoutId="activeSection"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                  transition={{ 
                    type: "spring", 
                    stiffness: 500, 
                    damping: 30 
                  }}
                />
              )}
            </motion.button>
          ))}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
        >
          <Menu className="w-5 h-5" />
        </Button>
      </div>
    </motion.nav>
  );
} 