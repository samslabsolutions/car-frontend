'use client';
import React from 'react';
import {
    ChevronsLeft,
    ChevronsRight,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';

const Pagination = ({ currentPage = 1, totalItems = 0, itemsPerPage = 24, onPageChange }) => {
    if (!totalItems || totalItems <= 0) return null;

    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    const getVisiblePages = () => {
        const pages = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 5; i++) pages.push(i);
            } else if (currentPage >= totalPages - 2) {
                for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
            } else {
                for (let i = currentPage - 2; i <= currentPage + 2; i++) pages.push(i);
            }
        }

        return pages;
    };

    const visiblePages = getVisiblePages();

    const baseBtnClass =
        'w-10 h-10 rounded-md flex items-center justify-center transition-all text-sm font-medium ';

    return (
        <div className="flex flex-col items-center gap-3 py-8">
            <div className="flex items-center gap-2">
                {/* First Page */}
                <button
                    onClick={() => onPageChange(1)}
                    disabled={currentPage === 1}
                    style={{ backgroundColor: '#f5f5f5' }}
                    className={`${baseBtnClass} ${currentPage === 1
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-gray-700 hover:bg-gray-300'
                        }`}
                >
                    <ChevronsLeft size={18} />
                </button>

                {/* Previous */}
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    style={{ backgroundColor: '#f5f5f5' }}
                    className={`${baseBtnClass} ${currentPage === 1
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-gray-700 hover:bg-gray-300'
                        }`}
                >
                    <ChevronLeft size={18} />
                </button>

                {/* Page numbers */}
                {visiblePages.map((page) => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        style={
                            currentPage === page
                                ? {
                                    backgroundColor: '#bfdbfe',
                                    border: '1px solid #155dfc',
                                    color: '#1e40af',
                                }
                                : {}
                        }
                        className={`${baseBtnClass} ${currentPage === page ? 'font-semibold bg-gray-100' : 'text-gray-700 bg-gray-100 border-gray'}`}
                    >
                        {page}
                    </button>
                ))}



                {/* Next */}
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    style={{ backgroundColor: '#f5f5f5' }}
                    className={`${baseBtnClass} ${currentPage === totalPages
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-gray-700 hover:bg-gray-300'
                        }`}
                >
                    <ChevronRight size={18} />
                </button>

                {/* Last Page */}
                <button
                    onClick={() => onPageChange(totalPages)}
                    disabled={currentPage === totalPages}
                    style={{ backgroundColor: '#f5f5f5' }}
                    className={`${baseBtnClass} ${currentPage === totalPages
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-gray-700 hover:bg-gray-300'
                        }`}
                >
                    <ChevronsRight size={18} />
                </button>
            </div>

            <div className="text-sm text-gray-600 font-medium">
                {startItem} to {endItem} of {totalItems.toLocaleString()} Cars
            </div>
        </div>
    );
};

export default Pagination;
