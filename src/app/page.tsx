"use client";

import { useEffect, useMemo, useState } from "react";
import { BASE } from "../data/base";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight, ChevronDown, Download, ExternalLink, Github,
  Linkedin, Mail, MapPin, Menu, Moon, Phone, Send, Sun, X,
  Edit3, Save, Plus, Trash2, Key, CheckCircle, AlertCircle, RefreshCw, Sparkles, Lock, Unlock, Palette
} from "lucide-react";
import {
  profile as defaultProfile,
  experience as defaultExperience,
  engagements as defaultEngagements,
  skills as defaultSkills,
  software as defaultSoftware,
  tools as defaultTools,
  education as defaultEducation,
  certifications as defaultCertifications,
  projects as defaultProjects,
  ExperienceItem
} from "../data/profile";

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
const themes = ["obsidian", "emerald", "amber", "violet", "polar"];

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

// Calculates exact duration in Years and Months (for total or per-role)
function calculateDuration(startDateStr: string, endDateStr: string | null): string {
  if (!startDateStr) return "";
  const start = new Date(startDateStr);
  const end = endDateStr ? new Date(endDateStr) : new Date();

  if (isNaN(start.getTime()) || isNaN(end.getTime())) return "";

  let yearsDiff = end.getFullYear() - start.getFullYear();
  let monthsDiff = end.getMonth() - start.getMonth();
  let daysDiff = end.getDate() - start.getDate();

  if (daysDiff < 0) {
    monthsDiff -= 1;
  }
  let totalMonths = yearsDiff * 12 + monthsDiff;
  if (totalMonths < 0) totalMonths = 0;

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  return `${years} ${years === 1 ? "Year" : "Years"}, ${months} ${months === 1 ? "Month" : "Months"}`;
}

function calculateTotalExperience(experiences: ExperienceItem[]): string {
  let totalMonths = 0;
  for (const exp of experiences) {
    if (!exp.startDate) continue;
    const start = new Date(exp.startDate);
    const end = exp.endDate ? new Date(exp.endDate) : new Date();
    if (isNaN(start.getTime()) || isNaN(end.getTime())) continue;

    let yearsDiff = end.getFullYear() - start.getFullYear();
    let monthsDiff = end.getMonth() - start.getMonth();
    let daysDiff = end.getDate() - start.getDate();

    if (daysDiff < 0) {
      monthsDiff -= 1;
    }
    let expMonths = yearsDiff * 12 + monthsDiff;
    if (expMonths < 0) expMonths = 0;
    totalMonths += expMonths;
  }

  const years = Math.floor(totalMonths / 12);
  const remainingMonths = totalMonths % 12;

  const yearStr = `${years} ${years === 1 ? "Year" : "Years"}`;
  const monthStr = `${remainingMonths} ${remainingMonths === 1 ? "Month" : "Months"}`;

  return `${yearStr}, ${monthStr}`;
}

