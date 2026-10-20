'use client';

import { ReactNode, useState, useEffect } from 'react';

// region Interfaces
export interface TabItem {
  id: string;
  /** Text, icon, badge, or custom JSX */
  label: ReactNode;
  /** Tab content */
  content: ReactNode;
}

export interface TabsVerticalProps {
  propsTabs: TabItem[];
  propsDefaultTab?: string;
  propsSize?: 'sm' | 'md' | 'lg';
  propsClassName?: string;
  propsTabsListClassName?: string;
  propsTabWrapperClassName?: string;
  propsTabClassName?: string;
  propsContentClassName?: string;
  propsOnChange?: (tabId: string) => void;
}

// region Main Component
export function AXTabsVertical({
  propsTabs,
  propsDefaultTab,
  propsSize = 'md',
  propsClassName = '',
  propsTabsListClassName = '',
  propsTabWrapperClassName='',
  propsTabClassName = '',
  propsContentClassName = '',
  propsOnChange,
}: TabsVerticalProps) {
  const [activeTab, setActiveTab] = useState(propsDefaultTab ?? propsTabs[0]?.id);
  const [isMobile, setIsMobile] = useState(false);

  // region Responsive Handler
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize(); // Init on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // region Tab Change
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    propsOnChange?.(tabId);
  };

  // region Active Content
  const activeContent = propsTabs.find((tab) => tab.id === activeTab)?.content;

  // region Render
  return (
    <div className={`ax-tabs-v ${propsClassName}`.trim()}>
      
      {/* Tabs List (Left Side on Desktop, Top/Stacked on Mobile) */}
      <div className={`ax-tabs-v-list ${propsTabsListClassName}`.trim()} role="tablist" aria-orientation="vertical">
        {propsTabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <div key={tab.id} className={`ax-tab-v-wrapper ${propsTabWrapperClassName}`}>
              <button
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`ax-tab-v ax-tab-v-${propsSize} ${isActive ? 'ax-tab-v-active' : ''} ${propsTabClassName}`.trim()}
                onClick={() => handleTabChange(tab.id)}
              >
                {tab.label}
              </button>
              
              {/* Mobile Content (Inline under the tab) */}
              {isMobile && isActive && (
                <div className={`ax-tabs-v-content-mobile ${propsContentClassName}`.trim()} role="tabpanel">
                  {tab.content}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Desktop Content (Right Side container) */}
      {!isMobile && (
        <div className={`ax-tabs-v-content ${propsContentClassName}`.trim()} role="tabpanel">
          {activeContent}
        </div>
      )}

    </div>
  );
}

export default AXTabsVertical;
