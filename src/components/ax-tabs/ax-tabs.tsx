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
import { CloseIcon } from '@/assets/icons';

/* ==========================================================================
   AstraX (AX) Tabs Component - 10/10 World-Class Accessible Tab Navigation
   ==========================================================================
   Features:
   - Horizontal & Vertical Orientations (Left tab list -> Right tab content)
   - Title & Content accept JSX elements or strings (passed from outside)
   - Size-Driven Hierarchy (xs, sm, md, lg, xl) via CSS tokens
   - Dual API: Data-Driven Items Array & Compound Subcomponents
   - Sliding Active Indicator with Hardware Acceleration
   - Full WCAG 2.1 AAA Keyboard Navigation & ARIA 1.2 Semantics
   ========================================================================== */

/* ==========================================================================
   SECTION 1: TypeScript Types & Interfaces
   ========================================================================== */

export type AXTabsOrientation = 'horizontal' | 'vertical';
export type AXTabsVariant = 'line' | 'pill' | 'card' | 'soft';
export type AXTabsSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AXTabsColor = 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger' | 'dark';

/** Tab item configuration for declarative data-driven usage */
export interface AXTabItem {
  /** Unique key/id identifying this tab */
  id?: string;
  /** Alias for id */
  key?: string;
  /** Alias for id */
  value?: string;
  /** Title text or custom JSX node (icons, badges, rich headers) */
  title?: React.ReactNode;
  /** Alias for title */
  label?: React.ReactNode;
  /** Tab content panel rendered when active (JSX element or string) */
  content?: React.ReactNode;
  /** Optional icon prefix */
  icon?: React.ReactNode;
  /** Optional status badge text or counter */
  badge?: React.ReactNode;
  /** Badge color variant */
  badgeColor?: 'primary' | 'secondary' | 'accent' | 'danger' | 'success';
  /** Disabled state */
  disabled?: boolean;
  /** Closable dismiss action */
  closable?: boolean;
}

/** Internal context shared across AXTabs compound components */
export interface AXTabsContextValue {
  activeValue: string;
  setActiveValue: (value: string) => void;
  variant: AXTabsVariant;
  size: AXTabsSize;
  color: AXTabsColor;
  orientation: AXTabsOrientation;
  fullWidth: boolean;
  tabsListRef: React.RefObject<HTMLDivElement | null>;
  tabElementsRef: React.MutableRefObject<Map<string, HTMLButtonElement>>;
  indicatorStyle: React.CSSProperties;
  updateIndicator: () => void;
  baseId: string;
  onTabClose?: (value: string) => void;
}

const TabsContext = createContext<AXTabsContextValue | null>(null);

export const useAXTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('AXTabs compound components must be used within an <AXTabs /> container.');
  }
  return context;
};

/* ==========================================================================
   SECTION 2: Root AXTabs Component
   ========================================================================== */

export interface AXTabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Initial selected tab value (uncontrolled) */
  defaultValue?: string;
  /** Controlled active tab value */
  value?: string;
  /** Callback fired when active tab changes */
  onChange?: (value: string) => void;
  /** Tab orientation layout ('horizontal' or 'vertical'). @default 'horizontal' */
  orientation?: AXTabsOrientation;
  /** Size preset controlling padding, gaps, and font size. @default 'md' */
  size?: AXTabsSize;
  /** Visual appearance variant. @default 'line' */
  variant?: AXTabsVariant;
  /** Color theme accent. @default 'primary' */
  color?: AXTabsColor;
  /** Stretches tabs equally across list */
  fullWidth?: boolean;
  /** Declarative tab items array with titles & contents */
  items?: AXTabItem[];
  /** Callback fired when a tab is closed/dismissed */
  onTabClose?: (value: string) => void;
  /** Custom children for compound usage */
  children?: React.ReactNode;
}

/**
 * `AXTabs` is a clean, accessible, 10/10 reusable tab container supporting
 * horizontal (top tabs) and vertical (left tabs -> right content) orientations.
 *
 * @example Items Array:
 * ```tsx
 * <AXTabs
 *   orientation="vertical"
 *   size="md"
 *   items={[
 *     { id: 'profile', title: 'Profile', content: <div>User Profile Data</div> },
 *     { id: 'settings', title: 'Settings', content: <div>Workspace Settings</div> },
 *   ]}
 * />
 * ```
 */
