'use client';

import React, { useState } from 'react';
import { AXIcon } from '../../assets/icons';

export interface AXAvatarProps {
  src?: string;
  name?: string;
  alt?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'circle' | 'square' | 'rounded';
  status?: 'online' | 'offline' | 'busy' | 'away';
  icon?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const getInitials = (name?: string): string => {
  if (!name) return '';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export const AXAvatar: React.FC<AXAvatarProps> = ({
  src,
  name,
  alt,
  size = 'md',
  shape = 'circle',
  status,
  icon,
  className = '',
  style
}) => {
  const [hasError, setHasError] = useState(false);

  const initials = getInitials(name);
  const showImage = src && !hasError;

  return (
    <div
      className={`ax-avatar ax-avatar-size-${size} ax-avatar-shape-${shape} ${className}`}
      style={style}
      title={name}
      aria-label={name || alt || 'Avatar'}
    >
      {showImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt || name || 'Avatar'}
          className="ax-avatar-image"
          onError={() => setHasError(true)}
        />
      ) : icon ? (
        <span className="ax-avatar-icon">{icon}</span>
      ) : initials ? (
        <span className="ax-avatar-initials">{initials}</span>
      ) : (
        <AXIcon name="user" size={size === 'xs' ? 12 : size === 'sm' ? 14 : size === 'lg' ? 22 : size === 'xl' ? 28 : 18} />
      )}

      {status && <span className={`ax-avatar-status ax-avatar-status-${status}`} />}
    </div>
  );
};

export interface AXAvatarGroupProps {
  max?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const AXAvatarGroup: React.FC<AXAvatarGroupProps> = ({
  max = 4,
  size = 'md',
  children,
  className = '',
  style
}) => {
  const childrenArray = React.Children.toArray(children);
  const visibleAvatars = max ? childrenArray.slice(0, max) : childrenArray;
  const excess = max ? childrenArray.length - max : 0;

  return (
    <div className={`ax-avatar-group ${className}`} style={style}>
      {visibleAvatars.map((child, index) => {
        if (React.isValidElement<AXAvatarProps>(child)) {
          return React.cloneElement(child, {
            size: child.props.size || size,
            key: index
          });
        }
        return child;
      })}
      {excess > 0 && (
        <div className={`ax-avatar ax-avatar-size-${size} ax-avatar-shape-circle ax-avatar-group-excess`}>
          +{excess}
        </div>
      )}
    </div>
  );
};
