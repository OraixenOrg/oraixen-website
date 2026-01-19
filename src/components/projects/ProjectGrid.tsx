import { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
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
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  
  // Dynamically get categories that have projects
  const availableCategories = useMemo(() => {
    const categorySet = new Set(projects.map(p => p.category));
    return ['All', ...Array.from(categorySet).sort()];
  }, [projects]);
  
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
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search projects by name, client, industry, or technology..."
            className="w-full pl-12 pr-12 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-skyblue/50 focus:border-skyblue/50 transition-all"
            aria-label="Search projects"
            autoComplete="off"
          />
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              aria-label="Clear search"
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
              px-6 py-2 rounded-full text-sm font-medium transition-all duration-300
              ${currentFilter === category
                ? 'bg-skyblue text-inkblack shadow-[0_0_15px_rgba(86,201,227,0.3)]'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }
            `}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
            {category !== 'All' && (
              <span className="ml-2 text-xs opacity-75">
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
            className="text-sm text-skyblue hover:text-white hover:underline transition-colors"
          >
            Clear all filters
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
            <h3 className="text-2xl font-bold text-white mb-2">No projects found</h3>
            <p className="text-gray-400 mb-6">
              {searchQuery || currentFilter !== 'All'
                ? 'Try adjusting your search or filter criteria.'
                : 'No projects available at the moment.'}
            </p>
            {(searchQuery || currentFilter !== 'All') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  updateURL('All', 1, '');
                }}
                className="px-6 py-3 bg-skyblue text-inkblack rounded-lg font-medium hover:bg-skyblue/90 transition-colors"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}