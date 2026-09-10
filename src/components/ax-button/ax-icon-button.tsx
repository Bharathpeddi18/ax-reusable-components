'use client';

import React, { forwardRef } from 'react';
import { AXButton, AXButtonProps, AXButtonSize, AXButtonVariant, AXButtonColor } from './ax-button';

/* ==========================================================================
   AstraX (AX) Icon Button Component - 10/10 Square & Circle Icon Actions
   ========================================================================== */

export interface AXIconButtonProps extends Omit<AXButtonProps, 'label' | 'startIcon' | 'endIcon'> {
  /** Accessible label for screen readers */
  'aria-label': string;
  /** The icon element to render */
  icon?: React.ReactNode;
  /** Shape geometry. @default 'circle' */
  shape?: 'circle' | 'square' | 'rounded';
}

export const AXIconButton = forwardRef<HTMLButtonElement, AXIconButtonProps>(
  (
    {
      icon,
      shape = 'circle',
      size = 'md',
      variant = 'soft',
      color = 'primary',
      children,
      className = '',
      ...rest
    },
    ref
  ) => {
    return (
      <AXButton
        ref={ref}
        shape={shape}
        size={size}
        variant={variant}
        color={color}
        className={`ax-icon-button ax-icon-btn-size-${size} ${className}`.trim()}
        {...rest}
      >
        {icon || children}
      </AXButton>
    );
  }
);

AXIconButton.displayName = 'AXIconButton';
export default AXIconButton;
