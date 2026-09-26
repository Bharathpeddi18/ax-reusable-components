'use client';

import {
  CSSProperties,
  InputHTMLAttributes,
} from 'react';

import './ax-input-date.css';

import AXInputLabel from '../ax-input-label/ax-input-label';

// region Interfaces
export interface AXInputDateProps
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
// endregion


// region Main Component
export const AXInputDate = ({
  propsLabel,

  propsId,

  propsValue,

  propsMinDate,

  propsMaxDate,

  propsMandatory = false,

  propsDisabled = false,

  propsReadOnly = false,

  propsHasError = false,

  propsClassName = '',

  propsInputClassName = '',

  propsLabelClassName = '',

  propsStyle,

  propsOnChange,

  ...inputProps
}: AXInputDateProps) => {

  // region Classes
  const rootClassName = [
    'ax-input-date',

    propsDisabled
      ? 'ax-input-date-disabled'
      : '',

    propsHasError
      ? 'ax-input-date-error'
      : '',

    propsClassName,
  ]
    .filter(Boolean)
    .join(' ');


  const inputClassName = [
    'ax-input-date-field',
    propsInputClassName,
  ]
    .filter(Boolean)
    .join(' ');
  // endregion


  // region Main Return
  return (
    <div
      className={rootClassName}
      style={propsStyle}
    >

      {/* Label */}
      {propsLabel && (
        <AXInputLabel
          propsLabel={propsLabel}
          propsHtmlFor={propsId}
          propsMandatory={propsMandatory}
          propsDisabled={propsDisabled}
          propsClassName={propsLabelClassName}
        />
      )}


      {/* Native Date Input */}
      <input
        {...inputProps}

        id={propsId}

        type="date"

        value={propsValue}

        min={propsMinDate}

        max={propsMaxDate}

        required={propsMandatory}

        disabled={propsDisabled}

        readOnly={propsReadOnly}

        onChange={propsOnChange}

        className={inputClassName}
      />

    </div>
  );
};
// endregion

export default AXInputDate;