'use client';

import { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export type ModalSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | 'auto';

export interface AxModalPopoverProps {
  propsOpen?: boolean;
  propsOnClose?: () => void;
  children?: ReactNode;
  propsSize?: ModalSize;
  propsCloseOnOutsideClick?: boolean;
  propsClassName?: string;
}

export function AxModalPopover(props: AxModalPopoverProps) {
  const isOpen = props.propsOpen ?? false;
  const onClose = props.propsOnClose;
  const children = props.children;
  const size = props.propsSize ?? 'auto';
  const closeOnOutside = props.propsCloseOnOutsideClick ?? true;

  const modalRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
    };

    document.addEventListener("keydown", onKeyDown);
    modalRef.current?.focus();

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!mounted || !isOpen) return null;

  const containerClass = `ax-modal-container ${props.propsClassName || ''}`.trim();

  return createPortal(
    <div
      className="ax-modal-overlay"
      onClick={(e) => {
        if (closeOnOutside && e.target === e.currentTarget) onClose?.();
      }}
    >
      <div
        ref={modalRef}
        className={containerClass}
        ax-modal-size={size}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}

export { AxModalPopover as AXModalPopover };
export default AxModalPopover;