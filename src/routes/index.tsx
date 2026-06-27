import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Wifi, Snowflake, ShieldCheck, Zap, Clock, Droplet, Newspaper, Printer,
  Users, BookOpen, Coffee, DoorOpen, Phone, MessageCircle, MapPin, ArrowRight,
  Check, Star, Plus, Minus, Sparkles, Target, Award, GraduationCap, Quote,
  ChevronLeft, ChevronRight,
} from "lucide-react";
import heroImg from "@/assets/hero-shubham.webp";
import founderImg from "@/assets/WhatsApp Image 2026-06-27 at 14.00.56.jpeg";
import img1 from "@/assets/WhatsApp Image 2026-06-27 at 14.24.23.jpeg";
import img2 from "@/assets/WhatsApp Image 2026-06-27 at 14.24.23 (1).jpeg";
import img3 from "@/assets/WhatsApp Image 2026-06-27 at 14.24.23 (2).jpeg";
import img4 from "@/assets/WhatsApp Image 2026-06-27 at 14.24.24.jpeg";
import img5 from "@/assets/WhatsApp Image 2026-06-27 at 14.24.24 (1).jpeg";
import img6 from "@/assets/WhatsApp Image 2026-06-27 at 14.24.24 (2).jpeg";
import img7 from "@/assets/WhatsApp Image 2026-06-27 at 14.24.25.jpeg";
import img8 from "@/assets/WhatsApp Image 2026-06-27 at 14.24.25 (1).jpeg";
import img9 from "@/assets/WhatsApp Image 2026-06-27 at 14.24.25 (2).jpeg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Super Digital Library | Premium 24×7 Study Space in Kanpur" },
      {
        name: "description",
        content:
          "Premium Digital Library in Kanpur offering 24×7 access, high-speed WiFi, air-conditioned study cabins, power backup, current affairs resources, and a focused study environment.",
      },
      { property: "og:title", content: "Super Digital Library | Premium 24×7 Study Space in Kanpur" },
      {
        property: "og:description",
        content:
          "A premium 24×7 study ecosystem for serious aspirants, students and professionals. Study without distractions.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: heroImg },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: heroImg },
      {
        name: "keywords",
        content:
          "Library Kanpur, Digital Library Kanpur, 24x7 Library Kanpur, Study Room Kanpur, UPSC Library Kanpur, NIMCET Study Library, SSC Library Kanpur",
      },
    ],
  }),
  component: Index,
});

const PHONE = "8953999079";
const WA = `https://wa.me/91${PHONE}?text=${encodeURIComponent(
  "Hi Shubham! I found Super Digital Library online and I'd like to know more about joining. Can you help me?",
)}`;
const planWA = (name: string, price: string, period: string) =>
  `https://wa.me/91${PHONE}?text=${encodeURIComponent(
    `Hi Shubham! 🙏 I want to join the *${name} Plan* (${price}${period}) at Super Digital Library. Please confirm my seat and let me know the next steps.`,
  )}`;
const ADDRESS_LINES = [
  "98WV+JCG, Yashoda Nagar Rd",
  "Near Super Hospital, Daheli Sujanpur",
  "Kanpur, Uttar Pradesh 208011",
];
const LAT = 26.3967;
const LON = 80.3426;
const MAPS_URL = `https://www.openstreetmap.org/?mlat=${LAT}&mlon=${LON}#map=17/${LAT}/${LON}`;
const MAPS_EMBED = `https://www.openstreetmap.org/export/embed.html?bbox=${LON - 0.008}%2C${LAT - 0.006}%2C${LON + 0.008}%2C${LAT + 0.006}&layer=mapnik&marker=${LAT}%2C${LON}`;

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-clip">
      <Nav />
      <Hero />
      <TrustBar />
      <WhoStudiesHere />
      <Pricing />
      <Facilities />
      <Gallery />
      <Testimonials />
      <Founder />
      <FAQ />
      <Location />
      <Footer />
      <WhatsAppBadge />
    </div>
  );
}

/* ─── shared primitives ─── */

const ease = [0.22, 1, 0.36, 1] as const;

