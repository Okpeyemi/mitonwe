import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  prevLabel?: string;
  nextLabel?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
  prevLabel = 'Précédent',
  nextLabel = 'Suivant'
}) => {
  const goToPrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={`flex items-center justify-between w-full bg-primary text-secondary py-2 px-4 ${className}`}>
      <div className="text-sm font-medium">
        Page {currentPage} sur {totalPages}
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={goToPrev}
          disabled={currentPage <= 1}
          className={`px-4 py-2 flex items-center rounded-[5px] cursor-pointer ${
            currentPage <= 1 ? 'bg-inactive text-secondary-foreground cursor-not-allowed' : 'bg-secondary text-primary hover:text-secondary hover:bg-secondary-foreground'
          }`}
        >
          {prevLabel}
        </button>
        <button
          onClick={goToNext}
          disabled={currentPage >= totalPages}
          className={`px-4 py-2 flex items-center rounded-[5px] cursor-pointer ${
            currentPage >= totalPages ? 'bg-inactive text-secondary-foreground cursor-not-allowed' : 'bg-secondary text-primary hover:text-secondary hover:bg-secondary-foreground'
          }`}
        >
          {nextLabel}
        </button>
      </div>
    </div>
  );
};

export default Pagination;