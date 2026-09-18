import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { generateMetadata as generateMetaData } from '@/utils/seo';
import { PROJECTS } from '@/utils/constants';
import { SKILL_CATALOG, findSkillBySlug, formatSkillCategory, toSlug } from '@/utils/skills';

export const metadata: Metadata = generateMetaData(
  'Skill',
  'Projects matched to a specific skill',
  '/skills'
);

metadata.robots = { index: false, follow: true };

export function generateStaticParams() {
  return SKILL_CATALOG.map((skill) => ({
    skill: skill.slug,
  }));
}

export default function SkillDetailPage({
  params,
}: {
  params: {
    skill: string;
  };
}) {
  const skill = findSkillBySlug(params.skill);
  if (!skill) notFound();

  const matchingProjects = PROJECTS.filter((p) => p.skills?.includes(skill.name));

  return (
    <div className="pt-28 pb-16 container">
      <div className="section-rule mb-10" />
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="mono-title text-6xl mb-3">{skill.name}</h1>
          <p className="text-white/75 max-w-2xl">
            {formatSkillCategory(skill.category)} projects matched to this skill.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 md:justify-end text-xs uppercase tracking-[0.2em] text-white/70">
          <Link href="/skills" className="hover:text-white transition-colors">
            Back to Skills
          </Link>
          <Link href="/projects" className="hover:text-white transition-colors">
            View all Projects
          </Link>
        </div>
      </div>

      <div className="mt-10 mb-6">
        <span className="text-[10px] uppercase tracking-[0.14em] text-white/60">
          {formatSkillCategory(skill.category)}
        </span>
      </div>

      {matchingProjects.length === 0 ? (
        <p className="text-white/75">No projects currently match this skill.</p>
      ) : (
        <div className="space-y-7">
          {matchingProjects.map((project) => (
            <article key={project.title} className="pb-6 border-b border-white/15">
              <span className="text-[10px] uppercase tracking-[0.14em] text-white/60">{project.category}</span>
              <h2 className="text-2xl font-semibold mt-2 mb-2">{project.title}</h2>
              <p className="text-white/70 text-sm mb-4 leading-relaxed">{project.description}</p>

              <div className="flex flex-wrap gap-x-4 gap-y-2 mb-3">
                {project.skills?.map((pSkill) => (
                  <Link
                    key={pSkill}
                    href={`/skills/${toSlug(pSkill)}`}
                    className="text-[12px] text-white/70 hover:text-white transition-colors"
                  >
                    {pSkill}
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
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
