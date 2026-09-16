import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';
import { Section } from '../components/Section';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Seo } from '../components/Seo';
import { PageHero, SectionHeading, CTASection, Eyebrow } from '../components/ui';
import { AnimatedCounter, AuroraBackground, Reveal } from '../components/visual';
import { Stagger } from '../components/Stagger';
import { trackCtaClick } from '../lib/analytics';
import { marketFromLanguage } from '../lib/marketLocale';
import statsData from '../data/stats.json';

/** The in-app route, used for <Seo path> so the canonical stays correct. */
const ROUTE = '/solutions/real-estate-systems';

/**
 * Factual figures shown on this page, by value. The values themselves live in
 * src/data/stats.json and are the single source of truth: the locale files for
 * this page deliberately carry no numbers.
 *
 * "15+" is intentionally absent, matching the Custom Business Systems page.
 * Longevity, retention and international reach are the stronger proof for the
 * property operator this page addresses.
 */
const TRUST_STAT_VALUES = ['2019', '90%', '8+'] as const;

type Item = { title: string; desc: string };
type FaqEntry = { q: string; a: string };

export function SolutionRealEstateSystems() {
  const { t, i18n } = useTranslation('solutionRealEstateSystems');
  const market = marketFromLanguage(i18n.language);

  const problems = t('problems.items', { returnObjects: true }) as Item[];
  const ecosystem = t('ecosystem.items', { returnObjects: true }) as Item[];
  const resident = t('resident.items', { returnObjects: true }) as Item[];
  const operations = t('operations.items', { returnObjects: true }) as Item[];
  const tenant = t('tenant.items', { returnObjects: true }) as Item[];
  const paths = t('integrations.paths', { returnObjects: true }) as Item[];
  const outcomes = t('outcomes.items', { returnObjects: true }) as Item[];
  const steps = t('process.steps', { returnObjects: true }) as Item[];
  const ownership = t('ownership.cards', { returnObjects: true }) as Array<{ title: string; body: string }>;
  const faq = t('faq.items', { returnObjects: true }) as FaqEntry[];

  // Values come from stats.json; only the caption is market copy.
  const trustStats = statsData.items
    .filter((item) => (TRUST_STAT_VALUES as readonly string[]).includes(item.value))
    .map((item) => ({ value: item.value, label: item.label[market] }));

  return (
    <div className="bg-surface">
      <Seo title={t('seo.title')} description={t('seo.description')} path={ROUTE} />

      {/* ===================== 1. Hero ===================== */}
      <PageHero
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        shapes={false}
      >
        <Button
          href="/contact"
          variant="primary"
          size="lg"
          icon
          onClick={() => trackCtaClick('discuss_project', 'real_estate_hero', '/contact')}
        >
          {t('hero.primaryCta')}
        </Button>
        <Button
          href="/process"
          variant="outline"
          size="lg"
          onClick={() => trackCtaClick('view_process', 'real_estate_hero', '/process')}
        >
          {t('hero.secondaryCta')}
        </Button>
      </PageHero>

      {/* ===================== 2. Operational problem recognition ===================== */}
      <Section dark>
        <SectionHeading
          eyebrow={t('problems.eyebrow')}
          title={t('problems.title')}
          subtitle={t('problems.intro')}
        />
        <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((item) => (
            <Card key={item.title} className="p-6 h-full" hover>
              <h3 className="text-lg font-bold text-ink mb-2">{item.title}</h3>
              <p className="text-body leading-relaxed">{item.desc}</p>
            </Card>
          ))}
        </Stagger>
      </Section>

      {/* ===================== 3. Connected ecosystem ===================== */}
      <Section>
        <SectionHeading
          eyebrow={t('ecosystem.eyebrow')}
          title={t('ecosystem.title')}
          subtitle={t('ecosystem.intro')}
        />
        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ecosystem.map((item) => (
            <Card key={item.title} className="p-6 h-full" hover>
              <h3 className="text-lg font-bold text-ink mb-2">{item.title}</h3>
              <p className="text-body leading-relaxed">{item.desc}</p>
            </Card>
          ))}
        </Stagger>
      </Section>

      {/* ===================== 4. Resident experience ===================== */}
      <Section dark>
        <SectionHeading
          eyebrow={t('resident.eyebrow')}
          title={t('resident.title')}
          subtitle={t('resident.intro')}
        />
        <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resident.map((item) => (
            <Card key={item.title} className="p-6 h-full" hover>
              <h3 className="text-lg font-bold text-ink mb-2">{item.title}</h3>
              <p className="text-body leading-relaxed">{item.desc}</p>
            </Card>
          ))}
        </Stagger>
      </Section>

      {/* ===================== 5. Management & operations ===================== */}
      <Section>
        <SectionHeading
          eyebrow={t('operations.eyebrow')}
          title={t('operations.title')}
          subtitle={t('operations.intro')}
        />
        <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {operations.map((item) => (
            <Card key={item.title} className="p-6 h-full" hover>
              <h3 className="text-lg font-bold text-ink mb-2">{item.title}</h3>
              <p className="text-body leading-relaxed">{item.desc}</p>
            </Card>
          ))}
        </Stagger>
      </Section>

      {/* ===================== 6. Business / tenant tools ===================== */}
      <Section dark>
        <SectionHeading
          eyebrow={t('tenant.eyebrow')}
          title={t('tenant.title')}
          subtitle={t('tenant.intro')}
        />
        <Stagger className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {tenant.map((item) => (
            <Card key={item.title} className="p-6 h-full" hover>
              <h3 className="text-lg font-bold text-ink mb-2">{item.title}</h3>
              <p className="text-body leading-relaxed">{item.desc}</p>
            </Card>
          ))}
        </Stagger>
      </Section>

      {/* ===================== 7. Integrations & existing systems ===================== */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <Reveal>
            <Eyebrow className="mb-5">{t('integrations.eyebrow')}</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-bold text-ink leading-tight">
              {t('integrations.title')}
            </h2>
            <p className="mt-5 text-lg text-body leading-relaxed">{t('integrations.p1')}</p>
            <p className="mt-4 text-lg text-body leading-relaxed">{t('integrations.p2')}</p>
          </Reveal>
          <Stagger className="grid grid-cols-1 gap-5">
            {paths.map((path) => (
              <Card key={path.title} className="p-6" hover>
                <h3 className="text-lg font-bold text-ink mb-2">{path.title}</h3>
                <p className="text-body leading-relaxed">{path.desc}</p>
              </Card>
            ))}
          </Stagger>
        </div>
      </Section>

      {/* ===================== 8. Business outcomes ===================== */}
      <Section dark>
        <SectionHeading
          eyebrow={t('outcomes.eyebrow')}
          title={t('outcomes.title')}
          subtitle={t('outcomes.intro')}
        />
        <Stagger className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {outcomes.map((item) => (
            <Card key={item.title} className="p-6 h-full" hover>
              <h3 className="text-lg font-bold text-ink mb-2">{item.title}</h3>
              <p className="text-body leading-relaxed">{item.desc}</p>
            </Card>
          ))}
        </Stagger>

        {/* ===================== 9. Mid-page CTA ===================== */}
        <Reveal className="mt-12 flex justify-center">
          <Button
            href="/contact"
            variant="primary"
            size="lg"
            icon
            onClick={() => trackCtaClick('discuss_project', 'real_estate_mid', '/contact')}
          >
            {t('midCta.button')}
          </Button>
        </Reveal>
      </Section>

      {/* ===================== 10. Delivery process ===================== */}
      <Section>
        <SectionHeading
          eyebrow={t('process.eyebrow')}
          title={t('process.title')}
          subtitle={t('process.intro')}
        />
        <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
          {steps.map((step, i) => (
            <Card key={step.title} className="p-6 h-full">
              <span
                className="block text-sm font-extrabold text-teal mb-3"
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="text-base font-bold text-ink mb-2">{step.title}</h3>
              <p className="text-sm text-body leading-relaxed">{step.desc}</p>
            </Card>
          ))}
        </Stagger>
      </Section>

      {/* ===================== 11. Trust ===================== */}
      <div className="relative bg-surface-muted border-y border-line py-16 md:py-20 overflow-hidden">
        <AuroraBackground intensity="subtle" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading
            eyebrow={t('trust.eyebrow')}
            title={t('trust.title')}
            subtitle={t('trust.intro')}
          />
          <Stagger className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-6">
            {trustStats.map((stat) => (
              <div
                key={stat.value}
                className="rounded-2xl bg-card/70 backdrop-blur-sm border border-line shadow-card px-4 py-7 text-center"
              >
                <div className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-br from-skyblue to-teal">
                  <AnimatedCounter value={stat.value} />
                </div>
                <div className="text-xs sm:text-sm text-muted uppercase tracking-wider font-semibold">
                  {stat.label}
                </div>
              </div>
            ))}
          </Stagger>
        </div>
      </div>

      {/* ===================== 12. Ownership & support ===================== */}
      <Section>
        <SectionHeading eyebrow={t('ownership.eyebrow')} title={t('ownership.title')} />
        <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ownership.map((card) => (
            <Card key={card.title} className="p-7 h-full">
              <h3 className="text-xl font-bold text-ink mb-3">{card.title}</h3>
              <p className="text-body leading-relaxed">{card.body}</p>
            </Card>
          ))}
        </Stagger>
      </Section>

      {/* ===================== 13. FAQ ===================== */}
      <Section dark>
        <SectionHeading eyebrow={t('faq.eyebrow')} title={t('faq.title')} />
        <div className="max-w-3xl mx-auto space-y-4">
          {faq.map((item) => (
            <details
              key={item.q}
              className="group bg-card border border-line rounded-2xl shadow-card overflow-hidden"
            >
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-5 sm:px-6 py-5 text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal/30 rounded-2xl [&::-webkit-details-marker]:hidden">
                <span className="text-base sm:text-lg font-semibold text-ink">{item.q}</span>
                <ChevronDown
                  size={20}
                  aria-hidden="true"
                  className="text-muted shrink-0 transition-transform duration-200 group-open:rotate-180"
                />
              </summary>
              <div className="px-5 sm:px-6 pb-5">
                <p className="text-body leading-relaxed">{item.a}</p>
              </div>
            </details>
          ))}
        </div>
      </Section>

      {/* ===================== 14. Final CTA ===================== */}
      <CTASection
        title={t('finalCta.title')}
        subtitle={t('finalCta.subtitle')}
        ctaLocation="real_estate_final"
        primary={{ label: t('finalCta.button'), href: '/contact', ctaId: 'discuss_project' }}
      />
    </div>
  );
}
