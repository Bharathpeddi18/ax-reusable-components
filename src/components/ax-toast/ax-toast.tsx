'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AXIcon } from '../../assets/icons';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info' | 'loading';
export type ToastPosition =
  | 'top-right'
  | 'top-left'
  | 'top-center'
  | 'bottom-right'
  | 'bottom-left'
  | 'bottom-center';

export interface ToastOptions {
  id?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  variant?: ToastVariant;
  duration?: number; // ms, default 4000
  position?: ToastPosition;
}

interface ToastItem extends ToastOptions {
  id: string;
  createdAt: number;
}

interface ToastContextType {
  toast: (options: ToastOptions) => string;
  success: (title: React.ReactNode, description?: React.ReactNode, duration?: number) => string;
  error: (title: React.ReactNode, description?: React.ReactNode, duration?: number) => string;
  warning: (title: React.ReactNode, description?: React.ReactNode, duration?: number) => string;
  info: (title: React.ReactNode, description?: React.ReactNode, duration?: number) => string;
  loading: (title: React.ReactNode, description?: React.ReactNode) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

let toastCount = 0;

export const ToastProvider: React.FC<{
  children: React.ReactNode;
  defaultPosition?: ToastPosition;
}> = ({ children, defaultPosition = 'top-right' }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const dismissAll = useCallback(() => {
    setToasts([]);
  }, []);

  const toast = useCallback(
    (options: ToastOptions) => {
      const id = options.id || `toast-${++toastCount}-${Date.now()}`;
      const newToast: ToastItem = {
        ...options,
        id,
        variant: options.variant || 'info',
        duration: options.duration !== undefined ? options.duration : 4000,
        position: options.position || defaultPosition,
        createdAt: Date.now()
      };

      setToasts((prev) => [...prev.filter((t) => t.id !== id), newToast]);

      if (newToast.duration && newToast.duration > 0) {
        setTimeout(() => {
          dismiss(id);
        }, newToast.duration);
      }

      return id;
    },
    [defaultPosition, dismiss]
  );

  const success = useCallback(
    (title: React.ReactNode, description?: React.ReactNode, duration?: number) =>
      toast({ title, description, variant: 'success', duration }),
    [toast]
  );

  const error = useCallback(
    (title: React.ReactNode, description?: React.ReactNode, duration?: number) =>
      toast({ title, description, variant: 'error', duration }),
    [toast]
  );

  const warning = useCallback(
    (title: React.ReactNode, description?: React.ReactNode, duration?: number) =>
      toast({ title, description, variant: 'warning', duration }),
    [toast]
  );

  const info = useCallback(
    (title: React.ReactNode, description?: React.ReactNode, duration?: number) =>
      toast({ title, description, variant: 'info', duration }),
    [toast]
  );

  const loading = useCallback(
    (title: React.ReactNode, description?: React.ReactNode) =>
      toast({ title, description, variant: 'loading', duration: 0 }),
    [toast]
  );

  // Group toasts by position
  const positions: ToastPosition[] = [
    'top-right',
    'top-left',
    'top-center',
    'bottom-right',
    'bottom-left',
    'bottom-center'
  ];

  const renderPortals = () => {
    if (!mounted) return null;

    return positions.map((pos) => {
      const posToasts = toasts.filter((t) => (t.position || defaultPosition) === pos);
      if (posToasts.length === 0) return null;

      return createPortal(
        <div key={pos} className={`ax-toast-container ax-toast-container-${pos}`}>
          {posToasts.map((item) => (
            <AXToastItem key={item.id} item={item} onDismiss={() => dismiss(item.id)} />
          ))}
        </div>,
        document.body
      );
    });
  };

  return (
    <ToastContext.Provider
      value={{
        toast,
        success,
        error,
        warning,
        info,
        loading,
        dismiss,
        dismissAll
      }}
    >
      {children}
      {renderPortals()}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

const AXToastItem: React.FC<{ item: ToastItem; onDismiss: () => void }> = ({
  item,
  onDismiss
}) => {
  const getIcon = () => {
    switch (item.variant) {
      case 'success':
        return <AXIcon name="check-circle-2" size={18} />;
      case 'error':
        return <AXIcon name="alert-circle" size={18} />;
      case 'warning':
        return <AXIcon name="alert-triangle" size={18} />;
      case 'loading':
        return <AXIcon name="loader" size={18} className="animate-spin" />;
      case 'info':
      default:
        return <AXIcon name="info" size={18} />;
    }
  };

  return (
    <div className={`ax-toast ax-toast-variant-${item.variant || 'info'}`} role="status">
      <span className="ax-toast-icon">{getIcon()}</span>
      <div className="ax-toast-content">
        <h6 className="ax-toast-title">{item.title}</h6>
        {item.description && <p className="ax-toast-description">{item.description}</p>}
      </div>
      <button
        type="button"
        className="ax-toast-close-btn"
        onClick={onDismiss}
        aria-label="Dismiss toast"
      >
        <AXIcon name="x" size={14} />
      </button>
    </div>
  );
};

export interface AXToastProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  variant?: ToastVariant;
  onClose?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const AXToast: React.FC<AXToastProps> = ({
  title,
  description,
  variant = 'info',
  onClose,
  className = '',
  style
}) => {
  const getIcon = () => {
    switch (variant) {
      case 'success':
        return <AXIcon name="check-circle-2" size={18} />;
      case 'error':
        return <AXIcon name="alert-circle" size={18} />;
      case 'warning':
        return <AXIcon name="alert-triangle" size={18} />;
      case 'loading':
        return <AXIcon name="loader" size={18} className="animate-spin" />;
      case 'info':
      default:
        return <AXIcon name="info" size={18} />;
    }
  };

  return (
    <div
      className={`ax-toast ax-toast-variant-${variant} ${className}`}
      style={style}
      role="status"
    >
      <span className="ax-toast-icon">{getIcon()}</span>
      <div className="ax-toast-content">
        <h6 className="ax-toast-title">{title}</h6>
        {description && <p className="ax-toast-description">{description}</p>}
      </div>
      {onClose && (
        <button
          type="button"
          className="ax-toast-close-btn"
          onClick={onClose}
          aria-label="Close"
        >
          <AXIcon name="x" size={14} />
        </button>
      )}
    </div>
  );
};
