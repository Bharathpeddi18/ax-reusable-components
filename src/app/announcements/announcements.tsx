'use client';

import React, { useMemo, useState } from 'react';
import Icon from '@/assets/icons';
import { Announcement, initialAnnouncements } from './sample-data';
import './announcements.css';

// region Category Helpers
const categoryColors: Record<string, string> = {
  Academic: 'ax-badge-academic',
  Examination: 'ax-badge-examination',
  Event: 'ax-badge-event',
  Holiday: 'ax-badge-holiday',
  General: 'ax-badge-general',
};

// Format date into human-readable format and relative label
function formatDateTime(isoString: string): { formatted: string; relative: string } {
  try {
    const date = new Date(isoString);
    const now = new Date('2026-09-30T16:00:00Z'); // Reference time
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    let relative = '';
    if (diffDays === 0) relative = 'Today';
    else if (diffDays === 1) relative = 'Yesterday';
    else if (diffDays > 1 && diffDays < 7) relative = `${diffDays} days ago`;
    else relative = `${Math.floor(diffDays / 7)}w ago`;

    const options: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
    const formatted = date.toLocaleDateString('en-US', options);

    return { formatted, relative };
  } catch {
    return { formatted: isoString, relative: '' };
  }
}

// Get initials from author name for avatar fallback
function getInitials(name: string): string {
  if (!name) return 'A';
  const parts = name.split(' ').filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
// endregion

// region Main Component
export default function Announcements() {
  const [announcements] = useState<Announcement[]>(initialAnnouncements);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [bookmarkedIds, setBookmarkedIds] = useState<Record<string, boolean>>({});

  // Categories list with counts
  const categories = ['All', 'Examination', 'Event', 'Academic', 'Holiday', 'General'];

  // Toggle bookmark
  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Filtered & Sorted Announcements (Chronological)
  const filteredAnnouncements = useMemo(() => {
    return announcements
      .filter((item) => {
        // Category filter
        if (selectedCategory !== 'All' && item.category !== selectedCategory) {
          return false;
        }

        // Search query filter (title, content, author, audience)
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          const matchTitle = item.title.toLowerCase().includes(query);
          const matchAuthor = item.createdBy.name.toLowerCase().includes(query);
          const matchAudience = item.targetAudience.toLowerCase().includes(query);
          const matchContent = item.contentHtml.toLowerCase().includes(query);

          return matchTitle || matchAuthor || matchAudience || matchContent;
        }

        return true;
      })
      .sort((a, b) => {
        const timeA = new Date(a.createdAt).getTime();
        const timeB = new Date(b.createdAt).getTime();

        // Pinned items stay at top when sorted by newest
        if (sortOrder === 'newest') {
          if (a.isPinned && !b.isPinned) return -1;
          if (!a.isPinned && b.isPinned) return 1;
          return timeB - timeA; // Newest first
        } else {
          return timeA - timeB; // Oldest first
        }
      });
  }, [announcements, selectedCategory, searchQuery, sortOrder]);

  return (
    <div className="ax-announcements-container">
      {/* Search & Filter Controls Header */}
      <div className="ax-flex ax-flex-col md:ax-flex-row ax-items-stretch md:ax-items-center ax-justify-between ax-gap-3 ax-bg-white ax-p-4 ax-rounded-xl ax-border ax-border-gray-200 ax-shadow-xs">
        {/* Search Bar */}
        <div className="ax-relative ax-flex-1 ax-max-w-md">
          <span className="ax-absolute ax-left-3 ax-top-1/2 -ax-translate-y-1/2 ax-text-gray-400 ax-pointer-events-none">
            <Icon name="search" size={16} />
          </span>
          <input
            type="text"
            placeholder="Search announcements by title, content, or author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="ax-w-full ax-pl-9 ax-pr-8 ax-py-2 ax-text-sm ax-bg-gray-50 ax-border ax-border-gray-200 ax-rounded-lg focus:ax-bg-white focus:ax-border-primary focus:ax-outline-none ax-transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="ax-absolute ax-right-2.5 ax-top-1/2 -ax-translate-y-1/2 ax-text-gray-400 hover:ax-text-gray-600 ax-p-1"
              title="Clear search"
            >
              <Icon name="x-lg" size={12} />
            </button>
          )}
        </div>

        {/* Sort & Action Controls */}
        <div className="ax-flex ax-items-center ax-gap-2">
          <div className="ax-flex ax-items-center ax-gap-1-5 ax-text-xs ax-font-medium ax-text-gray-500">
            <Icon name="arrow-down-up" size={14} />
            <span>Sort:</span>
          </div>

          <button
            onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
            className="ax-flex ax-items-center ax-gap-1-5 ax-px-3 ax-py-1.5 ax-text-xs ax-font-semibold ax-text-gray-700 ax-bg-gray-100 hover:ax-bg-gray-200 ax-rounded-lg ax-transition-colors"
            title="Toggle chronological sort order"
          >
            {sortOrder === 'newest' ? 'Newest First' : 'Oldest First'}
            <Icon name={sortOrder === 'newest' ? 'arrow-down' : 'arrow-up'} size={12} />
          </button>
        </div>
      </div>

      {/* Category Pills Tabs */}
      <div className="ax-flex ax-items-center ax-gap-2 ax-overflow-x-auto ax-pb-1">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          const count =
            cat === 'All'
              ? announcements.length
              : announcements.filter((a) => a.category === cat).length;

          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`ax-flex ax-items-center ax-gap-1-5 ax-px-3.5 ax-py-1.5 ax-rounded-full ax-text-xs ax-font-semibold ax-whitespace-nowrap ax-transition-all ${isSelected
                  ? 'ax-bg-primary ax-text-white ax-shadow-xs'
                  : 'ax-bg-white ax-text-gray-600 hover:ax-bg-gray-100 ax-border ax-border-gray-200'
                }`}
            >
              <span>{cat}</span>
              <span
                className={`ax-px-1.5 ax-py-0.2 ax-rounded-full ax-text-2xs ${isSelected ? 'ax-bg-white/20 ax-text-white' : 'ax-bg-gray-100 ax-text-gray-500'
                  }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Announcements List */}
      {filteredAnnouncements.length === 0 ? (
        /* Empty State */
        <div className="ax-flex ax-flex-col ax-items-center ax-justify-center ax-py-16 ax-bg-white ax-rounded-xl ax-border ax-border-gray-200 ax-text-center">
          <div className="ax-h-12 ax-w-12 ax-rounded-full ax-bg-gray-100 ax-flex ax-items-center ax-justify-center ax-text-gray-400 ax-mb-3">
            <Icon name="megaphone" size={24} />
          </div>
          <h3 className="ax-text-base ax-font-bold ax-text-gray-800">No Announcements Found</h3>
          <p className="ax-text-xs ax-text-gray-500 ax-mt-1 ax-max-w-xs">
            {searchQuery
              ? `No announcements matched your search for "${searchQuery}".`
              : 'There are currently no announcements in this category.'}
          </p>
          {(searchQuery || selectedCategory !== 'All') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="ax-mt-4 ax-px-3 ax-py-1.5 ax-text-xs ax-font-semibold ax-text-primary ax-bg-primary-50 hover:ax-bg-primary-100 ax-rounded-lg ax-transition-colors"
            >
              Reset Filters
            </button>
          )}
        </div>
      ) : (
        /* Cards in Chronological Order */
        <div className="ax-flex ax-flex-col ax-gap-4">
          {filteredAnnouncements.map((item) => {
            const { formatted, relative } = formatDateTime(item.createdAt);
            const isBookmarked = !!bookmarkedIds[item.id];

            return (
              <article
                key={item.id}
                className={`ax-announcement-card ax-flex ax-flex-col ax-gap-3.5 ${item.isPinned ? 'ax-announcement-card-pinned' : ''
                  }`}
              >
                {/* Header Meta: Category, Priority, Pinned, Date & Actions */}
                <div className="ax-flex ax-items-center ax-justify-between ax-flex-wrap ax-gap-2">
                  <div className="ax-flex ax-items-center ax-flex-wrap ax-gap-2">
                    {/* Pinned Pill */}
                    {item.isPinned && (
                      <span className="ax-flex ax-items-center ax-gap-1 ax-px-2 ax-py-0.5 ax-rounded-md ax-text-2xs ax-font-bold ax-bg-primary/10 ax-text-primary ax-border ax-border-primary/20">
                        <Icon name="pin-angle-fill" size={11} />
                        PINNED
                      </span>
                    )}

                    {/* Category Badge */}
                    <span
                      className={`ax-px-2.5 ax-py-0.5 ax-rounded-md ax-text-xs ax-font-semibold ${categoryColors[item.category] || 'ax-badge-general'
                        }`}
                    >
                      {item.category}
                    </span>

                    {/* Priority Badge */}
                    {item.priority === 'urgent' && (
                      <span className="ax-flex ax-items-center ax-gap-1 ax-px-2 ax-py-0.5 ax-rounded-md ax-text-xs ax-font-bold ax-bg-red-100 ax-text-red-700 ax-border ax-border-red-200">
                        <Icon name="exclamation-circle-fill" size={12} />
                        Urgent
                      </span>
                    )}

                    {item.priority === 'high' && (
                      <span className="ax-flex ax-items-center ax-gap-1 ax-px-2 ax-py-0.5 ax-rounded-md ax-text-xs ax-font-semibold ax-bg-amber-100 ax-text-amber-800 ax-border ax-border-amber-200">
                        High Priority
                      </span>
                    )}
                  </div>

                  {/* Right: Date and Bookmark action */}
                  <div className="ax-flex ax-items-center ax-gap-3">
                    <span
                      className="ax-text-xs ax-text-gray-500 ax-flex ax-items-center ax-gap-1"
                      title={formatted}
                    >
                      <Icon name="clock" size={13} className="ax-text-gray-400" />
                      <span>{relative ? `${relative} • ${formatted}` : formatted}</span>
                    </span>

                    <button
                      onClick={() => toggleBookmark(item.id)}
                      className={`ax-p-1 ax-rounded-md hover:ax-bg-gray-100 ax-transition-colors ${isBookmarked ? 'ax-text-primary' : 'ax-text-gray-400'
                        }`}
                      title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Announcement'}
                      aria-label="Bookmark"
                    >
                      <Icon name={isBookmarked ? 'bookmark-fill' : 'bookmark'} size={15} />
                    </button>
                  </div>
                </div>

                {/* Announcement Title (Primary Color) */}
                <h2 className="ax-text-lg md:ax-text-xl ax-font-bold ax-text-primary ax-leading-snug ax-tracking-tight">
                  {item.title}
                </h2>

                {/* Announcement Description (Rich Text Read-Only) */}
                <div
                  className="ax-announcement-rich-text"
                  dangerouslySetInnerHTML={{ __html: item.contentHtml }}
                />

                {/* Attachments (if available) */}
                {item.attachments && item.attachments.length > 0 && (
                  <div className="ax-flex ax-flex-wrap ax-items-center ax-gap-2 ax-pt-1">
                    <span className="ax-text-xs ax-font-semibold ax-text-gray-500 ax-flex ax-items-center ax-gap-1">
                      <Icon name="paperclip" size={13} />
                      Attachments:
                    </span>
                    {item.attachments.map((file, idx) => (
                      <button
                        key={idx}
                        className="ax-attachment-chip"
                        onClick={() => alert(`Downloading attachment: ${file.name}`)}
                        title={`Download ${file.name} (${file.size})`}
                      >
                        <Icon
                          name={
                            file.type === 'pdf'
                              ? 'file-earmark-pdf-fill'
                              : file.type === 'excel'
                                ? 'file-earmark-excel-fill'
                                : 'file-earmark-text-fill'
                          }
                          size={14}
                          className={
                            file.type === 'pdf'
                              ? 'ax-text-red-600'
                              : file.type === 'excel'
                                ? 'ax-text-green-600'
                                : 'ax-text-blue-600'
                          }
                        />
                        <span className="ax-truncate ax-max-w-xs">{file.name}</span>
                        <span className="ax-text-gray-400 ax-font-normal">({file.size})</span>
                        <Icon name="download" size={12} className="ax-text-gray-400 ax-ml-0.5" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Properties Bar (Created By / Created At / Target Audience) */}
                <div className="ax-border-t ax-border-gray-100 ax-pt-3 ax-mt-1 ax-flex ax-flex-col sm:ax-flex-row sm:ax-items-center ax-justify-between ax-gap-3">
                  {/* Created By Author */}
                  <div className="ax-flex ax-items-center ax-gap-2.5">
                    {item.createdBy.avatar ? (
                      <img
                        src={item.createdBy.avatar}
                        alt={item.createdBy.name}
                        className="ax-h-8 ax-w-8 ax-rounded-full ax-object-cover ax-border ax-border-gray-200"
                      />
                    ) : (
                      <div className="ax-h-8 ax-w-8 ax-rounded-full ax-bg-primary/10 ax-text-primary ax-flex ax-items-center ax-justify-center ax-text-xs ax-font-bold">
                        {getInitials(item.createdBy.name)}
                      </div>
                    )}
                    <div className="ax-flex ax-flex-col">
                      <span className="ax-text-xs ax-font-bold ax-text-gray-900">
                        {item.createdBy.name}
                      </span>
                      <span className="ax-text-2xs ax-text-gray-500">
                        {item.createdBy.role}
                      </span>
                    </div>
                  </div>

                  {/* Properties: Target Audience & Timestamp Details */}
                  <div className="ax-flex ax-items-center ax-flex-wrap ax-gap-3 ax-text-xs ax-text-gray-600">
                    {/* Target Audience */}
                    <div className="ax-flex ax-items-center ax-gap-1-5 ax-bg-gray-50 ax-px-2.5 ax-py-1 ax-rounded-md ax-border ax-border-gray-100">
                      <Icon name="people" size={13} className="ax-text-gray-400" />
                      <span className="ax-font-medium ax-text-gray-700">Audience:</span>
                      <span className="ax-text-gray-600">{item.targetAudience}</span>
                    </div>

                    {/* Created At Date */}
                    <div className="ax-flex ax-items-center ax-gap-1-5 ax-text-gray-500">
                      <Icon name="calendar-event" size={13} className="ax-text-gray-400" />
                      <span>{formatted}</span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
// endregion
