'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PROJECTS } from '@/utils/constants';

export default function ProjectAccordion() {
  const [activeProject, setActiveProject] = useState(PROJECTS[0]?.slug ?? '');

  return (
    <div className="project-accordion">
      {PROJECTS.map((project, index) => {
        const isOpen = activeProject === project.slug;

        return (
          <article key={project.slug} className={`project-fold ${isOpen ? 'is-open' : ''}`}>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`project-${project.slug}`}
              onClick={() => setActiveProject(isOpen ? '' : project.slug)}
            >
              <span>0{index + 1}</span>
              <strong>{project.title}</strong>
              <small>{project.category}</small>
            </button>

            <div id={`project-${project.slug}`} className="project-fold-body" hidden={!isOpen}>
              <div className="project-proof-row">
                <span>{project.status}</span>
                <span>{project.proof}</span>
              </div>
              <p>{project.description}</p>
              <ul className="project-bullets">
                {project.details?.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
              <div className="project-tech-row" aria-label="Technologies">
                {project.tech.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <div className="project-actions">
                <Link href={`/projects/${project.slug}`}>Case study</Link>
                {project.links?.length ? (
                  <>
                  {project.links.map((link) => (
                    <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                      {link.label}
                    </a>
                  ))}
                  </>
                ) : null}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
