import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, type Variants } from "motion/react";
import { ArrowUp, Briefcase, Cloud, Cpu, Github, GraduationCap, Award, Linkedin, Mail, MapPin, Menu, Workflow, X, Star, Link2 } from "lucide-react";
import {
  automations, certifications, education, experience, focusAreas, navLinks, N8N_REPO, profile, projects, services, skillGroups, githubRepos,
  type Project,
} from "@/data/portfolio";
import { Badge, ExternalLink, FlowDiagram, RotatingFlowDiagram, Section, SectionHeading, StatusPill, btn, fadeUp, stagger, scaleIn } from "@/components/portfolio/primitives";
import { ContactForm, CopyEmailButton } from "@/components/portfolio/ContactForm";

const TITLE = "Aayush Gaurav | AI Automation Developer & Generative AI Engineer";
const DESC =
  "Explore the portfolio of Aayush Gaurav, an AI Automation Developer working with Generative AI, RAG applications, n8n workflows, LLM APIs, and AWS infrastructure.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Services />
        <GitHubRepos />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={`sticky top-0 z-50 border-b transition-colors ${scrolled || open ? "border-border bg-background/95 backdrop-blur" : "border-transparent bg-background"}`}>
      <nav aria-label="Primary" className="container-page flex h-16 items-center justify-between">
        <a href="#home" className="font-mono text-sm font-medium tracking-[0.18em] text-foreground">AAYUSH GAURAV</a>
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <li key={l.id}>
              <a href={`#${l.id}`} className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground">{l.label}</a>
            </li>
          ))}
        </ul>
        <a href="#contact" className={`${btn.primary} hidden py-2 lg:inline-flex`}>Let's Connect</a>
        <button type="button" className="rounded-md p-2 text-foreground lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((o) => !o)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>
      {open && (
        <div id="mobile-menu" className="border-t border-border lg:hidden">
          <ul className="container-page flex flex-col py-3">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} onClick={() => setOpen(false)} className="block rounded-md px-2 py-3 text-base text-foreground hover:bg-accent">{l.label}</a>
              </li>
            ))}
            <li className="pt-2">
              <a href="#contact" onClick={() => setOpen(false)} className={`${btn.primary} w-full`}>Let's Connect</a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="home" aria-labelledby="home-title" className="py-16 md:py-24 lg:py-28">
      <div className="container-page grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } } as Variants}
        >
          <motion.p variants={stagger(0)} className="eyebrow mb-5">Hello, I'm Aayush Gaurav</motion.p>
          <motion.h1 variants={stagger(0)} id="home-title" className="text-4xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-[3.4rem]">
            Building Practical AI Applications and <span className="text-primary">Intelligent Automations.</span>
          </motion.h1>
          <motion.p variants={stagger(0)} className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            I'm an AI Automation Developer focused on Generative AI, RAG applications, LLM integrations, and automated data workflows. I enjoy connecting AI, APIs, and software systems to solve practical problems.
          </motion.p>
          <motion.p variants={stagger(0)} className="mt-4 font-mono text-xs text-muted-foreground">{profile.title}</motion.p>
          <motion.div variants={stagger(0)} className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className={btn.primary}>Explore My Work</a>
            <a href="#contact" className={btn.outline}>Get In Touch</a>
          </motion.div>
          <motion.div variants={stagger(0)} className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-muted-foreground">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-foreground"><Github className="h-4 w-4" /> GitHub</a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-foreground"><Linkedin className="h-4 w-4" /> LinkedIn</a>
            <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-success" aria-hidden /> Based in India | Open to Opportunities</span>
          </motion.div>
        </motion.div>
        
<motion.div
  variants={fadeUp}
  initial="hidden"
  animate="show"
  transition={{ delay: 0.5 }}
  className="card-surface w-full max-w-[520px] h-[380px] mx-auto p-6 md:p-8 flex items-center justify-center overflow-hidden"
>
  <div className="w-full h-full">
    <RotatingFlowDiagram />
  </div>
</motion.div>

      </div>
    </section>
  );
}

