import { type ReactNode } from 'react';
import { AuroraBackground, FloatingShapes, Reveal } from '../visual';
import { Eyebrow } from './Eyebrow';

interface PageHeroProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  /** CTAs or extra content rendered under the subtitle */
  children?: ReactNode;
  /** show floating shapes (reserve for marquee/showpiece heroes) */
  shapes?: boolean;
  align?: 'center' | 'start';
}

/**
 * The consistent inner-page hero shell. Same aurora backdrop, spacing, type scale and
 * reveal cadence on every page so the site feels like one product.
 */
export function PageHero({ eyebrow, title, subtitle, children, shapes = false, align = 'center' }: PageHeroProps) {
  const isCenter = align === 'center';
  return (
    <section className="relative overflow-hidden bg-surface pt-32 pb-16 md:pt-40 md:pb-24">
      <AuroraBackground intensity="subtle" />
      {shapes && <FloatingShapes />}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage: 'radial-gradient(rgb(var(--accent) / 0.08) 1px, transparent 1px)',
          backgroundSize: '34px 34px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 25%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 25%, transparent 100%)',
        }}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={isCenter ? 'max-w-4xl mx-auto text-center' : 'max-w-4xl'}>
          {eyebrow && (
            <Reveal>
              <Eyebrow className="mb-6">{eyebrow}</Eyebrow>
            </Reveal>
          )}
          <Reveal delay={0.08}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-ink leading-[1.05]">
              {title}
            </h1>
          </Reveal>
          {subtitle && (
            <Reveal delay={0.16}>
              <p className={`mt-6 text-xl md:text-2xl text-body leading-relaxed ${isCenter ? 'max-w-3xl mx-auto' : 'max-w-2xl'}`}>
                {subtitle}
              </p>
            </Reveal>
          )}
          {children && (
            <Reveal delay={0.24}>
              <div className={`mt-10 flex flex-col sm:flex-row gap-4 ${isCenter ? 'justify-center' : ''} items-center`}>
                {children}
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
