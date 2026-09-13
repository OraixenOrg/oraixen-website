import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation('projects');
  // Filter on language-neutral fields (category/slug); ProjectCard localizes the
  // displayed copy (title/description/industry) via localizeProject internally.
  const related = projects
    .filter(p => p.category === category && p.slug !== currentSlug)
    .slice(0, 3);

  if (related.length === 0) return null;

  return <Section dark className="border-t border-line">
      <h2 className="text-2xl font-bold text-ink mb-8">{t('related.title')}</h2>
      <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {related.map(project => <div key={project.id}>
            <ProjectCard project={project} />
          </div>)}
      </Stagger>
    </Section>;
}
