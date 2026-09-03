'use client';

import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
  useId,
  forwardRef,
} from 'react';
import { createPortal } from 'react-dom';
import './ax-popover.css';

/* ==========================================================================
   TypeScript Types & Interfaces
   ========================================================================== */

export type AXPopoverPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'auto';

export type AXPopoverSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'auto' | 'full';

export type AXPopoverTheme = 'surface' | 'dark' | 'primary' | 'glass';

export type AXPopoverTriggerMode = 'click' | 'hover' | 'focus' | 'manual';

export interface AXPopoverContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  triggerRef: React.RefObject<HTMLDivElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
  placement: AXPopoverPlacement;
  size: AXPopoverSize;
  theme: AXPopoverTheme;
  showArrow: boolean;
  offset: number;
  popoverId: string;
}

const PopoverContext = createContext<AXPopoverContextValue | null>(null);

export const useAXPopoverContext = () => {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error('AXPopover compound components must be used within an <AXPopover /> provider.');
  }
  return context;
};

/* ==========================================================================
   Helper: Positioning Math & Collision Flipping
   ========================================================================== */

interface Coordinates {
  top: number;
  left: number;
  actualPlacement: string;
  arrowOffset: number;
  triggerWidth: number;
}

function computePopoverPosition(
  triggerEl: HTMLElement,
  popoverEl: HTMLElement,
  requestedPlacement: AXPopoverPlacement,
  offsetDistance: number
): Coordinates {
  const triggerRect = triggerEl.getBoundingClientRect();
  const popoverRect = popoverEl.getBoundingClientRect();

  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const padding = 10; // Minimum margin from viewport edges

  let placement = requestedPlacement;

  // Auto placement logic: pick best vertical space
  if (placement === 'auto') {
    const spaceBelow = viewportHeight - triggerRect.bottom;
    const spaceAbove = triggerRect.top;
    placement = spaceBelow >= popoverRect.height || spaceBelow >= spaceAbove ? 'bottom' : 'top';
  }

  // Vertical collision check: Flip top <-> bottom if clipped
  if (placement.startsWith('top') && triggerRect.top - popoverRect.height - offsetDistance < padding) {
    if (viewportHeight - triggerRect.bottom - offsetDistance >= popoverRect.height) {
      placement = placement.replace('top', 'bottom') as AXPopoverPlacement;
    }
  } else if (
    placement.startsWith('bottom') &&
    triggerRect.bottom + popoverRect.height + offsetDistance > viewportHeight - padding
  ) {
    if (triggerRect.top - offsetDistance >= popoverRect.height) {
      placement = placement.replace('bottom', 'top') as AXPopoverPlacement;
    }
  }

  // Horizontal collision check: Flip left <-> right if clipped
  if (placement.startsWith('left') && triggerRect.left - popoverRect.width - offsetDistance < padding) {
    if (viewportWidth - triggerRect.right - offsetDistance >= popoverRect.width) {
      placement = placement.replace('left', 'right') as AXPopoverPlacement;
    }
  } else if (
    placement.startsWith('right') &&
    triggerRect.right + popoverRect.width + offsetDistance > viewportWidth - padding
  ) {
    if (triggerRect.left - offsetDistance >= popoverRect.width) {
      placement = placement.replace('right', 'left') as AXPopoverPlacement;
    }
  }

  let top = 0;
  let left = 0;

  switch (placement) {
    case 'top':
      top = triggerRect.top - popoverRect.height - offsetDistance;
      left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2;
      break;
    case 'top-start':
      top = triggerRect.top - popoverRect.height - offsetDistance;
      left = triggerRect.left;
      break;
    case 'top-end':
      top = triggerRect.top - popoverRect.height - offsetDistance;
      left = triggerRect.right - popoverRect.width;
      break;

    case 'bottom':
      top = triggerRect.bottom + offsetDistance;
      left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2;
      break;
    case 'bottom-start':
      top = triggerRect.bottom + offsetDistance;
      left = triggerRect.left;
      break;
    case 'bottom-end':
      top = triggerRect.bottom + offsetDistance;
      left = triggerRect.right - popoverRect.width;
      break;

    case 'left':
      top = triggerRect.top + (triggerRect.height - popoverRect.height) / 2;
      left = triggerRect.left - popoverRect.width - offsetDistance;
      break;
    case 'left-start':
      top = triggerRect.top;
      left = triggerRect.left - popoverRect.width - offsetDistance;
      break;
    case 'left-end':
      top = triggerRect.bottom - popoverRect.height;
      left = triggerRect.left - popoverRect.width - offsetDistance;
      break;

    case 'right':
      top = triggerRect.top + (triggerRect.height - popoverRect.height) / 2;
      left = triggerRect.right + offsetDistance;
      break;
    case 'right-start':
      top = triggerRect.top;
      left = triggerRect.right + offsetDistance;
      break;
    case 'right-end':
      top = triggerRect.bottom - popoverRect.height;
      left = triggerRect.right + offsetDistance;
      break;
  }

  // Clamping within viewport edges
  const maxLeft = viewportWidth - popoverRect.width - padding;
  const clampedLeft = Math.max(padding, Math.min(left, maxLeft));

  const maxTop = viewportHeight - popoverRect.height - padding;
  const clampedTop = Math.max(padding, Math.min(top, maxTop));

  // Calculate arrow alignment offset
  let arrowOffset = 0;
  if (placement.startsWith('top') || placement.startsWith('bottom')) {
    const triggerCenter = triggerRect.left + triggerRect.width / 2;
    arrowOffset = Math.max(16, Math.min(triggerCenter - clampedLeft - 5, popoverRect.width - 24));
  } else {
    const triggerCenter = triggerRect.top + triggerRect.height / 2;
    arrowOffset = Math.max(16, Math.min(triggerCenter - clampedTop - 5, popoverRect.height - 24));
  }

  return {
    top: clampedTop + window.scrollY,
    left: clampedLeft + window.scrollX,
    actualPlacement: placement,
    arrowOffset,
    triggerWidth: triggerRect.width,
  };
}

