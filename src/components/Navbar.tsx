import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from './Button';
import { Logo } from './Logo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeSwitcher } from './ThemeSwitcher';
import { m, AnimatePresence } from 'framer-motion';

const navLinks = [
  { key: 'home', href: '/' },
  { key: 'about', href: '/about' },
  { key: 'services', href: '/services' },
  { key: 'projects', href: '/projects' },
  { key: 'process', href: '/process' },
];

export function Navbar() {
  const { t } = useTranslation('common');
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Optimized scroll lock - instant, no delay
  useEffect(() => {
    if (!isOpen) return;

    const body = document.body;
    const html = document.documentElement;

    // Get scroll position immediately before any changes
    const scrollY = window.scrollY;

    // Apply lock instantly (synchronous for immediate effect)
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';
    body.style.overflow = 'hidden';
    html.style.overflow = 'hidden';

    return () => {
      // Restore scroll position
      const savedScrollY = Math.abs(parseInt(body.style.top || '0', 10));
      body.style.position = '';
      body.style.top = '';
      body.style.left = '';
      body.style.right = '';
      body.style.width = '';
      body.style.overflow = '';
      html.style.overflow = '';

      // Restore scroll position on next frame to avoid layout shift
      requestAnimationFrame(() => {
        window.scrollTo(0, savedScrollY || scrollY);
      });
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(prev => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-surface/95 backdrop-blur-xl border-b border-line py-3 shadow-card'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="z-50 hover:opacity-80 transition-opacity" aria-label={t('nav.home')}>
          <Logo className="h-7 md:h-8 w-auto text-teal" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <Link
              key={link.key}
              to={link.href}
              className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-full ${
                location.pathname === link.href
                  ? 'text-teal'
                  : 'text-ink/60 hover:text-ink hover:bg-surface-subtle'
              }`}
            >
              {t(`nav.${link.key}`)}
              {location.pathname === link.href && (
                <m.div
                  layoutId="navbar-indicator"
                  className="absolute inset-0 bg-teal/10 rounded-full border border-teal/25"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Link>
          ))}
          <div className="ms-3 flex items-center gap-2">
            <ThemeSwitcher />
            <LanguageSwitcher />
            {/* Refined pill CTA — matches the round switchers; soft brand shadow instead of a heavy glow */}
            <Link
              to="/contact"
              className="shine ms-1 inline-flex items-center rounded-full bg-teal text-onaccent text-sm font-semibold px-5 py-2 transition-all duration-300 hover:bg-teal-light active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-teal/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface shadow-[0_4px_14px_rgba(15,94,112,0.20)] hover:shadow-[0_6px_20px_rgba(15,94,112,0.30)]"
            >
              {t('cta.contactUs')}
            </Link>
          </div>
        </div>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-2 z-[60]">
          <ThemeSwitcher />
          <LanguageSwitcher />
          <button
            className="text-ink relative focus:outline-none p-2 hover:bg-surface-subtle active:bg-surface-muted rounded-lg transition-colors touch-manipulation"
            onClick={toggleMenu}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            type="button"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence mode="wait">
          {isOpen && (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="fixed inset-0 bg-surface z-[55] flex flex-col items-center justify-center space-y-8 md:hidden"
              style={{ willChange: 'opacity' }}
              onClick={(e) => {
                if (e.target === e.currentTarget) closeMenu();
              }}
            >
              {navLinks.map((link, index) => (
                <m.div
                  key={link.key}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.25, ease: 'easeOut' }}
                  style={{ willChange: 'opacity, transform' }}
                >
                  <Link
                    to={link.href}
                    onClick={closeMenu}
                    className={`text-2xl font-semibold transition-colors ${
                      location.pathname === link.href ? 'text-teal' : 'text-ink/80 hover:text-ink'
                    }`}
                  >
                    {t(`nav.${link.key}`)}
                  </Link>
                </m.div>
              ))}
              <m.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.25, ease: 'easeOut' }}
                style={{ willChange: 'opacity, transform' }}
                onClick={closeMenu}
              >
                <Button href="/contact" variant="primary" size="lg">
                  {t('cta.contactUs')}
                </Button>
              </m.div>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
