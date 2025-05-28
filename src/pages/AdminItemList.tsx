import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Item {
  id: number;
  name: string;
  description: string;
  location: string;
  date: string;
  status: string;
}

const AdminItemList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const fetchItems = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:8080/api/items', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setItems(res.data);
    } catch (err) {
      setError('Failed to fetch items.');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8080/api/items/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setItems(items.filter(item => item.id !== id));
      setMessage('Item deleted successfully.');
    } catch (err) {
      setMessage('Failed to delete item.');
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="container mt-5">
      <h2>All Reported Items</h2>
      {error && <p className="text-danger">{error}</p>}
      {message && <p className="text-success">{message}</p>}
      {items.length === 0 ? (
        <p>No items found in the system.</p>
      ) : (
        <div className="list-group">
          {items.map(item => (
            <div key={item.id} className="list-group-item mb-3">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5>{item.name} <span className="badge bg-secondary">{item.status}</span></h5>
                  <p><strong>Description:</strong> {item.description}</p>
                  <p><strong>Location:</strong> {item.location}</p>
                  <p><strong>Date:</strong> {item.date}</p>
                </div>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminItemList;
