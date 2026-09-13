import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { m } from 'framer-motion';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('projects');

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
      aria-label={t('pagination.navAria')}
    >
      {/* Previous Button */}
      <m.button
        type="button"
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`
          flex items-center justify-center w-10 h-10 rounded-lg border
          transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal/30
          ${
            currentPage === 1
              ? 'bg-surface-subtle text-faint border-line cursor-not-allowed'
              : 'bg-card text-ink border-line hover:border-teal/40 hover:text-teal'
          }
        `}
        aria-label={t('pagination.previousAria')}
        aria-disabled={currentPage === 1}
        whileHover={currentPage > 1 ? { scale: 1.05 } : {}}
        whileTap={currentPage > 1 ? { scale: 0.95 } : {}}
      >
        <ChevronLeft size={18} aria-hidden="true" className="rtl-flip" />
      </m.button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {pageNumbers.map((page, index) => {
          if (page === 'ellipsis-start' || page === 'ellipsis-end') {
            return (
              <div
                key={`ellipsis-${index}`}
                className="flex items-center justify-center w-10 h-10 text-faint"
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
              type="button"
              onClick={() => onPageChange(pageNum)}
              className={`
                flex items-center justify-center min-w-[40px] h-10 px-3 rounded-lg border
                text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal/30
                ${
                  isActive
                    ? 'bg-teal text-onaccent border-teal shadow-glow'
                    : 'bg-card text-body border-line hover:border-teal/40 hover:text-teal'
                }
              `}
              aria-label={isActive ? t('pagination.currentPageAria', { page: pageNum }) : t('pagination.pageAria', { page: pageNum })}
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
        type="button"
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`
          flex items-center justify-center w-10 h-10 rounded-lg border
          transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal/30
          ${
            currentPage === totalPages
              ? 'bg-surface-subtle text-faint border-line cursor-not-allowed'
              : 'bg-card text-ink border-line hover:border-teal/40 hover:text-teal'
          }
        `}
        aria-label={t('pagination.nextAria')}
        aria-disabled={currentPage === totalPages}
        whileHover={currentPage < totalPages ? { scale: 1.05 } : {}}
        whileTap={currentPage < totalPages ? { scale: 0.95 } : {}}
      >
        <ChevronRight size={18} aria-hidden="true" className="rtl-flip" />
      </m.button>

      {/* Page Info */}
      <div className="ms-4 text-sm text-muted hidden sm:block">
        {t('pagination.page')}{' '}
        <span className="text-ink font-semibold">{currentPage}</span> {t('pagination.of')}{' '}
        <span className="text-ink font-semibold">{totalPages}</span>
      </div>
    </nav>
  );
}
