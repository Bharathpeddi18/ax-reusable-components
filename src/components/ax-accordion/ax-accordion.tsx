'use client';

import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  useId,
  forwardRef,
} from 'react';
import { ChevronDownIcon } from '@/assets/icons';

/* ==========================================================================
   TypeScript Types & Interfaces
   ========================================================================== */

export type AXAccordionVariant = 'flush' | 'contained' | 'bordered' | 'filled';
export type AXAccordionType = 'single' | 'multiple';
export type AXAccordionSize = 'sm' | 'md' | 'lg';
export type AXAccordionChevronPosition = 'right' | 'left' | 'none';

export interface AXAccordionItemData {
  /** Unique key/value identifying this accordion item */
  key: string;
  /** Primary title text or node */
  title: React.ReactNode;
  /** Optional subtitle or descriptive helper */
  subtitle?: React.ReactNode;
  /** Optional prefix icon */
  icon?: React.ReactNode;
  /** Optional badge count or status pill */
  badge?: React.ReactNode;
  /** Badge color variant */
  badgeColor?: 'accent' | 'success' | 'danger';
  /** Disabled item state */
  disabled?: boolean;
  /** Body content rendered inside collapsible panel */
  content: React.ReactNode;
}

export interface AXAccordionContextValue {
  expandedItems: Set<string>;
  toggleItem: (value: string) => void;
  variant: AXAccordionVariant;
  size: AXAccordionSize;
  type: AXAccordionType;
  chevronPosition: AXAccordionChevronPosition;
  baseId: string;
  triggerElementsRef: React.MutableRefObject<Map<string, HTMLButtonElement>>;
}

const AccordionContext = createContext<AXAccordionContextValue | null>(null);

export const useAXAccordionContext = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('AXAccordion compound components must be used within an <AXAccordion /> container.');
  }
  return context;
};

/* ==========================================================================
   Root AXAccordion Component
   ========================================================================== */

export interface AXAccordionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Accordion expansion behavior mode */
  type?: AXAccordionType;
  /** When type="single", allows closing the active item by clicking it */
  collapsible?: boolean;
  /** Initial expanded item value (uncontrolled) */
  defaultValue?: string | string[];
  /** Controlled expanded value */
  value?: string | string[];
  /** Callback fired when expanded items change */
  onValueChange?: (value: string | string[]) => void;
  /** Visual appearance variant */
  variant?: AXAccordionVariant;
  /** Size preset */
  size?: AXAccordionSize;
  /** Chevron indicator alignment */
  chevronPosition?: AXAccordionChevronPosition;
  /** Data-driven items configuration (alternative to compound children) */
  items?: AXAccordionItemData[];
  /** Compound children or custom content */
  children?: React.ReactNode;
}

