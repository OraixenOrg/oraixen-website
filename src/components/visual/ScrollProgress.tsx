import { m, useScroll } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <m.div
      aria-hidden="true"
      className="fixed top-0 inset-x-0 h-[3px] z-[70] bg-gradient-to-r from-skyblue via-teal to-azure"
      style={{ scaleX: scrollYProgress, transformOrigin: '0% 50%' }}
    />
  );
}
