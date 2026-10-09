'use client';

import React, { useState, useMemo } from 'react';
import { Icon, iconNames } from '@/assets/icons';
import AXPageHeader from '@/ax-reusable-components/ax-page-header/ax-page-header';
import AXButton from '@/ax-reusable-components/ax-button/ax-button';
import AXCard from '@/ax-reusable-components/ax-card/ax-card';

const SIZES = [
  { label: '16px', value: 16 },
  { label: '20px', value: 20 },
  { label: '24px', value: 24 },
  { label: '32px', value: 32 },
];

const QUICK_FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'Fill Icons', value: 'fill' },
  { label: 'Outline Only', value: 'outline' },
  { label: 'Arrows', value: 'arrow' },
  { label: 'People / Users', value: 'person' },
  { label: 'Files / Docs', value: 'file' },
  { label: 'Calendar / Time', value: 'calendar' },
];

export default function IconsGalleryPage() {
  const [search, setSearch] = useState('');
  const [selectedSize, setSelectedSize] = useState(20);
  const [filterType, setFilterType] = useState('all');
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [copyMode, setCopyMode] = useState<'name' | 'jsx'>('jsx');
  const [displayCount, setDisplayCount] = useState(240);

  // Filtered icon list
  const filteredIcons = useMemo(() => {
    const query = search.trim().toLowerCase();
    return iconNames.filter((name) => {
      // Filter by quick category
      if (filterType === 'fill' && !name.includes('fill')) return false;
      if (filterType === 'outline' && name.includes('fill')) return false;
      if (filterType === 'arrow' && !name.includes('arrow')) return false;
      if (
        filterType === 'person' &&
        !name.includes('person') &&
        !name.includes('people') &&
        !name.includes('user')
      )
        return false;
      if (
        filterType === 'file' &&
        !name.includes('file') &&
        !name.includes('document') &&
        !name.includes('folder')
      )
        return false;
      if (
        filterType === 'calendar' &&
        !name.includes('calendar') &&
        !name.includes('clock') &&
        !name.includes('alarm') &&
        !name.includes('time')
      )
        return false;

      // Filter by search text
      if (!query) return true;
      return name.toLowerCase().includes(query);
    });
  }, [search, filterType]);

  const visibleIcons = useMemo(() => {
    return filteredIcons.slice(0, displayCount);
  }, [filteredIcons, displayCount]);

  const handleCopy = (iconName: string) => {
    const textToCopy =
      copyMode === 'jsx' ? `<Icon name="${iconName}" size={${selectedSize}} />` : iconName;
    navigator.clipboard.writeText(textToCopy);
    setCopiedItem(iconName);
    setTimeout(() => {
      setCopiedItem((prev) => (prev === iconName ? null : prev));
    }, 2000);
  };

  return (
    <>
      <AXPageHeader
        propsPageTitle="Icon Gallery"
        propsLeftContent={
          <div className="ax-flex ax-items-center ax-gap-3">
            <h2 className="ax-text-base ax-font-semibold ax-text-gray-900" tabIndex={0}>
              Icon Explorer
            </h2>
            <span className="ax-text-xs ax-font-medium ax-bg-blue-50 ax-text-primary ax-px-2.5 ax-py-0.5 ax-rounded-full">
              {filteredIcons.length.toLocaleString()} Icons
            </span>
          </div>
        }
        propsRightContent={
          <div className="ax-flex ax-items-center ax-gap-2">
            <span className="ax-text-xs ax-text-gray-500">Copy format:</span>
            <div className="ax-inline-flex ax-rounded-md ax-shadow-xs ax-bg-gray-100 ax-p-0.5">
              <button
                type="button"
                onClick={() => setCopyMode('jsx')}
                className={`ax-px-2.5 ax-py-1 ax-text-xs ax-font-medium ax-rounded ax-cursor-pointer ax-transition-colors ${copyMode === 'jsx'
                    ? 'ax-bg-white ax-text-primary ax-shadow-xs'
                    : 'ax-text-gray-600 hover:ax-text-gray-900'
                  }`}
              >
                JSX Component
              </button>
              <button
                type="button"
                onClick={() => setCopyMode('name')}
                className={`ax-px-2.5 ax-py-1 ax-text-xs ax-font-medium ax-rounded ax-cursor-pointer ax-transition-colors ${copyMode === 'name'
                    ? 'ax-bg-white ax-text-primary ax-shadow-xs'
                    : 'ax-text-gray-600 hover:ax-text-gray-900'
                  }`}
              >
                Icon Name Only
              </button>
            </div>
          </div>
        }
      />

      <main className="ax-p-4 md:ax-p-6">
        <div className="ax-container ax-flex ax-flex-col ax-gap-4">
          {/* Filter and Control Bar Card */}
          <AXCard
            propsSize="sm"
            propsBody={
              <div className="ax-flex ax-flex-col ax-gap-3">
                {/* Search Bar & Size Selector */}
                <div className="ax-flex ax-flex-col md:ax-flex-row ax-gap-3 ax-items-stretch md:ax-items-center ax-justify-between">
                  {/* Search Box */}
                  <div className="ax-relative ax-flex-1" style={{ maxWidth: '480px' }}>
                    <div className="ax-absolute ax-inset-y-0 ax-left-0 ax-pl-3 ax-flex ax-items-center ax-pointer-events-none ax-text-gray-400">
                      <Icon name="search" size={16} />
                    </div>
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => {
                        setSearch(e.target.value);
                        setDisplayCount(240);
                      }}
                      placeholder="Search icons (e.g. house, user, check, calendar, bell)..."
                      className="ax-w-full ax-pl-9 ax-pr-9 ax-py-1.5 ax-text-sm ax-bg-white ax-border ax-border-gray-300 ax-rounded-md focus:ax-outline-none focus:ax-ring-2 focus:ax-ring-primary focus:ax-border-transparent"
                    />
                    {search && (
                      <button
                        type="button"
                        onClick={() => setSearch('')}
                        className="ax-absolute ax-inset-y-0 ax-right-0 ax-pr-3 ax-flex ax-items-center ax-text-gray-400 hover:ax-text-gray-600 ax-cursor-pointer"
                        title="Clear search"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  {/* Size Controller */}
                  <div className="ax-flex ax-items-center ax-gap-2">
                    <span className="ax-text-xs ax-text-gray-500 ax-font-medium">Size:</span>
                    <div className="ax-inline-flex ax-rounded-md ax-bg-gray-100 ax-p-0.5">
                      {SIZES.map((size) => (
                        <button
                          key={size.value}
                          type="button"
                          onClick={() => setSelectedSize(size.value)}
                          className={`ax-px-2.5 ax-py-1 ax-text-xs ax-font-medium ax-rounded ax-cursor-pointer ax-transition-colors ${selectedSize === size.value
                              ? 'ax-bg-white ax-text-primary ax-shadow-xs'
                              : 'ax-text-gray-600 hover:ax-text-gray-900'
                            }`}
                        >
                          {size.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Category Chips */}
                <div className="ax-flex ax-flex-wrap ax-items-center ax-gap-1-5 ax-pt-2 ax-border-t ax-border-gray-100">
                  <span className="ax-text-xs ax-text-gray-400 ax-mr-1">Category:</span>
                  {QUICK_FILTERS.map((chip) => (
                    <button
                      key={chip.value}
                      type="button"
                      onClick={() => {
                        setFilterType(chip.value);
                        setDisplayCount(240);
                      }}
                      className={`ax-px-2.5 ax-py-0.5 ax-text-xs ax-font-medium ax-rounded-full ax-cursor-pointer ax-transition-all ${filterType === chip.value
                          ? 'ax-bg-primary ax-text-white'
                          : 'ax-bg-gray-100 ax-text-gray-600 hover:ax-bg-gray-200'
                        }`}
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              </div>
            }
          />

          {/* Floating Copy Feedback Banner */}
          {copiedItem && (
            <div className="ax-fixed ax-bottom-6 ax-right-6 ax-z-50 ax-bg-gray-900 ax-text-white ax-px-4 ax-py-2.5 ax-rounded-lg ax-shadow-lg ax-flex ax-items-center ax-gap-2 ax-animate-bounce">
              <Icon name="check-circle-fill" size={16} className="ax-text-green-400" />
              <span className="ax-text-xs ax-font-medium">
                Copied <strong>{copyMode === 'jsx' ? `<Icon name="${copiedItem}" />` : copiedItem}</strong> to clipboard!
              </span>
            </div>
          )}

          {/* Compact 12-Column Icons Grid */}
          {filteredIcons.length > 0 ? (
            <>
              <div className="ax-grid ax-grid-cols-4 sm:ax-grid-cols-6 md:ax-grid-cols-8 lg:ax-grid-cols-10 xl:ax-grid-cols-12 ax-gap-2">
                {visibleIcons.map((iconName) => {
                  const isCopied = copiedItem === iconName;

                  return (
                    <button
                      key={iconName}
                      type="button"
                      onClick={() => handleCopy(iconName)}
                      className={`ax-group ax-flex ax-flex-col ax-items-center ax-justify-center ax-p-2 ax-rounded-md ax-border ax-cursor-pointer ax-transition-all ax-text-left ${isCopied
                          ? 'ax-bg-green-50 ax-border-green-400 ax-scale-105'
                          : 'ax-bg-white ax-border-gray-200 hover:ax-border-primary hover:ax-shadow-sm hover:ax-bg-blue-50/40'
                        }`}
                      title={`${iconName}\nClick to copy: ${copyMode === 'jsx' ? `<Icon name="${iconName}" />` : iconName}`}
                    >
                      {/* Icon Display Area */}
                      <div
                        className="ax-flex ax-items-center ax-justify-center ax-text-gray-700 group-hover:ax-text-primary ax-transition-colors"
                        style={{ height: '36px', width: '36px' }}
                      >
                        <Icon name={iconName} size={selectedSize} />
                      </div>

                      {/* Icon Name */}
                      <span
                        className="ax-mt-1 ax-text-[11px] ax-text-center ax-font-medium ax-text-gray-600 group-hover:ax-text-primary ax-truncate ax-w-full"
                        title={iconName}
                      >
                        {iconName}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Load More Button if results exceed display count */}
              {displayCount < filteredIcons.length && (
                <div className="ax-flex ax-justify-center ax-py-4">
                  <AXButton
                    propsLabel={`Load More (${filteredIcons.length - displayCount} remaining)`}
                    propsSize="xs"
                    propsClassName="ax-bg-primary ax-text-white ax-rounded-md"
                    onClick={() => setDisplayCount((prev) => prev + 240)}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="ax-p-12 ax-text-center ax-bg-white ax-rounded-lg ax-border ax-border-gray-200">
              <Icon name="search" size={32} className="ax-text-gray-300 ax-mx-auto ax-mb-3" />
              <h3 className="ax-text-sm ax-font-semibold ax-text-gray-700">No icons found</h3>
              <p className="ax-text-xs ax-text-gray-500 ax-mt-1">
                No icons matched &quot;{search}&quot;. Try a different search term or category.
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
