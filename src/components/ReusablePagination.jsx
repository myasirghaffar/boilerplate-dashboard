import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ReusablePagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  totalItems = 0,
  itemsPerPage = 10,
  showPageInfo = false,
}) => {
  const getVisiblePages = () => {
    const delta = 2; // Number of pages to show on each side of current page
    const range = [];
    const rangeWithDots = [];

    // Always show first page
    rangeWithDots.push(1);

    // Calculate range around current page
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    // Add dots before range if there's a gap
    if (currentPage - delta > 2) {
      rangeWithDots.push("...");
    }

    // Add the range
    rangeWithDots.push(...range);

    // Add dots after range if there's a gap
    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...");
    }

    // Always show last page if there's more than one page
    if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  // Always render pagination, even with one page
  // Ensure we have valid values
  const safeCurrentPage = Math.max(1, currentPage);
  const safeTotalPages = Math.max(1, totalPages);

  return (
    <div className="flex items-center justify-center p-3 lg:p-6 bg-[#171D41] rounded-lg">
      {/* Pagination Controls - Responsive Layout */}
      <div className="flex flex-col lg:flex-row justify-between items-center w-full gap-3 lg:gap-6">
        {/* Previous Button */}
        <button
          onClick={() => handlePageChange(safeCurrentPage - 1)}
          disabled={safeCurrentPage === 1}
          className={`flex items-center gap-1 lg:gap-2 px-3 lg:px-6 py-2 lg:py-3 rounded-full text-xs lg:text-sm font-medium transition-all duration-200 w-full lg:w-auto justify-center ${
            safeCurrentPage === 1
              ? "bg-[#2A2A3E] text-[#AEB9E1] cursor-not-allowed opacity-50"
              : "bg-gradient-to-r from-[#9945FF] to-[#14F195] text-white hover:shadow-lg hover:scale-105 active:scale-95"
          }`}
        >
          <ChevronLeft className="w-3 h-3 lg:w-4 lg:h-4" />
          <span className="font-medium">Previous</span>
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1 lg:gap-2 order-first lg:order-none">
          {getVisiblePages().map((page, index) => (
            <React.Fragment key={index}>
              {page === "..." ? (
                <span className="px-2 lg:px-3 py-1 lg:py-2 text-[#AEB9E1] font-medium text-sm lg:text-lg">
                  ...
                </span>
              ) : (
                <button
                  onClick={() => handlePageChange(page)}
                  className={`px-3 lg:px-4 py-1 lg:py-2 rounded-full text-xs lg:text-sm font-medium transition-all duration-200 min-w-[36px] lg:min-w-[44px] h-[36px] lg:h-[44px] flex items-center justify-center ${
                    safeCurrentPage === page
                      ? "bg-gradient-to-r from-[#9945FF] to-[#14F195] text-white shadow-lg"
                      : "text-white hover:bg-[#2A2A3E] hover:text-white active:scale-95"
                  }`}
                >
                  {page}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={() => handlePageChange(safeCurrentPage + 1)}
          disabled={safeCurrentPage === safeTotalPages}
          className={`flex items-center gap-1 lg:gap-2 px-3 lg:px-6 py-2 lg:py-3 rounded-full text-xs lg:text-sm font-medium transition-all duration-200 w-full lg:w-auto justify-center ${
            safeCurrentPage === safeTotalPages
              ? "bg-[#2A2A3E] text-[#AEB9E1] cursor-not-allowed opacity-50"
              : "bg-gradient-to-r from-[#9945FF] to-[#14F195] text-white hover:shadow-lg hover:scale-105 active:scale-95"
          }`}
        >
          <span className="font-medium">Next</span>
          <ChevronRight className="w-3 h-3 lg:w-4 lg:h-4" />
        </button>
      </div>
    </div>
  );
};

export default ReusablePagination;
