import { type ReactNode, useRef } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

interface StaggerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/** One in-view observer + CSS stagger. Opacity/transform only — no per-child JS. */
export function Stagger({
  children,
  className = '',
}: StaggerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.12 });

  const motionClass = reduce ? '' : inView ? 'stagger-in' : 'stagger-wait';

  return (
    <div ref={ref} className={`${className} ${motionClass}`.trim()}>
      {children}
    </div>
  );
}
