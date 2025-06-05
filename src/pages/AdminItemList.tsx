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
    <div className="container py-5">
      <h2 className="mb-4">All Reported Items</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {message && <div className="alert alert-success">{message}</div>}

      {items.length === 0 ? (
        <div className="alert alert-info">No items found in the system.</div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {items.map(item => (
            <div key={item.id} className="col">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title d-flex justify-content-between align-items-center">
                    {item.name}
                    <span
                      className={`badge ${
                        item.status === 'LOST'
                          ? 'bg-danger'
                          : item.status === 'FOUND'
                          ? 'bg-success'
                          : 'bg-secondary'
                      }`}
                    >
                      {item.status}
                    </span>
                  </h5>
                  <p className="card-text mb-1"><strong>Description:</strong> {item.description}</p>
                  <p className="card-text mb-1"><strong>Location:</strong> {item.location}</p>
                  <p className="card-text"><strong>Date:</strong> {item.date}</p>
                </div>
                <div className="card-footer text-end">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminItemList;
