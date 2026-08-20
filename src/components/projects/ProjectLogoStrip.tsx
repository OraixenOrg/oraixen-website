import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { projects } from '../../lib/projects';
import { FadeIn } from '../FadeIn';
import { Marquee } from '../visual';

/** Home-page name strip — same text marquee as before, sourced from live projects. */
export function ProjectLogoStrip() {
  const { t } = useTranslation('home');
  const names = projects.filter((project) => !project.confidential);

  return (
    <div className="relative bg-surface border-b border-line py-16 overflow-hidden">
      <div className="container mx-auto px-4">
        <FadeIn>
          <p className="text-center text-sm font-semibold text-muted uppercase tracking-wider mb-2">
            {t('logos.eyebrow')}
          </p>
          <p className="text-center text-faint text-sm mb-10">{t('logos.caption')}</p>
        </FadeIn>
        <Marquee speed={40}>
          {names.map((project) => (
            <Link
              key={project.id}
              to={`/projects/${project.slug}`}
              dir="auto"
              className="marquee-item text-lg md:text-xl font-bold text-faint whitespace-nowrap"
            >
              {project.title}
            </Link>
          ))}
        </Marquee>
      </div>
    </div>
  );
}
