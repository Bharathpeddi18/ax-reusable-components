'use client';

import React, { useState, useEffect } from 'react';
import AXButton from '@/ax-reusable-components/ax-button/ax-button';
import AXCard from '@/ax-reusable-components/ax-card/ax-card';
import AXInputText from '@/ax-reusable-components/ax-input/ax-input-text/ax-input-text';
import AXInputRichText from '@/ax-reusable-components/ax-input/ax-input-rich-text/ax-input-rich-text';
import AXInputDate from '@/ax-reusable-components/ax-input/ax-input-date/ax-input-date';
import AXInputSelect from '@/ax-reusable-components/ax-input/ax-input-select/ax-input-select';
import { Announcement } from './announcements';
import { SELECT_YES_NO_OPTIONS } from '../../../../../../global-config';

interface AddOrEditProps {
  initialData?: Announcement | null;
  onSave: (data: Announcement) => void;
  onCancel: () => void;
}

export default function AddOrEdit({ initialData, onSave, onCancel }: AddOrEditProps) {
  const [formData, setFormData] = useState<Announcement>({
    id: '',
    title: '',
    description: '',
    expiryDate: '',
    isArchived: 'No'
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);


  const handleSave = () => {
    if (!formData.title.trim() || !formData.description.trim() || !formData.expiryDate) {
      alert('Please fill in all mandatory fields.');
      return;
    }
    onSave(formData);
  };

  const isEdit = !!initialData?.id;

  return (
    <AXCard
      propsSize="lg"
      propsClassName="ax-shadow-md ax-border ax-border-gray-200 ax-rounded-xl ax-bg-white ax-mb-4"
      propsHeader={
        <h4 className="ax-font-semibold ax-text-lg ax-m-0 ax-text-gray-800">
          {isEdit ? 'Edit Announcement' : 'Add Announcement'}
        </h4>
      }
      propsHeaderClassName="ax-border-b ax-border-gray-200 ax-px-4 ax-py-3"
      propsBody={
        <div className="ax-flex ax-flex-col ax-gap-4">
          <AXInputText
            id="title"
            propsLabel="Title"
            propsMandatory
            propsPlaceholder="Enter announcement title"
            propsValue={formData.title}
            propsOnChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          
          <AXInputRichText
            propsLabel="Description"
            propsMandatory
            propsPlaceholder="Enter detailed description"
            propsValue={formData.description}
            propsOnChange={(value) => setFormData({ ...formData, description: value })}
          />
          
          <div className="ax-flex ax-flex-col md:ax-flex-row ax-gap-4">
            <div className="ax-flex-1">
              <AXInputDate
                propsId="expiryDate"
                propsLabel="Expiry Date"
                propsMandatory
                propsValue={formData.expiryDate}
                propsMinDate={new Date().toISOString().split('T')[0]}
                propsOnChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
              />
            </div>
            <div className="ax-flex-1">
              <AXInputSelect
                propsLabel="Is Archived"
                propsOptions={SELECT_YES_NO_OPTIONS}
                propsValue={formData.isArchived}
                propsOnChange={(val) => setFormData({ ...formData, isArchived: val })}
              />
            </div>
          </div>
        </div>
      }
      propsBodyClassName="ax-p-4"
      propsFooter={
        <div className="ax-flex ax-items-center ax-gap-3 ax-justify-end ax-w-full">
          <AXButton
            propsLabel="Cancel"
            propsSize="md"
            propsClassName="ax-bg-gray-100 ax-text-gray-700 hover:ax-bg-gray-200 ax-rounded-lg ax-px-4"
            onClick={onCancel}
          />
          <AXButton
            propsLabel={isEdit ? 'Update' : 'Submit'}
            propsSize="md"
            propsClassName="ax-bg-primary ax-text-white hover:ax-opacity-90 ax-rounded-lg ax-px-4"
            onClick={handleSave}
          />
        </div>
      }
      propsFooterClassName="ax-border-t ax-border-gray-200 ax-px-4 ax-py-3"
    />
  );
}
