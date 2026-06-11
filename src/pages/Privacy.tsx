import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Section } from '../components/Section';
import { AuroraBackground, Reveal } from '../components/visual';
import { Eyebrow } from '../components/ui';

interface LegalSection {
  heading: string;
  body: string;
}

export function Privacy() {
  const { t } = useTranslation('legal');
  const sections = t('privacy.sections', { returnObjects: true }) as LegalSection[];

  return (
    <div className="min-h-screen bg-surface">
      <div className="relative overflow-hidden">
        <AuroraBackground intensity="subtle" />
        <Section>
          <article className="relative z-10 max-w-3xl mx-auto">
            <Reveal>
              <Eyebrow>
                <ShieldCheck className="w-4 h-4" />
                {t('privacy.eyebrow')}
              </Eyebrow>

              <h1 className="mt-6 text-4xl md:text-5xl font-bold text-ink">
                {t('privacy.title')}
              </h1>

              <p className="mt-4 text-muted text-sm">
                {t('lastUpdatedLabel')}: {t('lastUpdated')}
              </p>

              <p className="mt-3 inline-flex items-center px-3 py-1.5 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 text-xs font-medium">
                {t('counselNote')}
              </p>

              {/* TL;DR card */}
              <div className="mt-8 rounded-2xl bg-surface-muted border border-line p-6">
                <p className="text-sm font-semibold text-teal mb-2">
                  {t('tldrLabel')}
                </p>
                <p className="text-body leading-relaxed">
                  {t('privacy.tldr')}
                </p>
              </div>
            </Reveal>

            <div className="mt-10 prose max-w-none">
              {sections.map((section, index) => (
                <Reveal key={index} delay={0.04 * index}>
                  <h2 className="text-2xl font-bold text-ink mt-10 mb-4">
                    {index + 1}. {section.heading}
                  </h2>
                  <p className="text-body leading-relaxed mb-4 whitespace-pre-line">
                    {section.body}
                  </p>
                </Reveal>
              ))}
            </div>
          </article>
        </Section>
      </div>
    </div>
  );
}
