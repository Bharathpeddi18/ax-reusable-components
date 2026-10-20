'use client';

import React, { useState } from 'react';
import AXButton from '@/ax-reusable-components/ax-button/ax-button';
import AXCard from '@/ax-reusable-components/ax-card/ax-card';
import AddOrEdit from './add-or-edit';

// region Types
export interface Announcement {
  id: string;
  title: string;
  description: string;
  expiryDate: string;
  isArchived: string;
}

import { SAMPLE_ANNOUNCEMENTS } from './sample-data';
import Icon from '@/assets/icons';
import { SETTINGS_CONTENT_VIEW_MODES } from '../../../../../../global-config';

// region Main Component
export default function Announcements() {
  // State
  const [announcements, setAnnouncements] = useState<Announcement[]>(SAMPLE_ANNOUNCEMENTS);
  const [viewMode, setViewMode] = useState<SETTINGS_CONTENT_VIEW_MODES>(SETTINGS_CONTENT_VIEW_MODES.list);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Handlers
  const handleAddClick = () => {
    setEditingId(null);
    setViewMode(SETTINGS_CONTENT_VIEW_MODES.add);
  };

  const handleEditClick = (id: string) => {
    setEditingId(id);
    setViewMode(SETTINGS_CONTENT_VIEW_MODES.edit);
  };

  const handleDelete = (id: string) => {
    setViewMode(SETTINGS_CONTENT_VIEW_MODES.list);
    setEditingId(null);
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    }
  };

  const handleSave = (formData: Announcement) => {
    if (viewMode === SETTINGS_CONTENT_VIEW_MODES.add) {
      const newId = Date.now().toString();
      setAnnouncements((prev) => [{ ...formData, id: newId }, ...prev]);
    } else if (viewMode === SETTINGS_CONTENT_VIEW_MODES.edit && editingId) {
      setAnnouncements((prev) =>
        prev.map((a) => (a.id === editingId ? { ...formData, id: editingId } : a))
      );
    }
    setViewMode(SETTINGS_CONTENT_VIEW_MODES.list);
    setEditingId(null);
  };

  const handleCancel = () => {
    setViewMode(SETTINGS_CONTENT_VIEW_MODES.list);
    setEditingId(null);
  };

  const filteredAnnouncements = announcements.filter((ann) => {
    const isArchived = ann.isArchived === 'Yes';
    const isExpired = new Date(ann.expiryDate).getTime() < new Date().getTime();
    return !isArchived && !isExpired;
  });

  return (
    <div className="ax-flex ax-flex-col ax-gap-3">
      {/* Header section */}
      <div className="ax-flex ax-items-center ax-justify-between">
        <h3 className="ax-text-lg ax-font-semibold ax-text-primary ax-m-0">Announcements</h3>
        <AXButton 
          propsLabel="Add"
          propsStartIcon={<Icon name='plus' size={20} />}
          propsSize="sm" 
          propsClassName="ax-bg-primary ax-text-white ax-rounded-md ax-ps-1"
          onClick={handleAddClick}
        />
      </div>

      {/* Conditionally render Add form at the top */}
      {viewMode === SETTINGS_CONTENT_VIEW_MODES.add && (
        <AddOrEdit onSave={handleSave} onCancel={handleCancel} />
      )}

      {/* Main Content Area / List View */}
      <div className="ax-flex ax-flex-col ax-gap-4">
        {filteredAnnouncements.length === 0 ? (
          <div className="ax-text-gray-500 ax-py-8 ax-text-center ax-bg-gray-50 ax-rounded-xl">
            No active announcements found.
          </div>
        ) : (
          filteredAnnouncements.map((ann) => (
            <React.Fragment key={ann.id}>
              {/* Display Card */}
              <AXCard
                propsSize="md"
                propsClassName={`ax-shadow-sm ax-border ax-border-gray-200 ax-rounded-xl ax-bg-white ax-transition-all ${viewMode === SETTINGS_CONTENT_VIEW_MODES.edit && editingId === ann.id ? 'ax-ring-2 ax-ring-primary ax-border-transparent' : ''}`}
                propsHeader={
                  <div className="ax-flex ax-items-center ax-justify-between ax-w-full">
                    <h5 className="ax-font-semibold ax-text-lg ax-m-0 ax-text-gray-800">{ann.title}</h5>
                  </div>
                }
                propsHeaderClassName="ax-border-b ax-border-gray-200 ax-px-4 ax-py-3 ax-bg-gray-50 ax-rounded-t-xl"
                propsBody={
                  <div className="ax-flex ax-flex-col ax-gap-2">
                    <div 
                      className="ax-text-gray-700 ax-text-sm ax-m-0"
                      dangerouslySetInnerHTML={{ __html: ann.description }}
                    />
                    <div className="ax-text-xs ax-text-gray-500 ax-mt-2">
                      <span className="ax-font-semibold">Expiry Date:</span> {ann.expiryDate}
                    </div>
                  </div>
                }
                propsBodyClassName="ax-px-4 ax-py-4"
                propsFooter={
                  <div className="ax-flex ax-items-center ax-gap-2 ax-justify-end ax-w-full">
                    <AXButton
                      propsLabel="Edit"
                      propsSize="sm"
                      propsClassName="ax-bg-gray-100 ax-text-gray-700 hover:ax-bg-gray-200 ax-rounded-lg ax-px-3 ax-py-1"
                      onClick={() => handleEditClick(ann.id)}
                      propsDisabled={viewMode === SETTINGS_CONTENT_VIEW_MODES.edit && editingId === ann.id}
                    />
                    <AXButton
                      propsLabel="Delete"
                      propsSize="sm"
                      propsClassName="ax-bg-red-50 ax-text-red-600 hover:ax-bg-red-100 ax-rounded-lg ax-px-3 ax-py-1"
                      onClick={() => handleDelete(ann.id)}
                    />
                  </div>
                }
                propsFooterClassName="ax-border-t ax-border-gray-200 ax-px-4 ax-py-3"
              />

              {/* Conditionally render Edit form immediately below the card */}
              {viewMode === SETTINGS_CONTENT_VIEW_MODES.edit && editingId === ann.id && (
                <div className="ax-pl-6 ax-border-l-2 ax-border-primary ax-ml-4 ax-my-2">
                  <AddOrEdit 
                    initialData={ann}
                    onSave={handleSave} 
                    onCancel={handleCancel} 
                  />
                </div>
              )}
            </React.Fragment>
          ))
        )}
      </div>
    </div>
  );
}
