import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Lock } from 'lucide-react';
import { Project } from '../../types/project';
import { Card } from '../Card';
interface ProjectCardProps {
  project: Project;
}
export function ProjectCard({
  project
}: ProjectCardProps) {
  return <Link to={`/projects/${project.slug}`} className="block h-full group">
      <Card interactive className="h-full flex flex-col overflow-hidden">
        <div className="relative h-64 overflow-hidden">
          <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-inkblack via-inkblack/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

          <div className="absolute top-4 left-4 flex gap-2 z-10">
            <span className="px-3 py-1.5 text-xs font-semibold bg-inkblack/90 text-white backdrop-blur-md rounded-full border border-white/20">
              {project.industry}
            </span>
            {project.confidential && <span className="px-3 py-1.5 text-xs font-semibold bg-azure/90 text-white backdrop-blur-md rounded-full flex items-center gap-1.5 border border-skyblue/30">
                <Lock size={10} /> Confidential
              </span>}
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-skyblue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="p-6 flex-1 flex flex-col bg-gradient-to-b from-white/[0.02] to-transparent">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-skyblue transition-colors leading-tight">
                {project.title}
              </h3>
              <p className="text-sm text-gray-500 font-medium">
                {project.confidential ? 'Confidential Client' : project.client}
              </p>
            </div>
            <div className="bg-white/5 p-2.5 rounded-full text-white group-hover:bg-skyblue group-hover:text-inkblack transition-all duration-300 ml-4 shrink-0">
              <ArrowUpRight size={18} />
            </div>
          </div>

          <p className="text-gray-400 text-sm line-clamp-2 mb-6 flex-1 leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/5">
            {project.techStack.slice(0, 3).map(tech => <span key={tech} className="text-xs text-gray-400 bg-white/5 px-2.5 py-1 rounded-md font-medium border border-white/5">
                {tech}
              </span>)}
            {project.techStack.length > 3 && <span className="text-xs text-gray-500 bg-white/5 px-2.5 py-1 rounded-md font-medium">
                +{project.techStack.length - 3} more
              </span>}
          </div>
        </div>
      </Card>
    </Link>;
}