'use client';

import { useState } from 'react';
import Icon from '@/assets/icons';
import AXButton from '@/ax-reusable-components/ax-button/ax-button';
import AXCard from '@/ax-reusable-components/ax-card/ax-card';
import AXInputCheck from '@/ax-reusable-components/ax-input/ax-input-check/ax-input-check';
import AXInputPassword from '@/ax-reusable-components/ax-input/ax-input-password/ax-input-password';
import AXInputRadio from '@/ax-reusable-components/ax-input/ax-input-radio/ax-input-radio';
import AXInputSelect from '@/ax-reusable-components/ax-input/ax-input-select/ax-input-select';
import AXInputText from '@/ax-reusable-components/ax-input/ax-input-text/ax-input-text';
import AXTextArea from '@/ax-reusable-components/ax-input/ax-input-text-area/ax-input-text-area';
import AXInputLabel from '@/ax-reusable-components/ax-input/ax-input-label/ax-input-label';
import AXInputRichText from '@/ax-reusable-components/ax-input/ax-input-rich-text/ax-input-rich-text';
import AXInputDate from '@/ax-reusable-components/ax-input/ax-input-date/ax-input-date';
import AXInputFileUpload from '@/ax-reusable-components/ax-input/ax-input-file/ax-input-file-upload';
import AXPageHeader from '@/ax-reusable-components/ax-page-header/ax-page-header';

// region Constants
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

const CLASS_OPTIONS = [
  { label: 'Class 8', value: '8' },
  { label: 'Class 9', value: '9' },
  { label: 'Class 10', value: '10' },
];
// endregion

// region Main Component
export default function CreateStudentPage() {
  // region Form States
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [dob, setDob] = useState('2000-05-15');
  const [studentClass, setStudentClass] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [isActive, setIsActive] = useState(true);
  const [address, setAddress] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [description, setDescription] = useState('');

  // UI States
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  // endregion

  // region Handlers
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          number,
          dob,
          studentClass,
          password,
          gender,
          isActive,
          address,
          description,
        }),
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
    setNumber('');
    setDob('2000-05-15');
    setStudentClass('');
    setPassword('');
    setGender('male');
    setIsActive(true);
    setAddress('');
    setAttachments([]);
    setDescription('');
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

      <main className="ax-p-4 md:ax-p-6">
        <div className="ax-container ax-flex ax-flex-col ax-gap-6">
          <AXCard
            propsSize="md"
            propsHeader={
              <div className="ax-flex ax-items-center ax-justify-between">
                <div>
                  <h2 className="ax-text-base ax-font-semibold ax-text-gray-900">Student Information</h2>
                  <p className="ax-text-xs ax-text-gray-500">
                    Fill in the profile, contact, and enrollment details below.
                  </p>
                </div>
              </div>
            }
            propsBody={
              <div className="ax-grid ax-grid-cols-12 ax-gap-5">
                {/* Full Name */}
                <div className="ax-col-span-12 md:ax-col-span-6 lg:ax-col-span-4">
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

                {/* Phone Number */}
                <div className="ax-col-span-12 md:ax-col-span-6 lg:ax-col-span-4">
                  <AXInputText
                    id="student-phone"
                    propsClassName="ax-input-vertical"
                    propsLabel="Phone Number"
                    propsMandatory
                    propsPlaceholder="Enter phone number"
                    propsStartIcon={<Icon name="phone" />}
                    propsValue={number}
                    propsOnChange={(event) => setNumber(event.target.value)}
                    propsAutoComplete="tel"
                  />
                </div>

                {/* Date of Birth */}
                <div className="ax-col-span-12 md:ax-col-span-6 lg:ax-col-span-4">
                  <AXInputDate
                    propsId="date-of-birth"
                    propsLabel="Date of Birth"
                    propsMandatory
                    propsValue={dob}
                    propsMaxDate="2026-09-27"
                    propsOnChange={(event) => setDob(event.target.value)}
                  />
                </div>

                {/* Class */}
                <div className="ax-col-span-12 md:ax-col-span-6 lg:ax-col-span-4">
                  <AXInputSelect
                    propsLabel="Class"
                    propsMandatory
                    propsOptions={CLASS_OPTIONS}
                    propsValue={studentClass}
                    propsOnChange={(value) => setStudentClass(value)}
                  />
                </div>

                {/* Password */}
                <div className="ax-col-span-12 md:ax-col-span-6 lg:ax-col-span-4">
                  <AXInputPassword
                    id="student-password"
                    propsLabel="Password"
                    propsMandatory
                    propsPlaceholder="Enter password"
                    propsValue={password}
                    propsOnChange={(event) => setPassword(event.target.value)}
                  />
                </div>

                {/* Gender */}
                <div className="ax-col-span-12 md:ax-col-span-6 lg:ax-col-span-4 ax-flex ax-flex-col ax-gap-2">
                  <AXInputLabel propsLabel="Gender" propsMandatory />
                  <div className="ax-flex ax-items-center ax-gap-6" style={{ minHeight: '40px' }}>
                    <AXInputRadio
                      propsId="gender-male"
                      propsName="gender"
                      propsLabel="Male"
                      propsValue="male"
                      propsChecked={gender === 'male'}
                      propsOnChange={() => setGender('male')}
                    />
                    <AXInputRadio
                      propsId="gender-female"
                      propsName="gender"
                      propsLabel="Female"
                      propsValue="female"
                      propsChecked={gender === 'female'}
                      propsOnChange={() => setGender('female')}
                    />
                  </div>
                </div>

                {/* Active Student */}
                <div className="ax-col-span-12">
                  <AXInputCheck
                    propsId="student-active"
                    propsLabel="Active Student"
                    propsLabelPosition="after"
                    propsChecked={isActive}
                    propsOnChange={(event) => setIsActive(event.target.checked)}
                  />
                </div>

                {/* Address */}
                <div className="ax-col-span-12 lg:ax-col-span-6">
                  <AXTextArea
                    propsClassName="ax-input-vertical"
                    propsId="student-address"
                    propsLabel="Address"
                    propsMandatory
                    propsPlaceholder="Enter student address"
                    propsRows={5}
                    propsMaxLength={250}
                    propsValue={address}
                    propsOnChange={(event) => setAddress(event.target.value)}
                  />
                </div>

                {/* Attachments */}
                <div className="ax-col-span-12 lg:ax-col-span-6">
                  <AXInputFileUpload
                    propsLabel="Attachments"
                    propsAccept={['.png', '.jpg', '.jpeg', '.xlsx', '.txt', '.docx', '.pdf']}
                    propsMaxFileSizeMB={25}
                    propsMaxFiles={10}
                    propsOnChange={(files) => setAttachments(files)}
                  />
                </div>

                {/* Description */}
                <div className="ax-col-span-12">
                  <AXInputRichText
                    propsLabel="Description"
                    propsPlaceholder="Enter student description, notes, or remarks..."
                    propsValue={description}
                    propsOnChange={(value) => setDescription(value)}
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

          {/* Submission Response Feedback */}
          {message && (
            <div className="ax-p-4 ax-bg-blue-50 ax-border ax-border-blue-200 ax-rounded-lg ax-flex ax-items-center ax-justify-between">
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
        </div>
      </main>
    </>
  );
}
// endregion