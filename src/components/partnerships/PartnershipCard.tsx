import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { PARTNER_FALLBACK_LOGO, type Partnership } from '../../data/partnerships';
import { SpotlightCard } from '../visual';
import { marketFromLanguage } from '../../lib/marketLocale';

interface PartnershipCardProps {
  partnership: Partnership;
}

/**
 * One partner in the home-page Partnerships grid.
 *
 * Its own component, rather than inline in the section, because each card owns
 * a piece of state: whether its logo failed to load. A hook cannot be called
 * inside the section's `.map()`, and one shared failure flag would hide the
 * logos that do resolve the moment any single one breaks.
 *
 * ## Designed for sparse data
 *
 * Only `name`, `logo` and `relationship` are guaranteed. Description, category,
 * country, website and start year are each owner-confirmed per partner, so
 * every one of them is a conditional block and nothing is ever padded with
 * filler to even the cards out - a partner down to a name and a label renders
 * no empty divider and no placeholder row. Height is equalized by geometry
 * instead: a logo plate of fixed aspect, a shared top alignment, and `mt-auto`
 * on the meta footer, so a thin card still reads as finished beside a full one.
 */
export function PartnershipCard({ partnership }: PartnershipCardProps) {
  const { t, i18n } = useTranslation('home');
  const market = marketFromLanguage(i18n.language);

  // Recorded as the URL that failed rather than a boolean, so `onError` cannot
  // loop: when it fires for the placeholder itself the state is already set and
  // React re-renders nothing.
  const [failedLogo, setFailedLogo] = useState<string | null>(null);
  const logoSrc = failedLogo === partnership.logo ? PARTNER_FALLBACK_LOGO : partnership.logo;

  const relationship = partnership.relationship[market];
  const description = partnership.description?.[market];
  const category = partnership.category?.[market];
  const country = partnership.country?.[market];
  const { website, since } = partnership;
  const hasMeta = Boolean(country || category || since || website);

  return (
    <SpotlightCard className="h-full">
      <div className="flex h-full flex-col p-5 sm:p-6">
        {/* Logo plate: the artwork fills it edge to edge, via object-cover.

            Every supplied partner asset is a fully opaque PNG with its own flat
            matte baked in, and the three mattes disagree - Maat and Inovara sit
            on near-white, Unamed Solutions is white-on-black. Centring those
            inside a padded plate drew the matte as a hard rectangle on the
            plate colour, so one partner always looked boxed: the black asset
            against a light plate, the two light assets against a dark one.
            Letting the artwork cover the plate makes each matte BE that card's
            plate, which reads as deliberate and is correct in both themes
            without touching anyone's brand asset.

            The aspect ratio is the assets' own 851x315. Matching it means cover
            has nothing to crop, so the mark is never clipped; an asset of some
            other ratio would be cropped symmetrically from the centre rather
            than letterboxed back into a floating box. */}
        <div className="aspect-[851/315] w-full shrink-0 overflow-hidden rounded-2xl border border-line bg-surface-subtle">
          <img
            src={logoSrc}
            alt={t('partnerships.logoAlt', { partner: partnership.name })}
            className="h-full w-full object-cover"
            onError={() => setFailedLogo(partnership.logo)}
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="pt-6">
          {/* The relationship, at card scale: the same pill vocabulary as the
              section Eyebrow. No letter-spacing, which would break the cursive
              joins of the Arabic label. `items-start` rather than `items-center`
              so the leading dot stays on the first line if a long label ever
              wraps on a narrow card. */}
          <span className="inline-flex items-start gap-1.5 rounded-full border border-teal/20 bg-teal/5 px-2.5 py-1 text-[11px] font-semibold text-teal">
            <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-teal" aria-hidden="true" />
            {relationship}
          </span>

          {/* <bdi>, not dir="auto" on the heading itself. Both isolate a Latin
              brand name inside the Arabic markets' RTL flow, but dir="auto" also
              flips the HEADING's own direction to LTR, which resolves its
              text-align:start to the left and leaves the name hugging the
              opposite edge from the relationship pill above it. <bdi> isolates
              the name without touching the block's direction, so the name and
              the pill stay on the same side in all three markets. */}
          <h3 className="mt-3 text-xl font-bold text-ink">
            <bdi>{partnership.name}</bdi>
          </h3>

          {description && <p className="mt-3 text-sm leading-relaxed text-body">{description}</p>}
        </div>

        {hasMeta && (
          <div className="mt-auto border-t border-line pt-5">
            {(country || category || since) && (
              <div className="mb-4 flex flex-wrap gap-2">
                {country && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface-subtle px-2.5 py-1 text-[11px] font-semibold text-muted">
                    <MapPin size={11} className="shrink-0" aria-hidden="true" />
                    {country}
                  </span>
                )}
                {category && (
                  <span className="rounded-full border border-line bg-surface-subtle px-2.5 py-1 text-[11px] font-semibold text-muted">
                    {category}
                  </span>
                )}
                {/* Renders only for a partner with a confirmed start year. None
                    has one today, so no card shows this badge and none shows a
                    placeholder year in its place. */}
                {since && (
                  <span className="rounded-full border border-line bg-surface-subtle px-2.5 py-1 text-[11px] font-semibold text-muted">
                    {t('partnerships.since', { year: since })}
                  </span>
                )}
              </div>
            )}

            {/* Only a partner with an owner-confirmed site gets a link. There is
                no '#' placeholder and no guessed domain for the others, and the
                card above is built to look complete without this row.

                A plain <a>, deliberately not a stretched link over the whole
                card: the card is a content block, and making it one big
                external anchor would nest any later in-card link inside it. */}
            {website && (
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('partnerships.ctaAria', { partner: partnership.name })}
                className="inline-flex items-center rounded text-sm font-semibold text-teal transition-colors hover:text-teal-light"
              >
                {t('partnerships.cta')}
                <ArrowUpRight size={16} className="ms-1 rtl-flip" aria-hidden="true" />
              </a>
            )}
          </div>
        )}
      </div>
    </SpotlightCard>
  );
}
