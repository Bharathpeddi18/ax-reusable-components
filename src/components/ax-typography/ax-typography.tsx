'use client';

import React, { forwardRef } from 'react';

/* ==========================================================================
   AstraX (AX) Typography Suite - 10/10 Text, Heading & Link Components
   ========================================================================== */

/* --------------------------------------------------------------------------
   AXHeading Component
   -------------------------------------------------------------------------- */

export type AXHeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type AXHeadingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
export type AXHeadingWeight = 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
export type AXHeadingColor = 'primary' | 'secondary' | 'muted' | 'accent' | 'success' | 'danger' | 'gradient';

export interface AXHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: AXHeadingLevel;
  size?: AXHeadingSize;
  weight?: AXHeadingWeight;
  color?: AXHeadingColor;
  truncate?: boolean;
}

export const AXHeading = forwardRef<HTMLHeadingElement, AXHeadingProps>(
  (
    {
      as = 'h2',
      size,
      weight,
      color = 'primary',
      truncate = false,
      children,
      className = '',
      ...rest
    },
    ref
  ) => {
    const Component = as;
    const computedSize = size || (as === 'h1' ? '2xl' : as === 'h2' ? 'xl' : as === 'h3' ? 'lg' : as === 'h4' ? 'md' : as === 'h5' ? 'sm' : 'xs');

    return (
      <Component
        ref={ref}
        className={`ax-heading ax-heading-size-${computedSize} ${
          weight ? `ax-heading-weight-${weight}` : ''
        } ax-heading-color-${color} ${truncate ? 'ax-heading-truncate' : ''} ${className}`.trim()}
        {...rest}
      >
        {children}
      </Component>
    );
  }
);

AXHeading.displayName = 'AXHeading';

/* --------------------------------------------------------------------------
   AXText Component
   -------------------------------------------------------------------------- */

export type AXTextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AXTextWeight = 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
export type AXTextColor = 'primary' | 'secondary' | 'muted' | 'inverse' | 'accent' | 'success' | 'warning' | 'danger';
export type AXTextAlign = 'left' | 'center' | 'right' | 'justify';

export interface AXTextProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'p' | 'span' | 'div' | 'label' | 'strong' | 'em' | 'small' | 'code' | 'kbd';
  size?: AXTextSize;
  weight?: AXTextWeight;
  color?: AXTextColor;
  align?: AXTextAlign;
  truncate?: boolean;
  mono?: boolean;
}

export const AXText = forwardRef<HTMLElement, AXTextProps>(
  (
    {
      as = 'p',
      size = 'md',
      weight,
      color = 'primary',
      align,
      truncate = false,
      mono = false,
      children,
      className = '',
      ...rest
    },
    ref
  ) => {
    const Component = as as any;

    return (
      <Component
        ref={ref}
        className={`ax-text ax-text-size-${size} ${
          weight ? `ax-text-weight-${weight}` : ''
        } ax-text-color-${color} ${align ? `ax-text-align-${align}` : ''} ${
          truncate ? 'ax-text-truncate' : ''
        } ${mono ? 'ax-text-mono' : ''} ${className}`.trim()}
        {...rest}
      >
        {children}
      </Component>
    );
  }
);

AXText.displayName = 'AXText';

/* --------------------------------------------------------------------------
   AXLink Component
   -------------------------------------------------------------------------- */

export type AXLinkVariant = 'default' | 'subtle' | 'underline' | 'hover-underline';
export type AXLinkColor = 'primary' | 'accent' | 'secondary' | 'muted';

export interface AXLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: AXLinkVariant;
  color?: AXLinkColor;
  external?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export const AXLink = forwardRef<HTMLAnchorElement, AXLinkProps>(
  (
    {
      variant = 'default',
      color = 'primary',
      external = false,
      startIcon,
      endIcon,
      children,
      className = '',
      target,
      rel,
      ...rest
    },
    ref
  ) => {
    const isExternal = external || target === '_blank';
    const computedRel = isExternal ? rel || 'noopener noreferrer' : rel;
    const computedTarget = isExternal ? target || '_blank' : target;

    return (
      <a
        ref={ref}
        target={computedTarget}
        rel={computedRel}
        className={`ax-link ax-link-variant-${variant} ax-link-color-${color} ${className}`.trim()}
        {...rest}
      >
        {startIcon && <span className="ax-link-icon ax-link-start-icon">{startIcon}</span>}
        <span className="ax-link-text">{children}</span>
        {endIcon && <span className="ax-link-icon ax-link-end-icon">{endIcon}</span>}
        {isExternal && !endIcon && (
          <span className="ax-link-external-icon" aria-hidden="true">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </span>
        )}
      </a>
    );
  }
);

AXLink.displayName = 'AXLink';