/* ==========================================================================
   Root AXPopover Component
   ========================================================================== */

export interface AXPopoverProps {
  /** Uncontrolled initial open state */
  defaultOpen?: boolean;
  /** Controlled open state */
  open?: boolean;
  /** Callback fired when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Placement direction */
  placement?: AXPopoverPlacement;
  /** Size variant */
  size?: AXPopoverSize;
  /** Color theme variant */
  theme?: AXPopoverTheme;
  /** Interaction trigger mode */
  trigger?: AXPopoverTriggerMode;
  /** Show arrow indicator */
  showArrow?: boolean;
  /** Distance in pixels between trigger and popover */
  offset?: number;
  /** Delay in ms before opening when trigger is hover */
  openDelay?: number;
  /** Delay in ms before closing when trigger is hover */
  closeDelay?: number;
  /** Close when user clicks outside */
  closeOnOutsideClick?: boolean;
  /** Close when user presses Escape key */
  closeOnEsc?: boolean;
  /** Shorthand content (alternative to compound children) */
  content?: React.ReactNode;
  /** Shorthand title */
  title?: React.ReactNode;
  /** Children (trigger element or compound structure) */
  children?: React.ReactNode;
}

export const AXPopover = ({
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  placement = 'bottom',
  size = 'md',
  theme = 'surface',
  trigger = 'click',
  showArrow = true,
  offset = 8,
  openDelay = 80,
  closeDelay = 150,
  closeOnOutsideClick = true,
  closeOnEsc = true,
  content,
  title,
  children,
}: AXPopoverProps) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const triggerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const popoverId = useId();

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setInternalOpen(nextOpen);
      }
      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange]
  );

  const openPopover = useCallback(() => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    handleOpenChange(true);
  }, [handleOpenChange]);

  const closePopover = useCallback(() => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    handleOpenChange(false);
  }, [handleOpenChange]);

  const togglePopover = useCallback(() => {
    if (isOpen) {
      closePopover();
    } else {
      openPopover();
    }
  }, [isOpen, closePopover, openPopover]);

  // Click Outside Listener
  useEffect(() => {
    if (!isOpen || !closeOnOutsideClick) return;

    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        triggerRef.current?.contains(target) ||
        contentRef.current?.contains(target)
      ) {
        return;
      }
      closePopover();
    };

    document.addEventListener('mousedown', handleDocumentClick);
    return () => document.removeEventListener('mousedown', handleDocumentClick);
  }, [isOpen, closeOnOutsideClick, closePopover]);

  // Escape Key Listener
  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closePopover();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeOnEsc, closePopover]);

  const contextValue: AXPopoverContextValue = {
    isOpen,
    open: openPopover,
    close: closePopover,
    toggle: togglePopover,
    triggerRef,
    contentRef,
    placement,
    size,
    theme,
    showArrow,
    offset,
    popoverId,
  };

  // Check if user is using Shorthand API or Compound API
  const isShorthand = Boolean(content || title);

  if (isShorthand) {
    return (
      <PopoverContext.Provider value={contextValue}>
        <AXPopoverTrigger
          triggerMode={trigger}
          openDelay={openDelay}
          closeDelay={closeDelay}
        >
          {children}
        </AXPopoverTrigger>
        <AXPopoverContent>
          {title && <AXPopoverHeader title={title} />}
          <AXPopoverBody>{content}</AXPopoverBody>
        </AXPopoverContent>
      </PopoverContext.Provider>
    );
  }

  return (
    <PopoverContext.Provider value={contextValue}>
      {children}
    </PopoverContext.Provider>
  );
};

