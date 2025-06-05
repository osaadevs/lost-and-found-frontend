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

const FoundItemsList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  const fetchItems = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/items', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const foundItems = res.data.filter((item: Item) => item.status === 'FOUND');
      setItems(foundItems);
    } catch (err) {
      setError('Failed to fetch found items.');
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="container py-5">
      <h2 className="mb-4">All Found Items</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      {items.length === 0 ? (
        <div className="alert alert-info">No found items available.</div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {items.map(item => (
            <div key={item.id} className="col">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title d-flex justify-content-between align-items-center">
                    {item.name}
                    <span className="badge bg-success">{item.status}</span>
                  </h5>
                  <p className="card-text mb-1"><strong>Description:</strong> {item.description}</p>
                  <p className="card-text mb-1"><strong>Location:</strong> {item.location}</p>
                  <p className="card-text"><strong>Date:</strong> {item.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FoundItemsList;
