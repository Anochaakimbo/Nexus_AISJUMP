import type { Mentor } from "./types";

export const mentors: Mentor[] = [
  {
    id: "big",
    name: { th: "พี่บิ๊ก", en: "Big" },
    role: { th: "Data Scientist", en: "Data Scientist" },
    company: "Google",
    rating: 4.9,
    reviews: 120,
    skills: ["Python", "Machine Learning", "AI"],
    available: true,
  },
  {
    id: "nan",
    name: { th: "พี่แนน", en: "Nan" },
    role: { th: "Data Analyst", en: "Data Analyst" },
    company: "SCB",
    rating: 4.8,
    reviews: 98,
    skills: ["SQL", "Data Visualization"],
    available: true,
  },
  {
    id: "peerawit",
    name: { th: "พี่พีรวิชญ์", en: "Peerawit" },
    role: { th: "ML Engineer", en: "ML Engineer" },
    company: "LINE",
    rating: 4.9,
    reviews: 110,
    skills: ["Python", "Deep Learning"],
    available: false,
  },
  {
    id: "ploy",
    name: { th: "พี่พลอย", en: "Ploy" },
    role: { th: "Data Engineer", en: "Data Engineer" },
    company: "AIS",
    rating: 4.7,
    reviews: 76,
    skills: ["SQL", "Cloud", "Python"],
    available: true,
  },
];
