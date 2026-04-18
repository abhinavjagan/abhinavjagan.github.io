import SceneCanvas from "./SceneCanvas";
import InteractivePretextBlock from "./InteractivePretextBlock";

const experiences = [
  {
    company: "Cisco Systems",
    role: "Software Developer, Distributed Systems organization",
    period: "Aug 2024 - Present",
    mode: "On-site",
    points: [
      "Designed a next-generation ERSPAN solution using GUE encapsulation as a scalable alternative to GRE, leading end-to-end delivery for Microsoft-driven packet mirroring requirements with hardware-accelerated performance gains.",
      "Led end-to-end delivery of egress traffic mirroring for Cisco 8000 (Silicon One) routers, helping achieve parity with NCS 5000 capabilities for SoftBank's migration while reducing delivery time by 60%.",
      "Contributed to an AI-driven Infrastructure-as-a-Service initiative for deploying quantized ML models on Cisco routers, moving from concept to prototype in a 4-member core team and reaching customer evaluation.",
      "Owned traffic mirroring feature delivery, debugging, and POC work across SPAN, Lawful Intercept, and NetFlow on Cisco 8000, including multi-platform topology bring-up for upcoming hardware.",
      "Built scalable automation infrastructure and AI-powered internal tools, including a leadership metrics analyzer and a drag-and-drop traffic mirroring platform with MCP-based modular components.",
    ],
  },
  {
    company: "Cisco Systems",
    role: "Technical Intern, Distributed Systems organization",
    period: "Jan 2024 - Jun 2024",
    mode: "On-site",
    points: [
      "Optimized router OS feature testing and deployment through improved test design and parallel execution, earning an internal Cisco excellence award.",
      "Led the automation lifecycle in Python for NTP VRF OpenConfig feature delivery.",
    ],
  },
  {
    company: "Shris Infotech",
    role: "Software Intern",
    period: "Jun 2022 - Jul 2022",
    mode: "Remote",
    points: [
      "Developed a one-click face-recognition calling app using Python, DeepFace, OpenCV, Flutter, and Dart.",
    ],
  },
];

const projects = [
  {
    name: "Playlistify",
    category: "Web Development",
    summary:
      "Built a Python and Flask product on top of the Spotify Web API that turns liked songs into shareable playlists with one click, closing a clear product usability gap.",
    link: "https://github.com/abhinavjagan",
  },
  {
    name: "Remote Drone Surveillance",
    category: "Machine Learning / Image Processing",
    summary:
      "Designed a drone-based surveillance pipeline with Python, OpenCV, YOLO, and threshold-based activity analysis to detect, classify, and flag illegal actions in real time.",
    link: "https://www.researchgate.net/publication/377547504_Detection_of_Suspicious_Activities_at_Remote_Locations_by_using_UAVs_and_Computer_Vision",
  },
  {
    name: "Performance Assessment of Neural Radiance Fields and Photogrammetry",
    category: "3D Reconstruction Research",
    summary:
      "Implemented and presented a comparative NeRF vs Photogrammetry study for 3D reconstruction of man-made and natural scenes at the ICAART conference.",
    link: "https://www.researchgate.net/publication/378826735_Performance_Assessment_of_Neural_Radiance_Fields_NeRF_and_Photogrammetry_for_3D_Reconstruction_of_Man-Made_and_Natural_Features",
  },
];

const extracurriculars = [
  "Represented school at the state-level CBSE Clusters South Zone tournament.",
  "Karate blue belt.",
  "Artist, graphic designer, and photographer.",
  "Trekked the Himalayas and the world's largest cave ecosystem in Vietnam.",
];

const skillGroups = [
  {
    title: "Languages",
    skills: ["Python", "C++", "JavaScript", "TypeScript", "SQL"],
  },
  {
    title: "Frontend",
    skills: ["React", "Vite", "Tailwind CSS", "HTML", "CSS"],
  },
  {
    title: "Backend & Systems",
    skills: ["Node.js", "Flask", "Distributed Systems", "Automation", "MCP"],
  },
];

