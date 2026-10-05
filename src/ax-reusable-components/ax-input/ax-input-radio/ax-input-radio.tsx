'use client';

import {
  CSSProperties,
  InputHTMLAttributes,
} from 'react';

import './ax-input-radio.css';
import AXInputLabel from '../ax-input-label/ax-input-label';

// region Types
export type InputRadioLabelPosition = 'before' | 'after';

// region Interfaces
export interface InputRadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Radio label */
  propsLabel: string;
  /** Label position */
  propsLabelPosition?: InputRadioLabelPosition;
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
  /** Error message */
  propsErrorMessage?: string;
  /** Change event */
  propsOnChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  propsId?: string;
  propsMandatory?: boolean;
  propsCurrency?: string;
  propsBadge?: number | string;
  propsChecked?: boolean;
  propsDefaultChecked?: boolean;
  propsReadOnly?: boolean;
  propsName?: string;
  propsValue?: string;
}

// region Main Component
export const AXInputRadio = ({
  propsLabel,
  propsLabelPosition = 'after',
  propsClassName = '',
  propsInputClassName = '',
  propsLabelClassName = '',
  propsStyle,
  propsHasError = false,
  propsErrorMessage = '',
  propsId,
  propsMandatory,
  propsCurrency,
  propsBadge,
  propsChecked,
  propsDefaultChecked,
  propsReadOnly,
  propsName,
  propsValue,
  propsOnChange,
  ...inputProps
}: InputRadioProps) => {
  const rootClassName = [
    'ax-input-radio',
    propsLabelPosition === 'before'
      ? 'ax-input-radio-label-before'
      : 'ax-input-radio-label-after',
    propsReadOnly ? 'ax-input-radio-readonly' : '',
    propsHasError ? 'ax-input-radio-error' : '',
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
        type="radio"
        name={propsName}
        value={propsValue}
        checked={propsChecked}
        defaultChecked={propsDefaultChecked}
        readOnly={propsReadOnly}
        onChange={propsOnChange}
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

export default AXInputRadio;