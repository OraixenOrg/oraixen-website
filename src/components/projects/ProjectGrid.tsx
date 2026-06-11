import { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Project } from '../../types/project';
import { ProjectCard } from './ProjectCard';
import { Stagger } from '../Stagger';
import { Pagination } from '../Pagination';
import { Search, X } from 'lucide-react';
import { m, AnimatePresence } from 'framer-motion';

interface ProjectGridProps {
  projects: Project[];
  itemsPerPage?: number;
}

export function ProjectGrid({
  projects,
  itemsPerPage = 9
}: ProjectGridProps) {
  const { t } = useTranslation('projects');
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

  // Dynamically get categories that have projects
  const availableCategories = useMemo(() => {
    const categorySet = new Set(projects.map(p => p.category));
    return ['All', ...Array.from(categorySet).sort()];
  }, [projects]);

  // Localized label for a category value coming from the data ('All' | 'Web' | 'Mobile' | 'Platform')
  const categoryLabel = useCallback((category: string) => {
    return t(`filters.${category.toLowerCase()}`, { defaultValue: category });
  }, [t]);

  const currentFilter = searchParams.get('filter') || 'All';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  // Update URL when filter or page changes
  const updateURL = useCallback((filter: string, page: number, search: string) => {
    const params = new URLSearchParams();
    if (filter !== 'All') params.set('filter', filter);
    if (page > 1) params.set('page', page.toString());
    if (search) params.set('search', search);
    setSearchParams(params, { replace: true });
  }, [setSearchParams]);

  // Validate current filter - reset to All if invalid
  useEffect(() => {
    if (currentFilter !== 'All' && !availableCategories.includes(currentFilter)) {
      const params = new URLSearchParams();
      if (searchQuery) params.set('search', searchQuery);
      setSearchParams(params, { replace: true });
    }
  }, [currentFilter, availableCategories, searchQuery, setSearchParams]);

  // Filter and search projects
  const filteredProjects = useMemo(() => {
    let filtered = projects;

    // Apply category filter
    if (currentFilter !== 'All') {
      filtered = filtered.filter(p => p.category === currentFilter);
    }

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        p =>
          p.title.toLowerCase().includes(query) ||
          p.client.toLowerCase().includes(query) ||
          p.industry.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.techStack.some(tech => tech.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [projects, currentFilter, searchQuery]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProjects = filteredProjects.slice(startIndex, endIndex);

  // Reset to page 1 when filter or search changes
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      updateURL(currentFilter, 1, searchQuery);
    }
  }, [currentFilter, searchQuery, totalPages, currentPage, updateURL]);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, currentFilter, searchQuery]);

  const handleFilterChange = (filter: string) => {
    updateURL(filter, 1, searchQuery);
  };

  const handlePageChange = (page: number) => {
    updateURL(currentFilter, page, searchQuery);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    updateURL(currentFilter, 1, value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    updateURL(currentFilter, 1, '');
  };

  return (
    <div className="space-y-12">
      {/* Search Bar */}
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute start-4 top-1/2 -translate-y-1/2 text-faint" size={20} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder={t('search.placeholder')}
            className="w-full ps-12 pe-12 py-4 bg-card border border-line rounded-xl text-ink placeholder:text-faint focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all"
            aria-label={t('search.ariaLabel')}
            autoComplete="off"
          />
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="absolute end-4 top-1/2 -translate-y-1/2 text-faint hover:text-teal transition-colors"
              aria-label={t('search.clearAria')}
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-4">
        {availableCategories.map(category => (
          <m.button
            key={category}
            onClick={() => handleFilterChange(category)}
            className={`
              px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 border
              ${currentFilter === category
                ? 'bg-teal text-onaccent border-teal shadow-glow'
                : 'bg-card text-body border-line hover:border-teal/40 hover:text-teal'
              }
            `}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            {categoryLabel(category)}
            {category !== 'All' && (
              <span className="ms-2 text-xs opacity-75">
                ({projects.filter(p => p.category === category).length})
              </span>
            )}
          </m.button>
        ))}
      </div>

      {/* Clear Filters Button (only show when filters are active) */}
      {(currentFilter !== 'All' || searchQuery) && filteredProjects.length > 0 && (
        <div className="text-center">
          <button
            onClick={() => {
              setSearchQuery('');
              updateURL('All', 1, '');
            }}
            className="text-sm text-teal hover:text-teal-light hover:underline transition-colors"
          >
            {t('filters.clearAll')}
          </button>
        </div>
      )}

      {/* Grid */}
      {paginatedProjects.length > 0 ? (
        <>
          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {paginatedProjects.map(project => (
                <m.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProjectCard project={project} />
                </m.div>
              ))}
            </AnimatePresence>
          </Stagger>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              className="mt-12"
            />
          )}
        </>
      ) : (
        <div className="text-center py-20">
          <div className="max-w-md mx-auto">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-ink mb-2">{t('empty.title')}</h3>
            <p className="text-body mb-6">
              {searchQuery || currentFilter !== 'All'
                ? t('empty.withFilters')
                : t('empty.noProjects')}
            </p>
            {(searchQuery || currentFilter !== 'All') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  updateURL('All', 1, '');
                }}
                className="px-6 py-3 bg-teal text-onaccent rounded-lg font-semibold hover:bg-teal-light transition-colors"
              >
                {t('filters.clearAll')}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
