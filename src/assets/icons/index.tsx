import React from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  size?: number | string;
  className?: string;
}

/**
 * `Icon` / `AXIcon` renders high-performance SVG icons from the unified SVG Sprite system (`/sprite.svg`).
 * Zero JavaScript bundle bloat, zero CSS-in-JS overhead, full vector scaling.
 */
export const Icon: React.FC<IconProps> = ({
  name,
  size = 18,
  width,
  height,
  className = '',
  style,
  ...rest
}) => {
  const finalWidth = width ?? size;
  const finalHeight = height ?? size;

  return (
    <svg
      width={finalWidth}
      height={finalHeight}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`ax-icon ${className}`.trim()}
      style={{
        display: 'inline-block',
        verticalAlign: 'middle',
        flexShrink: 0,
        ...style,
      }}
      aria-hidden="true"
      {...rest}
    >
      <use href={`/sprite.svg#${name}`} />
    </svg>
  );
};

export const AXIcon = Icon;

/* ==========================================================================
   Convenience Named Icon Components (Using Unified SVG Sprite)
   ========================================================================== */

export type NamedIconProps = Omit<IconProps, 'name'>;

export const IconMenu: React.FC<NamedIconProps> = (props) => <Icon name="bars-3" {...props} />;
export const CheckIcon: React.FC<NamedIconProps> = (props) => <Icon name="check" {...props} />;
export const ArrowRightIcon: React.FC<NamedIconProps> = (props) => <Icon name="arrow-right" {...props} />;
export const ArrowLeftIcon: React.FC<NamedIconProps> = (props) => <Icon name="arrow-left" {...props} />;
export const ArrowDownIcon: React.FC<NamedIconProps> = (props) => <Icon name="arrow-down" {...props} />;
export const ArrowUpIcon: React.FC<NamedIconProps> = (props) => <Icon name="arrow-up" {...props} />;
export const HeartIcon: React.FC<NamedIconProps> = (props) => <Icon name="heart" {...props} />;
export const DownloadIcon: React.FC<NamedIconProps> = (props) => <Icon name="arrow-down-tray" {...props} />;
export const EditIcon: React.FC<NamedIconProps> = (props) => <Icon name="pencil-square" {...props} />;
export const FilterIcon: React.FC<NamedIconProps> = (props) => <Icon name="funnel" {...props} />;
export const PlusIcon: React.FC<NamedIconProps> = (props) => <Icon name="plus" {...props} />;
export const ChevronRightIcon: React.FC<NamedIconProps> = (props) => <Icon name="chevron-right" {...props} />;
export const ChevronDownIcon: React.FC<NamedIconProps> = (props) => <Icon name="chevron-down" {...props} />;
export const ChevronLeftIcon: React.FC<NamedIconProps> = (props) => <Icon name="chevron-left" {...props} />;
export const ChevronUpIcon: React.FC<NamedIconProps> = (props) => <Icon name="chevron-up" {...props} />;
export const SparklesIcon: React.FC<NamedIconProps> = (props) => <Icon name="sparkles" {...props} />;
export const BellIcon: React.FC<NamedIconProps> = (props) => <Icon name="bell" {...props} />;
export const SettingsIcon: React.FC<NamedIconProps> = (props) => <Icon name="cog-6-tooth" {...props} />;
export const DocumentIcon: React.FC<NamedIconProps> = (props) => <Icon name="document-text" {...props} />;
export const ShareIcon: React.FC<NamedIconProps> = (props) => <Icon name="share" {...props} />;
export const CubeIcon: React.FC<NamedIconProps> = (props) => <Icon name="cube" {...props} />;
export const SquaresIcon: React.FC<NamedIconProps> = (props) => <Icon name="squares-2x2" {...props} />;
export const CloseIcon: React.FC<NamedIconProps> = (props) => <Icon name="x-mark" {...props} />;
export const XMarkIcon: React.FC<NamedIconProps> = (props) => <Icon name="x-mark" {...props} />;

export default Icon;