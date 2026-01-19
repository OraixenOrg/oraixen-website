import { useState, useEffect } from 'react';
import { Section } from '../components/Section';
import { FadeIn } from '../components/FadeIn';
import { ProjectGrid } from '../components/projects/ProjectGrid';
import { projects } from '../lib/projects';
import { Loader2 } from 'lucide-react';

export function Projects() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for better UX (remove if data is already loaded)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);


  return (
    <div className="pt-20 min-h-screen bg-inkblack">
      <Section>
        <div className="text-center max-w-3xl mx-auto mb-20">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-skyblue/10 border border-skyblue/20 mb-8 backdrop-blur-sm">
              <span className="text-sm font-medium text-skyblue">
                Portfolio
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              Our Work
            </h1>
            <p className="text-xl md:text-2xl text-gray-400">
              A showcase of premium digital products, from enterprise platforms
              to consumer mobile apps.
            </p>
          </FadeIn>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="w-12 h-12 text-skyblue animate-spin mx-auto mb-4" />
              <p className="text-gray-400">Loading projects...</p>
            </div>
          </div>
        ) : (
          <ProjectGrid projects={projects} itemsPerPage={9} />
        )}
      </Section>
    </div>
  );
}