import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MotionProvider } from './components/MotionProvider';
import { ScrollProgress } from './components/visual';
import { Home } from './pages/Home';
import { startScrollDepthTracking, trackPageView } from './lib/analytics';
import { applyLocalePrefix, parseMarketFromPath } from './lib/marketLocale';

// Market for this page load; the basename cannot change without a full reload.
const ACTIVE_MARKET = parseMarketFromPath(window.location.pathname);

const About = lazy(() => import('./pages/About').then((m) => ({ default: m.About })));
const Services = lazy(() => import('./pages/Services').then((m) => ({ default: m.Services })));
const Projects = lazy(() => import('./pages/Projects').then((m) => ({ default: m.Projects })));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail').then((m) => ({ default: m.ProjectDetail })));
const Process = lazy(() => import('./pages/Process').then((m) => ({ default: m.Process })));
const Contact = lazy(() => import('./pages/Contact').then((m) => ({ default: m.Contact })));
const SolutionCustomSystems = lazy(() =>
  import('./pages/SolutionCustomSystems').then((m) => ({ default: m.SolutionCustomSystems }))
);
const SolutionRealEstateSystems = lazy(() =>
  import('./pages/SolutionRealEstateSystems').then((m) => ({ default: m.SolutionRealEstateSystems }))
);
const Privacy = lazy(() => import('./pages/Privacy').then((m) => ({ default: m.Privacy })));
const Terms = lazy(() => import('./pages/Terms').then((m) => ({ default: m.Terms })));
const NotFound = lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFound })));

function PageFallback() {
  const { t } = useTranslation('common');
  return (
    <div className="min-h-[70vh] flex items-center justify-center" role="status" aria-live="polite">
      <span className="sr-only">{t('a11y.loading')}</span>
      <div className="h-8 w-8 rounded-full border-2 border-line border-t-teal animate-spin" aria-hidden="true" />
    </div>
  );
}

export function App() {
  const { pathname } = useLocation();
  const { t } = useTranslation('common');

  // useLocation() strips the router basename, so re-apply the market prefix to
  // report the PUBLIC path (/en/about, /ar-eg/about, /ar-sa/about) to GA4.
  const publicPath = ACTIVE_MARKET ? applyLocalePrefix(pathname, ACTIVE_MARKET) : pathname;

  useEffect(() => {
    window.scrollTo(0, 0);
    trackPageView(publicPath);
    // Fresh scroll-depth milestones per route visit; the cleanup removes the
    // listener on navigation and on StrictMode's extra mount.
    return startScrollDepthTracking(publicPath);
  }, [publicPath]);

  return (
    <MotionProvider>
      <div className="flex flex-col min-h-screen bg-surface text-body font-sans selection:bg-skyblue selection:text-ink">
        <a href="#main-content" className="skip-link">
          {t('a11y.skipToContent')}
        </a>
        <ScrollProgress />
        <Navbar />
        <main id="main-content" tabIndex={-1} className="flex-grow outline-none">
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:slug" element={<ProjectDetail />} />
              <Route path="/process" element={<Process />} />
              <Route path="/contact" element={<Contact />} />
              <Route
                path="/solutions/custom-business-systems"
                element={<SolutionCustomSystems />}
              />
              <Route
                path="/solutions/real-estate-systems"
                element={<SolutionRealEstateSystems />}
              />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </MotionProvider>
  );
}
