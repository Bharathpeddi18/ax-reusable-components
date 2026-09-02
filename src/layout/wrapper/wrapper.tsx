'use client';

import React from 'react';
import './wrapper.css';

export interface AppWrapperProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const AppWrapper: React.FC<AppWrapperProps> = ({ children, className = '', style }) => {
  return (
    <div className={`ax-app-wrapper ${className}`} style={style}>
      {children}
    </div>
  );
};

export default AppWrapper;