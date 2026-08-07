# NEXUS — AI Talent Ecosystem

> **Connecting Learning, Skills, and Workforce**
> เชื่อมการเรียนรู้ พัฒนาทักษะ สู่ตลาดแรงงานแห่งอนาคต

โปรเจกต์สำหรับ **Jump HACK 2026 (AIS)**

> **หมายเหตุ:** repo นี้เป็น **demo prototype** — ข้อมูลทั้งหมดเป็น mock data ในโปรเจกต์ และผลลัพธ์ AI เป็น scripted response ไม่มี database, ไม่มี authentication และไม่ต่อ external API ใด ๆ ดูหัวข้อ [ขอบเขตของ prototype](#ขอบเขตของ-prototype)

---

## ภาพรวมโครงการ

ปัจจุบันประเทศไทยไม่ได้ขาดแหล่งเรียนรู้หรือโอกาสในการพัฒนาตนเองอีกต่อไป ผู้เรียนเข้าถึงองค์ความรู้ผ่าน YouTube, Facebook, Online Courses รวมถึงกิจกรรมต่าง ๆ เช่น Hackathon, Workshop, ค่าย, ทุนการศึกษา และการแข่งขันได้มากกว่าที่เคย

แต่ข้อมูลเหล่านั้น**กระจัดกระจายอยู่บนหลายแพลตฟอร์ม** ทำให้ผู้เรียนจำนวนมาก โดยเฉพาะผู้ที่อยู่ในพื้นที่ห่างไกล ขาดเครือข่าย หรือไม่มีผู้ให้คำแนะนำ ไม่สามารถค้นพบโอกาสที่เหมาะสมกับตนเองได้

**ปัญหาที่แท้จริงจึงไม่ใช่การ "ขาดข้อมูล" แต่คือการขาดระบบที่เชื่อมข้อมูล โอกาส และการพัฒนาทักษะเข้าหากัน**

ในขณะเดียวกัน ภาคอุตสาหกรรมกำลังเผชิญปัญหา **Skill Gap** — บริษัทจำนวนมากไม่สามารถหาบุคลากรที่มีทักษะตรงกับความต้องการได้ แม้จะมีบัณฑิตจบใหม่เข้าสู่ตลาดแรงงานทุกปี

NEXUS จึงถูกพัฒนาขึ้นในฐานะ **AI Talent Ecosystem** ที่เป็นศูนย์กลางเชื่อมโยงผู้เรียน แหล่งเรียนรู้ Mentor มหาวิทยาลัย ภาคอุตสาหกรรม และตลาดแรงงานเข้าไว้ในระบบเดียว

### สิ่งที่ทำให้ NEXUS ต่างจากแพลตฟอร์มทั่วไป

AI ของ NEXUS ไม่ได้เป็นเพียง Recommendation System แต่เป็น **AI Behavioral Growth Coach** ที่ผสานหลักจิตวิทยาการเปลี่ยนแปลงพฤติกรรม:

| ทฤษฎี | บทบาทในระบบ |
|---|---|
| **Transtheoretical Model** (Stages of Change) | ประเมินว่าผู้เรียนอยู่ช่วงใดของการพัฒนาตนเอง แล้วปรับวิธีแนะนำให้เหมาะกับช่วงนั้น |
| **Self-Determination Theory** | เลือกว่าจะกระตุ้นผ่าน autonomy, competence หรือ relatedness |
| **Growth Mindset** | กำหนดน้ำเสียงของ feedback ให้เน้นความก้าวหน้ามากกว่าผลลัพธ์ |

AI จึงไม่เพียงบอกว่า "ควรเรียนอะไร" แต่ช่วยผลักดันให้ผู้เรียนเกิดแรงจูงใจและลงมือทำอย่างต่อเนื่อง

โค้ดส่วนนี้อยู่ที่ [lib/ai/stages.ts](lib/ai/stages.ts) และ [lib/ai/coach.ts](lib/ai/coach.ts) — badge บนหน้า Dashboard แสดง stage ปัจจุบันให้เห็นชัดเจนว่าคำแนะนำมาจากโมเดลพฤติกรรมจริง

---

## 8 Modules

| # | Module | Route | หน้าที่ |
|---|---|---|---|
| 1 | Onboarding + AI Assessment | `/onboarding` | ประเมินความสนใจ → สร้าง Skill DNA → เลือกเป้าหมายอาชีพ |
| 2 | Home Dashboard | `/dashboard` | Career Readiness, Growth Coach, ภารกิจประจำวัน, Skill Overview |
| 3 | AI Skill Roadmap | `/roadmap` | เส้นทางพัฒนาทักษะ 7 Level ตามเป้าหมายอาชีพ |
| 4 | Learning Hub | `/learn` | รวมคอร์ส วิดีโอ บทความ Podcast จากหลายแหล่ง |
| 5 | Opportunity Hub | `/opportunities` | Hackathon, ทุน, Workshop, ค่าย, การแข่งขัน, Internship |
| 6 | Mentor Community | `/mentors` | ค้นหาและนัดหมาย Mentor ตามสายอาชีพและสกิล |
| 7 | Talent Passport | `/passport` | สะสมทักษะ ผลงาน ใบประกาศ กิจกรรม เป็น Portfolio |
| 8 | Career Matching | `/careers` | จับคู่ตำแหน่งงาน + วิเคราะห์ Skill Gap |

### User Flow

```
สมัครสมาชิก → AI Assessment → AI วิเคราะห์ → Skill DNA → Career Goal
    → AI Roadmap → Learning Hub → Opportunity Hub → Mentor
    → Activities → Talent Passport → Career Matching → Internship → Employment
```

---

## Target Market

**Primary — นักศึกษามหาวิทยาลัย (18–24 ปี)**
กำลังเตรียมตัวเข้าสู่ตลาดแรงงาน ต้องการ Portfolio, Internship, Upskill และ Mentor เป็นกลุ่มที่มี Pain Point ชัดที่สุดและเห็นผลลัพธ์ได้เร็ว

**Secondary — นักเรียนมัธยม (ม.4–ม.6)**
กำลังเลือกคณะและค้นหาตัวเอง เริ่มสร้าง Portfolio ตั้งแต่ก่อนเข้ามหาวิทยาลัย สร้างผู้ใช้ระยะยาว

**Long-term Expansion**
First Jobber, กลุ่ม Reskill และคนทำงานที่ต้องการ Upskill — ทำให้ NEXUS เป็น *Lifelong Talent Development Platform*

---

## Value Proposition

| สำหรับผู้เรียน | สำหรับมหาวิทยาลัย | สำหรับภาคอุตสาหกรรม |
|---|---|---|
| ค้นพบศักยภาพของตนเอง | เข้าใจ Skill Gap ของนักศึกษา | เข้าถึง Talent Pipeline |
| มี AI ช่วยวางแผนพัฒนาทักษะ | ใช้ข้อมูลช่วยแนะแนว | ลดต้นทุนการสรรหา |
| เข้าถึงแหล่งเรียนรู้ที่เหมาะสม | เชื่อมต่อกับภาคอุตสาหกรรม | เห็นผู้สมัครที่มี Skill พร้อมใช้งาน |
| เข้าถึง Mentor + สร้าง Portfolio | พัฒนาหลักสูตรให้ตอบโจทย์ตลาด | เปิด Internship และ Challenge ผ่านแพลตฟอร์ม |

---

## Business

### Business Opportunity

NEXUS ไม่ได้แข่งขันกับแพลตฟอร์มการเรียนออนไลน์ แต่ทำหน้าที่เป็น **AI Talent Infrastructure** ที่เชื่อม Learning Platform, Online Courses, Mentor, Hackathon, Scholarship, Competition และ Industry ให้อยู่ใน Ecosystem เดียว

ยิ่งมีผู้เรียนมาก → Mentor มากขึ้น → บริษัทมากขึ้น → โอกาสมากขึ้น เกิด **Network Effect** ที่ทำให้แพลตฟอร์มเติบโตต่อเนื่อง

### Revenue Model (Future)

**ระยะเริ่มต้น** — ผู้เรียนใช้งานฟรี เน้นสร้าง Impact และฐานผู้ใช้

**ระยะเติบโต** — Company Partnership, Sponsored Challenges, Internship Programs, University Dashboard, School Dashboard, AI Talent Analytics, Premium Career Coaching

โมเดลนี้ทำให้แพลตฟอร์มสร้างรายได้โดยไม่เป็นภาระกับผู้เรียน

### Social & Economic Impact

ลด **Opportunity Gap / Skill Gap / Information Gap / Career Gap** ทำให้ผู้เรียนทุกคนไม่ว่าจะอยู่ที่ใด เข้าถึงแหล่งเรียนรู้ การพัฒนาทักษะ Mentor โอกาส และตลาดแรงงานได้อย่างเท่าเทียม

ในระดับประเทศ: เพิ่มกำลังคนคุณภาพ ลดปัญหาแรงงานไม่ตรงสาย เพิ่มโอกาสการมีงานทำ สนับสนุนเศรษฐกิจดิจิทัล และยกระดับขีดความสามารถในการแข่งขันของไทย

### Why AIS?

AIS ไม่ได้เป็นเพียงผู้ให้บริการเครือข่าย แต่กำลังขับเคลื่อน **Digital Ecosystem** ของประเทศไทย ทั้งด้าน AI, Cloud, Digital Learning และการพัฒนาทักษะดิจิทัล NEXUS จึงต่อยอดร่วมกับ AIS ได้อย่างเป็นรูปธรรม โดยใช้ AI และโครงสร้างพื้นฐานของ AIS สร้าง **National Talent Ecosystem**

**หมัดเด็ดของการเล่าเรื่อง:** เปลี่ยนจาก *Education Platform* เป็น **Talent Infrastructure for Thailand** — คำว่า Infrastructure สื่อว่าระบบนี้ไม่ใช่แค่แอปสำหรับเด็กคนหนึ่ง แต่เป็นโครงสร้างพื้นฐานที่ทุกฝ่ายใช้ร่วมกันได้ ทั้งโรงเรียน มหาวิทยาลัย บริษัท และภาครัฐ

---

## Key Message สำหรับ Pitch

**เปิด:**
> "ประเทศไทยไม่ได้ขาดแหล่งเรียนรู้ แต่ขาดระบบที่เชื่อม 'การเรียนรู้' เข้ากับ 'ทักษะที่ตลาดแรงงานต้องการ' และช่วยให้ผู้เรียนเปลี่ยนโอกาสที่กระจัดกระจาย ให้กลายเป็นเส้นทางการเติบโตที่ชัดเจน"

**ปิด:**
> "NEXUS ไม่ใช่แพลตฟอร์มการเรียนออนไลน์ และไม่ใช่แพลตฟอร์มหางาน แต่คือ AI Talent Ecosystem ที่เชื่อมผู้เรียน แหล่งเรียนรู้ Mentor มหาวิทยาลัย และภาคอุตสาหกรรมเข้าด้วยกัน ผ่าน AI Behavioral Growth Coach เพื่อเปลี่ยนศักยภาพของผู้เรียนให้กลายเป็นกำลังคนที่มีทักษะตรงกับความต้องการของตลาดแรงงานในอนาคต"

---

## เริ่มต้นใช้งาน

**ต้องมี:** Node.js 20.9 ขึ้นไป (แนะนำ 22 LTS) — Next.js 16 ไม่รองรับ Node 18 แล้ว

```bash
npm install
npx next typegen   # จำเป็นหลัง clone — ดูหมายเหตุด้านล่าง
npm run dev
```

เปิด [http://localhost:3000](http://localhost:3000) จะ redirect เข้า `/onboarding` อัตโนมัติ

> **ทำไมต้อง `next typegen`:** Next.js 16 สร้าง type อย่าง `PageProps` และ `LayoutProps` เป็น global type ลงใน `.next/types/` ซึ่งไม่ได้ commit ลง git ถ้าเปิด editor ก่อนรัน `next dev` หรือ `next build` จะเจอ error `Cannot find name 'LayoutProps'` — รัน `npx next typegen` แล้วหาย

### คำสั่งอื่น ๆ

| คำสั่ง | ทำอะไร |
|---|---|
| `npm run dev` | dev server (Turbopack เป็น default ใน Next 16) |
| `npm run build` | production build |
| `npm start` | รัน production build |
| `npm run lint` | ESLint (Next 16 ถอด `next lint` ออกแล้ว ใช้ ESLint CLI ตรง ๆ) |
| `npx tsc --noEmit` | typecheck |

---

## Tech Stack

- **Next.js 16.3** (App Router, Turbopack) + **React 19.2**
- **TypeScript 5** (strict)
- **Tailwind CSS v4** — config อยู่ใน CSS ผ่าน `@theme` ไม่มี `tailwind.config.js`
- **next/font** — ฟอนต์ **Prompt** (subset `thai` + `latin`)
- ไม่มี dependency นอกเหนือจากนี้ — icon ทั้งหมดเป็น inline SVG

## โครงสร้างโปรเจกต์

โค้ดทั้งหมดอยู่ใน `src/` แยกจากไฟล์ config ที่ root และ**แบ่งตาม feature** ซึ่งเป็นหนึ่งในกลยุทธ์ที่ Next.js แนะนำ

```
src/
  app/                    routing เท่านั้น
    layout.tsx            root layout — ฟอนต์ Prompt + LocaleProvider
    page.tsx              redirect → /onboarding
    (onboarding)/         module 1 — ไม่มี nav shell
    (app)/                module 2–8 — bottom nav (mobile) / sidebar rail (desktop)
  components/
    ui/                   primitives ที่ไม่รู้จัก domain (Button, Card, Progress, Icon…)
    layout/               shell — BottomNav, SidebarRail, PageHeader, LocaleToggle
  features/               logic + component ของแต่ละโมดูล อยู่ด้วยกัน
    coach/                CoachCard + coach.ts + stages.ts (5 stages of change)
    assessment/           scoring.ts
    learning/ opportunities/ mentors/ careers/
  data/                   mock data + types (ใช้ร่วมกันหลาย feature)
  lib/                    cn.ts + i18n/
```

**ทำไมแบ่งแบบนี้:** โฟลเดอร์รวมอย่าง `components/domain/` จะบวมเมื่อมี 8 โมดูล การวางโค้ดของแต่ละ feature ไว้ด้วยกัน (การ์ด + logic) ทำให้แก้โมดูลหนึ่งโดยไม่ต้องเปิดหลายโฟลเดอร์ ส่วน `components/ui/` กับ `data/` เป็นของกลางที่ทุก feature ใช้ร่วมกัน

---

## ขอบเขตของ prototype

สิ่งที่**ยังไม่มี**ใน demo นี้ และควรพูดตรง ๆ ตอน pitch:

- **ไม่มี backend / database** — ข้อมูลทั้งหมดเป็น TypeScript object ใน [lib/data/](lib/data/)
- **ไม่มี authentication** — ปุ่ม "เข้าสู่ระบบ" พาไป `/dashboard` ตรง ๆ
- **AI เป็น scripted** — [lib/ai/coach.ts](lib/ai/coach.ts) เลือกข้อความจากตารางที่เขียนไว้ล่วงหน้าตาม stage ส่วน [lib/ai/assessment.ts](lib/ai/assessment.ts) ให้คะแนนจาก weight table ไม่ได้เรียกโมเดล ตรรกะการเลือกเป็นของจริง แต่เนื้อหาไม่ได้ generate
- **ภาพประกอบและรูปโปรไฟล์** — ใช้ gradient และ avatar ตัวอักษรย่อแทน เพราะไม่มีภาพที่มีสิทธิ์ใช้งาน
- **การค้นหาและ Mentor booking** — เป็น UI ที่ยังไม่ผูก logic
- **ภาษา** — เลือกไทย/อังกฤษได้ทุกหน้า แต่เก็บใน memory เท่านั้น (รีเฟรชแล้วกลับเป็นไทย) และยังไม่มี URL แยกภาษา
