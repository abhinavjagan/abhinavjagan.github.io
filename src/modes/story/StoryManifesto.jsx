import { useEffect, useRef } from "react";

const LEARN_STEPS = ["Curiosity", "Deconstruction", "Obsession", "Building", "Mastery"];

const DOMAINS = [
  "Chess",
  "Karate",
  "Robotics",
  "Filming",
  "Art",
  "3D Printing",
  "Cars",
  "Sim Racing",
  "Trekking",
  "Research",
  "Networking",
  "AI",
];

const BEYOND = [
  "Athlete",
  "State-level chess",
  "Blue belt karate",
  "4 countries",
  "Himalayan treks",
  "World's largest cave ecosystem",
  "Art gifted to celebrities",
  "Home 3D printer",
  "Sim racing rig",
];

export default function StoryManifesto() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return undefined;
    }
    const items = root.querySelectorAll(".reveal");
    if (typeof IntersectionObserver === "undefined") {
      items.forEach((el) => el.classList.add("is-visible"));
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section
      className="manifesto"
      ref={rootRef}
      aria-label="A short manifesto — who I am, in short"
    >
      <div className="manifesto-inner">
        <section className="mfst-block mfst-os" aria-label="My Operating System">
          <div className="mfst-os-boot reveal">
            <header className="mfst-os-header">
              <p className="mfst-section-label">My Operating System</p>
            </header>

            <div
              className="mfst-os-terminal"
              role="img"
              aria-label="Boot sequence: modules Obsess, Explore, Commit, Think, and Ship loaded."
            >
              <div className="mfst-os-term-chrome" aria-hidden="true">
                <span />
                <span />
                <span />
                <p>~/abhinav.os</p>
              </div>
              <pre className="mfst-os-term-body" aria-hidden="true">
                <span className="mfst-os-line mfst-os-line--prompt">
                  <span className="mfst-os-caret">&gt;</span>
                  <span className="mfst-os-typed">run Abhinav.OS</span>
                  <span className="mfst-os-cursor" />
                </span>
                <span className="mfst-os-line mfst-os-line--sys">
                  Initializing modules…
                </span>
                <span className="mfst-os-line mfst-os-line--ok">
                  <span className="mfst-os-check">[✓]</span> Obsess()
                </span>
                <span className="mfst-os-line mfst-os-line--ok">
                  <span className="mfst-os-check">[✓]</span> Explore()
                </span>
                <span className="mfst-os-line mfst-os-line--ok">
                  <span className="mfst-os-check">[✓]</span> Commit()
                </span>
                <span className="mfst-os-line mfst-os-line--ok">
                  <span className="mfst-os-check">[✓]</span> Think()
                </span>
                <span className="mfst-os-line mfst-os-line--ok">
                  <span className="mfst-os-check">[✓]</span> Ship()
                </span>
              </pre>
            </div>
          </div>

          <div className="mfst-os-row mfst-os-row--pair reveal">
            <article className="mfst-os-card">
              <header>
                <span className="mfst-os-fn">Obsess()</span>
                <p className="mfst-os-tagline">Turn curiosity into creation.</p>
              </header>
              <div className="mfst-os-detail">
                <ul>
                  <li>Built custom NAS (network-attached storage)</li>
                  <li>Chess &mdash; competitive strategy thinking</li>
                  <li>
                    Art across mediums: paper &rarr; digital &rarr; 3D, also
                    presented artworks to celebrities
                  </li>
                  <li>Intermediate sim-racer in F1</li>
                </ul>
              </div>
            </article>

            <article className="mfst-os-card">
              <header>
                <span className="mfst-os-fn">Explore()</span>
                <p className="mfst-os-tagline">Step into different worlds.</p>
              </header>
              <div className="mfst-os-detail">
                <ul>
                  <li>
                    Worked across niche CS domains:
                    <ul className="mfst-os-nested">
                      <li>Computer Vision</li>
                      <li>Image Processing</li>
                      <li>Remote Sensing</li>
                      <li>Computer Graphics</li>
                    </ul>
                  </li>
                  <li>Karate &mdash; discipline + physical systems</li>
                  <li>
                    AI initiatives in networking by running quantized ML models
                    in routers at Cisco
                  </li>
                </ul>
              </div>
            </article>
          </div>

          <div className="mfst-os-row mfst-os-row--pair reveal">
            <article className="mfst-os-card">
              <header>
                <span className="mfst-os-fn">Commit()</span>
                <p className="mfst-os-tagline">Stay longer than most.</p>
              </header>
              <div className="mfst-os-detail">
                <ul>
                  <li>State-level chess competitor (CBSE south zone)</li>
                  <li>Karate blue-belt progression</li>
                  <li>Himalayan treks, ~4&nbsp;km altitude above sea level</li>
                  <li>Trekked the world&rsquo;s largest cave ecosystem</li>
                </ul>
              </div>
            </article>

            <article className="mfst-os-card">
              <header>
                <span className="mfst-os-fn">Think()</span>
                <p className="mfst-os-tagline">Strong fundamentals.</p>
              </header>
              <div className="mfst-os-detail">
                <ul>
                  <li>JEE Advanced &mdash; Rank 5,321 / 1,300,000</li>
                  <li>B.E. CS, BITS Hyderabad &mdash; 8.2&nbsp;CGPA</li>
                  <li>2 international research papers</li>
                  <li>Teaching Assistant &mdash; Internet of Things</li>
                </ul>
              </div>
            </article>
          </div>

          <div className="mfst-os-row mfst-os-row--ship reveal">
            <article className="mfst-os-card mfst-os-card--ship">
              <header>
                <span className="mfst-os-badge">Primary module</span>
                <span className="mfst-os-fn">Ship()</span>
                <p className="mfst-os-tagline">Build things that matter.</p>
              </header>
              <div className="mfst-os-detail">
                <ul>
                  <li>SDE&nbsp;2 @ Cisco Systems</li>
                  <li>Built GUE-based traffic mirroring (first-of-its-kind)</li>
                  <li>Delivered for Microsoft, SoftBank</li>
                  <li>Led end-to-end feature ownership across Cisco&nbsp;8000</li>
                  <li>
                    Built AI-driven infra &amp; tooling (productivity + deployment)
                  </li>
                </ul>
              </div>
            </article>
          </div>
        </section>

        <section className="mfst-block mfst-loop reveal">
          <p className="mfst-section-label">How I learn</p>
          <ol className="mfst-loop-steps">
            {LEARN_STEPS.map((step, i) => (
              <li key={step}>
                <span className="mfst-step-n">{String(i + 1).padStart(2, "0")}</span>
                <span className="mfst-step-text">{step}</span>
              </li>
            ))}
          </ol>
          <p className="mfst-block-caption">
            I break complexity into something I can build.
          </p>
        </section>

        <section className="mfst-block mfst-mosaic reveal">
          <p className="mfst-section-label">Where the same mind shows up</p>
          <ul className="mfst-mosaic-grid">
            {DOMAINS.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
          <p className="mfst-block-caption">Different mediums. Same obsession.</p>
        </section>

        <section className="mfst-block mfst-proof reveal">
          <p className="mfst-section-label">Proof, not claims</p>
          <div className="mfst-proof-grid">
            <article>
              <h3>Academic</h3>
              <ul>
                <li>
                  <span className="mfst-proof-key">JEE Advanced</span>
                  <span className="mfst-proof-val">Rank 5,321 / 1,300,000</span>
                </li>
                <li>
                  <span className="mfst-proof-key">Degree</span>
                  <span className="mfst-proof-val">B.E. CS, BITS Hyderabad</span>
                </li>
                <li>
                  <span className="mfst-proof-key">CGPA</span>
                  <span className="mfst-proof-val">8.2 / 10</span>
                </li>
                <li>
                  <span className="mfst-proof-key">Research</span>
                  <span className="mfst-proof-val">2 international papers</span>
                </li>
              </ul>
            </article>
            <article>
              <h3>Leadership</h3>
              <ul>
                <li>
                  <span className="mfst-proof-key">Teaching</span>
                  <span className="mfst-proof-val">TA, Internet of Things</span>
                </li>
                <li>
                  <span className="mfst-proof-key">Selection</span>
                  <span className="mfst-proof-val">Academic excellence</span>
                </li>
                <li>
                  <span className="mfst-proof-key">Collaboration</span>
                  <span className="mfst-proof-val">Senior faculty projects</span>
                </li>
                <li>
                  <span className="mfst-proof-key">Olympiads</span>
                  <span className="mfst-proof-val">Multiple medals</span>
                </li>
              </ul>
            </article>
            <article>
              <h3>Industry</h3>
              <ul>
                <li>
                  <span className="mfst-proof-key">Role</span>
                  <span className="mfst-proof-val">SDE II · Cisco 8000</span>
                </li>
                <li>
                  <span className="mfst-proof-key">Growth</span>
                  <span className="mfst-proof-val">SDE I → II in 1.5 yrs</span>
                </li>
                <li>
                  <span className="mfst-proof-key">Customers</span>
                  <span className="mfst-proof-val">Microsoft · SoftBank</span>
                </li>
                <li>
                  <span className="mfst-proof-key">Recognition</span>
                  <span className="mfst-proof-val">AI initiatives lead</span>
                </li>
              </ul>
            </article>
          </div>
        </section>

        <section className="mfst-block mfst-impact reveal">
          <p className="mfst-section-label">What I build</p>
          <article className="mfst-impact-card">
            <p className="mfst-impact-eyebrow">First-of-its-kind</p>
            <h3 className="mfst-impact-title">
              GUE-encap traffic mirroring on Cisco 8000 routers
            </h3>
            <ul className="mfst-impact-tags">
              <li>New capability</li>
              <li>Real customer impact</li>
              <li>Built at scale</li>
            </ul>
            <p className="mfst-impact-note">
              Shipped to enterprise customers. No other router vendor offers it today.
            </p>
          </article>
        </section>

        <section className="mfst-block mfst-beyond reveal">
          <p className="mfst-section-label">Beyond work</p>
          <ul className="mfst-chip-row">
            {BEYOND.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <p className="mfst-block-caption">
            I do not only build systems. I live inside challenges.
          </p>
        </section>

        <footer className="mfst-block mfst-closing reveal">
          <p className="mfst-closing-line">
            I get deeply invested in complex things, and I stay until they become
            something real.
          </p>
          <p className="mfst-closing-tag">Same engine. Different domains.</p>
        </footer>
      </div>
    </section>
  );
}
