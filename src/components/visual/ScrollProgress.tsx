import { m, useScroll } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export function ScrollProgress() {
  const { i18n } = useTranslation();
  const { scrollYProgress } = useScroll();
  const isRtl = i18n.dir() === 'rtl';

  return (
    <m.div
      aria-hidden="true"
      className="fixed top-0 inset-x-0 h-[3px] z-[48] bg-gradient-to-r from-skyblue via-teal to-azure"
      style={{ scaleX: scrollYProgress, transformOrigin: isRtl ? '100% 50%' : '0% 50%' }}
    />
  );
}
