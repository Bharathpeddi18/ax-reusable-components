'use client';

import { AXTabsVertical } from '../../../../ax-reusable-components/ax-tabs-vertical/ax-tabs-vertical';

export default function MetadataManagement() {
  const contentTabs = [
    { id: 'academic-year', label: 'Academic Year', content: <></> },
    { id: 'class', label: 'Class', content: <></> },
    { id: 'Section', label: 'Section', content: <></> },
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
