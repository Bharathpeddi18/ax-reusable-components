'use client';

import React, { forwardRef } from 'react';

/* ==========================================================================
   AstraX (AX) Layout Primitives - 10/10 Container, Flex, Grid & Stack
   ========================================================================== */

/* --------------------------------------------------------------------------
   AXContainer Component
   -------------------------------------------------------------------------- */

export type AXContainerSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

export interface AXContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: AXContainerSize;
  centered?: boolean;
  padded?: boolean;
}

export const AXContainer = forwardRef<HTMLDivElement, AXContainerProps>(
  (
    {
      size = 'xl',
      centered = true,
      padded = true,
      children,
      className = '',
      ...rest
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`ax-container ax-container-size-${size} ${
          centered ? 'ax-container-centered' : ''
        } ${padded ? 'ax-container-padded' : ''} ${className}`.trim()}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

AXContainer.displayName = 'AXContainer';

/* --------------------------------------------------------------------------
   AXFlex Component
   -------------------------------------------------------------------------- */

export type AXFlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
export type AXFlexAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type AXFlexJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
export type AXFlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';
export type AXSpacing = '0' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface AXFlexProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: AXFlexDirection;
  align?: AXFlexAlign;
  justify?: AXFlexJustify;
  wrap?: AXFlexWrap;
  gap?: AXSpacing;
  inline?: boolean;
}

export const AXFlex = forwardRef<HTMLDivElement, AXFlexProps>(
  (
    {
      direction = 'row',
      align = 'center',
      justify = 'start',
      wrap = 'nowrap',
      gap = 'md',
      inline = false,
      children,
      className = '',
      ...rest
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`${inline ? 'ax-inline-flex' : 'ax-flex'} ax-flex-${direction} ax-flex-align-${align} ax-flex-justify-${justify} ax-flex-wrap-${wrap} ax-gap-${gap} ${className}`.trim()}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

AXFlex.displayName = 'AXFlex';

/* --------------------------------------------------------------------------
   AXStack Component (Vertical / Horizontal Stack)
   -------------------------------------------------------------------------- */

export interface AXStackProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'vertical' | 'horizontal';
  gap?: AXSpacing;
  align?: AXFlexAlign;
  justify?: AXFlexJustify;
  divider?: boolean;
}

export const AXStack = forwardRef<HTMLDivElement, AXStackProps>(
  (
    {
      direction = 'vertical',
      gap = 'md',
      align,
      justify,
      divider = false,
      children,
      className = '',
      ...rest
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`ax-stack ax-stack-${direction} ax-stack-gap-${gap} ${
          align ? `ax-flex-align-${align}` : ''
        } ${justify ? `ax-flex-justify-${justify}` : ''} ${
          divider ? 'ax-stack-divided' : ''
        } ${className}`.trim()}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

AXStack.displayName = 'AXStack';

/* --------------------------------------------------------------------------
   AXGrid Component
   -------------------------------------------------------------------------- */

export type AXGridCols = '1' | '2' | '3' | '4' | '5' | '6' | '12' | 'auto';

export interface AXGridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: AXGridCols;
  gap?: AXSpacing;
  responsive?: boolean;
}

export const AXGrid = forwardRef<HTMLDivElement, AXGridProps>(
  (
    {
      cols = '3',
      gap = 'md',
      responsive = true,
      children,
      className = '',
      ...rest
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`ax-grid ax-grid-cols-${cols} ax-gap-${gap} ${
          responsive ? 'ax-grid-responsive' : ''
        } ${className}`.trim()}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

AXGrid.displayName = 'AXGrid';
