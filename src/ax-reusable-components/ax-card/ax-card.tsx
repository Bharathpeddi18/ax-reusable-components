'use client';

import {
  CSSProperties,
  HTMLAttributes,
  ReactNode,
} from 'react';

import './ax-card.css';

// region Types
export type AXCardSize =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl';
// endregion


// region Interfaces
export interface AXCardProps
  extends HTMLAttributes<HTMLDivElement> {

  /** Card size */
  propsSize?: AXCardSize;

  /** Card header content */
  propsHeader?: ReactNode;

  /** Card body content */
  propsBody?: ReactNode;

  /** Card footer content */
  propsFooter?: ReactNode;

  /** Custom class for complete card */
  propsClassName?: string;

  /** Custom class for card header */
  propsHeaderClassName?: string;

  /** Custom class for card body */
  propsBodyClassName?: string;

  /** Custom class for card footer */
  propsFooterClassName?: string;

  /** Inline style for complete card */
  propsStyle?: CSSProperties;

  /** Inline style for card header */
  propsHeaderStyle?: CSSProperties;

  /** Inline style for card body */
  propsBodyStyle?: CSSProperties;

  /** Inline style for card footer */
  propsFooterStyle?: CSSProperties;
}
// endregion


// region Main Component
export const AXCard = ({
  propsSize = 'sm',

  propsHeader,
  propsBody,
  propsFooter,

  propsClassName = '',
  propsHeaderClassName = '',
  propsBodyClassName = '',
  propsFooterClassName = '',

  propsStyle,
  propsHeaderStyle,
  propsBodyStyle,
  propsFooterStyle,

  ...cardProps
}: AXCardProps) => {

  // region Classes
  const cardClassName = [
    'ax-card',
    `ax-card-${propsSize}`,
    propsClassName,
  ]
    .filter(Boolean)
    .join(' ');

  const headerClassName = [
    'ax-card-header',
    propsHeaderClassName,
  ]
    .filter(Boolean)
    .join(' ');

  const bodyClassName = [
    'ax-card-body',
    propsBodyClassName,
  ]
    .filter(Boolean)
    .join(' ');

  const footerClassName = [
    'ax-card-footer',
    propsFooterClassName,
  ]
    .filter(Boolean)
    .join(' ');
  // endregion


  // region Main Return
  return (
    <div
      {...cardProps}
      className={cardClassName}
      style={propsStyle}
    >

      {/* Card Header */}
      {propsHeader && (
        <div
          className={headerClassName}
          style={propsHeaderStyle}
        >
          {propsHeader}
        </div>
      )}


      {/* Card Body */}
      {propsBody && (
        <div
          className={bodyClassName}
          style={propsBodyStyle}
        >
          {propsBody}
        </div>
      )}


      {/* Card Footer */}
      {propsFooter && (
        <div
          className={footerClassName}
          style={propsFooterStyle}
        >
          {propsFooter}
        </div>
      )}

    </div>
  );
  // endregion
};

export default AXCard;