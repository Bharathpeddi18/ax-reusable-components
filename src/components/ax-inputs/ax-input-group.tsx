'use client';

import React, { forwardRef, useId } from 'react';

/* ==========================================================================
   AstraX (AX) InputGroup Component - 10/10 Connected Input Addons Container
   ========================================================================== */

export type AXInputGroupSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface AXInputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Input group label */
  label?: React.ReactNode;
  /** Helper text displayed below */
  helperText?: React.ReactNode;
  /** Error message displayed below (sets invalid state) */
  errorMessage?: React.ReactNode;
  /** Error state flag */
  error?: boolean;
  /** Required field indicator */
  required?: boolean;
  /** Size preset applied to group children. @default 'md' */
  size?: AXInputGroupSize;
  /** Full container width expansion. @default true */
  fullWidth?: boolean;
}

export const AXInputGroup = forwardRef<HTMLDivElement, AXInputGroupProps>(
  (
    {
      id,
      label,
      helperText,
      errorMessage,
      error = false,
      required = false,
      size = 'md',
      fullWidth = true,
      children,
      className = '',
      ...rest
    },
    ref
  ) => {
    const generatedId = useId();
    const groupId = id ?? generatedId;
    const isInvalid = Boolean(error || errorMessage);

    return (
      <div
        ref={ref}
        id={groupId}
        className={`ax-input-group-wrapper ax-input-group-size-${size} ${
          fullWidth ? 'ax-input-group-full-width' : ''
        } ${isInvalid ? 'ax-input-group-invalid' : ''} ${className}`.trim()}
        {...rest}
      >
        {label && (
          <span className="ax-input-group-label">
            {label}
            {required && <span className="ax-input-group-required" aria-hidden="true">*</span>}
          </span>
        )}

        <div className="ax-input-group-container">{children}</div>

        {/* Messages */}
        {errorMessage ? (
          <p className="ax-input-group-message ax-input-group-error-message" role="alert">
            {errorMessage}
          </p>
        ) : helperText ? (
          <p className="ax-input-group-message ax-input-group-helper-message">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

AXInputGroup.displayName = 'AXInputGroup';
export default AXInputGroup;
