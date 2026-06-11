import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight, Lock, ExternalLink } from 'lucide-react';
import { Project } from '../../types/project';
import { Card } from '../Card';
import { localizeProject } from '../../lib/projects';

interface ProjectCardProps {
  project: Project;
}

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800';

export function ProjectCard({
  project: rawProject
}: ProjectCardProps) {
  const { t, i18n } = useTranslation('projects');
  const [imageError, setImageError] = useState(false);

  const project = localizeProject(rawProject, i18n.language);

  return <Link
      to={`/projects/${project.slug}`}
      className="block h-full group"
      aria-label={t('card.ariaLabel', { project: project.title, industry: project.industry })}
    >
      <Card interactive className="h-full flex flex-col overflow-hidden">
        <div className={`relative h-64 overflow-hidden flex items-center justify-center border-b border-line ${
          project.imageFit === 'contain' ? 'bg-white p-8' : 'bg-surface-subtle p-6'
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

          <div className="absolute top-4 start-4 flex gap-2 z-10">
            <span className="px-3 py-1.5 text-xs font-semibold bg-card/90 text-ink backdrop-blur-md rounded-full border border-line">
              {project.industry}
            </span>
            {project.confidential && <span className="px-3 py-1.5 text-xs font-semibold bg-teal/90 text-onaccent backdrop-blur-md rounded-full flex items-center gap-1.5 border border-teal/30">
                <Lock size={10} /> {t('card.confidential')}
              </span>}
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-teal/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="p-6 flex-1 flex flex-col bg-card">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-ink mb-2 group-hover:text-teal transition-colors leading-tight">
                {project.title}
              </h3>
              <p className="text-sm text-muted font-medium">
                {project.confidential ? t('card.confidentialClient') : project.client}
              </p>
            </div>
            <div className="bg-surface-subtle p-2.5 rounded-full text-teal group-hover:bg-teal group-hover:text-onaccent transition-all duration-300 ms-4 shrink-0">
              <ArrowUpRight size={18} className="rtl-flip" />
            </div>
          </div>

          <p className="text-body text-sm line-clamp-2 mb-6 flex-1 leading-relaxed">
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
                  className="text-xs px-2.5 py-1 bg-teal/5 text-teal rounded-md font-medium border border-teal/15 hover:bg-teal/10 transition-colors flex items-center gap-1"
                >
                  <ExternalLink size={12} />
                  {t('card.platforms.website')}
                </a>
              )}
              {project.platforms.playStore && (
                <a
                  href={project.platforms.playStore}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-xs px-2.5 py-1 bg-emerald-500/10 text-emerald-600 rounded-md font-medium border border-emerald-500/20 hover:bg-emerald-500/15 transition-colors flex items-center gap-1"
                >
                  <ExternalLink size={12} />
                  {t('card.platforms.playStore')}
                </a>
              )}
              {project.platforms.appStore && (
                <a
                  href={project.platforms.appStore}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-xs px-2.5 py-1 bg-sky-500/10 text-sky-600 rounded-md font-medium border border-sky-500/20 hover:bg-sky-500/15 transition-colors flex items-center gap-1"
                >
                  <ExternalLink size={12} />
                  {t('card.platforms.appStore')}
                </a>
              )}
              {project.platforms.dashboard && (
                <a
                  href={project.platforms.dashboard}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-xs px-2.5 py-1 bg-violet-500/10 text-violet-600 rounded-md font-medium border border-violet-500/20 hover:bg-violet-500/15 transition-colors flex items-center gap-1"
                >
                  <ExternalLink size={12} />
                  {t('card.platforms.dashboard')}
                </a>
              )}
            </div>
          )}

          <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-line">
            {project.techStack.slice(0, 3).map(tech => <span key={tech} className="text-xs text-body bg-surface-subtle px-2.5 py-1 rounded-md font-medium border border-line">
                {tech}
              </span>)}
            {project.techStack.length > 3 && <span className="text-xs text-muted bg-surface-subtle px-2.5 py-1 rounded-md font-medium">
                {t('card.more', { count: project.techStack.length - 3 })}
              </span>}
          </div>
        </div>
      </Card>
    </Link>;
}
