'use client';

import React, {
  forwardRef,
  useState,
  useEffect,
  useRef,
  useId,
  createContext,
  useContext,
} from 'react';

/* ==========================================================================
   AstraX (AX) Checkbox & CheckboxGroup Components - 10/10 World-Class
   ========================================================================== */

export type AXCheckboxSize = 'sm' | 'md' | 'lg';
export type AXCheckboxColor = 'primary' | 'accent' | 'success' | 'danger' | 'dark';

/* ==========================================================================
   Checkbox Group Context
   ========================================================================== */

interface CheckboxGroupContextValue {
  value: string[];
  onChange: (val: string, checked: boolean) => void;
  name?: string;
  disabled?: boolean;
  size?: AXCheckboxSize;
  color?: AXCheckboxColor;
}

const CheckboxGroupContext = createContext<CheckboxGroupContextValue | null>(null);

/* ==========================================================================
   AXCheckbox Component
   ========================================================================== */

export interface AXCheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Checkbox label */
  label?: React.ReactNode;
  /** Description helper text rendered below label */
  description?: React.ReactNode;
  /** Indeterminate state (e.g. partial selection in tables) */
  indeterminate?: boolean;
  /** Size preset scaling dimensions and font size. @default 'md' */
  size?: AXCheckboxSize;
  /** Color theme accent. @default 'primary' */
  color?: AXCheckboxColor;
}

export const AXCheckbox = forwardRef<HTMLInputElement, AXCheckboxProps>(
  (
    {
      id,
      label,
      description,
      indeterminate = false,
      size: propSize,
      color: propColor,
      checked: propChecked,
      defaultChecked,
      onChange,
      disabled: propDisabled,
      className = '',
      value,
      name: propName,
      ...rest
    },
    forwardedRef
  ) => {
    const groupContext = useContext(CheckboxGroupContext);

    const size = propSize ?? groupContext?.size ?? 'md';
    const color = propColor ?? groupContext?.color ?? 'primary';
    const disabled = propDisabled ?? groupContext?.disabled ?? false;
    const name = propName ?? groupContext?.name;

    const isGroupControlled = groupContext !== null && value !== undefined;
    const checked = isGroupControlled
      ? groupContext.value.includes(String(value))
      : propChecked;

    const generatedId = useId();
    const inputId = id ?? generatedId;
    const innerRef = useRef<HTMLInputElement | null>(null);

    // Sync indeterminate property directly on native DOM node
    useEffect(() => {
      const el = innerRef.current;
      if (el) {
        el.indeterminate = Boolean(indeterminate);
      }
    }, [indeterminate]);

    const setRefs = (node: HTMLInputElement | null) => {
      innerRef.current = node;
      if (typeof forwardedRef === 'function') {
        forwardedRef(node);
      } else if (forwardedRef) {
        (forwardedRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;
      if (isGroupControlled) {
        groupContext.onChange(String(value), e.target.checked);
      }
      onChange?.(e);
    };

    return (
      <label
        htmlFor={inputId}
        className={`ax-checkbox-wrapper ax-checkbox-size-${size} ax-checkbox-color-${color} ${
          disabled ? 'ax-checkbox-disabled' : ''
        } ${className}`.trim()}
      >
        <span className="ax-checkbox-box-container">
          <input
            ref={setRefs}
            id={inputId}
            type="checkbox"
            name={name}
            value={value}
            checked={checked}
            defaultChecked={defaultChecked}
            disabled={disabled}
            onChange={handleChange}
            className="ax-checkbox-input"
            {...rest}
          />
          <span className="ax-checkbox-custom" aria-hidden="true">
            {/* Checkmark Icon */}
            <svg
              className="ax-checkbox-icon ax-checkbox-check-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>

            {/* Indeterminate Minus Icon */}
            <svg
              className="ax-checkbox-icon ax-checkbox-minus-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </span>
        </span>

        {(label || description) && (
          <span className="ax-checkbox-text-container">
            {label && <span className="ax-checkbox-label">{label}</span>}
            {description && <span className="ax-checkbox-description">{description}</span>}
          </span>
        )}
      </label>
    );
  }
);

AXCheckbox.displayName = 'AXCheckbox';

/* ==========================================================================
   AXCheckboxGroup Component
   ========================================================================== */

export interface AXCheckboxGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Selected values array (controlled) */
  value?: string[];
  /** Default selected values array (uncontrolled) */
  defaultValue?: string[];
  /** Callback fired when selected values change */
  onChange?: (values: string[]) => void;
  /** Group field label */
  label?: React.ReactNode;
  /** Layout orientation. @default 'vertical' */
  orientation?: 'horizontal' | 'vertical';
  name?: string;
  disabled?: boolean;
  size?: AXCheckboxSize;
  color?: AXCheckboxColor;
}

export const AXCheckboxGroup = forwardRef<HTMLDivElement, AXCheckboxGroupProps>(
  (
    {
      value: controlledValue,
      defaultValue = [],
      onChange,
      label,
      orientation = 'vertical',
      name,
      disabled,
      size = 'md',
      color = 'primary',
      children,
      className = '',
      ...rest
    },
    ref
  ) => {
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = useState<string[]>(defaultValue);
    const currentValue = isControlled ? controlledValue : internalValue;

    const handleItemChange = (itemValue: string, isChecked: boolean) => {
      let nextValues: string[];
      if (isChecked) {
        nextValues = [...currentValue, itemValue];
      } else {
        nextValues = currentValue.filter((v: string) => v !== itemValue);
      }

      if (!isControlled) {
        setInternalValue(nextValues);
      }
      onChange?.(nextValues);
    };

    return (
      <CheckboxGroupContext.Provider
        value={{
          value: currentValue,
          onChange: handleItemChange,
          name,
          disabled,
          size,
          color,
        }}
      >
        <div
          ref={ref}
          role="group"
          className={`ax-checkbox-group ax-checkbox-group-${orientation} ${className}`.trim()}
          {...rest}
        >
          {label && <span className="ax-checkbox-group-label">{label}</span>}
          <div className="ax-checkbox-group-items">{children}</div>
        </div>
      </CheckboxGroupContext.Provider>
    );
  }
);

AXCheckboxGroup.displayName = 'AXCheckboxGroup';
export default AXCheckbox;
