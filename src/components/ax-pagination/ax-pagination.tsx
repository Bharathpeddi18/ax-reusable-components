'use client';

import React, { useState } from 'react';
import { AXIcon } from '../../assets/icons';

export interface AXPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  pageSize?: number;
  onPageChange: (page: number) => void;
  size?: 'sm' | 'md' | 'lg';
  showTotal?: boolean;
  showQuickJumper?: boolean;
  siblingCount?: number;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const AXPagination: React.FC<AXPaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  size = 'md',
  showTotal = false,
  showQuickJumper = false,
  siblingCount = 1,
  disabled = false,
  className = '',
  style
}) => {
  const [jumpPage, setJumpPage] = useState('');

  const generatePageNumbers = () => {
    const totalPageNumbers = siblingCount * 2 + 5;

    if (totalPages <= totalPageNumbers) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
      return [...leftRange, 'DOTS', totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = Array.from(
        { length: rightItemCount },
        (_, i) => totalPages - rightItemCount + i + 1
      );
      return [firstPageIndex, 'DOTS', ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i
      );
      return [firstPageIndex, 'DOTS', ...middleRange, 'DOTS', lastPageIndex];
    }

    return [];
  };

  const pages = generatePageNumbers();

  const handleJump = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const pageNum = parseInt(jumpPage, 10);
      if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
        onPageChange(pageNum);
        setJumpPage('');
      }
    }
  };

  return (
    <nav
      className={`ax-pagination ax-pagination-size-${size} ${className}`}
      style={style}
      aria-label="Pagination Navigation"
    >
      {showTotal && totalItems !== undefined && (
        <span className="ax-pagination-total">
          Total {totalItems} items {pageSize && `(${totalPages} pages)`}
        </span>
      )}

      <ul className="ax-pagination-list">
        <li>
          <button
            type="button"
            className="ax-pagination-btn"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={disabled || currentPage <= 1}
            aria-label="Previous page"
          >
            <AXIcon name="chevron-left" size={16} />
          </button>
        </li>

        {pages.map((page, idx) => {
          if (page === 'DOTS') {
            return (
              <li key={`dots-${idx}`} className="ax-pagination-ellipsis">
                &#8230;
              </li>
            );
          }

          const pageNum = page as number;
          const isActive = pageNum === currentPage;

          return (
            <li key={pageNum}>
              <button
                type="button"
                className={`ax-pagination-btn ${isActive ? 'is-active' : ''}`}
                onClick={() => onPageChange(pageNum)}
                disabled={disabled}
                aria-current={isActive ? 'page' : undefined}
              >
                {pageNum}
              </button>
            </li>
          );
        })}

        <li>
          <button
            type="button"
            className="ax-pagination-btn"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={disabled || currentPage >= totalPages}
            aria-label="Next page"
          >
            <AXIcon name="chevron-right" size={16} />
          </button>
        </li>
      </ul>

      {showQuickJumper && (
        <div className="ax-pagination-jumper">
          <span>Go to</span>
          <input
            type="number"
            min={1}
            max={totalPages}
            value={jumpPage}
            onChange={(e) => setJumpPage(e.target.value)}
            onKeyDown={handleJump}
            disabled={disabled}
            placeholder="#"
          />
          <span>page</span>
        </div>
      )}
    </nav>
  );
};
