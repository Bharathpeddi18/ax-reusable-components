'use client';

import {
  CSSProperties,
  InputHTMLAttributes,
} from 'react';

import './ax-input-date.css';
import AXInputLabel from '../ax-input-label/ax-input-label';

// region Interfaces
export interface InputDateProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'type' | 'value' | 'onChange'
  > {
  /** Label */
  propsLabel?: string;
  /** Input id */
  propsId?: string;
  /** Selected date YYYY-MM-DD */
  propsValue?: string;
  /** Minimum date YYYY-MM-DD */
  propsMinDate?: string;
  /** Maximum date YYYY-MM-DD */
  propsMaxDate?: string;
  /** Mandatory */
  propsMandatory?: boolean;
  /** Disabled */
  propsDisabled?: boolean;
  /** Read only */
  propsReadOnly?: boolean;
  /** Error */
  propsHasError?: boolean;
  /** Root class */
  propsClassName?: string;
  /** Input class */
  propsInputClassName?: string;
  /** Label class */
  propsLabelClassName?: string;
  /** Root style */
  propsStyle?: CSSProperties;
  /** Change handler */
  propsOnChange?: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

// region Main Component
export const AXInputDate = ({
  propsLabel,
  propsId,
  propsValue,
  propsMinDate,
  propsMaxDate,
  propsMandatory,
  propsDisabled,
  propsReadOnly,
  propsHasError = false,
  propsClassName = '',
  propsInputClassName = '',
  propsLabelClassName = '',
  propsStyle,
  propsOnChange,
  ...inputProps
}: InputDateProps) => {
  const rootClasses = [
    'ax-input-date',
    propsDisabled ? 'ax-input-date-disabled' : '',
    propsHasError ? 'ax-input-date-error' : '',
    propsClassName,
  ]
    .filter(Boolean)
    .join(' ');

  const inputClasses = [
    'ax-input-date-field',
    propsInputClassName,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rootClasses} style={propsStyle}>
      {propsLabel && (
        <AXInputLabel
          propsLabel={propsLabel}
          propsHtmlFor={propsId}
          propsMandatory={propsMandatory}
          propsClassName={propsLabelClassName}
          propsDisabled={propsDisabled}
        />
      )}

      <div className="ax-input-date-wrapper">
        <input
          {...inputProps}
          id={propsId}
          type="date"
          value={propsValue}
          min={propsMinDate}
          max={propsMaxDate}
          disabled={propsDisabled}
          readOnly={propsReadOnly}
          onChange={propsOnChange}
          className={inputClasses}
        />
      </div>
    </div>
  );
};

export default AXInputDate;