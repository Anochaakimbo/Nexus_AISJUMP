import type { Localized } from "./types";

/**
 * The Talent Passport rendered the way a CV is: sections in the order a
 * recruiter reads them. Skills and certificates keep their own tabs, so this
 * covers what the other tabs do not.
 */
export type ResumeEntry = {
  id: string;
  title: Localized;
  meta: Localized;
  detail: Localized;
};

export type ResumeSection = {
  id: string;
  title: Localized;
  icon: string;
  entries: ResumeEntry[];
};

export const resumeSections: ResumeSection[] = [
  {
    id: "education",
    title: { th: "การศึกษา", en: "Education" },
    icon: "school",
    entries: [
      {
        id: "bachelor",
        title: {
          th: "วิศวกรรมคอมพิวเตอร์",
          en: "B.Eng. Computer Engineering",
        },
        meta: { th: "ชั้นปีที่ 2 · 2568–ปัจจุบัน", en: "Year 2 · 2025–present" },
        detail: {
          th: "เน้นวิชาโครงสร้างข้อมูล ฐานข้อมูล และการเรียนรู้ของเครื่อง",
          en: "Focus on data structures, databases and machine learning",
        },
      },
    ],
  },
  {
    id: "projects",
    title: { th: "โปรเจกต์", en: "Projects" },
    icon: "chart",
    entries: [
      {
        id: "sales-prediction",
        title: { th: "Sales Prediction", en: "Sales Prediction" },
        meta: {
          th: "Machine Learning · Python, Scikit-learn",
          en: "Machine Learning · Python, Scikit-learn",
        },
        detail: {
          th: "พยากรณ์ยอดขายรายเดือนจากข้อมูลย้อนหลัง 3 ปี ความแม่นยำ 87%",
          en: "Forecast monthly sales from three years of history, 87% accuracy",
        },
      },
      {
        id: "covid-dashboard",
        title: { th: "COVID Dashboard", en: "COVID Dashboard" },
        meta: {
          th: "Data Visualization · Power BI, SQL",
          en: "Data Visualization · Power BI, SQL",
        },
        detail: {
          th: "แดชบอร์ดติดตามสถานการณ์รายจังหวัด อัปเดตอัตโนมัติทุกวัน",
          en: "Province-level tracking dashboard, refreshed daily",
        },
      },
      {
        id: "customer-segmentation",
        title: { th: "Customer Segmentation", en: "Customer Segmentation" },
        meta: {
          th: "Data Analysis · Python, Pandas",
          en: "Data Analysis · Python, Pandas",
        },
        detail: {
          th: "แบ่งกลุ่มลูกค้า 5 กลุ่มด้วย K-means เพื่อวางแผนการตลาด",
          en: "Five customer segments via K-means to guide marketing",
        },
      },
    ],
  },
  {
    id: "activities",
    title: { th: "กิจกรรมและการแข่งขัน", en: "Activities & competitions" },
    icon: "sparkles",
    entries: [
      {
        id: "ai-hackathon",
        title: { th: "AI Hackathon — รองชนะเลิศ", en: "AI Hackathon — runner-up" },
        meta: { th: "2568 · ทีม 4 คน", en: "2025 · team of four" },
        detail: {
          th: "สร้างโมเดลคัดกรองใบสมัครงานภายใน 48 ชั่วโมง",
          en: "Built a résumé-screening model in 48 hours",
        },
      },
      {
        id: "data-camp",
        title: {
          th: "ค่ายพัฒนาทักษะ Data Science",
          en: "Data Science skills camp",
        },
        meta: { th: "2568 · เชียงใหม่", en: "2025 · Chiang Mai" },
        detail: {
          th: "อบรมเชิงปฏิบัติการ 5 วัน ด้านการเตรียมข้อมูลและการนำเสนอ",
          en: "Five-day workshop on data preparation and storytelling",
        },
      },
    ],
  },
];