export const AXAccordion = forwardRef<HTMLDivElement, AXAccordionProps>(
  (
    {
      type = 'single',
      collapsible = true,
      defaultValue,
      value: controlledValue,
      onValueChange,
      variant = 'contained',
      size = 'md',
      chevronPosition = 'right',
      items,
      children,
      className = '',
      ...rest
    },
    ref
  ) => {
    const isControlled = controlledValue !== undefined;
    const baseId = useId();
    const triggerElementsRef = useRef<Map<string, HTMLButtonElement>>(new Map());

    // Normalize initial state to a Set<string>
    const normalizeValues = (val?: string | string[]): Set<string> => {
      if (!val) return new Set();
      return new Set(Array.isArray(val) ? val : [val]);
    };

    const [internalExpanded, setInternalExpanded] = useState<Set<string>>(() =>
      normalizeValues(defaultValue)
    );

    const expandedItems = isControlled
      ? normalizeValues(controlledValue)
      : internalExpanded;

    const toggleItem = useCallback(
      (itemValue: string) => {
        let nextSet: Set<string>;

        if (type === 'single') {
          const isCurrentlyOpen = expandedItems.has(itemValue);
          if (isCurrentlyOpen) {
            nextSet = collapsible ? new Set() : new Set([itemValue]);
          } else {
            nextSet = new Set([itemValue]);
          }
        } else {
          nextSet = new Set(expandedItems);
          if (nextSet.has(itemValue)) {
            nextSet.delete(itemValue);
          } else {
            nextSet.add(itemValue);
          }
        }

        if (!isControlled) {
          setInternalExpanded(nextSet);
        }

        if (onValueChange) {
          const result = type === 'single' ? Array.from(nextSet)[0] ?? '' : Array.from(nextSet);
          onValueChange(result);
        }
      },
      [type, collapsible, expandedItems, isControlled, onValueChange]
    );

    const contextValue: AXAccordionContextValue = {
      expandedItems,
      toggleItem,
      variant,
      size,
      type,
      chevronPosition,
      baseId,
      triggerElementsRef,
    };

    return (
      <AccordionContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={`ax-accordion ax-accordion-${variant} ax-accordion-size-${size} ${className}`.trim()}
          {...rest}
        >
          {items ? (
            items.map((item) => (
              <AXAccordionItem key={item.key} value={item.key} disabled={item.disabled}>
                <AXAccordionTrigger
                  startIcon={item.icon}
                  subtitle={item.subtitle}
                  badge={item.badge}
                  badgeColor={item.badgeColor}
                >
                  {item.title}
                </AXAccordionTrigger>
                <AXAccordionContent>{item.content}</AXAccordionContent>
              </AXAccordionItem>
            ))
          ) : (
            children
          )}
        </div>
      </AccordionContext.Provider>
    );
  }
);

AXAccordion.displayName = 'AXAccordion';

/* ==========================================================================
   AXAccordionItem (Collapsible Unit)
   ========================================================================== */

interface ItemContextValue {
  itemValue: string;
  isOpen: boolean;
  disabled: boolean;
  itemId: string;
  triggerId: string;
  contentId: string;
}

const ItemContext = createContext<ItemContextValue | null>(null);

const useItemContext = () => {
  const context = useContext(ItemContext);
  if (!context) {
    throw new Error('AXAccordion trigger and content must be used within an <AXAccordionItem />.');
  }
  return context;
};

export interface AXAccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Unique value identifying this item */
  value: string;
  /** Disabled item state */
  disabled?: boolean;
  children: React.ReactNode;
}

export const AXAccordionItem = forwardRef<HTMLDivElement, AXAccordionItemProps>(
  ({ value, disabled = false, children, className = '', ...rest }, ref) => {
    const { expandedItems, baseId } = useAXAccordionContext();
    const isOpen = expandedItems.has(value);

    const itemId = `${baseId}-item-${value}`;
    const triggerId = `${baseId}-trigger-${value}`;
    const contentId = `${baseId}-content-${value}`;

    return (
      <ItemContext.Provider
        value={{
          itemValue: value,
          isOpen,
          disabled,
          itemId,
          triggerId,
          contentId,
        }}
      >
        <div
          ref={ref}
          id={itemId}
          data-state={isOpen ? 'open' : 'closed'}
          data-disabled={disabled || undefined}
          className={`ax-accordion-item ${className}`.trim()}
          {...rest}
        >
          {children}
        </div>
      </ItemContext.Provider>
    );
  }
);

AXAccordionItem.displayName = 'AXAccordionItem';

/* ==========================================================================
   AXAccordionTrigger (Header Interactive Button)
   ========================================================================== */

export interface AXAccordionTriggerProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'value'> {
  /** Heading semantic level wrapper (h1 - h6) */
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Optional prefix icon */
  startIcon?: React.ReactNode;
  /** Optional subtitle or description helper */
  subtitle?: React.ReactNode;
  /** Optional status or count badge */
  badge?: React.ReactNode;
  /** Badge color accent */
  badgeColor?: 'accent' | 'success' | 'danger';
  /** Custom action buttons or slots in the header */
  actionSlot?: React.ReactNode;
  children: React.ReactNode;
}

