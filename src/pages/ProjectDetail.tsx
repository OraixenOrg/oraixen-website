import { useParams, Navigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Activity, ArrowLeft, Calendar, Globe2, Layers, Lock, Tag, User } from 'lucide-react';
import { isCaseStudy } from '../types/project';
import {
  projects,
  localizeProject,
  hasPlatformLinks,
  PROJECT_FALLBACK_IMAGE,
} from '../lib/projects';
import { Section } from '../components/Section';
import { FadeIn } from '../components/FadeIn';
import { ProjectCaseStudy } from '../components/projects/ProjectCaseStudy';
import { ProjectPlatformLinks } from '../components/projects/ProjectPlatformLinks';
import { RelatedProjects } from '../components/projects/RelatedProjects';
import { CTASection } from '../components/ui';
import { Seo } from '../components/Seo';
import {
  AuroraBackground,
  AnimatedCounter,
  SpotlightCard,
  Reveal,
} from '../components/visual';

/** A value spanning more than one year ("2024–2026") is a period, not a year. */
const RANGE = /[-\u2013\u2014]/;

/**
 * Column count for the overview band, keyed by how many facts the project
 * actually publishes. A project with no public year or no tech stack renders
 * fewer cells, and the row tightens instead of leaving a hole at the end.
 */
const OVERVIEW_COLUMNS: Record<number, string> = {
  1: 'md:grid-cols-1 lg:grid-cols-1',
  2: 'md:grid-cols-2 lg:grid-cols-2',
  3: 'md:grid-cols-2 lg:grid-cols-3',
  // 5 keeps four columns so the legacy layout (four facts plus the tech stack)
  // renders exactly as it did before the count became variable.
  4: 'md:grid-cols-2 lg:grid-cols-4',
  5: 'md:grid-cols-2 lg:grid-cols-4',
};

