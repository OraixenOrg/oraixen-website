import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
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

function isNavActive(href: string, pathname: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const { t } = useTranslation('common');
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    const onResize = () => {
      if (window.matchMedia('(min-width: 768px)').matches) setIsOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKey);

    const body = document.body;
    const html = document.documentElement;
    const scrollY = window.scrollY;

    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';
    body.style.overflow = 'hidden';
    html.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onKey);
      const savedScrollY = Math.abs(parseInt(body.style.top || '0', 10));
      body.style.position = '';
      body.style.top = '';
      body.style.left = '';
      body.style.right = '';
      body.style.width = '';
      body.style.overflow = '';
      html.style.overflow = '';
      requestAnimationFrame(() => {
        window.scrollTo(0, savedScrollY || scrollY);
      });
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-colors duration-200 ${
          scrolled || isOpen
            ? 'bg-surface border-b border-line py-3 shadow-card'
            : 'bg-transparent py-3 md:py-6'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 md:grid md:grid-cols-[1fr_auto_1fr] md:gap-4">
          <Link
            to="/"
            className="shrink-0 justify-self-start hover:opacity-80 transition-opacity"
            aria-label={t('nav.home')}
            onClick={closeMenu}
          >
            <Logo className="h-8 sm:h-9 md:h-10 w-auto text-teal" />
          </Link>

          <nav className="hidden md:flex items-center justify-center gap-1" aria-label={t('a11y.primaryNav')}>
            {navLinks.map((link) => {
              const active = isNavActive(link.href, location.pathname);
              return (
                <Link
                  key={link.key}
                  to={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-full ${
                    active
                      ? 'text-teal'
                      : 'text-ink/60 hover:text-ink hover:bg-surface-subtle'
                  }`}
                >
                  {t(`nav.${link.key}`)}
                  {active && (
                    <span className="absolute inset-0 bg-teal/10 rounded-full border border-teal/25" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center justify-end gap-1.5 sm:gap-2 shrink-0">
            <ThemeSwitcher />
            <LanguageSwitcher />
            <Link
              to="/contact"
              className="shine hidden md:inline-flex ms-1 items-center rounded-full bg-teal text-onaccent text-sm font-semibold px-5 py-2 transition-all duration-300 hover:bg-teal-light active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-teal/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface shadow-[0_4px_14px_rgba(15,94,112,0.20)] hover:shadow-[0_6px_20px_rgba(15,94,112,0.30)]"
            >
              {t('cta.contactUs')}
            </Link>
            <button
              className="md:hidden text-ink p-2 -me-1 hover:bg-surface-subtle active:bg-surface-muted rounded-lg transition-colors touch-manipulation"
              onClick={toggleMenu}
              aria-label={isOpen ? t('a11y.menuClose') : t('a11y.menuOpen')}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              type="button"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <m.div
                id="mobile-menu"
                role="dialog"
                aria-modal="true"
                aria-label={t('a11y.menuLabel')}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="fixed inset-0 z-40 bg-surface md:hidden"
              >
                <nav
                  className="h-full w-full overflow-y-auto flex flex-col items-center justify-center gap-7 px-6 pt-24 pb-10"
                  aria-label={t('a11y.mobileNav')}
                >
                  {navLinks.map((link) => {
                    const active = isNavActive(link.href, location.pathname);
                    return (
                      <Link
                        key={link.key}
                        to={link.href}
                        onClick={closeMenu}
                        aria-current={active ? 'page' : undefined}
                        className={`text-2xl font-semibold py-1 transition-colors ${
                          active ? 'text-teal' : 'text-ink/80 hover:text-ink'
                        }`}
                      >
                        {t(`nav.${link.key}`)}
                      </Link>
                    );
                  })}
                  <Button href="/contact" variant="primary" size="lg" onClick={closeMenu}>
                    {t('cta.contactUs')}
                  </Button>
                </nav>
              </m.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
