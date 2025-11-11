"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type Experience = {
  type: "work" | "study" | "product";
  title: string;
  company?: string;
  description: string;
  period: string;
  skills: string[];
  context?: string;
};

export const workHistory: Experience[] = [
  {
    type: "product",
    title: "Proxy Cosmos",
    description:
      "Proxy Cosmos is my 2025 research agent that crawls, tags, and converses over frontier AI infrastructure briefs. I am building it as a living dossier so founders, PMFs, and investors can query live narratives about modular agents, synthetic data supply chains, and the control planes that stitch them together.",
    period: "2025 - now",
    skills: ["Agents", "Infra Research", "Next.js", "AI"],
    context:
      "I treat Proxycosmos like a field lab for agentic research ops, letting me turn raw interviews, forum scrapes, and protocol docs into structured questions a model can reason over in seconds.",
  },
  {
    type: "product",
    title: "VisibleBase",
    description:
      "VisibleBase is my 2025 experiment to make early-stage signals legible and micro-backing practical. It reimagines discovery and financing as an AI-agent flywheel: product pages auto-explain hypotheses, signal layers quantify community conviction, and funding rails tokenize future upside so anyone can back a hunch.",
    period: "2025 - now",
    skills: ["AI Agents", "Signal Graphs", "Micro Funding", "On-chain"],
    context:
      "Scout, Analyst, Match, and Crowd agents run in tandem to surface frontier teams before pitch decks exist, replacing opaque VC decisions with transparent signal streams and programmable incentives.",
  },
  {
    type: "work",
    title: "CMOCHAT Global Marketing Resource Platform",
    company: "CMOCHAT",
    description:
      "I launched CMOCHAT in 2025 as a global marketing resource matching platform. I lead product strategy, the data model, and the AI matching engine, structuring the scattered data of CMOs, agencies, channels, and tools worldwide while building a conversational growth cockpit that turns any business goal into an executable go-to-market playbook. I also designed the lead scoring system, incentive mechanics, and settlement tooling so a founding team can move from brief to closed transaction within a week.",
    period: "2025 - now",
    skills: ["MarTech", "AI Matching", "Growth Strategy", "Product Strategy"],
    context:
      "I now operate like a systems architect for go-to-market teams--mapping the flow of metrics, capital, talent, and narrative into a welded growth stack.",
  },
  {
    type: "work",
    title: "Data Analytics & Product Research",
    company: "Gaorong Capital",
    description:
      "I spent a year embedded in Gaorong Capital's AI research team, dissecting tracks such as AI coding, enterprise applications, and Agent Coin from an investor's perspective. I built data warehouses, mapped entire ecosystems, wrote industry reports, and partnered with portfolio founders on KPI dashboards. I conducted in-depth founder interviews, evaluated technical roadmaps, and used model benchmarks plus case reviews to estimate product ceilings, then distilled the findings into internal research baselines and due diligence checklists.",
    period: "2024",
    skills: ["Case Studies", "Python", "Industry Reports", "Web Scraping"],
    context:
      "Working shoulder to shoulder with top-tier investors showed me how product intuition, data, and capital cadence pull against one another, and it trained me to spot the product signals worth amplifying through a fund's lens.",
  },
  {
    type: "work",
    title: "Founder & Developer",
    company: "Genesis Cosmos",
    description:
      "I founded Genesis Cosmos with partners and launched Jezzlab, an AI-native creative platform. I orchestrated the product blueprint, interaction language, and agent workflows, introducing concepts such as a worldview operating system and character-generation rails so creators could turn narrative assets into collaborative, systemized tools. We adopted a local-first architecture to protect privacy, layered in visual prompt debugging, multi-writer storyline versioning, and subscription commercialization, and secured the first wave of high-paying users with a tiny team.",
    period: "2024 - now",
    skills: [
      "React",
      "TypeScript",
      "Node.js",
      "AI",
      "Agent",
      "Creative Direction",
      "Content",
    ],
    context:
      "This proved that a six-person squad, leaning on structured design and rapid iteration, can rewrite how creators and AI collaborate.",
  },
  {
    type: "product",
    title: "Jezzlab",
    company: "Genesis Cosmos",
    description:
      "Jezzlab is our AI-native creative system that lets narrative teams script, version, and deploy characters and worlds like reusable software. I own the product loop, from the worldview operating system to the agent rails that auto-produce moodboards, lore, and monetization hooks for each IP.",
    period: "2024 - now",
    skills: [
      "Product Systems",
      "AI Agents",
      "Creative Ops",
      "Subscription GTM",
    ],
    context:
      "Jezzlab keeps me honest about how fast small teams need to ship—every sprint blends creative direction, infra, billing, and growth into one stack so nothing gets lost between departments.",
  },
  {
    type: "work",
    title: "Independent Developer",
    description:
      "Since 2023 I have worked full time as an independent developer, building a solo pipeline that runs research, prototyping, validation, and operations end to end. I shipped the Ghostie desktop agent, the AI Markdown tool Mdrone, automation agent kits for finance, and documented the information architecture, prompt templates, and rapid deployment methods behind custom agents. I regularly attack hackathons and online challenges, compressing product positioning, engineering, and growth experiments into 48-hour validation loops.",
    period: "2023 - now",
    skills: ["React", "TypeScript", "Node.js", "AWS"],
    context:
      "I rebuilt my engineering stack end to end so research, design, code, ops, and retros all sit in my own loop, letting me turn any idea into a demoable or billable artifact within a week.",
  },
  {
    type: "study",
    title: "Architect & Designer",
    company: "ZIAD",
    description:
      "Six years in the Tianjin University School of Architecture plus hands-on work at the Zhejiang Provincial Institute of Architectural Design taught me to run system simulations and narrative design at the urban scale while mastering parametric modeling, material research, and user flow analysis. I drove multiple landmark projects from competition concept through construction drawings and began coding during this period, using Rhinoceros, Grasshopper, and Python for generative design, which later became the muscle behind my AI and product work.",
    period: "2017 - 2022",
    skills: [
      "Rhinoceros",
      "Grasshopper",
      "Python",
      "Urban Design",
      "Human Factors Engineering",
    ],
    context:
      "Architecture trained me to balance constraints, rituals, and aesthetics long before I wrote production code, which is why I still prioritize cadence, narrative, and structure when I design products.",
  },
];

