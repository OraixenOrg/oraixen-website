import { type ReactNode } from 'react';
import { m, useReducedMotion } from 'framer-motion';
import { DURATION, EASE } from '../lib/animations';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function FadeIn({
  children,
  className = '',
}: FadeInProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <m.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: DURATION, ease: EASE }}
      className={className}
    >
      {children}
    </m.div>
  );
}
