/**
 * Decorative floating glass-UI cluster for the hero.
 * Visible immediately (no entrance delay); CSS float only on large screens.
 */
export function HeroShowcase({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 hidden lg:block ${className}`} aria-hidden="true">
      <div className="float-y absolute top-[16%] start-[3%] w-60 rounded-2xl border border-line bg-card/70 backdrop-blur-md shadow-hover p-4 -rotate-3">
        <div className="flex items-center gap-1.5 mb-3">
          <span className="w-2 h-2 rounded-full bg-skyblue/70" />
          <span className="w-2 h-2 rounded-full bg-teal/50" />
          <span className="w-2 h-2 rounded-full bg-line" />
          <span className="ms-auto h-2 w-12 rounded-full bg-line" />
        </div>
        <div className="flex items-end gap-1.5 h-20">
          {[40, 65, 50, 80, 60, 95, 72].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t bg-gradient-to-t from-teal/40 to-skyblue/80"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <div className="mt-3 space-y-1.5">
          <div className="h-1.5 w-3/4 rounded-full bg-line" />
          <div className="h-1.5 w-1/2 rounded-full bg-line" />
        </div>
      </div>

      <div className="float-y-slow absolute bottom-[12%] end-[4%] w-44 rounded-[1.75rem] border border-line bg-card/70 backdrop-blur-md shadow-hover p-3 rotate-3">
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
      </div>

      <div className="float-y absolute top-[22%] end-[12%]">
        <div className="relative w-20 h-20 rounded-full p-[3px] bg-gradient-to-br from-skyblue to-teal shadow-glow">
          <div className="w-full h-full rounded-full bg-card/80 backdrop-blur-md flex items-center justify-center">
            <div className="text-center">
              <div className="h-1.5 w-8 rounded-full bg-teal/60 mx-auto mb-1" />
              <div className="h-1 w-5 rounded-full bg-line mx-auto" />
            </div>
          </div>
        </div>
      </div>

      <div className="float-y-slow absolute bottom-[24%] start-[10%] flex items-center gap-2 rounded-full border border-line bg-card/70 backdrop-blur-md shadow-card px-3 py-2">
        <span className="relative flex h-2.5 w-2.5">
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal" />
        </span>
        <div className="h-1.5 w-16 rounded-full bg-line" />
      </div>
    </div>
  );
}
