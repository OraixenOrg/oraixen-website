import { type ReactNode } from 'react';

/** The single, consistent section/hero label pill used everywhere. */
export function Eyebrow({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal/5 text-teal border border-teal/15 text-sm font-semibold tracking-wide ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-teal" />
      {children}
    </span>
  );
}
