"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { Icon } from "@/components/ui/Icon";
import { navItems } from "./nav";

export function SidebarRail() {
  const pathname = usePathname();
  const { t } = useLocale();

  return (
    <aside className="fixed inset-y-0 left-0 z-20 hidden w-20 flex-col items-center gap-1 bg-navy py-5 md:flex">
      {/* Brand mark only — Home sits directly below, so linking this too
          would be a second route to the same place. */}
      <span className="mb-4 block text-sm font-bold leading-none text-white">
        NE<span className="text-primary">X</span>US
      </span>

      {navItems.map((item) => {
        const active = pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex w-16 flex-col items-center gap-1 rounded-xl py-2.5 text-[10px] font-medium transition-colors",
              active
                ? "bg-white/10 text-white"
                : "text-white/50 hover:bg-white/5 hover:text-white/80",
            )}
          >
            <Icon name={item.icon} className="size-5" />
            {t(item.labelKey)}
          </Link>
        );
      })}
    </aside>
  );
}
