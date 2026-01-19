import React from 'react';
import { Section } from '../components/Section';
import { FadeIn } from '../components/FadeIn';
import { ProjectGrid } from '../components/projects/ProjectGrid';
import { projects } from '../lib/projects';
export function Projects() {
  return <div className="pt-20 min-h-screen bg-inkblack">
      <Section>
        <div className="text-center max-w-3xl mx-auto mb-20">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-skyblue/10 border border-skyblue/20 mb-8 backdrop-blur-sm">
              <span className="text-sm font-medium text-skyblue">
                Portfolio
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              Our Work
            </h1>
            <p className="text-xl md:text-2xl text-gray-400">
              A showcase of premium digital products, from enterprise platforms
              to consumer mobile apps.
            </p>
          </FadeIn>
        </div>

        <ProjectGrid projects={projects} />
      </Section>
    </div>;
}