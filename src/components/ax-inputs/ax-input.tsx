'use client';

import React, { forwardRef, useState, useId } from 'react';

/* ==========================================================================
   AstraX (AX) Input Component - 10/10 World-Class Text Input
   ========================================================================== */

export type AXInputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AXInputVariant = 'outlined' | 'subtle' | 'underlined';

export interface AXInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Input field label */
  label?: React.ReactNode;
  /** Helper text displayed below input */
  helperText?: React.ReactNode;
  /** Error message displayed below input (sets invalid state) */
  errorMessage?: React.ReactNode;
  /** Error state boolean */
  error?: boolean;
  /** Leading icon inside the input field */
  startIcon?: React.ReactNode;
  /** Trailing icon inside the input field */
  endIcon?: React.ReactNode;
  /** Prefix addon attached outside the input boundary (e.g. https://) */
  prefixAddon?: React.ReactNode;
  /** Suffix addon attached outside the input boundary (e.g. .com) */
  suffixAddon?: React.ReactNode;
  /** Size preset scaling height, padding, and font size. @default 'md' */
  size?: AXInputSize;
  /** Visual surface variant. @default 'outlined' */
  variant?: AXInputVariant;
  /** Enables clear button when input has content */
  clearable?: boolean;
  /** Callback fired when clear button is clicked */
  onClear?: () => void;
  /** Enables show/hide password visibility toggle for password inputs */
  showPasswordToggle?: boolean;
  /** Show live character counter */
  showCount?: boolean;
  /** Makes the input stretch full width of its container. @default true */
  fullWidth?: boolean;
}

export const AXInput = forwardRef<HTMLInputElement, AXInputProps>(
  (
    {
      id,
      label,
      helperText,
      errorMessage,
      error = false,
      startIcon,
      endIcon,
      prefixAddon,
      suffixAddon,
      size = 'md',
      variant = 'outlined',
      clearable = false,
      onClear,
      showPasswordToggle = false,
      showCount = false,
      fullWidth = true,
      type = 'text',
      value,
      defaultValue,
      maxLength,
      onChange,
      disabled = false,
      readOnly = false,
      required = false,
      className = '',
      ...rest
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const isInvalid = Boolean(error || errorMessage);

    // Password visibility toggle state
    const [passwordVisible, setPasswordVisible] = useState(false);
    const isPasswordType = type === 'password';
    const computedType = isPasswordType && passwordVisible ? 'text' : type;

    // Internal value tracking for clearable button and character count
    const [internalValue, setInternalValue] = useState(defaultValue ?? '');
    const currentValue = value !== undefined ? value : internalValue;
    const currentLength = currentValue ? String(currentValue).length : 0;
    const hasValue = currentLength > 0;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (value === undefined) {
        setInternalValue(e.target.value);
      }
      onChange?.(e);
    };

    const handleClear = () => {
      if (value === undefined) {
        setInternalValue('');
      }
      onClear?.();
    };

    return (
      <div
        className={`ax-input-wrapper ax-input-size-${size} ax-input-variant-${variant} ${
          fullWidth ? 'ax-input-full-width' : ''
        } ${disabled ? 'ax-input-disabled' : ''} ${
          isInvalid ? 'ax-input-invalid' : ''
        } ${readOnly ? 'ax-input-readonly' : ''} ${className}`.trim()}
      >
        {label && (
          <label htmlFor={inputId} className="ax-input-label">
            {label}
            {required && <span className="ax-input-required" aria-hidden="true">*</span>}
          </label>
        )}

        <div className="ax-input-outer-container">
          {prefixAddon && <span className="ax-input-addon ax-input-prefix-addon">{prefixAddon}</span>}

          <div className="ax-input-container">
            {startIcon && <span className="ax-input-icon ax-input-start-icon">{startIcon}</span>}

            <input
              ref={ref}
              id={inputId}
              type={computedType}
              value={value}
              defaultValue={defaultValue}
              maxLength={maxLength}
              onChange={handleChange}
              disabled={disabled}
              readOnly={readOnly}
              required={required}
              aria-invalid={isInvalid || undefined}
              className="ax-input-field"
              {...rest}
            />

            {/* Clear Button */}
            {clearable && hasValue && !disabled && !readOnly && (
              <button
                type="button"
                className="ax-input-clear-btn"
                onClick={handleClear}
                aria-label="Clear input value"
                tabIndex={-1}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            )}

            {/* Password Toggle Button */}
            {isPasswordType && showPasswordToggle && !disabled && (
              <button
                type="button"
                className="ax-input-password-toggle"
                onClick={() => setPasswordVisible((prev) => !prev)}
                aria-label={passwordVisible ? 'Hide password' : 'Show password'}
                tabIndex={-1}
              >
                {passwordVisible ? (
                  /* Eye Slash Icon */
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  /* Eye Icon */
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            )}

            {endIcon && !isPasswordType && <span className="ax-input-icon ax-input-end-icon">{endIcon}</span>}
          </div>

          {suffixAddon && <span className="ax-input-addon ax-input-suffix-addon">{suffixAddon}</span>}
        </div>

        {/* Footer info: message on left, character counter on right */}
        <div className="ax-input-footer">
          <div className="ax-input-message-container">
            {errorMessage ? (
              <p className="ax-input-message ax-input-error-message" role="alert">
                {errorMessage}
              </p>
            ) : helperText ? (
              <p className="ax-input-message ax-input-helper-message">{helperText}</p>
            ) : null}
          </div>

          {showCount && (
            <span className="ax-input-count" aria-live="polite">
              {currentLength}
              {maxLength !== undefined && ` / ${maxLength}`}
            </span>
          )}
        </div>
      </div>
    );
  }
);

AXInput.displayName = 'AXInput';
export default AXInput;
