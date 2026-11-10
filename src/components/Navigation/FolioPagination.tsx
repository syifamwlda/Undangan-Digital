import React from 'react';
import { ChevronLeft, ChevronRight, BookOpen, Scroll, Sparkles } from 'lucide-react';

interface FolioPaginationProps {
  currentPage: number;
  totalPages: number;
  pageTitles: string[];
  viewMode: 'pages' | 'scroll';
  onPageChange: (page: number) => void;
  onToggleViewMode: () => void;
}

export const FolioPagination: React.FC<FolioPaginationProps> = ({
  currentPage,
  totalPages,
  pageTitles,
  viewMode,
  onPageChange,
  onToggleViewMode,
}) => {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[94vw] max-w-lg select-none">
      <div className="p-2 sm:p-2.5 rounded-full backdrop-blur-2xl bg-obsidian/92 border border-gold-champagne/50 shadow-2xl flex items-center justify-between text-ivory-warm">
        
        {/* Toggle Mode Button (Page View vs Scroll View) */}
        <button
          onClick={onToggleViewMode}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gold-antique/30 hover:border-gold-champagne bg-burgundy-deep/40 text-[9px] sm:text-[10px] tracking-wider uppercase font-cinzel text-gold-champagne transition-all"
          title={viewMode === 'pages' ? 'Switch to Continuous Scroll View' : 'Switch to Royal Page-by-Page View'}
        >
          {viewMode === 'pages' ? (
            <>
              <Scroll className="w-3 h-3 text-gold-champagne" />
              <span className="hidden sm:inline">Scroll Mode</span>
            </>
          ) : (
            <>
              <BookOpen className="w-3 h-3 text-gold-champagne" />
              <span className="hidden sm:inline">Page Mode</span>
            </>
          )}
        </button>

        {viewMode === 'pages' ? (
          <>
            {/* Prev Page Button */}
            <button
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-1.5 sm:p-2 rounded-full text-gold-champagne hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous Page"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Page Title & Counter */}
            <div className="text-center px-1">
              <span className="block text-[8px] sm:text-[9px] uppercase tracking-[0.25em] font-cinzel text-gold-champagne font-bold">
                Page {currentPage} of {totalPages}
              </span>
              <span className="block font-italiana text-xs sm:text-sm text-[#FAF6EE] truncate max-w-[130px] sm:max-w-[180px]">
                {pageTitles[currentPage - 1]}
              </span>
            </div>

            {/* Next Page Button */}
            <button
              onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 sm:p-2 rounded-full text-gold-champagne hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Next Page"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </>
        ) : (
          <div className="flex-1 text-center px-3">
            <span className="text-[10px] sm:text-[11px] font-cinzel tracking-widest uppercase text-gold-light">
              Continuous Scroll Active
            </span>
          </div>
        )}

      </div>
    </div>
  );
};

