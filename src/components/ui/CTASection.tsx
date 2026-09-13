import { type ReactNode } from 'react';
import { Button } from '../Button';
import { Reveal } from '../visual';
import { trackCtaClick } from '../../lib/analytics';

interface CTALink {
  label: ReactNode;
  href: string;
  /**
   * Stable, machine-readable analytics id (e.g. 'home_final_start_project').
   * Optional: omit it and this CTA simply stays untracked, so existing callers
   * keep working unchanged. Never derived from the translated label.
   */
  ctaId?: string;
}

interface CTASectionProps {
  title: ReactNode;
  subtitle?: ReactNode;
  primary: CTALink;
  secondary?: CTALink;
  /** Where this band lives, e.g. 'home_final_cta'. Required for CTA tracking. */
  ctaLocation?: string;
}

/**
 * The single, consistent closing call-to-action band used at the bottom of pages.
 * Fixed deep brand gradient (works in both themes) with an animated sky glow.
 */
export function CTASection({ title, subtitle, primary, secondary, ctaLocation }: CTASectionProps) {
  // Only tracks when the caller supplied both a location and a stable id.
  const handleCtaClick = (link: CTALink) => () => {
    if (!ctaLocation || !link.ctaId) return;
    trackCtaClick(link.ctaId, ctaLocation, link.href);
  };

  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-br from-azure to-inkblack overflow-hidden">
      <div
        className="absolute top-0 end-1/4 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full blur-3xl opacity-40"
        style={{ background: 'radial-gradient(circle, rgba(86,201,227,0.30), transparent 60%)' }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.10) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
        }}
      />
      <div className="container mx-auto px-4 text-center relative z-10">
        <Reveal>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-5">{title}</h2>
          {subtitle && (
            <p className="text-white/90 text-lg md:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed">{subtitle}</p>
          )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              href={primary.href}
              variant="primary"
              size="lg"
              className="bg-white !text-azure hover:bg-white/90 shadow-2xl shadow-black/20"
              icon
              onClick={handleCtaClick(primary)}
            >
              {primary.label}
            </Button>
            {secondary && (
              <Button
                href={secondary.href}
                variant="outline"
                size="lg"
                className="border-white/40 !text-white hover:bg-white/10 hover:border-white"
                onClick={handleCtaClick(secondary)}
              >
                {secondary.label}
              </Button>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