function App() {
  return (
    <div className="page-shell">
      <SceneCanvas />
      <div className="scene-tint" />

      <main className="comic-page">
        <header className="top-nav">
          <a className="brandmark" href="#top">
            AP
          </a>
          <nav className="top-nav-links" aria-label="Section navigation">
            <a href="#top">Home</a>
            <a href="#experience">Experience</a>
            <a href="#projects">Projects</a>
            <a href="#education">Education</a>
            <a href="#contact">Contact</a>
          </nav>
          <a
            className="nav-cta"
            href="/assets/docs/Abhinav_resume___SDE___USA%20(2).pdf"
            target="_blank"
            rel="noreferrer"
          >
            Resume
          </a>
        </header>

        <section className="comic-panel hero-panel" id="top">
          <p className="panel-tag">Hey, I&apos;m</p>
          <h1 className="hero-title">
            <span className="hero-title-top">ABHINAV</span>
            <span className="hero-title-main">POLIMERA</span>
          </h1>
          <p className="hero-subtitle">
            Software engineer building distributed systems, automation platforms, and AI-assisted
            internal tools.
          </p>
          <InteractivePretextBlock
            tone="magenta"
            text="Router software. AI infrastructure. Product execution. Debugging under pressure. Build fast, ship clean."
          />
          <div className="cta-row">
            <a className="button button-primary" href="#experience">
              View Experience
            </a>
            <a
              className="button button-secondary"
              href="/assets/docs/Abhinav_resume___SDE___USA%20(2).pdf"
              target="_blank"
              rel="noreferrer"
            >
              Open Resume
            </a>
          </div>
        </section>

        <section className="comic-panel about-panel" id="about">
          <p className="panel-tag">About Me</p>
          <p className="intro">
            I enjoy solving complex systems problems and shaping products that users can trust. I
            like owning the full arc: design, implementation, debugging, and polished delivery.
          </p>
          <ul className="meta-list">
            <li>US citizen</li>
            <li>Visa sponsorship not required</li>
            <li>Open to full-time software roles in the USA</li>
          </ul>
        </section>

        <section className="comic-panel skills-panel" id="skills">
          <p className="panel-tag">Skills</p>
          <div className="skills-groups">
            {skillGroups.map((group) => (
              <article key={group.title} className="skill-group">
                <h3>{group.title}</h3>
                <div className="chip-list">
                  {group.skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="comic-panel experience-panel" id="experience">
          <p className="panel-tag">Experience</p>
          <div className="timeline">
            {experiences.map((experience) => (
              <article className="timeline-card" key={`${experience.company}-${experience.role}`}>
                <div className="timeline-meta">
                  <p>{experience.company}</p>
                  <span>{experience.period}</span>
                  <span>{experience.mode}</span>
                </div>
                <div className="timeline-copy">
                  <h3>{experience.role}</h3>
                  <ul className="timeline-list">
                    {experience.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="comic-panel projects-panel" id="projects">
          <p className="panel-tag">Projects</p>
          <div className="project-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.name}>
                <p className="card-kicker">{project.category}</p>
                <h3>{project.name}</h3>
                <p>{project.summary}</p>
                <a className="project-link" href={project.link} target="_blank" rel="noreferrer">
                  Open Link
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="comic-panel education-panel" id="education">
          <p className="panel-tag">Beyond Work</p>
          <h3>Range outside engineering</h3>
          <ul className="timeline-list">
            {extracurriculars.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="comic-panel contact-panel" id="contact">
          <p className="panel-tag">Let&apos;s Connect</p>
          <p>
            Open to high-ownership software engineering roles across distributed systems, backend
            infrastructure, AI tooling, and product-focused frontend work.
          </p>
          <div className="cta-row">
            <a
              className="button button-primary"
              href="/assets/docs/Abhinav_resume___SDE___USA%20(2).pdf"
              target="_blank"
              rel="noreferrer"
            >
              Resume
            </a>
            <a
              className="button button-secondary"
              href="https://www.linkedin.com/in/abhinav-jagan-polimera-411b431b1/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a
              className="button button-secondary"
              href="https://github.com/abhinavjagan"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