/* ==========================================================================
   AXPopoverTrigger
   ========================================================================== */

export interface AXPopoverTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  triggerMode?: AXPopoverTriggerMode;
  openDelay?: number;
  closeDelay?: number;
  children: React.ReactNode;
}

export const AXPopoverTrigger = forwardRef<HTMLDivElement, AXPopoverTriggerProps>(
  (
    {
      triggerMode = 'click',
      openDelay = 80,
      closeDelay = 150,
      children,
      className = '',
      ...rest
    },
    forwardedRef
  ) => {
    const { isOpen, open, close, toggle, triggerRef, popoverId } = useAXPopoverContext();
    const hoverTimer = useRef<NodeJS.Timeout | null>(null);

    const setRefs = useCallback(
      (node: HTMLDivElement | null) => {
        (triggerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        if (typeof forwardedRef === 'function') {
          forwardedRef(node);
        } else if (forwardedRef) {
          (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      },
      [triggerRef, forwardedRef]
    );

    const handleMouseEnter = () => {
      if (triggerMode === 'hover') {
        if (hoverTimer.current) clearTimeout(hoverTimer.current);
        hoverTimer.current = setTimeout(open, openDelay);
      }
    };

    const handleMouseLeave = () => {
      if (triggerMode === 'hover') {
        if (hoverTimer.current) clearTimeout(hoverTimer.current);
        hoverTimer.current = setTimeout(close, closeDelay);
      }
    };

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (triggerMode === 'click') {
        e.stopPropagation();
        toggle();
      }
      rest.onClick?.(e);
    };

    const handleFocus = (e: React.FocusEvent<HTMLDivElement>) => {
      if (triggerMode === 'focus') {
        open();
      }
      rest.onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
      if (triggerMode === 'focus') {
        close();
      }
      rest.onBlur?.(e);
    };

    return (
      <div
        ref={setRefs}
        className={`ax-popover-trigger ${className}`}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls={isOpen ? popoverId : undefined}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

AXPopoverTrigger.displayName = 'AXPopoverTrigger';

/* ==========================================================================
   AXPopoverContent (Portal Layer)
   ========================================================================== */

export interface AXPopoverContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const AXPopoverContent = forwardRef<HTMLDivElement, AXPopoverContentProps>(
  ({ children, className = '', style, ...rest }, forwardedRef) => {
    const {
      isOpen,
      triggerRef,
      contentRef,
      placement,
      size,
      theme,
      showArrow,
      offset,
      popoverId,
    } = useAXPopoverContext();

    const [mounted, setMounted] = useState(false);
    const [coords, setCoords] = useState<Coordinates>({
      top: -9999,
      left: -9999,
      actualPlacement: placement,
      arrowOffset: 0,
      triggerWidth: 0,
    });

    useEffect(() => {
      setMounted(true);
    }, []);

    const updatePosition = useCallback(() => {
      if (!triggerRef.current || !contentRef.current) return;
      const computed = computePopoverPosition(
        triggerRef.current,
        contentRef.current,
        placement,
        offset
      );
      setCoords(computed);
    }, [triggerRef, contentRef, placement, offset]);

    useEffect(() => {
      if (!isOpen) return;

      updatePosition();
      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', updatePosition, true);

      return () => {
        window.removeEventListener('resize', updatePosition);
        window.removeEventListener('scroll', updatePosition, true);
      };
    }, [isOpen, updatePosition]);

    const setRefs = useCallback(
      (node: HTMLDivElement | null) => {
        (contentRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        if (typeof forwardedRef === 'function') {
          forwardedRef(node);
        } else if (forwardedRef) {
          (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      },
      [contentRef, forwardedRef]
    );

    if (!mounted || !isOpen) return null;

    const arrowPositionStyle: React.CSSProperties =
      coords.actualPlacement.startsWith('top') || coords.actualPlacement.startsWith('bottom')
        ? { left: `${coords.arrowOffset}px` }
        : { top: `${coords.arrowOffset}px` };

    const popoverElement = (
      <div className="ax-popover-portal">
        <div
          ref={setRefs}
          id={popoverId}
          role="dialog"
          aria-modal="false"
          data-ax-state={isOpen ? 'open' : 'closed'}
          data-ax-placement={coords.actualPlacement}
          className={`ax-popover ax-popover-size-${size} ${className}`}
          style={{
            top: `${coords.top}px`,
            left: `${coords.left}px`,
            ['--ax-popover-trigger-width' as string]: `${coords.triggerWidth}px`,
            ...style,
          }}
          {...rest}
        >
          <div className={`ax-popover-card ax-popover-theme-${theme}`}>
            {showArrow && <div className="ax-popover-arrow" style={arrowPositionStyle} />}
            {children}
          </div>
        </div>
      </div>
    );

    return createPortal(popoverElement, document.body);
  }
);

AXPopoverContent.displayName = 'AXPopoverContent';

/* ==========================================================================
   Compound Sub-Components: Header, Title, Body, Footer, Close
   ========================================================================== */

export interface AXPopoverHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: React.ReactNode;
  showClose?: boolean;
}

export const AXPopoverHeader = ({
  title,
  showClose = true,
  children,
  className = '',
  ...rest
}: AXPopoverHeaderProps) => {
  const { close } = useAXPopoverContext();

  return (
    <div className={`ax-popover-header ${className}`} {...rest}>
      {title && <h4 className="ax-popover-title">{title}</h4>}
      {children}
      {showClose && (
        <button
          type="button"
          className="ax-popover-close-btn"
          onClick={close}
          aria-label="Close Popover"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  );
};

export interface AXPopoverBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const AXPopoverBody = ({ children, className = '', ...rest }: AXPopoverBodyProps) => {
  return (
    <div className={`ax-popover-body ${className}`} {...rest}>
      {children}
    </div>
  );
};

export interface AXPopoverFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const AXPopoverFooter = ({ children, className = '', ...rest }: AXPopoverFooterProps) => {
  return (
    <div className={`ax-popover-footer ${className}`} {...rest}>
      {children}
    </div>
  );
};

export interface AXPopoverCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export const AXPopoverClose = ({ children, className = '', ...rest }: AXPopoverCloseProps) => {
  const { close } = useAXPopoverContext();

  return (
    <button
      type="button"
      className={`ax-popover-close ${className}`}
      onClick={(e) => {
        rest.onClick?.(e);
        close();
      }}
      {...rest}
    >
      {children || 'Close'}
    </button>
  );
};

export default AXPopover;
