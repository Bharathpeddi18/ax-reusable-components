'use client';

import Icon from '@/assets/icons';
import AXButton from '@/ax-reusable-components/ax-button/ax-button';
import AXInputText from '@/ax-reusable-components/ax-input/ax-input-text/ax-input-text';
import { AXPageHeader } from '@/ax-reusable-components/ax-page-header/ax-page-header';
import AXPageLoader from '@/ax-reusable-components/ax-page-loader/ax-page-loader';
import { FormEvent, useEffect, useState } from 'react';

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
    page: true
  });

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    setLoading((prev) => ({...prev, page: true}))
    try {
      const response = await fetch(`${BACKEND_URL}/submissions`);

      if (!response.ok) {
        throw new Error('Failed to fetch submissions');
      }

      const data: SubmissionsResponse = await response.json();

      setTableData(data.submissions);
    } catch (error) {
      console.error('Fetch submissions error:', error);
    }
    setLoading((prev) => ({...prev, page: false}))
  };

  const handleDelete = async (id: number) => {
    setLoading((prev) => ({...prev, delete: true}))
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
    }
    setLoading((prev) => ({...prev, delete: false}))
  };

  const handleSubmit = async () => {
    setLoading((prev) => ({...prev, submit: true}))
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
    }
    setLoading((prev) => ({...prev, submit: false}))
  };

  return (
    <>
      {loading.page ? <AXPageLoader/> : ''}
      <AXPageHeader
        propsPageTitle="Create Student"
        propsLeftContent={
          <>
            <h1 className="ax-text-base" tabIndex={0} aria-label="Create Student">
              Create Student
            </h1>
          </>
        }
        propsRightContent={
          <>
            <AXButton
              propsLabel='Submit'
              propsSize="xs"
              propsLabelClassName='ax-hidden md:ax-inline-flex'
              propsClassName='ax-bg-primary ax-text-white ax-rounded-md'
              propsStartIcon={<Icon name={"check"} />}
              onClick={handleSubmit}
              propsLoading={loading.submit}
            />
          </>
        }
      />
      <main>
        <div style={{ padding: '20px' }}>
            <AXInputText
              propsLabel="Name"
              propsIsMandatory="*"
              propsPlaceholder="Enter student name"
              propsStartIcon="person"
              propsAllowClear
              propsValue={name}
              propsOnChange={(event) => setName(event.target.value)}
              propsAutoComplete="name"
              propsRequired
            />

            <AXInputText
              propsLabel="Phone Number"
              propsPlaceholder="Enter phone number"
              propsStartIcon="telephone"
              propsAllowClear
              propsValue={number}
              propsOnChange={(event) => setNumber(event.target.value)}
              propsAutoComplete="tel"
              propsRequired
            />

          {message && (
            <div style={{ marginTop: '20px' }}>
              <h2>Server Response</h2>
              <p>{message}</p>
            </div>
          )}

          <div style={{ paddingTop: '20px' }}>
            <h2>Fetched Data</h2>

            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Number</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {tableData.length > 0 ? (
                  tableData.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.number}</td>
                      <AXButton
                        propsLabel='Delete'
                        propsSize="xs"
                        propsStartIcon={<Icon name={"trash"} size={10}/>}
                        propsLabelClassName='ax-hidden md:ax-inline-flex'
                        propsClassName='ax-text-danger ax-rounded-md'
                        onClick={() => handleDelete(item.id)}
                      />
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3}>No Data Found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}