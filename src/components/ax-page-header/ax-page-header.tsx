'use client';

import React, { forwardRef } from 'react';

/* ==========================================================================
   AstraX (AX) Page Header Component - Clean Minimal 2-Section Layout
   ==========================================================================
   Structure:
   - Left Section: Consistent page title, icon, or custom left-side content
   - Right Section: Action buttons, input search fields, or custom right-side controls
   ========================================================================== */

/* ==========================================================================
   TypeScript Types & Interfaces
   ========================================================================== */

export interface AXPageHeaderProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /**
   * Title text or custom left-hand content.
   * @example title="User Management"
   */
  title?: React.ReactNode;

  /**
   * Custom content for the left section (alias for title).
   */
  left?: React.ReactNode;

  /**
   * Action buttons, search inputs, or controls for the right section.
   * @example actions={<AXButton label="Create" />}
   */
  actions?: React.ReactNode;

  /**
   * Custom content for the right section (alias for actions).
   */
  right?: React.ReactNode;

  /**
   * Whether the header sticks to the top of the viewport when scrolling.
   * @default true
   */
  sticky?: boolean;

  /**
   * Whether to render the subtle bottom divider border.
   * @default true
   */
  divider?: boolean;

  /**
   * Custom children (for compound usage or custom content layout).
   */
  children?: React.ReactNode;
}

/* ==========================================================================
   Compound Sub-Components (Left & Right Sections)
   ========================================================================== */

export interface AXPageHeaderLeftProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

/**
 * `AXPageHeaderLeft` wraps the left-hand section (title, badges, icons).
 */
export const AXPageHeaderLeft = forwardRef<HTMLDivElement, AXPageHeaderLeftProps>(
  ({ children, className = '', ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={`ax-page-header-left ${className}`.trim()}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

AXPageHeaderLeft.displayName = 'AXPageHeaderLeft';

export interface AXPageHeaderRightProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

/**
 * `AXPageHeaderRight` wraps the right-hand section (action buttons, search, filters).
 */
export const AXPageHeaderRight = forwardRef<HTMLDivElement, AXPageHeaderRightProps>(
  ({ children, className = '', ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={`ax-page-header-right ${className}`.trim()}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

AXPageHeaderRight.displayName = 'AXPageHeaderRight';

/* ==========================================================================
   Root AXPageHeader Component
   ========================================================================== */

/**
 * `AXPageHeader` provides a consistent, minimal two-section header for individual pages.
 *
 * @example Simple Props:
 * ```tsx
 * <AXPageHeader
 *   title="User Management"
 *   actions={<AXButton size="xs" color="primary" label="Add Member" />}
 * />
 * ```
 *
 * @example Custom Left & Right:
 * ```tsx
 * <AXPageHeader
 *   left={<div className="ax-flex ax-items-center ax-gap-2"><h1>Analytics</h1><span>Live</span></div>}
 *   right={<input type="text" placeholder="Search..." />}
 * />
 * ```
 */
export const AXPageHeader = forwardRef<HTMLElement, AXPageHeaderProps>(
  (
    {
      title,
      left,
      actions,
      right,
      sticky = true,
      divider = true,
      className = '',
      children,
      ...rest
    },
    ref
  ) => {
    // Resolve left content (left prop takes precedence over title)
    const leftContent = left ?? (
      typeof title === 'string' ? (
        <h1 className="ax-page-header-title">{title}</h1>
      ) : (
        title
      )
    );

    // Resolve right content (right prop takes precedence over actions)
    const rightContent = right ?? actions;

    const isDirectUsage = leftContent !== undefined || rightContent !== undefined;

    return (
      <header
        ref={ref}
        className={`ax-page-header ${sticky ? 'ax-page-header-sticky' : ''} ${
          divider ? 'ax-page-header-divider' : ''
        } ${className}`.trim()}
        {...rest}
      >
        <div className="ax-page-header-inner">
          {isDirectUsage ? (
            <>
              {leftContent && <AXPageHeaderLeft>{leftContent}</AXPageHeaderLeft>}
              {rightContent && <AXPageHeaderRight>{rightContent}</AXPageHeaderRight>}
              {children}
            </>
          ) : (
            children
          )}
        </div>
      </header>
    );
  }
);

AXPageHeader.displayName = 'AXPageHeader';

export default AXPageHeader;