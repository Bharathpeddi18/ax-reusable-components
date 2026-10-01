'use client';

import {
  CSSProperties,
  InputHTMLAttributes,
  JSX,
  useState,
} from 'react';

import AXInput from '../ax-input-text/ax-input-text';
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
  /** Custom end icon */
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
  propsDisabled,
  propsCurrency,
  propsBadge,
  propsLabelClassName,
  propsLabelStyle,
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
      className="ax-input-password-toggle"
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

  return (
    <AXInput
      type={showPassword ? 'text' : 'password'}
      propsLabel={propsLabel}
      propsMandatory={propsMandatory}
      propsPlaceholder={propsPlaceholder}
      propsDisabled={propsDisabled}
      propsCurrency={propsCurrency}
      propsBadge={propsBadge}
      propsLabelClassName={propsLabelClassName}
      propsLabelStyle={propsLabelStyle}
      propsValue={propsValue}
      propsOnChange={propsOnChange}
      propsStartIcon={propsStartIcon}
      propsEndIcon={propsEndIcon || defaultEndIcon}
      propsHasError={propsHasError}
      propsClassName={propsClassName}
      propsWrapperClassName={propsWrapperClassName}
      propsInputClassName={propsInputClassName}
      propsStyle={propsStyle}
      propsSize={propsSize}
      propsReadOnly={propsReadOnly}
      propsId={propsId}
      propsName={propsName}
      {...inputProps}
    />
  );
};

export default AXInputPassword;