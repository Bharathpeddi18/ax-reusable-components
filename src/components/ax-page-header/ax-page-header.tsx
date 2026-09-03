'use client';

import './ax-page-header.css';

export interface AXPageHeaderProps {
  title?: string;
  actions?: React.ReactNode;
}

export const AXPageHeader = ({
  title = 'Page Header Left',
  actions = 'Page Header Right',
}: AXPageHeaderProps) => {
  return (
    <header className="ax-page-header flex items-center justify-between px-6 py-3 bg-surface border-b border-default shadow-sm">
      <div className="flex items-center text-lg font-semibold text-primary">
        {title}
      </div>
      <div className="flex items-center gap-3 text-sm text-secondary">
        {actions}
      </div>
    </header>
  );
};

export default AXPageHeader;