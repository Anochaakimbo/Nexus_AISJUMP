import type { Metadata, Viewport } from "next";
import { Prompt } from "next/font/google";
import { LocaleProvider } from "@/lib/i18n/LocaleProvider";
import "./globals.css";

// Prompt is the only family used in NEXUS — it is the one in the design spec
// and, unlike Geist, it ships Thai glyphs. Swapping it breaks every Thai string.
const prompt = Prompt({
  variable: "--font-prompt",
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "NEXUS — AI Talent Ecosystem",
  description:
    "เชื่อมการเรียนรู้ พัฒนาทักษะ สู่ตลาดแรงงานแห่งอนาคต — AI Growth Coach ที่พาผู้เรียนจาก “โอกาส” สู่ “แรงงานคุณภาพ”",
};

export const viewport: Viewport = {
  themeColor: "#0b1d37",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="th" className={`${prompt.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
