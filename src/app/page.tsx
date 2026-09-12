'use client';

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

export default function Home() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [tableData, setTableData] = useState<Submission[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/submissions`);

      if (!response.ok) {
        throw new Error('Failed to fetch submissions');
      }

      const data: SubmissionsResponse = await response.json();

      setTableData(data.submissions);
    } catch (error) {
      console.error('Fetch submissions error:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/submissions-delete/${id}`, {
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
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(`${process.env.BACKEND_URL}/submit`, {
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
  };

  return (
    <main>
      <div style={{ padding: '20px' }}>
        <h1>Create Student</h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>

            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="number">Number</label>

            <input
              id="number"
              type="text"
              value={number}
              onChange={(event) => setNumber(event.target.value)}
              required
            />
          </div>

          <button type="submit">Submit</button>
        </form>

        {message && (
          <div>
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
              </tr>
            </thead>

            <tbody>
              {tableData.length > 0 ? (
                tableData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.number}</td>
                    <td onClick={() => handleDelete(item.id)}>delete</td>
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
  );
}