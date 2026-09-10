'use client';

import React, { forwardRef, useState, useRef, useEffect, useId } from 'react';

/* ==========================================================================
   AstraX (AX) Textarea Component - 10/10 Multi-Line Input
   ========================================================================== */

export type AXTextareaSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AXTextareaVariant = 'outlined' | 'subtle';
export type AXTextareaResize = 'none' | 'vertical' | 'horizontal' | 'both';

export interface AXTextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  /** Label text or custom element */
  label?: React.ReactNode;
  /** Helper text displayed below */
  helperText?: React.ReactNode;
  /** Error message displayed below (sets invalid state) */
  errorMessage?: React.ReactNode;
  /** Error state flag */
  error?: boolean;
  /** Shows real-time character count indicator */
  showCount?: boolean;
  /** Automatically resize height to fit text content smoothly */
  autoResize?: boolean;
  /** Enables clear button when textarea has content */
  clearable?: boolean;
  /** Callback when clear button is clicked */
  onClear?: () => void;
  /** Size preset scaling padding and font size. @default 'md' */
  size?: AXTextareaSize;
  /** Visual surface variant. @default 'outlined' */
  variant?: AXTextareaVariant;
  /** Resize direction behavior. @default 'vertical' */
  resize?: AXTextareaResize;
  /** Full container width expansion. @default true */
  fullWidth?: boolean;
}

export const AXTextarea = forwardRef<HTMLTextAreaElement, AXTextareaProps>(
  (
    {
      id,
      label,
      helperText,
      errorMessage,
      error = false,
      showCount = false,
      autoResize = false,
      clearable = false,
      onClear,
      size = 'md',
      variant = 'outlined',
      resize = 'vertical',
      fullWidth = true,
      maxLength,
      value: controlledValue,
      defaultValue,
      onChange,
      disabled = false,
      readOnly = false,
      required = false,
      rows = 4,
      className = '',
      ...rest
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const isInvalid = Boolean(error || errorMessage);

    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = useState(defaultValue ?? '');
    const currentValue = isControlled ? controlledValue : internalValue;
    const currentLength = currentValue ? String(currentValue).length : 0;
    const hasValue = currentLength > 0;

    const innerTextareaRef = useRef<HTMLTextAreaElement | null>(null);

    // Sync controlled state
    useEffect(() => {
      if (isControlled) {
        setInternalValue(controlledValue);
      }
    }, [controlledValue, isControlled]);

    // Handle auto-resize height adjustment
    useEffect(() => {
      if (autoResize && innerTextareaRef.current) {
        innerTextareaRef.current.style.height = 'auto';
        innerTextareaRef.current.style.height = `${innerTextareaRef.current.scrollHeight}px`;
      }
    }, [currentValue, autoResize]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (!isControlled) {
        setInternalValue(e.target.value);
      }
      onChange?.(e);
    };

    const handleClear = () => {
      if (!isControlled) {
        setInternalValue('');
      }
      onClear?.();
      if (autoResize && innerTextareaRef.current) {
        innerTextareaRef.current.style.height = 'auto';
      }
    };

    return (
      <div
        className={`ax-textarea-wrapper ax-textarea-size-${size} ax-textarea-variant-${variant} ${
          fullWidth ? 'ax-textarea-full-width' : ''
        } ${disabled ? 'ax-textarea-disabled' : ''} ${
          isInvalid ? 'ax-textarea-invalid' : ''
        } ${readOnly ? 'ax-textarea-readonly' : ''} ${className}`.trim()}
      >
        {label && (
          <label htmlFor={inputId} className="ax-textarea-label">
            {label}
            {required && <span className="ax-textarea-required" aria-hidden="true">*</span>}
          </label>
        )}

        <div className="ax-textarea-container">
          <textarea
            ref={(node) => {
              innerTextareaRef.current = node;
              if (typeof ref === 'function') {
                ref(node);
              } else if (ref) {
                (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
              }
            }}
            id={inputId}
            value={currentValue}
            onChange={handleChange}
            maxLength={maxLength}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            rows={rows}
            aria-invalid={isInvalid || undefined}
            style={{ resize: autoResize ? 'none' : resize }}
            className="ax-textarea-field"
            {...rest}
          />

          {/* Clear button */}
          {clearable && hasValue && !disabled && !readOnly && (
            <button
              type="button"
              className="ax-textarea-clear-btn"
              onClick={handleClear}
              aria-label="Clear textarea"
              tabIndex={-1}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Footer info: message on left, character counter on right */}
        <div className="ax-textarea-footer">
          <div className="ax-textarea-message-container">
            {errorMessage ? (
              <p className="ax-textarea-message ax-textarea-error-message" role="alert">
                {errorMessage}
              </p>
            ) : helperText ? (
              <p className="ax-textarea-message ax-textarea-helper-message">{helperText}</p>
            ) : null}
          </div>

          {showCount && (
            <span className="ax-textarea-count" aria-live="polite">
              {currentLength}
              {maxLength !== undefined && ` / ${maxLength}`}
            </span>
          )}
        </div>
      </div>
    );
  }
);

AXTextarea.displayName = 'AXTextarea';
export default AXTextarea;
