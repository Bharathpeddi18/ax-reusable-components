'use client';

import React, { forwardRef } from 'react';

/* ==========================================================================
   Type Definitions
   ========================================================================== */

export type AXButtonVariant =
  | 'contained'
  | 'outlined'
  | 'text'
  | 'soft'
  | 'link';

export type AXButtonColor =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'dark'
  | 'light';

export type AXButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type AXButtonShape = 'rounded' | 'square' | 'circle' | 'pill';

export interface AXButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The visual style variant of the button.
   * @default 'contained'
   */
  variant?: AXButtonVariant;

  /**
   * The color theme from the design token palette.
   * @default 'primary'
   */
  color?: AXButtonColor;

  /**
   * Size presets controlling height, padding, font size, and icon sizing.
   * @default 'md'
   */
  size?: AXButtonSize;

  /**
   * Shape geometry of the button corners.
   * @default 'rounded'
   */
  shape?: AXButtonShape;

  /**
   * Text or content to display inside the button. Can also be passed as `children`.
   * @example <AXButton label="Save Changes" />
   */
  label?: React.ReactNode;

  /**
   * Icon element to display before the label.
   */
  startIcon?: React.ReactNode;

  /**
   * Icon element to display after the label.
   */
  endIcon?: React.ReactNode;

  /**
   * Custom CSS color for icons, overriding the button's default text color.
   */
  iconColor?: string;

  /**
   * When true, applies 1:1 aspect ratio square/circular dimensions for icon-only buttons.
   * Automatically inferred if an icon is provided without a label or children.
   * @default false
   */
  iconOnly?: boolean;

  /**
   * When true, expands the button to 100% width of its parent container.
   * @default false
   */
  fullWidth?: boolean;

  /**
   * When true, disables interactions and renders an accessible animated spinner.
   * Preserves exact button dimensions with zero layout shift (CLS).
   * @default false
   */
  loading?: boolean;

  /**
   * Optional custom text to display while in the loading state.
   */
  loadingText?: React.ReactNode;

  /**
   * If provided, polymorphically renders the button as an `<a>` anchor element.
   * @example <AXButton href="/dashboard" label="Go to Dashboard" />
   */
  href?: string;

  /**
   * Anchor target attribute (e.g., '_blank'). Only used when `href` is defined.
   */
  target?: string;

  /**
   * Anchor rel attribute. Defaults to 'noopener noreferrer' when `target="_blank"`.
   */
  rel?: string;
}

/* ==========================================================================
   Component Implementation
   ========================================================================== */

/**
 * `AXButton` is an enterprise-grade, accessible button component built with
 * zero runtime CSS overhead, full design-token theming, and zero layout-shift loading.
 *
 * @example
 * ```tsx
 * // Contained Primary Button
 * <AXButton color="primary" label="Save Changes" onClick={handleSave} />
 *
 * // Soft Accent Icon Button
 * <AXButton variant="soft" color="accent" startIcon={<PlusIcon />} label="New Project" />
 *
 * // As a Link
 * <AXButton href="/settings" variant="outlined" label="Account Settings" />
 * ```
 */
export const AXButton = forwardRef<HTMLButtonElement, AXButtonProps>(
  (
    {
      children,
      label,
      variant = '',
      color = '',
      size = 'xs',
      shape = 'rounded',
      startIcon,
      endIcon,
      iconColor,
      iconOnly = false,
      fullWidth = false,
      loading = false,
      loadingText,

      disabled = false,
      type = 'button',
      className = '',
      style,
      href,
      target,
      rel,

      ...restProps
    },
    ref
  ) => {
    // 1. Resolve content
    const rawContent = label !== undefined ? label : children;
    const isIconOnly =
      iconOnly || (Boolean(startIcon || endIcon) && rawContent === undefined);

    // 2. Compose BEM CSS classes
    const buttonClasses = [
      'ax-btn',
      `ax-btn-${variant}`,
      `ax-btn-${color}`,
      `ax-btn-${size}`,
      shape !== 'rounded' && `ax-btn-${shape}`,
      isIconOnly && 'ax-btn-icon-only',
      fullWidth && 'ax-btn-full-width',
      loading && 'ax-btn-loading',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // 3. Optional icon styling
    const iconStyle: React.CSSProperties | undefined = iconColor
      ? { color: iconColor }
      : undefined;

    // 4. Render main content elements
    const renderContent = () => (
      <>
        {/* Visible content container (visually hidden during non-text loading to maintain zero CLS) */}
        <span
          className={`ax-btn-content ${loading && !loadingText ? 'ax-btn-content-hidden' : ''}`}
        >
          {startIcon && (
            <span
              className="ax-btn-icon ax-btn-start-icon"
              style={iconStyle}
              aria-hidden="true"
            >
              {startIcon}
            </span>
          )}

          {rawContent !== undefined && rawContent !== null && (
            <span className="ax-btn-label">{rawContent}</span>
          )}

          {endIcon && (
            <span
              className="ax-btn-icon ax-btn-end-icon"
              style={iconStyle}
              aria-hidden="true"
            >
              {endIcon}
            </span>
          )}
        </span>

        {/* Loading Overlay or Inline Loader */}
        {loading && (
          <span className="ax-btn-loader-overlay" aria-hidden="true">
            <span className="ax-btn-loader" />
            {loadingText && (
              <span className="ax-btn-label ax-btn-loading-text">
                {loadingText}
              </span>
            )}
          </span>
        )}
      </>
    );

    // 5. Polymorphic Link Rendering
    if (href) {
      return (
        <a
          ref={ref as unknown as React.Ref<HTMLAnchorElement>}
          href={disabled || loading ? undefined : href}
          target={target}
          rel={target === '_blank' ? (rel ?? 'noopener noreferrer') : rel}
          className={buttonClasses}
          style={style}
          aria-busy={loading || undefined}
          aria-disabled={disabled || loading ? 'true' : undefined}
          tabIndex={disabled || loading ? -1 : undefined}
          {...(restProps as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {renderContent()}
        </a>
      );
    }

    // 6. Standard Button Rendering
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        className={buttonClasses}
        style={style}
        aria-busy={loading || undefined}
        {...restProps}
      >
        {renderContent()}
      </button>
    );
  }
);

AXButton.displayName = 'AXButton';

export default AXButton;