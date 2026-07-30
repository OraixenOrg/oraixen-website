import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { m } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MotionProvider } from './components/MotionProvider';
import { ScrollProgress, GrainOverlay } from './components/visual';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Projects } from './pages/Projects';
import { ProjectDetail } from './pages/ProjectDetail';
import { Process } from './pages/Process';
import { Contact } from './pages/Contact';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { trackPageView } from './lib/analytics';
export function App() {
  const {
    pathname
  } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    trackPageView(pathname);
  }, [pathname]);
  return <MotionProvider>
      <div className="flex flex-col min-h-screen bg-surface text-body font-sans selection:bg-skyblue selection:text-ink">
        <ScrollProgress />
        <GrainOverlay />
        <Navbar />
        <main className="flex-grow">
          <m.div
            key={pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:slug" element={<ProjectDetail />} />
              <Route path="/process" element={<Process />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
            </Routes>
          </m.div>
        </main>
        <Footer />
      </div>
    </MotionProvider>;
}