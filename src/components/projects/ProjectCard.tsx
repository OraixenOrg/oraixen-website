import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Lock, ExternalLink } from 'lucide-react';
import { Project } from '../../types/project';
import { Card } from '../Card';

interface ProjectCardProps {
  project: Project;
}

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800';

export function ProjectCard({
  project
}: ProjectCardProps) {
  const [imageError, setImageError] = useState(false);

  return <Link to={`/projects/${project.slug}`} className="block h-full group">
      <Card interactive className="h-full flex flex-col overflow-hidden">
        <div className={`relative h-64 overflow-hidden flex items-center justify-center ${
          project.imageFit === 'contain' ? 'bg-white p-8' : 'bg-gray-800 p-6'
        }`}>
          <img
            src={imageError ? FALLBACK_IMAGE : project.imageUrl}
            alt={project.title}
            className={`transition-transform duration-700 group-hover:scale-105 ${
              project.imageFit === 'contain'
                ? 'object-contain w-full h-full max-h-[200px] max-w-[280px]'
                : 'w-full h-full object-cover group-hover:scale-110'
            }`}
            onError={() => setImageError(true)}
            loading="lazy"
          />
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

          {project.platforms && (project.platforms.website || project.platforms.playStore || project.platforms.appStore || project.platforms.dashboard) && (
            <div className="flex flex-wrap gap-2 mb-4">
              {project.platforms.website && (
                <a
                  href={project.platforms.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-xs px-2.5 py-1 bg-skyblue/10 text-skyblue rounded-md font-medium border border-skyblue/20 hover:bg-skyblue/20 transition-colors flex items-center gap-1"
                >
                  <ExternalLink size={12} />
                  Website
                </a>
              )}
              {project.platforms.playStore && (
                <a
                  href={project.platforms.playStore}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-xs px-2.5 py-1 bg-green-500/10 text-green-400 rounded-md font-medium border border-green-500/20 hover:bg-green-500/20 transition-colors flex items-center gap-1"
                >
                  <ExternalLink size={12} />
                  Play Store
                </a>
              )}
              {project.platforms.appStore && (
                <a
                  href={project.platforms.appStore}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-xs px-2.5 py-1 bg-blue-500/10 text-blue-400 rounded-md font-medium border border-blue-500/20 hover:bg-blue-500/20 transition-colors flex items-center gap-1"
                >
                  <ExternalLink size={12} />
                  App Store
                </a>
              )}
              {project.platforms.dashboard && (
                <a
                  href={project.platforms.dashboard}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-xs px-2.5 py-1 bg-purple-500/10 text-purple-400 rounded-md font-medium border border-purple-500/20 hover:bg-purple-500/20 transition-colors flex items-center gap-1"
                >
                  <ExternalLink size={12} />
                  Dashboard
                </a>
              )}
            </div>
          )}

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