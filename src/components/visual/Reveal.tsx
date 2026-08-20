import { type ReactNode } from 'react';
import { m, useReducedMotion } from 'framer-motion';
import { DURATION, EASE } from '../../lib/animations';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  distance?: number;
  direction?: Direction;
  className?: string;
  once?: boolean;
  /** Skip motion so above-the-fold / LCP content is visible immediately. */
  instant?: boolean;
}

export function Reveal({
  children,
  distance = 10,
  direction = 'up',
  className = '',
  once = true,
  instant = false,
}: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce || instant) {
    return <div className={className}>{children}</div>;
  }

  const rtlMul =
    typeof document !== 'undefined' && document.documentElement.dir === 'rtl' ? -1 : 1;

  const offset: Record<Direction, { x?: number; y?: number }> = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance * rtlMul },
    right: { x: -distance * rtlMul },
    none: {},
  };

  return (
    <m.div
      className={className}
      initial={{ opacity: 0, ...offset[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount: 0.05 }}
      transition={{ duration: DURATION, ease: EASE }}
    >
      {children}
    </m.div>
  );
}
