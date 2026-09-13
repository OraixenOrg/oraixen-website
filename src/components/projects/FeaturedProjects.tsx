import { useTranslation } from 'react-i18next';
import { projects } from '../../lib/projects';
import { ProjectCard } from './ProjectCard';
import { Button } from '../Button';
import { Section } from '../Section';
import { Stagger } from '../Stagger';
import { FadeIn } from '../FadeIn';

export function FeaturedProjects() {
  const { t } = useTranslation('home');
  const featured = projects.filter(p => p.featured).slice(0, 3);
  return <Section className="bg-surface-subtle">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <FadeIn>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal/5 text-teal border border-teal/15 text-sm font-semibold mb-5">
            {t('featured.eyebrow')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4">
            {t('featured.title')}
          </h2>
          <p className="text-body max-w-xl leading-relaxed">
            {t('featured.subtitle')}
          </p>
        </FadeIn>
        <FadeIn>
          <Button href="/projects" variant="outline" icon>
            {t('featured.viewAll')}
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
