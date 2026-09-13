import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// TODO: Re-add `Quote` to this import after testimonial wording is approved by the clients.
// import { ..., Quote, ... } from 'lucide-react';
import { ArrowRight, Code, Code2, Smartphone, Server, Cpu, CheckCircle, Zap, Layers, Workflow, Target, Globe, LifeBuoy, BrainCircuit, RefreshCw } from 'lucide-react';
import { Section } from '../components/Section';
import { Button } from '../components/Button';
import { Seo } from '../components/Seo';
import { FeaturedProjects } from '../components/projects/FeaturedProjects';
import { ProjectLogoStrip } from '../components/projects/ProjectLogoStrip';
import { Stagger } from '../components/Stagger';
import {
  AuroraBackground,
  FloatingShapes,
  HeroShowcase,
  AnimatedCounter,
  SpotlightCard,
  Reveal,
} from '../components/visual';
import { SectionHeading, CTASection } from '../components/ui';
import statsData from '../data/stats.json';
// TODO: Re-enable after testimonial wording is approved by the clients.
// import testimonialsData from '../data/testimonials.json';

const serviceIcons = [
  <Smartphone className="text-teal" size={26} />,
  <Code className="text-teal" size={26} />,
  <BrainCircuit className="text-teal" size={26} />,
  <Server className="text-teal" size={26} />,
  <Cpu className="text-teal" size={26} />,
  <RefreshCw className="text-teal" size={26} />,
];

const whyIcons = [Code2, Layers, Workflow, Target, Globe, LifeBuoy];

