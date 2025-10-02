import { useState, useEffect } from "react";

export default function Pagination({ 
  totalItems, 
  itemsPerPage = 3, 
  currentPage = 1, 
  onPageChange,
  maxVisiblePages = 5 
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
      // Scroll to top of recipe section when changing pages
      window.scrollTo({ top: 600, behavior: 'smooth' });
    }
  };

  const renderPaginationButtons = () => {
    const buttons = [];

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    if (currentPage > 1) {
      buttons.push(
        <button
          key="prev"
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-4 py-2 bg-red-400/20 border border-red-400/30 rounded-lg text-red-300 hover:bg-red-400/30 hover:text-white transition-all duration-300 hover:scale-105 active:scale-95"
        >
          ←
        </button>
      );
    }

    // First page and ellipsis
    if (startPage > 1) {
      buttons.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="px-4 py-2 bg-red-400/20 border border-red-400/30 rounded-lg text-red-300 hover:bg-red-400/30 hover:text-white transition-all duration-300 hover:scale-105 active:scale-95"
        >
          1
        </button>
      );
      if (startPage > 2) {
        buttons.push(
          <span key="ellipsis1" className="px-2 py-2 text-red-300">
            ...
          </span>
        );
      }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-4 py-2 border rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 ${
            currentPage === i
              ? "bg-red-400 border-red-400 text-white shadow-lg shadow-red-400/20 scale-105"
              : "bg-red-400/20 border-red-400/30 text-red-300 hover:bg-red-400/30 hover:text-white"
          }`}
        >
          {i}
        </button>
      );
    }

    // Last page and ellipsis
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(
          <span key="ellipsis2" className="px-2 py-2 text-red-300">
            ...
          </span>
        );
      }
      buttons.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="px-4 py-2 bg-red-400/20 border border-red-400/30 rounded-lg text-red-300 hover:bg-red-400/30 hover:text-white transition-all duration-300 hover:scale-105 active:scale-95"
        >
          {totalPages}
        </button>
      );
    }

    // Next button
    if (currentPage < totalPages) {
      buttons.push(
        <button
          key="next"
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-4 py-2 bg-red-400/20 border border-red-400/30 rounded-lg text-red-300 hover:bg-red-400/30 hover:text-white transition-all duration-300 hover:scale-105 active:scale-95"
        >
          →
        </button>
      );
    }

    return buttons;
  };

  // Don't render pagination if there's only one page
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center py-8 space-y-4">
      {/* Page Info */}
      <div className="text-red-300 text-sm font-medium">
        Halaman {currentPage} dari {totalPages}
      </div>
      
      {/* Pagination Buttons */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {renderPaginationButtons()}
      </div>

      {/* Quick Page Jump */}
      {totalPages > maxVisiblePages && (
        <div className="flex items-center gap-2 text-sm text-red-300">
          <span>Lompat ke halaman:</span>
          <select
            value={currentPage}
            onChange={(e) => handlePageChange(Number(e.target.value))}
            className="bg-red-400/20 border border-red-400/30 rounded-lg px-3 py-1 text-red-300 focus:outline-none focus:border-red-400 transition-all duration-300"
          >
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <option key={page} value={page}>
                {page}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
