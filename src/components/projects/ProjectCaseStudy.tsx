import { type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Project } from '../../types/project';
import { Section } from '../Section';
import { AnimatedCounter, Reveal, SpotlightCard } from '../visual';
import { hasPlatformLinks } from '../../lib/projects';
import { ProjectPlatformLinks } from './ProjectPlatformLinks';

interface ProjectCaseStudyProps {
  project: Project;
}

interface StoryBlockProps {
  /** Short, reusable section label from i18n ("The challenge"). */
  eyebrow: string;
  /** The project-specific claim. Optional: legacy-shaped data has none. */
  heading?: string;
  body: string;
}

/**
 * One narrative beat of the case study. The eyebrow carries the generic section
 * name and the <h2> carries the sentence a reader should remember, so the heading
 * outline stays meaningful when read on its own.
 */
function StoryBlock({ eyebrow, heading, body }: StoryBlockProps) {
  return (
    <Reveal>
      <div className="w-12 h-1 bg-gradient-to-r from-skyblue to-teal rounded-full mb-6" />
      <p className="text-xs font-bold uppercase tracking-wider text-teal mb-4">{eyebrow}</p>
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-ink mb-6 leading-tight max-w-3xl">
        {heading ?? eyebrow}
      </h2>
      <p className="text-body leading-relaxed text-lg md:text-xl max-w-3xl whitespace-pre-line">
        {body}
      </p>
    </Reveal>
  );
}

function PanelHeading({ children }: { children: ReactNode }) {
  return <h2 className="text-2xl md:text-3xl font-bold text-ink mb-8">{children}</h2>;
}

/**
 * Business-first case-study layout for owner-verified projects.
 *
 * Section order is deliberate: challenge, what we built, how the system works and
 * the outcome all come before scope, proof and technology, so the page reads as a
 * business story rather than a technology list. Every block below is rendered only
 * when its data exists, so a verified project may carry any subset of them.
 */
