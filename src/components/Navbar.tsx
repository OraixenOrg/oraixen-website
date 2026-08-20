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
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
        scrolled
          ? 'bg-surface/95 backdrop-blur-md border-b border-line py-3 shadow-card'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-[1fr_auto_1fr] items-center">
        {/* Logo */}
        <Link to="/" className="z-50 justify-self-start hover:opacity-80 transition-opacity" aria-label={t('nav.home')}>
          <Logo className="h-7 md:h-8 w-auto text-teal" />
        </Link>

        {/* Desktop Navigation — centered */}
        <div className="hidden md:flex items-center justify-center gap-1">
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
                <span className="absolute inset-0 bg-teal/10 rounded-full border border-teal/25" />
              )}
            </Link>
          ))}
        </div>

        {/* Right actions */}
        <div className="justify-self-end flex items-center gap-2 z-[60]">
          <div className="hidden md:flex items-center gap-2">
            <ThemeSwitcher />
            <LanguageSwitcher />
            <Link
              to="/contact"
              className="shine ms-1 inline-flex items-center rounded-full bg-teal text-onaccent text-sm font-semibold px-5 py-2 transition-all duration-300 hover:bg-teal-light active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-teal/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface shadow-[0_4px_14px_rgba(15,94,112,0.20)] hover:shadow-[0_6px_20px_rgba(15,94,112,0.30)]"
            >
              {t('cta.contactUs')}
            </Link>
          </div>
          <div className="md:hidden flex items-center gap-2">
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
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
          {isOpen && (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.12 }}
              className="fixed inset-0 bg-surface z-[55] flex flex-col items-center justify-center space-y-8 md:hidden"
              onClick={(e) => {
                if (e.target === e.currentTarget) closeMenu();
              }}
            >
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  to={link.href}
                  onClick={closeMenu}
                  className={`text-2xl font-semibold transition-colors ${
                    location.pathname === link.href ? 'text-teal' : 'text-ink/80 hover:text-ink'
                  }`}
                >
                  {t(`nav.${link.key}`)}
                </Link>
              ))}
              <div onClick={closeMenu}>
                <Button href="/contact" variant="primary" size="lg">
                  {t('cta.contactUs')}
                </Button>
              </div>
            </m.div>
          )}
        </AnimatePresence>
    </nav>
  );
}
