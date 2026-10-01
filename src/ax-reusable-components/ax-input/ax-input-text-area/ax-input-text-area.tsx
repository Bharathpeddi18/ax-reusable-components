'use client';

import { CSSProperties, TextareaHTMLAttributes } from 'react';
import './ax-input-text-area.css';
import AXInputLabel from '../ax-input-label/ax-input-label';

// region Interfaces
export interface TextAreaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange' | 'value'> {
  propsLabel?: string;
  propsId?: string;
  propsPlaceholder?: string;
  propsValue?: string;
  propsRows?: number;
  propsMaxLength?: number;
  propsDisabled?: boolean;
  propsReadOnly?: boolean;
  propsMandatory?: boolean;
  propsHasError?: boolean;
  propsClassName?: string;
  propsInputClassName?: string;
  propsLabelClassName?: string;
  propsStyle?: CSSProperties;
  propsOnChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

// region Main Component
export const AXTextArea = ({
  propsLabel,
  propsId,
  propsPlaceholder,
  propsValue,
  propsRows = 4,
  propsMaxLength,
  propsDisabled = false,
  propsReadOnly = false,
  propsMandatory = false,
  propsHasError = false,
  propsClassName = '',
  propsInputClassName = '',
  propsLabelClassName = '',
  propsStyle,
  propsOnChange,
  ...textAreaProps
}: TextAreaProps) => {
  const rootClassName = [
    'ax-text-area',
    propsDisabled ? 'ax-text-area-disabled' : '',
    propsHasError ? 'ax-text-area-error' : '',
    propsClassName,
  ]
    .filter(Boolean)
    .join(' ');

  const inputClassName = [
    'ax-text-area-field',
    propsInputClassName,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rootClassName} style={propsStyle}>
      {propsLabel && (
        <AXInputLabel
          propsLabel={propsLabel}
          propsHtmlFor={propsId}
          propsMandatory={propsMandatory}
          propsClassName={propsLabelClassName}
          propsDisabled={propsDisabled}
        />
      )}

      <textarea
        {...textAreaProps}
        id={propsId}
        placeholder={propsPlaceholder}
        value={propsValue}
        rows={propsRows}
        maxLength={propsMaxLength}
        disabled={propsDisabled}
        readOnly={propsReadOnly}
        onChange={propsOnChange}
        className={inputClassName}
      />
    </div>
  );
};

export const AXInputTextArea = AXTextArea;
export default AXTextArea;