export function ProjectCaseStudy({ project }: ProjectCaseStudyProps) {
  const { t } = useTranslation('projectDetail');

  const workflow = project.workflow ?? [];
  const responsibilities = project.responsibilities ?? [];
  const systemComponents = project.systemComponents ?? [];
  const proofPoints = project.proofPoints ?? [];
  const metrics = project.metrics ?? [];
  const showScopeSection = systemComponents.length > 0 || proofPoints.length > 0 || metrics.length > 0;

  // Technology is listed only where a stack has actually been confirmed: a
  // verified case study may publish none, and an empty heading would read as a
  // missing section rather than a deliberate omission. Live platforms stand on
  // their own, so the closing band drops to a single column when alone.
  const showTechnology = project.techStack.length > 0;
  // Aliased through a const so the `hasPlatformLinks` type guard still narrows
  // `platforms` where the links are rendered.
  const platforms = project.platforms;
  const showPlatforms = hasPlatformLinks(platforms);
  const showClosingSection = showTechnology || showPlatforms;

  return (
    <>
      <Section>
        <div className="space-y-16 md:space-y-20">
          <StoryBlock
            eyebrow={t('sections.challenge')}
            heading={project.headings?.challenge}
            body={project.problem}
          />
          <StoryBlock
            eyebrow={t('sections.whatWeBuilt')}
            heading={project.headings?.build}
            body={project.solution}
          />
        </div>
      </Section>

      {workflow.length > 0 && (
        <Section dark className="border-t border-line">
          <Reveal>
            <div className="w-12 h-1 bg-gradient-to-r from-skyblue to-teal rounded-full mb-6" />
            <PanelHeading>{t('sections.howItWorks')}</PanelHeading>
          </Reveal>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {workflow.map((step, i) => (
              <li key={step.title} className="h-full">
                <Reveal className="h-full">
                  <div className="h-full p-6 rounded-2xl border border-line bg-card shadow-card">
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className="shrink-0 w-9 h-9 rounded-full border border-teal/30 bg-teal/10 text-teal font-bold text-sm flex items-center justify-center"
                        aria-hidden="true"
                      >
                        {i + 1}
                      </span>
                      <h3 className="text-lg font-bold text-ink leading-tight">
                        <span className="sr-only">{`${t('step')} ${i + 1}: `}</span>
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-body leading-relaxed">{step.description}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </Section>
      )}

      <Section className="border-t border-line">
        <StoryBlock
          eyebrow={t('sections.outcome')}
          heading={project.headings?.outcome}
          body={project.impact}
        />
      </Section>

      {responsibilities.length > 0 && (
        <Section dark className="border-t border-line">
          <Reveal>
            <div className="w-12 h-1 bg-gradient-to-r from-skyblue to-teal rounded-full mb-6" />
            <PanelHeading>{t('sections.responsibilities')}</PanelHeading>
          </Reveal>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {responsibilities.map((item) => (
              <li key={item.title} className="h-full">
                <Reveal className="h-full">
                  <div className="h-full p-6 rounded-2xl border border-line bg-card shadow-card">
                    <h3 className="text-lg font-bold text-ink mb-3 leading-tight">{item.title}</h3>
                    {item.description && (
                      <p className="text-body leading-relaxed">{item.description}</p>
                    )}
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {showScopeSection && (
        <Section className="border-t border-line">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
            {systemComponents.length > 0 && (
              <div className="lg:col-span-2">
                <Reveal>
                  <div className="w-12 h-1 bg-gradient-to-r from-skyblue to-teal rounded-full mb-6" />
                  <PanelHeading>{t('sections.systemAtGlance')}</PanelHeading>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                    {systemComponents.map((component) => (
                      <li key={component} className="flex items-start text-body leading-relaxed">
                        <span
                          className="w-2 h-2 bg-gradient-to-br from-skyblue to-teal rounded-full mt-2 me-3 shrink-0"
                          aria-hidden="true"
                        />
                        {component}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            )}

            <div className="lg:col-span-1 space-y-8">
              {proofPoints.length > 0 && (
                <Reveal>
                  <SpotlightCard>
                    <div className="p-8">
                      <h2 className="text-xl font-bold text-ink mb-8">{t('sections.verifiedProof')}</h2>
                      <div className="space-y-8">
                        {proofPoints.map((proof) => (
                          <div key={proof.label}>
                            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-skyblue to-teal mb-2">
                              <AnimatedCounter value={proof.value} />
                            </div>
                            <div className="text-sm text-body font-medium leading-relaxed">
                              {proof.label}
                            </div>
                            {proof.description && (
                              <p className="text-sm text-muted leading-relaxed mt-3">
                                {proof.description}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </SpotlightCard>
                </Reveal>
              )}

              {metrics.length > 0 && (
                <Reveal>
                  <SpotlightCard>
                    <div className="p-8">
                      <h2 className="text-xl font-bold text-ink mb-8">{t('sections.keyMetrics')}</h2>
                      <div className="space-y-8">
                        {metrics.map((metric) => (
                          <div key={metric.label}>
                            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-skyblue to-teal mb-2">
                              <AnimatedCounter value={metric.value} />
                            </div>
                            <div className="text-sm text-muted uppercase tracking-wider font-medium">
                              {metric.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </SpotlightCard>
                </Reveal>
              )}
            </div>
          </div>
        </Section>
      )}

      {showClosingSection && (
        <Section dark className="border-t border-line">
          <div
            className={`grid grid-cols-1 gap-10 lg:gap-12 ${
              showTechnology && showPlatforms ? 'lg:grid-cols-2' : ''
            }`}
          >
            {showTechnology && (
              <Reveal>
                <div className="w-12 h-1 bg-gradient-to-r from-skyblue to-teal rounded-full mb-6" />
                <PanelHeading>{t('sections.technology')}</PanelHeading>
                <ul className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <li
                      key={tech}
                      className="text-sm bg-card px-3 py-1.5 rounded-lg text-body font-medium border border-line"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            {showPlatforms && (
              <Reveal>
                <div className="w-12 h-1 bg-gradient-to-r from-skyblue to-teal rounded-full mb-6" />
                <PanelHeading>{t('sections.livePlatforms')}</PanelHeading>
                <ProjectPlatformLinks platforms={platforms} />
              </Reveal>
            )}
          </div>
        </Section>
      )}
    </>
  );
}
