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
export interface AXInputPasswordProps
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

  /** Input size */
  propsSize?: 'sm' | 'md' | 'lg';

  /** Input value */
  propsValue?: string;

  /** Input change handler */
  propsOnChange?: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;

  /** Auto complete */
  propsAutoComplete?: string;

  /** Show / hide password icon */
  propsShowVisibilityToggle?: boolean;

  /** Password visible by default */
  propsDefaultVisible?: boolean;
}
// endregion


// region Main Component
export const AXInputPassword = ({
  propsLabel,
  propsMandatory,
  propsPlaceholder = 'Enter password',
  propsDisabled,

  propsCurrency,
  propsBadge,

  propsLabelClassName,
  propsLabelStyle,

  propsStartIcon,

  propsEndIcon,

  propsHasError = false,

  propsClassName = '',
  propsWrapperClassName = '',
  propsInputClassName = '',

  propsStyle,

  propsSize = 'md',

  propsValue,
  propsOnChange,

  propsAutoComplete = 'current-password',

  propsShowVisibilityToggle = true,
  propsDefaultVisible = false,

  ...inputProps
}: AXInputPasswordProps) => {

  // region States
  const [
    isPasswordVisible,
    setIsPasswordVisible,
  ] = useState(propsDefaultVisible);
  // endregion


  // region End Icon
  const passwordEndIcon = propsShowVisibilityToggle ? (
    <button
      type="button"
      className="ax-input-password-toggle"
      onClick={() =>
        setIsPasswordVisible(
          (previousValue) => !previousValue
        )
      }
      disabled={propsDisabled}
      aria-label={
        isPasswordVisible
          ? 'Hide password'
          : 'Show password'
      }
    >
      <Icon
        name={
          isPasswordVisible
            ? 'eye-slash-fill'
            : 'eye-fill'
        }
        width={16}
        height={16}
      />
    </button>
  ) : propsEndIcon;
  // endregion


  // region Main Return
  return (
    <AXInput
      {...inputProps}

      type={
        isPasswordVisible
          ? 'text'
          : 'password'
      }

      propsLabel={propsLabel}

      propsMandatory={propsMandatory}

      propsPlaceholder={propsPlaceholder}

      propsDisabled={propsDisabled}

      propsCurrency={propsCurrency}

      propsBadge={propsBadge}

      propsLabelClassName={propsLabelClassName}

      propsLabelStyle={propsLabelStyle}

      propsStartIcon={propsStartIcon}

      propsEndIcon={passwordEndIcon}

      propsHasError={propsHasError}

      propsClassName={propsClassName}

      propsWrapperClassName={
        propsWrapperClassName
      }

      propsInputClassName={
        propsInputClassName
      }

      propsStyle={propsStyle}

      propsSize={propsSize}

      propsValue={propsValue}

      propsOnChange={propsOnChange}

      propsAutoComplete={
        propsAutoComplete
      }
    />
  );
};
// endregion

export default AXInputPassword;