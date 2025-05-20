import { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';

const DisplayPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/data').then((res) => setData(res.data));
  }, []);

  return (
    <div>
      <NavBar />
      <h2>Submitted Entries</h2>
      <table border="1">
        <thead>
          <tr><th>Name</th><th>Email</th><th>Age</th><th>Country</th><th>Feedback</th></tr>
        </thead>
        <tbody>
          {data.map((entry: any, idx: number) => (
            <tr key={idx}>
              <td>{entry.name}</td>
              <td>{entry.email}</td>
              <td>{entry.age}</td>
              <td>{entry.country}</td>
              <td>{entry.feedback}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayPage;
