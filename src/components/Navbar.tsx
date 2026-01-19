import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from './Button';
import { m, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Projects', href: '/projects' },
  { name: 'Process', href: '/process' },
];

export function Navbar() {
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

  // Optimized toggle - immediate state update
  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };
  
  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-inkblack/95 backdrop-blur-xl border-b border-white/10 py-3 shadow-lg shadow-black/20' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="z-50 hover:opacity-80 transition-opacity">
          <img 
            src="/logo.svg" 
            alt="Oraixen Logo" 
            className="h-9 md:h-10 w-auto object-contain scale-[3.5] md:scale-[4.5] pl-[8px] md:pl-[13px]" 
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navLinks.map(link => (
            <Link 
              key={link.name} 
              to={link.href} 
              className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                location.pathname === link.href 
                  ? 'text-skyblue bg-skyblue/10' 
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.name}
              {location.pathname === link.href && (
                <m.div 
                  layoutId="navbar-indicator" 
                  className="absolute inset-0 bg-skyblue/10 rounded-lg border border-skyblue/30" 
                  transition={{
                    type: 'spring',
                    bounce: 0.2,
                    duration: 0.6
                  }} 
                />
              )}
            </Link>
          ))}
          <div className="ml-4">
            <Button href="/contact" variant="primary" size="sm">
              Contact Us
            </Button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white z-[60] relative focus:outline-none p-2 hover:bg-white/10 active:bg-white/20 rounded-lg transition-colors touch-manipulation" 
          onClick={toggleMenu}
          onTouchStart={(e) => {
            // Prevent double-tap zoom on mobile
            e.currentTarget.style.touchAction = 'manipulation';
          }}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          type="button"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence mode="wait">
          {isOpen && (
            <m.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="fixed inset-0 bg-inkblack z-[55] flex flex-col items-center justify-center space-y-8 md:hidden"
              style={{ willChange: 'opacity' }}
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  closeMenu();
                }
              }}
            >
              {navLinks.map((link, index) => (
                <m.div 
                  key={link.name} 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: index * 0.08, 
                    duration: 0.25,
                    ease: 'easeOut'
                  }}
                  style={{ willChange: 'opacity, transform' }}
                >
                  <Link 
                    to={link.href} 
                    onClick={closeMenu}
                    className={`text-2xl font-semibold transition-colors ${
                      location.pathname === link.href 
                        ? 'text-skyblue' 
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                </m.div>
              ))}
              <m.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  delay: 0.4, 
                  duration: 0.25,
                  ease: 'easeOut'
                }}
                style={{ willChange: 'opacity, transform' }}
                onClick={closeMenu}
              >
                <Button href="/contact" variant="primary" size="lg">
                  Contact Us
                </Button>
              </m.div>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
