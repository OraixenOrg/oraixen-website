import { type ReactNode, useEffect, useRef } from 'react';

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  radius?: number;
  tilt?: boolean;
}

/**
 * Card with a CSS cursor glow. Tilt is off by default (too expensive on grids).
 */
export function SpotlightCard({ children, className = '', radius = 240 }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef(0);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const { clientX, clientY } = e;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${clientX - rect.left}px`);
      el.style.setProperty('--my', `${clientY - rect.top}px`);
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      className={`group relative h-full overflow-hidden rounded-2xl border border-line bg-card shadow-card transition-shadow duration-200 hover:border-teal/40 hover:shadow-hover ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100 hidden md:block"
        style={{
          background: `radial-gradient(${radius}px circle at var(--mx, 50%) var(--my, 0%), rgba(86,201,227,0.16), transparent 60%)`,
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
