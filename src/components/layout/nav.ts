import type { TranslationKey } from "@/lib/i18n/dictionary";

export type NavItem = {
  href: string;
  icon: string;
  labelKey: TranslationKey;
};

/** Every module, in journey order. Used by the desktop rail. */
export const navItems: NavItem[] = [
  { href: "/dashboard", icon: "home", labelKey: "nav.home" },
  { href: "/roadmap", icon: "roadmap", labelKey: "nav.roadmap" },
  { href: "/learn", icon: "learn", labelKey: "nav.learn" },
  { href: "/opportunities", icon: "opportunity", labelKey: "nav.opportunity" },
  { href: "/mentors", icon: "mentor", labelKey: "nav.mentor" },
  { href: "/passport", icon: "passport", labelKey: "nav.passport" },
  { href: "/careers", icon: "career", labelKey: "nav.career" },
];

/** Mobile bottom bar keeps five; the rest are reachable from the journey strip. */
export const primaryNavItems: NavItem[] = navItems.filter((item) =>
  ["/dashboard", "/roadmap", "/learn", "/opportunities", "/passport"].includes(
    item.href,
  ),
);
