'use client';

import React from 'react';

export interface AXSkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  lines?: number;
  animation?: 'shimmer' | 'pulse' | 'none';
  className?: string;
  style?: React.CSSProperties;
}

export const AXSkeleton: React.FC<AXSkeletonProps> = ({
  variant = 'text',
  width,
  height,
  lines = 1,
  animation = 'shimmer',
  className = '',
  style
}) => {
  const customStyle: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    ...style
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className={`ax-skeleton-group ${className}`}>
        {Array.from({ length: lines }).map((_, index) => (
          <span
            key={index}
            className={`ax-skeleton ax-skeleton-text ax-skeleton-animation-${animation}`}
            style={{
              width: index === lines - 1 && !width ? '70%' : customStyle.width,
              height: customStyle.height
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <span
      className={`ax-skeleton ax-skeleton-${variant} ax-skeleton-animation-${animation} ${className}`}
      style={customStyle}
    />
  );
};

export const AXSkeletonText: React.FC<{ lines?: number; className?: string }> = ({
  lines = 3,
  className = ''
}) => <AXSkeleton variant="text" lines={lines} className={className} />;
