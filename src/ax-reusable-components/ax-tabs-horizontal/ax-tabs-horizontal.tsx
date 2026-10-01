'use client';

import { ReactNode, useState } from 'react';
import './ax-tabs-horizontal.css';

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
  propsClassName?: string;
  propsTabClassName?: string;
  propsContentClassName?: string;
  propsOnChange?: (tabId: string) => void;
}

// region Main Component
export function AXTabsHorizontal({
  propsTabs,
  propsDefaultTab,
  propsSize = 'md',
  propsClassName = '',
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
    <div className={`ax-tabs ${propsClassName}`.trim()}>
      {/* Tab List */}
      <div className="ax-tabs-list" role="tablist">
        {propsTabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`ax-tab ax-tab-${propsSize} ${isActive ? 'ax-tab-active' : ''} ${propsTabClassName}`.trim()}
              onClick={() => handleTabChange(tab.id)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className={`ax-tabs-content ${propsContentClassName}`.trim()} role="tabpanel">
        {activeContent}
      </div>
    </div>
  );
}

export default AXTabsHorizontal;