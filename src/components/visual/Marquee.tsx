import { type ReactNode } from 'react';
import { m, useReducedMotion } from 'framer-motion';

interface MarqueeProps {
  children: ReactNode;
  /** seconds for one full loop */
  speed?: number;
  className?: string;
  reverse?: boolean;
}

/**
 * Infinite horizontal marquee with soft edge fade. Duplicates its children to loop seamlessly.
 * Falls back to a static centered row when reduced motion is requested.
 */
export function Marquee({ children, speed = 32, className = '', reverse = false }: MarqueeProps) {
  const reduce = useReducedMotion();

  const fadeMask =
    'linear-gradient(to right, transparent, black 8%, black 92%, transparent)';

  if (reduce) {
    return (
      <div className={`flex flex-wrap items-center justify-center gap-x-12 gap-y-6 ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ maskImage: fadeMask, WebkitMaskImage: fadeMask }}
    >
      <m.div
        className="flex w-max items-center gap-12 pe-12"
        animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
      >
        <div className="flex items-center gap-12 pe-12">{children}</div>
        <div className="flex items-center gap-12 pe-12" aria-hidden="true">{children}</div>
      </m.div>
    </div>
  );
}
