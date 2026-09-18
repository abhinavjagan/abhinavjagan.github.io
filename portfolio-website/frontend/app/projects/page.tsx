import type { Metadata } from 'next';
import Link from 'next/link';
import { PROJECTS } from '@/utils/constants';
import { toSlug } from '@/utils/skills';
import { generateMetadata as generateMetaData } from '@/utils/seo';

export const dynamic = 'force-static';

export const metadata: Metadata = generateMetaData(
  'Projects',
  'Public builds, completed professional systems work, and published AI and computer-vision research.',
  '/projects'
);

export default function ProjectsPage() {
  return (
    <div className="pt-28 pb-16 container">
      <div className="section-rule mb-10" />
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="mono-title text-6xl mb-3">Projects</h1>
          <p className="text-white/75 max-w-2xl">
            Public builds, completed professional systems work, and published research with concrete engineering outcomes.
          </p>
        </div>

      </div>

      <div className="mt-8 mb-8">
        <Link href="/skills" className="text-xs uppercase tracking-[0.2em] text-white/70 hover:text-white">
          Browse Skills
        </Link>
      </div>

      <div className="project-detail-grid">
        {PROJECTS.map((project) => (
          <article key={project.title} className="ascii-panel project-detail-card">
            <span className="text-[10px] uppercase tracking-[0.14em] text-white/60">{project.category}</span>
            <h3 className="project-title-link">
              <Link href={`/projects/${project.slug}`}>{project.title}</Link>
            </h3>
            <p className="text-white/70 text-sm mb-4 leading-relaxed">{project.description}</p>
            <ul className="project-bullets">
              {project.details?.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-x-4 gap-y-2 mb-3">
              {project.skills?.map((skill) => (
                <Link
                  key={skill}
                  href={`/skills/${toSlug(skill)}`}
                  className="text-[12px] text-white/70 hover:text-white transition-colors"
                >
                  {skill}
                </Link>
              ))}
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {project.tech.map((tech) => (
                <span key={tech} className="text-[11px] text-white/52">
                  {tech}
                </span>
              ))}
            </div>
            <div className="project-actions">
              <Link href={`/projects/${project.slug}`}>Case study</Link>
              {project.links?.map((link) => (
                <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10">
        <Link
          href="/"
          className="text-xs uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors inline-flex items-center"
        >
          Back Home
        </Link>
      </div>
    </div>
  );
}
