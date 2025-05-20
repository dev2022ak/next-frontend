import { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';

const DisplayPage = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/data')
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load data');
        setLoading(false);
      });
  }, []);

  return (
    <div style={styles.container}>
      <NavBar />
      <h2 style={styles.title}>Submitted Entries</h2>

      {loading && <p style={styles.message}>Loading data...</p>}
      {error && <p style={{ ...styles.message, color: 'red' }}>{error}</p>}

      {!loading && !error && (
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Age</th>
                <th style={styles.th}>Country</th>
                <th style={styles.th}>Feedback</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan={5} style={styles.noData}>No submissions yet</td>
                </tr>
              ) : (
                data.map((entry, idx) => (
                  <tr key={idx} style={idx % 2 === 0 ? styles.evenRow : styles.oddRow}>
                    <td style={styles.td}>{entry.name}</td>
                    <td style={styles.td}>{entry.email}</td>
                    <td style={styles.td}>{entry.age}</td>
                    <td style={styles.td}>{entry.country}</td>
                    <td style={styles.td}>{entry.feedback}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '2rem',
    fontFamily: 'sans-serif',
    maxWidth: '900px',
    margin: 'auto',
  },
  title: {
    textAlign: 'center',
    marginBottom: '1rem',
    fontSize: '1.8rem',
    color: '#333',
  },
  message: {
    textAlign: 'center',
    fontSize: '1.2rem',
    margin: '1rem 0',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  },
  th: {
    padding: '12px',
    backgroundColor: '#0070f3',
    color: 'white',
    textAlign: 'left',
    fontWeight: '600',
    position: 'sticky',
    top: 0,
  },
  td: {
    padding: '12px',
    borderBottom: '1px solid #ddd',
    verticalAlign: 'top',
  },
  evenRow: {
    backgroundColor: '#f9f9f9',
  },
  oddRow: {
    backgroundColor: '#fff',
  },
  noData: {
    textAlign: 'center',
    padding: '20px',
    fontStyle: 'italic',
    color: '#666',
  },
};

export default DisplayPage;

