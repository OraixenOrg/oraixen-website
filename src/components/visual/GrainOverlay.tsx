/**
 * A very subtle fixed film-grain/noise overlay that adds tactile depth across the
 * whole page (a hallmark of premium, high-craft sites). Non-interactive, ~3.5% opacity.
 */
const NOISE_SVG = encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'>` +
    `<filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/></filter>` +
    `<rect width='100%' height='100%' filter='url(#n)'/></svg>`
);

export function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] opacity-[0.035] mix-blend-overlay"
      style={{ backgroundImage: `url("data:image/svg+xml,${NOISE_SVG}")`, backgroundSize: '160px 160px' }}
    />
  );
}
