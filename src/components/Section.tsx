import React from 'react';
import { m } from 'framer-motion';
import { fadeIn } from '../lib/animations';
interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  dark?: boolean;
}
export function Section({
  children,
  className = '',
  id,
  dark = false
}: SectionProps) {
  return <section id={id} className={`relative py-16 md:py-24 lg:py-32 w-full overflow-hidden ${dark ? 'bg-surface-subtle' : 'bg-surface'} ${className}`}>
      {/* Background Elements could go here */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <m.div initial="hidden" whileInView="visible" viewport={{
        once: true,
        amount: 0.1
      }} variants={fadeIn}>
          {children}
        </m.div>
      </div>
    </section>;
}