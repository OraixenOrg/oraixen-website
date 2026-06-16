import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  CheckCircle,
  MessageSquare,
  ShieldCheck,
  LifeBuoy,
  ChevronDown,
  ArrowRight,
  ShieldQuestion,
  FileLock,
  Clock,
  Lock,
} from 'lucide-react';
import { m, AnimatePresence } from 'framer-motion';
import { Section } from '../components/Section';
import { FadeIn } from '../components/FadeIn';
import { Stagger } from '../components/Stagger';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Reveal, SpotlightCard } from '../components/visual';
import { PageHero, SectionHeading, CTASection } from '../components/ui';
import { Seo } from '../components/Seo';

type Step = {
  number: string;
  title: string;
  description: string;
  items: string[];
};

function StepContent({ step, align = 'start' }: { step: Step; align?: 'start' | 'end' }) {
  const isEnd = align === 'end';

  return (
    <Reveal direction={isEnd ? 'right' : 'left'}>
      <div
        className={[
          'max-w-xl mx-auto text-center lg:mx-0',
          isEnd ? 'lg:text-end lg:ms-auto' : 'lg:text-start',
        ].join(' ')}
      >
        <span className="text-teal font-bold text-base sm:text-lg mb-3 block tracking-wider">
          {step.number}
        </span>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-ink mb-4 md:mb-5 leading-tight">
          {step.title}
        </h2>

        <p className="text-body mb-6 md:mb-8 text-base sm:text-lg leading-relaxed">
          {step.description}
        </p>

        <ul
          className={[
            'space-y-3 inline-block text-start',
            isEnd ? 'lg:text-end' : 'lg:text-start',
          ].join(' ')}
        >
          {step.items.map((item, i) => (
            <li
              key={i}
              className={[
                'flex items-center text-body text-sm sm:text-base gap-3',
                isEnd ? 'lg:justify-end' : 'lg:justify-start',
              ].join(' ')}
            >
              <div
                className={[
                  'w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-teal/10 border border-teal/25',
                  'flex items-center justify-center shrink-0',
                  isEnd ? 'lg:order-2' : '',
                ].join(' ')}
              >
                <CheckCircle size={12} className="sm:w-3.5 sm:h-3.5 text-teal" />
              </div>
              <span className={isEnd ? 'lg:order-1' : ''}>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

function CenterIndicator() {
  return (
    <div className="relative z-10 flex justify-center">
      {/* gentle pulsing teal glow behind the node */}
      <m.div
        className="pointer-events-none absolute inset-0 m-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full blur-xl"
        style={{ background: 'radial-gradient(circle, rgba(86,201,227,0.35), transparent 65%)' }}
        animate={{ opacity: [0.35, 0.7, 0.35], scale: [0.9, 1.15, 0.9] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <m.div
        className="relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-skyblue to-teal shadow-glow border border-teal/15"
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ delay: 0.15, duration: 0.45, ease: 'easeOut' }}
      >
        <m.div
          className="w-4 h-4 sm:w-5 sm:h-5 bg-onaccent rounded-full shadow-md"
          animate={{ scale: [1, 1.18, 1], opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      </m.div>
    </div>
  );
}

function FaqItem({ q, a, defaultOpen = false }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="bg-card border border-line rounded-2xl shadow-card overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 text-start px-5 sm:px-6 py-5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-teal/30 rounded-2xl"
      >
        <span className="text-base sm:text-lg font-semibold text-ink group-hover:text-teal transition-colors">
          {q}
        </span>
        <ChevronDown
          size={20}
          className={[
            'text-muted shrink-0 transition-transform duration-200',
            open ? 'rotate-180' : '',
          ].join(' ')}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <m.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 sm:px-6 pb-5 ps-5 sm:ps-6">
              <div className="border-s-2 border-teal/40 ps-4 text-body text-sm sm:text-base leading-relaxed">
                {a}
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Process() {
  const { t } = useTranslation('process');

  const steps = t('steps.items', { returnObjects: true }) as Step[];
  const whyCards = t('why.cards', { returnObjects: true }) as Array<{ title: string; desc: string }>;
  const faqItems = t('faq.items', { returnObjects: true }) as Array<{ q: string; a: string }>;
  const trustItems = t('trust.items', { returnObjects: true }) as Array<{
    title: string;
    desc: string;
  }>;

  const whyIcons = [
    <MessageSquare size={32} />,
    <ShieldCheck size={32} />,
    <LifeBuoy size={32} />,
  ];
  const trustIcons = [
    <FileLock size={24} />,
    <ShieldQuestion size={24} />,
    <Clock size={24} />,
    <Lock size={24} />,
  ];

  return (
    <div className="min-h-screen bg-surface">
      <Seo title={t('seo.title')} description={t('seo.description')} />
      {/* Header */}
      <PageHero
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
      />

      {/* Steps timeline */}
      <Section className="bg-surface-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative py-8 lg:py-12">
            {/* Center connector line (teal hairline + node motif) */}
            <div className="hidden lg:block absolute start-1/2 top-12 bottom-12 w-px bg-gradient-to-b from-teal/50 via-teal/30 to-teal/10 -translate-x-1/2 rtl:translate-x-1/2" />

            <div className="space-y-20 md:space-y-24 lg:space-y-28">
              {steps.map((step, index) => {
                const isEven = index % 2 === 0;

                return (
                  <div key={index} className="relative">
                    {/* Mobile layout: stacked, start-aligned nodes */}
                    <div className="flex flex-col items-center gap-8 lg:hidden">
                      <CenterIndicator />
                      <StepContent step={step} align="start" />
                    </div>

                    {/* Desktop alternating grid */}
                    <div className="hidden lg:grid grid-cols-12 items-center gap-6">
                      <div className="col-span-5">
                        {!isEven ? <div className="h-px" /> : <StepContent step={step} align="end" />}
                      </div>

                      <div className="col-span-2 flex justify-center">
                        <CenterIndicator />
                      </div>

                      <div className="col-span-5">
                        {isEven ? <div className="h-px" /> : <StepContent step={step} align="start" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Section>

      {/* Why Choose Oraixen */}
      <Section className="bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={t('why.eyebrow')}
            title={t('why.title')}
            subtitle={t('why.subtitle')}
          />

          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {whyCards.map((item, i) => (
              <m.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.1, duration: 0.4, ease: 'easeOut' }}
              >
                <SpotlightCard className="h-full">
                  <div className="p-8 md:p-10 text-center h-full">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-skyblue/15 to-teal/10 border border-teal/15 flex items-center justify-center text-teal mx-auto mb-5 md:mb-6">
                      {whyIcons[i]}
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-ink mb-3 md:mb-4">
                      {item.title}
                    </h3>
                    <p className="text-sm md:text-base text-body leading-relaxed">{item.desc}</p>
                  </div>
                </SpotlightCard>
              </m.div>
            ))}
          </Stagger>
        </div>
      </Section>

      {/* Trust & Security */}
      <Section className="bg-surface-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={t('trust.eyebrow')}
            title={t('trust.title')}
            subtitle={t('trust.subtitle')}
          />

          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {trustItems.map((item, i) => (
              <m.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.08, duration: 0.4, ease: 'easeOut' }}
              >
                <Card className="p-6 md:p-7 h-full text-start">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-skyblue/15 to-teal/10 border border-teal/15 flex items-center justify-center text-teal mb-5">
                    {trustIcons[i]}
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-ink mb-2">{item.title}</h3>
                  <p className="text-sm text-body leading-relaxed">{item.desc}</p>
                </Card>
              </m.div>
            ))}
          </Stagger>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="bg-surface">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <SectionHeading
            eyebrow={t('faq.eyebrow')}
            title={t('faq.title')}
            subtitle={t('faq.subtitle')}
          />

          <Stagger className="space-y-4">
            {faqItems.map((item, i) => (
              <m.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.05, duration: 0.35, ease: 'easeOut' }}
              >
                <FaqItem q={item.q} a={item.a} defaultOpen={i === 0} />
              </m.div>
            ))}
          </Stagger>

          <FadeIn>
            <div className="text-center mt-10">
              <Button href="/contact" variant="text">
                <span className="inline-flex items-center gap-2">
                  {t('faq.stillHaveQuestion')}
                  <ArrowRight size={16} className="rtl-flip" />
                </span>
              </Button>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Closing CTA banner (the one allowed dark band) */}
      <CTASection
        title={t('cta.title')}
        subtitle={t('cta.subtitle')}
        primary={{ label: t('cta.primary'), href: '/contact' }}
        secondary={{ label: t('cta.secondary'), href: '/projects' }}
      />
    </div>
  );
}
