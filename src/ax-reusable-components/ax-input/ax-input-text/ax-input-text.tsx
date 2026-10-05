'use client';

import { CSSProperties, InputHTMLAttributes, JSX } from 'react';
import './ax-input-text.css';
import AXInputLabel from '../ax-input-label/ax-input-label';

// region Interfaces
export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Label displayed above the input */
  propsLabel?: string;
  /** Marks label as mandatory */
  propsMandatory?: boolean;
  /** Placeholder text */
  propsPlaceholder?: string;
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
  /** Size */
  propsSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Read only input */
  propsReadOnly?: boolean;
  /** Input id */
  propsId?: string;
  /** Input name */
  propsName?: string;
  /** Input value */
  propsValue?: string;
  /** Input change handler */
  propsOnChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Input auto complete */
  propsAutoComplete?: string;
  /** Error message */
  propsErrorMessage?: string;
}

// region Main Component
export const AXInput = ({
  propsLabel,
  propsMandatory,
  propsPlaceholder,
  propsReadOnly,
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
  propsErrorMessage='',
  propsClassName = '',
  propsWrapperClassName = '',
  propsInputClassName = '',
  propsStyle,
  propsSize = 'md',
  id,
  ...inputProps
}: InputProps) => {
  const wrapperClassName = [
    'ax-input-wrapper',
    `ax-input-${propsSize}`,
    propsReadOnly ? 'ax-input-readonly' : '',
    propsHasError ? 'ax-input-error' : '',
    propsWrapperClassName,
  ]
    .filter(Boolean)
    .join(' ');

  const inputClasses = [
    'ax-input-field',
    propsInputClassName,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <>
    <div className={`ax-input-container ${propsClassName}`.trim()} style={propsStyle}>
      {propsLabel && (
        <AXInputLabel
          propsLabel={propsLabel}
          propsHtmlFor={id}
          propsMandatory={propsMandatory}
          propsCurrency={propsCurrency}
          propsBadge={propsBadge}
          propsClassName={propsLabelClassName}
          propsStyle={propsLabelStyle}
        />
      )}

      <div className={wrapperClassName}>
        {propsStartIcon && (
          <span className="ax-input-start-icon">{propsStartIcon}</span>
        )}

        <input
          id={id}
          className={inputClasses}
          placeholder={propsPlaceholder}
          autoComplete={propsAutoComplete}
          value={propsValue}
          onChange={propsOnChange}
          readOnly={propsReadOnly}
          {...inputProps}
        />

        {propsEndIcon && (
          <span className="ax-input-end-icon">{propsEndIcon}</span>
        )}
      </div>
    </div>
    {propsHasError && <span className="ax-text-xs ax-font-semibold ax-text-red ax-mt-1">{propsErrorMessage}</span>}
    </>
  );
};

export const AXInputText = AXInput;
export default AXInput;