import React, { useState } from 'react';
import axios from 'axios';

const ReportLostItem: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    date: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:8080/api/items', {
        ...formData,
        status: 'LOST',
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage('Item reported successfully!');
      setFormData({ name: '', description: '', location: '', date: '' });
    } catch (err) {
      setMessage('Failed to report item.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Report Lost Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name</label>
          <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label>Description</label>
          <textarea className="form-control" name="description" value={formData.description} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label>Location</label>
          <input type="text" className="form-control" name="location" value={formData.location} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label>Date</label>
          <input type="date" className="form-control" name="date" value={formData.date} onChange={handleChange} required />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

      {message && <p className="mt-3">{message}</p>}
    </div>
  );
};

export default ReportLostItem;
