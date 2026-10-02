'use client';

import { CSSProperties, HTMLAttributes, ReactNode } from 'react';

// region Types
export type CardSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// region Interfaces
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Card size */
  propsSize?: CardSize;

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
}: CardProps) => {
  const cardClassName = ['ax-card', `ax-card-${propsSize}`, propsClassName]
    .filter(Boolean)
    .join(' ');

  const headerClassName = ['ax-card-header', propsHeaderClassName]
    .filter(Boolean)
    .join(' ');

  const bodyClassName = ['ax-card-body', propsBodyClassName]
    .filter(Boolean)
    .join(' ');

  const footerClassName = ['ax-card-footer', propsFooterClassName]
    .filter(Boolean)
    .join(' ');

  return (
    <div {...cardProps} className={cardClassName} style={propsStyle}>
      {propsHeader && (
        <div className={headerClassName} style={propsHeaderStyle}>
          {propsHeader}
        </div>
      )}

      {propsBody && (
        <div className={bodyClassName} style={propsBodyStyle}>
          {propsBody}
        </div>
      )}

      {propsFooter && (
        <div className={footerClassName} style={propsFooterStyle}>
          {propsFooter}
        </div>
      )}
    </div>
  );
};

export default AXCard;