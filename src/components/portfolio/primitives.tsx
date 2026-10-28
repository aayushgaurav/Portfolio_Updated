import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { useState, useEffect, type ReactNode } from "react";
import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, type: "tween" } },
};

export const stagger = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, type: "tween", delay } },
});

export const scaleIn = (delay = 0): Variants => ({
  hidden: { opacity: 0, scale: 0.85 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4, type: "tween", delay } },
});

export function SectionHeading({ eyebrow, title, subtitle, id }: { eyebrow?: string; title: string; subtitle?: string; id?: string }) {
  return (
    <div className="mb-10 max-w-2xl md:mb-14">
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 id={id} className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">{title}</h2>
      {subtitle && <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">{subtitle}</p>}
    </div>
  );
}

export function Section({ id, children, className }: { id: string; children: ReactNode; className?: string }) {
  return (
    <motion.section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn("border-t border-border py-20 md:py-28", className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      variants={fadeUp}
    >
      <div className="container-page">{children}</div>
    </motion.section>
  );
}

export function Badge({ children, tone = "default" }: { children: ReactNode; tone?: "default" | "accent" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-medium",
        tone === "accent" ? "border-primary/40 bg-primary/10 text-primary" : "border-border bg-secondary text-secondary-foreground",
      )}
    >
      {children}
    </span>
  );
}

export function StatusPill({ status }: { status: string }) {
  const tone =
    status === "Deployed" ? "text-success border-success/40 bg-success/10" : status === "In Development" ? "text-warning border-warning/40 bg-warning/10" : "text-muted-foreground border-border bg-secondary";
  return <span className={cn("inline-flex rounded-full border px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider", tone)}>{status}</span>;
}

const btnBase =
  "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-2";
export const btn = {
  primary: cn(btnBase, "bg-primary text-primary-foreground hover:bg-primary/85"),
  outline: cn(btnBase, "border border-border bg-transparent text-foreground hover:border-primary/60 hover:bg-accent"),
  ghost: cn(btnBase, "px-2 text-muted-foreground hover:text-foreground"),
};

export function ExternalLink({ href, children, variant = "outline", className }: { href: string; children: ReactNode; variant?: keyof typeof btn; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cn(btn[variant], className)}>
      {children}
      <ArrowUpRight className="h-4 w-4" aria-hidden />
    </a>
  );
}

export function FlowDiagram({ steps, vertical = false, label, className }: { steps: string[]; vertical?: boolean; label: string; className?: string }) {
  return (
    <figure aria-label={label} className={cn("rounded-lg border border-border bg-background/60 p-3 md:p-4", className)}>
      <figcaption className="mb-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">Architecture diagram</figcaption>
      <ol className={cn("flex gap-1.5", vertical ? "flex-col items-stretch" : "flex-col items-stretch sm:flex-row sm:flex-wrap sm:items-center")}>
        {steps.map((s, i) => (
          <motion.li
            key={s}
            className={cn("flex items-center gap-1.5", vertical ? "flex-col" : "flex-col sm:flex-row")}
            initial={{ opacity: 0, scale: 0.88 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.1, type: "tween" }}
          >
            <span
              className={cn(
                "w-full rounded-md border px-2.5 py-1.5 text-center text-xs font-medium sm:w-auto",
                i === 0 || i === steps.length - 1 ? "border-primary/50 bg-primary/10 text-foreground" : "border-border bg-card text-secondary-foreground",
                vertical && "sm:w-full",
              )}
            >
              {s}
            </span>
            {i < steps.length - 1 &&
              (vertical ? (
                <ArrowDown className="h-4 w-4 text-primary" aria-hidden />
              ) : (
                <>
                  <ArrowDown className="h-4 w-4 text-primary sm:hidden" aria-hidden />
                  <ArrowRight className="hidden h-4 w-4 text-primary sm:block" aria-hidden />
                </>
              ))}
          </motion.li>
        ))}
      </ol>
    </figure>
  );
}

const HERO_DIAGRAMS: { label: string; title: string; steps: string[] }[] = [
  {
    label: "RAG pipeline",
    title: "How a RAG app answers",
    steps: ["User Query", "Retrieval System", "Augmentation", "LLM API", "Generated Response"],
  },
  {
    label: "n8n automation workflow",
    title: "How Extraction n8n automation works",
    steps: ["Trigger", "Fetch Data", "AI Extraction", "Normalize", "Google Sheets"],
  },
  {
    label: "AWS serverless pipeline",
    title: "Serverless document pipeline",
    steps: ["S3 Upload", "Lambda Trigger", "Bedrock AI", "Classification", "Storage"],
  },
  {
    label: "LLM API integration",
    title: "LLM API integration flow",
    steps: ["User Input", "Prompt Builder", "Groq / Gemini API", "Response Parser", "UI Output"],
  },
];

export function RotatingFlowDiagram({ className }: { className?: string }) {
  const [active, setActive] = useState(0);
  const diagram = HERO_DIAGRAMS[active]!;

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % HERO_DIAGRAMS.length), 3500);
    return () => clearInterval(id);
  }, []);

  return (
    <figure className={cn("rounded-lg border border-border bg-background/60 p-4 md:p-5", className)} aria-label={diagram.label}>
      <div className="mb-3 flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{diagram.title}</span>
        <div className="flex items-center gap-1.5" aria-hidden>
          {HERO_DIAGRAMS.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className={cn("h-1.5 rounded-full transition-all duration-300", i === active ? "w-4 bg-primary" : "w-1.5 bg-border hover:bg-muted-foreground")}
              aria-label={`Show diagram ${i + 1}`}
            />
          ))}
        </div>
      </div>
      <motion.ol
        key={active}
        className="flex flex-col items-stretch gap-1.5"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, type: "tween" }}
      >
        {diagram.steps.map((s, i) => (
          <li key={s} className="flex flex-col items-center gap-1.5">
            <span
              className={cn(
                "w-full rounded-md border px-2.5 py-1.5 text-center text-xs font-medium",
                i === 0 || i === diagram.steps.length - 1
                  ? "border-primary/50 bg-primary/10 text-foreground"
                  : "border-border bg-card text-secondary-foreground",
              )}
            >
              {s}
            </span>
            {i < diagram.steps.length - 1 && <ArrowDown className="h-4 w-4 text-primary" aria-hidden />}
          </li>
        ))}
      </motion.ol>
    </figure>
  );
}
