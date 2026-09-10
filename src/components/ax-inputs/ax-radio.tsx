'use client';

import React, { forwardRef, createContext, useContext, useState, useId } from 'react';

/* ==========================================================================
   AstraX (AX) Radio & RadioGroup Components - 10/10 World-Class
   ========================================================================== */

export type AXRadioSize = 'sm' | 'md' | 'lg';
export type AXRadioColor = 'primary' | 'accent' | 'success' | 'danger' | 'dark';
export type AXRadioVariant = 'default' | 'card';

/* ==========================================================================
   Radio Group Context
   ========================================================================== */

interface RadioGroupContextValue {
  value?: string;
  onChange: (val: string) => void;
  name?: string;
  disabled?: boolean;
  size?: AXRadioSize;
  color?: AXRadioColor;
  variant?: AXRadioVariant;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

/* ==========================================================================
   AXRadio Component
   ========================================================================== */

export interface AXRadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Radio label */
  label?: React.ReactNode;
  /** Description helper text rendered below label */
  description?: React.ReactNode;
  /** Size preset scaling dimensions and typography. @default 'md' */
  size?: AXRadioSize;
  /** Color theme accent. @default 'primary' */
  color?: AXRadioColor;
  /** Visual appearance variant. @default 'default' */
  variant?: AXRadioVariant;
}

export const AXRadio = forwardRef<HTMLInputElement, AXRadioProps>(
  (
    {
      id,
      label,
      description,
      size: propSize,
      color: propColor,
      variant: propVariant,
      checked: propChecked,
      defaultChecked,
      onChange,
      disabled: propDisabled,
      className = '',
      value,
      name: propName,
      ...rest
    },
    ref
  ) => {
    const groupContext = useContext(RadioGroupContext);

    const size = propSize ?? groupContext?.size ?? 'md';
    const color = propColor ?? groupContext?.color ?? 'primary';
    const variant = propVariant ?? groupContext?.variant ?? 'default';
    const disabled = propDisabled ?? groupContext?.disabled ?? false;
    const name = propName ?? groupContext?.name;

    const isGroupControlled = groupContext !== null && value !== undefined;
    const isChecked = isGroupControlled
      ? groupContext.value === String(value)
      : propChecked;

    const generatedId = useId();
    const inputId = id ?? generatedId;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;
      if (isGroupControlled) {
        groupContext.onChange(String(value));
      }
      onChange?.(e);
    };

    return (
      <label
        htmlFor={inputId}
        className={`ax-radio-wrapper ax-radio-size-${size} ax-radio-color-${color} ax-radio-variant-${variant} ${
          isChecked ? 'ax-radio-checked' : ''
        } ${disabled ? 'ax-radio-disabled' : ''} ${className}`.trim()}
      >
        <span className="ax-radio-circle-container">
          <input
            ref={ref}
            id={inputId}
            type="radio"
            name={name}
            value={value}
            checked={isChecked}
            defaultChecked={defaultChecked}
            disabled={disabled}
            onChange={handleChange}
            className="ax-radio-input"
            {...rest}
          />
          <span className="ax-radio-custom" aria-hidden="true">
            <span className="ax-radio-dot" />
          </span>
        </span>

        {(label || description) && (
          <span className="ax-radio-text-container">
            {label && <span className="ax-radio-label">{label}</span>}
            {description && <span className="ax-radio-description">{description}</span>}
          </span>
        )}
      </label>
    );
  }
);

AXRadio.displayName = 'AXRadio';

/* ==========================================================================
   AXRadioGroup Component
   ========================================================================== */

export interface AXRadioGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Controlled active radio value */
  value?: string;
  /** Uncontrolled default radio value */
  defaultValue?: string;
  /** Callback fired when radio selection changes */
  onChange?: (value: string) => void;
  /** Group field label */
  label?: React.ReactNode;
  /** Layout orientation. @default 'vertical' */
  orientation?: 'horizontal' | 'vertical';
  /** Visual appearance variant. @default 'default' */
  variant?: AXRadioVariant;
  name?: string;
  disabled?: boolean;
  size?: AXRadioSize;
  color?: AXRadioColor;
}

export const AXRadioGroup = forwardRef<HTMLDivElement, AXRadioGroupProps>(
  (
    {
      value: controlledValue,
      defaultValue,
      onChange,
      label,
      orientation = 'vertical',
      variant = 'default',
      name: propName,
      disabled,
      size = 'md',
      color = 'primary',
      children,
      className = '',
      ...rest
    },
    ref
  ) => {
    const generatedName = useId();
    const name = propName ?? generatedName;

    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = useState<string | undefined>(defaultValue);
    const currentValue = isControlled ? controlledValue : internalValue;

    const handleChange = (nextValue: string) => {
      if (!isControlled) {
        setInternalValue(nextValue);
      }
      onChange?.(nextValue);
    };

    return (
      <RadioGroupContext.Provider
        value={{
          value: currentValue,
          onChange: handleChange,
          name,
          disabled,
          size,
          color,
          variant,
        }}
      >
        <div
          ref={ref}
          role="radiogroup"
          className={`ax-radio-group ax-radio-group-${orientation} ${className}`.trim()}
          {...rest}
        >
          {label && <span className="ax-radio-group-label">{label}</span>}
          <div className="ax-radio-group-items">{children}</div>
        </div>
      </RadioGroupContext.Provider>
    );
  }
);

AXRadioGroup.displayName = 'AXRadioGroup';
export default AXRadio;
