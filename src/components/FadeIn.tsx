import React from 'react';
import { m } from 'framer-motion';
import { fadeIn } from '../lib/animations';
interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}
export function FadeIn({
  children,
  delay = 0,
  className = ''
}: FadeInProps) {
  return <m.div initial="hidden" whileInView="visible" viewport={{
    once: true,
    amount: 0.1
  }} variants={{
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        delay: delay
      }
    }
  }} className={className}>
      {children}
    </m.div>;
}