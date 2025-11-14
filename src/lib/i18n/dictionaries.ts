import heroEn from "@/locales/en/hero.json";
import navigationEn from "@/locales/en/navigation.json";
import subscriptionEn from "@/locales/en/subscription.json";
import timelineEn from "@/locales/en/timeline.json";
import heroZh from "@/locales/zh/hero.json";
import navigationZh from "@/locales/zh/navigation.json";
import subscriptionZh from "@/locales/zh/subscription.json";
import timelineZh from "@/locales/zh/timeline.json";

export const dictionaries = {
  en: {
    hero: heroEn,
    navigation: navigationEn,
    subscription: subscriptionEn,
    timeline: timelineEn,
  },
  cn: {
    hero: heroZh,
    navigation: navigationZh,
    subscription: subscriptionZh,
    timeline: timelineZh,
  },
} as const;

export type Dictionaries = typeof dictionaries;
export type Locale = keyof Dictionaries;
export type Dictionary = Dictionaries["en"];
