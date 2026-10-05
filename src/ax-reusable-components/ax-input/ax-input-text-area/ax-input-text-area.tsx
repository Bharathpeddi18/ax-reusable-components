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
  propsReadOnly?: boolean;
  propsMandatory?: boolean;
  propsHasError?: boolean;
  propsErrorMessage?: string;
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
  propsReadOnly = false,
  propsMandatory = false,
  propsHasError = false,
  propsErrorMessage = '',
  propsClassName = '',
  propsInputClassName = '',
  propsLabelClassName = '',
  propsStyle,
  propsOnChange,
  ...textAreaProps
}: TextAreaProps) => {
  const rootClassName = [
    'ax-text-area',
    propsReadOnly ? 'ax-text-area-readonly' : '',
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
    <>
    <div className={rootClassName} style={propsStyle}>
      {propsLabel && (
        <AXInputLabel
          propsLabel={propsLabel}
          propsHtmlFor={propsId}
          propsMandatory={propsMandatory}
          propsClassName={propsLabelClassName}
        />
      )}

      <textarea
        {...textAreaProps}
        id={propsId}
        placeholder={propsPlaceholder}
        value={propsValue}
        rows={propsRows}
        maxLength={propsMaxLength}
        readOnly={propsReadOnly}
        onChange={propsOnChange}
        className={inputClassName}
      />
    </div>
    {propsHasError && <span className="ax-text-xs ax-font-semibold ax-text-red ax-mt-1">{propsErrorMessage}</span>}
    </>
  );
};

export const AXInputTextArea = AXTextArea;
export default AXTextArea;