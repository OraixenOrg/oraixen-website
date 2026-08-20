import { useTranslation } from 'react-i18next';
import { Section } from '../components/Section';
import { Stagger } from '../components/Stagger';
import { Button } from '../components/Button';
import {
  AuroraBackground,
  Marquee,
  SpotlightCard,
  Reveal,
} from '../components/visual';
import { PageHero, SectionHeading, CTASection, Eyebrow } from '../components/ui';
import { Seo } from '../components/Seo';
import {
  CheckCircle,
  Smartphone,
  Code,
  Server,
  Cpu,
  Layers,
  Users,
  LifeBuoy,
  BrainCircuit,
  RefreshCw,
} from 'lucide-react';

type ServiceItem = {
  title: string;
  badge?: string;
  description: string;
  deliverables: string[];
  timeline: string;
  bestFor: string;
};

type EngagementItem = {
  title: string;
  description: string;
  includes: string[];
  price: string;
  cta: string;
};

const serviceIcons = [Smartphone, Code, BrainCircuit, Server, Cpu, RefreshCw];
const engagementIcons = [Layers, Users, LifeBuoy];

export function Services() {
  const { t } = useTranslation('services');

  const services = t('services.items', { returnObjects: true }) as ServiceItem[];
  const engagement = t('engagement.items', { returnObjects: true }) as EngagementItem[];
  const steps = t('engagement.steps', { returnObjects: true }) as string[];
  const techStack = t('tech.items', { returnObjects: true }) as string[];

  return (
    <div className="min-h-screen bg-surface">
      <Seo title={t('seo.title')} description={t('seo.description')} />
      {/* Hero */}
      <PageHero
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
      />

      {/* Four alternating service blocks */}
      <div className="space-y-0">
        {services.map((service, index) => {
          const Icon = serviceIcons[index] ?? Smartphone;
          const reversed = index % 2 !== 0;
          return (
            <Section
              key={index}
              className={reversed ? 'bg-surface-subtle' : 'bg-surface'}
            >
              <div
                className={`flex flex-col lg:flex-row gap-12 lg:gap-20 items-center ${
                  reversed ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Content side */}
                <div className="flex-1">
                  <Reveal direction={reversed ? 'left' : 'right'}>
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-skyblue/15 to-teal/10 border border-teal/15 flex items-center justify-center shrink-0">
                        <Icon size={26} className="text-teal" />
                      </div>
                      {service.badge && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-teal/5 text-teal border border-teal/15 text-xs font-semibold">
                          {service.badge}
                        </span>
                      )}
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold text-ink mb-5 leading-tight">
                      {service.title}
                    </h2>

                    <p className="text-lg text-body mb-10 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
                      <div>
                        <h4 className="text-xs font-bold text-teal uppercase tracking-wider mb-4">
                          {t('labels.deliverables')}
                        </h4>
                        <ul className="space-y-3">
                          {service.deliverables.map((item, i) => (
                            <li
                              key={i}
                              className="flex items-center text-body"
                            >
                              <CheckCircle
                                size={18}
                                className="text-teal me-3 shrink-0"
                              />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <h4 className="text-xs font-bold text-teal uppercase tracking-wider mb-2">
                            {t('labels.timeline')}
                          </h4>
                          <p className="text-ink text-lg font-semibold">
                            {service.timeline}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-teal uppercase tracking-wider mb-2">
                            {t('labels.bestFor')}
                          </h4>
                          <p className="text-body font-medium">
                            {service.bestFor}
                          </p>
                        </div>
                      </div>
                    </div>

                    <Button href="/contact" variant="primary" size="lg" icon>
                      {t('labels.cta')}
                    </Button>
                  </Reveal>
                </div>

                {/* Media side — branded tile placeholder (no fabricated UI) */}
                <div className="flex-1 w-full">
                  <Reveal direction={reversed ? 'right' : 'left'}>
                    <div
                      className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-skyblue/10 to-teal/5 border border-line shadow-card"
                    >
                      <AuroraBackground intensity="subtle" />
                      {/* faint dotted grid */}
                      <div
                        className="absolute inset-0 opacity-[0.5]"
                        style={{
                          backgroundImage:
                            'radial-gradient(circle, #E2E8F0 1px, transparent 1px)',
                          backgroundSize: '24px 24px',
                        }}
                      />
                      {/* centered brand icon tile */}
                      <div className="absolute inset-0 z-10 flex items-center justify-center">
                        <div className="w-24 h-24 rounded-3xl bg-card border border-teal/15 shadow-card flex items-center justify-center">
                          <Icon size={44} className="text-teal" />
                        </div>
                      </div>
                    </div>
                  </Reveal>
                </div>
              </div>
            </Section>
          );
        })}
      </div>

      {/* Engagement Models */}
      <Section className="bg-surface-subtle relative overflow-hidden">
        <AuroraBackground intensity="subtle" />
        <div className="relative z-10">
          <SectionHeading
            title={t('engagement.eyebrow')}
            subtitle={t('engagement.subtitle')}
          />

          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {engagement.map((model, i) => {
              const Icon = engagementIcons[i] ?? Layers;
              const highlighted = i === 1;
              return (
                <SpotlightCard
                  key={i}
                  className={`h-full ${
                      highlighted ? 'border-teal/40 shadow-hover lg:-translate-y-2' : ''
                    }`}
                  >
                    <div className="p-8 h-full flex flex-col relative">
                      {highlighted && (
                        <>
                          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-skyblue to-teal rounded-t-2xl" />
                          <span className="absolute top-5 end-5 inline-flex items-center px-3 py-1 rounded-full bg-teal text-onaccent text-xs font-semibold">
                            {t('engagement.popular')}
                          </span>
                        </>
                      )}
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-skyblue/15 to-teal/10 border border-teal/15 flex items-center justify-center mb-6">
                        <Icon size={26} className="text-teal" />
                      </div>
                      <h3 className="text-xl font-bold text-ink mb-3">
                        {model.title}
                      </h3>
                      <p className="text-body leading-relaxed mb-6">
                        {model.description}
                      </p>
                      <ul className="space-y-3 mb-8">
                        {model.includes.map((item, j) => (
                          <li
                            key={j}
                            className="flex items-center text-body text-sm"
                          >
                            <CheckCircle
                              size={16}
                              className="text-teal me-3 shrink-0"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-auto">
                        <p className="text-2xl font-bold text-teal mb-6">
                          {model.price}
                        </p>
                        <Button
                          href="/contact"
                          variant={highlighted ? 'primary' : 'outline'}
                          size="md"
                          className="w-full"
                        >
                          {model.cta}
                        </Button>
                      </div>
                    </div>
                  </SpotlightCard>
              );
            })}
          </Stagger>

          {/* What happens next strip */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <Reveal key={i}>
                <SpotlightCard className="h-full">
                  <div className="p-6 md:p-7 h-full flex items-start gap-4">
                    <div className="w-9 h-9 rounded-full bg-teal/10 text-teal border border-teal/20 flex items-center justify-center font-bold text-sm shrink-0">
                      {i + 1}
                    </div>
                    <p className="text-body leading-relaxed">{step}</p>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Tech stack strip */}
      <Section className="bg-surface">
        <div className="text-center">
          <Reveal className="flex justify-center">
            <Eyebrow className="mb-8">{t('tech.eyebrow')}</Eyebrow>
          </Reveal>
          <Marquee speed={32}>
            {techStack.map((name, i) => (
              <span
                key={i}
                dir="ltr"
                className="text-lg md:text-xl font-semibold text-muted hover:text-teal transition-colors duration-300 whitespace-nowrap"
              >
                {name}
              </span>
            ))}
          </Marquee>
        </div>
      </Section>

      {/* Closing CTA banner */}
      <CTASection
        title={t('cta.title')}
        subtitle={t('cta.subtitle')}
        primary={{ label: t('cta.button'), href: '/contact' }}
      />
    </div>
  );
}
