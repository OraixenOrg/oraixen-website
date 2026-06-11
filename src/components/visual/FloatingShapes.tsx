import { m, useReducedMotion } from 'framer-motion';

/**
 * A few gently floating geometric shapes (rings, rounded squares, dots) in the brand palette.
 * Decorative, non-interactive, theme-agnostic.
 */
export function FloatingShapes({ className = '' }: { className?: string }) {
  const reduce = useReducedMotion();

  const shapes = [
    {
      cls: 'top-[16%] start-[10%] w-24 h-24 rounded-3xl border border-teal/25 rotate-12',
      anim: { y: [0, -26, 0], rotate: [12, 22, 12] },
      dur: 7,
      delay: 0,
    },
    {
      cls: 'top-[26%] end-[12%] w-16 h-16 rounded-full border border-skyblue/30',
      anim: { y: [0, 28, 0], scale: [1, 1.12, 1] },
      dur: 8,
      delay: 0.6,
    },
    {
      cls: 'bottom-[24%] start-[18%] w-20 h-20 rounded-2xl bg-gradient-to-br from-skyblue/15 to-teal/10 border border-teal/15 -rotate-6',
      anim: { y: [0, 20, 0], rotate: [-6, 6, -6] },
      dur: 9,
      delay: 1.2,
    },
    {
      cls: 'top-[60%] end-[22%] w-3 h-3 rounded-full bg-skyblue/60',
      anim: { y: [0, -18, 0], opacity: [0.4, 0.9, 0.4] },
      dur: 5,
      delay: 0.3,
    },
    {
      cls: 'top-[20%] start-[44%] w-2 h-2 rounded-full bg-teal/50',
      anim: { y: [0, 14, 0], opacity: [0.5, 1, 0.5] },
      dur: 6,
      delay: 0.9,
    },
  ];

  if (reduce) return null;

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {shapes.map((s, i) => (
        <m.div
          key={i}
          className={`absolute ${s.cls}`}
          animate={s.anim}
          transition={{ duration: s.dur, repeat: Infinity, ease: 'easeInOut', delay: s.delay }}
        />
      ))}
    </div>
  );
}
