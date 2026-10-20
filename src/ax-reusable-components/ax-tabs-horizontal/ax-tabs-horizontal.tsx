'use client';

import { ReactNode, useState } from 'react';

// region Interfaces
export interface TabItem {
  id: string;
  /** Text, icon, badge, or custom JSX */
  label: ReactNode;
  /** Tab content */
  content: ReactNode;
}

export interface TabsProps {
  propsTabs: TabItem[];
  propsDefaultTab?: string;
  propsSize?: 'sm' | 'md' | 'lg';
  propsTabsClassName?: string;
  propsTabsListClassName?: string;
  propsTabClassName?: string;
  propsContentClassName?: string;
  propsOnChange?: (tabId: string) => void;
}

// region Main Component
export function AXTabsHorizontal({
  propsTabs,
  propsDefaultTab,
  propsSize = 'md',
  propsTabsClassName = '',
  propsTabsListClassName= '',
  propsTabClassName = '',
  propsContentClassName = '',
  propsOnChange,
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(
    propsDefaultTab ?? propsTabs[0]?.id
  );

  // region Tab Change
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    propsOnChange?.(tabId);
  };

  // region Active Content
  const activeContent = propsTabs.find((tab) => tab.id === activeTab)?.content;

  // region Render
  return (
    <div className={`ax-tabs-h ${propsTabsClassName}`.trim()}>
      {/* Tab List */}
      <div className={`ax-tabs-h-list ${propsTabsListClassName}`.trim()} role="tablist">
        {propsTabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`ax-tab-h ax-tab-h-${propsSize} ${isActive ? 'ax-tab-h-active' : ''} ${propsTabClassName}`.trim()}
              onClick={() => handleTabChange(tab.id)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className={`ax-tabs-h-content ${propsContentClassName}`.trim()} role="tabpanel">
        {activeContent}
      </div>
    </div>
  );
}

export default AXTabsHorizontal;