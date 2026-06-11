import { type ReactNode, useRef } from 'react';
import { m, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  /** radius of the cursor glow in px */
  radius?: number;
  /** subtle 3D tilt toward the cursor (default on) */
  tilt?: boolean;
}

/**
 * Premium interactive card: a soft teal glow follows the cursor, the surface tilts
 * gently in 3D toward the pointer, and it lifts on hover. Already renders the
 * bg-card + border-line + rounded-2xl + shadow surface — put padding/content inside.
 */
export function SpotlightCard({ children, className = '', radius = 260, tilt = true }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const enableTilt = tilt && !reduce;

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [6.5, -6.5]), { stiffness: 200, damping: 18 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-6.5, 6.5]), { stiffness: 200, damping: 18 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  const handleLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="h-full [perspective:1000px]"
    >
      <m.div
        style={enableTilt ? { rotateX, rotateY, transformStyle: 'preserve-3d' } : undefined}
        className={`group relative h-full overflow-hidden rounded-2xl border border-line bg-card shadow-card transition-shadow duration-300 hover:border-teal/40 hover:shadow-hover ${className}`}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(${radius}px circle at var(--mx, 50%) var(--my, 0%), rgba(86,201,227,0.16), transparent 60%)`,
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 h-full">{children}</div>
      </m.div>
    </div>
  );
}