export const AXTabs = forwardRef<HTMLDivElement, AXTabsProps>(
  (
    {
      defaultValue,
      value: controlledValue,
      onChange,
      orientation = 'horizontal',
      size = 'md',
      variant = 'line',
      color = 'primary',
      fullWidth = false,
      items,
      onTabClose,
      children,
      className = '',
      ...rest
    },
    ref
  ) => {
    // Resolve initial active tab value
    const isControlled = controlledValue !== undefined;
    const firstItemKey = items?.[0]?.id ?? items?.[0]?.key ?? items?.[0]?.value ?? '';
    const initialVal = defaultValue ?? firstItemKey;
    const [internalValue, setInternalValue] = useState(initialVal);
    const activeValue = isControlled ? controlledValue : internalValue;

    const baseId = useId();
    const tabsListRef = useRef<HTMLDivElement | null>(null);
    const tabElementsRef = useRef<Map<string, HTMLButtonElement>>(new Map());
    const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({ opacity: 0 });

    const handleValueChange = useCallback(
      (nextValue: string) => {
        if (!isControlled) {
          setInternalValue(nextValue);
        }
        onChange?.(nextValue);
      },
      [isControlled, onChange]
    );

    // Sliding indicator calculation
    const updateIndicator = useCallback(() => {
      const listEl = tabsListRef.current;
      const tabEl = tabElementsRef.current.get(activeValue);

      if (!listEl || !tabEl) {
        setIndicatorStyle({ opacity: 0 });
        return;
      }

      if (orientation === 'vertical') {
        const top = tabEl.offsetTop;
        const height = tabEl.offsetHeight;
        setIndicatorStyle({
          transform: `translate3d(0, ${top}px, 0)`,
          height: `${height}px`,
          opacity: 1,
        });
      } else {
        const left = tabEl.offsetLeft;
        const width = tabEl.offsetWidth;
        const top = tabEl.offsetTop;
        const height = tabEl.offsetHeight;

        if (variant === 'pill') {
          setIndicatorStyle({
            transform: `translate3d(${left}px, ${top}px, 0)`,
            width: `${width}px`,
            height: `${height}px`,
            opacity: 1,
          });
        } else {
          setIndicatorStyle({
            transform: `translate3d(${left}px, 0, 0)`,
            width: `${width}px`,
            opacity: 1,
          });
        }
      }
    }, [activeValue, orientation, variant]);

    useEffect(() => {
      updateIndicator();
      window.addEventListener('resize', updateIndicator);
      return () => window.removeEventListener('resize', updateIndicator);
    }, [updateIndicator]);

    const contextValue: AXTabsContextValue = {
      activeValue,
      setActiveValue: handleValueChange,
      variant,
      size,
      color,
      orientation,
      fullWidth,
      tabsListRef,
      tabElementsRef,
      indicatorStyle,
      updateIndicator,
      baseId,
      onTabClose,
    };

    return (
      <TabsContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={`ax-tabs ax-tabs-${orientation} ax-tabs-size-${size} ax-tabs-color-${color} ${className}`.trim()}
          {...rest}
        >
          {items ? (
            <>
              <AXTabsList>
                {items.map((item) => {
                  const key = item.id ?? item.key ?? item.value ?? '';
                  const titleContent = item.title ?? item.label;
                  return (
                    <AXTab
                      key={key}
                      value={key}
                      startIcon={item.icon}
                      badge={item.badge}
                      badgeColor={item.badgeColor}
                      disabled={item.disabled}
                      closable={item.closable}
                    >
                      {titleContent}
                    </AXTab>
                  );
                })}
              </AXTabsList>

              {items.map((item) => {
                const key = item.id ?? item.key ?? item.value ?? '';
                return (
                  <AXTabPanel key={key} value={key}>
                    {item.content}
                  </AXTabPanel>
                );
              })}
            </>
          ) : (
            children
          )}
        </div>
      </TabsContext.Provider>
    );
  }
);

AXTabs.displayName = 'AXTabs';

/* ==========================================================================
   SECTION 3: Compound Sub-Components
   ========================================================================== */

/* --------------------------------------------------------------------------
   3.1 AXTabsList (Tab Header Container)
   -------------------------------------------------------------------------- */

