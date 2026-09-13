import { type ReactNode } from 'react';
import { AuroraBackground, FloatingShapes } from '../visual';
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
    <section className="relative overflow-hidden bg-surface pt-24 pb-12 sm:pt-28 sm:pb-16 md:pt-36 md:pb-20 lg:pt-40 lg:pb-24">
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
        <div className={isCenter ? 'max-w-3xl mx-auto text-center sm:max-w-4xl' : 'max-w-4xl'}>
          {eyebrow && (
            <div className="hero-rise">
              <Eyebrow className="mb-4 sm:mb-6">{eyebrow}</Eyebrow>
            </div>
          )}
          <h1 className="page-hero-title font-extrabold tracking-tight text-ink text-balance">
            {title}
          </h1>
          {subtitle && (
            <p className={`hero-rise hero-rise-2 page-hero-sub mt-4 sm:mt-6 text-body ${isCenter ? 'max-w-2xl mx-auto md:max-w-3xl' : 'max-w-2xl'}`}>
              {subtitle}
            </p>
          )}
          {children && (
            <div className={`hero-rise hero-rise-3 mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 ${isCenter ? 'justify-center' : ''} items-stretch sm:items-center`}>
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
