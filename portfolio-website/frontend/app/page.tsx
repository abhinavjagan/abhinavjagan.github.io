import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ProjectAccordion from '@/components/ProjectAccordion';
import { generateMetadata as generateMetaData, structuredData } from '@/utils/seo';
import { EXPERIENCE, SKILLS, SOCIAL_LINKS } from '@/utils/constants';
import { formatSkillCategory, type SkillCategory } from '@/utils/skills';

export const metadata: Metadata = generateMetaData(
  'AI Applications, Infrastructure & Distributed Systems',
  'Software engineer building reliable AI applications and the distributed, networked systems beneath them.',
  '/'
);

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData('person', {})),
        }}
      />

      <div id="top" className="scroll-mt-24 pt-12 pb-6">
        <section className="container hero-grid pt-10">
          <div className="hero-copy">
            <div className="hero-badges">
              <span>U.S. Citizen</span>
              <span>No sponsorship required</span>
              <span>Open across the U.S.</span>
            </div>
            <p className="ascii-kicker">AI applications · infrastructure · distributed systems</p>
            <h1 className="mono-title hero-title">
              AI APPLICATIONS.
              <br />
              DISTRIBUTED FOUNDATIONS.
            </h1>
            <p className="mt-8 max-w-2xl text-white/75 text-base md:text-lg leading-relaxed">
              I build reliable AI applications and developer platforms with a systems engineer&apos;s view of the
              layers beneath them—from agent workflows and evaluation to telemetry, network software, and
              distributed infrastructure.
            </p>
            <div className="mt-10 flex flex-wrap gap-6 text-xs uppercase tracking-[0.2em] text-white/70">
              <Link href="/#projects">Selected work</Link>
              <a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer">GitHub</a>
              <Link href="/resume.pdf" target="_blank" rel="noreferrer">Resume</Link>
              <Link href="/#contact">Contact</Link>
            </div>
          </div>
          <figure className="hero-porsche">
            <Image
              src="/ascii-new.png"
              alt="Black-and-white Porsche 911 GT3 RS poster"
              width={1280}
              height={1600}
              priority
              sizes="(max-width: 900px) calc(100vw - 1.25rem), 42vw"
              className="hero-porsche-image"
            />
          </figure>
        </section>

        <section className="container pb-12" aria-label="Proof points">
          <div className="proof-strip">
            <div><strong>2+ years</strong><span>systems engineering at Cisco</span></div>
            <div><strong>Public build</strong><span>multi-agent AI application</span></div>
            <div><strong>2 papers</strong><span>AI / computer-vision research</span></div>
            <div><strong>U.S. citizen</strong><span>no sponsorship required</span></div>
          </div>
        </section>

        <section id="about" className="container py-20 scroll-mt-24">
          <div className="section-rule mb-10" />
          <div className="grid md:grid-cols-12 gap-8">
            <div className="md:col-span-4">
              <p className="ascii-kicker">The bridge</p>
              <h2 className="mono-title text-5xl md:text-6xl">Below the API layer</h2>
            </div>
            <div className="md:col-span-8 ascii-panel">
              <pre>{String.raw`> current: software engineer @ Cisco
> direction: AI applications + infrastructure
> advantage: networking + distributed systems
> search: high-ownership U.S. startup teams`}</pre>
              <div className="space-y-4 text-white/75 leading-relaxed mt-6">
                <p>
                  I like owning the full path from a user problem to a system that behaves reliably in production:
                  the application, its context and evaluation layer, the runtime, and the infrastructure underneath.
                </p>
                <p>
                  My foundation is router software, packet systems, telemetry, C/C++, Python, and Linux. I am applying
                  that depth to agent platforms, AI developer tools, edge inference, observability, and distributed AI
                  systems. My focus is engineering the systems that make models useful and reliable.
                </p>
                <p>
                  I am looking for technically ambitious teams where engineers stay close to the product, take real
                  ownership, and learn quickly from each other.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="container py-20 scroll-mt-24">
          <div className="section-rule mb-10" />
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="ascii-kicker">Proof over keywords</p>
              <h2 className="mono-title text-5xl md:text-6xl">Selected work</h2>
              <p className="mt-6 text-white/72 max-w-2xl">
                Public builds, completed professional systems work, and published research. Each item focuses on the
                engineering problem, the work completed, and the resulting outcome.
              </p>
            </div>
            <Link href="/projects" className="ascii-stamp">/all-work</Link>
          </div>
          <ProjectAccordion />
        </section>

        <section id="experience" className="container py-20 scroll-mt-24">
          <div className="section-rule mb-10" />
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="ascii-kicker">Production foundation</p>
              <h2 className="mono-title text-5xl md:text-6xl">Engineering at Cisco</h2>
              <p className="mt-4 max-w-2xl text-white/72">
                Progression from network-systems automation to distributed router software and AI-assisted engineering
                infrastructure, with completed work described in concrete technical terms.
              </p>
            </div>
            <span className="ascii-stamp">/experience/cisco</span>
          </div>
          <div className="timeline-grid mt-10">
            {EXPERIENCE.map((role) => (
              <article key={`${role.company}-${role.position}`} className="ascii-panel role-card">
                <div className="role-meta">
                  <span>{role.duration}</span>
                  <span>{role.location}</span>
                </div>
                <h3>{role.position}</h3>
                <p>{role.company}</p>
                <ul>
                  {role.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="container py-20 scroll-mt-24">
          <div className="section-rule mb-10" />
          <p className="ascii-kicker">Working toolkit</p>
          <h2 className="mono-title text-5xl md:text-6xl mb-4">Tools with a trail</h2>
          <p className="text-white/72 max-w-2xl mb-8">
            A deliberately smaller list tied to professional work, public source code, or published research.
          </p>
          <div className="ascii-skill-grid">
            {Object.entries(SKILLS).map(([category, items]) => (
              <div key={category} className="ascii-panel">
                <h3 className="text-white/60 uppercase tracking-[0.2em] text-xs mb-4">
                  {formatSkillCategory(category as SkillCategory)}
                </h3>
                <div className="skill-cloud">
                  {items.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="extra" className="container py-20 scroll-mt-24">
          <div className="section-rule mb-10" />
          <div className="extra-hero">
            <div>
              <p className="ascii-kicker">Beyond the terminal</p>
              <h2 className="mono-title text-5xl md:text-6xl">Curious by default</h2>
            </div>
            <p className="text-white/66 max-w-xl leading-relaxed">
              The same instinct shows up outside software: learn the system, make something, test it, and notice the
              details other people miss.
            </p>
          </div>

          <div className="beyond-grid mt-10">
            <article className="ascii-panel beyond-card">
              <span>01 / Visual practice</span>
              <h3>Photography, sketching, and digital art</h3>
              <p>Self-taught visual work that keeps observation, composition, and craft in the weekly routine.</p>
            </article>
            <article className="ascii-panel beyond-card">
              <span>02 / Making</span>
              <h3>3D modeling and printing</h3>
              <p>Learning by turning digital models into physical objects—and debugging every imperfect print.</p>
            </article>
            <article className="ascii-panel beyond-card">
              <span>03 / Machines</span>
              <h3>Cars, F1, and sim racing</h3>
              <p>A long-running fascination with vehicle design, telemetry, control, and the tradeoffs behind speed.</p>
            </article>
            <article className="ascii-panel beyond-card">
              <span>04 / Field notes</span>
              <h3>Trekking and independent travel</h3>
              <p>Himalayan trails around 13,000 feet, a cave hike in Vietnam, and backpacking through the country.</p>
            </article>
          </div>

          <p className="beyond-footnote">
            Also: school-level competitive chess and karate training through blue belt. Original photo essays and
            documented 3D builds will be added as the work is ready.
          </p>
        </section>

        <section id="contact" className="container py-20 scroll-mt-24">
          <div className="section-rule mb-10" />
          <p className="ascii-kicker">Next system</p>
          <h2 className="mono-title text-5xl md:text-6xl mb-5">Let&apos;s build where AI meets reality</h2>
          <p className="text-white/75 mb-3 max-w-2xl leading-relaxed">
            I am interested in high-ownership U.S. roles across AI applications, agent infrastructure, ML systems,
            observability, inference platforms, and distributed infrastructure.
          </p>
          <p className="text-white/58 mb-8 max-w-2xl">
            U.S. citizen · no sponsorship required · open to relocation anywhere in the United States
          </p>
          <div className="flex flex-wrap gap-6 text-xs uppercase tracking-[0.2em] text-white/70">
            <a href={`mailto:${SOCIAL_LINKS.email}`}>Email</a>
            <a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer">GitHub</a>
            <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </section>
      </div>
    </>
  );
}