function About() {
  const icons = [Cpu, Workflow, Cloud];
  return (
    <Section id="about">
      <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <SectionHeading id="about-title" eyebrow="About" title="About Me" subtitle="Building useful systems with AI, automation, and software." />
          <div className="space-y-4 leading-relaxed text-muted-foreground">
            <p>I'm an entry-level AI Automation Developer with a B.Tech in Computer Science Engineering, specializing in Cyber Security.</p>
            <p>My work focuses on building practical applications using Generative AI, retrieval-augmented generation, LLM APIs, and workflow automation.</p>
            <p>I've built and deployed a full-stack cyber threat intelligence assistant using Python, FastAPI, React, SQLite, and the Groq API. I've also developed an n8n-based data pipeline that uses Google Gemini to extract structured information from web pages.</p>
            <p>My professional background includes AWS infrastructure, environment separation, IAM permissions, VPC networking, and frontend development.</p>
            <p>I'm interested in building useful AI applications, automating repetitive tasks, and solving real engineering problems.</p>
          </div>
          <p className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="h-4 w-4 text-primary" /> {profile.location}</p>
        </div>
        <div className="grid content-start gap-4">
          {focusAreas.map((a, i) => {
            const Icon = icons[i]!;
            return (
              <motion.div
                key={a.title}
                className="card-surface flex gap-4 p-5"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={stagger(i * 0.12)}
              >
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                <div>
                  <h3 className="font-semibold text-foreground">{a.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{a.text}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

function Skills() {
  return (
    <Section id="skills">
      <SectionHeading id="skills-title" eyebrow="Skills" title="Technical Skills" subtitle="Tools and concepts I've used across projects and internships." />
      <div className="grid gap-4 md:grid-cols-2">
        {skillGroups.map((g, i) => (
          <motion.div
            key={g.title}
            className={`card-surface p-6 ${i === skillGroups.length - 1 ? "md:col-span-2" : ""}`}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger(i * 0.08)}
          >
            <h3 className="mb-4 text-sm font-semibold text-foreground">{g.title}</h3>
            <ul className="flex flex-wrap gap-2">
              {g.items.map((s, j) => (
                <motion.li key={s} initial="hidden" whileInView="show" viewport={{ once: true }} variants={scaleIn(j * 0.03)}>
                  <Badge>{s}</Badge>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function ProjectCard({ p, featured }: { p: Project; featured?: boolean }) {
  return (
    <motion.article
      className={`card-surface p-5 md:p-6 ${featured ? "border-primary/40" : ""}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      variants={fadeUp}
    >
      <div className="flex flex-wrap items-center gap-2">
        {featured && <span className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider text-primary"><Star className="h-3.5 w-3.5" /> Flagship project</span>}
        {p.status && <StatusPill status={p.status} />}
      </div>
      {featured ? (
        <div className="mt-3 grid grid-cols-1 items-start gap-4 lg:grid-cols-2">
          <div className="space-y-2">
            <p className="mt-2 font-mono text-xs text-muted-foreground">{p.category}</p>
            <h3 className="font-bold tracking-tight text-foreground text-2xl md:text-3xl">{p.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{p.description}</p>
            <ul className="space-y-1.5 text-sm text-muted-foreground pt-1">
              {p.features.map((f) => (
                <li key={f} className="flex gap-2"><span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden />{f}</li>
              ))}
            </ul>
          </div>
          <FlowDiagram steps={p.flow} vertical label={p.flow.join(" to ")} />
        </div>
      ) : (
        <div className="mt-3 space-y-3">
          <p className="mt-2 font-mono text-xs text-muted-foreground">{p.category}</p>
          <h3 className="mt-1 font-bold tracking-tight text-foreground text-xl md:text-2xl">{p.title}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">{p.description}</p>
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            {p.features.map((f) => (
              <li key={f} className="flex gap-2"><span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden />{f}</li>
            ))}
          </ul>
          <FlowDiagram steps={p.flow} vertical={false} label={p.flow.join(" to ")} />
        </div>
      )}
      {p.note && (
        <p className="mt-3 rounded-lg border border-border bg-background/60 p-3 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{p.status === "Architecture Design" ? "Status: " : p.status === "In Development" ? "Related: " : "Limitations: "}</span>
          {p.note}
        </p>
      )}
      <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Technology stack">
        {p.stack.map((s) => <li key={s}><Badge tone="accent">{s}</Badge></li>)}
      </ul>
      {p.links.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-3">
          {p.links.map((l) => <ExternalLink key={l.href} href={l.href} variant={l.primary ? "primary" : "outline"}>{l.label}</ExternalLink>)}
        </div>
      )}
    </motion.article>
  );
}

function Projects() {
  return (
    <Section id="projects">
      <SectionHeading id="projects-title" eyebrow="Projects" title="Featured Projects" subtitle="Projects demonstrating my work across AI applications, workflow automation, data pipelines, and cloud architecture." />
      <div className="space-y-6">
        {projects.map((p, i) => <ProjectCard key={p.title} p={p} featured={i === 0} />)}
      </div>

      <div id="automations" className="mt-20">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow mb-3">Automation</p>
            <h3 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">Automation Projects</h3>
            <p className="mt-3 text-muted-foreground">Exploring workflow automation, integrations, and structured data processing with n8n.</p>
            <p className="mt-2 text-xs text-muted-foreground">Descriptions come from each folder's README. Some folders contain Make.com blueprints alongside the n8n workflows.</p>
          </div>
          <ExternalLink href={N8N_REPO} className="self-start md:self-auto"><Github className="h-4 w-4" /> Repository</ExternalLink>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {automations.map((a, i) => (
            <motion.article
              key={a.title}
              className={`card-surface flex flex-col p-6 ${a.featured ? "sm:col-span-2 lg:col-span-2" : ""}`}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={stagger(i * 0.08)}
            >
              <Workflow className="h-5 w-5 text-primary" aria-hidden />
              <h4 className="mt-4 font-semibold text-foreground">{a.title}</h4>
              {a.description ? (
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.description}</p>
              ) : (
                <p className="mt-2 text-sm text-muted-foreground">Workflow file available in the repository.</p>
              )}
              {a.related && <p className="mt-3 inline-flex items-center gap-2 text-xs text-primary"><Link2 className="h-3.5 w-3.5" /> {a.related}</p>}
              {a.tags && (
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {a.tags.map((t) => <li key={t}><Badge>{t}</Badge></li>)}
                </ul>
              )}
              <div className="mt-auto pt-5">
                <ExternalLink href={a.href} variant="ghost" className="px-0 text-primary hover:text-foreground">View on GitHub</ExternalLink>
              </div>
            </motion.article>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <ExternalLink href={N8N_REPO} variant="primary">Explore All Automations</ExternalLink>
        </div>
      </div>
    </Section>
  );
}

function Experience() {
  return (
    <Section id="experience">
      <SectionHeading id="experience-title" eyebrow="Experience" title="Professional Experience" />
      <ol className="relative space-y-6 border-l border-border pl-6 md:pl-8">
        {experience.map((e, i) => (
          <motion.li
            key={e.role}
            className="relative"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger(i * 0.15)}
          >
            <span className="absolute -left-[31px] top-7 h-3 w-3 rounded-full border-2 border-primary bg-background md:-left-[39px]" aria-hidden />
            <article className="card-surface p-6 md:p-7">
              <div className="flex flex-col gap-1 md:flex-row md:items-start md:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{e.role}</h3>
                  <p className="text-sm text-primary">{e.company} · <span className="text-muted-foreground">{e.location}</span></p>
                </div>
                <p className="font-mono text-xs text-muted-foreground">{e.duration}</p>
              </div>
              <p className="mt-4 text-muted-foreground">{e.description}</p>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {e.points.map((p) => <li key={p} className="flex gap-2.5"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden />{p}</li>)}
              </ul>
              <ul className="mt-5 flex flex-wrap gap-1.5">{e.tech.map((t) => <li key={t}><Badge>{t}</Badge></li>)}</ul>
            </article>
          </motion.li>
        ))}
      </ol>
    </Section>
  );
}

function Education() {
  return (
    <Section id="education">
      <SectionHeading id="education-title" eyebrow="Education" title="Education & Certifications" />
      <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <motion.div className="card-surface p-6 md:p-7" initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
          <GraduationCap className="h-5 w-5 text-primary" aria-hidden />
          <h3 className="mt-4 text-lg font-semibold text-foreground">{education.degree}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{education.institution}</p>
          <div className="mt-5 flex flex-wrap gap-2"><Badge>{education.duration}</Badge><Badge tone="accent">CGPA {education.cgpa}</Badge></div>
        </motion.div>
        <ul className="grid gap-3">
          {certifications.map((c, i) => (
            <motion.li key={c.title} className="card-surface flex items-start gap-3 p-4" initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger(i * 0.1)}>
              <Award className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
              <div>
                <p className="text-sm font-semibold text-foreground">{c.title}</p>
                <p className="text-xs text-muted-foreground">{c.issuer}{c.year ? ` · ${c.year}` : ""}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

function Services() {
  return (
    <Section id="services">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading id="services-title" eyebrow="Services" title="AI Automation & Development" subtitle="I build practical AI applications and automations that connect APIs, existing tools, and data sources to reduce repetitive work." />
        <a href="#contact" className={`${btn.primary} mb-10 self-start md:mb-14 md:self-auto`}><Briefcase className="h-4 w-4" /> Discuss a Project</a>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {services.map((s, i) => (
          <motion.div key={s.title} className="card-surface p-6" initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger(i * 0.1)}>
            <h3 className="font-semibold text-foreground">{s.title}</h3>
            <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">Examples</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {s.items.map((item) => <li key={item} className="flex gap-2.5"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden />{item}</li>)}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function GitHubRepos() {
  const langColor: Record<string, string> = {
    Java: "bg-orange-400",
    HTML: "bg-red-400",
    CSS: "bg-blue-400",
  };
  return (
    <Section id="repos">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <SectionHeading id="repos-title" eyebrow="GitHub" title="Other Repositories" subtitle="Additional projects and learning exercises available on GitHub." />
        <ExternalLink href={profile.github} variant="outline" className="self-start md:self-auto"><Github className="h-4 w-4" /> View All</ExternalLink>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {githubRepos.map((r, i) => (
          <motion.a
            key={r.name}
            href={r.href}
            target="_blank"
            rel="noopener noreferrer"
            className="card-surface flex flex-col gap-3 p-4 hover:border-primary/60"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger(i * 0.05)}
          >
            <div className="flex items-start justify-between gap-2">
              <span className="font-mono text-sm font-medium text-foreground break-all">{r.name}</span>
              <Github className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
            </div>
            {r.tags && (
              <ul className="flex flex-wrap gap-1.5">
                {r.tags.map((t) => <li key={t}><Badge>{t}</Badge></li>)}
              </ul>
            )}
            <div className="mt-auto flex items-center gap-3 text-xs text-muted-foreground">
              {r.lang && (
                <span className="flex items-center gap-1.5">
                  <span className={`h-2.5 w-2.5 rounded-full ${langColor[r.lang] ?? "bg-muted-foreground"}`} aria-hidden />
                  {r.lang}
                </span>
              )}
              <span>Updated {r.updated}</span>
            </div>
          </motion.a>
        ))}
      </div>
    </Section>
  );
}

function Contact() {
  return (
    <Section id="contact">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <SectionHeading id="contact-title" eyebrow="Contact" title="Let's Connect" subtitle="I'm interested in opportunities involving AI automation, Generative AI development, LLM applications, and intelligent workflow systems. If you're a recruiter, developer, founder, or someone working on an interesting project, I'd love to connect." />
          <ul className="space-y-3 text-sm">
            <li><a href={`mailto:${profile.email}`} className="inline-flex items-center gap-3 text-foreground hover:text-primary"><Mail className="h-4 w-4 text-primary" /> {profile.email}</a></li>
            <li><a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-foreground hover:text-primary"><Linkedin className="h-4 w-4 text-primary" /> linkedin.com/in/aayush-gaurav</a></li>
            <li><a href={profile.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-foreground hover:text-primary"><Github className="h-4 w-4 text-primary" /> github.com/aayushgaurav</a></li>
          </ul>
          <div className="mt-6"><CopyEmailButton /></div>
        </div>
        <ContactForm />
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="container-page flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold text-foreground">Aayush Gaurav</p>
          <p className="mt-1 text-sm text-muted-foreground">Building useful AI systems, one workflow at a time.</p>
          <p className="mt-2 text-xs text-muted-foreground">© {new Date().getFullYear()} Aayush Gaurav</p>
        </div>
        <div className="flex items-center gap-2">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={btn.ghost}><Github className="h-5 w-5" /></a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={btn.ghost}><Linkedin className="h-5 w-5" /></a>
          <a href={`mailto:${profile.email}`} aria-label="Email" className={btn.ghost}><Mail className="h-5 w-5" /></a>
          <a href="#home" className={`${btn.outline} ml-2`}><ArrowUp className="h-4 w-4" /> Back to top</a>
        </div>
      </div>
    </footer>
  );
}