export const AXAccordionTrigger = forwardRef<HTMLButtonElement, AXAccordionTriggerProps>(
  (
    {
      headingLevel = 3,
      startIcon,
      subtitle,
      badge,
      badgeColor,
      actionSlot,
      children,
      className = '',
      onClick,
      onKeyDown,
      ...rest
    },
    forwardedRef
  ) => {
    const { toggleItem, chevronPosition, triggerElementsRef } = useAXAccordionContext();
    const { itemValue, isOpen, disabled, triggerId, contentId } = useItemContext();

    const HeadingTag = `h${headingLevel}` as React.ElementType;

    const setRefs = useCallback(
      (node: HTMLButtonElement | null) => {
        if (node) {
          triggerElementsRef.current.set(itemValue, node);
        } else {
          triggerElementsRef.current.delete(itemValue);
        }

        if (typeof forwardedRef === 'function') {
          forwardedRef(node);
        } else if (forwardedRef) {
          (forwardedRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
        }
      },
      [itemValue, triggerElementsRef, forwardedRef]
    );

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      toggleItem(itemValue);
      onClick?.(e);
    };

    // Keyboard navigation across accordion triggers
    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (disabled) return;

      const triggers = Array.from(triggerElementsRef.current.entries()).filter(
        ([, el]) => !el.disabled
      );
      const currentIndex = triggers.findIndex(([key]) => key === itemValue);

      if (currentIndex === -1) return;

      let targetIndex = -1;

      if (e.key === 'ArrowDown') {
        targetIndex = (currentIndex + 1) % triggers.length;
      } else if (e.key === 'ArrowUp') {
        targetIndex = (currentIndex - 1 + triggers.length) % triggers.length;
      } else if (e.key === 'Home') {
        targetIndex = 0;
      } else if (e.key === 'End') {
        targetIndex = triggers.length - 1;
      }

      if (targetIndex !== -1) {
        e.preventDefault();
        const [, nextEl] = triggers[targetIndex];
        nextEl.focus();
      }

      onKeyDown?.(e);
    };

    return (
      <HeadingTag className="ax-accordion-heading">
        <button
          ref={setRefs}
          id={triggerId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={contentId}
          aria-disabled={disabled || undefined}
          disabled={disabled}
          className={`ax-accordion-trigger ${className}`.trim()}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          {...rest}
        >
          <div className="ax-accordion-trigger-start">
            {startIcon && <span className="ax-accordion-icon">{startIcon}</span>}
            <div className="ax-accordion-text">
              <span className="ax-accordion-title">{children}</span>
              {subtitle && <span className="ax-accordion-subtitle">{subtitle}</span>}
            </div>
            {badge !== undefined && badge !== null && (
              <span
                className={`ax-accordion-badge ${badgeColor ? `ax-accordion-badge-${badgeColor}` : ''}`}
              >
                {badge}
              </span>
            )}
          </div>

          {actionSlot && <div className="ax-accordion-action-slot">{actionSlot}</div>}

          {chevronPosition !== 'none' && (
            <span
              className={`ax-accordion-chevron ${chevronPosition === 'left' ? 'ax-accordion-chevron-left' : ''}`}
              aria-hidden="true"
            >
              <ChevronDownIcon size={16} />
            </span>
          )}
        </button>
      </HeadingTag>
    );
  }
);

AXAccordionTrigger.displayName = 'AXAccordionTrigger';

/* ==========================================================================
   AXAccordionContent (Collapsible Region)
   ========================================================================== */

export interface AXAccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const AXAccordionContent = forwardRef<HTMLDivElement, AXAccordionContentProps>(
  ({ children, className = '', ...rest }, ref) => {
    const { isOpen, triggerId, contentId } = useItemContext();

    return (
      <div
        ref={ref}
        id={contentId}
        role="region"
        aria-labelledby={triggerId}
        aria-hidden={!isOpen}
        className={`ax-accordion-content ${className}`.trim()}
        {...rest}
      >
        <div className="ax-accordion-body">{children}</div>
      </div>
    );
  }
);

AXAccordionContent.displayName = 'AXAccordionContent';

export default AXAccordion;
