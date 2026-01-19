import React, { useState } from 'react';
import { Project } from '../../types/project';
import { ProjectCard } from './ProjectCard';
import { Stagger } from '../Stagger';
import { m, AnimatePresence } from 'framer-motion';
interface ProjectGridProps {
  projects: Project[];
}
export function ProjectGrid({
  projects
}: ProjectGridProps) {
  const [filter, setFilter] = useState<string>('All');
  const categories = ['All', 'Mobile', 'Web', 'Platform', 'Hardware', 'AI'];
  const filteredProjects = filter === 'All' ? projects : projects.filter(p => p.category === filter);
  return <div className="space-y-12">
      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-4">
        {categories.map(category => <button key={category} onClick={() => setFilter(category)} className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${filter === category ? 'bg-skyblue text-inkblack shadow-[0_0_15px_rgba(86,201,227,0.3)]' : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'}`}>
            {category}
          </button>)}
      </div>

      {/* Grid */}
      <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map(project => <m.div key={project.id} layout initial={{
          opacity: 0,
          scale: 0.9
        }} animate={{
          opacity: 1,
          scale: 1
        }} exit={{
          opacity: 0,
          scale: 0.9
        }} transition={{
          duration: 0.3
        }}>
              <ProjectCard project={project} />
            </m.div>)}
        </AnimatePresence>
      </Stagger>

      {filteredProjects.length === 0 && <div className="text-center py-20 text-gray-500">
          No projects found in this category.
        </div>}
    </div>;
}