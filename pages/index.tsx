import { useState } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';

const FormPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    country: '',
    feedback: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/submit', formData);
      setMessage(res.data.message);
      setFormData({ name: '', email: '', age: '', country: '', feedback: '' });
    } catch (error) {
      setMessage('Submission failed');
    }
  };

  return (
    <div style={styles.container}>
      <NavBar />
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Submit Your Info</h2>

        <input style={styles.input} name="name" value={formData.name} onChange={handleChange} required placeholder="Full Name" />
        <input style={styles.input} name="email" value={formData.email} onChange={handleChange} required placeholder="Email Address" />
        <input style={styles.input} name="age" value={formData.age} onChange={handleChange} required placeholder="Age" />
        <input style={styles.input} name="country" value={formData.country} onChange={handleChange} required placeholder="Country" />
        <textarea style={styles.textarea} name="feedback" value={formData.feedback} onChange={handleChange} required placeholder="Your Feedback" />

        <button style={styles.button} type="submit">Submit</button>
        {message && <p style={styles.message}>{message}</p>}
      </form>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2rem',
    fontFamily: 'sans-serif',
  },
  form: {
    background: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    maxWidth: '500px',
    width: '100%',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  },
  title: {
    marginBottom: '1rem',
    textAlign: 'center',
    fontSize: '1.5rem',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    marginBottom: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  textarea: {
    width: '100%',
    height: '100px',
    padding: '0.75rem',
    marginBottom: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    resize: 'vertical',
  },
  button: {
    backgroundColor: '#0070f3',
    color: '#fff',
    padding: '0.75rem',
    border: 'none',
    borderRadius: '5px',
    width: '100%',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  message: {
    marginTop: '1rem',
    color: 'green',
    textAlign: 'center',
  }
};

export default FormPage;

