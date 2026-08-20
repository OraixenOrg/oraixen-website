import { FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Section } from '../components/Section';
import { AuroraBackground, Reveal } from '../components/visual';
import { Eyebrow } from '../components/ui';
import { Seo } from '../components/Seo';

interface LegalSection {
  heading: string;
  body: string;
}

export function Terms() {
  const { t } = useTranslation('legal');
  const sections = t('terms.sections', { returnObjects: true }) as LegalSection[];

  return (
    <div className="min-h-screen bg-surface">
      <Seo title={t('terms.seo.title')} description={t('terms.seo.description')} />
      <div className="relative overflow-hidden">
        <AuroraBackground intensity="subtle" />
        <Section>
          <article className="relative z-10 max-w-3xl mx-auto">
            <Reveal>
              <Eyebrow>
                <FileText className="w-4 h-4" />
                {t('terms.eyebrow')}
              </Eyebrow>

              <h1 className="mt-6 text-4xl md:text-5xl font-bold text-ink">
                {t('terms.title')}
              </h1>

              <p className="mt-4 text-muted text-sm">
                {t('lastUpdatedLabel')}: {t('lastUpdated')}
              </p>

              <p className="mt-3 inline-flex items-center px-3 py-1.5 rounded-lg bg-surface-muted text-muted border border-line text-xs font-medium">
                {t('counselNote')}
              </p>

              {/* TL;DR card */}
              <div className="mt-8 rounded-2xl bg-surface-muted border border-line p-6">
                <p className="text-sm font-semibold text-teal mb-2">
                  {t('tldrLabel')}
                </p>
                <p className="text-body leading-relaxed">
                  {t('terms.tldr')}
                </p>
              </div>
            </Reveal>

            <div className="mt-10 prose max-w-none">
              {sections.map((section, index) => (
                <Reveal key={index}>
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
