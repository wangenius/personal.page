import heroEn from "@/locales/en/hero.json";
import navigationEn from "@/locales/en/navigation.json";
import timelineEn from "@/locales/en/timeline.json";
import heroZh from "@/locales/zh/hero.json";
import navigationZh from "@/locales/zh/navigation.json";
import timelineZh from "@/locales/zh/timeline.json";

export const dictionaries = {
  en: {
    hero: heroEn,
    navigation: navigationEn,
    timeline: timelineEn,
  },
  "zh-cn": {
    hero: heroZh,
    navigation: navigationZh,
    timeline: timelineZh,
  },
} as const;

export type Dictionaries = typeof dictionaries;
export type Locale = keyof Dictionaries;
export type Dictionary = Dictionaries["en"];
