import { type ReactNode } from 'react';

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
  return (
    <section
      id={id}
      className={`relative py-16 md:py-24 lg:py-32 w-full overflow-hidden ${dark ? 'bg-surface-subtle' : 'bg-surface'} ${className}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {children}
      </div>
    </section>
  );
}
