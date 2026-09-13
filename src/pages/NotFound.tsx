import { useTranslation } from 'react-i18next';
import { PageHero } from '../components/ui';
import { Button } from '../components/Button';
import { Seo } from '../components/Seo';

export function NotFound() {
  const { t } = useTranslation('common');

  return (
    <div className="min-h-screen bg-surface">
      <Seo title={t('notFound.seoTitle')} description={t('notFound.subtitle')} />
      <PageHero
        eyebrow={t('notFound.eyebrow')}
        title={t('notFound.title')}
        subtitle={t('notFound.subtitle')}
      >
        <Button href="/" variant="primary" size="md" className="w-full sm:w-auto">
          {t('cta.backHome')}
        </Button>
        <Button href="/projects" variant="outline" size="md" className="w-full sm:w-auto">
          {t('cta.viewAll')}
        </Button>
      </PageHero>
    </div>
  );
}
