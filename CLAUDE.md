@AGENTS.md

# NEXUS — ข้อตกลงการเขียนโค้ด

NEXUS คือ AI Talent Ecosystem สำหรับ Jump HACK 2026 (AIS) — ดู [README.md](README.md) สำหรับวิสัยทัศน์ ธุรกิจ และ 8 modules

## ขอบเขต: นี่คือ demo prototype

- **ข้อมูลทั้งหมดเป็น mock** อยู่ใน `lib/data/*` เป็น TypeScript object ธรรมดา
- **AI เป็น scripted** — `lib/ai/coach.ts` เลือกข้อความตาม stage, `lib/ai/assessment.ts` ให้คะแนนจาก weight table
- **ห้ามต่อ database, auth หรือ external API โดยไม่ถามก่อน** ถ้างานที่ได้รับดูเหมือนต้องใช้ของจริง ให้ถามก่อนติดตั้ง dependency หรือสร้าง schema

## Next.js 16 — จุดที่พลาดบ่อย

repo นี้ใช้ Next.js 16.3 ซึ่งต่างจาก Next.js รุ่นก่อนหลายจุด อ่าน `node_modules/next/dist/docs/` ก่อนเขียนโค้ดเสมอ (ดู [AGENTS.md](AGENTS.md))

- **`PageProps<'/route'>` / `LayoutProps<'/route'>` เป็น global type** generate จาก `next typegen` — **ห้าม import และห้ามประกาศ type เอง** ถ้าเจอ error `Cannot find name 'LayoutProps'` แปลว่ายังไม่ได้ generate ให้รัน `npx next typegen`
- **`params` และ `searchParams` เป็น Promise** ต้อง `await` เสมอ แบบ sync ถูกถอดออกแล้ว ดูตัวอย่างที่ [app/(app)/careers/[roleId]/page.tsx](<app/(app)/careers/[roleId]/page.tsx>)
- **Turbopack เป็น default** ทั้ง `next dev` และ `next build` ไม่ต้องใส่ `--turbopack`
- **ใช้ `proxy` ไม่ใช่ `middleware`** — convention เปลี่ยนชื่อแล้ว
- **`next lint` ถูกถอดออก** ใช้ `npm run lint` ซึ่งเรียก ESLint CLI ตรง ๆ
- **Tailwind v4** ไม่มี `tailwind.config.js` — token อยู่ใน `@theme` ที่ [app/globals.css](app/globals.css)

## Design tokens

**ใช้ token เท่านั้น ห้าม hardcode hex ในไฟล์ component** ทุกค่าอยู่ใน `@theme` ที่ [app/globals.css](app/globals.css) จุดเดียว

| token | ใช้ตอนไหน |
|---|---|
| `navy` / `navy-soft` | sidebar, หน้า onboarding, หัวข้อเข้ม |
| `primary` / `primary-dark` / `primary-soft` | ปุ่มหลัก, progress, สถานะสำเร็จ |
| `accent` / `accent-soft` | ไฮไลต์รอง, การ์ดข้อมูล |
| `lime` | ตัวคั่นระดับที่สาม |
| `surface` / `card` / `line` | พื้นหลัง, การ์ด, เส้นขอบ |
| `ink` / `ink-muted` / `ink-faint` | ลำดับความเข้มของตัวอักษร |
| `warn` / `danger` | skill gap, สถานะที่ต้องระวัง |

> ค่าสี `accent` ปัจจุบันตั้งจากการอ่าน mockup ถ้ามีไฟล์ Figma ให้แก้ที่ `--color-accent` จุดเดียวพอ

## ฟอนต์

**ใช้ Prompt เท่านั้น** — ตั้งไว้ที่ [app/layout.tsx](app/layout.tsx) พร้อม subset `thai`

ห้ามเปลี่ยนไปใช้ฟอนต์อื่น (Geist, Inter ฯลฯ) เพราะ**ไม่มี glyph ภาษาไทย** ตัวอักษรไทยจะตกไปใช้ fallback ของระบบและหน้าตาไม่ตรงดีไซน์

## i18n

**ข้อความที่ผู้ใช้เห็นต้องผ่านระบบแปลเสมอ ห้าม hardcode string ใน JSX**

- **UI string** → เพิ่ม key ใน `th` ที่ [lib/i18n/dictionary.ts](lib/i18n/dictionary.ts) แล้วเรียก `t("key")` — `th` เป็นตัวกำหนด key set ถ้าลืมใส่ใน `en` จะ error ตอน compile
- **เนื้อหาจาก data layer** → เก็บเป็น `Localized` (`{ th, en }`) แล้ว render ด้วย `l(value)`

ทั้ง `t` และ `l` มาจาก `useLocale()` ใน [lib/i18n/LocaleProvider.tsx](lib/i18n/LocaleProvider.tsx)

## โครงสร้างโค้ด

โค้ดทั้งหมดอยู่ใน `src/` และ alias `@/*` ชี้ไปที่ `./src/*` **ห้ามสร้างโฟลเดอร์ `app/`, `components/`, `lib/` ที่ root**

