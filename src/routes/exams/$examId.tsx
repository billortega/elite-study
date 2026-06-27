import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight, BookOpen, Users, Phone, MessageCircle, ChevronLeft,
  Clock, CheckCircle, FileText, Lightbulb, Award, Shield,
} from "lucide-react";

export const Route = createFileRoute("/exams/$examId")({
  head: ({ params }) => {
    const exam = EXAM_DATA[params.examId as keyof typeof EXAM_DATA];
    return {
      meta: [
        { title: exam ? `${exam.code} Preparation | Super Digital Library Kanpur` : "Exam Details" },
        { name: "description", content: exam?.overview ?? "Exam preparation details at Super Digital Library Kanpur." },
      ],
    };
  },
  component: ExamDetailPage,
});

const PHONE = "8953999079";
const WA = (exam: string) =>
  `https://wa.me/91${PHONE}?text=${encodeURIComponent(
    `Hi Shubham! 🙏 I'm preparing for *${exam}* and want to join Super Digital Library. Please confirm my seat and share details.`,
  )}`;

const ease = [0.22, 1, 0.36, 1] as const;

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Hardcoded exam data ──────────────────────────────────────────────────────

const EXAM_DATA = {
  upsc: {
    code: "UPSC",
    full: "Civil Services Examination",
    tagline: "IAS · IPS · IFS · IRS and 20+ Allied Services",
    count: 2,
    color: "oklch(0.60 0.26 285)",
    overview: "The UPSC Civil Services Examination is India's most prestigious competitive exam, conducted annually to recruit officers for IAS, IPS, IFS and 20+ Group A & B Central Services. It is widely regarded as one of the toughest exams in the world.",
    conductedBy: "Union Public Service Commission",
    frequency: "Annual",
    totalMarks: "2025",
    prepTime: "1–3 years",
    eligibility: "Graduate in any discipline from a recognised university",
    age: "21–32 years (OBC +3 yrs, SC/ST +5 yrs, PH +10 yrs)",
    attempts: "6 (General) · 9 (OBC) · Unlimited (SC/ST)",
    stages: [
      {
        name: "Prelims",
        marks: "400 marks",
        type: "Objective MCQ",
        desc: "Two papers: GS Paper I (100 questions, 200 marks) and CSAT (80 questions, 200 marks — qualifying at 33%). Negative marking of 1/3 per wrong answer. Only GS I score counts for cut-off.",
      },
      {
        name: "Mains",
        marks: "1750 marks",
        type: "Descriptive Written",
        desc: "9 papers total. Essay (250), GS I–IV (250 each), Optional Paper I & II (250 each). 2 language papers (English + Indian Language) are qualifying only and not counted in merit.",
      },
      {
        name: "Interview",
        marks: "275 marks",
        type: "Personality Test",
        desc: "A structured board interview at UPSC headquarters, New Delhi. Tests personality, leadership potential, decision-making and suitability for civil services. Usually 20–45 minutes.",
      },
    ],
    syllabus: [
      { subject: "GS Paper I", topics: ["Indian Heritage & Culture", "History of Modern India", "World History (post-1945)", "Indian & World Geography", "Indian Society & Diversity"] },
      { subject: "GS Paper II", topics: ["Indian Constitution & Governance", "Social Justice & Rights", "International Relations", "Schemes, Policies & Government"] },
      { subject: "GS Paper III", topics: ["Indian Economy & Development", "Science & Technology", "Environment & Bio-diversity", "Disaster Management", "Internal Security"] },
      { subject: "GS Paper IV", topics: ["Ethics & Integrity", "Attitude & Aptitude", "Emotional Intelligence", "Public Service Values", "Case Studies in Ethics"] },
      { subject: "CSAT (Qualifying)", topics: ["Comprehension", "Interpersonal & Communication Skills", "Logical Reasoning", "Analytical Ability", "Basic Numeracy (Class 10)"] },
      { subject: "Optional Subject", topics: ["48 subjects available", "Literature, Science, Humanities, Engineering", "2 papers of 250 marks each", "Choose based on interest + scoring trend"] },
    ],
    posts: ["IAS — Indian Administrative Service", "IPS — Indian Police Service", "IFS — Indian Foreign Service", "IRS — Income Tax", "IRS — Customs & Central Excise", "IRTS, IDAS, IAAS, ICAS and 20+ more Central Services"],
    tips: [
      "Complete NCERT books (Class 6–12) for History, Geography, Polity, Economy and Science before any advanced books",
      "Follow The Hindu or Indian Express daily — make short notes on editorials, government schemes and international affairs",
      "Start answer writing for Mains from the very first month — quality of writing determines your rank more than knowledge",
      "Solve last 10 years of Prelims papers to identify high-weightage areas and understand question difficulty",
      "Pick Optional subject based on your genuine interest, available coaching material and recent scoring trends",
      "Form or join a small study group of 3–5 serious aspirants for peer learning and motivation",
    ],
  },

  ssc: {
    code: "SSC",
    full: "Staff Selection Commission",
    tagline: "CGL · CHSL · MTS · GD Constable · CPO",
    count: 1,
    color: "oklch(0.65 0.20 200)",
    overview: "SSC (Staff Selection Commission) recruits staff for various posts in Central Government departments, ministries and offices. It conducts CGL, CHSL, MTS, GD Constable, CPO, Stenographer and JE exams covering lakhs of vacancies annually.",
    conductedBy: "Staff Selection Commission",
    frequency: "Multiple exams per year",
    totalMarks: "Varies by exam",
    prepTime: "6–12 months",
    eligibility: "10th / 12th / Graduate depending on the exam",
    age: "18–32 years (relaxation for OBC/SC/ST/Ex-servicemen)",
    attempts: "No limit till age cut-off",
    stages: [
      {
        name: "Tier I (CBT)",
        marks: "200 marks",
        type: "Objective Online",
        desc: "60 minutes, 100 questions. Sections: General Intelligence & Reasoning (25), General Awareness (25), Quantitative Aptitude (25), English Comprehension (25). Negative marking of 0.50.",
      },
      {
        name: "Tier II (CBT)",
        marks: "300–800 marks",
        type: "Objective Online",
        desc: "For CGL: Module I (Mathematical Abilities + Reasoning, 150 min) and Module II (English Language + General Awareness + Computer Knowledge, 60 min). CHSL Tier II is descriptive.",
      },
      {
        name: "Tier III / Skill Test",
        marks: "Qualifying",
        type: "Descriptive / Skill",
        desc: "For CGL: Descriptive paper (Essay + Letter, 250 marks). For DEO posts: Typing/Data Entry Skill Test. Document Verification follows selection.",
      },
    ],
    syllabus: [
      { subject: "Quantitative Aptitude", topics: ["Number System, LCM & HCF", "Percentage, Ratio & Proportion", "Time & Work, Time & Distance", "Algebra & Geometry", "Data Interpretation", "Trigonometry & Heights"] },
      { subject: "English Language", topics: ["Reading Comprehension", "Cloze Test & Fill in the Blanks", "Error Spotting & Sentence Correction", "Synonyms, Antonyms & Idioms", "One-word Substitution"] },
      { subject: "General Intelligence", topics: ["Analogy, Classification & Series", "Coding-Decoding", "Blood Relations", "Direction Sense", "Venn Diagrams", "Non-verbal Reasoning"] },
      { subject: "General Awareness", topics: ["Current Affairs (last 6 months)", "History, Geography, Polity", "Economy & Science", "Static GK — Awards, Books, Sports"] },
    ],
    posts: ["Inspector of Income Tax / Central Excise", "Assistant Audit / Accounts Officer", "Senior / Junior Secretariat Assistant", "Sub-Inspector in CAPFs (CPO)", "GD Constable in CRPF, BSF, CISF, SSB, ITBP", "Multi-Tasking Staff (MTS) — Group C"],
    tips: [
      "Speed with accuracy is the key — SSC Tier I gives just 60 seconds per question on average",
      "Master shortcut techniques for Arithmetic (percentage, time-work, ratio) to save precious time",
      "Build English vocabulary daily with 10–15 new words — English section heavily tests vocabulary",
      "Static GK is scoring — prepare a consolidated list of important facts, awards, headquarters",
      "Attempt Tier I mock tests daily once basics are complete; analyze errors after every test",
      "For CGL aspirants, start Descriptive writing practice (essays + letters) alongside Tier I prep",
    ],
  },

  rrb: {
    code: "RRB",
    full: "Railway Recruitment Board",
    tagline: "NTPC · Group D · ALP · Junior Engineer",
    count: 3,
    color: "oklch(0.68 0.18 162)",
    overview: "Indian Railways is one of the world's largest employers. RRBs (Railway Recruitment Boards) conduct exams for NTPC (Non-Technical Popular Categories), Group D, ALP (Assistant Loco Pilot), JE (Junior Engineer) and other posts under Ministry of Railways.",
    conductedBy: "Railway Recruitment Boards (21 Boards)",
    frequency: "Irregular, based on vacancy cycles",
    totalMarks: "Varies by post",
    prepTime: "6–12 months",
    eligibility: "10th / ITI / Diploma / Graduate depending on post",
    age: "18–33 years (relaxation for OBC/SC/ST)",
    attempts: "No limit till age cut-off",
    stages: [
      {
        name: "CBT 1 (Phase I)",
        marks: "100 marks",
        type: "Computer-Based Test",
        desc: "90 minutes, 100 questions. Mathematics (30), General Intelligence & Reasoning (30), General Awareness (40). Negative marking of 1/3 per wrong answer. Qualifying / screening stage.",
      },
      {
        name: "CBT 2 (Phase II)",
        marks: "120–150 marks",
        type: "Computer-Based Test",
        desc: "For NTPC: 90 minutes, General Awareness (50), Mathematics (35), Reasoning (35). For ALP/JE: Technical syllabus included. CBT 2 marks count towards final merit.",
      },
      {
        name: "Physical / Skill Test",
        marks: "Qualifying",
        type: "Physical / Typing / Aptitude",
        desc: "For Group D: Physical Efficiency Test (PET). For ALP: Aptitude Test (AT) on computer. For NTPC (some posts): Typing Skill Test. Document Verification is the final step.",
      },
    ],
    syllabus: [
      { subject: "Mathematics", topics: ["Number System & BODMAS", "Fractions, LCM & HCF", "Percentage & Ratio", "Time-Work, Time-Distance", "Simple & Compound Interest", "Profit-Loss, Mensuration"] },
      { subject: "General Intelligence", topics: ["Analogies & Classification", "Number & Alphabetical Series", "Coding-Decoding", "Puzzles & Direction", "Syllogism", "Venn Diagrams"] },
      { subject: "General Awareness", topics: ["Current Affairs & News", "Indian History & Culture", "Indian Geography", "Indian Polity & Economy", "Science & Technology", "Indian Railways GK"] },
      { subject: "Technical (ALP/JE)", topics: ["Relevant trade/branch subjects", "Electrical / Mechanical / Civil", "Computer Science & IT", "Electronics & Communication"] },
    ],
    posts: ["Station Master / Assistant Station Master", "Traffic Assistant & Commercial Apprentice", "Goods Guard & Senior Commercial Clerk", "ALP (Assistant Loco Pilot)", "JE — Civil, Mechanical, Electrical, IT", "Track Maintainer / Helper (Group D)"],
    tips: [
      "Railway GK is a unique advantage — memorise zones, headquarters, major projects and rail achievements",
      "CBT 1 is just a screening filter; focus heavily on CBT 2 which determines your actual rank",
      "Mathematics shortcuts (especially ratio, percentage, time-work) can save 20–30 seconds per question",
      "For ALP/JE, give 50% time to trade-specific technical subjects which have highest weightage",
      "Solve RRB previous year papers (2019, 2022 cycles) — many questions repeat with slight variation",
      "Physical fitness matters for Group D PET: practice 1000m run, weight lifting as per prescribed standards",
    ],
  },

  neet: {
    code: "NEET",
    full: "National Eligibility Entrance Test",
    tagline: "MBBS · BDS · BAMS · BHMS · BVSc & AH",
    count: 3,
    color: "oklch(0.62 0.22 27)",
    overview: "NEET-UG is the single national entrance exam for admission to MBBS, BDS and AYUSH (BAMS, BHMS, BUMS) courses across all medical colleges in India including AIIMS and JIPMER. Conducted by NTA, it is one of India's most competitive exams with 20+ lakh applicants yearly.",
    conductedBy: "National Testing Agency (NTA)",
    frequency: "Annual (usually May)",
    totalMarks: "720",
    prepTime: "1–2 years",
    eligibility: "10+2 with PCB (Physics, Chemistry, Biology) — minimum 50% (40% for SC/ST/OBC)",
    age: "17 years minimum at time of admission",
    attempts: "No limit (as per Supreme Court order)",
    stages: [
      {
        name: "NEET-UG",
        marks: "720 marks",
        type: "Pen & Paper (OMR)",
        desc: "200 questions (attempt 180). Physics: 50 Qs, Chemistry: 50 Qs, Biology: 100 Qs (50 Botany + 50 Zoology). +4 for correct, -1 for wrong. Duration: 3 hours 20 minutes.",
      },
    ],
    syllabus: [
      { subject: "Physics (Class 11)", topics: ["Physical World & Measurement", "Kinematics", "Laws of Motion", "Work, Energy & Power", "Rotational Motion", "Gravitation", "Thermodynamics", "Waves"] },
      { subject: "Physics (Class 12)", topics: ["Electrostatics", "Current Electricity", "Magnetic Effects", "Electromagnetic Induction", "Optics", "Dual Nature of Matter", "Atoms & Nuclei"] },
      { subject: "Chemistry (Class 11 & 12)", topics: ["Basic Concepts", "Chemical Bonding", "States of Matter", "Equilibrium", "Organic Chemistry", "Coordination Compounds", "Biomolecules"] },
      { subject: "Biology — Botany", topics: ["Cell Structure & Function", "Plant Physiology", "Reproduction in Plants", "Genetics & Evolution", "Plant Kingdom Classification"] },
      { subject: "Biology — Zoology", topics: ["Animal Kingdom Classification", "Human Physiology", "Human Reproduction", "Biotechnology", "Ecology & Environment", "Biodiversity"] },
    ],
    posts: ["MBBS — Government & Private Medical Colleges", "BDS — Dental Colleges", "BAMS — Ayurveda (Ayush)", "BHMS — Homeopathy (Ayush)", "BUMS — Unani (Ayush)", "BVSc & AH — Veterinary Science"],
    tips: [
      "NCERT Biology is the bible for NEET — read it at least 3 times and master every diagram and table",
      "Biology carries 360/720 marks — always prioritise it for maximum score gain in minimum time",
      "For Physics, concept clarity is non-negotiable — solve DPPs (Daily Practice Problems) from Class 11 & 12",
      "Chemistry can be divided: Physical (numerical), Organic (reactions) and Inorganic (factual — NCERT only)",
      "Attempt full 3-hour 20-minute mock tests under real exam conditions every week",
      "Analyse NEET Previous Year Papers (2017–2024) — many questions are directly repeated or slightly modified",
    ],
  },

  jee: {
    code: "JEE",
    full: "Joint Entrance Examination",
    tagline: "IIT · NIT · IIIT · GFTI Engineering Admissions",
    count: 1,
    color: "oklch(0.70 0.20 50)",
    overview: "JEE (Joint Entrance Examination) is India's premier engineering entrance in two stages — JEE Main (for NITs, IIITs, GFTIs) and JEE Advanced (for IITs). Only the top ~2.5 lakh students from JEE Main qualify for JEE Advanced each year.",
    conductedBy: "NTA (JEE Main) · IIT (JEE Advanced, rotational)",
    frequency: "JEE Main: 2 sessions/year · JEE Advanced: Annual",
    totalMarks: "300 (Main) · 360 (Advanced, approx)",
    prepTime: "1–2 years",
    eligibility: "10+2 with PCM — minimum 75% (65% for SC/ST); born after Oct 1, 1999 (for 2025)",
    age: "No age limit for JEE Main (NTA rule effective 2021)",
    attempts: "3 consecutive years for JEE Main; 2 for JEE Advanced",
    stages: [
      {
        name: "JEE Main",
        marks: "300 marks",
        type: "Computer-Based Test",
        desc: "90 questions (75 attempted). Physics (25), Chemistry (25), Mathematics (25). MCQs (+4/-1) and Numerical Answer Type (+4/0). Duration: 3 hours. Best of 2 session scores considered.",
      },
      {
        name: "JEE Advanced",
        marks: "~360 marks",
        type: "Computer-Based Test",
        desc: "2 papers of 3 hours each. Complex question types: MCQ (single/multiple correct), Integer, Matching. No fixed marking — changes yearly. Requires top ~2.5L rank in JEE Main to qualify.",
      },
    ],
    syllabus: [
      { subject: "Physics (Class 11)", topics: ["Kinematics & Laws of Motion", "Work-Energy-Power", "Gravitation & Fluid Mechanics", "Thermodynamics", "SHM & Waves", "Rotational Mechanics"] },
      { subject: "Physics (Class 12)", topics: ["Electrostatics & Capacitors", "Current Electricity", "Magnetism & EMI", "Optics (Ray & Wave)", "Modern Physics — Photoelectric, Atoms, Nuclei"] },
      { subject: "Chemistry", topics: ["Physical Chemistry — Equilibrium, Kinetics, Electrochemistry", "Organic Chemistry — Mechanisms, Named Reactions", "Inorganic Chemistry — P-block, D-block, Coordination"] },
      { subject: "Mathematics", topics: ["Calculus — Limits, Differentiation, Integration", "Algebra — Matrices, Determinants, Complex Numbers", "Coordinate Geometry", "Probability & Statistics", "Vectors & 3D"] },
    ],
    posts: ["IIT — 23 IITs with ~16,000 seats", "NIT — 31 NITs with ~23,000 seats", "IIIT — 25 IIITs with ~5,500 seats", "GFTI — 30+ Government Funded Technical Institutes", "B.Tech / B.E / B.Arch / B.Planning courses"],
    tips: [
      "Build concept clarity from Class 11 — JEE is heavily concept-based, not formula-memorisation",
      "Solve NCERT first for Chemistry, then move to advanced books (J.D. Lee, Solomon, P. Bahadur)",
      "Solve Daily Practice Problems (DPPs) topic-wise before attempting full-length mock tests",
      "For JEE Advanced, analyse IIT papers from 2013–2024 — understanding the question style is crucial",
      "Mathematics is the differentiator for top ranks — invest daily time in calculus and algebra",
      "Maintain a dedicated error notebook — revisit your mistakes every weekend without fail",
    ],
  },

  nda: {
    code: "NDA",
    full: "National Defence Academy",
    tagline: "Army · Navy · Air Force Officer Commission",
    count: 1,
    color: "oklch(0.60 0.26 285)",
    overview: "NDA (National Defence Academy) exam is conducted by UPSC twice a year to select candidates for the Indian Army, Navy and Air Force. Successful candidates train at NDA, Khadakwasla, Pune — one of India's most prestigious military academies.",
    conductedBy: "Union Public Service Commission (UPSC)",
    frequency: "Twice a year (April & September)",
    totalMarks: "900 (Written) + 900 (SSB) = 1800",
    prepTime: "6–12 months",
    eligibility: "10+2 for Army; PCM in 10+2 for Navy & Air Force",
    age: "16.5 to 19.5 years (born between specific dates as per notification)",
    attempts: "No specific limit during age eligibility window",
    stages: [
      {
        name: "Written Exam",
        marks: "900 marks",
        type: "Pen & Paper OMR",
        desc: "Mathematics (300 marks, 2.5 hrs) and General Ability Test — GAT (600 marks, 2.5 hrs). Negative marking of 0.83 (Math) and 1.33 (GAT) per wrong answer.",
      },
      {
        name: "SSB Interview",
        marks: "900 marks",
        type: "5-Day Selection Board",
        desc: "5-day process at Services Selection Board. Day 1: Screening (OIR + PPDT). Days 2–4: Psychology tests, GTO tasks, Group Discussions. Day 5: Conference. Tests officer-like qualities.",
      },
      {
        name: "Medical Examination",
        marks: "Qualifying",
        type: "Medical Board",
        desc: "Comprehensive medical examination at designated Military Hospitals. Specific standards for vision, height, weight and overall fitness for each service branch.",
      },
    ],
    syllabus: [
      { subject: "Mathematics", topics: ["Algebra — Sets, Matrices, Determinants", "Trigonometry", "Analytical Geometry (2D & 3D)", "Differential & Integral Calculus", "Statistics & Probability", "Vector Algebra"] },
      { subject: "GAT — English", topics: ["Grammar & Usage", "Vocabulary & Comprehension", "Spotting Errors", "Para Jumbles", "Précis Writing concepts"] },
      { subject: "GAT — General Knowledge", topics: ["Physics — Laws and applications", "Chemistry — Everyday chemistry", "Biology — Human body basics", "History — Modern India focus", "Geography — Physical & Indian", "Current Events & Defence"] },
    ],
    posts: ["Army — commissioned as Lieutenant", "Navy — Sub-Lieutenant", "Air Force — Flying Officer", "Naval Academy — B.Tech degree + Commission", "All three services: 4-year training at NDA followed by 1-year at IMA/INA/AFA"],
    tips: [
      "Mathematics carries 300 marks — prepare it like a board exam; do not take it lightly",
      "GAT General Knowledge section covers Physics and Chemistry at 10+2 level — NCERT is sufficient",
      "For SSB, work on communication skills, leadership instincts and self-awareness well in advance",
      "Start physical fitness training 3–4 months before SSB: running, swimming, obstacle courses",
      "Read newspapers regularly — Current Affairs and Defence news appear every year in GAT",
      "Join NDA mock SSBs (offered by coaching institutes) to experience the 5-day process before the real one",
    ],
  },

  nimcet: {
    code: "NIMCET",
    full: "NIT MCA Common Entrance Test",
    tagline: "MCA Admission at 30+ NITs Across India",
    count: 1,
    color: "oklch(0.65 0.20 200)",
    overview: "NIMCET is a national-level entrance test conducted by NITs on a rotational basis for admission to MCA (Master of Computer Applications) programmes. Around 30 NITs participate, offering ~6,000 MCA seats. It is the most important MCA entrance in India.",
    conductedBy: "Participating NITs (rotational host — 2024: NIT Raipur)",
    frequency: "Annual (usually June)",
    totalMarks: "480",
    prepTime: "6–12 months",
    eligibility: "BCA / B.Sc (CS/IT/Math) or B.Tech with Mathematics in 10+2 — minimum 60% aggregate",
    age: "No age limit",
    attempts: "Unlimited during eligibility",
    stages: [
      {
        name: "NIMCET",
        marks: "480 marks",
        type: "Computer-Based Test (CBT)",
        desc: "120 questions, 2 hours. Mathematics (50 Qs, 200 marks), Analytical Ability & Logical Reasoning (40 Qs, 160 marks), Computer Awareness (20 Qs, 80 marks), English (10 Qs, 40 marks). +4/-1 marking.",
      },
    ],
    syllabus: [
      { subject: "Mathematics (50 Qs)", topics: ["Set Theory & Functions", "Matrices & Determinants", "Probability & Statistics", "Calculus — Differentiation & Integration", "Algebra & Number Theory", "Coordinate Geometry"] },
      { subject: "Analytical & Logical Reasoning (40 Qs)", topics: ["Logical Sequences & Series", "Blood Relations & Direction", "Coding-Decoding", "Data Interpretation", "Venn Diagrams", "Syllogism & Arguments"] },
      { subject: "Computer Awareness (20 Qs)", topics: ["Fundamentals of Computer & OS", "Data Structures — Arrays, Stacks, Queues, Trees", "Programming Concepts — C, C++", "Database Management (DBMS)", "Computer Networks basics"] },
      { subject: "English (10 Qs)", topics: ["Reading Comprehension", "Vocabulary — Synonyms & Antonyms", "Grammar & Usage", "Sentence Correction"] },
    ],
    posts: ["MCA at NIT Trichy, NIT Warangal, NIT Surathkal", "MCA at NIT Raipur, NIT Jamshedpur, NIT Allahabad", "MCA at NIT Patna, NIT Agartala and 22+ more NITs", "Eligibility for software roles at IT companies, Product companies, PSUs"],
    tips: [
      "Mathematics has the highest weightage (200/480 marks) — it is your most important scoring area",
      "Logical Reasoning (160 marks) is very doable with practice — solve 30–40 questions daily",
      "Computer Awareness is where CS/IT background students gain an edge — master Data Structures",
      "English is only 40 marks but can make a difference at the cut-off — do not ignore it",
      "Solve NIMCET papers from 2018–2024 — the difficulty level and pattern are very consistent",
      "NIT-wise cut-offs vary hugely — aim for top 200 rank for NIT Trichy/Warangal; top 1000 for others",
    ],
  },

  upsi: {
    code: "UPSI",
    full: "UP Police Sub-Inspector",
    tagline: "Sub-Inspector Recruitment in Uttar Pradesh Police",
    count: 3,
    color: "oklch(0.58 0.22 240)",
    overview: "The UPPBPB (UP Police Recruitment and Promotion Board) recruits Sub-Inspectors (Civil Police) and Platoon Commander (PAC) through a rigorous written, physical and interview process. It is one of the most sought-after state government positions in Uttar Pradesh.",
    conductedBy: "UP Police Recruitment & Promotion Board (UPPBPB)",
    frequency: "Irregular, based on vacancies",
    totalMarks: "400 (Written) + Physical + Interview",
    prepTime: "6–12 months",
    eligibility: "Graduate in any stream from a recognised university",
    age: "21–28 years (OBC +3 yrs, SC/ST +5 yrs, UP domicile benefit)",
    attempts: "No limit within age eligibility",
    stages: [
      {
        name: "Written Examination",
        marks: "400 marks",
        type: "Objective MCQ",
        desc: "2 papers of 2 hours each. Paper I: General Hindi (100) + Law & Constitution (100). Paper II: General Knowledge & Current Affairs (40) + Numerical & Mental Ability (40) + Mental Aptitude / IQ (40) + Basic GK (40) + Reasoning (40) + Miscellaneous (40). Negative marking of 0.25.",
      },
      {
        name: "Physical Standard Test (PST)",
        marks: "Qualifying",
        type: "Physical Measurement",
        desc: "Height: Male general/OBC 168cm, SC/ST 160cm. Female: 152cm all categories. Chest (male only): 79cm–84cm (general/OBC), 77cm–82cm (SC/ST). Weight for females: proportionate to height.",
      },
      {
        name: "Physical Efficiency Test (PET)",
        marks: "Qualifying",
        type: "Running & Exercise",
        desc: "Male: 4.8 km run in 28 minutes. Female: 2.4 km run in 16 minutes. Other events as per UPPBPB notification. Physical fitness is mandatory — failure = elimination.",
      },
    ],
    syllabus: [
      { subject: "General Hindi", topics: ["Grammar — Sandhi, Samas, Karak", "Vocabulary — Paryayvachi, Vilom", "Idioms & Proverbs (Muhavare)", "Hindi Literature basics", "Error detection in Hindi sentences", "Letter & Essay writing concepts"] },
      { subject: "Law & Constitution", topics: ["Indian Constitution — Fundamental Rights & Duties", "Indian Penal Code (IPC) — Key Sections", "Code of Criminal Procedure (CrPC) basics", "Evidence Act fundamentals", "UP Police Act & Rules", "Human Rights & POCSO Act"] },
      { subject: "General Knowledge", topics: ["Current Affairs (last 6 months)", "UP-specific GK — History, Culture, Geography", "Indian History & Freedom Struggle", "Indian Geography & Economy", "Sports — National & International"] },
      { subject: "Aptitude & Reasoning", topics: ["Numerical Ability — Arithmetic", "Mental Ability — Series, Analogy", "IQ based questions", "Logical & Analytical Reasoning", "Data Interpretation"] },
    ],
    posts: ["Sub-Inspector (Civil Police) — law enforcement", "Platoon Commander (PAC) — Provincial Armed Constabulary", "Promotable to Inspector, DSP over service career", "Pay Level 6: ₹35,400–₹1,12,400 + allowances"],
    tips: [
      "Hindi grammar is the most important section — master Sandhi, Samas, Karak and Muhavare thoroughly",
      "IPC sections (302, 376, 420, 498A etc.) and CrPC basics are frequently asked in the Law section",
      "UP-specific GK (districts, rivers, monuments, culture) gives an edge over candidates from other states",
      "Start physical preparation (running, stamina) at least 3 months before the PET — many clear written but fail PET",
      "Practice 40–50 mock questions daily from previous year UPSI papers — pattern repeats a lot",
      "For the interview, know basic law, current affairs of UP, and present yourself confidently and smartly",
    ],
  },

  afcat: {
    code: "AFCAT",
    full: "Air Force Common Admission Test",
    tagline: "Flying · Technical · Ground Duty Branch — IAF",
    count: 1,
    color: "oklch(0.55 0.24 260)",
    overview: "AFCAT (Air Force Common Admission Test) is conducted by the Indian Air Force twice a year to select officers for Flying Branch, Technical Branch and Ground Duty Branches (Administration, Logistics, Accounts, Education, Meteorology, ATC). It leads to one of India's most prestigious careers.",
    conductedBy: "Indian Air Force (IAF)",
    frequency: "Twice a year (Feb & Aug intake)",
    totalMarks: "300 (AFCAT) + EKT (Technical)",
    prepTime: "6–12 months",
    eligibility: "Graduate (any branch) for Ground Duty; Engg. for Technical; PCM 60% in 10+2 for Flying",
    age: "20–26 years for most branches (26 for Flying, 30 for NCC Special Entry, varies by category)",
    attempts: "Limited by age eligibility window",
    stages: [
      {
        name: "AFCAT Online Test",
        marks: "300 marks",
        type: "Computer-Based Test",
        desc: "100 questions, 2 hours. Verbal Ability (18 Qs), Numerical Ability (18 Qs), Reasoning & Military Aptitude (24 Qs), General Awareness (25 Qs), Spatial Ability (15 Qs). +3/-1 marking.",
      },
      {
        name: "EKT (Engineering Knowledge Test)",
        marks: "150 marks",
        type: "Technical Paper",
        desc: "Only for Technical Branch aspirants. 50 questions, 45 minutes. Based on your engineering branch: Computer Science, Mechanical, Electrical & Electronics, or Aeronautical Engineering subjects.",
      },
      {
        name: "AFSB Interview",
        marks: "Qualifying",
        type: "5-Day Air Force Selection Board",
        desc: "At Dehradun, Mysore or Gandhinagar AFSB. Phase I: Cognitive Tests, PPDT. Phase II: Psychology tests, GTO series, Group discussions, Personal Interview. Medical follows final selection.",
      },
    ],
    syllabus: [
      { subject: "Verbal Ability", topics: ["Comprehension Passages", "Error Detection", "Sentence Completion & Correction", "Synonyms & Antonyms", "Idioms & Phrases"] },
      { subject: "Numerical Ability", topics: ["Decimal & Fractions", "Percentage, Ratio & Proportion", "Average, Time & Work", "Simple & Compound Interest", "Profit-Loss, Permutation-Combination"] },
      { subject: "Reasoning & Military Aptitude", topics: ["Verbal Intelligence — Series, Analogy, Classification", "Spatial Ability — Pattern Identification, Mental Rotation", "Military Aptitude — Practical Army/AF situations"] },
      { subject: "General Awareness", topics: ["History, Geography, Polity & Economy", "Science & Technology", "Defence, Military & IAF-specific GK", "Current Affairs (last 6 months)", "Sports & Awards"] },
    ],
    posts: ["Flying Branch — Fighter, Transport, Helicopter Pilot", "Technical Branch — Aeronautical Engg. (Electronics / Mechanical)", "Ground Duty — Administration & Logistics", "Ground Duty — Accounts, Education, Meteorology", "Air Traffic Control (ATC) Officer"],
    tips: [
      "General Awareness (defence GK + current affairs) is highly scoring and can separate you from others — invest dedicated time daily",
      "Verbal Ability in AFCAT is at a high level — focus on Reading Comprehension and build a strong vocabulary",
      "Spatial Ability is unique to AFCAT — practice paper-folding, mirror images and mental rotation daily",
      "For Flying Branch: eyesight standards are strict; verify your eligibility before starting preparation",
      "AFSB is the final test of your officer-like qualities — read 'SSB Cracker' and practice group tasks with friends",
      "Clear EKT (if applying for Technical) by studying your engineering core subjects — last 2 years of B.Tech are crucial",
    ],
  },

  judiciary: {
    code: "JUDICIARY",
    full: "UP Judicial Services Examination",
    tagline: "Civil Judge (Junior Division) — Uttar Pradesh",
    count: 1,
    color: "oklch(0.62 0.20 300)",
    overview: "The UP PCS (J) — Uttar Pradesh Judicial Services Examination — is conducted by the UP Public Service Commission (UPPSC) to recruit Civil Judges (Junior Division) at district courts across Uttar Pradesh. It is one of the most respected state judicial service exams.",
    conductedBy: "UP Public Service Commission (UPPSC)",
    frequency: "Irregular, based on vacancies",
    totalMarks: "Prelims (150) + Mains (~1500) + Interview",
    prepTime: "1–2 years",
    eligibility: "LLB / LLM degree from a recognised university + Bar Council enrollment in UP",
    age: "22–35 years (relaxation for OBC/SC/ST as per UP govt. norms)",
    attempts: "No specific limit within age eligibility",
    stages: [
      {
        name: "Prelims",
        marks: "150 marks",
        type: "Objective MCQ",
        desc: "150 questions, 2 hours. General Knowledge (50 marks) + Law (100 marks). Qualifying stage to shortlist candidates for Mains. Negative marking: 1/4 per wrong answer.",
      },
      {
        name: "Mains (Written)",
        marks: "~1500 marks",
        type: "Descriptive Written Exam",
        desc: "7 papers: General Hindi (150), Law I–VI (each 200 marks). Law papers cover — Substantive Law (IPC, Contract, Property, Evidence) and Procedural Law (CPC, CrPC). Answers primarily in Hindi.",
      },
      {
        name: "Interview (Viva Voce)",
        marks: "100 marks",
        type: "Personality Test",
        desc: "Interview by the High Court Selection Committee. Tests knowledge of law, reasoning, personality and suitability for judicial office. Knowledge of Hindi and local UP administration is expected.",
      },
    ],
    syllabus: [
      { subject: "General Hindi", topics: ["Essay Writing (Nibandh)", "Précis Writing (Saar Lekhan)", "Grammar — Sandhi, Samas, Karak", "Letter Writing (Official & Unofficial)", "Vocabulary & Translation"] },
      { subject: "Substantive Law", topics: ["Indian Contract Act, 1872", "Transfer of Property Act, 1882", "Indian Succession Act", "Hindu Law & Mohammedan Law", "Indian Evidence Act, 1872", "Indian Penal Code, 1860"] },
      { subject: "Procedural Law", topics: ["Code of Civil Procedure (CPC), 1908", "Code of Criminal Procedure (CrPC), 1973", "Limitation Act, 1963", "Court Fees Act", "Registration Act"] },
      { subject: "Constitutional Law", topics: ["Fundamental Rights & DPSP", "Constitutional Remedies", "Distribution of Powers (Union vs State)", "Judiciary — Supreme Court & High Court", "Emergency Provisions"] },
    ],
    posts: ["Civil Judge (Junior Division) — lowest rung of UP Judicial Service", "Promotable to Senior Civil Judge, ADJ, DJ over career", "Pay Level 11: ₹67,700–₹2,08,700 per month", "Eligible for High Court appointment after distinguished service"],
    tips: [
      "Read bare acts (IPC, CrPC, CPC, Evidence Act, Contract Act) daily — judiciary is about statutory language, not summaries",
      "Write answers in Hindi for Mains — Hindi legal writing is a distinct skill that needs months of dedicated practice",
      "Case laws are important for specific topics — know landmark Supreme Court judgments by name and brief facts",
      "Make section-wise notes for each Act; during exam you must cite correct sections with accuracy",
      "Prelims GK should include UP-specific polity, economy and legal current affairs alongside national topics",
      "Join a study group of law students — moot court-style discussions sharpen legal reasoning significantly",
    ],
  },

  any: {
    code: "ANY EXAM",
    full: "Any Competitive Examination",
    tagline: "Every Goal Matters — All Exams Welcome",
    count: 5,
    color: "oklch(0.60 0.26 285)",
    overview: "Not every aspirant fits into a predefined exam category — and that is perfectly fine. Super Digital Library Kanpur welcomes students preparing for any competitive examination. Whether it is a state PCS, banking (IBPS PO/Clerk), insurance, defense, teaching or any other exam, your dedicated seat awaits.",
    conductedBy: "Various bodies (IBPS, State PSCs, NTA, MHA, etc.)",
    frequency: "Year-round opportunities across various exams",
    totalMarks: "Varies",
    prepTime: "Your pace, your plan",
    eligibility: "As per your chosen exam",
    age: "As per your chosen exam",
    attempts: "As per your chosen exam",
    stages: [
      {
        name: "Self-Defined Preparation",
        marks: "Your exam pattern",
        type: "Structured Self-Study",
        desc: "Bring your own syllabus and study plan. The library provides the ideal environment — high-speed WiFi, digital resources, a focused peer community and mentor availability.",
      },
      {
        name: "Mock Test Practice",
        marks: "Regular assessment",
        type: "Online / Offline Mocks",
        desc: "Practice full-length and sectional mocks for your specific exam on our computers or your device. Consistent mock testing is the single biggest differentiator for exam success.",
      },
      {
        name: "Community & Mentorship",
        marks: "Priceless",
        type: "Peer & Expert Support",
        desc: "Study alongside peers from diverse exam backgrounds. Exchange strategies, discuss current affairs, and motivate each other. Access to mentor Shubham for study planning and direction.",
      },
    ],
    syllabus: [
      { subject: "Banking Exams (IBPS/SBI)", topics: ["Quantitative Aptitude", "Reasoning Ability", "English Language", "General / Financial Awareness", "Computer Knowledge"] },
      { subject: "State PCS Exams", topics: ["State-specific GK & History", "General Studies (History, Polity, Economy)", "Current Affairs", "Optional / Specialised Subject", "Essay & Descriptive Writing"] },
      { subject: "Teaching Exams (CTET/UPTET)", topics: ["Child Development & Pedagogy", "Language I & II", "Mathematics & EVS (for Paper I)", "Social Studies / Science (for Paper II)"] },
      { subject: "Any Other Exam", topics: ["Bring your syllabus — we adapt to you", "Use our digital resources for any subject", "Access RBI/SEBI/NABARD/Insurance materials", "IT sector certification prep also supported"] },
    ],
    posts: ["IBPS PO / Clerk in Nationalised Banks", "SBI PO / Clerk / SO", "Insurance — LIC AAO, NIACL, OICL", "State PCS — SDM, BDO, Naib Tehsildar", "Teaching — TGT, PGT, KVS, NVS", "Any Central or State Government Post"],
    tips: [
      "Define your target exam first — clarity of goal is the foundation of successful preparation",
      "Make a 90-day study plan with daily, weekly and monthly targets; revise and adapt it every week",
      "Consistency beats intensity — 6 focused hours daily for 8 months beats 12-hour cramming for 1 month",
      "Use the library's zero-distraction environment to your advantage — protect your study hours fiercely",
      "Connect with peers preparing for the same exam for shared resources and motivation",
      "Talk to Shubham (our founder) for personalised guidance on which exam fits your background and goals",
    ],
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

function ExamDetailPage() {
  const { examId } = Route.useParams();
  const exam = EXAM_DATA[examId as keyof typeof EXAM_DATA];

  if (!exam) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center gap-6">
        <div className="text-center">
          <div className="font-stat text-8xl font-bold text-border">404</div>
          <h1 className="font-display mt-4 text-3xl font-bold">Exam not found</h1>
          <p className="mt-3 text-muted-foreground">The exam you&apos;re looking for doesn&apos;t exist in our records.</p>
        </div>
        <Link to="/exams" className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground hover:scale-[1.02] transition-all">
          <ChevronLeft className="size-4" /> View All Exams
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-clip">
      {/* Nav */}
      <header className="fixed inset-x-0 top-0 z-50 py-4">
        <div className="container-px mx-auto max-w-7xl">
          <div className="flex items-center justify-between rounded-2xl border border-border glass px-4 py-3 shadow-xl shadow-black/30">
            <Link to="/" className="flex items-center gap-3">
              <div className="grid size-9 place-items-center rounded-xl bg-accent text-accent-foreground shadow-md shadow-accent/30">
                <BookOpen className="size-4" strokeWidth={2.5} />
              </div>
              <div className="leading-tight">
                <div className="font-display text-[14px] font-bold tracking-tight">Super Digital Library</div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Kanpur · 24×7</div>
              </div>
            </Link>
            <div className="flex items-center gap-2">
              <Link
                to="/exams"
                className="inline-flex items-center gap-1.5 rounded-xl border border-border px-3.5 py-2 text-xs font-medium text-foreground/80 hover:bg-white/5 transition-colors"
              >
                <ChevronLeft className="size-3.5" /> All Exams
              </Link>
              <a
                href={WA(exam.code)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl bg-accent px-4 py-2.5 text-xs font-semibold text-accent-foreground shadow-md shadow-accent/30 hover:scale-[1.03] transition-all"
              >
                Join Now <ArrowRight className="size-3.5" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-36 pb-16 aurora-mesh noise overflow-hidden">
        <div className="absolute inset-0 -z-10 grid-bg opacity-20" />
        <div className="container-px mx-auto max-w-7xl">
          {/* Breadcrumb */}
          <Reveal>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
              <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
              <span>/</span>
              <Link to="/exams" className="hover:text-foreground transition-colors">All Exams</Link>
              <span>/</span>
              <span style={{ color: exam.color }}>{exam.code}</span>
            </div>
          </Reveal>

          <div className="flex flex-col lg:flex-row lg:items-end gap-8 lg:gap-16">
            <div className="flex-1">
              <Reveal>
                <div className="font-stat text-[80px] md:text-[120px] font-black leading-none tracking-tighter" style={{ color: exam.color }}>
                  {exam.code}
                </div>
              </Reveal>
              <Reveal delay={0.06}>
                <h1 className="font-display mt-2 text-2xl md:text-3xl font-bold text-foreground">{exam.full}</h1>
                <p className="mt-2 text-base font-medium" style={{ color: exam.color }}>{exam.tagline}</p>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-5 max-w-2xl text-muted-foreground leading-relaxed">{exam.overview}</p>
              </Reveal>
            </div>

            {/* Stats card */}
            <Reveal delay={0.1} className="lg:w-72 shrink-0">
              <div className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-md space-y-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  <span className="relative flex size-2">
                    <span className="animate-ping absolute inline-flex size-full rounded-full opacity-60" style={{ background: exam.color }} />
                    <span className="relative inline-flex size-2 rounded-full" style={{ background: exam.color }} />
                  </span>
                  Live at Super Digital Library
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-stat text-5xl font-black" style={{ color: exam.color }}>{exam.count}</span>
                  <span className="text-sm text-muted-foreground">aspirants studying now</span>
                </div>
                <hr className="border-border" />
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <div className="text-muted-foreground">Conducted by</div>
                    <div className="mt-0.5 font-medium text-foreground/90 text-[11px]">{exam.conductedBy}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Frequency</div>
                    <div className="mt-0.5 font-medium text-foreground/90">{exam.frequency}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Total Marks</div>
                    <div className="mt-0.5 font-medium text-foreground/90">{exam.totalMarks}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Prep Time</div>
                    <div className="mt-0.5 font-medium text-foreground/90">{exam.prepTime}</div>
                  </div>
                </div>
                <a
                  href={WA(exam.code)}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-accent-foreground hover:scale-[1.02] transition-all shadow-md shadow-accent/30 w-full"
                >
                  <svg viewBox="0 0 24 24" className="size-4 fill-current shrink-0">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Join for {exam.code} on WhatsApp
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Eligibility strip */}
      <section className="border-y border-border bg-card/30 py-6">
        <div className="container-px mx-auto max-w-7xl">
          <div className="flex flex-wrap gap-6 md:gap-10 text-sm">
            <div className="flex items-center gap-3">
              <Award className="size-4 text-accent shrink-0" />
              <div>
                <div className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Eligibility</div>
                <div className="font-medium text-foreground/90">{exam.eligibility}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="size-4 text-accent shrink-0" />
              <div>
                <div className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Age Limit</div>
                <div className="font-medium text-foreground/90">{exam.age}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="size-4 text-accent shrink-0" />
              <div>
                <div className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Attempts</div>
                <div className="font-medium text-foreground/90">{exam.attempts}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Exam Stages */}
      <section className="py-16 md:py-24">
        <div className="container-px mx-auto max-w-7xl">
          <Reveal>
            <h2 className="font-display text-3xl font-bold md:text-4xl flex items-center gap-3">
              <FileText className="size-7 text-accent" /> Exam Pattern & Stages
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {exam.stages.map((stage, i) => (
              <Reveal key={stage.name} delay={i * 0.07}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25 }}
                  className="relative flex flex-col rounded-2xl border border-border bg-card p-6 overflow-hidden"
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-0.5"
                    style={{ background: `linear-gradient(90deg, ${exam.color}, transparent)` }}
                  />
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">Stage {i + 1}</div>
                      <div className="mt-1 font-display text-xl font-bold">{stage.name}</div>
                    </div>
                    <div
                      className="rounded-lg px-2.5 py-1 text-[11px] font-bold shrink-0"
                      style={{ background: `color-mix(in oklab, ${exam.color} 15%, transparent)`, color: exam.color }}
                    >
                      {stage.marks}
                    </div>
                  </div>
                  <div
                    className="mt-2 text-[11px] font-medium rounded-full border px-2.5 py-0.5 w-fit"
                    style={{ borderColor: `color-mix(in oklab, ${exam.color} 30%, transparent)`, color: exam.color }}
                  >
                    {stage.type}
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{stage.desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Syllabus */}
      <section className="py-16 md:py-24 bg-card/20 border-y border-border">
        <div className="container-px mx-auto max-w-7xl">
          <Reveal>
            <h2 className="font-display text-3xl font-bold md:text-4xl flex items-center gap-3">
              <BookOpen className="size-7 text-accent" /> Syllabus Breakdown
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {exam.syllabus.map((item, i) => (
              <Reveal key={item.subject} delay={i * 0.06}>
                <div className="rounded-2xl border border-border bg-background/60 p-5">
                  <div className="font-semibold text-sm" style={{ color: exam.color }}>{item.subject}</div>
                  <ul className="mt-3 space-y-1.5">
                    {item.topics.map((topic) => (
                      <li key={topic} className="flex items-start gap-2 text-[13px] text-muted-foreground">
                        <CheckCircle className="size-3.5 shrink-0 mt-0.5" style={{ color: exam.color }} />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Career Outcomes */}
      <section className="py-16 md:py-24">
        <div className="container-px mx-auto max-w-7xl">
          <Reveal>
            <h2 className="font-display text-3xl font-bold md:text-4xl flex items-center gap-3">
              <Award className="size-7 text-accent" /> Career Outcomes & Posts
            </h2>
          </Reveal>
          <div className="mt-8 flex flex-wrap gap-3">
            {exam.posts.map((post, i) => (
              <Reveal key={post} delay={i * 0.04}>
                <div
                  className="rounded-xl border px-4 py-2.5 text-sm font-medium"
                  style={{
                    borderColor: `color-mix(in oklab, ${exam.color} 30%, transparent)`,
                    background: `color-mix(in oklab, ${exam.color} 8%, transparent)`,
                    color: exam.color,
                  }}
                >
                  {post}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Study Tips */}
      <section className="py-16 md:py-24 bg-card/20 border-y border-border">
        <div className="container-px mx-auto max-w-7xl">
          <Reveal>
            <h2 className="font-display text-3xl font-bold md:text-4xl flex items-center gap-3">
              <Lightbulb className="size-7 text-accent" /> Expert Preparation Tips
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {exam.tips.map((tip, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="flex gap-4 rounded-2xl border border-border bg-background/60 p-5">
                  <div
                    className="flex size-8 shrink-0 items-center justify-center rounded-xl text-sm font-black"
                    style={{ background: `color-mix(in oklab, ${exam.color} 15%, transparent)`, color: exam.color }}
                  >
                    {i + 1}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed pt-0.5">{tip}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 aurora-mesh overflow-hidden">
        <div className="container-px mx-auto max-w-3xl text-center relative z-10">
          <Reveal>
            <Users className="mx-auto size-8 text-accent" />
            <h2 className="font-display mt-6 text-4xl font-bold leading-tight sm:text-5xl">
              Ready to crack <span style={{ color: exam.color }}>{exam.code}</span>?
            </h2>
            <p className="mt-5 text-muted-foreground">
              Join {exam.count} aspirant{exam.count !== 1 ? "s" : ""} already preparing for {exam.code} at Super Digital Library, Kanpur. Book your free trial today.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <a
                href={WA(exam.code)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl bg-accent px-7 py-4 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/30 hover:scale-[1.03] hover:shadow-xl hover:shadow-accent/40 transition-all"
              >
                <svg viewBox="0 0 24 24" className="size-4 fill-current shrink-0">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Join for {exam.code} on WhatsApp
              </a>
              <Link
                to="/exams"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-7 py-4 text-sm font-semibold hover:bg-white/8 hover:border-white/15 transition-all"
              >
                <ChevronLeft className="size-4" /> All Exams
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/20 py-8">
        <div className="container-px mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Super Digital Library · Kanpur</div>
          <div className="flex items-center gap-4">
            <a href={`tel:${PHONE}`} className="flex items-center gap-1.5 hover:text-foreground transition-colors">
              <Phone className="size-3.5 text-accent" /> {PHONE}
            </a>
            <a href={`https://wa.me/91${PHONE}`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-success hover:text-success/80 transition-colors">
              <MessageCircle className="size-3.5" /> WhatsApp
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