export default function Home() {
  const [dark, setDark] = useState(true);
  const [theme, setTheme] = useState("obsidian");
  const [mobile, setMobile] = useState(false);
  const [recruiter, setRecruiter] = useState(false);
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [repoStatus, setRepoStatus] = useState<"loading" | "ready" | "error">("loading");

  // Editable state
  const [isEditor, setIsEditor] = useState(false);
  const [profileData, setProfileData] = useState<any>(defaultProfile);
  const [expList, setExpList] = useState<ExperienceItem[]>(defaultExperience);
  const [skillsList, setSkillsList] = useState<string[]>([...defaultSkills]);
  const [customSections, setCustomSections] = useState<any[]>([]);

  // Auth & Token Security states
  const [authKeyInput, setAuthKeyInput] = useState("");
  const [savedAuthKey, setSavedAuthKey] = useState("SureshAdmin123");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [githubToken, setGithubToken] = useState("");
  const [showTokenModal, setShowTokenModal] = useState(false);

  // GitHub Push State
  const [pushStatus, setPushStatus] = useState<"idle" | "pushing" | "success" | "error">("idle");
  const [pushMessage, setPushMessage] = useState("");

  // Load saved local edits, token, and auth key
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem("sg_edited_profile");
      if (savedProfile) setProfileData(JSON.parse(savedProfile));

      const savedExp = localStorage.getItem("sg_edited_experience");
      if (savedExp) setExpList(JSON.parse(savedExp));

      const savedToken = localStorage.getItem("sg_github_token");
      if (savedToken) setGithubToken(savedToken);

      const savedKey = localStorage.getItem("sg_auth_key");
      if (savedKey) setSavedAuthKey(savedKey);

      const savedTheme = localStorage.getItem("sg_theme");
      if (savedTheme) setTheme(savedTheme);

      const savedSections = localStorage.getItem("sg_custom_sections");
      if (savedSections) setCustomSections(JSON.parse(savedSections));
    } catch {}
  }, []);

  const totalExperienceFormatted = useMemo(() => {
    return calculateTotalExperience(expList);
  }, [expList]);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    document.documentElement.dataset.themeStyle = theme;
    try {
      localStorage.setItem("suresh-theme", dark ? "dark" : "light");
      localStorage.setItem("sg_theme", theme);
    } catch {}
  }, [dark, theme]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("suresh-theme");
      if (saved) setDark(saved !== "light");
      const savedTheme = localStorage.getItem("sg_theme");
      if (savedTheme) setTheme(savedTheme);
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
    fetch(`https://api.github.com/users/${profileData.githubUsername || defaultProfile.githubUsername}/repos?sort=updated&per_page=6`, {
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
  }, [profileData.githubUsername]);

  const filtered = useMemo(() => {
    if (filter === "All") return defaultProjects;
    return defaultProjects.filter(p => p.category === filter);
  }, [filter]);

  // Handle Edit Mode click
  const handleEditModeToggle = () => {
    if (isEditor) {
      setIsEditor(false);
    } else {
      setShowAuthModal(true);
    }
  };

  // Submit Authorization Key
  const handleAuthSubmit = () => {
    if (authKeyInput === savedAuthKey) {
      setIsEditor(true);
      setShowAuthModal(false);
      setAuthKeyInput("");
    } else {
      alert("❌ Incorrect Authorization Key!");
    }
  };

  // Save changes locally
  const saveLocalChanges = () => {
    try {
      localStorage.setItem("sg_edited_profile", JSON.stringify(profileData));
      localStorage.setItem("sg_edited_experience", JSON.stringify(expList));
      localStorage.setItem("sg_custom_sections", JSON.stringify(customSections));
      alert("✅ Changes saved to your browser! Click 'Push to GitHub' to publish them live.");
    } catch (e) {
      alert("Error saving locally.");
    }
  };

  // Add new experience
  const handleAddExperience = () => {
    const newExp: ExperienceItem = {
      company: "NEW COMPANY NAME",
      role: "Job Title / Role",
      location: "Location",
      dates: "Month Year – Present",
      startDate: new Date().toISOString().split("T")[0],
      endDate: null,
      bullets: ["Enter key achievements and responsibilities here."]
    };
    setExpList([newExp, ...expList]);
    setOpen(0);
  };

  // Add custom section
  const handleAddSection = () => {
    const newSection = {
      id: "custom-" + Date.now(),
      title: "New Custom Section",
      subtitle: "Add your custom content here",
      content: "This section is entirely editable through the editor."
    };
    setCustomSections([...customSections, newSection]);
  };

  // Push directly to GitHub via API
  const pushToGitHub = async () => {
    if (!githubToken) {
      setShowTokenModal(true);
      return;
    }

    setPushStatus("pushing");
    setPushMessage("Connecting to GitHub API...");

    try {
      const repoOwner = "Chillbroz005";
      const repoName = "portfolio";
      const filePath = "src/data/profile.ts";

      const getRes = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`, {
        headers: {
          Authorization: `Bearer ${githubToken}`,
          Accept: "application/vnd.github.v3+json"
        }
      });

      if (!getRes.ok) {
        throw new Error(`Failed to fetch current file from GitHub (${getRes.status}). Check token permissions.`);
      }

      const fileData = await getRes.json();
      const currentSha = fileData.sha;

      const updatedCode = `export const profile = ${JSON.stringify(profileData, null, 2)} as const;\n\nexport type ExperienceItem = {\n  company: string;\n  role: string;\n  location: string;\n  dates: string;\n  startDate: string;\n  endDate: string | null;\n  bullets: string[];\n};\n\nexport const experience: ExperienceItem[] = ${JSON.stringify(expList, null, 2)};\n\nexport const engagements = ${JSON.stringify(defaultEngagements, null, 2)};\n\nexport const skills = ${JSON.stringify(skillsList, null, 2)};\n\nexport const software = ${JSON.stringify(defaultSoftware, null, 2)};\n\nexport const tools = ${JSON.stringify(defaultTools, null, 2)};\n\nexport const education = ${JSON.stringify(defaultEducation, null, 2)};\n\nexport const certifications = ${JSON.stringify(defaultCertifications, null, 2)};\n\nexport const projects = ${JSON.stringify(defaultProjects, null, 2)};\n`;

      const utf8Bytes = new TextEncoder().encode(updatedCode);
      let binaryStr = "";
      for (let i = 0; i < utf8Bytes.length; i++) {
        binaryStr += String.fromCharCode(utf8Bytes[i]);
      }
      const base64Content = btoa(binaryStr);

      const putRes = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${githubToken}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: "Update profile & experience data via Web Editor",
          content: base64Content,
          sha: currentSha,
          branch: "main"
        })
      });

      if (!putRes.ok) {
        const errData = await putRes.json();
        throw new Error(errData.message || "Push failed.");
      }

      setPushStatus("success");
      setPushMessage("🎉 Successfully pushed directly to GitHub repository!");
    } catch (err: any) {
      setPushStatus("error");
      setPushMessage(`Push failed: ${err.message}`);
    }
  };

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
          <select value={theme} onChange={(e) => setTheme(e.target.value)}>
            {themes.map(t => <option key={t} value={t}>{t.toUpperCase()}</option>)}
          </select>
          <button onClick={() => setDark(!dark)} aria-label="Toggle dark and light mode">
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={handleEditModeToggle}
            style={{ display: "flex", alignItems: "center", gap: "6px", background: isEditor ? "var(--accent)" : "var(--panel)", color: isEditor ? "#050b14" : "var(--accent)", fontWeight: 800, fontSize: "13px", borderColor: "var(--accent)" }}
          >
            {isEditor ? <Unlock size={15} /> : <Lock size={15} />} {isEditor ? "Exit Editor" : "Edit Mode"}
          </button>
          <button className="recruiterBtn" onClick={() => setRecruiter(true)}>
            30-Second Profile
          </button>
        </div>
      </header>

      {/* Editor Control Bar */}
      <AnimatePresence>
        {isEditor && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: "sticky",
              top: "72px",
              zIndex: 45,
              background: "linear-gradient(135deg, rgba(16, 28, 48, 0.95), rgba(5, 11, 20, 0.95))",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid var(--accent)",
              padding: "12px 5vw",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "10px"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ color: "var(--accent)", fontWeight: 800, fontSize: "14px" }}>
                ⚙️ LIVE ADMIN & EDITOR MODE
              </span>
            </div>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <button onClick={handleAddExperience} style={{ padding: "8px 14px", background: "rgba(0, 229, 255, 0.1)", border: "1px solid var(--accent)", borderRadius: "10px", color: "var(--accent)", fontSize: "13px", fontWeight: 700 }}><Plus size={15} /> Job</button>
              <button onClick={handleAddSection} style={{ padding: "8px 14px", background: "rgba(0, 229, 255, 0.1)", border: "1px solid var(--accent)", borderRadius: "10px", color: "var(--accent)", fontSize: "13px", fontWeight: 700 }}><Plus size={15} /> Section</button>
              <button onClick={saveLocalChanges} style={{ padding: "8px 14px", background: "var(--panel)", border: "1px solid var(--line)", borderRadius: "10px", color: "var(--text)", fontSize: "13px", fontWeight: 700 }}><Save size={15} /> Save</button>
              <button onClick={pushToGitHub} style={{ padding: "8px 16px", background: "linear-gradient(135deg, var(--accent), var(--accent2))", border: 0, borderRadius: "10px", color: "#050b14", fontSize: "13px", fontWeight: 800 }}><Sparkles size={15} /> Publish Live</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content (Bento Grid) */}
      <section className="hero-section">
        <div className="bento-hero-grid">
          <div className="bento-card hero-main">
            <div>
              <span className="eyebrow">SUPPLY CHAIN • PROCUREMENT • PROJECTS</span>
              <h1 className="hero-title">{profileData.name}</h1>
              <h2 className="hero-subtitle">{profileData.title}</h2>
              <p className="hero-tagline">{profileData.summary}</p>
            </div>
          </div>
          <div className="bento-card hero-sidebar">
             <img className="profile-photo" src={`${BASE}/profile-photo.png`} alt="Suresh Ganesan" />
             <div className="profile-stat"><span>Experience</span><strong>{totalExperienceFormatted}</strong></div>
             <div className="profile-stat"><span>Qualification</span><strong>B.E. Mechanical Engineering</strong></div>
             <div className="profile-stat"><span>Global Reach</span><strong>6+ Countries</strong></div>
          </div>
        </div>
      </section>

      {/* Render Dynamic Content */}
      <Section id="about" eyebrow="01 / ABOUT" title={isEditor ? <input value={profileData.name} onChange={e => setProfileData({...profileData, name: e.target.value})}/> : "About Suresh"}>
        <div className="bento-grid-2">
            {customSections.map(s => (
                <div key={s.id} className="bento-card col-12">
                    {isEditor ? <input value={s.title} onChange={e => setCustomSections(customSections.map(cs => cs.id === s.id ? {...cs, title: e.target.value} : cs))}/> : <h3>{s.title}</h3>}
                    {isEditor ? <textarea value={s.content} onChange={e => setCustomSections(customSections.map(cs => cs.id === s.id ? {...cs, content: e.target.value} : cs))}/> : <p>{s.content}</p>}
                </div>
            ))}
        </div>
      </Section>

      {/* ... Rest of components ... */}
    </main>
  );
}

function Section({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: React.ReactNode; children: React.ReactNode }) {
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
