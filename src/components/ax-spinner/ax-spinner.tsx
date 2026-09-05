'use client';

import React from 'react';

export interface AXSpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'white';
  thickness?: number;
  label?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const AXSpinner: React.FC<AXSpinnerProps> = ({
  size = 'md',
  variant = 'primary',
  thickness = 3,
  label,
  className = '',
  style
}) => {
  return (
    <div className={`ax-spinner-wrapper ${className}`} style={style} role="status" aria-live="polite">
      <svg
        className={`ax-spinner ax-spinner-size-${size} ax-spinner-variant-${variant}`}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth={thickness}
          strokeDasharray="40 40"
          strokeLinecap="round"
          opacity="0.25"
        />
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth={thickness}
          strokeDasharray="18 45"
          strokeLinecap="round"
        />
      </svg>
      {label && <span className="ax-spinner-label">{label}</span>}
    </div>
  );
};
