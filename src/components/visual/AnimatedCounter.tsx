import { useRef } from 'react';
import { m, useInView, useReducedMotion } from 'framer-motion';
import { EASE } from '../../lib/animations';

interface AnimatedCounterProps {
  value: string;
  className?: string;
  duration?: number;
}

/**
 * Renders a metric exactly as passed and fades it in once it scrolls into view.
 * The text node is always `value` — it never counts up from a placeholder — so
 * crawlers, screenshots and renderers that never fire the in-view observer
 * still read the real figure.
 *
 * Opacity only, deliberately: callers wrap this span in a `bg-clip-text`
 * gradient container, and a transform on a descendant of a background-clip:text
 * element makes the glyphs disappear in Chrome/Safari. The rise that reads as
 * this section's polish comes from the Stagger/Reveal wrapper above that
 * container, where transforms are safe.
 */
export function AnimatedCounter({ value, className = '', duration = 0.7 }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();

  if (reduce) {
    return <span className={className}>{value}</span>;
  }

  return (
    <m.span
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: inView ? 1 : 0 }}
      transition={{ duration, ease: EASE }}
    >
      {value}
    </m.span>
  );
}