const currentYear = new Date().getFullYear();
const CAREER_START_YEAR = 2022;

type TimelineItem = Experience & {
  nodeLabel: string;
  startYear: number;
  endYear: number;
};

const extractYear = (value?: string | null) => {
  if (!value) return null;
  const match = value.match(/\d{4}/);
  return match ? Number(match[0]) : null;
};

const normalizePeriod = (period: string) => {
  const [rawStart, rawEnd] = period
    .split("-")
    .map((part) => part?.trim() ?? "");
  const startYear = extractYear(rawStart) ?? currentYear;
  const hasExplicitEnd = Boolean(rawEnd);
  const endIsNow = hasExplicitEnd && /(now|present)/i.test(rawEnd);
  const parsedEnd = hasExplicitEnd ? extractYear(rawEnd) : null;
  const endYear = endIsNow ? currentYear : (parsedEnd ?? startYear);
  const normalizedStart = Math.max(startYear, CAREER_START_YEAR);
  const normalizedEnd = Math.max(endYear, normalizedStart);
  return {
    startYear: normalizedStart,
    endYear: normalizedEnd,
  };
};
export const Timeline = () => {
  const timelineItems: TimelineItem[] = useMemo(() => {
    const totalItems = workHistory.length;
    return workHistory.map((item, index) => ({
      ...item,
      nodeLabel: (totalItems - index).toString().padStart(2, "0"),
      ...normalizePeriod(item.period),
    }));
  }, []);

  const timelineEntries = useMemo(() => {
    const typePriority = (type: TimelineItem["type"]) =>
      type === "product" ? 1 : 0;
    return [...timelineItems].sort((a, b) => {
      if (b.startYear === a.startYear) {
        const priorityDiff = typePriority(a.type) - typePriority(b.type);
        if (priorityDiff !== 0) {
          return priorityDiff;
        }
        if (b.endYear !== a.endYear) {
          return b.endYear - a.endYear;
        }
      }
      return b.startYear - a.startYear;
    });
  }, [timelineItems]);

  const timelineRows = useMemo(() => {
    const map = new Map<number, TimelineItem[]>();
    timelineEntries.forEach((item) => {
      const list = map.get(item.startYear) ?? [];
      list.push(item);
      map.set(item.startYear, list);
    });
    return Array.from(map.entries())
      .map(([year, items]) => ({ year, items }))
      .sort((a, b) => b.year - a.year);
  }, [timelineEntries]);

  const earliestYear = useMemo(() => {
    return timelineItems.reduce(
      (min, item) => Math.min(min, item.startYear),
      Math.min(CAREER_START_YEAR, currentYear)
    );
  }, [timelineItems]);

  const totalSpan = Math.max(1, currentYear - earliestYear);

  const yearMarks = useMemo(() => {
    const years = new Set<number>();
    timelineItems.forEach((item) => {
      years.add(item.startYear);
      years.add(item.endYear);
    });
    years.add(CAREER_START_YEAR);
    years.add(currentYear);
    return Array.from(years).sort((a, b) => b - a);
  }, [timelineItems]);

  const getPosition = useCallback(
    (year: number) => {
      const clamped = Math.min(Math.max(year, earliestYear), currentYear);
      const offset = currentYear - clamped;
      return (offset / totalSpan) * 100;
    },
    [earliestYear, totalSpan]
  );

  const rowSpacing = 220;
  const timelineHeight = Math.max(
    totalSpan * rowSpacing || rowSpacing,
    timelineRows.length * rowSpacing || rowSpacing
  );

  const [selectedItem, setSelectedItem] = useState<TimelineItem | null>(null);
  const [hoveredItem, setHoveredItem] = useState<TimelineItem | null>(null);
  const handleCardClick = useCallback((item: TimelineItem) => {
    setSelectedItem(item);
  }, []);
  const closeModal = useCallback(() => {
    setSelectedItem(null);
  }, []);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [closeModal]);

  const activeRange = hoveredItem
    ? {
        top: `${getPosition(hoveredItem.endYear)}%`,
        height: `${Math.max(2, getPosition(hoveredItem.startYear) - getPosition(hoveredItem.endYear))}%`,
      }
    : null;

  return (
    <section className="space-y-20 pb-24">
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
          Timeline
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          Evolution Path
        </h2>
      </div>

      <div className="hidden gap-10 md:grid md:grid-cols-[100px_1fr]">
        <div className="relative" style={{ minHeight: timelineHeight }}>
          <div className="absolute inset-0">
            <div className="absolute right-2 top-0 bottom-0 w-px bg-gradient-to-b from-slate-900 via-slate-300/70 to-transparent" />
            {activeRange ? (
              <div
                className="absolute right-[6px] w-[6px] rounded-full bg-slate-900/25 transition-all duration-300"
                style={activeRange}
              />
            ) : null}
            <span className="absolute right-8 top-0 -translate-y-1/2 text-sm font-semibold uppercase tracking-[0.35em] text-slate-900">
              Now
            </span>
            {yearMarks
              .filter((year) => year !== currentYear)
              .map((year) => (
                <div
                  key={year}
                  className="absolute right-8 -translate-y-1/2 text-xs uppercase tracking-[0.35em] text-slate-400"
                  style={{ top: `${getPosition(year)}%` }}
                >
                  {year}
                </div>
              ))}
          </div>
        </div>

        <div className="relative" style={{ minHeight: timelineHeight }}>
          {timelineRows.map((row) => (
            <div
              key={row.year}
              className="absolute flex flex-wrap gap-6"
              style={{ top: `calc(${getPosition(row.year)}% - 32px)` }}
            >
              {row.items.map((item) => (
                <button
                  key={item.nodeLabel}
                  type="button"
                  onClick={() => handleCardClick(item)}
                  onMouseEnter={() => setHoveredItem(item)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`group box-border flex aspect-square w-64 flex-col justify-between rounded-2xl border p-5 text-left transition hover:-translate-y-1 ${
                    item.type === "product"
                      ? "border-slate-800 bg-slate-950 text-white shadow-[0_25px_65px_-45px_rgba(15,23,42,0.85)] hover:border-amber-200/70 hover:shadow-[0_30px_85px_-45px_rgba(15,23,42,0.9)]"
                      : "border-slate-200 bg-white text-slate-900 shadow-[0_20px_55px_-45px_rgba(15,23,42,0.65)] hover:border-slate-400 hover:shadow-[0_25px_65px_-45px_rgba(15,23,42,0.55)]"
                  }`}
                >
                  <div>
                    <h3
                      className={`text-lg font-semibold ${
                        item.type === "product"
                          ? "text-white"
                          : "text-slate-900"
                      }`}
                    >
                      {item.title}
                    </h3>
                    {item.company ? (
                      <p
                        className={`text-sm ${
                          item.type === "product"
                            ? "text-slate-300"
                            : "text-slate-500"
                        }`}
                      >
                        @ {item.company}
                      </p>
                    ) : null}
                  </div>
                  <p
                    className={`text-sm line-clamp-4 ${
                      item.type === "product"
                        ? "text-slate-300/90"
                        : "text-slate-500"
                    }`}
                  >
                    {item.description}
                  </p>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 md:hidden">
        {timelineEntries.map((item) => (
          <button
            key={item.nodeLabel}
            type="button"
            onClick={() => handleCardClick(item)}
            className={`flex aspect-square flex-col justify-between rounded-2xl border p-5 text-left ${
              item.type === "product"
                ? "border-slate-800 bg-slate-950 text-white shadow-[0_25px_65px_-45px_rgba(15,23,42,0.85)]"
                : "border-slate-200 bg-white text-slate-900 shadow-[0_20px_55px_-45px_rgba(15,23,42,0.65)]"
            }`}
          >
            <div>
              <h3
                className={`text-lg font-semibold ${
                  item.type === "product" ? "text-white" : "text-slate-900"
                }`}
              >
                {item.title}
              </h3>
              {item.company ? (
                <p
                  className={`text-sm ${
                    item.type === "product"
                      ? "text-slate-300"
                      : "text-slate-500"
                  }`}
                >
                  @ {item.company}
                </p>
              ) : null}
            </div>
            <p
              className={`text-sm line-clamp-4 ${
                item.type === "product" ? "text-slate-300/90" : "text-slate-500"
              }`}
            >
              {item.description}
            </p>
          </button>
        ))}
      </div>

      {selectedItem ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 py-10"
          role="dialog"
          aria-modal="true"
          aria-label={selectedItem.title}
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 text-slate-900 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:text-slate-700"
              aria-label="Close"
            >
              &times;
            </button>
            <h3 className="text-2xl font-semibold">{selectedItem.title}</h3>
            {selectedItem.company ? (
              <p className="text-sm text-slate-500">@ {selectedItem.company}</p>
            ) : null}
            <p className="mt-4 text-sm leading-relaxed text-slate-700">
              {selectedItem.description}
            </p>
            {selectedItem.context ? (
              <p className="mt-3 border-l-2 border-dashed border-slate-200 pl-3 text-xs italic text-slate-500">
                {selectedItem.context}
              </p>
            ) : null}
            {selectedItem.skills?.length ? (
              <div className="mt-5 flex flex-wrap gap-2">
                {selectedItem.skills.map((skill) => (
                  <span
                    key={`${selectedItem.nodeLabel}-${skill}`}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[12px] text-slate-600"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </section>
  );
};
