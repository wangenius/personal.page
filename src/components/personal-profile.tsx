"use client";

import { 
  Github, 
  Globe, 
  Linkedin, 
  Twitter, 
  Mail,
  MapPin,
  Briefcase,
  Calendar,
  ExternalLink
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const profile = {
  name: "WANGENIUS",
  tagline: "TANTO NOMINI NULLUM PAR ELOGIUM",
  subtitle: "A Special Solution From Corbusier to Dijkstra",
  description: "Startup founder, developer, and product manager",
  avatar: "/avatar.png",
  tags: [
    "#AI",
    "#SaaS",
    "#crypto_ecosystem",
    "#technological_narratives",
    "#the_creator_economy",
    "#capital_structure",
    "#investment",
    "#macroeconomics",
    "#technology",
    "#narrative",
    "#marketing"
  ],
};

const socialLinks = [
  {
    name: "Twitter",
    handle: "@iamwangenius",
    url: "https://twitter.com/iamwangenius",
    icon: Twitter,
    description: "A Particular Solution from Le Corbusier to Edsger Dijkstra",
  },
  {
    name: "GitHub",
    handle: "@wangenius",
    url: "https://github.com/wangenius",
    icon: Github,
  },
  {
    name: "LinkedIn",
    handle: "WANGENIUS",
    url: "https://www.linkedin.com/in/wangenius",
    icon: Linkedin,
  },
  {
    name: "Personal Page",
    handle: "wangenius.com",
    url: "https://wangenius.com",
    icon: Globe,
  },
];

const projects = [
  {
    name: "Ghostie",
    description: "the First choice of Agent Crews on your Mac",
    url: "https://ghostie.wangenius.com",
    image: "/products/ghostie.png",
    featured: true,
  },
  {
    name: "Jezzlab",
    description: "IPDE - Integrated Product Development Environment",
    url: "https://jezzlab.com",
    image: "/products/jezzlab.jpg",
    featured: true,
  },
  {
    name: "vibecape",
    description: "AI SAAS 手脚架 - Modern AI SaaS Boilerplate",
    url: "https://vibecape.com",
  },
  {
    name: "CMOCHAT",
    description: "Global Marketing Vendor Matching Platform",
    url: "https://cmochat.com",
  },
  {
    name: "vibemeet.ai",
    description: "AI-Powered Meeting Platform",
    url: "https://vibemeet.ai",
  },
  {
    name: "Genesis Cosmos",
    description: "Creator Economy Ecosystem Startup",
    url: "https://genesiscosmos.com",
  },
  {
    name: "day1.zone",
    description: "Product Development & Innovation",
    url: "https://day1.zone",
  },
];

export function PersonalProfile() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12 md:py-16">
      {/* Hero Section */}
      <div className="mb-12 md:mb-16">
        <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
          <Image
            src={profile.avatar}
            alt={profile.name}
            width={100}
            height={100}
            className="rounded-2xl"
          />
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {profile.name}
            </h1>
            <p className="text-sm text-fd-muted-foreground mb-2 italic">
              {profile.tagline}
            </p>
            <p className="text-sm text-fd-muted-foreground mb-3">
              {profile.subtitle}
            </p>
            <p className="text-base text-fd-foreground">
              {profile.description}
            </p>
          </div>
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {profile.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-md bg-fd-secondary/50 text-fd-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Social Links Section */}
      <div className="mb-12 md:mb-16">
        <h2 className="text-xl font-semibold mb-4">Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <Link
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 p-3 rounded-lg border hover:bg-fd-accent/50 transition-colors"
              >
                <Icon className="w-4 h-4 text-fd-muted-foreground" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{social.handle}</p>
                </div>
                <ExternalLink className="w-3 h-3 text-fd-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            );
          })}
        </div>
      </div>

      {/* Projects Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {projects.map((project) => (
            <Link
              key={project.name}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col rounded-lg border hover:border-fd-foreground/20 transition-all overflow-hidden"
            >
              {project.image && (
                <div className="relative w-full h-40 overflow-hidden bg-fd-secondary/10">
                  <Image
                    src={project.image}
                    alt={project.name}
                    width={400}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-medium">{project.name}</h3>
                  <ExternalLink className="w-3 h-3 flex-shrink-0 text-fd-muted-foreground" />
                </div>
                <p className="text-sm text-fd-muted-foreground line-clamp-2">
                  {project.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

