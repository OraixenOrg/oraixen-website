import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Code, Code2, Smartphone, Server, Cpu, CheckCircle, Zap, Quote, ChevronDown, Layers, Workflow, Target, Globe, LifeBuoy } from 'lucide-react';
import { Section } from '../components/Section';
import { Button } from '../components/Button';
import { Seo } from '../components/Seo';
import { FeaturedProjects } from '../components/projects/FeaturedProjects';
import { FadeIn } from '../components/FadeIn';
import { Stagger } from '../components/Stagger';
import {
  AuroraBackground,
  FloatingShapes,
  HeroShowcase,
  Marquee,
  AnimatedCounter,
  SpotlightCard,
  Reveal,
} from '../components/visual';
import { SectionHeading, CTASection } from '../components/ui';
import { m } from 'framer-motion';

const serviceIcons = [
  <Smartphone className="text-teal" size={26} />,
  <Code className="text-teal" size={26} />,
  <Server className="text-teal" size={26} />,
  <Cpu className="text-teal" size={26} />,
];

const whyIcons = [Code2, Layers, Workflow, Target, Globe, LifeBuoy];

export function Home() {
  const { t } = useTranslation('home');

  const stats = t('stats.items', { returnObjects: true }) as Array<{ value: string; label: string }>;
  const logos = t('logos.items', { returnObjects: true }) as string[];
  const services = t('services.items', { returnObjects: true }) as Array<{ title: string; desc: string; tag?: string }>;
  const testimonials = t('testimonials.items', { returnObjects: true }) as Array<{ quote: string; name: string; role: string; company: string }>;
  const processSteps = t('process.steps', { returnObjects: true }) as string[];
  const processCard = t('process.card.items', { returnObjects: true }) as Array<{ num: string; title: string; desc: string }>;
  const whyChoose = t('whyChoose.items', { returnObjects: true }) as Array<{ title: string; desc: string }>;

  return (
    <div className="min-h-screen">
      <Seo title={t('seo.title')} description={t('seo.description')} />
      {/* ===================== Hero ===================== */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-surface">
        <AuroraBackground intensity="hero" />
        <FloatingShapes />
        <HeroShowcase />
        {/* dotted grid */}
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{
            backgroundImage: 'radial-gradient(rgb(var(--accent) / 0.10) 1px, transparent 1px)',
            backgroundSize: '34px 34px',
            maskImage: 'radial-gradient(ellipse 85% 60% at 50% 45%, black 30%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 85% 60% at 50% 45%, black 30%, transparent 100%)',
          }}
        />

        <div className="container mx-auto py-5 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            {/* Eyebrow */}
            <Reveal>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/70 backdrop-blur-sm text-teal border border-teal/20 text-sm font-semibold mb-10 shadow-card">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-skyblue opacity-60 animate-ping" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-teal" />
                </span>
                <Zap className="text-teal" size={15} />
                <span className="tracking-wide">{t('hero.eyebrow')}</span>
              </div>
            </Reveal>

            {/* Headline */}
            <Reveal delay={0.08}>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-ink mb-8 leading-[1.05]">
                {t('hero.headlineLead')}{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-skyblue via-teal to-azure">
                    {t('hero.headlineHighlight')}
                  </span>
                  <m.span
                    className="absolute -inset-x-3 -inset-y-1 -z-0 rounded-full blur-2xl"
                    style={{ background: 'linear-gradient(90deg, rgba(86,201,227,0.35), rgba(15,94,112,0.30))' }}
                    animate={{ opacity: [0.4, 0.75, 0.4], scale: [0.96, 1.04, 0.96] }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                    aria-hidden="true"
                  />
                </span>
              </h1>
            </Reveal>

            {/* Subheadline */}
            <Reveal delay={0.16}>
              <p className="text-xl sm:text-2xl md:text-3xl text-body mb-12 max-w-4xl mx-auto leading-relaxed font-light">
                {t('hero.subhead')}
              </p>
            </Reveal>

            {/* CTAs */}
            <Reveal delay={0.24}>
              <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-8">
                <Button href="/contact" variant="primary" size="lg" icon>
                  {t('hero.ctaPrimary')}
                </Button>
                <Button href="/projects" variant="outline" size="lg">
                  {t('hero.ctaSecondary')}
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.32}>
              <p className="text-sm text-muted font-medium">{t('hero.caption')}</p>
            </Reveal>
          </div>
        </div>

        {/* Scroll cue */}
        <m.div
          className="absolute bottom-8 start-1/2 -translate-x-1/2 text-muted"
          animate={{ y: [0, 8, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        >
          <ChevronDown size={24} />
        </m.div>
      </section>

      {/* ===================== Stats ===================== */}
      <div className="relative bg-surface-muted border-y border-line py-20 overflow-hidden">
        <AuroraBackground intensity="subtle" />
        <div className="container mx-auto px-4 relative z-10">
          <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
            {stats.map((stat, i) => (
              <m.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl bg-card/70 backdrop-blur-sm border border-line shadow-card px-4 py-7 text-center hover:border-teal/40 hover:shadow-hover transition-all duration-300"
              >
                <div className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-br from-skyblue to-teal">
                  <AnimatedCounter value={stat.value} />
                </div>
                <div className="text-sm text-muted uppercase tracking-wider font-semibold">{stat.label}</div>
              </m.div>
            ))}
          </Stagger>
        </div>
      </div>

      {/* ===================== Client logos marquee ===================== */}
      <div className="relative bg-surface border-b border-line py-16 overflow-hidden">
        <div className="container mx-auto px-4">
          <FadeIn>
            <p className="text-center text-sm font-semibold text-muted uppercase tracking-wider mb-2">
              {t('logos.eyebrow')}
            </p>
            <p className="text-center text-faint text-sm mb-10">{t('logos.caption')}</p>
          </FadeIn>
          <Marquee speed={34}>
            {logos.map((name, i) => (
              <span
                key={i}
                className="text-lg md:text-xl font-bold text-faint hover:text-teal transition-colors duration-300 whitespace-nowrap"
              >
                {name}
              </span>
            ))}
          </Marquee>
        </div>
      </div>

      {/* ===================== Services ===================== */}
      <Section>
        <SectionHeading
          eyebrow={t('services.eyebrow')}
          title={t('services.title')}
          subtitle={t('services.subtitle')}
        />

        <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <m.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <SpotlightCard className="h-full">
                <div className="p-8 h-full group">
                  <div className="relative mb-6 w-14 h-14">
                    <m.div
                      className="absolute inset-0 rounded-2xl border border-teal/20"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                      aria-hidden="true"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-skyblue/15 to-teal/10 border border-teal/15 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      {serviceIcons[i]}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <h3 className="text-xl font-bold text-ink group-hover:text-teal transition-colors">{service.title}</h3>
                    {service.tag && (
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-teal/5 text-teal border border-teal/15">
                        {service.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-body mb-6 leading-relaxed">{service.desc}</p>
                  <Link
                    to="/services"
                    className="inline-flex items-center text-teal text-sm font-semibold hover:text-teal-light transition-colors group/link"
                  >
                    {t('services.learnMore')}
                    <ArrowRight size={16} className="ms-1 group-hover/link:translate-x-1 transition-transform rtl-flip" />
                  </Link>
                </div>
              </SpotlightCard>
            </m.div>
          ))}
        </Stagger>
      </Section>

      {/* ===================== Featured Projects ===================== */}
      <FeaturedProjects />

      {/* ===================== Why Choose Oraixen ===================== */}
      <Section>
        <SectionHeading
          eyebrow={t('whyChoose.eyebrow')}
          title={t('whyChoose.title')}
          subtitle={t('whyChoose.subtitle')}
        />

        <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyChoose.map((item, i) => {
            const Icon = whyIcons[i % whyIcons.length];
            return (
              <m.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <SpotlightCard className="h-full">
                  <div className="p-8 h-full flex flex-col">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-skyblue/15 to-teal/10 border border-teal/15 flex items-center justify-center mb-6">
                      <Icon className="text-teal" size={24} strokeWidth={1.75} />
                    </div>
                    <h3 className="text-lg font-bold text-ink mb-3">{item.title}</h3>
                    <p className="text-body leading-relaxed text-sm">{item.desc}</p>
                  </div>
                </SpotlightCard>
              </m.div>
            );
          })}
        </Stagger>
      </Section>

      {/* ===================== Process preview ===================== */}
      <Section dark>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <Reveal direction="right">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal/5 text-teal border border-teal/15 text-sm font-semibold mb-6">
              {t('process.eyebrow')}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-ink mb-6">{t('process.title')}</h2>
            <p className="text-body mb-10 text-lg leading-relaxed">{t('process.subtitle')}</p>
            <div className="space-y-4 mb-10">
              {processSteps.map((step, i) => (
                <m.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center group"
                >
                  <div className="w-8 h-8 rounded-full bg-teal/5 border border-teal/30 flex items-center justify-center me-4 group-hover:bg-teal/10 transition-colors shrink-0">
                    <CheckCircle className="text-teal" size={18} />
                  </div>
                  <span className="text-ink font-medium">{step}</span>
                </m.div>
              ))}
            </div>
            <Button href="/process" variant="secondary" size="lg">
              {t('process.cta')}
            </Button>
          </Reveal>

          <Reveal delay={0.15} direction="left" className="relative">
            <m.div
              className="absolute inset-0 bg-gradient-to-br from-skyblue/15 to-teal/15 blur-3xl rounded-full opacity-50"
              animate={{ opacity: [0.35, 0.6, 0.35], scale: [0.95, 1.05, 0.95] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              aria-hidden="true"
            />
            <div className="relative p-10 rounded-2xl bg-card border border-line shadow-card">
              <div className="space-y-10">
                {processCard.map((step, i) => (
                  <div key={i}>
                    <div className="flex gap-5">
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg shrink-0 ${
                          i === 0
                            ? 'bg-gradient-to-br from-skyblue to-teal text-onaccent shadow-glow'
                            : 'bg-surface-subtle border border-line text-muted'
                        }`}
                      >
                        {step.num}
                      </div>
                      <div>
                        <h4 className="text-ink font-bold text-lg mb-2">{step.title}</h4>
                        <p className="text-body text-sm leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                    {i < processCard.length - 1 && (
                      <div className="w-0.5 h-8 bg-gradient-to-b from-teal/40 to-transparent ms-7 my-2" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ===================== Testimonials ===================== */}
      <Section>
        <SectionHeading
          eyebrow={t('testimonials.eyebrow')}
          title={t('testimonials.title')}
          subtitle={t('testimonials.subtitle')}
        />

        <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, i) => (
            <m.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <SpotlightCard className="h-full">
                <div className="p-8 h-full flex flex-col">
                  <Quote className="text-teal mb-5 rtl-flip" size={28} />
                  <p className="text-body leading-relaxed mb-6 flex-1">{item.quote}</p>
                  <div className="pt-5 border-t border-line">
                    <p className="text-ink font-bold">{item.name}</p>
                    <p className="text-muted text-sm">
                      {item.role} · {item.company}
                    </p>
                    <span className="inline-block mt-3 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-surface-muted text-muted border border-line">
                      {t('testimonials.placeholderBadge')}
                    </span>
                  </div>
                </div>
              </SpotlightCard>
            </m.div>
          ))}
        </Stagger>
      </Section>

      {/* ===================== Final CTA banner ===================== */}
      <CTASection
        title={t('cta.title')}
        subtitle={t('cta.subtitle')}
        primary={{ label: t('cta.primary'), href: '/contact' }}
        secondary={{ label: t('cta.secondary'), href: '/projects' }}
      />
    </div>
  );
}
