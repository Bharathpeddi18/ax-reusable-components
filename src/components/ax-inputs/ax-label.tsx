'use client';

import React, { forwardRef } from 'react';

/* ==========================================================================
   AstraX (AX) Form Label Component - 10/10 Accessible Form Label
   ========================================================================== */

export interface AXLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  optional?: boolean;
  size?: 'sm' | 'md' | 'lg';
  tooltip?: string;
}

export const AXLabel = forwardRef<HTMLLabelElement, AXLabelProps>(
  (
    {
      required = false,
      optional = false,
      size = 'md',
      tooltip,
      children,
      className = '',
      ...rest
    },
    ref
  ) => {
    return (
      <label
        ref={ref}
        className={`ax-label ax-label-size-${size} ${className}`.trim()}
        {...rest}
      >
        <span className="ax-label-text">{children}</span>
        {required && <span className="ax-label-required" aria-hidden="true">*</span>}
        {optional && !required && <span className="ax-label-optional">(optional)</span>}
        {tooltip && (
          <span className="ax-label-tooltip-icon" title={tooltip} aria-label={tooltip}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
          </span>
        )}
      </label>
    );
  }
);

AXLabel.displayName = 'AXLabel';
export default AXLabel;
