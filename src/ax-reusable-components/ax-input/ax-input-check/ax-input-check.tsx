'use client';

import {
  CSSProperties,
  InputHTMLAttributes,
} from 'react';

import './ax-input-check.css';
import AXInputLabel from '../ax-input-label/ax-input-label';

// region Types
export type InputCheckLabelPosition = 'before' | 'after';

// region Interfaces
export interface InputCheckProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Checkbox label */
  propsLabel: string;
  /** Label position */
  propsLabelPosition?: InputCheckLabelPosition;
  /** Custom class for root wrapper */
  propsClassName?: string;
  /** Custom class for checkbox */
  propsInputClassName?: string;
  /** Custom class for label */
  propsLabelClassName?: string;
  /** Inline style for root wrapper */
  propsStyle?: CSSProperties;
  /** Displays error styling */
  propsHasError?: boolean;
  /** Error message */
  propsErrorMessage?: string;
  propsOnChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  propsId?: string;
  propsMandatory?: boolean;
  propsCurrency?: string;
  propsBadge?: number | string;
  propsChecked?: boolean;
  propsDefaultChecked?: boolean;
  propsName?: string;
  propsValue?: string;
  propsReadOnly?: boolean;
}

// region Main Component
export const AXInputCheck = ({
  propsLabel,
  propsLabelPosition = 'after',
  propsClassName = '',
  propsInputClassName = '',
  propsLabelClassName = '',
  propsStyle,
  propsHasError = false,
  propsErrorMessage = '',
  propsReadOnly,
  propsId,
  propsMandatory,
  propsCurrency,
  propsBadge,
  propsChecked,
  propsDefaultChecked,
  propsName,
  propsValue,
  propsOnChange,
  ...inputProps
}: InputCheckProps) => {
  const rootClassName = [
    'ax-input-check',
    propsLabelPosition === 'before'
      ? 'ax-input-check-label-before'
      : 'ax-input-check-label-after',
    propsReadOnly ? 'ax-input-check-readonly' : '',
    propsHasError ? 'ax-input-check-error' : '',
    propsClassName,
  ]
    .filter(Boolean)
    .join(' ');

  const inputClassName = [
    'ax-input-check-field',
    propsInputClassName,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <>
    <div className={rootClassName} style={propsStyle}>
      {propsLabelPosition === 'before' && (
        <AXInputLabel
          propsLabel={propsLabel}
          propsHtmlFor={propsId}
          propsMandatory={propsMandatory}
          propsCurrency={propsCurrency}
          propsBadge={propsBadge}
          propsClassName={propsLabelClassName}
        />
      )}

      <input
        {...inputProps}
        id={propsId}
        type="checkbox"
        name={propsName}
        value={propsValue}
        checked={propsChecked}
        defaultChecked={propsDefaultChecked}
        onChange={propsOnChange}
        readOnly={propsReadOnly}
        className={inputClassName}
      />

      {propsLabelPosition === 'after' && (
        <AXInputLabel
          propsLabel={propsLabel}
          propsHtmlFor={propsId}
          propsMandatory={propsMandatory}
          propsCurrency={propsCurrency}
          propsBadge={propsBadge}
          propsClassName={propsLabelClassName}
        />
      )}
    </div>
    {propsHasError && <span className="ax-text-xs ax-font-semibold ax-text-red ax-mt-1">{propsErrorMessage}</span>}
    </>
  );
};

export default AXInputCheck;