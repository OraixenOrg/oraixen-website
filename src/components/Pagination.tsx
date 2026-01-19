import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { m } from 'framer-motion';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = ''
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 7;
    
    if (totalPages <= maxVisible) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      if (currentPage > 3) {
        pages.push('ellipsis-start');
      }
      
      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        pages.push('ellipsis-end');
      }
      
      // Always show last page
      pages.push(totalPages);
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <nav
      className={`flex items-center justify-center gap-2 ${className}`}
      aria-label="Pagination"
    >
      {/* Previous Button */}
      <m.button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`
          flex items-center justify-center w-10 h-10 rounded-lg
          transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-skyblue/50
          ${
            currentPage === 1
              ? 'bg-white/5 text-gray-600 cursor-not-allowed'
              : 'bg-white/5 text-white hover:bg-skyblue/20 hover:text-skyblue border border-white/10 hover:border-skyblue/30'
          }
        `}
        aria-label="Previous page"
        aria-disabled={currentPage === 1}
        whileHover={currentPage > 1 ? { scale: 1.05 } : {}}
        whileTap={currentPage > 1 ? { scale: 0.95 } : {}}
      >
        <ChevronLeft size={18} aria-hidden="true" />
      </m.button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {pageNumbers.map((page, index) => {
          if (page === 'ellipsis-start' || page === 'ellipsis-end') {
            return (
              <div
                key={`ellipsis-${index}`}
                className="flex items-center justify-center w-10 h-10 text-gray-500"
              >
                <MoreHorizontal size={16} />
              </div>
            );
          }

          const pageNum = page as number;
          const isActive = pageNum === currentPage;

          return (
            <m.button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`
                flex items-center justify-center min-w-[40px] h-10 px-3 rounded-lg
                text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-skyblue/50
                ${
                  isActive
                    ? 'bg-skyblue text-inkblack shadow-[0_0_15px_rgba(86,201,227,0.4)] border border-skyblue/50'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10 hover:border-skyblue/30'
                }
              `}
              aria-label={`Page ${pageNum}${isActive ? ', current page' : ''}`}
              aria-current={isActive ? 'page' : undefined}
              whileHover={!isActive ? { scale: 1.05, y: -2 } : {}}
              whileTap={{ scale: 0.95 }}
            >
              {pageNum}
            </m.button>
          );
        })}
      </div>

      {/* Next Button */}
      <m.button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`
          flex items-center justify-center w-10 h-10 rounded-lg
          transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-skyblue/50
          ${
            currentPage === totalPages
              ? 'bg-white/5 text-gray-600 cursor-not-allowed'
              : 'bg-white/5 text-white hover:bg-skyblue/20 hover:text-skyblue border border-white/10 hover:border-skyblue/30'
          }
        `}
        aria-label="Next page"
        aria-disabled={currentPage === totalPages}
        whileHover={currentPage < totalPages ? { scale: 1.05 } : {}}
        whileTap={currentPage < totalPages ? { scale: 0.95 } : {}}
      >
        <ChevronRight size={18} aria-hidden="true" />
      </m.button>

      {/* Page Info */}
      <div className="ml-4 text-sm text-gray-500 hidden sm:block">
        Page <span className="text-white font-medium">{currentPage}</span> of{' '}
        <span className="text-white font-medium">{totalPages}</span>
      </div>
    </nav>
  );
}
