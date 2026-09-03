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
    <header className="ax-page-header ax-flex ax-items-center ax-justify-between ax-px-6 ax-py-3 ax-bg-surface ax-border-b ax-border-default ax-shadow-sm">
      <div className="ax-flex ax-items-center ax-text-lg ax-font-semibold ax-text-primary">
        {title}
      </div>
      <div className="ax-flex ax-items-center ax-gap-3 ax-text-sm ax-text-secondary">
        {actions}
      </div>
    </header>
  );
};

export default AXPageHeader;