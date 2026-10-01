'use client';

import Notifications from "@/components/notifications/notifications";

// region Main Component
export const Header = () => {
  return (
    <header className="ax-header">
      <div className="ax-header-right">
        <div className="ax-d-flex ax-align-items-center">
          <Notifications />
        </div>
      </div>
    </header>
  );
};

export default Header;