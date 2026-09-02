'use client';

import React from 'react';
import './footer.css';

export interface AppFooterProps {
  children?: React.ReactNode;
  copyrightText?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const AppFooter: React.FC<AppFooterProps> = ({
  children,
  copyrightText = 'AstraX All Rights Reserved.',
  className = '',
  style,
}) => {
  return (
    <footer className={`ax-app-footer ${className}`} style={style}>
      {children || <h4>{copyrightText}</h4>}
    </footer>
  );
};

export default AppFooter;