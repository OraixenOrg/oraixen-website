import { m, useReducedMotion } from 'framer-motion';

interface AuroraBackgroundProps {
  className?: string;
  /** 'hero' = larger, more present; 'subtle' = quieter for inner sections */
  intensity?: 'hero' | 'subtle';
}

/**
 * Soft animated gradient "aurora" blobs in the brand sky/teal palette.
 * Theme-agnostic (reads on both light & dark), purely decorative, non-interactive.
 */
export function AuroraBackground({ className = '', intensity = 'hero' }: AuroraBackgroundProps) {
  const reduce = useReducedMotion();
  const o = intensity === 'hero' ? 1 : 0.6;

  const blobs = [
    {
      style: {
        background: `radial-gradient(circle, rgba(86,201,227,${0.20 * o}), transparent 60%)`,
      },
      cls: '-top-1/4 start-1/2 -translate-x-1/2 w-[80vw] h-[80vw] max-w-[900px] max-h-[900px]',
      anim: { x: ['-8%', '8%', '-8%'], y: ['-4%', '8%', '-4%'], scale: [1, 1.15, 1] },
      dur: 18,
      delay: 0,
    },
    {
      style: {
        background: `radial-gradient(circle, rgba(15,94,112,${0.18 * o}), transparent 60%)`,
      },
      cls: 'top-1/3 -start-[10%] w-[60vw] h-[60vw] max-w-[700px] max-h-[700px]',
      anim: { x: ['0%', '14%', '0%'], y: ['0%', '-10%', '0%'], scale: [1, 1.2, 1] },
      dur: 24,
      delay: 2,
    },
    {
      style: {
        background: `radial-gradient(circle, rgba(143,224,242,${0.16 * o}), transparent 60%)`,
      },
      cls: 'bottom-0 end-0 w-[55vw] h-[55vw] max-w-[650px] max-h-[650px]',
      anim: { x: ['0%', '-10%', '0%'], y: ['0%', '8%', '0%'], scale: [1.1, 1, 1.1] },
      dur: 21,
      delay: 1,
    },
  ];

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {blobs.map((b, i) => (
        <m.div
          key={i}
          className={`absolute rounded-full blur-3xl ${b.cls}`}
          style={b.style}
          animate={reduce ? undefined : b.anim}
          transition={reduce ? undefined : { duration: b.dur, repeat: Infinity, ease: 'easeInOut', delay: b.delay }}
        />
      ))}
    </div>
  );
}