ลำดับชั้นห้ามข้าม:

- `src/app/` — routing เท่านั้น ไม่เก็บ component ที่ใช้ซ้ำ
- `src/components/ui/` — primitive ที่**ไม่รู้จัก domain** รับแต่ `string`, `number`, `boolean` ห้าม import จาก `@/data/` และห้ามเรียก `useLocale()`
- `src/components/layout/` — shell ของแอป (nav, header, toggle)
- `src/features/<feature>/` — component + logic ของโมดูลนั้น อยู่ด้วยกัน ประกอบจาก `ui/` แปลภาษาที่ชั้นนี้
- `src/data/` — mock data ที่ใช้ร่วมกันหลาย feature ถ้าข้อมูลใช้ที่เดียวให้เก็บไว้ใน feature นั้น

**เพิ่มโมดูลใหม่** ให้สร้าง `src/features/<ชื่อ>/` แล้ววาง component กับ logic ไว้ด้วยกัน อย่าเอาไปกองรวมใน `components/`

หน้าเพจส่วนใหญ่เป็น client component เพราะทุก string ต้องผ่าน `useLocale()` ซึ่งเป็น context — data เป็น static import อยู่แล้วจึงไม่เสียประโยชน์อะไร ถ้าหน้าไหนต้องใช้ `params` ให้ทำ server page บาง ๆ แล้วส่งต่อให้ client component (ดู `careers/[roleId]`)

> ระวัง: ถ้ารัน `next` ขณะ cwd อยู่ใน `src/` มันจะสร้าง `src/tsconfig.json` กับ `src/next-env.d.ts` ให้เอง ซึ่งผิด — ลบทิ้งแล้วรันจาก root

## กติกา UX

ยึดไว้ตลอดเวลาที่แตะหน้าจอ:

- **ไม่ใช้ emoji ใน UI** ใช้ icon จาก [src/components/ui/Icon.tsx](src/components/ui/Icon.tsx) แทน ถ้าไม่มีให้เพิ่ม path ใหม่ในไฟล์นั้น อย่าดึง icon library เข้ามา
- **ห้ามแสดงข้อมูลเดียวกันสองที่** ก่อนเพิ่ม section ใหม่ ให้เช็คว่ามีหน้าอื่นแสดงอยู่แล้วหรือยัง เช่น Career Readiness อยู่ที่ Dashboard ที่เดียว, รายการทักษะอยู่ที่ Talent Passport ที่เดียว
- **ตัวเลขเดียวกันต้องมาจากแหล่งเดียว** อย่าเก็บค่าซ้ำใน seed คนละไฟล์ ถ้าค่าหนึ่งคำนวณจากอีกค่าได้ ให้คำนวณ — `skills` ใน [src/data/profile.ts](src/data/profile.ts) เป็นแหล่งเดียวของระดับทักษะ ส่วน `roadmap` อ่านค่าจากมันผ่าน `skillId` และ `overallSkillGap` ใน [src/data/careers.ts](src/data/careers.ts) คำนวณจาก gap ของแต่ละตำแหน่ง
- **กราฟต้องผ่าน validator ก่อน** ใช้สีจาก token ที่ contrast ผ่าน 3:1 บนพื้นการ์ด (`primary-dark` ผ่าน / `primary` ไม่ผ่าน ต้องมี label กำกับ) และ**ต้องมีตัวเลขกำกับทุกแกน** ห้ามให้ค่าอ่านได้จากสีหรือ tooltip อย่างเดียว
- **ข้อความให้สั้น** กลุ่มเป้าหมายคือนักเรียน/นักศึกษาที่ใช้บนมือถือ หัวข้อสั้น ๆ กับ label พอ อย่าใส่ย่อหน้าอธิบายตัวผลิตภัณฑ์ลงในตัวผลิตภัณฑ์
- **back button เฉพาะหน้าที่ push เข้ามา** หน้าที่อยู่ใน bottom nav เป็น top-level ไม่ต้องมีปุ่มย้อนกลับ — `backHref` ของ `PageHeader` เป็น optional ด้วยเหตุนี้
- **bottom nav ไม่เกิน 5 รายการ** ปลายทางที่เหลือให้เข้าถึงจากบริบทที่เกี่ยวข้อง ไม่ใช่ทำแถบ nav ซ้อนอีกชั้น

## Tailwind — class ต้องเป็น literal

Tailwind v4 อ่าน class จาก source แบบ static **ห้ามสร้าง class ด้วยการต่อ string** เช่น `` `from-${color}` `` เพราะจะไม่ถูก generate ให้ใช้ lookup map ที่เขียนคลาสเต็มไว้แทน (ดูตัวอย่าง `covers` ใน [components/domain/CourseCard.tsx](components/domain/CourseCard.tsx))

## ตรวจงานก่อนถือว่าเสร็จ

```bash
npx tsc --noEmit    # ต้องไม่มี type error
npm run lint        # ต้องผ่าน
npm run build       # ต้อง build ผ่าน
```
