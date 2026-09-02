'use client';

import React from 'react';
import './header.css';

export interface AppHeaderProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ children, className = '', style }) => {
  return (
    <header className={`ax-app-header ${className}`} style={style}>
      {children}
    </header>
  );
};

export default AppHeader;