function Reveal({
  children,
  delay = 0,
  className = "",
  from = "bottom",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  from?: "bottom" | "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const yInit = from === "bottom" ? 28 : 0;
  const xInit = from === "left" ? -28 : from === "right" ? 28 : 0;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: yInit, x: xInit }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.75, ease, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children, variant = "default" }: { children: React.ReactNode; variant?: "default" | "accent" }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] ${
        variant === "accent"
          ? "border border-accent/30 bg-accent/10 text-accent"
          : "border border-border bg-card/50 text-muted-foreground"
      }`}
    >
      <span className={`size-1.5 rounded-full ${variant === "accent" ? "bg-accent" : "bg-accent"}`} />
      {children}
    </span>
  );
}

function Counter({ to, suffix = "", duration = 1.6 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);
  return <span ref={ref} className="font-stat tabular-nums">{val}{suffix}</span>;
}

/* ─── nav ─── */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    { href: "#why", label: "Why Us" },
    { href: "#facilities", label: "Facilities" },
    { href: "#gallery", label: "Gallery" },
    { href: "#pricing", label: "Pricing" },
    { href: "#contact", label: "Contact" },
  ];
  const examLink = "/exams";
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "py-2" : "py-4"}`}>
      <div className="container-px mx-auto max-w-7xl">
        <div
          className={`flex items-center justify-between rounded-2xl px-4 md:px-5 py-3 transition-all duration-500 ${
            scrolled
              ? "glass shadow-xl shadow-black/40 border border-border"
              : "bg-transparent"
          }`}
        >
          {/* Logo */}
          <a href="#top" className="flex items-center gap-3">
            <div className="relative grid size-9 place-items-center rounded-xl bg-accent text-accent-foreground shadow-md shadow-accent/30">
              <BookOpen className="size-4" strokeWidth={2.5} />
            </div>
            <div className="leading-tight">
              <div className="font-display text-[14px] font-bold tracking-tight">Super Digital Library</div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Kanpur · 24×7</div>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-lg px-3.5 py-2 text-sm text-muted-foreground transition-all hover:bg-white/5 hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
            <Link
              to={examLink}
              className="rounded-lg px-3.5 py-2 text-sm text-accent font-medium transition-all hover:bg-accent/10"
            >
              All Exams
            </Link>
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-2">
            <a
              href={`tel:${PHONE}`}
              className="hidden sm:inline-flex items-center gap-2 rounded-xl border border-border px-3.5 py-2 text-xs font-medium text-foreground/80 hover:bg-white/5 hover:text-foreground transition-colors"
            >
              <Phone className="size-3.5 text-accent" />
              {PHONE}
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 rounded-xl bg-accent px-4 py-2.5 text-xs font-semibold text-accent-foreground shadow-md shadow-accent/30 transition-all hover:scale-[1.03] hover:shadow-lg hover:shadow-accent/40"
            >
              Free Trial <ArrowRight className="size-3.5" />
            </a>
            <button
              className="md:hidden inline-grid size-10 place-items-center rounded-xl border border-border text-foreground/70 hover:bg-white/5"
              onClick={() => setOpen(!open)}
              aria-label="Menu"
            >
              {open ? <Minus className="size-4" /> : <Plus className="size-4" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.25, ease }}
              className="md:hidden mt-2 glass rounded-2xl p-2"
            >
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center rounded-xl px-4 py-3 text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <Link
                to={examLink}
                onClick={() => setOpen(false)}
                className="flex items-center rounded-xl px-4 py-3 text-sm text-accent font-medium hover:bg-accent/10 transition-colors"
              >
                All Exams
              </Link>
              <div className="mt-2 p-2 pt-0 border-t border-border">
                <a href="#contact" className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-accent-foreground">
                  Book Free Trial <ArrowRight className="size-4" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

/* ─── hero ─── */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative min-h-screen overflow-hidden pt-32 md:pt-40 aurora-mesh noise">
      {/* Grid */}
      <div className="absolute inset-0 -z-10 grid-bg opacity-30" />

      <div className="container-px mx-auto max-w-7xl relative z-10">
        <motion.div style={{ y, opacity }} className="text-center">
          {/* Pill label */}
          <Reveal>
            <SectionLabel variant="accent">Premium Study Ecosystem · Kanpur</SectionLabel>
          </Reveal>

          {/* Headline */}
          <Reveal delay={0.06}>
            <h1 className="font-display mt-7 text-balance leading-[0.92] tracking-tight">
              <span className="block text-5xl sm:text-7xl md:text-[92px] font-extrabold text-foreground/90">
                Study Without
              </span>
              <span className="relative inline-block mt-1">
                <span
                  className="text-5xl sm:text-7xl md:text-[92px] font-extrabold"
                  style={{
                    background: "linear-gradient(120deg, oklch(0.97 0 0) 0%, oklch(0.72 0.26 285) 45%, oklch(0.65 0.22 200) 100%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Distractions.
                </span>
                {/* Underline accent */}
                <svg className="absolute -bottom-3 left-0 w-full" height="6" viewBox="0 0 400 6" fill="none" preserveAspectRatio="none">
                  <path
                    d="M0 3 Q200 0 400 3"
                    stroke="oklch(0.60 0.26 285)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    opacity="0.7"
                  />
                </svg>
              </span>
            </h1>
          </Reveal>

          {/* Subtext */}
          <Reveal delay={0.14}>
            <p className="mx-auto mt-8 max-w-xl text-balance text-base text-muted-foreground sm:text-lg leading-relaxed">
              A premium 24×7 study ecosystem designed for serious aspirants, students, and professionals seeking maximum focus and productivity.
            </p>
          </Reveal>

          {/* CTAs */}
          <Reveal delay={0.22}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-2xl bg-accent px-7 py-4 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/30 transition-all hover:scale-[1.03] hover:shadow-xl hover:shadow-accent/40"
              >
                Book Free Trial
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#facilities"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-7 py-4 text-sm font-semibold text-foreground backdrop-blur-sm transition-all hover:bg-white/8 hover:border-white/15"
              >
                Explore Facilities
              </a>
            </div>
          </Reveal>
        </motion.div>

        {/* Hero image */}
        <Reveal delay={0.32} className="relative mx-auto mt-16 max-w-6xl">
          <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-white/8 shadow-2xl shadow-black/70">
            <img
              src={heroImg}
              alt="Premium study environment at Super Digital Library Kanpur"
              width={1920}
              height={1280}
              className="size-full object-cover"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-background/30" />
            {/* Subtle vignette */}
            <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-background/30" />

            {/* Floating chips */}
            <FloatingChip className="left-4 top-6 md:left-10 md:top-10" delay={0.6}>
              <Clock className="size-3.5 text-accent" /> 24×7 Open
            </FloatingChip>
            <FloatingChip className="right-4 top-10 md:right-12 md:top-16" delay={0.8}>
              <Wifi className="size-3.5 text-accent" /> High Speed WiFi
            </FloatingChip>
            <FloatingChip className="left-4 bottom-20 md:left-12 md:bottom-28" delay={1.0}>
              <Snowflake className="size-3.5 text-accent" /> Air Conditioned
            </FloatingChip>
            <FloatingChip className="right-4 bottom-14 md:right-14 md:bottom-20" delay={1.2}>
              <Zap className="size-3.5 text-accent" /> Power Backup
            </FloatingChip>
            <FloatingChip className="left-1/2 -translate-x-1/2 bottom-4 md:bottom-8" delay={1.4}>
              <ShieldCheck className="size-3.5 text-accent" /> CCTV Security
            </FloatingChip>
          </div>

          {/* Glow under image */}
          <div
            className="absolute -bottom-10 left-1/2 -translate-x-1/2 h-20 w-3/4 blur-3xl -z-10 opacity-40"
            style={{ background: "radial-gradient(ellipse at center, oklch(0.60 0.26 285), transparent)" }}
          />
        </Reveal>
      </div>
    </section>
  );
}

