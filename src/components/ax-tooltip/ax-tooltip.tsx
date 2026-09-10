'use client';

import React, { useState, useRef, useEffect, useId } from 'react';
import { createPortal } from 'react-dom';

/* ==========================================================================
   AstraX (AX) Tooltip Component - 10/10 Portal Floating Tooltip
   ========================================================================== */

export type AXTooltipPlacement = 'top' | 'bottom' | 'left' | 'right';
export type AXTooltipTheme = 'dark' | 'light' | 'primary';

export interface AXTooltipProps {
  /** Tooltip text or custom content */
  content: React.ReactNode;
  /** Floating placement direction. @default 'top' */
  placement?: AXTooltipPlacement;
  /** Color theme. @default 'dark' */
  theme?: AXTooltipTheme;
  /** Open delay in milliseconds. @default 150 */
  openDelay?: number;
  /** Close delay in milliseconds. @default 100 */
  closeDelay?: number;
  /** Show arrow pointer. @default true */
  showArrow?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Target trigger element */
  children: React.ReactElement;
  /** Additional CSS class name */
  className?: string;
}

export const AXTooltip: React.FC<AXTooltipProps> = ({
  content,
  placement = 'top',
  theme = 'dark',
  openDelay = 150,
  closeDelay = 100,
  showArrow = true,
  disabled = false,
  children,
  className = '',
}) => {
  const tooltipId = useId();
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const [mounted, setMounted] = useState(false);

  const triggerRef = useRef<HTMLElement | null>(null);
  const openTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const updatePosition = () => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;

    let top = 0;
    let left = 0;
    const offset = showArrow ? 8 : 4;

    switch (placement) {
      case 'top':
        top = rect.top + scrollY - offset;
        left = rect.left + scrollX + rect.width / 2;
        break;
      case 'bottom':
        top = rect.bottom + scrollY + offset;
        left = rect.left + scrollX + rect.width / 2;
        break;
      case 'left':
        top = rect.top + scrollY + rect.height / 2;
        left = rect.left + scrollX - offset;
        break;
      case 'right':
        top = rect.top + scrollY + rect.height / 2;
        left = rect.right + scrollX + offset;
        break;
    }

    setCoords({ top, left });
  };

  const handleMouseEnter = () => {
    if (disabled || !content) return;
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    openTimeoutRef.current = setTimeout(() => {
      updatePosition();
      setIsVisible(true);
    }, openDelay);
  };

  const handleMouseLeave = () => {
    if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, closeDelay);
  };

  // Clone child with ref and events
  const triggerElement = React.cloneElement(children as any, {
    ref: (node: HTMLElement | null) => {
      triggerRef.current = node;
      const childRef = (children as any).ref;
      if (typeof childRef === 'function') childRef(node);
      else if (childRef) childRef.current = node;
    },
    onMouseEnter: (e: React.MouseEvent) => {
      (children as any).props.onMouseEnter?.(e);
      handleMouseEnter();
    },
    onMouseLeave: (e: React.MouseEvent) => {
      (children as any).props.onMouseLeave?.(e);
      handleMouseLeave();
    },
    onFocus: (e: React.FocusEvent) => {
      (children as any).props.onFocus?.(e);
      handleMouseEnter();
    },
    onBlur: (e: React.FocusEvent) => {
      (children as any).props.onBlur?.(e);
      handleMouseLeave();
    },
    'aria-describedby': isVisible ? tooltipId : undefined,
  });

  return (
    <>
      {triggerElement}
      {mounted &&
        isVisible &&
        createPortal(
          <div
            id={tooltipId}
            role="tooltip"
            style={{
              top: `${coords.top}px`,
              left: `${coords.left}px`,
            }}
            className={`ax-tooltip ax-tooltip-${placement} ax-tooltip-theme-${theme} ${
              showArrow ? 'ax-tooltip-with-arrow' : ''
            } ${className}`.trim()}
          >
            <div className="ax-tooltip-content">{content}</div>
            {showArrow && <div className="ax-tooltip-arrow" />}
          </div>,
          document.body
        )}
    </>
  );
};

export default AXTooltip;
