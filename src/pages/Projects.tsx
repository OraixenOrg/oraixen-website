import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
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
import { SpotlightCard } from '../components/visual';
import { PageHero, SectionHeading } from '../components/ui';
import { Seo } from '../components/Seo';
import { matchesIndustryKey, projects } from '../lib/projects';

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

export function Projects() {
  const { t } = useTranslation('projects');

  const industryItems = (
    t('industries.items', { returnObjects: true }) as Array<{
      key: IndustryKey;
      name: string;
    }>
  ).filter((item) => projects.some((project) => matchesIndustryKey(project, item.key)));

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
        <ProjectGrid projects={projects} itemsPerPage={9} />
      </Section>

      <Section dark>
        <SectionHeading
          eyebrow={t('industries.eyebrow')}
          title={t('industries.title')}
          subtitle={t('industries.subtitle')}
        />

        <Stagger className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {industryItems.map((item) => {
            const Icon = INDUSTRY_ICONS[item.key];
            return (
              <Link
                key={item.key}
                to={`/projects?industry=${item.key}#project-grid`}
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
                    <h3 className="text-base font-semibold text-ink group-hover:text-teal transition-colors">
                      {item.name}
                    </h3>
                  </div>
                </SpotlightCard>
              </Link>
            );
          })}
        </Stagger>
      </Section>
    </div>
  );
}
