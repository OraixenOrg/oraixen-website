import React from 'react';
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
  return <div className={`bg-white/5 border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm ${shouldHover ? 'transition-all duration-300 hover:border-skyblue/50 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(86,201,227,0.15)] hover:-translate-y-1' : ''} ${className}`}>
      {children}
    </div>;
}