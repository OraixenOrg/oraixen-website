import { m, useScroll, useSpring } from 'framer-motion';

/** Thin gradient progress bar pinned to the top of the viewport, tracking page scroll. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.2 });

  return (
    <m.div
      aria-hidden="true"
      className="fixed top-0 inset-x-0 h-[3px] z-[70] bg-gradient-to-r from-skyblue via-teal to-azure"
      style={{ scaleX, transformOrigin: '0% 50%' }}
    />
  );
}