function FloatingChip({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease }}
      className={`absolute z-10 ${className}`}
    >
      <motion.div
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 5 + delay, repeat: Infinity, ease: "easeInOut" }}
        className="glass-strong flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-foreground shadow-xl shadow-black/40"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/* ─── trust bar (infinite marquee) ─── */

function TrustBar() {
  const items = [
    { icon: Clock, label: "24×7 Open" },
    { icon: Users, label: "100+ Seats" },
    { icon: Wifi, label: "High Speed WiFi" },
    { icon: DoorOpen, label: "Dedicated Cabins" },
    { icon: Zap, label: "Power Backup" },
    { icon: Droplet, label: "RO Water" },
    { icon: Users, label: "Separate Washrooms" },
    { icon: ShieldCheck, label: "CCTV Security" },
    { icon: Snowflake, label: "Air Conditioned" },
    { icon: Newspaper, label: "Daily Newspapers" },
    { icon: Printer, label: "Printing & Photocopy" },
    { icon: Coffee, label: "Discussion Area" },
  ];
  const doubled = [...items, ...items];

  return (
    <section className="border-y border-border bg-card/20 py-5 mt-20 overflow-hidden marquee-fade">
      <div
        className="flex w-max gap-10 items-center"
        style={{ animation: "marquee 40s linear infinite" }}
      >
        {doubled.map((it, i) => (
          <div key={i} className="flex items-center gap-2.5 shrink-0">
            <it.icon className="size-4 text-accent shrink-0" />
            <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">{it.label}</span>
            <span className="ml-6 size-1 rounded-full bg-border shrink-0" />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── why choose us (bento grid) ─── */

function WhyChooseUs() {
  return (
    <section id="why" className="py-28 md:py-36">
      <div className="container-px mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionLabel>Why Super Digital Library</SectionLabel>
          <h2 className="font-display mt-6 text-balance text-4xl font-bold leading-tight sm:text-5xl md:text-[60px]">
            Built to remove every reason
            <span className="text-muted-foreground"> not to study.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-4 md:grid-cols-6 md:gap-4">
          <BentoCard className="md:col-span-3 md:row-span-2" icon={DoorOpen} title="Personal Study Cabins" desc="Private, sound-isolated cabins built for deep work. Your seat. Your space. Every day." big>
            <div className="absolute inset-0 -z-10 opacity-25">
              <img src={img3} alt="" loading="lazy" className="size-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/90 to-transparent" />
            </div>
          </BentoCard>
          <BentoCard className="md:col-span-3" icon={Clock} title="24×7 Access" desc="Study at 4 AM or 4 PM. The library never closes — your momentum never breaks." />
          <BentoCard className="md:col-span-2" icon={Wifi} title="High-Speed Internet" desc="Fiber connectivity for research, mock tests, and online classes without lag." />
          <BentoCard className="md:col-span-1" icon={Zap} title="Power Backup" desc="Zero interruptions." />
          <BentoCard className="md:col-span-2" icon={Newspaper} title="Daily Newspapers" desc="Multiple national dailies and current affairs with monthly magazines." />
          <BentoCard className="md:col-span-2" icon={Printer} title="Printing & Photocopy" desc="Everything you need under one roof." />
          <BentoCard className="md:col-span-2" icon={ShieldCheck} title="CCTV Security" desc="A safe, monitored environment 24×7." />
          <BentoCard className="md:col-span-2" icon={Snowflake} title="Air Conditioned" desc="Comfortable climate so you can focus longer." />
          <BentoCard className="md:col-span-3" icon={Coffee} title="Discussion Area" desc="A dedicated zone for group revision and peer learning, away from silent study halls." />
          <BentoCard className="md:col-span-3" icon={Droplet} title="RO Water + Washrooms" desc="Hot & cold RO water and separate, well-maintained washrooms for boys and girls." />
        </div>
      </div>
    </section>
  );
}

function BentoCard({
  icon: Icon, title, desc, className = "", big = false, children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string; desc: string; className?: string; big?: boolean; children?: React.ReactNode;
}) {
  return (
    <Reveal className={className}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease }}
        className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-6 md:p-7 card-glow"
      >
        {children}
        <div className="relative flex h-full flex-col">
          <div className="inline-flex size-10 items-center justify-center rounded-xl border border-border bg-background/60 transition-all duration-300 group-hover:border-accent/40 group-hover:bg-accent/10">
            <Icon className="size-4.5 text-muted-foreground transition-colors duration-300 group-hover:text-accent" />
          </div>
          <h3 className={`font-display mt-5 font-bold tracking-tight ${big ? "text-2xl md:text-3xl" : "text-lg"}`}>{title}</h3>
          <p className={`mt-2 leading-relaxed text-muted-foreground ${big ? "text-base max-w-md" : "text-sm"}`}>{desc}</p>
        </div>
        {/* Spotlight glow on hover */}
        <div className="pointer-events-none absolute -right-8 -top-8 size-28 rounded-full bg-accent/0 blur-2xl transition-all duration-500 group-hover:bg-accent/15" />
      </motion.div>
    </Reveal>
  );
}

/* ─── premium experience ─── */

function PremiumExperience() {
  const stats = [
    { v: 100, s: "+", l: "Premium Seats" },
    { v: 24, s: "×7", l: "Open Always" },
    { v: 12, s: "+", l: "Exam Tracks" },
    { v: 99, s: "%", l: "Focus Index" },
  ];
  return (
    <section className="py-28 md:py-36">
      <div className="container-px mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Image */}
          <Reveal from="left">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border/60">
              <img src={img5} alt="Premium study hall" loading="lazy" className="size-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-background/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 glass-strong rounded-2xl p-5">
                <div className="flex items-center gap-3">
                  <Sparkles className="size-4 text-accent" />
                  <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Designed for Focus</span>
                </div>
                <p className="mt-2 font-display text-lg font-semibold leading-snug">
                  Every detail — lighting, acoustics, ergonomics — engineered for deep work.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Content */}
          <div>
            <Reveal from="right">
              <SectionLabel>Premium Study Experience</SectionLabel>
              <h2 className="font-display mt-6 text-balance text-4xl font-bold leading-[1.05] sm:text-5xl md:text-[58px]">
                Built for serious aspirants.
              </h2>
              <p className="mt-6 max-w-lg text-muted-foreground leading-relaxed">
                Every corner of Super Digital Library is designed to maximize focus, consistency, productivity and success.
                From ergonomic seating to ambient lighting and noise-controlled cabins — nothing is accidental.
              </p>
            </Reveal>

            {/* Stats grid */}
            <Reveal delay={0.1}>
              <div className="mt-10 grid grid-cols-2 gap-3">
                {stats.map((s, i) => (
                  <div
                    key={s.l}
                    className="rounded-2xl border border-border bg-card p-6 transition-all hover:border-accent/30 hover:bg-card/80"
                  >
                    <div className="font-stat text-4xl font-bold tracking-tight sm:text-5xl">
                      <Counter to={s.v} />
                      <span className="text-accent">{s.s}</span>
                    </div>
                    <div className="mt-1.5 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{s.l}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── founder ─── */

function Founder() {
  return (
    <section className="py-28 md:py-36">
      <div className="container-px mx-auto max-w-7xl">
        <Reveal className="text-center">
          <SectionLabel>Meet the Founder</SectionLabel>
        </Reveal>
        <div className="mt-14 grid items-center gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5" from="left">
            <div className="relative mx-auto max-w-sm">
              <div className="absolute -inset-8 -z-10 rounded-[2.5rem] opacity-50 blur-3xl"
                style={{ background: "radial-gradient(ellipse at center, oklch(0.60 0.26 285 / 0.25), transparent)" }} />
              <div className="overflow-hidden rounded-3xl border border-border/60">
                <img
                  src={founderImg}
                  alt="Shubham Sharma — Founder, Super Digital Library"
                  loading="lazy"
                  className="aspect-square w-full object-cover"
                />
              </div>
              <div className="mt-4 flex items-center justify-between rounded-2xl border border-border bg-card p-4">
                <div>
                  <div className="font-display text-base font-bold">Shubham Sharma</div>
                  <div className="text-xs text-muted-foreground mt-0.5">Founder · Super Digital Library</div>
                </div>
                <div className="rounded-xl bg-accent/15 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-accent">
                  Est. Kanpur
                </div>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal from="right">
              <h2 className="font-display text-balance text-4xl font-bold leading-tight sm:text-5xl md:text-[56px]">
                A focused space, built by someone who knows the struggle.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-7 space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Super Digital Library was founded with a simple belief: students deserve a focused, comfortable,
                  and distraction-free environment where they can unlock their true potential.
                </p>
                <p>
                  Recognizing the challenges students face while studying at home, Shubham Sharma envisioned a premium
                  study ecosystem combining discipline, technology, comfort and productivity.
                </p>
                <p>
                  Today, Super Digital Library helps ambitious students prepare for competitive examinations and academic
                  excellence through world-class facilities and an environment built for success.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <figure className="mt-10 rounded-2xl border border-accent/20 bg-accent/5 p-7">
                <Quote className="size-5 text-accent" />
                <blockquote className="mt-4 font-display text-xl font-medium leading-snug text-foreground sm:text-2xl">
                  "Success begins with focus. We created Super Digital Library to provide students with the environment
                  they need to stay consistent, disciplined, and goal-oriented every single day."
                </blockquote>
                <figcaption className="mt-5 text-sm text-muted-foreground">— Shubham Sharma, Founder</figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── vision ─── */

function Vision() {
  return (
    <section className="relative py-32 md:py-44 aurora-mesh overflow-hidden">
      <div className="absolute inset-0 -z-10 grid-bg opacity-20" />
      <div className="container-px mx-auto max-w-5xl text-center relative z-10">
        <Reveal>
          <SectionLabel variant="accent">Our Vision</SectionLabel>
          <h2 className="font-display mt-8 text-balance leading-[1.0]">
            <span className="block text-5xl sm:text-6xl md:text-[80px] font-extrabold text-foreground/90">Empowering</span>
            <span
              className="block text-5xl sm:text-6xl md:text-[80px] font-extrabold"
              style={{
                background: "linear-gradient(120deg, oklch(0.72 0.26 285), oklch(0.65 0.22 200))",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              future achievers.
            </span>
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-balance text-lg text-muted-foreground leading-relaxed">
            To become Kanpur's most trusted and technologically advanced study ecosystem — empowering thousands of
            students to achieve academic excellence and career success.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── who studies here ─── */

function WhoStudiesHere() {
  const tracks = [
    { code: "UPSC", title: "Civil Services IAS/IPS/IFS", slug: "upsc" },
    { code: "SSC", title: "CGL · CHSL · MTS · GD", slug: "ssc" },
    { code: "BANK", title: "IBPS PO · SBI PO · Clerk", slug: "any" },
    { code: "RRB", title: "NTPC · Group D · ALP", slug: "rrb" },
    { code: "NEET", title: "Medical Entrance", slug: "neet" },
    { code: "JEE", title: "Main & Advanced", slug: "jee" },
    { code: "GATE", title: "Engineering PG", slug: "any" },
    { code: "CAT", title: "MBA · IIM Entrance", slug: "any" },
    { code: "NDA", title: "National Defence Academy", slug: "nda" },
    { code: "CDS", title: "Combined Defence", slug: "any" },
    { code: "CLAT", title: "Law Entrance", slug: "any" },
    { code: "CUET", title: "Central University Entrance", slug: "any" },
    { code: "PCS", title: "UP State Services", slug: "any" },
    { code: "NIMCET", title: "MCA Entrance NIT", slug: "nimcet" },
    { code: "CTET", title: "Teaching · TET · SUPER TET", slug: "any" },
    { code: "UP SI", title: "UP Police Sub-Inspector", slug: "upsi" },
    { code: "NET", title: "UGC NET · JRF", slug: "any" },
    { code: "AFCAT", title: "Air Force Entrance", slug: "afcat" },
    { code: "JUDICIARY", title: "UP Judicial Services", slug: "judiciary" },
    { code: "ANY EXAM", title: "Prepare for any goal", slug: "any" },
  ];
  return (
    <section className="py-28 md:py-36">
      <div className="container-px mx-auto max-w-7xl">
        <div className="grid items-end gap-8 md:grid-cols-2">
          <Reveal>
            <SectionLabel>Who Studies Here</SectionLabel>
            <h2 className="font-display mt-6 text-balance text-4xl font-bold leading-tight sm:text-5xl md:text-[60px]">
              Serious aspirants from every track.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-muted-foreground leading-relaxed md:text-right">
              From civil services aspirants to MBA hopefuls — Super Digital Library is the home base for anyone serious about their goal.
            </p>
          </Reveal>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4">
          {tracks.map((t, i) => {
            const isAny = t.code === "ANY EXAM";
            return (
              <Reveal key={t.code} delay={i * 0.025} className={isAny ? "col-span-2 sm:col-span-3 md:col-span-2" : ""}>
                <Link
                  to={`/exams/${t.slug}`}
                  className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border p-5 md:p-6 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] ${
                    isAny
                      ? "border-accent/30 bg-accent/8 hover:border-accent/50 hover:bg-accent/12"
                      : "border-border bg-card hover:border-accent/25"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span className={`font-stat text-3xl font-bold tracking-tighter md:text-4xl transition-colors ${isAny ? "text-accent" : "text-foreground/80 group-hover:text-foreground"}`}>
                      {t.code}
                    </span>
                    <Target className={`mt-1 size-4 transition-colors ${isAny ? "text-accent" : "text-border group-hover:text-accent"}`} />
                  </div>
                  <div className="mt-8">
                    <div className="text-sm font-medium text-foreground">{t.title}</div>
                    <div className="mt-1 inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                      {isAny ? "Join us for any competitive exam" : "Aspirants studying here"} <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── facilities ─── */

function Facilities() {
  const items = [
    { icon: Wifi, t: "High Speed WiFi", d: "Fiber-grade connectivity throughout." },
    { icon: Zap, t: "Power Backup", d: "Instant UPS + inverter coverage." },
    { icon: Snowflake, t: "Air Conditioning", d: "Calibrated for long study hours." },
    { icon: DoorOpen, t: "Dedicated Study Cabins", d: "Private, distraction-free booths." },
    { icon: Coffee, t: "Discussion Area", d: "Collaborate without disturbing others." },
    { icon: ShieldCheck, t: "CCTV Security", d: "Monitored 24×7 for your safety." },
    { icon: Droplet, t: "RO Water", d: "Hot & cold drinking water on tap." },
    { icon: Newspaper, t: "Newspaper Corner", d: "Multiple national dailies daily." },
    { icon: BookOpen, t: "Current Affairs Section", d: "Monthly magazines + curated notes." },
    { icon: Printer, t: "Photocopy Services", d: "Print, copy, scan — all in-house." },
    { icon: Users, t: "Separate Washrooms", d: "Well maintained for boys & girls." },
    { icon: Clock, t: "24×7 Access", d: "Your study hours, your rules." },
  ];
  return (
    <section id="facilities" className="py-28 md:py-36">
      <div className="container-px mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionLabel>Facilities</SectionLabel>
          <h2 className="font-display mt-6 text-balance text-4xl font-bold leading-tight sm:text-5xl md:text-[60px]">
            Everything you need,<br />
            <span className="text-muted-foreground">nothing you don't.</span>
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
          {items.map((it, i) => (
            <Reveal key={it.t} delay={i * 0.025}>
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ duration: 0.25, ease }}
                className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-accent/20"
              >
                <div className="grid size-11 shrink-0 place-items-center rounded-xl border border-border bg-background/60 transition-all duration-300 group-hover:border-accent/40 group-hover:bg-accent/10">
                  <it.icon className="size-5 text-muted-foreground transition-colors duration-300 group-hover:text-accent" />
                </div>
                <div>
                  <div className="font-display text-base font-semibold">{it.t}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{it.d}</div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── gallery ─── */

function Gallery() {
  const items = [
    { src: img1, alt: "Study cabins — side view", wide: true },
    { src: img2, alt: "Students at work" },
    { src: img3, alt: "Late night session" },
    { src: img4, alt: "Study hall overview", wide: true },
    { src: img5, alt: "Focus zone" },
    { src: img6, alt: "Numbered study seats" },
    { src: img7, alt: "Dedicated desks" },
    { src: img8, alt: "Individual cabins" },
    { src: img9, alt: "Exam preparation", wide: true },
  ];
  return (
    <section id="gallery" className="py-28 md:py-36">
      <div className="container-px mx-auto max-w-7xl">
        <div className="grid items-end gap-6 md:grid-cols-2">
          <Reveal>
            <SectionLabel>Gallery</SectionLabel>
            <h2 className="font-display mt-6 text-balance text-4xl font-bold leading-tight sm:text-5xl md:text-[60px]">
              Step inside the space.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-muted-foreground leading-relaxed md:text-right">
              Real students. Real focus. Real results — every single day.
            </p>
          </Reveal>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {items.map((it, i) => (
            <Reveal
              key={i}
              delay={i * 0.04}
              className={it.wide ? "col-span-2 md:col-span-2" : ""}
            >
              <motion.div
                whileHover={{ scale: 1.015 }}
                transition={{ duration: 0.4, ease }}
                className="group relative overflow-hidden rounded-2xl border border-border/60"
                style={{ aspectRatio: it.wide ? "16/7" : "4/3" }}
              >
                <img
                  src={it.src}
                  alt={it.alt}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/75 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-85" />
                <div className="absolute bottom-3 left-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/80">
                  {it.alt}
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── pricing ─── */

function Pricing() {
  const plans = [
    {
      name: "Half Day",
      tag: "5 hours per day",
      price: "₹599",
      period: "/month",
      features: [
        "5 hours daily access",
        "Choose morning or evening slot",
        "High-speed WiFi",
        "RO water & washrooms",
        "Power backup",
        "CCTV secured premises",
      ],
      cta: "Get Started",
      featured: false,
    },
    {
      name: "Full Day",
      tag: "Most popular",
      price: "₹999",
      period: "/month",
      featured: true,
      features: [
        "Unlimited daily access",
        "Reserved seat",
        "High-speed WiFi",
        "Newspapers & magazines",
        "Printing credits",
        "Discussion area access",
        "RO water & washrooms",
      ],
      cta: "Choose Full Day",
    },
    {
      name: "Quarterly",
      tag: "Best value · 3 months",
      price: "₹2,499",
      period: "/3 months",
      features: [
        "Full day access · 3 months",
        "Save ₹498 vs monthly",
        "Reserved seat",
        "Priority cabin booking",
        "Newspapers & magazines",
        "Unlimited printing*",
        "Free trial day for a friend",
      ],
      cta: "Go Quarterly",
      featured: false,
    },
  ];
  return (
    <section id="pricing" className="py-28 md:py-36">
      <div className="container-px mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionLabel>Membership Plans</SectionLabel>
          <h2 className="font-display mt-6 text-balance text-4xl font-bold leading-tight sm:text-5xl md:text-[60px]">
            Simple plans.<br />
            <span className="text-muted-foreground">Serious value.</span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            Try any plan free for a day. Cancel anytime. Switch plans on the go.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08}>
              {p.featured ? (
                /* Featured card with gradient border */
                <div
                  className="relative h-full rounded-3xl p-[1px] featured-glow"
                  style={{
                    background: "linear-gradient(135deg, oklch(0.60 0.26 285), oklch(0.50 0.18 260 / 0.5) 50%, oklch(0.60 0.26 285))",
                  }}
                >
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3, ease }}
                    className="relative flex h-full flex-col overflow-hidden rounded-[calc(1.5rem-1px)] bg-card p-7 md:p-8"
                  >
                    <div className="pointer-events-none absolute inset-0 -z-0 bg-[radial-gradient(ellipse_at_top,oklch(0.60_0.26_285/0.12),transparent_60%)]" />
                    <div className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-accent/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-accent">
                      <Star className="size-3 fill-current" /> Most Popular
                    </div>
                    <PricingCardContent plan={p} />
                  </motion.div>
                </div>
              ) : (
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3, ease }}
                  className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card p-7 md:p-8 card-glow"
                >
                  <PricingCardContent plan={p} />
                </motion.div>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingCardContent({ plan }: { plan: { name: string; tag: string; price: string; period: string; features: string[]; cta: string; featured?: boolean } }) {
  return (
    <>
      <div>
        <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{plan.tag}</div>
        <h3 className="font-display mt-2 text-3xl font-bold">{plan.name}</h3>
      </div>
      <div className="mt-6 flex items-baseline gap-1">
        <span className="font-stat text-5xl font-bold tracking-tight">{plan.price}</span>
        <span className="text-sm text-muted-foreground">{plan.period}</span>
      </div>
      <ul className="mt-7 grow space-y-3">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-sm text-foreground/85">
            <span className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full ${plan.featured ? "bg-accent/20 text-accent" : "bg-secondary text-foreground/70"}`}>
              <Check className="size-3" strokeWidth={3} />
            </span>
            {f}
          </li>
        ))}
      </ul>
      <a
        href={planWA(plan.name, plan.price, plan.period)}
        target="_blank"
        rel="noreferrer"
        className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold transition-all hover:scale-[1.01] ${
          plan.featured
            ? "bg-accent text-accent-foreground shadow-md shadow-accent/30 hover:shadow-lg hover:shadow-accent/40"
            : "bg-foreground text-background hover:bg-foreground/90"
        }`}
      >
        <svg viewBox="0 0 24 24" className="size-4 fill-current shrink-0">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        {plan.cta} on WhatsApp
      </a>
    </>
  );
}

/* ─── testimonials (grid) ─── */

function Testimonials() {
  const data = [
    { name: "Aarav Singh", exam: "UPSC Aspirant", rating: 5, text: "The focus environment here is unreal. I went from 4 hours of study at home to 11 hours here, easily. The cabins are a game-changer." },
    { name: "Priya Verma", exam: "Banking — IBPS PO", rating: 5, text: "Finally a library that feels modern. Clean washrooms, AC, super-fast WiFi, and zero distractions. Cracked my prelims studying here." },
    { name: "Rohan Kumar", exam: "NIMCET", rating: 5, text: "I used to bounce between cafes. Super Digital Library gave me a real desk, real silence, and real consistency. Worth every rupee." },
    { name: "Sanya Mishra", exam: "CAT", rating: 5, text: "The discussion area for mock review is brilliant. The vibe is serious — everyone around you is grinding. It pushes you to do more." },
    { name: "Vikram Yadav", exam: "PCS", rating: 5, text: "Open 24×7 is the killer feature for me. I study late nights and the staff is always supportive. The setup feels premium." },
    { name: "Neha Tripathi", exam: "Judiciary", rating: 5, text: "Clean, quiet and disciplined. The newspaper corner saves me an hour daily. I recommend it to every serious aspirant in Kanpur." },
  ];

  return (
    <section className="py-28 md:py-36">
      <div className="container-px mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionLabel>Student Stories</SectionLabel>
          <h2 className="font-display mt-6 text-balance text-4xl font-bold leading-tight sm:text-5xl md:text-[60px]">
            Loved by serious students.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {data.map((d, i) => (
            <Reveal key={d.name} delay={i * 0.05}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease }}
                className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6 card-glow"
              >
                <div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: d.rating }).map((_, j) => (
                      <Star key={j} className="size-3.5 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-foreground/85">"{d.text}"</p>
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-full bg-accent/15 text-xs font-bold text-accent">
                    {d.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{d.name}</div>
                    <div className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">{d.exam}</div>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ ─── */

function FAQ() {
  const items = [
    { q: "What are the library timings?", a: "Super Digital Library is open 24×7, 365 days a year. You can choose a day shift, night shift, or a 24-hour Elite plan." },
    { q: "What membership plans do you offer?", a: "We offer Starter, Professional and Elite plans. Each tier unlocks more access, reserved seating and premium amenities like private cabins and lockers." },
    { q: "Can I try the library before joining?", a: "Yes. You can book a free trial day to experience the space, WiFi, cabins and study environment before committing to a plan." },
    { q: "How do I check seat availability?", a: "Call us on 8953999079 or send a WhatsApp message — we'll instantly confirm available seats and cabin slots for your preferred shift." },
    { q: "How does registration work?", a: "Fill the contact form or call us. We'll guide you through a quick verification, pick a plan, allot your seat and you're set to study the same day." },
    { q: "How fast is the WiFi?", a: "We provide fiber-grade high-speed WiFi suitable for online classes, mock tests, large downloads and seamless research." },
    { q: "What about power cuts?", a: "We have full power backup with UPS + inverter coverage, so your study session is never interrupted." },
    { q: "Is the facility safe?", a: "Yes. The entire facility is monitored 24×7 by CCTV, with separate washrooms for boys and girls and a controlled-entry policy." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-28 md:py-36">
      <div className="container-px mx-auto max-w-4xl">
        <Reveal className="text-center">
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="font-display mt-6 text-balance text-4xl font-bold leading-tight sm:text-5xl md:text-[60px]">
            Questions, answered.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-12 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
            {items.map((it, i) => (
              <div key={it.q}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition-colors hover:bg-white/3 md:px-8 md:py-6"
                >
                  <span className="font-display text-base font-semibold md:text-lg">{it.q}</span>
                  <span
                    className={`grid size-8 shrink-0 place-items-center rounded-full border border-border transition-all duration-300 ${
                      open === i ? "rotate-45 bg-accent border-accent text-accent-foreground" : "text-muted-foreground"
                    }`}
                  >
                    <Plus className="size-3.5" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-sm text-muted-foreground leading-relaxed md:px-8">{it.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── location ─── */

function Location() {
  return (
    <section className="py-28 md:py-36">
      <div className="container-px mx-auto max-w-7xl">
        <div className="grid items-stretch gap-5 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-8">
              <SectionLabel>Find Us</SectionLabel>
              <h2 className="font-display mt-6 text-3xl font-bold leading-tight md:text-4xl">
                Yashoda Nagar Road, Kanpur — 208011.
              </h2>
              <div className="mt-6 flex items-start gap-3 text-muted-foreground">
                <MapPin className="mt-1 size-5 shrink-0 text-accent" />
                <div className="text-sm leading-relaxed">
                  {ADDRESS_LINES.map((l) => <div key={l}>{l}</div>)}
                </div>
              </div>
              <div className="mt-auto grid grid-cols-1 gap-3 pt-8 sm:grid-cols-3">
                <a
                  href={`tel:${PHONE}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-accent-foreground shadow-md shadow-accent/25 transition-all hover:scale-[1.02]"
                >
                  <Phone className="size-4" /> Call Now
                </a>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-4 py-3 text-sm font-semibold transition-colors hover:bg-white/5"
                >
                  <MapPin className="size-4" /> Directions
                </a>
                <a
                  href={WA}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-success/15 px-4 py-3 text-sm font-semibold text-success transition-all hover:bg-success/20"
                >
                  <MessageCircle className="size-4" /> WhatsApp
                </a>
              </div>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-3" delay={0.1}>
            <div className="relative h-full min-h-[360px] overflow-hidden rounded-3xl border border-border">
              <iframe
                title="Super Digital Library location"
                className="size-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={MAPS_EMBED}
              />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-border" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── contact form ─── */

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <section id="contact" className="py-28 md:py-36">
      <div className="container-px mx-auto max-w-4xl">
        <Reveal className="text-center">
          <SectionLabel variant="accent">Book Your Free Trial</SectionLabel>
          <h2 className="font-display mt-6 text-balance text-4xl font-bold leading-tight sm:text-5xl md:text-[60px]">
            Start studying without<br />
            distractions — today.
          </h2>
          <p className="mt-5 text-muted-foreground">
            Drop your details and we'll confirm your free trial seat within minutes.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <form
            onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
            className="mt-12 rounded-3xl border border-border bg-card p-6 md:p-10"
          >
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Full Name" name="name" placeholder="Your name" required />
              <Field label="Phone Number" name="phone" placeholder="10-digit mobile" required type="tel" />
              <div className="md:col-span-2">
                <Field label="Email" name="email" placeholder="you@email.com" type="email" />
              </div>
              <div className="md:col-span-2">
                <label className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Message</label>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Which exam are you preparing for? Preferred shift?"
                  className="mt-2 w-full resize-none rounded-xl border border-border bg-background/60 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-accent focus:bg-background"
                />
              </div>
            </div>
            <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs text-muted-foreground">By submitting, you agree to be contacted about your trial.</p>
              <button
                type="submit"
                disabled={submitted}
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-7 py-3.5 text-sm font-semibold text-accent-foreground shadow-md shadow-accent/25 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-accent/35 disabled:opacity-60"
              >
                {submitted
                  ? <><Check className="size-4" /> Trial Requested</>
                  : <>Book Your Free Trial <ArrowRight className="size-4" /></>}
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label, name, placeholder, required, type = "text",
}: { label: string; name: string; placeholder?: string; required?: boolean; type?: string }) {
  return (
    <div>
      <label htmlFor={name} className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
        {label}{required && <span className="text-accent"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-accent focus:bg-background"
      />
    </div>
  );
}

/* ─── whatsapp floating badge ─── */

function WhatsAppBadge() {
  return (
    <a
      href={WA}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 left-6 z-50 flex items-center gap-3 rounded-full shadow-xl shadow-black/30 transition-all duration-300 hover:scale-105"
      style={{ background: "#25D366" }}
    >
      <div className="flex items-center gap-2.5 py-3 pl-4 pr-5">
        <svg viewBox="0 0 24 24" className="size-5 shrink-0 fill-white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span className="text-sm font-semibold text-white">Chat with us</span>
      </div>
    </a>
  );
}

/* ─── footer ─── */

function Footer() {
  return (
    <footer className="border-t border-border bg-card/20">
      <div className="container-px mx-auto max-w-7xl py-16">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <div className="relative grid size-9 place-items-center rounded-xl bg-accent text-accent-foreground shadow-md shadow-accent/25">
                <BookOpen className="size-4" strokeWidth={2.5} />
              </div>
              <span className="font-display text-base font-bold tracking-tight">Super Digital Library</span>
            </div>
            <p className="mt-5 max-w-sm text-sm text-muted-foreground leading-relaxed">
              Study without distractions. Built for focus. Designed for success. Kanpur's premium 24×7 study ecosystem.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <a
                href={`tel:${PHONE}`}
                className="inline-flex items-center gap-2 rounded-xl border border-border px-3.5 py-2 text-xs font-medium hover:bg-white/5 transition-colors"
              >
                <Phone className="size-3.5 text-accent" /> {PHONE}
              </a>
              <a
                href={WA}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-border px-3.5 py-2 text-xs font-medium text-success hover:bg-white/5 transition-colors"
              >
                <MessageCircle className="size-3.5" /> WhatsApp
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-3">
            <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Quick Links</div>
            <ul className="mt-5 space-y-3 text-sm">
              {[
                ["Why Us", "#why"],
                ["Facilities", "#facilities"],
                ["Gallery", "#gallery"],
                ["Pricing", "#pricing"],
                ["Contact", "#contact"],
              ].map(([l, h]) => (
                <li key={l}>
                  <a href={h} className="text-foreground/70 hover:text-foreground transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Address */}
          <div className="md:col-span-4">
            <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Visit Us</div>
            <div className="mt-5 text-sm leading-relaxed text-foreground/75">
              {ADDRESS_LINES.map((l) => <div key={l}>{l}</div>)}
              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border px-3.5 py-1.5 text-xs font-medium">
                <span className="size-1.5 animate-pulse rounded-full bg-success" /> Open 24×7
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-7 text-xs text-muted-foreground md:flex-row">
          <div>© {new Date().getFullYear()} Super Digital Library. All rights reserved.</div>
          <div className="font-display tracking-tight">Built for focus. Designed for success.</div>
        </div>
      </div>
    </footer>
  );
}
