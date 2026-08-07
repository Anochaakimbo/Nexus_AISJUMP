import { BottomNav } from "@/components/layout/BottomNav";
import { SidebarRail } from "@/components/layout/SidebarRail";

/**
 * Shell for the seven signed-in modules. Onboarding sits in its own route
 * group so it renders full-bleed without navigation chrome.
 */
export default function AppLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex min-h-full flex-col md:pl-20">
      <SidebarRail />
      <main className="mx-auto w-full max-w-2xl flex-1 pb-20 md:pb-8">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
