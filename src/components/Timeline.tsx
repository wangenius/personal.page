"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type Experience = {
  type: "work" | "study";
  title: string;
  company?: string;
  description: string;
  period: string;
  skills: string[];
  context?: string;
};

export const workHistory: Experience[] = [
  {
    type: "work",
    title: "CMOCHAT 全球营销资源匹配平台",
    company: "CMOCHAT",
    description:
      "2025 年立项 CMOCHAT，定位为“全球营销资源匹配平台”。我负责产品战略、数据模型与 AI 匹配引擎，把散落在全球的 CMO、机构、渠道和工具数据结构化，并搭建对话式增长工作台：输入业务目标即可生成可执行的市场作战图。我亲自打磨线索评分体系、激励机制和结算工具，让创业团队可以在一周内完成从需求表达到资源成交的闭环。",
    period: "2025 - now",
    skills: ["营销科技", "AI匹配", "增长策略", "产品策略"],
    context:
      "I now operate like a systems architect for go-to-market teams—mapping指标、资本、人才与叙事的流动，把它们焊成一体化的增长堆栈。",
  },
  {
    type: "work",
    title: "数据分析 & 产品研究",
    company: "高榕创投",
    description:
      "在高榕创投的 AI 投研团队里沉浸一年，从投资人的视角拆解 AI Coding、企业应用与 Agent Coin 等赛道。构建数据仓、整理上下游图谱、撰写行业报告，并联合被投公司搭建指标看板。深度访谈创始人、研究技术路线，用模型评测与案例走查判断产品天花板，再把洞察沉淀成内部投研基线与产品 Due Diligence 清单。",
    period: "2024",
    skills: ["案例研究", "Python", "行业报告", "爬虫"],
    context:
      "Working shoulder to shoulder with top-tier investors taught me how product intuition,数据与资本节奏互相拉扯，也让我学会用基金视角筛选值得放大的产品信号。",
  },
  {
    type: "work",
    title: "Founder & Developer",
    company: "创生语宙",
    description:
      "与五位伙伴创办创生语宙，推出介子（Jezzlab）这一套 AI 创意平台。我负责编排产品蓝图、交互语言与 Agent 工作流，引入“世界观操作系统”“角色生成轨道”等概念，把创作者的叙事资产抽象成可协作的系统化工具。我们用本地优先架构保护创作者隐私，同时嵌入可视化提示词调试、多人剧情版本管理与订阅商业化验证，用极小团队跑出首批高付费用户。",
    period: "2024 - now",
    skills: ["React", "TypeScript", "Node.js", "AI", "Agent", "创作", "内容"],
    context:
      "This proved that a six-person squad、倚靠结构化设计与极快迭代，就能重写创作者与 AI 协作的工作流。",
  },
  {
    type: "work",
    title: "独立开发者",
    description:
      "2023 年起转为全职独立开发者，自建“研究—打样—验证—运营”一人公司流水线。打造桌面 Agent Ghostie、AI Markdown 工具 Mdrone、金融语境的自动化 Agent 套件等项目，并把自定义 Agent 的信息架构、提示词模板和快速部署能力写成方法论。多次参加黑客松与线上赛题，把产品定位、工程能力和增长打法压缩在 48 小时里完成验证。",
    period: "2023 - now",
    skills: ["React", "TypeScript", "Node.js", "AWS"],
    context:
      "I rebuilt my engineering stack end-to-end so I can research、设计、写代码、运营和复盘全部自己搞定，把任何 idea 在一周内做成可演示或可收费的形态。",
  },
  {
    type: "study",
    title: "建筑师 & 设计师",
    company: "ZIAD",
    description:
      "天津大学建筑系六年叠加浙江省建筑设计研究院的实践，让我在城市尺度做系统推演与叙事设计，同时扎实掌握参数化建模、材料实验和用户流线模拟。参与多个地标项目，从竞赛概念到施工图都亲自推进，也在这个阶段开始接触编程，用 Rhinoceros、Grasshopper、Python 做生成式设计，为后续转向 AI 与产品打下审美与系统思维的底层肌肉。",
    period: "2017 - 2022",
    skills: ["Rhinoceros", "Grasshopper", "Python", "城市设计", "人因工程"],
    context:
      "Architecture trained me to balance constraints, rituals, and aesthetics long before I wrote any production code—it is why我现在设计产品时同样重视节奏、叙事与结构。",
  },
];

