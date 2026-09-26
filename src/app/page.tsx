"use client";

import { useEffect, useMemo, useState } from "react";
import { BASE } from "../data/base";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight, BriefcaseBusiness, ChevronDown, Download, ExternalLink, Github,
  Linkedin, Mail, MapPin, Menu, Moon, Phone, Send, Sun, X
} from "lucide-react";
import { profile, experience, engagements, skills, software, tools, education, certifications, projects } from "../data/profile";

const nav = [["about","About"],["journey","Journey"],["expertise","Expertise"],["achievements","Achievements"],["projects","Projects"],["education","Education"],["contact","Contact"]];
const projectFilters = ["All","Procurement","Automation","Android","Other"];

type GithubRepo = {
  id:number; name:string; html_url:string; description:string|null; language:string|null;
  stargazers_count:number; updated_at:string; fork:boolean;
};

export default function Home(){
  const [dark,setDark]=useState(true);
  const [mobile,setMobile]=useState(false);
  const [recruiter,setRecruiter]=useState(false);
  const [filter,setFilter]=useState("All");
  const [open,setOpen]=useState(0);
  const [progress,setProgress]=useState(0);
  const [showTop,setShowTop]=useState(false);
  const [repos,setRepos]=useState<GithubRepo[]>([]);
  const [repoStatus,setRepoStatus]=useState<"loading"|"ready"|"error">("loading");

  useEffect(()=>{
    document.documentElement.dataset.theme=dark?"dark":"light";
    try { localStorage.setItem("suresh-theme", dark ? "dark" : "light"); } catch {}
  },[dark]);

  useEffect(()=>{
    try { const saved=localStorage.getItem("suresh-theme"); if(saved) setDark(saved!=="light"); } catch {}
  },[]);

  useEffect(()=>{
    const onScroll=()=>{
      const max=document.documentElement.scrollHeight-window.innerHeight;
      setProgress(max>0 ? Math.min(100,Math.max(0,(window.scrollY/max)*100)) : 0);
      setShowTop(window.scrollY>700);
    };
    onScroll(); window.addEventListener("scroll",onScroll,{passive:true});
    return()=>window.removeEventListener("scroll",onScroll);
  },[]);

  useEffect(()=>{
    const controller=new AbortController();
    fetch(`https://api.github.com/users/${profile.githubUsername}/repos?sort=updated&per_page=6`,{signal:controller.signal,headers:{Accept:"application/vnd.github+json"}})
      .then(r=>{if(!r.ok) throw new Error("GitHub API unavailable"); return r.json();})
      .then((data:GithubRepo[])=>{setRepos(data.filter(r=>!r.fork));setRepoStatus("ready");})
      .catch(()=>setRepoStatus("error"));
    return()=>controller.abort();
  },[]);

  const filtered=useMemo(()=>{
    if(filter==="All") return projects;
    return projects.filter(p=>p.category===filter);
  },[filter]);

  return <main>
    <div className="scrollProgress" style={{width:`${progress}%`}} aria-hidden="true"/>
    <header className="nav">
      <a className="brand" href="#top" aria-label="Suresh Ganesan home">SG<span>.</span></a>
      <nav aria-label="Primary navigation">{nav.map(([id,label])=><a key={id} href={`#${id}`}>{label}</a>)}</nav>
      <div className="navActions">
        <button onClick={()=>setDark(!dark)} aria-label="Toggle dark and light mode">{dark?<Sun size={18}/>:<Moon size={18}/>}</button>
        <button className="recruiterBtn" onClick={()=>setRecruiter(true)}>30-Second Profile</button>
        <button className="mobileOnly" onClick={()=>setMobile(!mobile)} aria-label="Open mobile navigation">{mobile?<X/>:<Menu/>}</button>
      </div>
    </header>
    {mobile&&<div className="mobileNav">{nav.map(([id,label])=><a key={id} href={`#${id}`} onClick={()=>setMobile(false)}>{label}</a>)}</div>}

    <section className="hero" id="top">
      <div className="network" aria-hidden="true"><span>Supplier</span><i/><span>Procurement</span><i/><span>Logistics</span><i/><span>Operations</span><i/><span>Business</span></div>
      <div className="networkPulse" aria-hidden="true"/>
      <div className="heroCopy">
        <p className="eyebrow">SUPPLY CHAIN • PROCUREMENT • PROJECTS</p>
        <h1>{profile.name}</h1>
        <h2>{profile.title}</h2>
        <p className="tagline">{profile.tagline}</p>
        <div className="heroBtns">
          <a className="primary" href={`${BASE}/resume.pdf`} download><Download size={17}/> Download Resume</a>
          <a className="secondary" href="#projects">View Projects <ArrowUpRight size={17}/></a>
        </div>
        <div className="socials">
          <a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin/> LinkedIn</a>
          <a href={profile.github} target="_blank" rel="noreferrer"><Github/> GitHub</a>
          <a href={`mailto:${profile.email}`}><Mail/> Email</a>
        </div>
      </div>
      <div className="profileCard">
        <img className="profilePhoto" src={`${BASE}/profile-photo.png`} alt="Suresh Ganesan professional portrait" loading="eager"/>
        <div><span>Based in</span><strong>{profile.location}</strong></div>
        <div><span>Experience</span><strong>{profile.experienceYears}</strong></div>
        <div><span>Coverage</span><strong>{profile.regions.join(" · ")}</strong></div>
      </div>
    </section>

    <section className="snapshot wrap" aria-label="Professional snapshot">
      <div><span>EXPERIENCE</span><strong>{profile.experienceYears}</strong></div>
      <div><span>REGIONS</span><strong>{profile.regions.join(" · ")}</strong></div>
      <div><span>CORE FUNCTIONS</span><strong>Procurement · SCM · P2P</strong></div>
      <div><span>RECOGNITION</span><strong>Best Employee · QCFI Gold</strong></div>
    </section>

    <Section id="about" eyebrow="01 / ABOUT ME" title="Commercial thinking, technical depth, operational discipline.">
      <div className="twoCol"><p className="lead">{profile.summary}</p><div className="factGrid"><Fact label="Industry" value="Vertically integrated manufacturing"/><Fact label="Languages" value="Tamil & English"/><Fact label="Engineering" value="Mechanical Engineering"/><Fact label="Focus" value="Technical + Commercial Procurement"/></div></div>
    </Section>

    <Section id="journey" eyebrow="02 / CAREER JOURNEY" title="A procurement career built around projects, suppliers and delivery.">
      <div className="timeline">{experience.map((e,i)=><motion.article className={`experience ${open===i?"expanded":""}`} key={e.company} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>
        <div className="timelineDot"/>
        <button className="expHead" onClick={()=>setOpen(open===i?-1:i)} aria-expanded={open===i}>
          <div><span className="date">{e.dates}</span><h3>{e.role}</h3><p>{e.company} · {e.location}</p></div><ChevronDown className={open===i?"rotate":""}/>
        </button>
        <AnimatePresence>{open===i&&<motion.ul initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}}>{e.bullets.map(b=><li key={b}>{b}</li>)}</motion.ul>}</AnimatePresence>
      </motion.article>)}</div>
    </Section>

    <Section id="expertise" eyebrow="03 / CORE EXPERTISE" title="The operating system behind the work.">
      <div className="skillCloud">{skills.map(s=><span key={s}>{s}</span>)}</div>
      <h3 className="subhead">Software</h3><div className="software">{software.map(s=><span key={s}>{s}</span>)}</div>
      <h3 className="subhead">Tools</h3><div className="software">{tools.map(s=><span key={s}>{s}</span>)}</div>
    </Section>

    <Section id="achievements" eyebrow="04 / ACHIEVEMENTS" title="Documented outcomes and recognition.">
      <div className="achievementGrid">{profile.achievements.map((a,i)=><motion.div className="achievement" key={a} whileHover={{y:-5}}><b>{["01","02","03","04"][i]}</b><p>{a}</p></motion.div>)}</div>
      <div className="metricStrip"><Metric value="1800 Million" label="Modernization & Expansion Project"/><Metric value="1200 Million" label="AOP CAPEX & Civil projects"/><Metric value="500 Million" label="Naidupeta AP restoration"/><Metric value="35+" label="Kaizens presented"/></div>
    </Section>

    <Section id="projects" eyebrow="05 / PROJECTS" title="Selected project engagements and verified public work.">
      <div className="filters" role="tablist" aria-label="Project filters">{projectFilters.map(f=><button role="tab" aria-selected={filter===f} className={filter===f?"active":""} onClick={()=>setFilter(f)} key={f}>{f}</button>)}</div>
      <div className="projectGrid">
        {filtered.length ? filtered.map(p=><article className="projectCard" key={p.title}><div className="projectTop"><span>{p.category}</span><ArrowUpRight/></div><h3>{p.title}</h3><p>{p.description}</p><div className="tags">{p.technologies.map(t=><span key={t}>{t}</span>)}</div>{p.github&&<a href={p.github} target="_blank" rel="noreferrer">GitHub <ExternalLink size={15}/></a>}</article>) : <div className="emptyState">No resume-verified project has been documented for this filter yet. The site intentionally does not invent project details.</div>}
      </div>
      <div className="caseStudy"><div><span className="eyebrow">FEATURED CASE STUDY</span><h3>Modernization & Expansion Project</h3><p>The resume documents this as a major procurement/project engagement. The source does not provide a detailed problem statement, technology stack, screenshots or measured outcome, so those fields are intentionally presented as source-limited rather than invented.</p></div><div className="caseSteps">{["Problem","Approach","Technology","Solution","Result"].map((s,i)=><div key={s}><b>0{i+1}</b><span>{s}</span><small>{i===4?"Resume documents project value; outcome detail not supplied.":"Use source resume only; additional detail not supplied."}</small></div>)}</div></div>
      <div className="engagements"><h3>Key Engagements</h3>{engagements.map(x=><div key={x}>{x}</div>)}</div>
    </Section>

    <Section id="github" eyebrow="06 / GITHUB" title="Public repository activity, when available.">
      <div className="githubHeader"><div><p className="lead">Repositories are loaded from GitHub's public API. Only publicly returned repository metadata is displayed.</p></div><a className="secondary" href={profile.githubProfile} target="_blank" rel="noreferrer"><Github/> Open GitHub</a></div>
      {repoStatus==="loading"&&<div className="emptyState">Loading public repositories…</div>}
      {repoStatus==="error"&&<div className="emptyState">GitHub repository data could not be loaded right now. Your supplied GitHub link remains available above.</div>}
      {repoStatus==="ready"&&<div className="repoGrid">{repos.length?repos.map(r=><a className="repoCard" href={r.html_url} target="_blank" rel="noreferrer" key={r.id}><div className="repoTop"><Github size={18}/><span>{r.language||"Public repository"}</span></div><h3>{r.name}</h3><p>{r.description||"No public description supplied."}</p><small>★ {r.stargazers_count} · Updated {new Date(r.updated_at).toLocaleDateString()}</small></a>):<div className="emptyState">No public repositories were returned by the GitHub API.</div>}</div>}
    </Section>

    <Section id="education" eyebrow="07 / EDUCATION & CERTIFICATIONS" title="Engineering foundation and continuous improvement.">
      <div className="eduGrid"><div>{education.map(e=><article className="edu" key={e.degree}><span>{e.year}</span><h3>{e.degree}</h3><p>{e.institution}</p><b>{e.detail}</b></article>)}</div><div><h3 className="subhead">Certifications / Training</h3>{certifications.map(c=><div className="cert" key={c}>{c}</div>)}</div></div>
    </Section>

    <Section id="resume" eyebrow="08 / RESUME" title="The complete professional record.">
      <div className="resumeBox"><div><h3>Interactive resume</h3><p>Use the timeline above for the web experience, or download the source resume PDF.</p></div><div className="heroBtns"><a className="primary" href={`${BASE}/resume.pdf`} target="_blank" rel="noreferrer"><ExternalLink/> View Resume</a><a className="secondary" href={`${BASE}/resume.pdf`} download><Download/> Download PDF</a></div></div>
    </Section>

    <Section id="contact" eyebrow="09 / CONTACT" title="Let's connect around procurement, SCM and project delivery.">
      <div className="contactGrid"><div className="contactDetails"><a href={`mailto:${profile.email}`}><Mail/>{profile.email}</a>{profile.phones.map(p=><a href={`tel:${p.replace(/\s/g,"")}`} key={p}><Phone/>{p}</a>)}<span><MapPin/>{profile.location}</span><a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin/> LinkedIn</a><a href={profile.github} target="_blank" rel="noreferrer"><Github/> GitHub</a></div><form className="contactForm" action={`mailto:${profile.email}`} method="post" encType="text/plain"><label>Name<input name="name" required placeholder="Your name"/></label><label>Email<input name="email" type="email" required placeholder="you@example.com"/></label><label>Message<textarea name="message" rows={5} required placeholder="How can we connect?"/></label><button className="primary" type="submit"><Send size={16}/> Send via email</button></form></div>
    </Section>

    <footer><span>© {new Date().getFullYear()} {profile.name}</span><span>Supply Chain · Procurement · Projects</span></footer>
    {showTop&&<button className="backTop" onClick={()=>window.scrollTo({top:0,behavior:"smooth"})} aria-label="Back to top">↑</button>}
    <a className="floatResume" href={`${BASE}/resume.pdf`} download><Download size={17}/> Resume</a>

    <AnimatePresence>{recruiter&&<motion.div className="modalBackdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><motion.div className="recruiterModal" initial={{y:30,scale:.98}} animate={{y:0,scale:1}}><button className="close" onClick={()=>setRecruiter(false)} aria-label="Close recruiter view"><X/></button><span className="eyebrow">30-SECOND PROFILE</span><h2>{profile.name}</h2><p className="lead">{profile.title}</p><div className="quick"><Fact label="Experience" value={profile.experienceYears}/><Fact label="Most recent role" value={experience[0].role}/><Fact label="Regions" value={profile.regions.join(" · ")}/><Fact label="Core expertise" value="SCM · Procurement · CAPEX/OPEX · P2P · Contracts · Vendor Management"/></div><div className="modalActions"><a className="primary" href={`${BASE}/resume.pdf`} download><Download/> Resume</a><a className="secondary" href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin/> LinkedIn</a><a className="secondary" href={profile.github} target="_blank" rel="noreferrer"><Github/> GitHub</a><a className="secondary" href={`mailto:${profile.email}`}><Mail/> Contact</a></div></motion.div></motion.div>}</AnimatePresence>
  </main>
}

function Section({id,eyebrow,title,children}:{id:string,eyebrow:string,title:string,children:React.ReactNode}){return <section id={id} className="section wrap"><div className="sectionHead"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div>{children}</section>}
function Fact({label,value}:{label:string,value:string}){return <div className="fact"><span>{label}</span><strong>{value}</strong></div>}
function Metric({value,label}:{value:string,label:string}){return <div className="metric"><strong>{value}</strong><span>{label}</span></div>}
