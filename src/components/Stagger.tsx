import { type ReactNode } from 'react';

interface StaggerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/** Layout wrapper. Children render immediately — no stagger delay. */
export function Stagger({
  children,
  className = '',
}: StaggerProps) {
  return <div className={className}>{children}</div>;
}
