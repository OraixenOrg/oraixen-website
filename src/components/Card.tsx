import React, { type ReactNode } from 'react';
interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  interactive?: boolean;
}
export function Card({
  children,
  className = '',
  hover = false,
  interactive = false
}: CardProps) {
  // Only apply hover effects if explicitly set to true OR if interactive is true
  const shouldHover = hover || interactive;
  return <div className={`bg-card border border-line rounded-2xl overflow-hidden shadow-card ${shouldHover ? 'transition-all duration-300 hover:border-teal/40 hover:shadow-hover hover:-translate-y-1' : ''} ${className}`}>
      {children}
    </div>;
}
