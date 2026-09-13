import { Variants } from 'framer-motion';

export const EASE = [0.16, 1, 0.3, 1] as const;
export const DURATION = 0.32;

export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
    y: 8,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION,
      ease: EASE,
    },
  },
};

export const staggerContainer: Variants = {
  hidden: {
    opacity: 1,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0,
    },
  },
};

export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: DURATION,
      ease: EASE,
    },
  },
};

export const slideInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -8,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: DURATION,
      ease: EASE,
    },
  },
};

export const slideInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 8,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: DURATION,
      ease: EASE,
    },
  },
};
