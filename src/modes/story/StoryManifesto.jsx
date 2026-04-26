import { useEffect, useRef } from "react";
import { GITHUB_HREF, projects } from "../cv/cvContent.js";

const SHIP_PROJECT_LINKS = {
  playlistify: projects.find((p) => p.name === "Playlistify"),
  drone: projects.find((p) => p.name === "Remote Drone Surveillance"),
  nerf: projects.find(
    (p) =>
      p.name ===
      "Performance Assessment of Neural Radiance Fields and Photogrammetry",
  ),
};

/** Gentle tilt cycle — layout is flex-wrap so nothing overlaps. */
const UNIVERSE_ROT = [-2, 1.2, -0.8, 1.8, -1.4, 0.6, -1, 1.5, -2.2, 0.9];

/**
 * Domains + life threads — order mixes cyan tags and orange lines; CSS lays out as wrapped rows.
 * kind "tag" = short pillar labels; "line" = fuller phrases. wide = own centered row (long copy).
 * longTag = cyan tag with larger max-width + wrap (no ellipsis).
 */
const UNIVERSE_CLOUD = [
  { text: "Chess — 1600 ELO", kind: "tag" },
  { text: "Athlete", kind: "line" },
  { text: "Karate — blue belt", kind: "tag" },
  { text: "State-level chess", kind: "line" },
  { text: "NAS", kind: "tag" },
  { text: "Filming", kind: "tag" },
  { text: "Travelled 4 countries", kind: "line" },
  { text: "Art — sketching → vector", kind: "tag" },
  { text: "Himalayan treks", kind: "line" },
  { text: "3D Printing", kind: "tag" },
  { text: "Art - presented to celebrities", kind: "line" },
  {
    text: "Trekked world's largest cave ecosystem",
    kind: "line",
    wide: true,
  },
  { text: "Sim racing rig", kind: "line" },
  { text: "Research — 2 international conference papers", kind: "line" },
  { text: "Networking — traffic mirroring", kind: "tag", longTag: true },
  { text: "AI", kind: "tag" },
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
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
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
          <div className="mfst-os-slide mfst-os-slide--boot mfst-os-boot reveal">
            <div className="mfst-os-slide-inner">
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
          </div>

          <div className="mfst-os-slide reveal">
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
          </div>

          <div className="mfst-os-slide reveal">
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

          <div className="mfst-os-slide reveal">
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
          </div>

          <div className="mfst-os-slide reveal">
            <article className="mfst-os-card">
              <header>
                <span className="mfst-os-fn">Think()</span>
                <p className="mfst-os-tagline">Strong fundamentals.</p>
              </header>
              <div className="mfst-os-detail">
                <ul>
                  <li>
                    JEE Advanced &mdash; All India Rank of 5,321 / 1,300,000
                  </li>
                  <li>
                    B.E. CS, BITS Pilani, Hyderabad campus &mdash; 8.2&nbsp;CGPA
                  </li>
                  <li>2 international research papers</li>
                  <li>Teaching Assistant &mdash; Internet of Things</li>
                </ul>
              </div>
            </article>
          </div>

          <div className="mfst-os-slide reveal">
            <article className="mfst-os-card mfst-os-card--ship mfst-os-card--ship-detailed">
              <header>
                <span className="mfst-os-badge">Primary module</span>
                <span className="mfst-os-fn">Ship()</span>
                <p className="mfst-os-tagline">Build things that matter.</p>
              </header>
              <div className="mfst-os-detail mfst-os-ship-narrative">
                <p>
                  At Cisco, I&rsquo;ve been working deep in distributed systems on the
                  Cisco&nbsp;8000 routers. One of the biggest things I owned was rethinking
                  how packet mirroring works at scale&mdash;I designed a new ERSPAN approach
                  using GUE instead of GRE, and drove it end-to-end for a real Microsoft use
                  case. It wasn&rsquo;t just a design exercise&mdash;it shipped with
                  hardware-backed performance improvements. This is a one-of-one feature not
                  offered by any other competitor in the market.
                </p>
                <p>
                  I&rsquo;ve also worked on bringing up egress traffic mirroring on
                  Silicon One routers, helping match older NCS systems so customers like
                  SoftBank could migrate smoothly. We managed to cut delivery time
                  significantly by leaning heavily on AI during development and debugging.
                </p>
                <p>
                  Beyond core networking, I&rsquo;ve been exploring how AI fits into
                  networking infrastructure itself. I was part of a small team building an
                  IaaS-style system to deploy quantized ML models directly on
                  routers&mdash;we took it from idea to a working prototype that reached
                  customer evaluation.
                </p>
                <p>
                  I tend to build tools when something feels inefficient. That led me to
                  create internal systems&mdash;from a leadership metrics analyzer to a
                  drag-and-drop traffic mirroring platform&mdash;focused on making complex
                  workflows simpler and faster.
                </p>
                <p className="mfst-os-ship-outside-lead">
                  Outside of work, I like experimenting across domains:
                </p>
                <ul className="mfst-os-ship-narrative-points">
                  <li>
                    I also built Playlistify, a small web product on top of the Spotify API
                    that turns your liked songs into clean, shareable playlists
                    instantly&mdash;because that friction annoyed me enough to fix it.{" "}
                    <a
                      href={SHIP_PROJECT_LINKS.playlistify?.link ?? GITHUB_HREF}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mfst-os-inline-link"
                    >
                      {SHIP_PROJECT_LINKS.playlistify?.ctaLabel ?? "GitHub"}
                    </a>
                  </li>
                  <li>
                    On the ML side, I worked on a drone-based surveillance pipeline that
                    detects and flags suspicious activity in real time using YOLO and image
                    processing techniques.{" "}
                    <a
                      href={SHIP_PROJECT_LINKS.drone?.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mfst-os-inline-link"
                    >
                      {SHIP_PROJECT_LINKS.drone?.ctaLabel ?? "Publication"}
                    </a>
                  </li>
                  <li>
                    And on the research front, I explored 3D reconstruction&mdash;comparing
                    NeRFs and photogrammetry&mdash;and presented that work at ICAART.{" "}
                    <a
                      href={SHIP_PROJECT_LINKS.nerf?.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mfst-os-inline-link"
                    >
                      {SHIP_PROJECT_LINKS.nerf?.ctaLabel ?? "Publication"}
                    </a>
                  </li>
                </ul>
              </div>
            </article>
          </div>
        </section>

        <section
          className="mfst-block mfst-universe reveal"
          aria-label="One engine, multiple domains — interests and life threads"
        >
          <header className="mfst-universe-hero">
            <p className="mfst-universe-tagline">One engine, multiple domains</p>
            <p className="mfst-section-label mfst-universe-sub">Same obsession, different surfaces</p>
            <p className="mfst-universe-lede">
              A loose map of where the same wiring shows up.
            </p>
          </header>

          <div className="mfst-universe-cloud">
            {UNIVERSE_CLOUD.map((item, i) => (
              <span
                key={`${item.text}-${i}`}
                className={[
                  "mfst-universe-bubble",
                  `mfst-universe-bubble--${item.kind}`,
                  item.wide ? "mfst-universe-bubble--wide" : "",
                  item.longTag ? "mfst-universe-bubble--tag-long" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                style={{
                  "--bubble-rot": `${UNIVERSE_ROT[i % UNIVERSE_ROT.length]}deg`,
                  "--stagger": i * 0.028,
                }}
              >
                {item.text}
              </span>
            ))}
          </div>

          <p className="mfst-universe-caption">
            I do not only build systems. I live inside challenges.
          </p>

          <footer className="mfst-universe-outro">
            <p className="mfst-universe-outro-line">
              I get deeply invested in complex things, and I stay until they become
              something real.
            </p>
          </footer>
        </section>
      </div>
    </section>
  );
}
