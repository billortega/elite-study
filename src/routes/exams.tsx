import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight, BookOpen, Target, Users, Phone, MessageCircle, ChevronLeft,
  GraduationCap, Award, Sparkles, Clock, Star,
} from "lucide-react";

export const Route = createFileRoute("/exams")({
  head: () => ({
    meta: [
      { title: "Exam Tracks | Super Digital Library Kanpur" },
      {
        name: "description",
        content:
          "Super Digital Library Kanpur supports aspirants preparing for UPSC, SSC, RRB, NEET, JEE, NDA, NIMCET, UPSI, AFCAT, Judiciary and more. Join India's serious study community.",
      },
    ],
  }),
  component: ExamsPage,
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

const EXAMS = [
  {
    code: "UPSC",
    full: "Civil Services Examination",
    count: 2,
    color: "oklch(0.60 0.26 285)",
    desc: "India's most prestigious exam conducted by UPSC for IAS, IPS, IFS and allied services. Requires deep GS, Optional subject mastery and essay writing.",
    subjects: ["General Studies I–IV", "CSAT", "Optional Subject", "Essay", "Current Affairs"],
    duration: "1–3 years preparation",
    level: "National",
  },
  {
    code: "SSC",
    full: "Staff Selection Commission",
    count: 1,
    color: "oklch(0.65 0.20 200)",
    desc: "SSC conducts CGL, CHSL, MTS, GD Constable and CPO exams for central government jobs. High competition, multiple tiers.",
    subjects: ["Quantitative Aptitude", "English", "General Intelligence", "General Awareness"],
    duration: "6–12 months",
    level: "National",
  },
  {
    code: "RRB",
    full: "Railway Recruitment Board",
    count: 3,
    color: "oklch(0.68 0.18 162)",
    desc: "RRB conducts NTPC, Group D, ALP and JE exams for Indian Railways — one of the largest employers in the world.",
    subjects: ["Mathematics", "General Intelligence", "General Science", "General Awareness"],
    duration: "6–12 months",
    level: "National",
  },
  {
    code: "NEET",
    full: "National Eligibility Entrance Test",
    count: 3,
    color: "oklch(0.62 0.22 27)",
    desc: "Gateway to MBBS, BDS and AYUSH courses across India. Conducted by NTA with a single national merit list.",
    subjects: ["Physics", "Chemistry", "Biology (Botany + Zoology)", "NCERT Mastery"],
    duration: "1–2 years",
    level: "National",
  },
  {
    code: "JEE",
    full: "Joint Entrance Examination",
    count: 1,
    color: "oklch(0.70 0.20 50)",
    desc: "JEE Main and Advanced are the gateway to IITs, NITs, IIITs and top engineering institutions across India.",
    subjects: ["Physics", "Chemistry", "Mathematics", "Problem Solving"],
    duration: "1–2 years",
    level: "National",
  },
  {
    code: "NDA",
    full: "National Defence Academy",
    count: 1,
    color: "oklch(0.60 0.26 285)",
    desc: "UPSC NDA exam selects candidates for Army, Navy and Air Force. One of the most respected careers for young India.",
    subjects: ["Mathematics", "General Ability Test", "English", "Science & GK"],
    duration: "6–12 months",
    level: "National",
  },
  {
    code: "NIMCET",
    full: "NIT MCA Common Entrance Test",
    count: 1,
    color: "oklch(0.65 0.20 200)",
    desc: "National-level MCA entrance conducted by NITs. Tests mathematics, analytical ability and computer awareness.",
    subjects: ["Mathematics", "Analytical Ability", "Computer Awareness", "English"],
    duration: "6–12 months",
    level: "National",
  },
  {
    code: "UPSI",
    full: "UP Police Sub-Inspector",
    count: 3,
    color: "oklch(0.58 0.22 240)",
    desc: "UPPBPB recruits Sub-Inspectors for UP Police. A top state government opportunity with lakhs of applicants.",
    subjects: ["General Hindi", "Law & Constitution", "General Knowledge", "Numerical & Mental Ability"],
    duration: "6–12 months",
    level: "State (UP)",
  },
  {
    code: "AFCAT",
    full: "Air Force Common Admission Test",
    count: 1,
    color: "oklch(0.55 0.24 260)",
    desc: "IAF recruits officers for Flying, Technical and Ground Duty branches through AFCAT — biannual exam.",
    subjects: ["Verbal Ability", "Numerical Ability", "Reasoning", "General Awareness", "Military Aptitude"],
    duration: "6–12 months",
    level: "National",
  },
  {
    code: "JUDICIARY",
    full: "UP Judicial Services",
    count: 1,
    color: "oklch(0.62 0.20 300)",
    desc: "UP PCS (J) selects Civil Judges through a rigorous three-stage exam. Law graduates aiming for judgeship prepare here.",
    subjects: ["Law of Contract", "CPC & CrPC", "Indian Penal Code", "Evidence Act", "Constitutional Law"],
    duration: "1–2 years",
    level: "State (UP)",
  },
  {
    code: "ANY EXAM",
    full: "Any Competitive Examination",
    count: 5,
    color: "oklch(0.60 0.26 285)",
    desc: "Preparing for an exam not listed here? No problem. Super Digital Library welcomes aspirants from every background and every goal.",
    subjects: ["Any subject, any stream", "Self-study with resources", "Group discussion area", "Focused study environment"],
    duration: "Your pace, your plan",
    level: "All levels",
    isAny: true,
  },
];

function ExamsPage() {
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
                to="/"
                className="inline-flex items-center gap-1.5 rounded-xl border border-border px-3.5 py-2 text-xs font-medium text-foreground/80 hover:bg-white/5 transition-colors"
              >
                <ChevronLeft className="size-3.5" /> Home
              </Link>
              <a
                href={WA("my exam")}
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
      <section className="relative pt-36 pb-20 aurora-mesh noise overflow-hidden">
        <div className="absolute inset-0 -z-10 grid-bg opacity-20" />
        <div className="container-px mx-auto max-w-7xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
              <span className="size-1.5 rounded-full bg-accent" />
              All Exam Tracks · Kanpur
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="font-display mt-7 text-balance text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl md:text-[80px]">
              Every exam.<br />
              <span style={{
                background: "linear-gradient(120deg, oklch(0.97 0 0) 0%, oklch(0.72 0.26 285) 45%, oklch(0.65 0.22 200) 100%)",
                backgroundClip: "text", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>
                One space.
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-7 max-w-xl text-balance text-base text-muted-foreground sm:text-lg leading-relaxed">
              Super Digital Library supports aspirants across every major competitive exam in India. Study alongside peers who share your drive.
            </p>
          </Reveal>
          {/* Live count bar */}
          <Reveal delay={0.18}>
            <div className="mx-auto mt-10 inline-flex items-center gap-3 rounded-2xl border border-border bg-card/60 px-6 py-3.5 backdrop-blur-md">
              <span className="flex items-center gap-2 text-sm font-medium">
                <span className="relative flex size-2.5">
                  <span className="animate-ping absolute inline-flex size-full rounded-full bg-success opacity-60" />
                  <span className="relative inline-flex size-2.5 rounded-full bg-success" />
                </span>
                Currently studying at the library
              </span>
              <span className="font-stat text-2xl font-bold text-accent">
                {EXAMS.reduce((a, e) => a + e.count, 0)}
              </span>
              <span className="text-sm text-muted-foreground">aspirants</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Exam grid */}
      <section className="py-20 md:py-28">
        <div className="container-px mx-auto max-w-7xl">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {EXAMS.map((exam, i) => (
              <Reveal key={exam.code} delay={i * 0.04} className={exam.isAny ? "sm:col-span-2 lg:col-span-3" : ""}>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3, ease }}
                  className={`group relative flex flex-col overflow-hidden rounded-2xl border p-6 md:p-7 transition-colors ${
                    exam.isAny
                      ? "border-accent/30 bg-accent/8 hover:border-accent/50"
                      : "border-border bg-card hover:border-accent/25"
                  }`}
                >
                  {/* Top row */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div
                        className="font-stat text-4xl font-bold tracking-tighter md:text-5xl"
                        style={{ color: exam.isAny ? "oklch(0.60 0.26 285)" : "oklch(0.90 0 0)" }}
                      >
                        {exam.code}
                      </div>
                      <div className="mt-1 text-sm font-medium text-muted-foreground">{exam.full}</div>
                    </div>
                    {/* Live count badge */}
                    <div className="flex flex-col items-end shrink-0">
                      <div
                        className="flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold"
                        style={{ background: `color-mix(in oklab, ${exam.color} 15%, transparent)`, color: exam.color }}
                      >
                        <Users className="size-3.5" />
                        {exam.count} studying now
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mt-5 text-sm text-muted-foreground leading-relaxed">{exam.desc}</p>

                  {/* Subjects */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {exam.subjects.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-border bg-background/60 px-3 py-1 text-[11px] font-medium text-foreground/70"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Meta row */}
                  <div className="mt-5 flex items-center gap-4 text-[11px] text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Clock className="size-3.5 text-accent" /> {exam.duration}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Target className="size-3.5 text-accent" /> {exam.level}
                    </span>
                  </div>

                  {/* CTA */}
                  <a
                    href={WA(exam.code === "ANY EXAM" ? "my exam" : exam.code)}
                    target="_blank"
                    rel="noreferrer"
                    className={`mt-6 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all hover:scale-[1.01] ${
                      exam.isAny
                        ? "bg-accent text-accent-foreground shadow-md shadow-accent/30"
                        : "bg-foreground/8 border border-border hover:bg-white/8 hover:border-accent/30"
                    }`}
                  >
                    <svg viewBox="0 0 24 24" className="size-4 fill-current shrink-0">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Join for {exam.code === "ANY EXAM" ? "Your Exam" : exam.code} on WhatsApp
                  </a>

                  {/* Hover glow */}
                  <div className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-accent/0 blur-2xl transition-all duration-500 group-hover:bg-accent/12" />
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 aurora-mesh overflow-hidden">
        <div className="absolute inset-0 -z-10 grid-bg opacity-15" />
        <div className="container-px mx-auto max-w-3xl text-center relative z-10">
          <Reveal>
            <Sparkles className="mx-auto size-8 text-accent" />
            <h2 className="font-display mt-6 text-4xl font-bold leading-tight sm:text-5xl">
              Your seat is waiting.
            </h2>
            <p className="mt-5 text-muted-foreground">
              Join hundreds of serious aspirants who study consistently at Super Digital Library, Kanpur.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`https://wa.me/91${PHONE}?text=${encodeURIComponent("Hi Shubham! I want to join Super Digital Library. Please help me get started.")}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl bg-accent px-7 py-4 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/30 hover:scale-[1.03] hover:shadow-xl hover:shadow-accent/40 transition-all"
              >
                <svg viewBox="0 0 24 24" className="size-4 fill-current shrink-0">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Book Free Trial on WhatsApp
              </a>
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-7 py-4 text-sm font-semibold hover:bg-white/8 hover:border-white/15 transition-all"
              >
                <ChevronLeft className="size-4" /> Back to Home
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer strip */}
      <footer className="border-t border-border bg-card/20 py-8">
        <div className="container-px mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Super Digital Library · Kanpur</div>
          <div className="flex items-center gap-4">
            <a href={`tel:${PHONE}`} className="flex items-center gap-1.5 hover:text-foreground transition-colors">
              <Phone className="size-3.5 text-accent" /> {PHONE}
            </a>
            <a
              href={`https://wa.me/91${PHONE}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-success hover:text-success/80 transition-colors"
            >
              <MessageCircle className="size-3.5" /> WhatsApp
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
