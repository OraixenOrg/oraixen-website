import { useParams, Navigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Calendar, User, Tag, Lock, ExternalLink, Globe, Smartphone, Monitor } from 'lucide-react';
import { projects, localizeProject } from '../lib/projects';
import { Section } from '../components/Section';
import { FadeIn } from '../components/FadeIn';
import { RelatedProjects } from '../components/projects/RelatedProjects';
import { CTASection } from '../components/ui';
import { Seo } from '../components/Seo';
import {
  AuroraBackground,
  AnimatedCounter,
  SpotlightCard,
  Reveal,
} from '../components/visual';
import { m } from 'framer-motion';
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
  return <div className="pt-20 min-h-screen bg-surface">
      <Seo
        title={`${project.title} — ${t('seo.suffix')} | Oraixen`}
        description={project.description || t('seo.descriptionFallback')}
      />
      {/* Hero */}
      <div className={`relative h-[70vh] w-full overflow-hidden ${
        project.imageFit === 'contain' ? 'bg-surface' : 'bg-surface-muted'
      }`}>
        <div className={`absolute inset-0 ${project.imageFit === 'contain' ? 'flex items-center justify-center bg-surface p-12' : ''}`}>
          <img
            src={project.imageUrl}
            alt={project.title}
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
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-ink mb-6 leading-tight">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {[{
          icon: <User size={20} />,
          label: t('labels.client'),
          value: project.confidential ? t('confidentialClient') : project.client
        }, {
          icon: <Calendar size={20} />,
          label: t('labels.year'),
          value: project.year
        }, {
          icon: <Tag size={20} />,
          label: t('labels.category'),
          value: project.category
        }].map((item, i) => <m.div key={i} initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          delay: i * 0.1
        }}>
              <div className="flex items-center text-teal mb-3">
                {item.icon}
                <span className="text-xs font-bold uppercase tracking-wider ms-2">
                  {item.label}
                </span>
              </div>
              <div className="text-ink font-semibold text-lg">
                {item.value}
              </div>
            </m.div>)}

          <m.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          delay: 0.3
        }}>
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
          </m.div>
        </div>
        </div>
      </section>

      {/* Deep Dive */}
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

            <Reveal delay={0.1}>
              <div className="w-12 h-1 bg-gradient-to-r from-skyblue to-teal rounded-full mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-ink mb-6">
                {t('sections.solution')}
              </h2>
              <p className="text-body leading-relaxed text-lg md:text-xl">
                {project.solution}
              </p>
            </Reveal>

            <Reveal delay={0.2}>
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
            <Reveal delay={0.3}>
              <SpotlightCard className="h-full">
                <div className="p-8">
                  <h3 className="text-xl font-bold text-ink mb-8">
                    {t('sections.keyMetrics')}
                  </h3>
                  <div className="space-y-8">
                    {project.metrics.map((metric, i) => <div key={i}>
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

            <Reveal delay={0.4}>
              <SpotlightCard className="h-full">
                <div className="p-8">
                  <h3 className="text-xl font-bold text-ink mb-8">
                    {t('sections.highlights')}
                  </h3>
                  <ul className="space-y-4">
                    {project.highlights.map((highlight, i) => <li key={i} className="flex items-start text-body leading-relaxed">
                        <div className="w-2 h-2 bg-gradient-to-br from-skyblue to-teal rounded-full mt-2 me-4 shrink-0" />
                        {highlight}
                      </li>)}
                  </ul>
                </div>
              </SpotlightCard>
            </Reveal>

            {project.platforms && (project.platforms.website || project.platforms.playStore || project.platforms.appStore || project.platforms.dashboard) && (
              <Reveal delay={0.5}>
                <SpotlightCard className="h-full">
                  <div className="p-8">
                  <h3 className="text-xl font-bold text-ink mb-8">
                    {t('sections.availablePlatforms')}
                  </h3>
                  <div className="space-y-3">
                    {project.platforms.website && (
                      <a
                        href={project.platforms.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-4 bg-surface-subtle rounded-xl border border-line hover:bg-card hover:border-teal/30 transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <Globe size={20} className="text-teal" />
                          <span className="text-ink font-medium">{t('platforms.website')}</span>
                        </div>
                        <ExternalLink size={16} className="text-faint group-hover:text-teal transition-colors rtl-flip" />
                      </a>
                    )}
                    {project.platforms.playStore && (
                      <a
                        href={project.platforms.playStore}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-4 bg-surface-subtle rounded-xl border border-line hover:bg-card hover:border-teal/30 transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <Smartphone size={20} className="text-teal" />
                          <span className="text-ink font-medium">{t('platforms.playStore')}</span>
                        </div>
                        <ExternalLink size={16} className="text-faint group-hover:text-teal transition-colors rtl-flip" />
                      </a>
                    )}
                    {project.platforms.appStore && (
                      <a
                        href={project.platforms.appStore}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-4 bg-surface-subtle rounded-xl border border-line hover:bg-card hover:border-teal/30 transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <Smartphone size={20} className="text-teal" />
                          <span className="text-ink font-medium">{t('platforms.appStore')}</span>
                        </div>
                        <ExternalLink size={16} className="text-faint group-hover:text-teal transition-colors rtl-flip" />
                      </a>
                    )}
                    {project.platforms.dashboard && (
                      <a
                        href={project.platforms.dashboard}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-4 bg-surface-subtle rounded-xl border border-line hover:bg-card hover:border-teal/30 transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <Monitor size={20} className="text-teal" />
                          <span className="text-ink font-medium">{t('platforms.dashboard')}</span>
                        </div>
                        <ExternalLink size={16} className="text-faint group-hover:text-teal transition-colors rtl-flip" />
                      </a>
                    )}
                  </div>
                  </div>
                </SpotlightCard>
              </Reveal>
            )}
          </div>
        </div>
      </Section>

      <RelatedProjects currentSlug={project.slug} category={project.category} />

      {/* Closing CTA */}
      <CTASection
        title={t('cta.title')}
        subtitle={t('cta.subtitle')}
        primary={{ label: t('cta.button'), href: '/contact' }}
      />
    </div>;
}
