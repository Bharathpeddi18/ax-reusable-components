'use client';

import {
  CSSProperties,
  InputHTMLAttributes,
  JSX,
} from 'react';

import './ax-input-text.css';

import AXInputLabel from '../ax-input-label/ax-input-label';

// region Interfaces
export interface AXInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {

  /** Label displayed above the input */
  propsLabel?: string;

  /** Marks label as mandatory */
  propsMandatory?: boolean;

  /** Placeholder text */
  propsPlaceholder?: string;

  /** Disable input */
  propsDisabled?: boolean;

  /** Currency text displayed beside label */
  propsCurrency?: string;

  /** Badge displayed beside label */
  propsBadge?: number | string;

  /** Custom class for label */
  propsLabelClassName?: string;

  /** Inline style for label */
  propsLabelStyle?: CSSProperties;

  /** Icon displayed before the input */
  propsStartIcon?: JSX.Element;

  /** Icon displayed after the input */
  propsEndIcon?: JSX.Element;

  /** Displays error styling */
  propsHasError?: boolean;

  /** Custom class for root component */
  propsClassName?: string;

  /** Custom class for input wrapper */
  propsWrapperClassName?: string;

  /** Custom class for actual input */
  propsInputClassName?: string;

  /** Inline style for root component */
  propsStyle?: CSSProperties;

  /** Input size */
  propsSize?: 'sm' | 'md' | 'lg';

  /** Input value */
  propsValue?: string;

  /** Input change handler */
  propsOnChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

  /** Input auto complete */
  propsAutoComplete?: string;
}
// endregion


// region Main Component
export const AXInput = ({
  propsLabel,
  propsMandatory,
  propsPlaceholder,
  propsDisabled,
  propsCurrency,
  propsBadge,
  propsLabelClassName,
  propsLabelStyle,
  propsAutoComplete,

  propsValue,
  propsOnChange,

  propsStartIcon,
  propsEndIcon,

  propsHasError = false,

  propsClassName = '',
  propsWrapperClassName = '',
  propsInputClassName = '',

  propsStyle,

  propsSize = 'md',

  id,

  ...inputProps
}: AXInputProps) => {

  // region Wrapper Classes
  const wrapperClassName = [
    'ax-input-wrapper',

    `ax-input-${propsSize}`,

    propsStartIcon
      ? 'ax-input-has-start-icon'
      : '',

    propsEndIcon
      ? 'ax-input-has-end-icon'
      : '',

    propsHasError
      ? 'ax-input-error'
      : '',

    propsDisabled
      ? 'ax-input-disabled'
      : '',

    propsWrapperClassName,
  ]
    .filter(Boolean)
    .join(' ');
  // endregion


  // region Root Classes
  const rootClassName = [
    'ax-input-container',
    propsClassName,
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

      {/* Input Label */}
      {propsLabel && (
        <AXInputLabel
          propsLabel={propsLabel}
          propsHtmlFor={id}
          propsMandatory={propsMandatory}
          propsCurrency={propsCurrency}
          propsBadge={propsBadge}
          propsClassName={propsLabelClassName}
          propsStyle={propsLabelStyle}
          propsDisabled={propsDisabled}
        />
      )}


      {/* Input Wrapper */}
      <div className={wrapperClassName}>

        {/* Start Icon */}
        {propsStartIcon && (
          <span className="ax-input-start-icon">
            {propsStartIcon}
          </span>
        )}


        {/* Input */}
        <input
          {...inputProps}
          id={id}
          disabled={propsDisabled}
          placeholder={propsPlaceholder}
          value={propsValue}
          onChange={propsOnChange}
          autoComplete={propsAutoComplete}
          required={propsMandatory}
          className={[
            'ax-input-field',
            propsInputClassName,
          ]
            .filter(Boolean)
            .join(' ')}
        />


        {/* End Icon */}
        {propsEndIcon && (
          <span className="ax-input-end-icon">
            {propsEndIcon}
          </span>
        )}

      </div>

    </div>
  );
};
// endregion

export default AXInput;