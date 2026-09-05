'use client';

import React from 'react';

export interface AXProgressProps {
  value?: number;
  max?: number;
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md' | 'lg';
  striped?: boolean;
  animated?: boolean;
  indeterminate?: boolean;
  showLabel?: boolean;
  label?: React.ReactNode;
  format?: (value: number, max: number) => React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const AXProgress: React.FC<AXProgressProps> = ({
  value = 0,
  max = 100,
  variant = 'primary',
  size = 'md',
  striped = false,
  animated = false,
  indeterminate = false,
  showLabel = false,
  label,
  format,
  className = '',
  style
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const displayLabel = format ? format(value, max) : `${Math.round(percentage)}%`;

  return (
    <div className={`ax-progress-wrapper ax-progress-size-${size} ${className}`} style={style}>
      {(showLabel || label) && (
        <div className="ax-progress-header">
          {label && <span>{label}</span>}
          {showLabel && !indeterminate && <span>{displayLabel}</span>}
        </div>
      )}

      <div
        className={`ax-progress-track ax-progress-variant-${variant} ${
          striped ? 'ax-progress-striped' : ''
        } ${animated ? 'ax-progress-animated' : ''} ${
          indeterminate ? 'ax-progress-indeterminate' : ''
        }`}
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div
          className="ax-progress-bar"
          style={{ width: indeterminate ? undefined : `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export interface AXProgressCircleProps {
  value?: number;
  max?: number;
  size?: number; // px, default 80
  thickness?: number; // px, default 6
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
  showLabel?: boolean;
  format?: (value: number, max: number) => React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const AXProgressCircle: React.FC<AXProgressCircleProps> = ({
  value = 0,
  max = 100,
  size = 80,
  thickness = 6,
  variant = 'primary',
  showLabel = true,
  format,
  className = '',
  style
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  const displayLabel = format ? format(value, max) : `${Math.round(percentage)}%`;

  return (
    <div
      className={`ax-progress-circle-wrapper ax-progress-circle-variant-${variant} ${className}`}
      style={{ width: size, height: size, ...style }}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
    >
      <svg
        className="ax-progress-circle-svg"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        <circle
          className="ax-progress-circle-track"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={thickness}
          fill="none"
        />
        <circle
          className="ax-progress-circle-bar"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={thickness}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          fill="none"
        />
      </svg>
      {showLabel && <span className="ax-progress-circle-label">{displayLabel}</span>}
    </div>
  );
};
