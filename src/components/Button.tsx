import { type ReactNode, type ButtonHTMLAttributes, type MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  icon?: boolean;
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  icon = false,
  className = '',
  children,
  onClick,
  type = 'button',
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:opacity-50 disabled:cursor-not-allowed active:scale-95';
  const variants = {
    primary: 'shine bg-teal text-onaccent hover:bg-teal-light shadow-glow hover:shadow-[0_0_30px_rgba(86,201,227,0.45)]',
    secondary: 'bg-card text-teal border border-teal/50 hover:bg-surface-subtle hover:border-teal',
    outline: 'border border-teal/40 text-teal hover:bg-teal/5 hover:border-teal',
    text: 'text-teal hover:text-teal-light p-0 bg-transparent underline-offset-4 hover:underline'
  };
  const sizes = {
    sm: 'text-sm px-5 py-2.5 rounded-lg',
    md: 'text-base px-7 py-3.5 rounded-xl',
    lg: 'text-lg px-9 py-4 rounded-xl'
  };
  const classes = `${baseStyles} ${variants[variant]} ${variant !== 'text' ? sizes[size] : ''} ${className}`;
  const content = <>
      {children}
      {icon && <ArrowRight className="ms-2 h-4 w-4 transition-transform group-hover:translate-x-1 rtl-flip" />}
    </>;
  if (href) {
    return (
      <Link
        to={href}
        className={`${classes} group`}
        onClick={onClick as MouseEventHandler<HTMLAnchorElement> | undefined}
      >
        {content}
      </Link>
    );
  }
  return (
    <button type={type} className={`${classes} group`} onClick={onClick} {...props}>
      {content}
    </button>
  );
}
