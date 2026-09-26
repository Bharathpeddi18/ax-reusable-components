'use client';
import './ax-input-label.css'

import React, { CSSProperties, ReactNode } from 'react';
import { Icon, IconName } from '@/assets/icons';

// region Interfaces
export interface AXInputLabelProps {
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
  /** Disabled state to mute label appearance */
  propsDisabled?: boolean;

}

// region Main Component
export const AXInputLabel: React.FC<AXInputLabelProps> = (props) => {
  const {
    propsLabel,
    propsHtmlFor,
    propsClassName,
    propsStyle,
    propsId,
    propsMandatory,
    propsCurrency,
    propsBadge,
    propsDisabled,
  } = props;

  const rootClasses = [
    'ax-input-label',
    propsClassName,
    propsDisabled ? 'ax-input-label-disabled' : '',
  ]
    .filter(Boolean)
    .join(' ');

  // region Main Return
  return (
    <label
      id={propsId}
      htmlFor={propsHtmlFor}
      className={rootClasses}
      style={propsStyle}
    >

      {/* Label Text Content */}
      {propsLabel}

      {/* Currency Indicator */}
      {propsCurrency && <span className='ax-input-label-currency'>{propsCurrency}</span>}

      {/* Badge / Count */}
      {propsBadge && <span className='ax-input-label-badge'>{propsBadge}</span>}

      {/* Mandatory Asterisk */}
      {propsMandatory && <span className="ax-input-label-mandatory">*</span>}

    </label>
  );
};

export default AXInputLabel;
