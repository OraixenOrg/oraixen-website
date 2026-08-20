/**
 * Decorative floating glass-UI cluster for the hero.
 * Visible on all breakpoints (smaller and faded on mobile). Positions use
 * logical start/end so the layout mirrors correctly in RTL.
 */
export function HeroShowcase({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <div className="float-y absolute top-[8%] start-[-22%] w-40 -rotate-3 rounded-2xl border border-line bg-card/70 p-3 opacity-40 shadow-hover backdrop-blur-md sm:start-[-6%] sm:top-[12%] sm:w-52 sm:p-4 sm:opacity-60 xl:start-[3%] xl:top-[16%] xl:w-60 xl:opacity-100">
        <div className="mb-3 flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-skyblue/70" />
          <span className="h-2 w-2 rounded-full bg-teal/50" />
          <span className="h-2 w-2 rounded-full bg-line" />
          <span className="ms-auto h-2 w-12 rounded-full bg-line" />
        </div>
        <div className="flex h-16 items-end gap-1.5 sm:h-20">
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

      <div className="float-y-slow absolute bottom-[10%] end-[-18%] w-32 rotate-3 rounded-[1.75rem] border border-line bg-card/70 p-2.5 opacity-40 shadow-hover backdrop-blur-md sm:bottom-[12%] sm:end-[-2%] sm:w-40 sm:p-3 sm:opacity-60 xl:end-[4%] xl:w-44 xl:opacity-100">
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-line" />
        <div className="mb-3 rounded-xl border border-teal/15 bg-gradient-to-br from-skyblue/20 to-teal/10 p-3">
          <div className="mb-2 h-2 w-1/2 rounded-full bg-teal/50" />
          <div className="h-1.5 w-3/4 rounded-full bg-line" />
        </div>
        {[0, 1, 2].map((i) => (
          <div key={i} className="mb-2.5 flex items-center gap-2">
            <span className="h-7 w-7 shrink-0 rounded-full bg-gradient-to-br from-skyblue/40 to-teal/30" />
            <div className="flex-1 space-y-1">
              <div className="h-1.5 w-full rounded-full bg-line" />
              <div className="h-1.5 w-2/3 rounded-full bg-line" />
            </div>
          </div>
        ))}
      </div>

      <div className="float-y absolute top-[16%] end-[3%] scale-75 opacity-50 sm:top-[20%] sm:end-[8%] sm:scale-90 sm:opacity-70 xl:top-[22%] xl:end-[12%] xl:scale-100 xl:opacity-100">
        <div className="relative h-16 w-16 rounded-full bg-gradient-to-br from-skyblue to-teal p-[3px] shadow-glow sm:h-20 sm:w-20">
          <div className="flex h-full w-full items-center justify-center rounded-full bg-card/80 backdrop-blur-md">
            <div className="text-center">
              <div className="mx-auto mb-1 h-1.5 w-8 rounded-full bg-teal/60" />
              <div className="mx-auto h-1 w-5 rounded-full bg-line" />
            </div>
          </div>
        </div>
      </div>

      <div className="float-y-slow absolute bottom-[20%] start-[3%] flex scale-90 items-center gap-2 rounded-full border border-line bg-card/70 px-3 py-2 opacity-50 shadow-card backdrop-blur-md sm:bottom-[22%] sm:start-[8%] sm:scale-100 sm:opacity-70 xl:bottom-[24%] xl:start-[10%] xl:opacity-100">
        <span className="relative flex h-2.5 w-2.5">
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-teal" />
        </span>
        <div className="h-1.5 w-16 rounded-full bg-line" />
      </div>
    </div>
  );
}
