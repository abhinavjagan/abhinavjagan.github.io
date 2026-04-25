import PALETTE from "../../shared/palette.js";
import DynamicTextFlow from "../story/DynamicTextFlow.jsx";
import {
  RESUME_HREF,
  LINKEDIN_HREF,
  GITHUB_HREF,
  EMAIL_HREF,
  projects as cvProjects,
} from "../cv/cvContent.js";

const SNAPSHOT = [
  "SDE 2, Cisco Systems (Distributed Systems)",
  "Cisco 8000 router software and traffic mirroring",
  "Cisco excellence award (internship).",
  "B.E. Computer Science, BITS Hyderabad (CGPA 8.2)",
  "All India Rank 5321 in JEE Advanced.",
  "Published 2 international conference papers",
  "Teaching Assistant for the course of Internet of Things",
];

const KEY_IMPACT = [
  "Designed and delivered next-generation ERSPAN using GUE encapsulation, providing Microsoft-requested packet mirroring capability with scalable, hardware-accelerated behavior.",
  "Led end-to-end egress traffic mirroring for Cisco 8000 (Silicon One), achieving NCS 5000 parity needed for SoftBank migration and cutting delivery time by 60%.",
  "Owned delivery, debugging for traffic-mirroring stack areas accross SPAN, lawful intercept, and NetFlow.",
  "Supported bring-up and validation across multi-platform topologies for upcoming Cisco 8000 hardware.",
  "Contributed to AI-driven IaaS workstream to deploy quantized ML models on Cisco routers, helping move from concept to customer-evaluable prototype in a 4-member core team.",
  "Built scalable automation and AI-powered internal tooling, including  metrics analysis and traffic mirroring workflows.",
  "As a Cisco intern, improved router OS test design and parallel execution, earning an internal excellence award.",
  "Led Python automation lifecycle for NTP VRF OpenConfig feature delivery during internship.",
];

const EXPERIENCE = [
  {
    role: "Software Developer 2",
    company: "Cisco Systems",
    period: "Apr 2026 - Present",
  },
  {
    role: "Software Developer",
    company: "Cisco Systems",
    period: "Aug 2024 - Apr 2026",
  },
  {
    role: "Technical Intern",
    company: "Cisco Systems",
    period: "Jan 2024 - Jun 2024",
  },
  {
    role: "Software Intern",
    company: "Shris Infotech",
    period: "Jun 2022 - Jul 2022",
  },
];

const EXTRA_CURRICULARS = [
  "State-level tournament representation (CBSE Clusters South Zone).",
  "Karate blue belt with disciplined, high-consistency training.",
  "Active visual creator across art, graphic design, and photography.",
  "Builds across robotics, filming, and product-oriented experiments.",
  "Hands-on maker mindset with 3D printing and 3D modeling workflows.",
  "Explores sim racing and creative tooling as systems-thinking practice.",
  "Strong execution under pressure from endurance-led outdoor challenges.",
  "High curiosity across technical and creative mediums; deep craft focus.",
  "High-altitude trek among Himalayan range and Vietnam cave trail exploration.",
];

export default function CrispPortfolio({ onBack }) {
  return (
    <main className="crisp-page" aria-label="Crisp one-page CV">
      <div className="story-fixed-layer">
        <div className="binary-canvas">
          <DynamicTextFlow />
        </div>
      </div>

      <header className="crisp-top">
        <button type="button" className="mode-exit-btn" onClick={onBack}>
          ← Mode
        </button>
      </header>

      <aside className="crisp-links-rail" aria-label="Quick links">
        <div className="crisp-links crisp-links-vertical">
          <a href={RESUME_HREF} target="_blank" rel="noreferrer">
            Resume
          </a>
          <a href={LINKEDIN_HREF} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={GITHUB_HREF} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={EMAIL_HREF}>Email</a>
        </div>
      </aside>

      <div className="crisp-content">
        <section className="crisp-hero">
          <h1 className="crisp-name">Abhinav Polimera</h1>
          <p className="crisp-citizenship" style={{ color: PALETTE.neonCyan }}>
            US citizen
          </p>
          <p className="crisp-lead">Software Engineer building distributed systems, router software, and AI-backed tools.</p>
        </section>

        <section className="crisp-grid" aria-label="Concise CV sections">
          <div className="crisp-column">
            <article className="crisp-block">
              <h2>Experience</h2>
              <ul className="crisp-list crisp-list-tight">
                {EXPERIENCE.map((job) => (
                  <li key={`${job.company}-${job.role}-${job.period}`}>
                    <strong>{job.role}</strong> - {job.company} ({job.period})
                  </li>
                ))}
              </ul>
            </article>

            <article className="crisp-block">
              <h2>Key impact</h2>
              <ul className="crisp-list">
                {KEY_IMPACT.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>

          <div className="crisp-column">
            <article className="crisp-block">
              <h2>Snapshot</h2>
              <ul className="crisp-list">
                {SNAPSHOT.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="crisp-block">
              <h2>Projects</h2>
              <ul className="crisp-list crisp-list-tight">
                {cvProjects.map((project) => (
                  <li key={project.name}>
                    <a href={project.link} target="_blank" rel="noreferrer">
                      {project.name}
                    </a>{" "}
                    - {project.summary}
                  </li>
                ))}
              </ul>
            </article>
          </div>

          <article className="crisp-block crisp-block-wide">
            <h2>Extracurriculars</h2>
            <ul className="crisp-list crisp-list-tight crisp-extras-grid">
              {EXTRA_CURRICULARS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </section>
      </div>
    </main>
  );
}
