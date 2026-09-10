'use client';

import React from 'react';
import { AXIcon } from '../../assets/icons';

export interface AXEmptyStateProps {
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  secondaryAction?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  style?: React.CSSProperties;
}

export const AXEmptyState: React.FC<AXEmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  secondaryAction,
  size = 'md',
  className = '',
  style
}) => {
  return (
    <div
      className={`ax-empty-state ax-empty-state-size-${size} ${className}`}
      style={style}
      role="region"
      aria-label="Empty State"
    >
      <div className="ax-empty-state-icon">
        {icon || <AXIcon name="folder" size={size === 'sm' ? 24 : size === 'lg' ? 44 : 32} />}
      </div>
      <h3 className="ax-empty-state-title">{title}</h3>
      {description && <p className="ax-empty-state-description">{description}</p>}
      {(action || secondaryAction) && (
        <div className="ax-empty-state-actions">
          {action}
          {secondaryAction}
        </div>
      )}
    </div>
  );
};
