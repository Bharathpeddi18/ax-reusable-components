'use client';

import { AXTabsVertical } from '../../../../ax-reusable-components/ax-tabs-vertical/ax-tabs-vertical';

export default function UserManagement() {
  const contentTabs = [
    { id: 'owner', label: 'Owner', content: <></> },
    { id: 'administrator', label: 'Administrator', content: <></> },
    { id: 'teacher', label: 'Teacher', content: <></> },
    { id: 'student', label: 'Student', content: <></> },
  ];

  return (
    <AXTabsVertical
      propsTabs={contentTabs}
      propsSize="md"
      propsTabClassName='ax-py-3 ax-rounded-lg'
      propsTabsListClassName="ax-p-3 ax-bg-white ax-rounded-xl ax-shadow-md"
      propsContentClassName="ax-ms-3 ax-p-3 ax-bg-white ax-rounded-xl ax-shadow-md"
    />
  );
}
