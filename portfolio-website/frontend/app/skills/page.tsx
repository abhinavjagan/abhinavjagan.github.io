import type { Metadata } from 'next';
import Link from 'next/link';
import { generateMetadata as generateMetaData } from '@/utils/seo';
import { SKILLS } from '@/utils/constants';
import { formatSkillCategory, toSlug, type SkillCategory } from '@/utils/skills';

export const metadata: Metadata = generateMetaData(
  'Skills',
  'Browse my skills and see matching projects',
  '/skills'
);

metadata.robots = { index: false, follow: true };

export default function SkillsPage() {
  return (
    <div className="pt-28 pb-16 container">
      <div className="section-rule mb-10" />
      <h1 className="mono-title text-6xl mb-4">Skills</h1>
      <p className="text-white/75 max-w-2xl mb-12">Browse each skill to see related projects.</p>

      <div className="space-y-10">
        {Object.entries(SKILLS).map(([category, items]) => (
          <section key={category}>
            <h2 className="text-white/60 uppercase tracking-[0.2em] text-xs mb-4">
              {formatSkillCategory(category as SkillCategory)}
            </h2>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {items.map((skill) => (
                <Link key={skill} href={`/skills/${toSlug(skill)}`} className="text-white/80 hover:text-white transition-colors">
                  {skill}
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
