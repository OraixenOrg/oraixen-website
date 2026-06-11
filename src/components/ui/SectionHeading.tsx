import { type ReactNode } from 'react';
import { Reveal } from '../visual';
import { Eyebrow } from './Eyebrow';

interface SectionHeadingProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: 'center' | 'start';
  className?: string;
}

/** Consistent section header (eyebrow → title → subtitle) used on every section across the site. */
export function SectionHeading({ eyebrow, title, subtitle, align = 'center', className = '' }: SectionHeadingProps) {
  const isCenter = align === 'center';
  return (
    <Reveal
      className={`flex flex-col ${isCenter ? 'items-center text-center mx-auto max-w-3xl' : 'items-start text-start'} mb-12 md:mb-16 ${className}`}
    >
      {eyebrow && <Eyebrow className="mb-5">{eyebrow}</Eyebrow>}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-ink leading-tight">{title}</h2>
      {subtitle && <p className={`mt-4 text-lg md:text-xl text-body leading-relaxed ${isCenter ? 'max-w-3xl' : 'max-w-2xl'}`}>{subtitle}</p>}
    </Reveal>
  );
}
