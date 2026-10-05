'use client';

import './ax-input-label.css';
import React, { CSSProperties, ReactNode } from 'react';
import { Icon, IconName } from '@/assets/icons';

// region Interfaces
export interface InputLabelProps {
  /** The text or custom ReactNode content of the label */
  propsLabel: string;
  /** HTML `for` attribute referencing the associated input id */
  propsHtmlFor?: string;
  /** Custom className for the root `<label>` element */
  propsClassName?: string;
  /** Inline CSS styles */
  propsStyle?: CSSProperties;
  /** Element ID */
  propsId?: string;
  /** Aria label */
  'aria-label'?: string;
  /** Marks the input as required / mandatory, rendering a red asterisk */
  propsMandatory?: boolean;
  /** Currency symbol or text to display (e.g. "$", "USD") */
  propsCurrency?: string;
  /** Badge count or badge text */
  propsBadge?: number | string;
  /** Whether to render an informative tooltip / help icon */
  propsHasInfo?: boolean;
  /** Info tooltip text or ReactNode content */
  propsInfoText?: ReactNode;
  /** Name of the icon to use for info (default: 'info-circle') */
  propsInfoIcon?: IconName | string;
  /** Custom className for the info icon container */
  propsInfoClassName?: string;
  /** Tooltip placement position */
  propsInfoPosition?: 'top' | 'bottom' | 'left' | 'right';
}

// region Main Component
export const AXInputLabel: React.FC<InputLabelProps> = (props) => {
  const {
    propsLabel,
    propsHtmlFor,
    propsClassName,
    propsStyle,
    propsId,
    propsMandatory,
    propsCurrency,
    propsBadge,
  } = props;

  const rootClasses = [
    'ax-input-label',
    propsClassName,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <label
      id={propsId}
      htmlFor={propsHtmlFor}
      className={rootClasses}
      style={propsStyle}
    >
      {propsLabel}
      {propsCurrency && (
        <span className="ax-input-label-currency">{propsCurrency}</span>
      )}
      {propsBadge && (
        <span className="ax-input-label-badge">{propsBadge}</span>
      )}
      {propsMandatory && (
        <span className="ax-input-label-mandatory">*</span>
      )}
    </label>
  );
};

export default AXInputLabel;