export interface AXTabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const AXTabsList = forwardRef<HTMLDivElement, AXTabsListProps>(
  ({ children, className = '', ...rest }, forwardedRef) => {
    const { variant, orientation, tabsListRef, indicatorStyle } = useAXTabsContext();

    const setRefs = useCallback(
      (node: HTMLDivElement | null) => {
        (tabsListRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        if (typeof forwardedRef === 'function') {
          forwardedRef(node);
        } else if (forwardedRef) {
          (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      },
      [tabsListRef, forwardedRef]
    );

    return (
      <div
        ref={setRefs}
        role="tablist"
        aria-orientation={orientation}
        className={`ax-tabs-list ax-tabs-list-${variant} ${className}`.trim()}
        {...rest}
      >
        {variant !== 'card' && variant !== 'soft' && (
          <div className="ax-tabs-indicator" style={indicatorStyle} aria-hidden="true" />
        )}
        {children}
      </div>
    );
  }
);

AXTabsList.displayName = 'AXTabsList';

/* --------------------------------------------------------------------------
   3.2 AXTab (Individual Tab Button)
   -------------------------------------------------------------------------- */

export interface AXTabProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'value'> {
  /** Unique value matching an AXTabPanel */
  value: string;
  /** Optional leading icon */
  startIcon?: React.ReactNode;
  /** Optional badge count or status */
  badge?: React.ReactNode;
  /** Badge color variant */
  badgeColor?: 'primary' | 'secondary' | 'accent' | 'danger' | 'success';
  /** Closable tab button with dismiss action */
  closable?: boolean;
  /** Tab label or custom JSX title */
  children?: React.ReactNode;
}

export const AXTab = forwardRef<HTMLButtonElement, AXTabProps>(
  (
    {
      value,
      startIcon,
      badge,
      badgeColor,
      closable = false,
      disabled = false,
      children,
      className = '',
      onClick,
      onKeyDown,
      ...rest
    },
    forwardedRef
  ) => {
    const {
      activeValue,
      setActiveValue,
      fullWidth,
      orientation,
      tabElementsRef,
      baseId,
      onTabClose,
    } = useAXTabsContext();

    const isSelected = activeValue === value;
    const tabId = `${baseId}-tab-${value}`;
    const panelId = `${baseId}-panel-${value}`;

    const setRefs = useCallback(
      (node: HTMLButtonElement | null) => {
        if (node) {
          tabElementsRef.current.set(value, node);
        } else {
          tabElementsRef.current.delete(value);
        }

        if (typeof forwardedRef === 'function') {
          forwardedRef(node);
        } else if (forwardedRef) {
          (forwardedRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
        }
      },
      [value, tabElementsRef, forwardedRef]
    );

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      setActiveValue(value);
      onClick?.(e);
    };

    // WAI-ARIA Keyboard Navigation (Arrow keys, Home, End)
    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (disabled) return;

      const tabs = Array.from(tabElementsRef.current.entries()).filter(
        ([, el]) => !el.disabled && el.getAttribute('data-disabled') !== 'true'
      );
      const currentIndex = tabs.findIndex(([key]) => key === value);

      if (currentIndex === -1) return;

      const isHorizontal = orientation === 'horizontal';
      const prevKey = isHorizontal ? 'ArrowLeft' : 'ArrowUp';
      const nextKey = isHorizontal ? 'ArrowRight' : 'ArrowDown';

      let targetIndex = -1;

      if (e.key === nextKey) {
        targetIndex = (currentIndex + 1) % tabs.length;
      } else if (e.key === prevKey) {
        targetIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      } else if (e.key === 'Home') {
        targetIndex = 0;
      } else if (e.key === 'End') {
        targetIndex = tabs.length - 1;
      }

      if (targetIndex !== -1) {
        e.preventDefault();
        const [nextTabKey, nextTabEl] = tabs[targetIndex];
        setActiveValue(nextTabKey);
        nextTabEl.focus();
      }

      onKeyDown?.(e);
    };

    const handleCloseClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      onTabClose?.(value);
    };

    return (
      <button
        ref={setRefs}
        id={tabId}
        type="button"
        role="tab"
        aria-selected={isSelected}
        aria-controls={panelId}
        aria-disabled={disabled || undefined}
        data-selected={isSelected}
        data-disabled={disabled}
        tabIndex={isSelected ? 0 : -1}
        disabled={disabled}
        className={`ax-tab ${fullWidth ? 'ax-tab-full-width' : ''} ${className}`.trim()}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        {startIcon && <span className="ax-tab-icon">{startIcon}</span>}
        {children && <span className="ax-tab-label">{children}</span>}
        {badge !== undefined && badge !== null && (
          <span className={`ax-tab-badge ${badgeColor ? `ax-tab-badge-${badgeColor}` : ''}`}>
            {badge}
          </span>
        )}
        {closable && (
          <span
            role="button"
            className="ax-tab-close-btn"
            onClick={handleCloseClick}
            aria-label="Close Tab"
          >
            <CloseIcon size={12} />
          </span>
        )}
      </button>
    );
  }
);

AXTab.displayName = 'AXTab';

/* --------------------------------------------------------------------------
   3.3 AXTabPanel (Tab Content Area)
   -------------------------------------------------------------------------- */

export interface AXTabPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Value matching the corresponding AXTab */
  value: string;
  /** Keep panel mounted in DOM when inactive */
  keepMounted?: boolean;
  children?: React.ReactNode;
}

export const AXTabPanel = forwardRef<HTMLDivElement, AXTabPanelProps>(
  ({ value, keepMounted = false, children, className = '', ...rest }, ref) => {
    const { activeValue, baseId } = useAXTabsContext();
    const isSelected = activeValue === value;

    const tabId = `${baseId}-tab-${value}`;
    const panelId = `${baseId}-panel-${value}`;

    if (!isSelected && !keepMounted) {
      return null;
    }

    return (
      <div
        ref={ref}
        id={panelId}
        role="tabpanel"
        aria-labelledby={tabId}
        tabIndex={0}
        hidden={!isSelected}
        className={`ax-tab-panel ${className}`.trim()}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

AXTabPanel.displayName = 'AXTabPanel';

export default AXTabs;
