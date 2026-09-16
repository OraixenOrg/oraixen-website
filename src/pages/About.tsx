import { useTranslation } from 'react-i18next';
import {
  Lightbulb,
  ShieldCheck,
  Users,
  BadgeCheck,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { Section } from '../components/Section';
import { Stagger } from '../components/Stagger';
import { Reveal, SpotlightCard } from '../components/visual';
import { PageHero, SectionHeading, CTASection } from '../components/ui';
import { Seo } from '../components/Seo';

const valueIcons = [Lightbulb, ShieldCheck, Users, BadgeCheck, Sparkles, TrendingUp];

export function About() {
  const { t } = useTranslation('about');

  const foundation = t('foundation.items', { returnObjects: true }) as Array<{
    title: string;
    text: string;
  }>;
  const values = t('values.items', { returnObjects: true }) as Array<{
    title: string;
    desc: string;
  }>;
  const milestones = t('timeline.items', { returnObjects: true }) as Array<{
    year: string;
    label: string;
  }>;

  return (
    <div className="min-h-screen bg-surface">
      <Seo title={t('seo.title')} description={t('seo.description')} />
      {/* Hero */}
      <PageHero
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        align="center"
      />

      {/* Our Story */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <div>
            <SectionHeading
              eyebrow={t('story.eyebrow')}
              title={t('story.title')}
              align="start"
              className="mb-8"
            />
            <Reveal direction="right">
              <div className="space-y-6 text-body leading-relaxed text-lg">
                <p>{t('story.intro')}</p>
                <p>{t('story.history')}</p>
                <p>
                  {t('story.p1.before')}
                  <span className="text-teal font-semibold">{t('story.p1.ora')}</span>
                  {t('story.p1.after')}
                </p>
                <p>
                  {t('story.p2.before')}
                  <span className="text-teal font-semibold">{t('story.p2.ixen')}</span>
                  {t('story.p2.after')}
                </p>
                <p>
                  {t('story.p3.before')}
                  <span className="text-teal font-semibold">{t('story.p3.en')}</span>
                  {t('story.p3.after')}
                </p>
                <p>{t('story.closing')}</p>
                <p className="text-ink font-semibold text-xl tracking-tight">
                  {t('story.tagline')}
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal direction="left">
            <div className="relative h-full min-h-[480px] rounded-3xl overflow-hidden shadow-hover group border border-line">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1600"
                alt={t('story.imageAlt')}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              {/* Subtle teal duotone wash */}
              <div className="absolute inset-0 bg-gradient-to-br from-skyblue/10 to-teal/10 mix-blend-multiply" />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Timeline (NEW) */}
      <Section dark>
        <SectionHeading
          eyebrow={t('timeline.eyebrow')}
          title={t('timeline.title')}
          subtitle={t('timeline.subtitle')}
          align="center"
        />

        <div className="relative max-w-6xl mx-auto">
          {/* Hairline connector (desktop) */}
          <div
            className="hidden lg:block absolute top-6 start-0 end-0 h-px bg-gradient-to-r from-skyblue to-teal"
            aria-hidden="true"
          />
          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {milestones.map((item, i) => (
              <Reveal
                key={i}
                className="relative text-center lg:text-start"
              >
                {/* Node */}
                <div className="flex justify-center lg:justify-start mb-5">
                  <div className="w-3 h-3 rounded-full bg-teal ring-4 ring-teal/15" />
                </div>
                <span className="block text-2xl font-bold text-teal mb-2 tabular-nums">
                  {item.year}
                </span>
                <p className="text-body leading-relaxed">{item.label}</p>
              </Reveal>
            ))}
          </Stagger>
        </div>
      </Section>

      {/* Our Foundation (Mission / Vision / Purpose) */}
      <Section>
        <SectionHeading
          eyebrow={t('foundation.eyebrow')}
          title={t('foundation.title')}
          subtitle={t('foundation.subtitle')}
          align="center"
        />

        <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {foundation.map((item, i) => (
            <SpotlightCard key={i} className="h-full">
                <div className="p-8 h-full">
                  <div className="w-12 h-1 bg-gradient-to-r from-skyblue to-teal rounded-full mb-6" />
                  <h3 className="text-2xl font-bold text-ink mb-4">{item.title}</h3>
                  <p className="text-body leading-relaxed">{item.text}</p>
                </div>
              </SpotlightCard>
          ))}
        </Stagger>
      </Section>

      {/* Core Values */}
      <Section dark>
        <SectionHeading
          eyebrow={t('values.eyebrow')}
          title={t('values.title')}
          subtitle={t('values.subtitle')}
          align="center"
        />

        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, i) => {
            const Icon = valueIcons[i % valueIcons.length];
            return (
              <SpotlightCard key={i} className="h-full">
                  <div className="p-8 h-full">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-skyblue/15 to-teal/10 border border-teal/15 flex items-center justify-center mb-5">
                      <Icon className="text-teal" size={24} strokeWidth={1.75} />
                    </div>
                    <h3 className="text-lg font-bold text-ink mb-2">{value.title}</h3>
                    <p className="text-body leading-relaxed text-sm">{value.desc}</p>
                  </div>
                </SpotlightCard>
            );
          })}
        </Stagger>
      </Section>

      {/* Final CTA Banner */}
      <CTASection
        title={t('cta.title')}
        ctaLocation="about_bottom"
        primary={{ label: t('cta.primary'), href: '/contact', ctaId: 'discuss_project' }}
        secondary={{ label: t('cta.secondary'), href: '/projects' }}
      />
    </div>
  );
}
