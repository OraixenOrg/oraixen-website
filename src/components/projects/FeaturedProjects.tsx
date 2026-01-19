import React from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../../lib/projects';
import { ProjectCard } from './ProjectCard';
import { Button } from '../Button';
import { Section } from '../Section';
import { Stagger } from '../Stagger';
import { FadeIn } from '../FadeIn';
export function FeaturedProjects() {
  const featured = projects.filter(p => p.featured).slice(0, 3);
  return <Section className="bg-inkblack">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Featured Work
          </h2>
          <p className="text-gray-400 max-w-xl">
            A selection of our most impactful projects across various
            industries, showcasing our commitment to precision and innovation.
          </p>
        </FadeIn>
        <FadeIn delay={0.2} className="mt-6 md:mt-0">
          <Button href="/projects" variant="outline" icon>
            View All Projects
          </Button>
        </FadeIn>
      </div>

      <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featured.map(project => <div key={project.id}>
            <ProjectCard project={project} />
          </div>)}
      </Stagger>
    </Section>;
}