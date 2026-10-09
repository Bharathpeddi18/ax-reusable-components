'use client';

import { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react';

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// region Interface
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Label displayed on the button, aria-label, title */
  propsLabel: string;

  /** Label classname primarily used to hide label in small resolution */
  propsLabelClassName?: string;

  /** Button size */
  propsSize?: ButtonSize;

  /** Icon displayed before the button text */
  propsStartIcon?: ReactNode;

  /** Icon displayed after the button text */
  propsEndIcon?: ReactNode;

  /** Displays the loading state */
  propsLoading?: boolean;

  /** Displays the loading text */
  propsLoadingText?: string;

  /** Additional CSS class */
  propsClassName?: string;

  /** Inline styles */
  propsStyle?: CSSProperties;

  /** Button disabled state */
  propsDisabled?: boolean;

  /** Button type */
  propsType?: 'button' | 'submit';
}

// region Main Component
export const AXButton = ({
  propsLabel,
  propsLabelClassName,
  propsSize = 'md',
  propsStartIcon,
  propsEndIcon,
  propsLoading = false,
  propsDisabled = false,
  propsType = 'button',
  propsClassName = '',
  ...buttonProps
}: ButtonProps) => {
  const buttonClasses = ['ax-btn', `ax-btn-${propsSize}`, propsClassName]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={propsType}
      aria-label={propsLabel}
      title={propsLabel}
      className={buttonClasses}
      disabled={propsDisabled || propsLoading}
      aria-busy={propsLoading || undefined}
      {...buttonProps}
    >
      {propsLoading ? (
        <span className="ax-btn-loading"></span>
      ) : (
        <>
          {propsStartIcon && (
            <span className="ax-btn-start-icon">{propsStartIcon}</span>
          )}

          <span className={`ax-btn-label ${propsLabelClassName || ''}`.trim()}>
            {propsLabel}
          </span>

          {propsEndIcon && (
            <span className="ax-btn-end-icon">{propsEndIcon}</span>
          )}
        </>
      )}
    </button>
  );
};

export default AXButton;