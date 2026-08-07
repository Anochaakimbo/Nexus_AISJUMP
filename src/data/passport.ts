import type { Localized } from "./types";

/**
 * Evidence counts only. Career Readiness lives on the profile and is shown on
 * the dashboard — keeping a second value here produced two different numbers
 * for the same metric.
 */
export const passportStats = {
  skills: 12,
  certificates: 8,
  projects: 5,
  activities: 16,
};

export type PassportWork = {
  id: string;
  title: Localized;
  kind: Localized;
  tools: Localized;
};

export const featuredWorks: PassportWork[] = [
  {
    id: "sales-prediction",
    title: { th: "Sales Prediction", en: "Sales Prediction" },
    kind: {
      th: "Machine Learning Project",
      en: "Machine Learning Project",
    },
    tools: {
      th: "ใช้ Python, Scikit-learn",
      en: "Built with Python, Scikit-learn",
    },
  },
  {
    id: "covid-dashboard",
    title: { th: "COVID Dashboard", en: "COVID Dashboard" },
    kind: { th: "Data Visualization", en: "Data Visualization" },
    tools: {
      th: "ใช้ Power BI, SQL",
      en: "Built with Power BI, SQL",
    },
  },
  {
    id: "customer-segmentation",
    title: { th: "Customer Segmentation", en: "Customer Segmentation" },
    kind: { th: "Data Analysis", en: "Data Analysis" },
    tools: {
      th: "ใช้ Python, Pandas",
      en: "Built with Python, Pandas",
    },
  },
];

export type Certificate = {
  id: string;
  title: Localized;
  issuer: string;
  year: string;
};

export const certificates: Certificate[] = [
  {
    id: "python-cert",
    title: { th: "Python for Everybody", en: "Python for Everybody" },
    issuer: "Coursera",
    year: "2025",
  },
  {
    id: "sql-cert",
    title: { th: "SQL Basics", en: "SQL Basics" },
    issuer: "ThaiMOOC",
    year: "2025",
  },
  {
    id: "hackathon-cert",
    title: {
      th: "AI Hackathon — รองชนะเลิศ",
      en: "AI Hackathon — Runner-up",
    },
    issuer: "NEXUS",
    year: "2025",
  },
];
