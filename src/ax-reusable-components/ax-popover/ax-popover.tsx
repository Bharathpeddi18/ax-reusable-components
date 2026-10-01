'use client';

import {
  ReactElement,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

// region Types
export type PopoverSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'auto';

// region Interfaces
export interface PopoverProps {
  propsTrigger: ReactElement;
  propsContent?: ReactNode;

  propsIsControlled?: boolean;
  propsIsOpen?: boolean;
  propsOnOpenChange?: (isOpen: boolean) => void;

  propsSize?: PopoverSize;
  propsTriggerGap?: number;
  propsClassName?: string;
  propsContentClassName?: string;
}

type Placement = 'top' | 'bottom' | 'left' | 'right';

// region Main Component
export function AXPopover({
  propsTrigger,
  propsContent,
  propsIsControlled = false,
  propsIsOpen = false,
  propsOnOpenChange,
  propsSize = 'auto',
  propsTriggerGap = 8,
  propsClassName = '',
  propsContentClassName = '',
}: PopoverProps) {

  // region Refs & State
  const triggerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0, maxWidth: 0, maxHeight: 0 });

  const isOpen = propsIsControlled ? propsIsOpen : internalIsOpen;

  // region Open / Close Handlers
  const handleOpenChange = (open: boolean) => {
    if (propsIsControlled) {
      propsOnOpenChange?.(open);
    } else {
      setInternalIsOpen(open);
    }
  };

  const handleTriggerClick = () => {
    if (propsIsControlled) return;
    handleOpenChange(!isOpen);
  };

  // region Positioning Logic
  const updatePosition = () => {
    if (!triggerRef.current || !popoverRef.current) return;

    const trigger = triggerRef.current.getBoundingClientRect();
    const popover = popoverRef.current.getBoundingClientRect();
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const screenGap = 8;

    // Trigger Visibility Guard (Auto-close if scrolled off screen)
    const triggerOutsideViewport =
      trigger.bottom <= 0 ||
      trigger.top >= screenHeight ||
      trigger.right <= 0 ||
      trigger.left >= screenWidth;

    if (triggerOutsideViewport) {
      handleOpenChange(false);
      return;
    }

    // Available space around trigger
    const space = {
      top: trigger.top - propsTriggerGap - screenGap,
      bottom: screenHeight - trigger.bottom - propsTriggerGap - screenGap,
      left: trigger.left - propsTriggerGap - screenGap,
      right: screenWidth - trigger.right - propsTriggerGap - screenGap,
    };

    // Priority fit: Bottom → Top → Right → Left, fallback to max space
    let placement: Placement;
    if (space.bottom >= popover.height) {
      placement = 'bottom';
    } else if (space.top >= popover.height) {
      placement = 'top';
    } else if (space.right >= popover.width) {
      placement = 'right';
    } else if (space.left >= popover.width) {
      placement = 'left';
    } else {
      placement = (Object.keys(space) as Placement[]).reduce((best, current) =>
        space[current] > space[best] ? current : best
      );
    }

    let top = 0;
    let left = 0;
    let maxWidth = screenWidth - screenGap * 2;
    let maxHeight = screenHeight - screenGap * 2;

    if (placement === 'bottom') {
      top = trigger.bottom + propsTriggerGap;
      left = trigger.left;
      maxHeight = space.bottom;
    } else if (placement === 'top') {
      maxHeight = space.top;
      top = trigger.top - Math.min(popover.height, maxHeight) - propsTriggerGap;
      left = trigger.left;
    } else if (placement === 'right') {
      top = trigger.top;
      left = trigger.right + propsTriggerGap;
      maxWidth = space.right;
    } else {
      top = trigger.top;
      maxWidth = space.left;
      left = trigger.left - Math.min(popover.width, maxWidth) - propsTriggerGap;
    }

    // Keep inside screen bounds
    const renderedWidth = Math.min(popover.width, maxWidth);
    const renderedHeight = Math.min(popover.height, maxHeight);

    left = Math.max(screenGap, Math.min(left, screenWidth - renderedWidth - screenGap));
    top = Math.max(screenGap, Math.min(top, screenHeight - renderedHeight - screenGap));

    setPosition({ top, left, maxWidth, maxHeight });
  };

  // region Initial Position & Updates
  useLayoutEffect(() => {
    if (isOpen) {
      updatePosition();
    }
  }, [isOpen, propsContent, propsTriggerGap, propsSize]);

  // region Scroll & Resize Listeners
  useEffect(() => {
    if (!isOpen) return;

    const handleUpdate = () => updatePosition();
    window.addEventListener('scroll', handleUpdate, true);
    window.addEventListener('resize', handleUpdate);

    return () => {
      window.removeEventListener('scroll', handleUpdate, true);
      window.removeEventListener('resize', handleUpdate);
    };
  }, [isOpen, propsTriggerGap]);

  // region Escape Key & Outside Click
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handleOpenChange(false);
    };

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (triggerRef.current?.contains(target) || popoverRef.current?.contains(target)) {
        return;
      }
      handleOpenChange(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [isOpen]);

  const popoverClassName = [
    'ax-popover',
    `ax-popover-${propsSize}`,
    propsClassName,
    propsContentClassName,
  ]
    .filter(Boolean)
    .join(' ');

  // region Render
  return (
    <>
      {/* Trigger Container */}
      <div ref={triggerRef} className="ax-popover-trigger" onClick={handleTriggerClick}>
        {propsTrigger}
      </div>

      {/* Floating Popover Portal */}
      {isOpen && typeof document !== 'undefined' && createPortal(
        <div
          ref={popoverRef}
          className={popoverClassName}
          style={{
            top: position.top,
            left: position.left,
            maxWidth: position.maxWidth,
            maxHeight: position.maxHeight,
          }}
        >
          {propsContent}
        </div>,
        document.body
      )}
    </>
  );
}

export default AXPopover;