'use client';

import React, { useState, useRef, useEffect, useId, forwardRef } from 'react';

/* ==========================================================================
   AstraX (AX) Dropdown Component - 10/10 Action Context Menu
   ========================================================================== */

export interface AXDropdownItemProps {
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  shortcut?: string;
  danger?: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  children: React.ReactNode;
  className?: string;
}

export const AXDropdownItem: React.FC<AXDropdownItemProps> = ({
  icon,
  badge,
  shortcut,
  danger = false,
  disabled = false,
  onClick,
  children,
  className = '',
}) => {
  return (
    <button
      type="button"
      role="menuitem"
      disabled={disabled}
      onClick={(e) => {
        if (!disabled) onClick?.(e);
      }}
      className={`ax-dropdown-item ${danger ? 'ax-dropdown-item-danger' : ''} ${
        disabled ? 'ax-dropdown-item-disabled' : ''
      } ${className}`.trim()}
    >
      {icon && <span className="ax-dropdown-item-icon">{icon}</span>}
      <span className="ax-dropdown-item-label">{children}</span>
      {badge && <span className="ax-dropdown-item-badge">{badge}</span>}
      {shortcut && <span className="ax-dropdown-item-shortcut">{shortcut}</span>}
    </button>
  );
};

export const AXDropdownDivider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div role="separator" className={`ax-dropdown-divider ${className}`.trim()} />
);

export const AXDropdownHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <div className={`ax-dropdown-header ${className}`.trim()}>{children}</div>
);

export interface AXDropdownProps {
  trigger: React.ReactNode;
  align?: 'left' | 'right';
  placement?: 'bottom' | 'top';
  width?: string;
  children: React.ReactNode;
  className?: string;
}

export const AXDropdown = forwardRef<HTMLDivElement, AXDropdownProps>(
  (
    {
      trigger,
      align = 'left',
      placement = 'bottom',
      width = '220px',
      children,
      className = '',
    },
    ref
  ) => {
    const dropdownId = useId();
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Outside click listener
    useEffect(() => {
      if (!isOpen) return;

      const handleClickOutside = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    // Close on escape
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    return (
      <div
        ref={(node) => {
          containerRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={`ax-dropdown-container ${className}`.trim()}
        onKeyDown={handleKeyDown}
      >
        <div
          role="button"
          tabIndex={0}
          onClick={() => setIsOpen((prev) => !prev)}
          className="ax-dropdown-trigger-wrapper"
        >
          {trigger}
        </div>

        {isOpen && (
          <div
            id={dropdownId}
            role="menu"
            style={{ width }}
            onClick={() => setIsOpen(false)}
            className={`ax-dropdown-menu ax-dropdown-align-${align} ax-dropdown-placement-${placement}`}
          >
            {children}
          </div>
        )}
      </div>
    );
  }
);

AXDropdown.displayName = 'AXDropdown';
export default AXDropdown;
