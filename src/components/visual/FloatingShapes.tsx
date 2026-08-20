/**
 * Decorative geometric shapes. CSS transforms only.
 * Positions use logical start/end so they mirror correctly in RTL.
 */
export function FloatingShapes({ className = '' }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div className="float-y absolute top-[10%] start-[4%] h-14 w-14 rounded-3xl border border-teal/25 rotate-12 sm:top-[14%] sm:start-[8%] sm:h-20 sm:w-20 lg:top-[16%] lg:start-[10%] lg:h-24 lg:w-24" />
      <div className="float-y-slow absolute top-[18%] end-[5%] h-10 w-10 rounded-full border border-skyblue/30 sm:top-[22%] sm:end-[10%] sm:h-14 sm:w-14 lg:top-[26%] lg:end-[12%] lg:h-16 lg:w-16" />
      <div className="float-y absolute bottom-[22%] start-[5%] h-12 w-12 rounded-2xl border border-teal/15 bg-gradient-to-br from-skyblue/15 to-teal/10 -rotate-6 sm:bottom-[24%] sm:start-[14%] sm:h-16 sm:w-16 lg:start-[18%] lg:h-20 lg:w-20" />
      <div className="float-y-fast absolute top-[58%] end-[7%] h-2 w-2 rounded-full bg-skyblue/60 sm:end-[16%] sm:h-2.5 sm:w-2.5 lg:top-[60%] lg:end-[22%] lg:h-3 lg:w-3" />
    </div>
  );
}
