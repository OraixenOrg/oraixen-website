import React, { Children } from 'react';
import { m } from 'framer-motion';
import { staggerContainer } from '../lib/animations';
interface StaggerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}
export function Stagger({
  children,
  className = '',
  delay = 0
}: StaggerProps) {
  return <m.div initial="hidden" whileInView="visible" viewport={{
    once: true,
    amount: 0.1
  }} variants={{
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay
      }
    }
  }} className={className}>
      {children}
    </m.div>;
}