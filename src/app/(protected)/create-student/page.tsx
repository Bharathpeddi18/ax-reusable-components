'use client';

import { useState } from 'react';
import Icon from '@/assets/icons';
import AXButton from '@/ax-reusable-components/ax-button/ax-button';
import AXCard from '@/ax-reusable-components/ax-card/ax-card';
import AXInputSelect from '@/ax-reusable-components/ax-input/ax-input-select/ax-input-select';
import AXInputText from '@/ax-reusable-components/ax-input/ax-input-text/ax-input-text';
import AXInputFileUpload from '@/ax-reusable-components/ax-input/ax-input-file/ax-input-file-upload';
import AXPageHeader from '@/ax-reusable-components/ax-page-header/ax-page-header';

// region Constants
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const CLASS_OPTIONS = [
  { label: '1st Class', value: '1' },
  { label: '2nd Class', value: '2' },
];
// endregion

// region Main Component
export default function CreateStudentPage() {
  // region Form States
  const [name, setName] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);

  // UI States
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  // endregion

  // region Handlers
  const handleSubmit = async () => {
    if (!name || !studentClass) {
      setMessage('Name and Class are required');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('class_id', studentClass);
      
      if (attachments.length > 0) {
        formData.append('photo', attachments[0]);
      }

      const response = await fetch(`${BACKEND_URL}/add-student`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to submit form');

      const data = await response.json();
      setMessage(data.message ?? 'Student submitted successfully');
      handleReset();
    } catch (error) {
      console.error('Submit error:', error);
      setMessage('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setName('');
    setStudentClass('');
    setAttachments([]);
  };
  // endregion

  // region Main Return
  return (
    <>
      <AXPageHeader
        propsPageTitle="Create Student"
        propsLeftContent={
          <div className="ax-flex ax-items-center ax-gap-1">
            <Icon name="person-plus-fill" size={20} className="ax-text-primary" />
            <h2 className="ax-text-lg ax-font-semibold" tabIndex={0}>
              Create Student
            </h2>
          </div>
        }
        propsRightContent={
          <AXButton
            propsLabel="Submit"
            propsSize="xs"
            propsLabelClassName="ax-hidden md:ax-inline-flex"
            propsClassName="ax-bg-primary ax-text-white ax-rounded-md"
            propsStartIcon={<Icon name="check" />}
            onClick={handleSubmit}
            propsLoading={loading}
          />
        }
      />

      <main className="ax-container mt-3">
        <div className="ax-flex ax-flex-col ax-gap-6">
          {/* Submission Response Feedback */}
          {message && (
            <div className="ax-bg-blue-50 ax-border ax-border-blue-200 ax-rounded-lg ax-flex ax-items-center ax-justify-between">
              <div className="ax-flex ax-items-center ax-gap-3">
                <Icon name="check" className="ax-text-primary" />
                <span className="ax-text-sm ax-font-medium ax-text-gray-900">{message}</span>
              </div>
              <button
                type="button"
                onClick={() => setMessage('')}
                className="ax-text-gray-400 hover:ax-text-gray-600 ax-text-sm ax-cursor-pointer"
                aria-label="Dismiss message"
              >
                ✕
              </button>
            </div>
          )}
          <AXCard
            propsSize="md"
            propsHeader={
              <div className="ax-flex ax-items-center ax-justify-between">
                <div>
                  <h2 className="ax-text-base ax-font-semibold ax-text-gray-900">Student Information</h2>
                  <p className="ax-text-xs ax-text-gray-500">
                    Fill in the profile and enrollment details below.
                  </p>
                </div>
              </div>
            }
            propsBody={
              <div className="ax-grid ax-grid-cols-12 ax-gap-5">
                {/* Full Name */}
                <div className="ax-col-span-12 md:ax-col-span-6">
                  <AXInputText
                    id="student-name"
                    propsClassName="ax-input-vertical"
                    propsLabel="Full Name"
                    propsMandatory
                    propsPlaceholder="Enter student name"
                    propsStartIcon={<Icon name="person" />}
                    propsValue={name}
                    propsOnChange={(event) => setName(event.target.value)}
                    propsAutoComplete="name"
                  />
                </div>

                {/* Class */}
                <div className="ax-col-span-12 md:ax-col-span-6">
                  <AXInputSelect
                    propsLabel="Class"
                    propsMandatory
                    propsOptions={CLASS_OPTIONS}
                    propsValue={studentClass}
                    propsOnChange={(value) => setStudentClass(value)}
                  />
                </div>

                {/* Attachments */}
                <div className="ax-col-span-12">
                  <AXInputFileUpload
                    propsLabel="Photo"
                    propsAccept={['.png', '.jpg', '.jpeg']}
                    propsMaxFileSizeMB={5}
                    propsMaxFiles={1}
                    propsOnChange={(files) => setAttachments(files)}
                  />
                </div>
              </div>
            }
            propsFooter={
              <div className="ax-flex ax-items-center ax-justify-end ax-gap-3">
                <AXButton
                  propsLabel="Reset"
                  propsSize="sm"
                  propsClassName="ax-bg-gray-100 ax-text-gray-700 ax-rounded-md"
                  onClick={handleReset}
                />
                <AXButton
                  propsLabel="Submit Student"
                  propsSize="sm"
                  propsClassName="ax-bg-primary ax-text-white ax-rounded-md"
                  propsStartIcon={<Icon name="check" />}
                  onClick={handleSubmit}
                  propsLoading={loading}
                />
              </div>
            }
          />
        </div>
      </main>
    </>
  );
}
// endregion