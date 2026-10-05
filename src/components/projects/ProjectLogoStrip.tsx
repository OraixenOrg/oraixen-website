import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { localizeProject, projects } from '../../lib/projects';
import { FadeIn } from '../FadeIn';
import { Marquee } from '../visual';

/**
 * Home-page name strip - the approved public portfolio, in the approved order.
 *
 * Every project in `projects` is listed. `confidential` marks the CONTRACTING
 * CLIENT's identity as private, not the product's name: "Duvdu" is the public
 * product, and the company that commissioned it is what stays unnamed. Filtering
 * on that flag therefore hid fourteen of the fifteen approved names and left the
 * strip looping a single one. Nothing but `title` is rendered here, so no client,
 * legal entity or commercial relationship is exposed by listing them all.
 */
export function ProjectLogoStrip() {
  const { t, i18n } = useTranslation('home');
  // Order is inherited from PROJECT_DISPLAY_ORDER via `projects` and never re-sorted.
  const names = projects.map((project) => localizeProject(project, i18n.language));

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
