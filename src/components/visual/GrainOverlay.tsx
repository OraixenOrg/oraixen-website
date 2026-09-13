/**
 * Optional film grain. Off by default on phones (full-viewport blend is expensive).
 * Uses a repeating CSS pattern instead of an SVG turbulence filter.
 */
export function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] hidden xl:block opacity-[0.025] mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
          "<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>"
        )}")`,
        backgroundSize: '120px 120px',
      }}
    />
  );
}
