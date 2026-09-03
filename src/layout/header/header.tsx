'use client';

import './header.css';

export const Header = () => {
  return (
    <header className="ax-header ax-flex ax-items-center ax-justify-between ax-p-3 ax-bg-surface ax-border-b ax-border-default ax-shadow-sm">
      <div className="ax-flex ax-items-center ax-ms-auto ax-gap-3 ax-text-sm ax-text-secondary ax-font-medium">
        <span>Header Right</span>
      </div>
    </header>
  );
};

export default Header;