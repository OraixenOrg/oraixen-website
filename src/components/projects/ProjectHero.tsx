import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Activity, ArrowLeft, Lock } from 'lucide-react';
import { Project } from '../../types/project';
import { FadeIn } from '../FadeIn';

interface ProjectHeroProps {
  /** Already localized by the caller, so this component never re-resolves copy. */
  project: Project;
  /** Resolved `useProjectImage(...)` result - the hook stays owned by the page. */
  image: { src: string; onError: () => void };
}

/**
 * The project-detail hero: identity on one side, artwork on the other.
 *
 * The artwork is NEVER painted behind the copy. A project image laid across the
 * full hero has to be dimmed for the text to stay readable, and a brand mark
 * treated that way reads as a faded watermark rather than as the project's own
 * asset. Here it keeps its own frame, at full strength, beside the text.
 *
 * The frame takes its height from the image's intrinsic ratio rather than a
 * fixed `min-height`, so a wide brand banner produces a wide, short panel and
 * not a tall box with the mark marooned in the middle of it. `max-h` is the
 * only clamp, and it exists for portrait artwork (app-store screenshots are
 * 1:2) which would otherwise run the hero off the screen.
 *
 * `imageFit` is read for one thing only - whether the artwork is inset or
 * bleeds to the frame's edges - and the project data is not involved in any
 * other decision here. There is deliberately no per-slug branch, so publishing
 * a project never means touching this file.
 */
export function ProjectHero({ project, image }: ProjectHeroProps) {
  const { t } = useTranslation('projectDetail');
  // 'contain' marks a logo meant to sit ON a surface, so it gets padding to
  // breathe. 'cover' marks full-bleed artwork, which runs to the frame's edges
  // - and must, because artwork carrying its own baked-in background would
  // otherwise show as a second rectangle floating inside the panel.
  const inset = project.imageFit === 'contain';

  return (
    <div className="w-full bg-surface py-8 sm:py-12 lg:py-14">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          {/* Identity leads in the DOM, so the stacked order on narrow screens
              is back link, badges, title, description, and artwork last. */}
          <div className="lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(300px,0.9fr)] lg:items-center lg:gap-12 xl:gap-16">
            <div>
              <Link
                to="/projects"
                className="group mb-7 inline-flex items-center font-medium text-teal transition-colors hover:text-teal-light sm:mb-8"
              >
                <ArrowLeft
                  size={20}
                  className="rtl-flip me-2 transition-transform group-hover:-translate-x-1"
                />
                {t('backLink')}
              </Link>

              <div className="mb-5 flex flex-wrap gap-3 sm:mb-6">
                <span className="rounded-full border border-teal/15 bg-teal/5 px-4 py-2 text-sm font-semibold text-teal">
                  {project.industry}
                </span>
                {project.confidential && (
                  <span className="flex items-center gap-2 rounded-full border border-teal/30 bg-teal px-4 py-2 text-sm font-semibold text-onaccent">
                    <Lock size={14} /> {t('confidential')}
                  </span>
                )}
                {/* Surfaced beside the title so availability is clear before a
                    reader reaches the overview band or the outbound links. */}
                {project.status && (
                  <span className="flex items-center gap-2 rounded-full border border-line bg-surface-subtle px-4 py-2 text-sm font-semibold text-body">
                    <Activity size={14} /> {t(`status.${project.status}`)}
                  </span>
                )}
              </div>

              <h1 className="page-hero-title mb-4 font-bold text-ink sm:mb-6">{project.title}</h1>

              <p className="max-w-[44rem] text-lg leading-relaxed text-body sm:text-xl">
                {project.description}
              </p>
            </div>

            <div
              className={`relative mt-8 overflow-hidden rounded-2xl border border-line bg-card shadow-card lg:mt-0 ${
                inset ? 'p-8 sm:p-10' : ''
              }`}
            >
              <img
                src={image.src}
                alt={project.title}
                onError={image.onError}
                fetchPriority="high"
                decoding="async"
                className="mx-auto h-auto w-full max-h-[280px] object-contain sm:max-h-[320px] lg:max-h-[360px]"
              />
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
