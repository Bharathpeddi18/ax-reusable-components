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
   TypeScript Types & Interfaces
   ========================================================================== */

export type AXTabsVariant = 'line' | 'pill' | 'card' | 'soft';
export type AXTabsSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AXTabsColor = 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger' | 'dark';
export type AXTabsOrientation = 'horizontal' | 'vertical';

export interface AXTabItem {
  /** Unique key/value identifying this tab */
  key: string;
  /** Text or content displayed on tab */
  label: React.ReactNode;
  /** Optional icon prefix */
  icon?: React.ReactNode;
  /** Optional badge text or counter */
  badge?: React.ReactNode;
  /** Badge color variant */
  badgeColor?: 'accent' | 'danger' | 'success';
  /** Disabled state */
  disabled?: boolean;
  /** Closable dismiss action */
  closable?: boolean;
  /** Tab content rendered when active */
  content?: React.ReactNode;
}

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
  const context = useContext(PopoverContextValue());
  if (!context) {
    throw new Error('AXTabs compound components must be used within an <AXTabs /> container.');
  }
  return context;
};

// Helper for context consumer
function PopoverContextValue() {
  return TabsContext;
}

/* ==========================================================================
   Root AXTabs Component
   ========================================================================== */

export interface AXTabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Initial selected tab value (uncontrolled) */
  defaultValue?: string;
  /** Controlled active tab value */
  value?: string;
  /** Callback fired when active tab changes */
  onChange?: (value: string) => void;
  /** Visual appearance variant */
  variant?: AXTabsVariant;
  /** Size preset */
  size?: AXTabsSize;
  /** Color theme */
  color?: AXTabsColor;
  /** Tab orientation layout */
  orientation?: AXTabsOrientation;
  /** Stretches tabs equally across list */
  fullWidth?: boolean;
  /** Data-driven tab items (alternative to compound children) */
  items?: AXTabItem[];
  /** Callback fired when a tab is closed/dismissed */
  onTabClose?: (value: string) => void;
  /** Compound children or custom content */
  children?: React.ReactNode;
}

export const AXTabs = forwardRef<HTMLDivElement, AXTabsProps>(
  (
    {
      defaultValue,
      value: controlledValue,
      onChange,
      variant = 'line',
      size = 'md',
      color = 'primary',
      orientation = 'horizontal',
      fullWidth = false,
      items,
      onTabClose,
      children,
      className = '',
      ...rest
    },
    ref
  ) => {
    const isControlled = controlledValue !== undefined;
    const initialVal = defaultValue ?? items?.[0]?.key ?? '';
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

    const updateIndicator = useCallback(() => {
      const listEl = tabsListRef.current;
      const tabEl = tabElementsRef.current.get(activeValue);

      if (!listEl || !tabEl) {
        setIndicatorStyle({ opacity: 0 });
        return;
      }

      const listRect = listEl.getBoundingClientRect();
      const tabRect = tabEl.getBoundingClientRect();

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
          className={`ax-tabs ax-tabs-${orientation} ax-tabs-size-${size} ax-tabs-color-${color} ${className}`}
          {...rest}
        >
          {items ? (
            <>
              <AXTabsList>
                {items.map((item) => (
                  <AXTab
                    key={item.key}
                    value={item.key}
                    startIcon={item.icon}
                    badge={item.badge}
                    badgeColor={item.badgeColor}
                    disabled={item.disabled}
                    closable={item.closable}
                  >
                    {item.label}
                  </AXTab>
                ))}
              </AXTabsList>
              {items.map((item) => (
                <AXTabPanel key={item.key} value={item.key}>
                  {item.content}
                </AXTabPanel>
              ))}
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
   AXTabsList (Tab Header Container)
   ========================================================================== */

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
        className={`ax-tabs-list ax-tabs-list-${variant} ${className}`}
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

/* ==========================================================================
   AXTab (Individual Tab Button)
   ========================================================================== */

export interface AXTabProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'value'> {
  /** Unique value matching an AXTabPanel */
  value: string;
  /** Optional icon prefix */
  startIcon?: React.ReactNode;
  /** Optional badge count or text */
  badge?: React.ReactNode;
  /** Badge color accent */
  badgeColor?: 'accent' | 'danger' | 'success';
  /** Closable tab with dismiss button */
  closable?: boolean;
  /** Tab label or content */
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

    // Keyboard Navigation (Arrow keys, Home, End)
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

/* ==========================================================================
   AXTabPanel (Content Area)
   ========================================================================== */

export interface AXTabPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Value matching the corresponding AXTab */
  value: string;
  /** Keep panel mounted in DOM when hidden */
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
