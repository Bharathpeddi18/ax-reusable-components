'use client';

import React, { forwardRef, useState } from 'react';
import Link from 'next/link';
import './ax-button.css';

/* ==========================================================================
   TypeScript Types & Props
   ========================================================================== */

export type AXButtonVariant =
  | 'contained'
  | 'outlined'
  | 'text'
  | 'soft'
  | 'elevated'
  | 'glass'
  | 'solid'
  | 'outline'
  | 'ghost'
  | 'tonal'
  | 'primary'
  | 'secondary'
  | 'danger';

export type AXButtonColor =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'success'
  | 'warning'
  | 'danger'
  | 'destructive'
  | 'info'
  | 'dark'
  | 'light';

export type AXButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type AXButtonShape = 'rounded' | 'pill' | 'square' | 'circle';

export interface AXButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Text or content label for the button */
  label?: React.ReactNode;
  /** Visual variant style */
  variant?: AXButtonVariant;
  /** Semantic color theme */
  color?: AXButtonColor;
  /** Size variant */
  size?: AXButtonSize;
  /** Border radius shape */
  shape?: AXButtonShape;
  /** Icon displayed before the label */
  startIcon?: React.ReactNode;
  /** Icon displayed after the label */
  endIcon?: React.ReactNode;
  /** Shorthand standalone icon */
  icon?: React.ReactNode;
  /** Render as icon-only square/circular button */
  iconOnly?: boolean;
  isIconOnly?: boolean;
  /** Loading state indicator with spinner */
  loading?: boolean;
  isLoading?: boolean;
  /** Optional loading text displayed when loading */
  loadingText?: React.ReactNode;
  /** Position of the loading spinner */
  loadingPosition?: 'start' | 'end' | 'center';
  /** Stretch button to 100% of parent width */
  fullWidth?: boolean;
  /** Enable Material-UI style ripple animation on click */
  ripple?: boolean;
  /** Optional href to render button polymorphically as a Next.js Link */
  href?: string;
  /** Target attribute when href is provided */
  target?: string;
  /** Rel attribute when href is provided */
  rel?: string;
}

/* ==========================================================================
   Helper: Normalize Variant & Color
   ========================================================================== */

function normalizeVariant(variant: AXButtonVariant): string {
  switch (variant) {
    case 'solid':
    case 'primary':
      return 'contained';
    case 'outline':
      return 'outlined';
    case 'ghost':
      return 'text';
    case 'tonal':
      return 'soft';
    default:
      return variant;
  }
}

/* ==========================================================================
   AXButton Component (with forwardRef)
   ========================================================================== */

export const AXButton = forwardRef<HTMLButtonElement, AXButtonProps>(
  (
    {
      id,
      label,
      children,
      variant = 'contained',
      color = 'primary',
      size = 'md',
      shape = 'rounded',
      startIcon,
      endIcon,
      icon,
      iconOnly = false,
      isIconOnly = false,
      loading = false,
      isLoading = false,
      loadingText,
      loadingPosition = 'start',
      fullWidth = false,
      disabled = false,
      ripple = true,
      type = 'button',
      className = '',
      style,
      onClick,
      href,
      target,
      rel,
      ...restProps
    },
    ref
  ) => {
    const isBtnLoading = loading || isLoading;
    const isIconBtn = iconOnly || isIconOnly || (Boolean(icon) && !label && !children);
    const resolvedStartIcon = startIcon || (!isIconBtn && icon ? icon : null);
    const resolvedIconOnly = isIconBtn ? icon || startIcon || endIcon : null;
    const normalizedVariant = normalizeVariant(variant);

    // Ripple effect state
    const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled || isBtnLoading) {
        e.preventDefault();
        return;
      }

      // Trigger ripple if enabled
      if (ripple) {
        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        const diameter = Math.max(rect.width, rect.height);
        const radius = diameter / 2;
        const x = e.clientX - rect.left - radius;
        const y = e.clientY - rect.top - radius;
        const newRipple = { x, y, id: Date.now() };

        setRipples((prev) => [...prev, newRipple]);
        setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
        }, 600);
      }

      onClick?.(e);
    };

    // Construct unified CSS class list
    const buttonClasses = [
      'ax-btn',
      `ax-btn-${normalizedVariant}`,
      `ax-btn-color-${color}`,
      `ax-btn-size-${size}`,
      `ax-btn-shape-${shape}`,
      isIconBtn ? 'ax-btn-icon-only' : '',
      fullWidth ? 'ax-btn-full-width' : '',
      isBtnLoading ? 'ax-btn-loading' : '',
      disabled ? 'ax-btn-disabled' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Spinner element
    const spinnerElement = <span className="ax-btn-spinner" aria-hidden="true" />;

    // Button content composition
    const buttonContent = (
      <>
        {/* Ripple elements */}
        {ripples.map((r) => (
          <span
            key={r.id}
            className="ax-btn-ripple"
            style={{
              top: `${r.y}px`,
              left: `${r.x}px`,
              width: '100px',
              height: '100px',
            }}
          />
        ))}

        {/* Icon Only Content */}
        {isIconBtn ? (
          isBtnLoading ? (
            spinnerElement
          ) : (
            <span className="ax-btn-icon">{resolvedIconOnly || label || children}</span>
          )
        ) : (
          <>
            {/* Start Icon or Loading Spinner */}
            {isBtnLoading && loadingPosition === 'start' && spinnerElement}
            {!isBtnLoading && resolvedStartIcon && (
              <span className="ax-btn-icon ax-btn-icon-start">{resolvedStartIcon}</span>
            )}

            {/* Label / Children */}
            <span className="ax-btn-label">
              {isBtnLoading && loadingText ? loadingText : label || children}
            </span>

            {/* End Icon or Loading Spinner */}
            {isBtnLoading && loadingPosition === 'end' && spinnerElement}
            {!isBtnLoading && endIcon && (
              <span className="ax-btn-icon ax-btn-icon-end">{endIcon}</span>
            )}

            {/* Center Loading Spinner */}
            {isBtnLoading && loadingPosition === 'center' && !loadingText && spinnerElement}
          </>
        )}
      </>
    );

    // Polymorphic Link Rendering
    if (href && !disabled) {
      return (
        <Link
          href={href}
          id={id}
          target={target}
          rel={rel}
          className={buttonClasses}
          style={style}
        >
          {buttonContent}
        </Link>
      );
    }

    // Standard Native Button
    return (
      <button
        ref={ref}
        id={id}
        type={type}
        className={buttonClasses}
        style={style}
        disabled={disabled || isBtnLoading}
        aria-disabled={disabled || isBtnLoading}
        aria-busy={isBtnLoading}
        onClick={handleButtonClick}
        {...restProps}
      >
        {buttonContent}
      </button>
    );
  }
);

AXButton.displayName = 'AXButton';

export default AXButton;
