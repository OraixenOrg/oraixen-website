import React from 'react';
import { Project } from '../../types/project';
import { projects } from '../../lib/projects';
import { ProjectCard } from './ProjectCard';
import { Section } from '../Section';
import { Stagger } from '../Stagger';
interface RelatedProjectsProps {
  currentSlug: string;
  category: string;
}
export function RelatedProjects({
  currentSlug,
  category
}: RelatedProjectsProps) {
  const related = projects.filter(p => p.category === category && p.slug !== currentSlug).slice(0, 3);
  if (related.length === 0) return null;
  return <Section className="bg-inkblack border-t border-white/5">
      <h2 className="text-2xl font-bold text-white mb-8">Related Projects</h2>
      <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {related.map(project => <div key={project.id}>
            <ProjectCard project={project} />
          </div>)}
      </Stagger>
    </Section>;
}