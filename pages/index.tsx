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
    <div>
      <NavBar />
      <form onSubmit={handleSubmit}>
        <input name="name" value={formData.name} onChange={handleChange} required placeholder="Name" />
        <input name="email" value={formData.email} onChange={handleChange} required placeholder="Email" />
        <input name="age" value={formData.age} onChange={handleChange} required placeholder="Age" />
        <input name="country" value={formData.country} onChange={handleChange} required placeholder="Country" />
        <textarea name="feedback" value={formData.feedback} onChange={handleChange} required placeholder="Feedback" />
        <button type="submit">Submit</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default FormPage;
