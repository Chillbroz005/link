"use client";

import { useEffect, useMemo, useState } from "react";
import { BASE } from "../data/base";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight, ChevronDown, Download, ExternalLink, Github,
  Linkedin, Mail, MapPin, Menu, Moon, Phone, Send, Sun, X, Award, Briefcase, Cpu, Layers
} from "lucide-react";
import { profile, experience, engagements, skills, software, tools, education, certifications, projects } from "../data/profile";

const nav = [
  ["about", "About"],
  ["journey", "Journey"],
  ["expertise", "Expertise"],
  ["achievements", "Achievements"],
  ["projects", "Projects"],
  ["github", "GitHub"],
  ["education", "Education"],
  ["contact", "Contact"]
];

const projectFilters = ["All", "Procurement", "Automation", "Android", "Other"];

type GithubRepo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
  fork: boolean;
};

export default function Home() {
  const [dark, setDark] = useState(true);
  const [mobile, setMobile] = useState(false);
  const [recruiter, setRecruiter] = useState(false);
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [repoStatus, setRepoStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    try { localStorage.setItem("suresh-theme", dark ? "dark" : "light"); } catch {}
  }, [dark]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("suresh-theme");
      if (saved) setDark(saved !== "light");
    } catch {}
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0);
      setShowTop(window.scrollY > 700);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`https://api.github.com/users/${profile.githubUsername}/repos?sort=updated&per_page=6`, {
      signal: controller.signal,
      headers: { Accept: "vnd.github+json" }
    })
      .then(r => {
        if (!r.ok) throw new Error("GitHub API unavailable");
        return r.json();
      })
      .then((data: GithubRepo[]) => {
        setRepos(data.filter(r => !r.fork));
        setRepoStatus("ready");
      })
      .catch(() => setRepoStatus("error"));
    return () => controller.abort();
  }, []);

  const filtered = useMemo(() => {
    if (filter === "All") return projects;
    return projects.filter(p => p.category === filter);
  }, [filter]);

  return (
    <main id="top">
      <div className="scrollProgress" style={{ width: `${progress}%` }} aria-hidden="true" />

      {/* Navigation */}
      <header className="nav">
        <a className="brand" href="#top" aria-label="Suresh Ganesan home">
          SG<span>.</span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {nav.map(([id, label]) => (
            <a key={id} href={`#${id}`}>{label}</a>
          ))}
        </nav>
        <div className="navActions">
          <button onClick={() => setDark(!dark)} aria-label="Toggle dark and light mode">
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="recruiterBtn" onClick={() => setRecruiter(true)}>
            30-Second Profile
          </button>
          <button className="mobileOnly" onClick={() => setMobile(!mobile)} aria-label="Open mobile navigation">
            {mobile ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {mobile && (
        <div className="mobileNav" style={{
          position: "fixed", top: "80px", left: 0, right: 0, zIndex: 49,
          background: "var(--panel)", borderBottom: "1px solid var(--line)", padding: "1.5rem",
          display: "flex", flexDirection: "column", gap: "1rem"
        }}>
          {nav.map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={() => setMobile(false)} style={{ fontSize: "16px", fontWeight: 600 }}>
              {label}
            </a>
          ))}
        </div>
      )}

      {/* Hero Bento Grid */}
      <section className="hero-section">
        <div className="bento-hero-grid">
          <div className="bento-card hero-main">
            <div>
              <span className="eyebrow">SUPPLY CHAIN • PROCUREMENT • PROJECTS</span>
              <h1 className="hero-title">{profile.name}</h1>
              <h2 className="hero-subtitle">{profile.title}</h2>
              <p className="hero-tagline">{profile.tagline}</p>
            </div>
            <div>
              <div className="hero-btns">
                <a className="primary-btn" href={`${BASE}/resume.pdf`} download>
                  <Download size={17} /> Download Resume
                </a>
                <a className="secondary-btn" href="#projects">
                  View Projects <ArrowUpRight size={17} />
                </a>
              </div>
              <div style={{ display: "flex", gap: "1.5rem", marginTop: "2rem", flexWrap: "wrap" }}>
                <a href={profile.linkedin} target="_blank" rel="noreferrer" style={{ display: "flex", gap: "8px", alignItems: "center", color: "var(--muted)", fontSize: "13px", fontWeight: 600 }}>
                  <Linkedin size={16} /> LinkedIn
                </a>
                <a href={profile.github} target="_blank" rel="noreferrer" style={{ display: "flex", gap: "8px", alignItems: "center", color: "var(--muted)", fontSize: "13px", fontWeight: 600 }}>
                  <Github size={16} /> GitHub
                </a>
                <a href={`mailto:${profile.email}`} style={{ display: "flex", gap: "8px", alignItems: "center", color: "var(--muted)", fontSize: "13px", fontWeight: 600 }}>
                  <Mail size={16} /> Email
                </a>
              </div>
            </div>
          </div>

          <div className="bento-card hero-sidebar">
            <img className="profile-photo" src={`${BASE}/profile-photo.png`} alt="Suresh Ganesan professional portrait" loading="eager" />
            <div className="profile-stat">
              <span>Location</span>
              <strong>{profile.location}</strong>
            </div>
            <div className="profile-stat">
              <span>Experience</span>
              <strong>{profile.experienceYears}</strong>
            </div>
            <div className="profile-stat">
              <span>Global Reach</span>
              <strong>6+ Countries</strong>
            </div>
          </div>
        </div>

        {/* Metrics Strip */}
        <div className="metrics-grid">
          <div className="metric-card">
            <strong>1800 Million</strong>
            <span>Modernization & Expansion Project (MEP)</span>
          </div>
          <div className="metric-card">
            <strong>1200 Million</strong>
            <span>AOP (CAPEX & Civil projects)</span>
          </div>
          <div className="metric-card">
            <strong>500 Million</strong>
            <span>Naidupeta AP fire-damage restoration</span>
          </div>
          <div className="metric-card">
            <strong>35+ / Awards</strong>
            <span>Kaizens & QCFI Gold / Best Employee</span>
          </div>
        </div>
      </section>

      {/* About Bento Section */}
      <Section id="about" eyebrow="01 / ABOUT ME" title="Commercial thinking, technical depth, operational discipline.">
        <div className="bento-grid-2">
          <div className="bento-card col-7">
            <span className="eyebrow">Professional Summary</span>
            <p className="lead-text" style={{ marginTop: "1rem" }}>{profile.summary}</p>
            <div className="pill-cloud" style={{ marginTop: "1.5rem" }}>
              {profile.regions.map(region => (
                <span key={region}>🌍 {region}</span>
              ))}
            </div>
          </div>
          <div className="bento-card col-5">
            <span className="eyebrow">Quick Facts</span>
            <div className="fact-subgrid" style={{ marginTop: "1rem" }}>
              <div className="mini-fact">
                <span>Industry</span>
                <strong>Manufacturing & SCM</strong>
              </div>
              <div className="mini-fact">
                <span>Core Domain</span>
                <strong>Strategic Sourcing & P2P</strong>
              </div>
              <div className="mini-fact">
                <span>Engineering</span>
                <strong>B.E. Mechanical</strong>
              </div>
              <div className="mini-fact">
                <span>Languages</span>
                <strong>Tamil & English</strong>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Career Journey */}
      <Section id="journey" eyebrow="02 / CAREER JOURNEY" title="A procurement career built around projects, suppliers and delivery.">
        <div className="timeline-container">
          {experience.map((e, i) => (
            <motion.div className="timeline-card" key={e.company} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <button className="timeline-header" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                <div>
                  <span className="date-badge">{e.dates}</span>
                  <h3>{e.role}</h3>
                  <p>{e.company} · {e.location}</p>
                </div>
                <ChevronDown size={20} style={{ transform: open === i ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div className="timeline-body" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                    <ul>
                      {e.bullets.map(b => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Core Expertise */}
      <Section id="expertise" eyebrow="03 / CORE EXPERTISE" title="The operating system behind the work.">
        <div className="bento-grid-2">
          <div className="bento-card col-12">
            <span className="eyebrow">Procurement & SCM Competencies</span>
            <div className="pill-cloud" style={{ marginTop: "1.25rem" }}>
              {skills.map(s => <span key={s}>{s}</span>)}
            </div>
          </div>
          <div className="bento-card col-6" style={{ gridColumn: "span 6" }}>
            <span className="eyebrow">Software Systems</span>
            <div className="pill-cloud" style={{ marginTop: "1.25rem" }}>
              {software.map(s => <span key={s} style={{ background: "rgba(99, 102, 241, 0.05)" }}>💻 {s}</span>)}
            </div>
          </div>
          <div className="bento-card col-6" style={{ gridColumn: "span 6" }}>
            <span className="eyebrow">Tools & Platforms</span>
            <div className="pill-cloud" style={{ marginTop: "1.25rem" }}>
              {tools.map(t => <span key={t} style={{ background: "rgba(16, 185, 129, 0.05)" }}>🛠️ {t}</span>)}
            </div>
          </div>
        </div>
      </Section>

      {/* Achievements */}
      <Section id="achievements" eyebrow="04 / ACHIEVEMENTS & RECOGNITION" title="Documented outcomes and industry recognition.">
        <div className="achievements-grid">
          {profile.achievements.map((a, i) => (
            <motion.div className="achievement-bento" key={a} whileHover={{ y: -5 }}>
              <span>0{i + 1} // AWARD</span>
              <p>{a}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Projects */}
      <Section id="projects" eyebrow="05 / PROJECTS & ENGAGEMENTS" title="Selected project engagements and verified public work.">
        <div className="filter-tabs" role="tablist" aria-label="Project filters">
          {projectFilters.map(f => (
            <button role="tab" aria-selected={filter === f} className={`filter-tab ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)} key={f}>
              {f}
            </button>
          ))}
        </div>
        <div className="projects-grid">
          {filtered.length ? filtered.map(p => (
            <article className="project-card" key={p.title}>
              <div>
                <div className="project-top">
                  <span>{p.category}</span>
                  <ArrowUpRight size={18} />
                </div>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <div className="project-tags">
                  {p.technologies.map(t => <span key={t}>{t}</span>)}
                </div>
              </div>
              {p.github && (
                <a href={p.github} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "var(--accent)", fontSize: "13px", fontWeight: 700 }}>
                  View Repository <ExternalLink size={14} />
                </a>
              )}
            </article>
          )) : (
            <div className="bento-card" style={{ gridColumn: "1/-1", textAlign: "center", color: "var(--muted)" }}>
              No resume-verified project has been documented for this filter yet.
            </div>
          )}
        </div>

        <div className="bento-card" style={{ marginTop: "2rem" }}>
          <span className="eyebrow">KEY ENGAGEMENTS & MILESTONES</span>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem", marginTop: "1.5rem" }}>
            {engagements.map(x => (
              <div key={x} style={{ padding: "1.25rem", background: "rgba(255,255,255,0.02)", border: "1px solid var(--line)", borderRadius: "14px", color: "var(--muted)", fontSize: "14px", fontWeight: 500 }}>
                {x}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* GitHub Section */}
      <Section id="github" eyebrow="06 / GITHUB ACTIVITY" title="Public repository activity and code contributions.">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
          <p style={{ color: "var(--muted)", maxWidth: "600px", margin: 0 }}>
            Repositories are loaded live from GitHub's public API. Only publicly returned repository metadata is displayed.
          </p>
          <a className="secondary-btn" href={profile.githubProfile} target="_blank" rel="noreferrer">
            <Github size={16} /> Open GitHub Profile
          </a>
        </div>
        {repoStatus === "loading" && <div className="bento-card" style={{ textAlign: "center", color: "var(--muted)" }}>Loading public repositories…</div>}
        {repoStatus === "error" && <div className="bento-card" style={{ textAlign: "center", color: "var(--muted)" }}>GitHub repository data could not be loaded right now. Your supplied GitHub link remains available above.</div>}
        {repoStatus === "ready" && (
          <div className="repo-grid">
            {repos.length ? repos.map(r => (
              <a className="repo-card" href={r.html_url} target="_blank" rel="noreferrer" key={r.id}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "var(--accent)", fontSize: "11px", fontWeight: 700, textTransform: "uppercase" }}>
                    <span>{r.language || "Public Repository"}</span>
                    <Github size={16} />
                  </div>
                  <h3>{r.name}</h3>
                  <p>{r.description || "No public description supplied."}</p>
                </div>
                <small style={{ color: "var(--muted)", fontSize: "12px" }}>★ {r.stargazers_count} · Updated {new Date(r.updated_at).toLocaleDateString()}</small>
              </a>
            )) : (
              <div className="bento-card" style={{ gridColumn: "1/-1", textAlign: "center", color: "var(--muted)" }}>No public repositories were returned by the GitHub API.</div>
            )}
          </div>
        )}
      </Section>

      {/* Education & Certifications */}
      <Section id="education" eyebrow="07 / EDUCATION & CERTIFICATIONS" title="Engineering foundation and continuous professional training.">
        <div className="bento-grid-2">
          <div className="bento-card col-7">
            <span className="eyebrow">Academic Background</span>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginTop: "1.5rem" }}>
              {education.map(e => (
                <div key={e.degree} style={{ paddingBottom: "1.25rem", borderBottom: "1px solid var(--line)" }}>
                  <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--accent)" }}>{e.year}</span>
                  <h3 style={{ fontSize: "18px", fontWeight: 800, margin: "4px 0" }}>{e.degree}</h3>
                  <p style={{ color: "var(--muted)", margin: 0, fontSize: "14px" }}>{e.institution}</p>
                  <strong style={{ fontSize: "13px", marginTop: "4px", display: "block" }}>{e.detail}</strong>
                </div>
              ))}
            </div>
          </div>
          <div className="bento-card col-5">
            <span className="eyebrow">Certifications</span>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1.5rem" }}>
              {certifications.map(c => (
                <div key={c} style={{ padding: "1.25rem", background: "rgba(255,255,255,0.02)", border: "1px solid var(--line)", borderRadius: "14px", fontWeight: 700 }}>
                  🏆 {c}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Contact Section */}
      <Section id="contact" eyebrow="08 / CONTACT" title="Let's connect around procurement, SCM and project delivery.">
        <div className="contact-grid">
          <div className="contact-info-list">
            <a className="contact-item" href={`mailto:${profile.email}`}>
              <Mail size={20} style={{ color: "var(--accent)" }} />
              <span>{profile.email}</span>
            </a>
            {profile.phones.map(p => (
              <a className="contact-item" href={`tel:${p.replace(/\s/g, "")}`} key={p}>
                <Phone size={20} style={{ color: "var(--accent)" }} />
                <span>{p}</span>
              </a>
            ))}
            <div className="contact-item">
              <MapPin size={20} style={{ color: "var(--accent)" }} />
              <span>{profile.location}</span>
            </div>
            <a className="contact-item" href={profile.linkedin} target="_blank" rel="noreferrer">
              <Linkedin size={20} style={{ color: "var(--accent)" }} />
              <span>LinkedIn Profile</span>
            </a>
            <a className="contact-item" href={profile.github} target="_blank" rel="noreferrer">
              <Github size={20} style={{ color: "var(--accent)" }} />
              <span>GitHub Profile</span>
            </a>
          </div>

          <form className="contact-form" action={`mailto:${profile.email}`} method="post" encType="text/plain">
            <label>
              Your Name
              <input name="name" required placeholder="Name" />
            </label>
            <label>
              Your Email
              <input name="email" type="email" required placeholder="you@example.com" />
            </label>
            <label>
              Message
              <textarea name="message" rows={5} required placeholder="How can we connect?" />
            </label>
            <button className="primary-btn" type="submit" style={{ justifyContent: "center", width: "100%" }}>
              <Send size={16} /> Send via Email
            </button>
          </form>
        </div>
      </Section>

      {/* Footer */}
      <footer>
        <span>© {new Date().getFullYear()} {profile.name}. All rights reserved.</span>
        <span>Supply Chain · Procurement · Projects</span>
      </footer>

      {/* Floating Action Buttons */}
      {showTop && (
        <button className="back-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top">
          ↑
        </button>
      )}
      <a className="float-resume" href={`${BASE}/resume.pdf`} download>
        <Download size={16} /> Resume PDF
      </a>

      {/* Recruiter Modal */}
      <AnimatePresence>
        {recruiter && (
          <div className="modal-backdrop">
            <motion.div className="recruiter-modal" initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}>
              <button className="modal-close" onClick={() => setRecruiter(false)} aria-label="Close modal">
                <X size={18} />
              </button>
              <span className="eyebrow">30-SECOND RECRUITER PROFILE</span>
              <h2 style={{ fontSize: "28px", fontWeight: 900, margin: "8px 0 4px 0" }}>{profile.name}</h2>
              <p style={{ color: "var(--muted)", fontSize: "16px", marginBottom: "2rem" }}>{profile.title}</p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem", marginBottom: "2rem" }}>
                <div className="mini-fact">
                  <span>Experience</span>
                  <strong>{profile.experienceYears}</strong>
                </div>
                <div className="mini-fact">
                  <span>Latest Role</span>
                  <strong>{experience[0].company}</strong>
                </div>
                <div className="mini-fact" style={{ gridColumn: "span 2" }}>
                  <span>Global Coverage</span>
                  <strong>{profile.regions.join(" · ")}</strong>
                </div>
              </div>

              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <a className="primary-btn" href={`${BASE}/resume.pdf`} download>
                  <Download size={16} /> Download Resume
                </a>
                <a className="secondary-btn" href={profile.linkedin} target="_blank" rel="noreferrer">
                  <Linkedin size={16} /> LinkedIn
                </a>
                <a className="secondary-btn" href={`mailto:${profile.email}`}>
                  <Mail size={16} /> Email
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}

function Section({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="section wrap">
      <div className="section-header">
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  );
}
