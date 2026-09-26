'use client';

import Icon from '@/assets/icons';
import AXButton from '@/ax-reusable-components/ax-button/ax-button';
import AXCard from '@/ax-reusable-components/ax-card/ax-card';
import AXInputCheck from '@/ax-reusable-components/ax-input/ax-input-check/ax-input-check';
import AXInputPassword from '@/ax-reusable-components/ax-input/ax-input-password/ax-input-password';
import AXInputRadio from '@/ax-reusable-components/ax-input/ax-input-radio/ax-input-radio';
import { AXSelect } from '@/ax-reusable-components/ax-input/ax-input-select/ax-input-select';
import AXInputText from '@/ax-reusable-components/ax-input/ax-input-text/ax-input-text';
import AXTextArea from '@/ax-reusable-components/ax-input/ax-input-text-area/ax-input-text-area';
import { AXPageHeader } from '@/ax-reusable-components/ax-page-header/ax-page-header';
import AXPageLoader from '@/ax-reusable-components/ax-page-loader/ax-page-loader';
import AXInputLabel from '@/ax-reusable-components/ax-input/ax-input-label/ax-input-label';
import { AXInputRichText } from '@/ax-reusable-components/ax-input/ax-input-rich-text/ax-input-rich-text';
import { AXInputDate } from '@/ax-reusable-components/ax-input/ax-input-date/ax-input-date';
import { AXInputFileUpload } from '@/ax-reusable-components/ax-input/ax-input-file/ax-input-file-upload';

import { useEffect, useState } from 'react';

interface Submission {
  id: number;
  name: string;
  number: string;
}

