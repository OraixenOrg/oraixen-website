import { useTranslation } from 'react-i18next';
import { partnerships } from '../../data/partnerships';
import { PartnershipCard } from './PartnershipCard';
import { Section } from '../Section';
import { SectionHeading } from '../ui';
import { Stagger } from '../Stagger';

/**
 * Home-page Partnerships section: the commercial relationships that extend what
 * Oraixen can deliver.
 *
 * Deliberately NOT a second project grid. It sits between the selected work and
 * "Why Oraixen" so the page reads work, then partnerships, then reasons to
 * choose us, and it carries its own data (`src/data/partnerships.ts`), its own
 * card and its own asset directory so a partner can never leak into the
 * portfolio ordering or acquire a case-study route.
 *
 * Rendered on the subtle surface and separated from the selected-work section
 * above it by an explicit top border, because that section shares the same
 * background and the two would otherwise read as one long block.
 */
export function PartnershipsSection() {
  const { t } = useTranslation('home');

  return (
    <Section dark className="border-t border-line">
      <SectionHeading
        eyebrow={t('partnerships.eyebrow')}
        title={t('partnerships.title')}
        subtitle={t('partnerships.subtitle')}
      />

      {/* Three across on desktop, two then one on tablet, one on mobile. The
          grid wraps rather than scrolling, and every card carries equal visual
          weight: same column width, same logo plate, same type scale. */}
      <Stagger className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {partnerships.map((partnership) => (
          <PartnershipCard key={partnership.id} partnership={partnership} />
        ))}
      </Stagger>
    </Section>
  );
}
