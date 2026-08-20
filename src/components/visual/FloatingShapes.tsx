/**
 * Decorative geometric shapes. CSS transforms only; skipped on small screens and reduced motion.
 */
export function FloatingShapes({ className = '' }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden hidden lg:block ${className}`}
      aria-hidden="true"
    >
      <div className="float-y absolute top-[16%] start-[10%] w-24 h-24 rounded-3xl border border-teal/25 rotate-12" />
      <div className="float-y-slow absolute top-[26%] end-[12%] w-16 h-16 rounded-full border border-skyblue/30" />
      <div className="float-y absolute bottom-[24%] start-[18%] w-20 h-20 rounded-2xl bg-gradient-to-br from-skyblue/15 to-teal/10 border border-teal/15 -rotate-6" />
      <div className="float-y-fast absolute top-[60%] end-[22%] w-3 h-3 rounded-full bg-skyblue/60" />
    </div>
  );
}
