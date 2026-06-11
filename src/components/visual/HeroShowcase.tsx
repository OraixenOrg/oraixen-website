import { m, useReducedMotion } from 'framer-motion';

/**
 * Decorative floating "glass UI" cluster for the hero — abstract mini dashboard,
 * a mobile app frame, a metric ring and a chip. Pure decoration (no real data/claims),
 * shown only on large screens, sitting behind the hero copy.
 */
export function HeroShowcase({ className = '' }: { className?: string }) {
  const reduce = useReducedMotion();
  const float = (dy: number, dur: number, delay = 0) =>
    reduce
      ? undefined
      : { animate: { y: [0, dy, 0] }, transition: { duration: dur, repeat: Infinity, ease: 'easeInOut', delay } };

  const dash = float(-16, 7);
  const phone = float(18, 8, 0.6);
  const ring = float(-12, 6, 0.3);
  const chip = float(14, 6.5, 0.9);

  return (
    <div className={`pointer-events-none absolute inset-0 hidden lg:block ${className}`} aria-hidden="true">
      {/* Glass dashboard card (top-start) */}
      <m.div
        className="absolute top-[16%] start-[3%] w-60 rounded-2xl border border-line bg-card/70 backdrop-blur-md shadow-hover p-4"
        initial={{ opacity: 0, y: 20, rotate: -3 }}
        animate={{ opacity: 1, y: reduce ? 0 : [0, -16, 0], rotate: -3 }}
        transition={{ opacity: { duration: 0.8, delay: 0.3 }, y: { duration: 7, repeat: Infinity, ease: 'easeInOut' } }}
      >
        <div className="flex items-center gap-1.5 mb-3">
          <span className="w-2 h-2 rounded-full bg-skyblue/70" />
          <span className="w-2 h-2 rounded-full bg-teal/50" />
          <span className="w-2 h-2 rounded-full bg-line" />
          <span className="ms-auto h-2 w-12 rounded-full bg-line" />
        </div>
        {/* bars */}
        <div className="flex items-end gap-1.5 h-20">
          {[40, 65, 50, 80, 60, 95, 72].map((h, i) => (
            <m.div
              key={i}
              className="flex-1 rounded-t bg-gradient-to-t from-teal/40 to-skyblue/80"
              style={{ height: `${h}%`, originY: 1 }}
              animate={reduce ? undefined : { scaleY: [0.85, 1, 0.85] }}
              transition={reduce ? undefined : { duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.12 }}
            />
          ))}
        </div>
        <div className="mt-3 space-y-1.5">
          <div className="h-1.5 w-3/4 rounded-full bg-line" />
          <div className="h-1.5 w-1/2 rounded-full bg-line" />
        </div>
      </m.div>

      {/* Mobile app frame (bottom-end) */}
      <m.div
        className="absolute bottom-[12%] end-[4%] w-44 rounded-[1.75rem] border border-line bg-card/70 backdrop-blur-md shadow-hover p-3"
        initial={{ opacity: 0, y: 20, rotate: 4 }}
        animate={{ opacity: 1, y: reduce ? 0 : [0, 18, 0], rotate: 4 }}
        transition={{ opacity: { duration: 0.8, delay: 0.5 }, y: { duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.6 } }}
      >
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-line" />
        <div className="rounded-xl bg-gradient-to-br from-skyblue/20 to-teal/10 border border-teal/15 p-3 mb-3">
          <div className="h-2 w-1/2 rounded-full bg-teal/50 mb-2" />
          <div className="h-1.5 w-3/4 rounded-full bg-line" />
        </div>
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-2 mb-2.5">
            <span className="w-7 h-7 rounded-full bg-gradient-to-br from-skyblue/40 to-teal/30 shrink-0" />
            <div className="flex-1 space-y-1">
              <div className="h-1.5 w-full rounded-full bg-line" />
              <div className="h-1.5 w-2/3 rounded-full bg-line" />
            </div>
          </div>
        ))}
      </m.div>

      {/* Gradient progress ring (top-end) */}
      <m.div className="absolute top-[22%] end-[12%]" {...ring}>
        <div className="relative w-20 h-20 rounded-full p-[3px] bg-gradient-to-br from-skyblue to-teal shadow-glow">
          <div className="w-full h-full rounded-full bg-card/80 backdrop-blur-md flex items-center justify-center">
            <div className="text-center">
              <div className="h-1.5 w-8 rounded-full bg-teal/60 mx-auto mb-1" />
              <div className="h-1 w-5 rounded-full bg-line mx-auto" />
            </div>
          </div>
        </div>
      </m.div>

      {/* Status chip (bottom-start) */}
      <m.div
        className="absolute bottom-[24%] start-[10%] flex items-center gap-2 rounded-full border border-line bg-card/70 backdrop-blur-md shadow-card px-3 py-2"
        {...chip}
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-skyblue opacity-60 animate-ping" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal" />
        </span>
        <div className="h-1.5 w-16 rounded-full bg-line" />
      </m.div>
    </div>
  );
}
