import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';

interface AnimatedCounterProps {
  /** e.g. "28+", "99.9%", "15", "$2M+", "<2s" */
  value: string;
  className?: string;
  duration?: number;
}

/**
 * Counts a numeric stat up from zero when scrolled into view.
 * Preserves any non-numeric prefix/suffix ("28+", "99.9%"). Values with no leading
 * number ("<2s") are shown as-is.
 */
export function AnimatedCounter({ value, className = '', duration = 1.6 }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();

  const match = value.match(/^(\D*)([\d.,]+)(.*)$/);
  const [display, setDisplay] = useState(() => (match ? `${match[1]}0${match[3]}` : value));

  useEffect(() => {
    if (!inView) return;
    if (!match) {
      setDisplay(value);
      return;
    }
    const prefix = match[1];
    const numStr = match[2].replace(/,/g, '');
    const suffix = match[3];
    const target = parseFloat(numStr);
    const decimals = numStr.includes('.') ? (numStr.split('.')[1] || '').length : 0;

    if (reduce || isNaN(target)) {
      setDisplay(value);
      return;
    }

    const controls = animate(0, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(`${prefix}${v.toFixed(decimals)}${suffix}`),
    });
    return () => controls.stop();
  }, [inView, value, duration, reduce]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
