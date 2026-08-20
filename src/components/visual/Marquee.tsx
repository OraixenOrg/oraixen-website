import { type ReactNode } from 'react';
import { useReducedMotion } from 'framer-motion';

interface MarqueeProps {
  children: ReactNode;
  speed?: number;
  className?: string;
  reverse?: boolean;
}

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
      <div
        className={`marquee-track flex w-max items-center gap-12 pe-12 ${reverse ? 'marquee-reverse' : ''}`}
        style={{ animationDuration: `${speed}s` }}
      >
        <div className="flex items-center gap-12 pe-12">{children}</div>
        <div className="flex items-center gap-12 pe-12" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
}
