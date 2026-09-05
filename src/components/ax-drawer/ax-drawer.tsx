'use client';

import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AXIcon } from '../../assets/icons';

export interface AXDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  placement?: 'left' | 'right' | 'top' | 'bottom';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  title?: React.ReactNode;
  description?: React.ReactNode;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  showCloseButton?: boolean;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const AXDrawer: React.FC<AXDrawerProps> = ({
  isOpen,
  onClose,
  placement = 'right',
  size = 'md',
  title,
  description,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  showCloseButton = true,
  header,
  footer,
  children,
  className = '',
  style
}) => {
  const [mounted, setMounted] = React.useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (closeOnEsc && e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, closeOnEsc, onClose]);

  if (!mounted) return null;

  const content = (
    <div
      className={`ax-drawer-backdrop ${isOpen ? 'is-open' : ''}`}
      onClick={(e) => {
        if (closeOnOverlayClick && e.target === e.currentTarget) {
          onClose();
        }
      }}
      aria-hidden={!isOpen}
    >
      <div
        ref={drawerRef}
        className={`ax-drawer ax-drawer-placement-${placement} ax-drawer-size-${size} ${
          isOpen ? 'is-open' : ''
        } ${className}`}
        style={style}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'ax-drawer-title' : undefined}
      >
        {(header || title || showCloseButton) && (
          <div className="ax-drawer-header">
            {header ? (
              header
            ) : (
              <div className="ax-drawer-header-text">
                {title && (
                  <h2 id="ax-drawer-title" className="ax-drawer-title">
                    {title}
                  </h2>
                )}
                {description && <p className="ax-drawer-description">{description}</p>}
              </div>
            )}
            {showCloseButton && (
              <button
                type="button"
                className="ax-drawer-close-btn"
                onClick={onClose}
                aria-label="Close drawer"
              >
                <AXIcon name="x" size={18} />
              </button>
            )}
          </div>
        )}

        <div className="ax-drawer-body">{children}</div>

        {footer && <div className="ax-drawer-footer">{footer}</div>}
      </div>
    </div>
  );

  return createPortal(content, document.body);
};

export const AXSheet = AXDrawer;

export interface AXDrawerHeaderProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  onClose?: () => void;
  showCloseButton?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export const AXDrawerHeader: React.FC<AXDrawerHeaderProps> = ({
  title,
  description,
  onClose,
  showCloseButton = true,
  children,
  className = ''
}) => {
  return (
    <div className={`ax-drawer-header ${className}`}>
      {children ? (
        children
      ) : (
        <div className="ax-drawer-header-text">
          {title && <h2 className="ax-drawer-title">{title}</h2>}
          {description && <p className="ax-drawer-description">{description}</p>}
        </div>
      )}
      {showCloseButton && onClose && (
        <button
          type="button"
          className="ax-drawer-close-btn"
          onClick={onClose}
          aria-label="Close"
        >
          <AXIcon name="x" size={18} />
        </button>
      )}
    </div>
  );
};

export interface AXDrawerBodyProps {
  children?: React.ReactNode;
  className?: string;
}

export const AXDrawerBody: React.FC<AXDrawerBodyProps> = ({ children, className = '' }) => (
  <div className={`ax-drawer-body ${className}`}>{children}</div>
);

export interface AXDrawerFooterProps {
  children?: React.ReactNode;
  className?: string;
}

export const AXDrawerFooter: React.FC<AXDrawerFooterProps> = ({ children, className = '' }) => (
  <div className={`ax-drawer-footer ${className}`}>{children}</div>
);
