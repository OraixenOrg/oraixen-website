import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  Loader2,
  ArrowUpRight,
  GraduationCap,
  ShoppingCart,
  Wallet,
  Utensils,
  HeartPulse,
  Users,
  Scale,
  Zap,
} from 'lucide-react';
import { Section } from '../components/Section';
import { Stagger } from '../components/Stagger';
import { ProjectGrid } from '../components/projects/ProjectGrid';
import { SpotlightCard, AnimatedCounter } from '../components/visual';
import { PageHero, SectionHeading } from '../components/ui';
import { Seo } from '../components/Seo';
import { m } from 'framer-motion';
import { projects } from '../lib/projects';

type IndustryKey =
  | 'education'
  | 'ecommerce'
  | 'finance'
  | 'food'
  | 'healthcare'
  | 'jobs'
  | 'legal'
  | 'utilities';

const INDUSTRY_ICONS: Record<IndustryKey, typeof GraduationCap> = {
  education: GraduationCap,
  ecommerce: ShoppingCart,
  finance: Wallet,
  food: Utensils,
  healthcare: HeartPulse,
  jobs: Users,
  legal: Scale,
  utilities: Zap,
};

const INDUSTRY_FILTER: Record<IndustryKey, string> = {
  education: 'education',
  ecommerce: 'ecommerce',
  finance: 'finance',
  food: 'food',
  healthcare: 'healthcare',
  jobs: 'jobs',
  legal: 'legal',
  utilities: 'utilities',
};

export function Projects() {
  const { t } = useTranslation('projects');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for better UX (remove if data is already loaded)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const industryItems = t('industries.items', { returnObjects: true }) as Array<{
    key: IndustryKey;
    name: string;
    count: number;
  }>;

  const countLabel = (count: number) => {
    const suffix = count === 1 ? 'One' : count === 2 ? 'Two' : 'Other';
    return t(`industries.project${suffix}`, { count });
  };

  return (
    <div className="min-h-screen bg-surface">
      <Seo title={t('seo.title')} description={t('seo.description')} />
      <PageHero
        shapes
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
      />

      <Section>
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="w-12 h-12 text-teal animate-spin mx-auto mb-4" />
              <p className="text-muted">{t('loading')}</p>
            </div>
          </div>
        ) : (
          <ProjectGrid projects={projects} itemsPerPage={9} />
        )}
      </Section>

      {/* Industries we serve */}
      <Section dark>
        <SectionHeading
          eyebrow={t('industries.eyebrow')}
          title={t('industries.title')}
          subtitle={t('industries.subtitle')}
        />

        <Stagger className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {industryItems.map((item, i) => {
            const Icon = INDUSTRY_ICONS[item.key];
            return (
              <m.div
                key={item.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  to={`/projects?industry=${INDUSTRY_FILTER[item.key]}`}
                  className="group block h-full"
                >
                  <SpotlightCard className="h-full">
                    <div className="p-6 h-full">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-skyblue/15 to-teal/10 border border-teal/15 flex items-center justify-center">
                          <Icon className="text-teal" size={26} />
                        </div>
                        <ArrowUpRight
                          className="text-faint opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:text-teal transition-all duration-300 rtl-flip"
                          size={20}
                        />
                      </div>
                      <h3 className="text-base font-semibold text-ink mb-1 group-hover:text-teal transition-colors">
                        {item.name}
                      </h3>
                      <AnimatedCounter
                        value={countLabel(item.count)}
                        className="text-sm text-muted"
                      />
                    </div>
                  </SpotlightCard>
                </Link>
              </m.div>
            );
          })}
        </Stagger>
      </Section>
    </div>
  );
}
