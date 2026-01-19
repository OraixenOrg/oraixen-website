import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from './Button';
import { m, AnimatePresence } from 'framer-motion';
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  useEffect(() => {
    setIsOpen(false);
  }, [location]);
  const navLinks = [{
    name: 'Home',
    href: '/'
  }, {
    name: 'About',
    href: '/about'
  }, {
    name: 'Services',
    href: '/services'
  }, {
    name: 'Projects',
    href: '/projects'
  }, {
    name: 'Process',
    href: '/process'
  }];
  return <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-inkblack/95 backdrop-blur-xl border-b border-white/10 py-3 shadow-lg shadow-black/20' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link to="/" className="z-50 hover:opacity-80 transition-opacity">
          <img src="/logo.svg" alt="Oraixen Logo" className="h-8 md:h-10 scale-[3.6] md:scale-[4.5] pl-[10px] md:pl-[12px]" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-1">
          {navLinks.map(link => <Link key={link.name} to={link.href} className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-lg ${location.pathname === link.href ? 'text-skyblue bg-skyblue/10' : 'text-white/70 hover:text-white hover:bg-white/5'}`}>
              {link.name}
              {location.pathname === link.href && <m.div layoutId="navbar-indicator" className="absolute inset-0 bg-skyblue/10 rounded-lg border border-skyblue/30" transition={{
            type: 'spring',
            bounce: 0.2,
            duration: 0.6
          }} />}
            </Link>)}
          <div className="ml-4">
            <Button href="/contact" variant="primary" size="sm">
              Contact Us
            </Button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white z-50 focus:outline-none p-2 hover:bg-white/10 rounded-lg transition-colors" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Nav Overlay */}
        <AnimatePresence>
          {isOpen && <m.div initial={{
          opacity: 0,
          y: -20
        }} animate={{
          opacity: 1,
          y: 0
        }} exit={{
          opacity: 0,
          y: -20
        }} transition={{
          duration: 0.2
        }} className="fixed inset-0 bg-inkblack z-40 flex flex-col items-center justify-center space-y-8 md:hidden">
              {navLinks.map((link, index) => <m.div key={link.name} initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: index * 0.1
          }}>
                  <Link to={link.href} className={`text-2xl font-semibold transition-colors ${location.pathname === link.href ? 'text-skyblue' : 'text-white/80 hover:text-white'}`}>
                    {link.name}
                  </Link>
                </m.div>)}
              <m.div initial={{
            opacity: 0,
            scale: 0.9
          }} animate={{
            opacity: 1,
            scale: 1
          }} transition={{
            delay: 0.5
          }}>
                <Button href="/contact" variant="primary" size="lg">
                  Contact Us
                </Button>
              </m.div>
            </m.div>}
        </AnimatePresence>
      </div>
    </nav>;
}