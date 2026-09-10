'use client';

import React from 'react';
import { AXIcon } from '../../assets/icons';

export interface AXAlertProps {
  variant?: 'info' | 'success' | 'warning' | 'danger' | 'neutral';
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  hideIcon?: boolean;
  dismissible?: boolean;
  onClose?: () => void;
  action?: React.ReactNode;
  banner?: boolean;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const defaultIcons: Record<string, string> = {
  info: 'info',
  success: 'check-circle-2',
  warning: 'alert-triangle',
  danger: 'alert-circle',
  neutral: 'info'
};

export const AXAlert: React.FC<AXAlertProps> = ({
  variant = 'info',
  title,
  description,
  icon,
  hideIcon = false,
  dismissible = false,
  onClose,
  action,
  banner = false,
  children,
  className = '',
  style
}) => {
  const iconName = defaultIcons[variant] || 'info';

  return (
    <div
      className={`ax-alert ax-alert-variant-${variant} ${banner ? 'ax-alert-banner' : ''} ${className}`}
      style={style}
      role="alert"
    >
      {!hideIcon && (
        <span className="ax-alert-icon">
          {icon || <AXIcon name={iconName as any} size={20} />}
        </span>
      )}

      <div className="ax-alert-content">
        {title && <h5 className="ax-alert-title">{title}</h5>}
        {description && <div className="ax-alert-description">{description}</div>}
        {children && <div className="ax-alert-children">{children}</div>}
        {action && <div className="ax-alert-actions">{action}</div>}
      </div>

      {dismissible && (
        <button
          type="button"
          className="ax-alert-close-btn"
          onClick={onClose}
          aria-label="Dismiss alert"
        >
          <AXIcon name="x" size={16} />
        </button>
      )}
    </div>
  );
};
