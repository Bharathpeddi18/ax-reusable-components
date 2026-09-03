'use client';

import './header.css';

export const Header = () => {
  return (
    <header className="ax-header flex items-center justify-between p-3 bg-surface border-b border-default shadow-sm">
      <div className="flex items-center ms-auto gap-3 text-sm text-secondary font-medium">
        <span>Header Right</span>
      </div>
    </header>
  );
};

export default Header;