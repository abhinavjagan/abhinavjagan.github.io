import { useEffect } from "react";
import CvPretextBlock from "./CvPretextBlock.jsx";
import CvSceneCanvas from "./CvSceneCanvas.jsx";
import {
  RESUME_HREF,
  LINKEDIN_HREF,
  GITHUB_HREF,
  EMAIL_HREF,
  introParagraphs,
  experience,
  experienceHeading,
  experiencePretext,
  beyondWorkNarrative,
  extracurriculars,
  extracurricularsHeading,
  extracurricularsPretext,
  projects,
  projectsHeading,
} from "./cvContent.js";
import "./cv-mode.css";

export default function CvModePage({ onBack }) {
  const beyondIcons = [
    <path key="chess" d="M4 20h16M8 20v-5h8v5M10 7a2 2 0 114 0 2 2 0 01-4 0zm5 2H9l1 3h4l1-3zM9 12h6v3H9z" />,
    <path key="belt" d="M4 11l8-5 8 5-2 9H6l-2-9zm5 3h6M11 11h2" />,
    <path key="palette" d="M12 4a8 8 0 100 16h1a2 2 0 000-4h-1a1 1 0 01-1-1 1 1 0 011-1h1a5 5 0 000-10h-1zm-4 6a1 1 0 110 2 1 1 0 010-2zm3-2a1 1 0 110 2 1 1 0 010-2zm3 0a1 1 0 110 2 1 1 0 010-2z" />,
    <path key="mountain" d="M3 19l5-8 3 4 3-6 7 10H3zm4-2h10" />,
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="cv-mode-root page-shell">
      {typeof onBack === "function" ? (
        <button type="button" className="cv-mode-back" onClick={onBack}>
          ← Mode
        </button>
      ) : null}

      <CvSceneCanvas />
      <div className="scene-tint" aria-hidden="true" />

      <main className="content">
        <aside className="sidebar" aria-label="Section navigation">
          <a className="brandmark" href="#top">
            AP
          </a>
          <nav className="side-nav" aria-label="On this page">
            <a href="#top">Intro</a>
            <a href="#experience">Work</a>
            <a href="#projects">Build</a>
            <a href="#extracurriculars">Beyond</a>
            <a href="#contact">Reach</a>
          </nav>
          <a
            className="sidebar-cta"
            href={RESUME_HREF}
            target="_blank"
            rel="noreferrer"
          >
            CV
          </a>
        </aside>

        <section id="top" className="hero-restored">
            <div className="hero-copy">
              <h1 className="hero-title">
                <span className="hero-title-top">ABHINAV</span>
                <span className="hero-title-main">POLIMERA</span>
              </h1>
              <ul className="hero-bullets">
                <li>US citizen</li>
              </ul>
              <div className="intro-stack">
                {introParagraphs.map((paragraph) => (
                  <p className="intro" key={paragraph}>
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="cta-row">
                <a className="button button-primary" href="#experience">
                  View Experience
                </a>
                <a
                  className="button button-secondary"
                  href={RESUME_HREF}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open Resume
                </a>
              </div>
            </div>
        </section>

        <section id="experience" className="timeline-section">
            <div className="section-heading">
              <p className="panel-kicker">Work</p>
              <h2>{experienceHeading}</h2>
              <CvPretextBlock text={experiencePretext} tone="magenta" />
            </div>
            <div className="timeline">
              {experience.map((job) =>
                job.pointsLayout === "project-cards" ? (
                  <article
                    key={`${job.company}-${job.role}-${job.period}`}
                    className="timeline-card timeline-card--role-cards"
                  >
                    <div className="timeline-job-header">
                      <div className="timeline-job-left">
                        <h3>{job.role}</h3>
                        <p className="timeline-job-company">{job.company}</p>
                      </div>
                      <div className="timeline-job-aside" aria-label="Dates and location">
                        <span>{job.period}</span>
                        <span>{job.mode}</span>
                      </div>
                    </div>
                    <div className="project-grid experience-highlight-grid">
                      {job.points.map((pt, i) => (
                        <article
                          className="project-card experience-point-card"
                          key={`${job.period}-${i}`}
                        >
                          <p>{pt}</p>
                        </article>
                      ))}
                    </div>
                  </article>
                ) : (
                  <article
                    key={`${job.company}-${job.role}-${job.period}`}
                    className="timeline-card"
                  >
                    <div className="timeline-job-header">
                      <div className="timeline-job-left">
                        <h3>{job.role}</h3>
                        <p className="timeline-job-company">{job.company}</p>
                      </div>
                      <div className="timeline-job-aside" aria-label="Dates and location">
                        <span>{job.period}</span>
                        <span>{job.mode}</span>
                      </div>
                    </div>
                    <div className="timeline-copy">
                      <ul className="timeline-list">
                        {job.points.map((pt, i) => (
                          <li key={`${job.period}-${i}`}>{pt}</li>
                        ))}
                      </ul>
                    </div>
                  </article>
                ),
              )}
            </div>
        </section>

        <section id="projects" className="projects-section">
            <div className="section-heading">
              <p className="panel-kicker">Projects</p>
              <h2>{projectsHeading}</h2>
            </div>
            <div className="project-grid">
              {projects.map((proj) => (
                <article key={proj.name} className="project-card">
                  <p className="card-kicker">{proj.category}</p>
                  <h3>{proj.name}</h3>
                  <p>{proj.summary}</p>
                  <p>
                    <strong>Skills & Technologies:</strong>{" "}
                    {proj.skillsAndTechnologies}
                  </p>
                  <a
                    className="project-link"
                    href={proj.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {proj.ctaLabel}
                  </a>
                </article>
              ))}
            </div>
        </section>

        <section id="extracurriculars" className="timeline-section">
            <div className="section-heading">
              <p className="panel-kicker">Beyond Work</p>
              <h2>{extracurricularsHeading}</h2>
              <CvPretextBlock text={extracurricularsPretext} tone="cyan" />
            </div>
            <article className="timeline-card extracurricular-card">
              <div className="timeline-copy beyond-work-copy">
                <h3>How I build range beyond software.</h3>
                <ul className="chip-list beyond-work-highlights">
                  {extracurriculars.map((line, index) => (
                    <li key={line}>
                      <svg
                        className="beyond-highlight-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        {beyondIcons[index] ?? beyondIcons[0]}
                      </svg>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
                <div className="beyond-narrative-stack">
                  {beyondWorkNarrative.map((paragraph) => (
                    <p className="beyond-narrative-card" key={paragraph}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </article>
        </section>

        <section id="contact" className="contact-band">
            <p className="panel-kicker">Contact</p>
            <div className="cta-row">
              <a
                className="button button-primary"
                href={RESUME_HREF}
                target="_blank"
                rel="noreferrer"
              >
                Resume
              </a>
              <a
                className="button button-secondary"
                href={LINKEDIN_HREF}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a
                className="button button-secondary"
                href={GITHUB_HREF}
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              <a className="button button-secondary" href={EMAIL_HREF}>
                abhinavpolimera@gmail.com
              </a>
            </div>
        </section>
      </main>
    </div>
  );
}
