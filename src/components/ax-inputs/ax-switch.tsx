'use client';

import React, { forwardRef, useId } from 'react';

/* ==========================================================================
   AstraX (AX) Switch Component - 10/10 Toggle Component
   ========================================================================== */

export type AXSwitchSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AXSwitchColor = 'primary' | 'accent' | 'success' | 'danger' | 'dark';

export interface AXSwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Toggle switch label */
  label?: React.ReactNode;
  /** Description helper text rendered below label */
  description?: React.ReactNode;
  /** Icon rendered inside the thumb when checked */
  checkedIcon?: React.ReactNode;
  /** Icon rendered inside the thumb when unchecked */
  uncheckedIcon?: React.ReactNode;
  /** Loading state flag with micro spinner inside thumb */
  loading?: boolean;
  /** Size preset scaling dimensions. @default 'md' */
  size?: AXSwitchSize;
  /** Color theme accent. @default 'primary' */
  color?: AXSwitchColor;
}

export const AXSwitch = forwardRef<HTMLInputElement, AXSwitchProps>(
  (
    {
      id,
      label,
      description,
      checkedIcon,
      uncheckedIcon,
      loading = false,
      size = 'md',
      color = 'primary',
      checked,
      defaultChecked,
      onChange,
      disabled = false,
      className = '',
      ...rest
    },
    ref
  ) => {
    const generatedId = useId();
    const switchId = id ?? generatedId;
    const isDisabled = disabled || loading;

    return (
      <label
        htmlFor={switchId}
        className={`ax-switch-wrapper ax-switch-size-${size} ax-switch-color-${color} ${
          isDisabled ? 'ax-switch-disabled' : ''
        } ${loading ? 'ax-switch-loading' : ''} ${className}`.trim()}
      >
        <span className="ax-switch-track-container">
          <input
            ref={ref}
            id={switchId}
            type="checkbox"
            role="switch"
            checked={checked}
            defaultChecked={defaultChecked}
            disabled={isDisabled}
            onChange={onChange}
            className="ax-switch-input"
            {...rest}
          />
          <span className="ax-switch-track" aria-hidden="true">
            <span className="ax-switch-thumb">
              {loading ? (
                <span className="ax-switch-spinner">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                    <path d="M12 2a10 10 0 0 1 10 10" />
                  </svg>
                </span>
              ) : (
                <>
                  {checkedIcon && <span className="ax-switch-icon ax-switch-checked-icon">{checkedIcon}</span>}
                  {uncheckedIcon && <span className="ax-switch-icon ax-switch-unchecked-icon">{uncheckedIcon}</span>}
                </>
              )}
            </span>
          </span>
        </span>

        {(label || description) && (
          <span className="ax-switch-text-container">
            {label && <span className="ax-switch-label">{label}</span>}
            {description && <span className="ax-switch-description">{description}</span>}
          </span>
        )}
      </label>
    );
  }
);

AXSwitch.displayName = 'AXSwitch';
export default AXSwitch;
