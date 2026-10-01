'use client';

import { useEffect, useState } from 'react';
import Icon from '@/assets/icons';
import AXButton from '@/ax-reusable-components/ax-button/ax-button';
import AXCard from '@/ax-reusable-components/ax-card/ax-card';
import AXPageHeader from '@/ax-reusable-components/ax-page-header/ax-page-header';
import AXPageLoader from '@/ax-reusable-components/ax-page-loader/ax-page-loader';

// region Interfaces
interface Submission {
  id: number;
  name: string;
  number: string;
}

interface SubmissionsResponse {
  status: number;
  submissions: Submission[];
}
// endregion

// region Constants
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;
// endregion

// region Main Component
export default function StudentSubmissionsPage() {
  // region States
  const [tableData, setTableData] = useState<Submission[]>([]);
  const [loading, setLoading] = useState({ page: true, delete: false });
  const [message, setMessage] = useState('');
  // endregion

  // region Fetch Submissions
  const fetchSubmissions = async () => {
    setLoading((prev) => ({ ...prev, page: true }));
    try {
      const response = await fetch(`${BACKEND_URL}/submissions`);
      if (!response.ok) throw new Error('Failed to fetch submissions');

      const data: SubmissionsResponse = await response.json();
      setTableData(data.submissions ?? []);
    } catch (error) {
      console.error('Fetch submissions error:', error);
      setTableData([]);
    } finally {
      setLoading((prev) => ({ ...prev, page: false }));
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);
  // endregion

  // region Delete Submission
  const handleDelete = async (id: number) => {
    setLoading((prev) => ({ ...prev, delete: true }));
    try {
      const response = await fetch(`${BACKEND_URL}/submissions-delete/${id}`, { method: 'GET' });
      if (!response.ok) throw new Error('Failed to delete submission');

      const data = await response.json();
      setMessage(data.message ?? 'Submission deleted successfully');
      await fetchSubmissions();
    } catch (error) {
      console.error('Delete submission error:', error);
      setMessage('Something went wrong');
    } finally {
      setLoading((prev) => ({ ...prev, delete: false }));
    }
  };
  // endregion

  // region Main Return
  return (
    <>
      {loading.page && <AXPageLoader />}

      <AXPageHeader
        propsPageTitle="Student Submissions"
        propsLeftContent={
          <h1 className="ax-text-base ax-font-semibold" tabIndex={0}>
            Student Submissions
          </h1>
        }
      />

      <main className="ax-p-4 md:ax-p-6">
        <div className="ax-container ax-flex ax-flex-col ax-gap-4">
          {/* Server Message Feedback */}
          {message && (
            <div className="ax-flex ax-items-center ax-justify-between ax-rounded-lg ax-border ax-border-blue-200 ax-bg-blue-50 ax-p-4">
              <div className="ax-flex ax-items-center ax-gap-3">
                <Icon name="check" className="ax-text-primary" />
                <span className="ax-text-sm ax-font-medium ax-text-gray-900">{message}</span>
              </div>
              <button
                type="button"
                onClick={() => setMessage('')}
                className="ax-cursor-pointer ax-text-sm ax-text-gray-400 hover:ax-text-gray-600"
                aria-label="Dismiss message"
              >
                ✕
              </button>
            </div>
          )}

          {/* Student Submissions Table */}
          <AXCard
            propsSize="md"
            propsHeader={
              <div className="ax-flex ax-items-center ax-justify-between ax-gap-4">
                <div>
                  <h2 className="ax-text-base ax-font-semibold ax-text-gray-900">Form Submissions</h2>
                  <p className="ax-text-xs ax-text-gray-500">
                    List of student form submissions fetched from the database.
                  </p>
                </div>
                <span className="ax-rounded-full ax-bg-gray-100 ax-px-2.5 ax-py-1 ax-text-xs ax-font-medium ax-text-gray-700">
                  {tableData.length} {tableData.length === 1 ? 'Record' : 'Records'}
                </span>
              </div>
            }
            propsBody={
              <div className="ax-overflow-x-auto">
                <table className="ax-w-full ax-border-collapse ax-text-left ax-text-sm">
                  <thead>
                    <tr className="ax-border-b ax-border-gray-200 ax-bg-gray-50">
                      <th className="ax-px-4 ax-py-3 ax-font-semibold ax-text-gray-700">ID</th>
                      <th className="ax-px-4 ax-py-3 ax-font-semibold ax-text-gray-700">Name</th>
                      <th className="ax-px-4 ax-py-3 ax-font-semibold ax-text-gray-700">Phone Number</th>
                      <th className="ax-px-4 ax-py-3 ax-text-right ax-font-semibold ax-text-gray-700">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {tableData.length > 0 ? (
                      tableData.map((item) => (
                        <tr
                          key={item.id}
                          className="ax-border-b ax-border-gray-100 ax-transition-colors hover:ax-bg-gray-50"
                        >
                          <td className="ax-px-4 ax-py-3 ax-font-medium ax-text-gray-900">#{item.id}</td>
                          <td className="ax-px-4 ax-py-3 ax-text-gray-800">{item.name}</td>
                          <td className="ax-px-4 ax-py-3 ax-text-gray-600">{item.number}</td>
                          <td className="ax-px-4 ax-py-3 ax-text-right">
                            <AXButton
                              propsLabel="Delete"
                              propsSize="xs"
                              propsStartIcon={<Icon name="trash" size={12} />}
                              propsLabelClassName="ax-hidden md:ax-inline-flex"
                              propsClassName="ax-rounded-md ax-text-danger hover:ax-bg-red-50"
                              propsLoading={loading.delete}
                              onClick={() => handleDelete(item.id)}
                            />
                          </td>
                        </tr>
                      ))
                    ) : (
                      !loading.page && (
                        <tr>
                          <td colSpan={4} className="ax-py-10 ax-text-center ax-text-gray-500">
                            No student submissions found.
                          </td>
                        </tr>
                      )
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