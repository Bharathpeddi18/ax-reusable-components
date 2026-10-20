'use client';
import './settings.css'

import AXTabsHorizontal from '@/ax-reusable-components/ax-tabs-horizontal/ax-tabs-horizontal';
import ContentManagement from './content-management/content-management';
import Icon from '@/assets/icons';
import AXPageHeader from '@/ax-reusable-components/ax-page-header/ax-page-header';
import MetadataManagement from './metadata-management/metadata-management';
import UserManagement from './user-management/user-management';

export default function SettingsPage() {
  const settingsTabs = [
    {id: 'content-management',label: 'Content Management',content: <ContentManagement />},
    {id: 'metadata-management',label: 'Metadata Management',content: <MetadataManagement />},
    {id: 'user-management',label: 'User Management',content: <UserManagement />}
  ];

  return (
    <>
    <AXPageHeader
        propsPageTitle="Settings"
        propsLeftContent={
          <div className="ax-flex ax-items-center ax-gap-1">
            <Icon name="gear-fill" size={20} className="ax-text-primary" />
            <h2 className="ax-text-lg ax-font-semibold" tabIndex={0}>
              Settings
            </h2>
          </div>
        }
    />
    <main className="ax-container ax-page-settings ax-mt-3">
        <AXTabsHorizontal
            propsTabs={settingsTabs}
            propsTabsListClassName="ax-px-3 ax-py-2 ax-bg-white ax-rounded-xl ax-shadow-md"
            propsTabClassName='ax-rounded-lg'
            propsContentClassName='ax-py-3'
        />
    </main>
    </>
  );
}
