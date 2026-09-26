'use client';

import {
  CSSProperties,
  InputHTMLAttributes,
} from 'react';

import './ax-input-radio.css';
import AXInputLabel from '../ax-input-label/ax-input-label';

// region Types
export type AXInputRadioLabelPosition =
  | 'before'
  | 'after';
// endregion


// region Interfaces
export interface AXInputRadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {

  /** Radio label */
  propsLabel: string;

  /** Label position */
  propsLabelPosition?: AXInputRadioLabelPosition;

  /** Custom class for root wrapper */
  propsClassName?: string;

  /** Custom class for radio input */
  propsInputClassName?: string;

  /** Custom class for label */
  propsLabelClassName?: string;

  /** Inline style */
  propsStyle?: CSSProperties;

  /** Error state */
  propsHasError?: boolean;

  /** Change event */
  propsOnChange?: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;

  propsId?: string;

  propsMandatory?: boolean;

  propsCurrency?: string;

  propsBadge?: number | string;

  propsChecked?: boolean;

  propsDefaultChecked?: boolean;

  propsDisabled?: boolean;

  /** Same name groups radio buttons together */
  propsName?: string;

  /** Value represented by this radio */
  propsValue?: string;
}
// endregion


// region Main Component
export const AXInputRadio = ({
  propsLabel,

  propsLabelPosition = 'after',

  propsClassName = '',
  propsInputClassName = '',
  propsLabelClassName = '',

  propsStyle,

  propsHasError = false,

  propsId,
  propsMandatory,
  propsCurrency,
  propsBadge,

  propsChecked,
  propsDefaultChecked,
  propsDisabled,

  propsName,
  propsValue,

  propsOnChange,

  ...inputProps
}: AXInputRadioProps) => {

  // region Classes
  const rootClassName = [
    'ax-input-radio',

    propsLabelPosition === 'before'
      ? 'ax-input-radio-label-before'
      : 'ax-input-radio-label-after',

    propsDisabled
      ? 'ax-input-radio-disabled'
      : '',

    propsHasError
      ? 'ax-input-radio-error'
      : '',

    propsClassName,
  ]
    .filter(Boolean)
    .join(' ');


  const inputClassName = [
    'ax-input-radio-field',
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

      {/* Label Before */}
      {propsLabelPosition === 'before' && 
        <AXInputLabel
          propsLabel={propsLabel}
          propsHtmlFor={propsId}
          propsMandatory={propsMandatory}
          propsCurrency={propsCurrency}
          propsBadge={propsBadge}
          propsClassName={propsLabelClassName}
          propsDisabled={propsDisabled}
        />
      }


      {/* Radio */}
      <input
        {...inputProps}

        id={propsId}
        type="radio"

        name={propsName}
        value={propsValue}

        checked={propsChecked}
        defaultChecked={propsDefaultChecked}

        disabled={propsDisabled}

        onChange={propsOnChange}

        className={inputClassName}
      />


      {/* Label After */}
      {propsLabelPosition === 'after' && 
        <AXInputLabel
          propsLabel={propsLabel}
          propsHtmlFor={propsId}
          propsMandatory={propsMandatory}
          propsCurrency={propsCurrency}
          propsBadge={propsBadge}
          propsClassName={propsLabelClassName}
          propsDisabled={propsDisabled}
        />
      }

    </div>
  );
};
// endregion

export default AXInputRadio;