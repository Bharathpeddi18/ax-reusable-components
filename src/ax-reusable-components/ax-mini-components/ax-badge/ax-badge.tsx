import { ReactNode } from 'react';
import './ax-badge.css';

export interface AXBadgeProps {
  propsLabel: ReactNode;
  propsSize?: 'sm' | 'md' | 'lg';
  propsRadius?: 'sm' | 'md' | 'lg' | 'full';
  propsTheme?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | string;
  propsClassName?: string;
}

export default function AXBadge({
  propsLabel,
  propsSize = 'md',
  propsRadius = 'md',
  propsTheme = 'default',
  propsClassName = '',
}: AXBadgeProps) {
  const themeClass = propsTheme ? `ax-badge-theme-${propsTheme}` : '';

  return (
    <span
      className={`ax-badge ax-badge-${propsSize} ax-badge-radius-${propsRadius} ${themeClass} ${propsClassName}`.trim()}
    >
      {propsLabel}
    </span>
  );
}