export function ProjectDetail() {
  const { t, i18n } = useTranslation('projectDetail');
  const {
    slug
  } = useParams<{
    slug: string;
  }>();
  const rawProject = projects.find(p => p.slug === slug);
  if (!rawProject) {
    return <Navigate to="/projects" replace />;
  }
  const project = localizeProject(rawProject, i18n.language);

  // Verified case studies get the business-story layout; every other project keeps
  // the original challenge / solution / impact presentation until it is verified.
  const caseStudy = isCaseStudy(project);
  const metrics = project.metrics ?? [];
  const highlights = project.highlights ?? [];

  const overviewItems: Array<{
    icon: JSX.Element;
    label: string;
    value: string;
    /** Small print under the value - currently the reason a project is inactive. */
    note?: string;
  }> = [
    {
      icon: <User size={20} />,
      label: t('labels.client'),
      value: project.confidential ? t('confidentialClient') : project.client,
    },
    ...(project.country
      ? [{ icon: <Globe2 size={20} />, label: t('labels.market'), value: project.country }]
      : []),
    // A project with no publicly confirmed year or period simply drops the row;
    // the grid reflows, and no placeholder ("N/A") is invented on the page.
    ...(project.year
      ? [
          {
            icon: <Calendar size={20} />,
            label: RANGE.test(project.year) ? t('labels.period') : t('labels.year'),
            value: project.year,
          },
        ]
      : []),
    // On a verified case study the market context earns the fourth slot; the
    // internal category is already encoded in the related-projects rail below.
    caseStudy
      ? { icon: <Layers size={20} />, label: t('labels.industry'), value: project.industry }
      : { icon: <Tag size={20} />, label: t('labels.category'), value: project.category },
    // Only projects that declare a status show one; the rest render no row at all.
    ...(project.status
      ? [
          {
            icon: <Activity size={20} />,
            label: t('labels.status'),
            value: t(`status.${project.status}`),
            note: project.statusNote,
          },
        ]
      : []),
  ];

  // The legacy layout adds a fifth cell for the tech stack; the case-study
  // layout lists technology further down the page instead.
  const showOverviewTech = !caseStudy && project.techStack.length > 0;
  const overviewColumns =
    OVERVIEW_COLUMNS[overviewItems.length + (showOverviewTech ? 1 : 0)] ?? OVERVIEW_COLUMNS[4];

  return <div className="pt-20 min-h-screen bg-surface">
      <Seo
        title={`${project.title}: ${t('seo.suffix')} | Oraixen`}
        description={project.description || t('seo.descriptionFallback')}
      />
      {/* Hero */}
      <div className={`relative h-[70vh] w-full overflow-hidden ${
        project.imageFit === 'contain' ? 'bg-surface' : 'bg-surface-muted'
      }`}>
        <div className={`absolute inset-0 ${project.imageFit === 'contain' ? 'flex items-center justify-center bg-surface p-12' : ''}`}>
          <img
            src={project.imageUrl ?? PROJECT_FALLBACK_IMAGE}
            alt={project.title}
            fetchPriority="high"
            decoding="async"
            className={
              project.imageFit === 'contain'
                ? 'object-contain w-auto h-auto max-h-[50vh] max-w-[85vw] sm:max-w-[500px]'
                : 'w-full h-full object-cover'
            }
          />
        </div>
        {/* Soft light gradient keeps the chrome readable over contain logos / cover images */}
        <div className={`absolute inset-0 pointer-events-none ${
          project.imageFit === 'contain'
            ? 'bg-gradient-to-t from-surface via-surface/70 to-transparent'
            : 'bg-gradient-to-t from-surface via-surface/70 to-surface/10'
        }`} />

        <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-20 relative z-10">
          <FadeIn>
            <Link to="/projects" className="inline-flex items-center text-teal hover:text-teal-light mb-8 transition-colors font-medium group">
              <ArrowLeft size={20} className="me-2 group-hover:-translate-x-1 transition-transform rtl-flip" />
              {t('backLink')}
            </Link>

            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-4 py-2 text-sm font-semibold bg-teal/5 text-teal rounded-full border border-teal/15">
                {project.industry}
              </span>
              {project.confidential && <span className="px-4 py-2 text-sm font-semibold bg-teal text-onaccent rounded-full flex items-center gap-2 border border-teal/30">
                  <Lock size={14} /> {t('confidential')}
                </span>}
              {/* Surfaced beside the title so availability is clear before a
                  reader reaches the overview band or the outbound links. */}
              {project.status && (
                <span className="px-4 py-2 text-sm font-semibold bg-surface-subtle text-body rounded-full flex items-center gap-2 border border-line">
                  <Activity size={14} /> {t(`status.${project.status}`)}
                </span>
              )}
            </div>

            <h1 className="page-hero-title mb-4 font-bold text-ink sm:mb-6">
              {project.title}
            </h1>

            <p className="text-xl md:text-2xl text-body max-w-3xl leading-relaxed">
              {project.description}
            </p>
          </FadeIn>
        </div>
      </div>

      {/* Overview Grid */}
      <section className="relative border-b border-line bg-surface-subtle py-16 md:py-24 lg:py-32 w-full overflow-hidden">
        <AuroraBackground intensity="subtle" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {project.overview && (
          <p className="text-body leading-relaxed text-lg md:text-xl max-w-3xl mb-12 md:mb-16">
            {project.overview}
          </p>
        )}
        <div className={`grid grid-cols-1 gap-10 ${overviewColumns}`}>
          {overviewItems.map((item, i) => (
          <div key={i}>
              <div className="flex items-center text-teal mb-3">
                {item.icon}
                <span className="text-xs font-bold uppercase tracking-wider ms-2">
                  {item.label}
                </span>
              </div>
              <div className="text-ink font-semibold text-lg">
                {item.value}
              </div>
              {item.note && (
                <p className="text-sm text-muted leading-relaxed mt-2">{item.note}</p>
              )}
            </div>
          ))}

          {/* A verified case study lists its technology below the business story,
              so it is not the first thing the overview band says about the work. */}
          {showOverviewTech && (
            <div>
              <div className="text-teal mb-3">
                <span className="text-xs font-bold uppercase tracking-wider">
                  {t('labels.techStack')}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map(tech => <span key={tech} className="text-xs bg-card px-3 py-1.5 rounded-lg text-body font-medium border border-line">
                    {tech}
                  </span>)}
              </div>
            </div>
          )}
        </div>
        </div>
      </section>

      {caseStudy ? (
        <ProjectCaseStudy project={project} />
      ) : (
        /* Deep Dive */
        <Section>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
            <div className="lg:col-span-2 space-y-16">
              <Reveal>
                <div className="w-12 h-1 bg-gradient-to-r from-skyblue to-teal rounded-full mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold text-ink mb-6">
                  {t('sections.challenge')}
                </h2>
                <p className="text-body leading-relaxed text-lg md:text-xl">
                  {project.problem}
                </p>
              </Reveal>

              <Reveal>
                <div className="w-12 h-1 bg-gradient-to-r from-skyblue to-teal rounded-full mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold text-ink mb-6">
                  {t('sections.solution')}
                </h2>
                <p className="text-body leading-relaxed text-lg md:text-xl">
                  {project.solution}
                </p>
              </Reveal>

              <Reveal>
                <div className="w-12 h-1 bg-gradient-to-r from-skyblue to-teal rounded-full mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold text-ink mb-6">
                  {t('sections.impact')}
                </h2>
                <p className="text-body leading-relaxed text-lg md:text-xl">
                  {project.impact}
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-1 space-y-8">
              {metrics.length > 0 && (
                <Reveal>
                  <SpotlightCard className="h-full">
                    <div className="p-8">
                      <h3 className="text-xl font-bold text-ink mb-8">
                        {t('sections.keyMetrics')}
                      </h3>
                      <div className="space-y-8">
                        {metrics.map((metric, i) => <div key={i}>
                            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-skyblue to-teal mb-2">
                              <AnimatedCounter value={metric.value} />
                            </div>
                            <div className="text-sm text-muted uppercase tracking-wider font-medium">
                              {metric.label}
                            </div>
                          </div>)}
                      </div>
                    </div>
                  </SpotlightCard>
                </Reveal>
              )}

              {highlights.length > 0 && (
                <Reveal>
                  <SpotlightCard className="h-full">
                    <div className="p-8">
                      <h3 className="text-xl font-bold text-ink mb-8">
                        {t('sections.highlights')}
                      </h3>
                      <ul className="space-y-4">
                        {highlights.map((highlight, i) => <li key={i} className="flex items-start text-body leading-relaxed">
                            <div className="w-2 h-2 bg-gradient-to-br from-skyblue to-teal rounded-full mt-2 me-4 shrink-0" />
                            {highlight}
                          </li>)}
                      </ul>
                    </div>
                  </SpotlightCard>
                </Reveal>
              )}

              {hasPlatformLinks(project.platforms) && (
                <Reveal>
                  <SpotlightCard className="h-full">
                    <div className="p-8">
                      <h3 className="text-xl font-bold text-ink mb-8">
                        {project.status === 'inactive'
                          ? t('sections.productLinks')
                          : t('sections.availablePlatforms')}
                      </h3>
                      <ProjectPlatformLinks platforms={project.platforms} />
                    </div>
                  </SpotlightCard>
                </Reveal>
              )}
            </div>
          </div>
        </Section>
      )}

      <RelatedProjects currentSlug={project.slug} category={project.category} />

      {/* Closing CTA */}
      <CTASection
        title={t('cta.title')}
        subtitle={t('cta.subtitle')}
        ctaLocation="project_detail_bottom"
        primary={{ label: t('cta.button'), href: '/contact', ctaId: 'start_similar_project' }}
      />
    </div>;
}
