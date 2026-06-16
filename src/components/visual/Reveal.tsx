import { type ReactNode } from 'react';
import { m, useReducedMotion } from 'framer-motion';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  distance?: number;
  direction?: Direction;
  className?: string;
  once?: boolean;
}

/** Scroll-triggered reveal with a soft blur + slide. Respects reduced motion. */
export function Reveal({
  children,
  delay = 0,
  distance = 26,
  direction = 'up',
  className = '',
  once = true,
}: RevealProps) {
  const reduce = useReducedMotion();

  // Mirror horizontal slide directions under RTL so "left"/"right" always enter
  // from the visually-correct side in Arabic.
  const rtlMul =
    typeof document !== 'undefined' && document.documentElement.dir === 'rtl' ? -1 : 1;

  const offset: Record<Direction, { x?: number; y?: number }> = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance * rtlMul },
    right: { x: -distance * rtlMul },
    none: {},
  };

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <m.div
      className={className}
      initial={{ opacity: 0, filter: 'blur(8px)', ...offset[direction] }}
      whileInView={{ opacity: 1, filter: 'blur(0px)', x: 0, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </m.div>
  );
}
