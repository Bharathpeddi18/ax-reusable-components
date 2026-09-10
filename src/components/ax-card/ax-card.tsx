'use client';

import React, { forwardRef } from 'react';

/* ==========================================================================
   AstraX (AX) Card Component - Minimal Structured UI Surface Container
   ==========================================================================
   Structure:
   - Header: headerLeft (Title/Icon) & headerRight (Actions/Controls)
   - Body: Main content container
   - Footer: footerLeft (Metadata/Tags) & footerRight (Actions/Buttons)
   - Size-Driven: Padding & spacing dynamically scale via CSS tokens (xs -> xl)
   ========================================================================== */

/* ==========================================================================
   TypeScript Types & Interfaces
   ========================================================================== */

export type AXCardSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'auto';
export type AXCardVariant = 'default' | 'elevated' | 'outlined' | 'subtle' | 'glass';

export interface AXCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Left section of the header (title, icon, info passed from outside) */
  headerLeft?: React.ReactNode;
  /** Right section of the header (actions, buttons, controls passed from outside) */
  headerRight?: React.ReactNode;
  /** Complete custom header node (overrides headerLeft & headerRight) */
  header?: React.ReactNode;
  /** Whether to show a divider border below the header. @default true */
  headerDivider?: boolean;

  /** Main body content (alias for children) */
  body?: React.ReactNode;

  /** Left section of the footer (metadata, tags, timestamps passed from outside) */
  footerLeft?: React.ReactNode;
  /** Right section of the footer (action buttons, links passed from outside) */
  footerRight?: React.ReactNode;
  /** Complete custom footer node (overrides footerLeft & footerRight) */
  footer?: React.ReactNode;
  /** Whether to show a divider border above the footer. @default true */
  footerDivider?: boolean;

  /** Card size preset controlling internal paddings and spacing. @default 'md' */
  size?: AXCardSize;
  /** Visual surface variant. @default 'default' */
  variant?: AXCardVariant;

  /** Children nodes (content body or compound subcomponents) */
  children?: React.ReactNode;
}

/* ==========================================================================
   Compound Sub-Components (Header, Body, Footer & Slots)
   ========================================================================== */

export interface AXCardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Shows divider line below the header. @default true */
  divider?: boolean;
}

/** `AXCardHeader` wraps the header section of the card */
export const AXCardHeader = forwardRef<HTMLDivElement, AXCardHeaderProps>(
  ({ divider = true, className = '', children, ...rest }, ref) => (
    <div
      ref={ref}
      className={`ax-card-header ${divider ? 'ax-card-header-divider' : ''} ${className}`.trim()}
      {...rest}
    >
      {children}
    </div>
  )
);
AXCardHeader.displayName = 'AXCardHeader';

/** `AXCardHeaderLeft` wraps left-side title/content */
export const AXCardHeaderLeft = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = '', children, ...rest }, ref) => (
    <div ref={ref} className={`ax-card-header-left ${className}`.trim()} {...rest}>
      {children}
    </div>
  )
);
AXCardHeaderLeft.displayName = 'AXCardHeaderLeft';

/** `AXCardHeaderRight` wraps right-side actions/controls */
export const AXCardHeaderRight = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = '', children, ...rest }, ref) => (
    <div ref={ref} className={`ax-card-header-right ${className}`.trim()} {...rest}>
      {children}
    </div>
  )
);
AXCardHeaderRight.displayName = 'AXCardHeaderRight';

/** `AXCardBody` wraps the main content of the card */
export const AXCardBody = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = '', children, ...rest }, ref) => (
    <div ref={ref} className={`ax-card-body ${className}`.trim()} {...rest}>
      {children}
    </div>
  )
);
AXCardBody.displayName = 'AXCardBody';

export interface AXCardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Shows divider line above the footer. @default true */
  divider?: boolean;
}

/** `AXCardFooter` wraps the footer section of the card */
export const AXCardFooter = forwardRef<HTMLDivElement, AXCardFooterProps>(
  ({ divider = true, className = '', children, ...rest }, ref) => (
    <div
      ref={ref}
      className={`ax-card-footer ${divider ? 'ax-card-footer-divider' : ''} ${className}`.trim()}
      {...rest}
    >
      {children}
    </div>
  )
);
AXCardFooter.displayName = 'AXCardFooter';

/** `AXCardFooterLeft` wraps left-side metadata/tags */
export const AXCardFooterLeft = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = '', children, ...rest }, ref) => (
    <div ref={ref} className={`ax-card-footer-left ${className}`.trim()} {...rest}>
      {children}
    </div>
  )
);
AXCardFooterLeft.displayName = 'AXCardFooterLeft';

/** `AXCardFooterRight` wraps right-side actions/buttons */
export const AXCardFooterRight = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = '', children, ...rest }, ref) => (
    <div ref={ref} className={`ax-card-footer-right ${className}`.trim()} {...rest}>
      {children}
    </div>
  )
);
AXCardFooterRight.displayName = 'AXCardFooterRight';

/* ==========================================================================
   Root AXCard Component
   ========================================================================== */

/**
 * `AXCard` is a minimal, clean reusable surface container with structured
 * header (left/right), body, and footer (left/right) sections.
 *
 * @example Simple Props:
 * ```tsx
 * <AXCard
 *   size="md"
 *   headerLeft={<h3 className="ax-font-bold">Card Title</h3>}
 *   headerRight={<AXButton size="xs" label="Edit" />}
 *   body={<p>Card body content passed from outside...</p>}
 *   footerLeft={<span>Updated 5m ago</span>}
 *   footerRight={<AXButton size="xs" color="primary" label="Save" />}
 * />
 * ```
 */
export const AXCard = forwardRef<HTMLDivElement, AXCardProps>(
  (
    {
      headerLeft,
      headerRight,
      header,
      headerDivider = true,
      body,
      footerLeft,
      footerRight,
      footer,
      footerDivider = true,
      size = 'md',
      variant = 'default',
      className = '',
      children,
      ...rest
    },
    ref
  ) => {
    const hasHeader = Boolean(header || headerLeft || headerRight);
    const hasFooter = Boolean(footer || footerLeft || footerRight);
    const bodyContent = body ?? children;
    const isShorthand = hasHeader || hasFooter || body !== undefined;

    return (
      <div
        ref={ref}
        className={`ax-card ax-card-${size} ax-card-${variant} ${className}`.trim()}
        {...rest}
      >
        {isShorthand ? (
          <>
            {/* Header Section */}
            {hasHeader &&
              (header ?? (
                <AXCardHeader divider={headerDivider}>
                  {headerLeft ? <AXCardHeaderLeft>{headerLeft}</AXCardHeaderLeft> : <div />}
                  {headerRight && <AXCardHeaderRight>{headerRight}</AXCardHeaderRight>}
                </AXCardHeader>
              ))}

            {/* Body Section */}
            {bodyContent && <AXCardBody>{bodyContent}</AXCardBody>}

            {/* Footer Section */}
            {hasFooter &&
              (footer ?? (
                <AXCardFooter divider={footerDivider}>
                  {footerLeft ? <AXCardFooterLeft>{footerLeft}</AXCardFooterLeft> : <div />}
                  {footerRight && <AXCardFooterRight>{footerRight}</AXCardFooterRight>}
                </AXCardFooter>
              ))}
          </>
        ) : (
          children
        )}
      </div>
    );
  }
);

AXCard.displayName = 'AXCard';

export default AXCard;
