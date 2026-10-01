'use client';

import Icon from '@/assets/icons';
import AXPageHeader from '@/ax-reusable-components/ax-page-header/ax-page-header';
import Announcements from './announcements';

// region Main Page
export default function AnnouncementsPage() {
  return (
    <>
      {/* Top Page Header */}
      <AXPageHeader
        propsPageTitle="Announcements"
        propsLeftContent={
          <div className="ax-flex ax-items-center ax-gap-2.5">
            <span className="ax-flex ax-items-center ax-justify-center ax-h-8 ax-w-8 ax-rounded-lg ax-bg-primary/10 ax-text-primary">
              <Icon name="megaphone" size={18} />
            </span>
            <div className="ax-flex ax-flex-col">
              <h1 className="ax-text-base ax-font-bold ax-text-gray-900" tabIndex={0}>
                Announcements
              </h1>
            </div>
          </div>
        }
      />

      {/* Main Content Area */}
      <main className="ax-p-4 md:ax-p-6">
        <div className="ax-container ax-max-w-5xl ax-mx-auto">
          <Announcements />
        </div>
      </main>
    </>
  );
}
// endregion
