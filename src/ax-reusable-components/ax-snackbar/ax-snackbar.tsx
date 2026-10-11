'use client';

import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export type SnackbarPosition =
  | 'top-left' | 'top-center' | 'top-right'
  | 'middle-left' | 'middle-center' | 'middle-right'
  | 'bottom-left' | 'bottom-center' | 'bottom-right';

export interface AxSnackbarProps {
  propsOpen?: boolean;
  propsOnClose?: () => void;
  propsPosition?: SnackbarPosition;
  propsDuration?: number;
  propsClassName?: string;
  children?: ReactNode;
}

export function AxSnackbar(props: AxSnackbarProps) {
  const isOpen = props.propsOpen ?? false;
  const onClose = props.propsOnClose;
  const position = props.propsPosition ?? 'bottom-center';
  const duration = props.propsDuration ?? 0;
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!isOpen || duration <= 0) return;
    const timer = setTimeout(() => onClose?.(), duration);
    return () => clearTimeout(timer);
  }, [isOpen, duration, onClose]);

  if (!mounted || !isOpen) return null;

  const className = `ax-snackbar ${props.propsClassName || ''}`.trim();

  return createPortal(
    <div
      className={className}
      snackbar-position={position}
      role="status"
    >
      {props.children}
    </div>,
    document.body
  );
}

export { AxSnackbar as AXSnackbar, AxSnackbar as Snackbar };
export default AxSnackbar;