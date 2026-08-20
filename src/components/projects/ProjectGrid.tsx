import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Project } from '../../types/project';
import { ProjectCard } from './ProjectCard';
import { Stagger } from '../Stagger';
import { Pagination } from '../Pagination';
import { Search, X } from 'lucide-react';
import { matchesIndustryKey } from '../../lib/projects';

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
  const skipScrollOnMount = useRef(true);

  const industryItems = t('industries.items', { returnObjects: true }) as Array<{
    key: string;
    name: string;
  }>;

  const availableCategories = useMemo(() => {
    const categorySet = new Set(projects.map(p => p.category));
    return ['All', ...Array.from(categorySet).sort()];
  }, [projects]);

  const categoryLabel = useCallback((category: string) => {
    return t(`filters.${category.toLowerCase()}`, { defaultValue: category });
  }, [t]);

  const currentFilter = searchParams.get('filter') || 'All';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const currentIndustry = searchParams.get('industry') || '';

  const industryLabel = industryItems.find((item) => item.key === currentIndustry)?.name;

  const updateURL = useCallback((filter: string, page: number, search: string, industry = currentIndustry) => {
    const params = new URLSearchParams();
    if (filter !== 'All') params.set('filter', filter);
    if (page > 1) params.set('page', page.toString());
    if (search) params.set('search', search);
    if (industry) params.set('industry', industry);
    setSearchParams(params, { replace: true });
  }, [setSearchParams, currentIndustry]);

  useEffect(() => {
    if (currentFilter !== 'All' && !availableCategories.includes(currentFilter)) {
      updateURL('All', 1, searchQuery, currentIndustry);
    }
  }, [currentFilter, availableCategories, searchQuery, currentIndustry, updateURL]);

  const filteredProjects = useMemo(() => {
    let filtered = projects;

    if (currentFilter !== 'All') {
      filtered = filtered.filter(p => p.category === currentFilter);
    }

    if (currentIndustry) {
      filtered = filtered.filter(p => matchesIndustryKey(p, currentIndustry));
    }

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
  }, [projects, currentFilter, currentIndustry, searchQuery]);

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProjects = filteredProjects.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      updateURL(currentFilter, 1, searchQuery, currentIndustry);
    }
  }, [currentFilter, searchQuery, currentIndustry, totalPages, currentPage, updateURL]);

  useEffect(() => {
    if (skipScrollOnMount.current) {
      skipScrollOnMount.current = false;
      return;
    }
    document.getElementById('project-grid')?.scrollIntoView({ block: 'start' });
  }, [currentPage, currentFilter, currentIndustry]);

  const handleFilterChange = (filter: string) => {
    updateURL(filter, 1, searchQuery, currentIndustry);
  };

  const handlePageChange = (page: number) => {
    updateURL(currentFilter, page, searchQuery, currentIndustry);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    updateURL(currentFilter, 1, value, currentIndustry);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    updateURL(currentFilter, 1, '', currentIndustry);
  };

  const handleClearAll = () => {
    setSearchQuery('');
    updateURL('All', 1, '', '');
  };

  const hasActiveFilters = currentFilter !== 'All' || Boolean(searchQuery) || Boolean(currentIndustry);

  return (
    <div id="project-grid" className="space-y-12 scroll-mt-24">
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute start-4 top-1/2 -translate-y-1/2 text-faint" size={20} />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder={t('search.placeholder')}
            className="w-full ps-12 pe-12 py-4 bg-card border border-line rounded-xl text-ink placeholder:text-faint focus:outline-none focus-visible:border-teal focus-visible:ring-2 focus-visible:ring-teal/20 transition-all"
            aria-label={t('search.ariaLabel')}
            autoComplete="off"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="absolute end-4 top-1/2 -translate-y-1/2 text-faint hover:text-teal transition-colors"
              aria-label={t('search.clearAria')}
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2 md:gap-4">
        {availableCategories.map(category => (
          <button
            key={category}
            type="button"
            onClick={() => handleFilterChange(category)}
            aria-pressed={currentFilter === category}
            className={`
              px-6 py-2 rounded-full text-sm font-semibold transition-colors duration-200 border
              ${currentFilter === category
                ? 'bg-teal text-onaccent border-teal shadow-glow'
                : 'bg-card text-body border-line hover:border-teal/40 hover:text-teal'
              }
            `}
          >
            {categoryLabel(category)}
            {category !== 'All' && (
              <span className="ms-2 text-xs opacity-75">
                ({projects.filter(p => p.category === category).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {hasActiveFilters && filteredProjects.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-3">
          {industryLabel && (
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium bg-teal/10 text-teal border border-teal/20">
              {industryLabel}
            </span>
          )}
          <button
            type="button"
            onClick={handleClearAll}
            className="text-sm text-teal hover:text-teal-light hover:underline transition-colors"
          >
            {t('filters.clearAll')}
          </button>
        </div>
      )}

      {paginatedProjects.length > 0 ? (
        <>
          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </Stagger>

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
            <h3 className="text-2xl font-bold text-ink mb-2">{t('empty.title')}</h3>
            <p className="text-body mb-6">
              {hasActiveFilters ? t('empty.withFilters') : t('empty.noProjects')}
            </p>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleClearAll}
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
