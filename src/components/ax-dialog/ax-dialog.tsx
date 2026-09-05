'use client';

import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AXIcon } from '../../assets/icons';

export interface AXDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  showCloseButton?: boolean;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const AXDialog: React.FC<AXDialogProps> = ({
  isOpen,
  onClose,
  title,
  description,
  size = 'md',
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
  const dialogRef = useRef<HTMLDivElement>(null);

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
      className={`ax-dialog-backdrop ${isOpen ? 'is-open' : ''}`}
      onClick={(e) => {
        if (closeOnOverlayClick && e.target === e.currentTarget) {
          onClose();
        }
      }}
      aria-hidden={!isOpen}
    >
      <div
        ref={dialogRef}
        className={`ax-dialog ax-dialog-size-${size} ${className}`}
        style={style}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'ax-dialog-title' : undefined}
      >
        {(header || title || showCloseButton) && (
          <div className="ax-dialog-header">
            {header ? (
              header
            ) : (
              <div className="ax-dialog-header-text">
                {title && (
                  <h2 id="ax-dialog-title" className="ax-dialog-title">
                    {title}
                  </h2>
                )}
                {description && <p className="ax-dialog-description">{description}</p>}
              </div>
            )}
            {showCloseButton && (
              <button
                type="button"
                className="ax-dialog-close-btn"
                onClick={onClose}
                aria-label="Close dialog"
              >
                <AXIcon name="x" size={18} />
              </button>
            )}
          </div>
        )}

        <div className="ax-dialog-body">{children}</div>

        {footer && <div className="ax-dialog-footer">{footer}</div>}
      </div>
    </div>
  );

  return createPortal(content, document.body);
};

export const AXModal = AXDialog;

export interface AXDialogHeaderProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  onClose?: () => void;
  showCloseButton?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export const AXDialogHeader: React.FC<AXDialogHeaderProps> = ({
  title,
  description,
  onClose,
  showCloseButton = true,
  children,
  className = ''
}) => {
  return (
    <div className={`ax-dialog-header ${className}`}>
      {children ? (
        children
      ) : (
        <div className="ax-dialog-header-text">
          {title && <h2 className="ax-dialog-title">{title}</h2>}
          {description && <p className="ax-dialog-description">{description}</p>}
        </div>
      )}
      {showCloseButton && onClose && (
        <button
          type="button"
          className="ax-dialog-close-btn"
          onClick={onClose}
          aria-label="Close"
        >
          <AXIcon name="x" size={18} />
        </button>
      )}
    </div>
  );
};

export interface AXDialogBodyProps {
  children?: React.ReactNode;
  className?: string;
}

export const AXDialogBody: React.FC<AXDialogBodyProps> = ({ children, className = '' }) => (
  <div className={`ax-dialog-body ${className}`}>{children}</div>
);

export interface AXDialogFooterProps {
  children?: React.ReactNode;
  className?: string;
}

export const AXDialogFooter: React.FC<AXDialogFooterProps> = ({ children, className = '' }) => (
  <div className={`ax-dialog-footer ${className}`}>{children}</div>
);
