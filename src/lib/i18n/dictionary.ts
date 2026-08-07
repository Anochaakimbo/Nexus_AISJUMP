export type Locale = "th" | "en";

/**
 * Thai is the source of truth: it defines the key set, and `en` below is typed
 * against it, so a missing English string is a compile error rather than a
 * blank spot discovered during the demo.
 */
const th = {
  // Shared
  "common.seeAll": "ดูทั้งหมด",
  "common.back": "ย้อนกลับ",
  "common.next": "ถัดไป",
  "common.all": "ทั้งหมด",
  "common.free": "ฟรี",
  "common.deadline": "รับสมัครถึง",
  "common.reviews": "รีวิว",
  "common.match": "Match",

  // Navigation
  "nav.home": "หน้าหลัก",
  "nav.roadmap": "Roadmap",
  "nav.learn": "เรียนรู้",
  "nav.opportunity": "โอกาส",
  "nav.mentor": "Mentor",
  "nav.passport": "ผลงาน",
  "nav.career": "อาชีพ",
  "nav.profile": "โปรไฟล์",

  // 1. Onboarding
  "onboarding.title": "ค้นพบศักยภาพของคุณ",
  "onboarding.subtitle": "ให้ AI พาคุณไปสู่อนาคตที่ใช่",
  "onboarding.start": "เริ่มต้นใช้งาน",
  "onboarding.login": "เข้าสู่ระบบ",
  "assessment.title": "AI Assessment",
  "assessment.subtitle": "แบบประเมินศักยภาพของคุณ",
  "assessment.pickInterests": "สิ่งที่คุณสนใจ (เลือกอย่างน้อย 3 ข้อ)",
  "assessment.pickStrengths": "สิ่งที่คุณทำได้ดี (เลือกอย่างน้อย 1 ข้อ)",
  "assessment.pickGoal": "อยากเป็นอะไรในอนาคต",
  "assessment.unsure": "ยังไม่แน่ใจ ให้ AI แนะนำให้",
  "assessment.aiPicked": "AI แนะนำจากคำตอบของคุณ",
  "analyzing.title": "AI กำลังวิเคราะห์ศักยภาพของคุณ",
  "analyzing.subtitle": "ประมวลผลความสนใจ ทักษะ และเป้าหมายของคุณ",
  "analyzing.step1": "วิเคราะห์ความสนใจ",
  "analyzing.step2": "สร้าง Skill DNA",
  "analyzing.step3": "จับคู่เส้นทางอาชีพ",
  "skillDna.title": "Skill DNA ของคุณ",
  "skillDna.subtitle": "นี่คือจุดแข็งที่ AI เห็นจากคำตอบของคุณ",
  "goal.title": "เลือกเป้าหมายอาชีพ",
  "goal.subtitle": "AI จะสร้าง Roadmap ให้ตรงกับเป้าหมายที่คุณเลือก",
  "goal.confirm": "สร้าง Roadmap ของฉัน",

  // 2. Home Dashboard
  "dashboard.greeting": "สวัสดีตอนเช้า",
  "dashboard.readiness": "Career Readiness",
  "dashboard.notifications": "การแจ้งเตือน",
  "dashboard.coach": "AI Growth Coach",
  "dashboard.dailyTasks": "ภารกิจประจำวัน",
  "dashboard.recommended": "โอกาสที่แนะนำสำหรับคุณ",

  // 3. Roadmap
  "roadmap.title": "AI Skill Roadmap",
  "roadmap.careerGoal": "เป้าหมายอาชีพ",
  "roadmap.changeGoal": "เปลี่ยนเป้าหมาย",

  // 4. Learning Hub
  "learn.title": "Learning Hub",
  "learn.search": "ค้นหาคอร์ส, ทักษะ, หัวข้อ...",
  "learn.tabCourse": "คอร์สออนไลน์",
  "learn.tabVideo": "วิดีโอ",
  "learn.tabArticle": "บทความ",
  "learn.tabPodcast": "Podcast",
  "learn.recommended": "แนะนำสำหรับคุณ",

  // 5. Opportunity Hub
  "opportunity.title": "Opportunity Hub",
  "opportunity.search": "ค้นหาโอกาสที่น่าสนใจ...",
  "opportunity.recommended": "โอกาสที่แนะนำสำหรับคุณ",
  "opportunity.hackathon": "Hackathon",
  "opportunity.scholarship": "ทุนการศึกษา",
  "opportunity.workshop": "Workshop",
  "opportunity.camp": "ค่าย / Camp",
  "opportunity.competition": "การแข่งขัน",
  "opportunity.internship": "Internship",
  "opportunity.volunteer": "Volunteer",

  // 6. Mentor Community
  "mentor.title": "Mentor Community",
  "mentor.search": "ค้นหา Mentor, สายอาชีพ, สกิล...",
  "mentor.recommended": "Mentor แนะนำสำหรับคุณ",
  "mentor.available": "ว่างรับปรึกษา",

  // 7. Talent Passport
  "passport.title": "Talent Passport",
  "passport.tabSkills": "ทักษะ",
  "passport.tabWorks": "ผลงาน",
  "passport.tabCerts": "ใบประกาศ",
  "passport.skills": "Skills",
  "passport.certificates": "Certificates",
  "passport.projects": "Projects",
  "passport.activities": "Activities",
  "passport.share": "แชร์ Passport",

  // 8. Career Matching
  "career.title": "Career Matching",
  "career.search": "ค้นหาตำแหน่งงาน, บริษัท...",
  "career.recommended": "ตำแหน่งที่แนะนำสำหรับคุณ",
  "career.skillGap": "Skill Gap ของคุณ",
  "career.viewPlan": "ดูแผนพัฒนาทักษะ",
  "career.buildPlan": "สร้างแผนพัฒนาทักษะ",
  "career.requiredSkills": "ทักษะที่ต้องการ",

  // Growth coach — stage labels (Transtheoretical Model)
  "stage.label": "ช่วงการเปลี่ยนแปลง",
} as const;

