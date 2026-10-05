'use client';

import {
  CSSProperties,
  InputHTMLAttributes,
  JSX,
  useState,
} from 'react';

import '../ax-input-text/ax-input-text.css';
import AXInputLabel from '../ax-input-label/ax-input-label';
import { Icon } from '@/assets/icons';

// region Interfaces
export interface InputPasswordProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
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
  /** Custom end icon */
  propsEndIcon?: JSX.Element;
  /** Displays error styling */
  propsHasError?: boolean;
  /** Error message */
  propsErrorMessage?: string;
  /** Custom class for root component */
  propsClassName?: string;
  /** Custom class for input wrapper */
  propsWrapperClassName?: string;
  /** Custom class for actual input */
  propsInputClassName?: string;
  /** Inline style for root component */
  propsStyle?: CSSProperties;
  /** Input id */
  propsId?: string;
  /** Input name */
  propsName?: string;
  /** Input value */
  propsValue?: string;
  /** Input change handler */
  propsOnChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Input size */
  propsSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Read only input */
  propsReadOnly?: boolean;
}

// region Main Component
export const AXInputPassword = ({
  propsLabel,
  propsMandatory,
  propsPlaceholder,
  propsCurrency,
  propsBadge,
  propsLabelClassName,
  propsLabelStyle,
  propsValue,
  propsOnChange,
  propsStartIcon,
  propsEndIcon,
  propsHasError = false,
  propsErrorMessage = '',
  propsClassName = '',
  propsWrapperClassName = '',
  propsInputClassName = '',
  propsStyle,
  propsSize = 'md',
  propsReadOnly = false,
  propsId,
  propsName,
  ...inputProps
}: InputPasswordProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const defaultEndIcon = (
    <button
      type="button"
      className="ax-input-password-toggle ax-bg-transparent ax-border-none ax-cursor-pointer ax-flex ax-items-center ax-justify-center ax-p-0 ax-m-0"
      onClick={togglePasswordVisibility}
      tabIndex={-1}
      aria-label={showPassword ? 'Hide password' : 'Show password'}
    >
      <Icon
        name={showPassword ? 'eye-slash' : 'eye'}
        className="ax-input-password-icon"
      />
    </button>
  );

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
          propsHtmlFor={propsId}
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
          id={propsId}
          name={propsName}
          className={inputClasses}
          placeholder={propsPlaceholder}
          value={propsValue}
          onChange={propsOnChange}
          readOnly={propsReadOnly}
          type={showPassword ? 'text' : 'password'}
          {...inputProps}
        />

        <span className="ax-input-end-icon">
          {propsEndIcon || defaultEndIcon}
        </span>
      </div>
    </div>
    {propsHasError && <span className="ax-text-xs ax-font-semibold ax-text-red ax-mt-1">{propsErrorMessage}</span>}
    </>
  );
};

export default AXInputPassword;