export function Home() {
  const { t, i18n } = useTranslation('home');
  const { t: tc } = useTranslation('common');
  const lang = i18n.language?.startsWith('ar') ? 'ar' : 'en';

  // Business data lives in src/data/*.json (easy to edit, bilingual). UI copy stays in i18n.
  const stats = statsData[lang] as Array<{ value: string; label: string }>;
  // TODO: Re-enable after testimonial wording is approved by the clients.
  // const testimonials = testimonialsData[lang] as Array<{ quote: string; name: string; role: string; company: string }>;
  const services = t('services.items', { returnObjects: true }) as Array<{ title: string; desc: string; tag?: string }>;
  const processSteps = t('process.steps', { returnObjects: true }) as string[];
  const processCard = t('process.card.items', { returnObjects: true }) as Array<{ num: string; title: string; desc: string }>;
  const whyChoose = t('whyChoose.items', { returnObjects: true }) as Array<{ title: string; desc: string }>;

  return (
    <div className="min-h-screen">
      <Seo title={t('seo.title')} description={t('seo.description')} />
      {/* ===================== Hero ===================== */}
      <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-surface">
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

        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 pt-24 pb-6 sm:px-6 sm:pt-28 md:pt-32 lg:px-8">
          <div className="mx-auto w-full max-w-5xl text-center">
            <div className="hero-rise mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-teal/20 bg-card/70 px-3 py-1.5 text-xs font-semibold text-teal shadow-card backdrop-blur-sm sm:mb-7 sm:px-4 sm:py-2 sm:text-sm">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-skyblue opacity-60 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-teal" />
                </span>
                <Zap className="shrink-0 text-teal" size={14} />
                <span className="truncate tracking-wide">{t('hero.eyebrow')}</span>
              </div>

            <h1 className="hero-title mb-4 font-extrabold tracking-tight text-ink text-balance sm:mb-6">
                {t('hero.headlineLead')}{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-skyblue via-teal to-azure bg-clip-text text-transparent">
                    {t('hero.headlineHighlight')}
                  </span>
                  <span
                    className="absolute -inset-x-3 -inset-y-1 -z-0 rounded-full opacity-50 blur-2xl"
                    style={{ background: 'linear-gradient(90deg, rgba(86,201,227,0.35), rgba(15,94,112,0.30))' }}
                    aria-hidden="true"
                  />
                </span>
              </h1>

            <p className="hero-rise hero-rise-2 hero-sub mx-auto mb-7 max-w-2xl font-light text-body sm:mb-9 md:max-w-3xl">
                {t('hero.subhead')}
              </p>

            <div className="hero-rise hero-rise-3 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
                <Button href="/contact" variant="primary" size="md" icon className="w-full sm:w-auto">
                  {t('hero.ctaPrimary')}
                </Button>
                <Button href="/projects" variant="outline" size="md" className="w-full sm:w-auto">
                  {t('hero.ctaSecondary')}
                </Button>
              </div>
          </div>
        </div>

        <a
          href="#home-next"
          className="hero-scroll relative z-10 mx-auto mb-5 mt-2 flex flex-col items-center gap-2 text-muted outline-none sm:mb-7"
          aria-label={tc('a11y.scrollDown')}
        >
          <span className="hero-scroll-mouse" aria-hidden="true">
            <span className="hero-scroll-wheel" />
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] sm:text-xs">
            {t('hero.scroll')}
          </span>
        </a>
      </section>

      {/* ===================== Stats ===================== */}
      <div id="home-next" className="relative bg-surface-muted border-y border-line py-12 sm:py-16 md:py-20 overflow-hidden scroll-mt-20">
        <AuroraBackground intensity="subtle" />
        <div className="container mx-auto px-4 relative z-10">
          <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl bg-card/70 backdrop-blur-sm border border-line shadow-card px-4 py-7 text-center hover:border-teal/40 hover:shadow-hover transition-all duration-200"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-br from-skyblue to-teal">
                  <AnimatedCounter value={stat.value} />
                </div>
                <div className="text-xs sm:text-sm text-muted uppercase tracking-wider font-semibold">{stat.label}</div>
              </div>
            ))}
          </Stagger>
        </div>
      </div>

      <ProjectLogoStrip />

      {/* ===================== Services ===================== */}
      <Section>
        <SectionHeading
          eyebrow={t('services.eyebrow')}
          title={t('services.title')}
          subtitle={t('services.subtitle')}
        />

        <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <SpotlightCard key={i} className="h-full">
                <div className="p-8 h-full group">
                  <div className="relative mb-6 w-14 h-14">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-skyblue/15 to-teal/10 border border-teal/15 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      {serviceIcons[i] ?? serviceIcons[0]}
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
              <SpotlightCard key={i} className="h-full">
                  <div className="p-8 h-full flex flex-col">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-skyblue/15 to-teal/10 border border-teal/15 flex items-center justify-center mb-6">
                      <Icon className="text-teal" size={24} strokeWidth={1.75} />
                    </div>
                    <h3 className="text-lg font-bold text-ink mb-3">{item.title}</h3>
                    <p className="text-body leading-relaxed text-sm">{item.desc}</p>
                  </div>
                </SpotlightCard>
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
                <div
                  key={i}
                  className="flex items-center group"
                >
                  <div className="w-8 h-8 rounded-full bg-teal/5 border border-teal/30 flex items-center justify-center me-4 group-hover:bg-teal/10 transition-colors shrink-0">
                    <CheckCircle className="text-teal" size={18} />
                  </div>
                  <span className="text-ink font-medium">{step}</span>
                </div>
              ))}
            </div>
            <Button href="/process" variant="secondary" size="lg">
              {t('process.cta')}
            </Button>
          </Reveal>

          <Reveal direction="left" className="relative">
            <div
              className="absolute inset-0 bg-gradient-to-br from-skyblue/15 to-teal/15 blur-3xl rounded-full opacity-50"
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

      {/*
        ===================== Testimonials =====================
        TEMPORARILY DISABLED:
        These testimonials contain draft wording that must be confirmed
        by the respective clients before being published publicly.
        Re-enable this section only after client approval, together with the
        `Quote` icon import, the `testimonialsData` import and the
        `testimonials` variable at the top of this file.

        <Section>
          <SectionHeading
            eyebrow={t('testimonials.eyebrow')}
            title={t('testimonials.title')}
            subtitle={t('testimonials.subtitle')}
          />

          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((item, i) => (
                <SpotlightCard key={i} className="h-full">
                  <div className="p-8 h-full flex flex-col">
                    <Quote className="text-teal mb-5 rtl-flip" size={28} />
                    <p className="text-body leading-relaxed mb-6 flex-1">{item.quote}</p>
                    <div className="pt-5 border-t border-line">
                      <p className="text-ink font-bold">{item.name}</p>
                      <p className="text-muted text-sm">
                        {item.role} · {item.company}
                      </p>
                    </div>
                  </div>
                </SpotlightCard>
            ))}
          </Stagger>
        </Section>
      */}

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