export type TranslationKey = keyof typeof th;

const en: Record<TranslationKey, string> = {
  "common.seeAll": "See all",
  "common.back": "Back",
  "common.next": "Next",
  "common.all": "All",
  "common.free": "Free",
  "common.deadline": "Apply by",
  "common.reviews": "reviews",
  "common.match": "Match",

  "nav.home": "Home",
  "nav.roadmap": "Roadmap",
  "nav.learn": "Learn",
  "nav.opportunity": "Opportunity",
  "nav.mentor": "Mentor",
  "nav.passport": "Passport",
  "nav.career": "Career",
  "nav.profile": "Profile",

  "onboarding.title": "Discover your potential",
  "onboarding.subtitle": "Let AI guide you to the right future",
  "onboarding.start": "Get started",
  "onboarding.login": "Sign in",
  "assessment.title": "AI Assessment",
  "assessment.subtitle": "Your potential assessment",
  "assessment.pickInterests": "What interests you? (pick at least 3)",
  "assessment.pickStrengths": "What are you good at? (pick at least 1)",
  "assessment.pickGoal": "What do you want to become?",
  "assessment.unsure": "Not sure — let AI suggest",
  "assessment.aiPicked": "AI suggested this from your answers",
  "analyzing.title": "AI is analysing your potential",
  "analyzing.subtitle": "Processing your interests, skills and goals",
  "analyzing.step1": "Analysing interests",
  "analyzing.step2": "Building your Skill DNA",
  "analyzing.step3": "Matching career paths",
  "skillDna.title": "Your Skill DNA",
  "skillDna.subtitle": "The strengths AI sees in your answers",
  "goal.title": "Choose your career goal",
  "goal.subtitle": "AI will build a roadmap that matches your goal",
  "goal.confirm": "Build my roadmap",

  "dashboard.greeting": "Good morning",
  "dashboard.readiness": "Career Readiness",
  "dashboard.notifications": "Notifications",
  "dashboard.coach": "AI Growth Coach",
  "dashboard.dailyTasks": "Today's missions",
  "dashboard.recommended": "Opportunities for you",

  "roadmap.title": "AI Skill Roadmap",
  "roadmap.careerGoal": "Career goal",
  "roadmap.changeGoal": "Change goal",

  "learn.title": "Learning Hub",
  "learn.search": "Search courses, skills, topics...",
  "learn.tabCourse": "Courses",
  "learn.tabVideo": "Videos",
  "learn.tabArticle": "Articles",
  "learn.tabPodcast": "Podcasts",
  "learn.recommended": "Recommended for you",

  "opportunity.title": "Opportunity Hub",
  "opportunity.search": "Search opportunities...",
  "opportunity.recommended": "Opportunities for you",
  "opportunity.hackathon": "Hackathon",
  "opportunity.scholarship": "Scholarship",
  "opportunity.workshop": "Workshop",
  "opportunity.camp": "Camp",
  "opportunity.competition": "Competition",
  "opportunity.internship": "Internship",
  "opportunity.volunteer": "Volunteer",

  "mentor.title": "Mentor Community",
  "mentor.search": "Search mentors, careers, skills...",
  "mentor.recommended": "Mentors for you",
  "mentor.available": "Available",

  "passport.title": "Talent Passport",
  "passport.tabSkills": "Skills",
  "passport.tabWorks": "Projects",
  "passport.tabCerts": "Certificates",
  "passport.skills": "Skills",
  "passport.certificates": "Certificates",
  "passport.projects": "Projects",
  "passport.activities": "Activities",
  "passport.share": "Share passport",

  "career.title": "Career Matching",
  "career.search": "Search roles, companies...",
  "career.recommended": "Roles matched to you",
  "career.skillGap": "Your skill gap",
  "career.viewPlan": "View skill plan",
  "career.buildPlan": "Build skill plan",
  "career.requiredSkills": "Required skills",

  "stage.label": "Stage of change",
};

export const dictionary: Record<Locale, Record<TranslationKey, string>> = {
  th,
  en,
};
