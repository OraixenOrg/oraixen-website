interface AuroraBackgroundProps {
  className?: string;
  intensity?: 'hero' | 'subtle';
}

/**
 * Decorative gradient blobs. CSS-only (compositor transforms) so they stay off the JS thread.
 * Static on small screens; animated from md up. Hidden entirely when reduced motion is on.
 */
export function AuroraBackground({ className = '', intensity = 'hero' }: AuroraBackgroundProps) {
  const o = intensity === 'hero' ? 1 : 0.55;

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <div
        className="absolute inset-0 md:hidden"
        style={{
          background: `radial-gradient(ellipse 80% 50% at 50% 0%, rgba(86,201,227,${0.14 * o}), transparent 70%)`,
        }}
      />
      <div
        className="aurora-blob aurora-a hidden md:block absolute -top-1/4 start-1/2 -translate-x-1/2 w-[70vw] h-[70vw] max-w-[720px] max-h-[720px] rounded-full"
        style={{ background: `radial-gradient(circle, rgba(86,201,227,${0.18 * o}), transparent 62%)` }}
      />
      <div
        className="aurora-blob aurora-b hidden md:block absolute top-1/3 -start-[10%] w-[50vw] h-[50vw] max-w-[560px] max-h-[560px] rounded-full"
        style={{ background: `radial-gradient(circle, rgba(15,94,112,${0.16 * o}), transparent 62%)` }}
      />
      <div
        className="aurora-blob aurora-c hidden lg:block absolute bottom-0 end-0 w-[45vw] h-[45vw] max-w-[500px] max-h-[500px] rounded-full"
        style={{ background: `radial-gradient(circle, rgba(143,224,242,${0.14 * o}), transparent 62%)` }}
      />
    </div>
  );
}
