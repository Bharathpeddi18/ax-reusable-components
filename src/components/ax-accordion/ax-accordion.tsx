'use client';

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useId,
  forwardRef,
} from 'react';
import { ChevronDownIcon } from '@/assets/icons';

/* ==========================================================================
   AstraX (AX) Accordion Component - Minimal, Size-Driven UI Collapsible
   ==========================================================================
   Structure:
   - Header / Trigger: Title, subtitle, icons & badges passed from outside
   - Content / Body: Expandable body region passed from outside
   - Size-Driven: Padding, gaps, and typography dynamically scale via CSS tokens
   - Dual API: Data-driven items array + Compound subcomponents
   ========================================================================== */

/* ==========================================================================
   SECTION 1: TypeScript Types & Interfaces
   ========================================================================== */

export type AXAccordionType = 'single' | 'multiple';
export type AXAccordionSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AXAccordionVariant = 'contained' | 'flush' | 'bordered' | 'subtle' | 'filled';
export type AXAccordionChevronPosition = 'right' | 'left' | 'none';

export interface AXAccordionItemData {
  /** Unique key or id identifying this accordion item */
  id?: string;
  key?: string;
  value?: string;
  /** Header title text or custom JSX element passed from outside */
  title: React.ReactNode;
  /** Optional subtitle or descriptive helper */
  subtitle?: React.ReactNode;
  /** Main body content rendered inside collapsible region */
  content: React.ReactNode;
  /** Optional icon prefix */
  icon?: React.ReactNode;
  /** Optional badge */
  badge?: React.ReactNode;
  /** Badge color variant */
  badgeColor?: 'accent' | 'success' | 'danger' | string;
  /** Disabled item state */
  disabled?: boolean;
}

export interface AXAccordionContextValue {
  expandedItems: Set<string>;
  toggleItem: (value: string) => void;
  variant: AXAccordionVariant;
  size: AXAccordionSize;
  chevronPosition: AXAccordionChevronPosition;
  baseId: string;
}

const AccordionContext = createContext<AXAccordionContextValue | null>(null);

export const useAXAccordionContext = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('AXAccordion components must be used within an <AXAccordion /> container.');
  }
  return context;
};

/* ==========================================================================
   SECTION 2: Root AXAccordion Component
   ========================================================================== */

export interface AXAccordionProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Single item expansion or multiple concurrent expansion. @default 'single' */
  type?: AXAccordionType;
  /** Allows collapsing the active item when in single mode. @default true */
  collapsible?: boolean;
  /** Initial expanded value (uncontrolled) */
  defaultValue?: string | string[];
  /** Controlled expanded value */
  value?: string | string[];
  /** Callback fired when expanded items change */
  onValueChange?: (value: string | string[]) => void;
  /** Visual appearance variant. @default 'contained' */
  variant?: AXAccordionVariant;
  /** Size preset controlling padding, gaps, and font size. @default 'md' */
  size?: AXAccordionSize;
  /** Chevron indicator alignment. @default 'right' */
  chevronPosition?: AXAccordionChevronPosition;
  /** Data-driven items array (alternative to compound children) */
  items?: AXAccordionItemData[];
  /** Custom children for compound usage */
  children?: React.ReactNode;
}

/**
 * `AXAccordion` is a clean, minimal collapsible component with size-driven tokens
 * and smooth CSS Grid height animations.
 *
 * @example Items Array:
 * ```tsx
 * <AXAccordion
 *   size="md"
 *   items={[
 *     { id: '1', title: 'Account Settings', content: <p>Profile details...</p> },
 *     { id: '2', title: 'Billing Info', content: <p>Card details...</p> },
 *   ]}
 * />
 * ```
 */
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
      chevronPosition,
      baseId,
    };

    return (
      <AccordionContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={`ax-accordion ax-accordion-${variant} ax-accordion-size-${size} ${className}`.trim()}
          {...rest}
        >
          {items ? (
            items.map((item) => {
              const key = item.id ?? item.key ?? item.value ?? '';
              return (
                <AXAccordionItem key={key} value={key} disabled={item.disabled}>
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
              );
            })
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
   SECTION 3: Compound Sub-Components
   ========================================================================== */

/* --------------------------------------------------------------------------
   3.1 AXAccordionItem (Individual Collapsible Item)
   -------------------------------------------------------------------------- */

interface ItemContextValue {
  itemValue: string;
  isOpen: boolean;
  disabled: boolean;
  triggerId: string;
  contentId: string;
}

const ItemContext = createContext<ItemContextValue | null>(null);

const useItemContext = () => {
  const context = useContext(ItemContext);
  if (!context) {
    throw new Error('AXAccordionTrigger and AXAccordionContent must be used within an <AXAccordionItem />.');
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

    const triggerId = `${baseId}-trigger-${value}`;
    const contentId = `${baseId}-content-${value}`;

    return (
      <ItemContext.Provider
        value={{
          itemValue: value,
          isOpen,
          disabled,
          triggerId,
          contentId,
        }}
      >
        <div
          ref={ref}
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

/* --------------------------------------------------------------------------
   3.2 AXAccordionTrigger (Header Trigger Button)
   -------------------------------------------------------------------------- */

export interface AXAccordionTriggerProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'value'> {
  /** Leading icon graphic */
  startIcon?: React.ReactNode;
  /** Optional subtitle or description helper */
  subtitle?: React.ReactNode;
  /** Optional badge */
  badge?: React.ReactNode;
  /** Optional badge color variant */
  badgeColor?: 'accent' | 'success' | 'danger' | string;
  children: React.ReactNode;
}

export const AXAccordionTrigger = forwardRef<HTMLButtonElement, AXAccordionTriggerProps>(
  (
    {
      startIcon,
      subtitle,
      badge,
      badgeColor,
      children,
      className = '',
      onClick,
      ...rest
    },
    ref
  ) => {
    const { toggleItem, chevronPosition } = useAXAccordionContext();
    const { itemValue, isOpen, disabled, triggerId, contentId } = useItemContext();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      toggleItem(itemValue);
      onClick?.(e);
    };

    return (
      <h3 className="ax-accordion-heading">
        <button
          ref={ref}
          id={triggerId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={contentId}
          aria-disabled={disabled || undefined}
          disabled={disabled}
          className={`ax-accordion-trigger ${className}`.trim()}
          onClick={handleClick}
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
                className={`ax-accordion-badge ${badgeColor ? `ax-accordion-badge-${badgeColor}` : ''}`.trim()}
              >
                {badge}
              </span>
            )}
          </div>

          {chevronPosition !== 'none' && (
            <span
              className={`ax-accordion-chevron ${chevronPosition === 'left' ? 'ax-accordion-chevron-left' : ''}`}
              aria-hidden="true"
            >
              <ChevronDownIcon size={16} />
            </span>
          )}
        </button>
      </h3>
    );
  }
);

AXAccordionTrigger.displayName = 'AXAccordionTrigger';

/* --------------------------------------------------------------------------
   3.3 AXAccordionContent (Collapsible Content Region)
   -------------------------------------------------------------------------- */

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
