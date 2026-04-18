const skills = {
  languages: ["JavaScript", "TypeScript", "Python", "Java", "C++"],
  frontend: ["React", "Next.js", "Tailwind CSS", "HTML5", "CSS3"],
  backend: ["Node.js", "Express", "PostgreSQL", "MongoDB", "GraphQL"],
  tools: ["Git", "Docker", "AWS", "Vercel", "CI/CD"],
};

const experiences = [
  {
    company: "Cisco Systems",
    role: "Software Developer, Distributed Systems",
    period: "Aug 2024 - Present",
    mode: "On-site",
    points: [
      "Designed next-gen ERSPAN with GUE encapsulation to improve scalable packet mirroring on Cisco 8000 routers.",
      "Led egress traffic mirroring delivery for SoftBank migration, reducing delivery time by 60%.",
      "Built automation and AI-assisted internal tools for faster debugging and release execution.",
    ],
  },
  {
    company: "Cisco Systems",
    role: "Technical Intern, Distributed Systems",
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
    category: "Web Product",
    summary:
      "Built a Flask + Spotify API product that turns liked songs into curated shareable playlists.",
    link: "https://github.com/abhinavjagan",
  },
  {
    name: "Remote Drone Surveillance",
    category: "ML + Computer Vision",
    summary:
      "Built a drone surveillance pipeline with YOLO and OpenCV for suspicious activity detection.",
    link: "https://www.researchgate.net/publication/377547504_Detection_of_Suspicious_Activities_at_Remote_Locations_by_using_UAVs_and_Computer_Vision",
  },
  {
    name: "NeRF vs Photogrammetry Study",
    category: "3D Reconstruction Research",
    summary:
      "Presented comparative NeRF and photogrammetry performance findings for realistic 3D scene reconstruction.",
    link: "https://www.researchgate.net/publication/378826735_Performance_Assessment_of_Neural_Radiance_Fields_NeRF_and_Photogrammetry_for_3D_Reconstruction_of_Man-Made_and_Natural_Features",
  },
];

const extracurriculars = [
  "Represented school at the state-level CBSE Clusters South Zone tournament.",
  "Karate blue belt.",
  "Artist, graphic designer, and photographer.",
  "Trekked the Himalayas and the world's largest cave ecosystem in Vietnam.",
];

function App() {
  return (
    <div className="comic-shell" id="top">
      <header className="top-nav panel">
        <div className="logo">AP</div>
        <nav>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main className="comic-grid">
        <section className="panel hero-panel">
          <p className="tag">Hey, I'm</p>
          <h1 className="hero-name">
            <span className="hero-name-primary">ABHINAV</span>
            <span className="hero-name-secondary">POLIMERA</span>
          </h1>
          <p className="hero-role">Software Engineer</p>
          <p className="hero-copy">
            I build distributed systems, AI-assisted developer tooling, and polished product
            experiences that solve meaningful problems.
          </p>
          <div className="chip-row">
            <span>US Citizen</span>
            <span>No sponsorship required</span>
          </div>
          <a
            className="action-btn"
            href="/assets/docs/Abhinav_resume___SDE___USA%20(2).pdf"
            target="_blank"
            rel="noreferrer"
          >
            View Resume
          </a>
        </section>

        <section className="panel splash-panel" aria-label="Comic artwork backdrop" />

        <section className="panel" id="about">
          <h2>About Me</h2>
          <p>
            I enjoy owning hard technical problems end-to-end: architecture, implementation,
            debugging, and final delivery. I care about both engineering depth and product clarity.
          </p>
          <ul className="list-tight">
            <li>Location: Dallas, TX</li>
            <li>Email: helpdevverse@gmail.com</li>
            <li>Open to full-time software engineering roles</li>
          </ul>
        </section>

        <section className="panel" id="skills">
          <h2>Skills</h2>
          <div className="skills-columns">
            <div>
              <h3>Languages</h3>
              <p>{skills.languages.join(" • ")}</p>
              <h3>Frontend</h3>
              <p>{skills.frontend.join(" • ")}</p>
            </div>
            <div>
              <h3>Backend</h3>
              <p>{skills.backend.join(" • ")}</p>
              <h3>Tools</h3>
              <p>{skills.tools.join(" • ")}</p>
            </div>
          </div>
        </section>

        <section className="panel wide" id="experience">
          <h2>Experience</h2>
          <div className="stack">
            {experiences.map((experience) => (
              <article className="mini-card" key={`${experience.company}-${experience.role}`}>
                <div className="mini-header">
                  <h3>{experience.role}</h3>
                  <span>{experience.period}</span>
                </div>
                <p className="mini-sub">
                  {experience.company} • {experience.mode}
                </p>
                <ul className="list-tight">
                  {experience.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="panel" id="projects">
          <h2>Projects</h2>
          <div className="stack">
            {projects.map((project) => (
              <article className="mini-card" key={project.name}>
                <p className="mini-sub">{project.category}</p>
                <h3>{project.name}</h3>
                <p>{project.summary}</p>
                <a href={project.link} target="_blank" rel="noreferrer">
                  Open project
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="panel" id="education">
          <h2>Education</h2>
          <p className="edu-title">B.Tech in Computer Science</p>
          <p>Vellore Institute of Technology • 2017 - 2021</p>
          <p>CGPA: 8.6 / 10</p>
          <h3>Beyond Work</h3>
          <ul className="list-tight">
            {extracurriculars.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="panel wide contact" id="contact">
          <h2>Let's Connect</h2>
          <p>Open to software engineering roles across backend, distributed systems, and AI tooling.</p>
          <div className="contact-row">
            <a href="mailto:helpdevverse@gmail.com">helpdevverse@gmail.com</a>
            <a
              href="https://www.linkedin.com/in/abhinav-jagan-polimera-411b431b1/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a href="https://github.com/abhinavjagan" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