interface SubmissionsResponse {
  status: number;
  submissions: Submission[];
}

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [tableData, setTableData] = useState<Submission[]>([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState({
    submit: false,
    delete: false,
    page: true,
  });

  const fetchSubmissions = async () => {
    setLoading((prev) => ({ ...prev, page: true }));
    try {
      const response = await fetch(`${BACKEND_URL}/submissions`);

      if (!response.ok) {
        throw new Error('Failed to fetch submissions');
      }

      const data: SubmissionsResponse = await response.json();
      setTableData(data.submissions ?? []);
    } catch (error) {
      console.error('Fetch submissions error:', error);
    } finally {
      setLoading((prev) => ({ ...prev, page: false }));
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleDelete = async (id: number) => {
    setLoading((prev) => ({ ...prev, delete: true }));
    try {
      const response = await fetch(`${BACKEND_URL}/submissions-delete/${id}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Failed to delete submission');
      }

      const data = await response.json();
      setMessage(data.message);
      await fetchSubmissions();
    } catch (error) {
      console.error('Delete error:', error);
      setMessage('Something went wrong');
    } finally {
      setLoading((prev) => ({ ...prev, delete: false }));
    }
  };

  const handleSubmit = async () => {
    setLoading((prev) => ({ ...prev, submit: true }));
    try {
      const response = await fetch(`${BACKEND_URL}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          number,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      const data = await response.json();
      setMessage(data.message);
      setName('');
      setNumber('');
      await fetchSubmissions();
    } catch (error) {
      console.error('Submit error:', error);
      setMessage('Something went wrong');
    } finally {
      setLoading((prev) => ({ ...prev, submit: false }));
    }
  };

  return (
    <>
      {loading.page ? <AXPageLoader /> : null}

      <AXPageHeader
        propsPageTitle="Create Student"
        propsLeftContent={
          <h1 className="ax-text-base ax-font-semibold" tabIndex={0} aria-label="Create Student">
            Create Student
          </h1>
        }
        propsRightContent={
          <AXButton
            propsLabel="Submit"
            propsSize="xs"
            propsLabelClassName="ax-hidden md:ax-inline-flex"
            propsClassName="ax-bg-primary ax-text-white ax-rounded-md"
            propsStartIcon={<Icon name="check" />}
            onClick={handleSubmit}
            propsLoading={loading.submit}
          />
        }
      />

      <main className="ax-p-4 md:ax-p-6">
        <div className="ax-container ax-flex ax-flex-col ax-gap-6">
          {/* Main Student Form Card */}
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
                {/* --- Row 1: Primary Identity Details (3 Columns) --- */}
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

                <div className="ax-col-span-12 md:ax-col-span-6 lg:ax-col-span-4">
                  <AXInputDate
                    propsId="date-of-birth"
                    propsLabel="Date of Birth"
                    propsMandatory
                    propsValue="2000-05-15"
                    propsMaxDate="2026-09-27"
                    propsOnChange={(event) => console.log(event.target.value)}
                  />
                </div>

                {/* --- Row 2: Academic & Account & Demographics (3 Columns) --- */}
                <div className="ax-col-span-12 md:ax-col-span-6 lg:ax-col-span-4">
                  <AXSelect
                    propsLabel="Class"
                    propsMandatory
                    propsOptions={[
                      { label: 'Class 8', value: '8' },
                      { label: 'Class 9', value: '9' },
                      { label: 'Class 10', value: '10' },
                    ]}
                    propsValue=""
                    propsOnChange={(value) => console.log(value)}
                  />
                </div>

                <div className="ax-col-span-12 md:ax-col-span-6 lg:ax-col-span-4">
                  <AXInputPassword
                    id="student-password"
                    propsLabel="Password"
                    propsMandatory
                    propsPlaceholder="Enter password"
                  />
                </div>

                <div className="ax-col-span-12 md:ax-col-span-6 lg:ax-col-span-4 ax-flex ax-flex-col ax-gap-2">
                  <AXInputLabel propsLabel="Gender" propsMandatory />
                  <div className="ax-flex ax-items-center ax-gap-6" style={{ minHeight: '40px' }}>
                    <AXInputRadio
                      propsId="gender-male"
                      propsName="gender"
                      propsLabel="Male"
                      propsValue="male"
                      propsDefaultChecked
                    />
                    <AXInputRadio
                      propsId="gender-female"
                      propsName="gender"
                      propsLabel="Female"
                      propsValue="female"
                    />
                  </div>
                </div>

                {/* --- Row 3: Status --- */}
                <div className="ax-col-span-12">
                  <AXInputCheck
                    propsId="student-active"
                    propsLabel="Active Student"
                    propsLabelPosition="after"
                    propsDefaultChecked
                  />
                </div>

                {/* --- Row 4: Address & Attachments (2 Columns: 6 + 6) --- */}
                <div className="ax-col-span-12 lg:ax-col-span-6">
                  <AXTextArea
                    propsClassName="ax-input-vertical"
                    propsId="student-address"
                    propsLabel="Address"
                    propsMandatory
                    propsPlaceholder="Enter student address"
                    propsRows={5}
                    propsMaxLength={250}
                    propsOnChange={(event) => console.log(event.target.value)}
                  />
                </div>

                <div className="ax-col-span-12 lg:ax-col-span-6">
                  <AXInputFileUpload
                    propsLabel="Attachments"
                    propsAccept={[
                      '.png',
                      '.jpg',
                      '.jpeg',
                      '.xlsx',
                      '.txt',
                      '.docx',
                      '.pdf',
                    ]}
                    propsMaxFileSizeMB={25}
                    propsMaxFiles={10}
                    propsOnChange={(files) => console.log(files)}
                  />
                </div>

                {/* --- Row 5: Rich Text Description (Full Width) --- */}
                <div className="ax-col-span-12">
                  <AXInputRichText
                    propsLabel="Description"
                    propsPlaceholder="Enter student description, notes, or remarks..."
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
                  onClick={() => {
                    setName('');
                    setNumber('');
                  }}
                />
                <AXButton
                  propsLabel="Submit Student"
                  propsSize="sm"
                  propsClassName="ax-bg-primary ax-text-white ax-rounded-md"
                  propsStartIcon={<Icon name="check" />}
                  onClick={handleSubmit}
                  propsLoading={loading.submit}
                />
              </div>
            }
          />

          {/* Server Response Feedback */}
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

          {/* Fetched Data Table Card */}
          <AXCard
            propsSize="md"
            propsHeader={
              <div className="ax-flex ax-items-center ax-justify-between">
                <div>
                  <h2 className="ax-text-base ax-font-semibold ax-text-gray-900">Registered Students</h2>
                  <p className="ax-text-xs ax-text-gray-500">
                    List of student records fetched from the database
                  </p>
                </div>
                <span className="ax-text-xs ax-font-medium ax-bg-gray-100 ax-text-gray-700 ax-px-2.5 ax-py-1 ax-rounded-full">
                  {tableData.length} {tableData.length === 1 ? 'Record' : 'Records'}
                </span>
              </div>
            }
            propsBody={
              <div className="ax-overflow-x-auto">
                <table className="ax-w-full ax-text-left ax-text-sm ax-border-collapse">
                  <thead>
                    <tr className="ax-border-b ax-border-gray-200 ax-bg-gray-50">
                      <th className="ax-py-3 ax-px-4 ax-font-semibold ax-text-gray-700">ID</th>
                      <th className="ax-py-3 ax-px-4 ax-font-semibold ax-text-gray-700">Name</th>
                      <th className="ax-py-3 ax-px-4 ax-font-semibold ax-text-gray-700">Phone Number</th>
                      <th className="ax-py-3 ax-px-4 ax-font-semibold ax-text-gray-700 ax-text-right">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {tableData.length > 0 ? (
                      tableData.map((item) => (
                        <tr
                          key={item.id}
                          className="ax-border-b ax-border-gray-100 hover:ax-bg-gray-50 ax-transition-colors"
                        >
                          <td className="ax-py-3 ax-px-4 ax-font-medium ax-text-gray-900">#{item.id}</td>
                          <td className="ax-py-3 ax-px-4 ax-text-gray-800">{item.name}</td>
                          <td className="ax-py-3 ax-px-4 ax-text-gray-600">{item.number}</td>
                          <td className="ax-py-3 ax-px-4 ax-text-right">
                            <AXButton
                              propsLabel="Delete"
                              propsSize="xs"
                              propsStartIcon={<Icon name="trash" size={12} />}
                              propsLabelClassName="ax-hidden md:ax-inline-flex"
                              propsClassName="ax-text-danger ax-rounded-md hover:ax-bg-red-50"
                              onClick={() => handleDelete(item.id)}
                              propsLoading={loading.delete}
                            />
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="ax-py-8 ax-text-center ax-text-gray-500">
                          No student records found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            }
          />
        </div>
      </main>
    </>
  );
}