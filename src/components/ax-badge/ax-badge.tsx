'use client';

import React from 'react';
import { AXIcon } from '../../assets/icons';

export interface AXBadgeProps {
  children?: React.ReactNode;
  variant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info'
    | 'neutral'
    | 'outline';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  pill?: boolean;
  solid?: boolean;
  dot?: boolean;
  count?: number;
  maxCount?: number;
  icon?: React.ReactNode;
  removable?: boolean;
  onRemove?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const AXBadge: React.FC<AXBadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  pill = true,
  solid = false,
  dot = false,
  count,
  maxCount = 99,
  icon,
  removable = false,
  onRemove,
  className = '',
  style
}) => {
  let displayCount: React.ReactNode = null;
  if (typeof count === 'number') {
    displayCount = count > maxCount ? `${maxCount}+` : count;
  }

  const isDotOnly = dot && !children && count === undefined;

  return (
    <span
      className={`ax-badge ax-badge-variant-${variant} ax-badge-size-${size} ${
        pill ? 'ax-badge-pill' : ''
      } ${solid ? 'ax-badge-solid' : ''} ${isDotOnly ? 'ax-badge-standalone-dot' : ''} ${className}`}
      style={style}
    >
      {dot && !isDotOnly && <span className="ax-badge-dot-indicator" />}
      {icon && <span className="ax-badge-icon">{icon}</span>}
      {children}
      {displayCount}
      {removable && (
        <button
          type="button"
          className="ax-badge-remove-btn"
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
          aria-label="Remove badge"
        >
          <AXIcon name="x" size={12} />
        </button>
      )}
    </span>
  );
};