export const projects = [
  {
    title: "Ghostie",
    description:
      "革新性的轻量级桌面 Agent 平台，让你完全掌控 AI 助手的一切可能。得益于开放的架构设计，你可以自由定制 Agent 的每个行为：从简单的指令到复杂的工作流，从基础自动化到深度系统集成。独特的快捷唤醒机制让你随时随地与 Agent 对话，现代流畅的界面带来极致体验。无需编程知识即可通过可视化界面创建 Agent，同时提供完整的开发接口满足进阶需求。开放的插件生态和完整的桌面权限让你能将 Ghostie 打造成真正属于你的智能助手。这是一个追求极致自由的平台，你的想象力就是它的边界。",
    image: "/projects/ghostie.svg",
    tags: [
      "开放生态",
      "自由定制",
      "智能助手",
      "桌面集成",
      "可视化编排",
      "便捷交互",
    ],
    link: "https://ghostie.wangenius.com",
  },
  {
    title: "Jezzlab",
    description:
      "创生语宙旗下的革新性 AI 创意平台「介子」，重新定义创作范式。取名自物理学基本粒子，象征着对创作本质的探索与突破。平台通过前沿 AIGC 技术，颠覆传统线性创作模式：将世界观构建从抽象概念转化为可视化系统，把角色塑造变成交互式设计过程，让情节编排化繁为简。创新的 AI 协同机制让创作不再是孤独的旅程，而成为人机共创的探索。采用新一代本地优先的存储架构，在保护创作者隐私的同时，提供无缝的协作体验。配备系统化的创作指南，为所有怀抱创意梦想的人打造一个突破性的创作平台。",
    image: "/projects/jezzlab.jpg",
    tags: ["创作革新", "AI协同", "世界观构建", "智能写作", "隐私保护"],
    link: "https://www.jezzlab.com",
  },
  {
    title: "Mdrone",
    description:
      "一个具有AI能力的轻量级Markdown写作工具，支持即时渲染，AI能力更加深层次的融合到写作环境当中。",
    image: "/projects/mdrone.png",
    tags: ["tauri", "AI", "文本生成", "轻量级"],
    github: "https://github.com/wangenius/mdrone",
  },

  {
    title: "建筑作品集",
    description:
      "我的建筑生涯作品集，希望可以展现我的设计和审美能力。点击链接可下载，下载的内容是低分辨率的PDF版本，如需高清或者更多视频、模型内容，可使用邮箱联系我。",
    image: "/projects/architect.png",
    tags: ["城市设计", "建筑", "渲染", "设计"],
    link: "/projects/protfolio4.0.pdf",
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
  const [rawStart, rawEnd] = period.split("-").map((part) => part?.trim() ?? "");
  const startYear = extractYear(rawStart) ?? currentYear;
  const hasExplicitEnd = Boolean(rawEnd);
  const endIsNow = hasExplicitEnd && /now|present|至今/i.test(rawEnd);
  const parsedEnd = hasExplicitEnd ? extractYear(rawEnd) : null;
  const endYear = endIsNow ? currentYear : parsedEnd ?? startYear;
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
    return [...timelineItems].sort((a, b) => {
      if (b.startYear === a.startYear) {
        return b.endYear - a.endYear;
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
    <section className="mb-16 space-y-20">
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Timeline</p>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          成长 · 进化路径
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
                  className="group box-border flex aspect-square w-64 flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-[0_20px_55px_-45px_rgba(15,23,42,0.65)] transition hover:-translate-y-1 hover:border-slate-400 hover:shadow-[0_25px_65px_-45px_rgba(15,23,42,0.55)]"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                    {item.company ? (
                      <p className="text-sm text-slate-500">@ {item.company}</p>
                    ) : null}
                  </div>
                  <p className="text-sm text-slate-500 line-clamp-4">{item.description}</p>
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
            className="flex aspect-square flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-[0_20px_55px_-45px_rgba(15,23,42,0.65)]"
          >
            <div>
              <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
              {item.company ? (
                <p className="text-sm text-slate-500">@ {item.company}</p>
              ) : null}
            </div>
            <p className="text-sm text-slate-500 line-clamp-4">{item.description}</p>
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
              aria-label="关闭"
            >
              ×
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
