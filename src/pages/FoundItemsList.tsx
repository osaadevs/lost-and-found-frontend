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

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const token = localStorage.getItem('token');
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

    fetchItems();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Reported Found Items</h2>
      {error && <p className="text-danger">{error}</p>}
      {items.length === 0 ? (
        <p>No found items reported yet.</p>
      ) : (
        <div className="list-group">
          {items.map(item => (
            <div key={item.id} className="list-group-item mb-3">
              <h5>{item.name}</h5>
              <p><strong>Description:</strong> {item.description}</p>
              <p><strong>Location:</strong> {item.location}</p>
              <p><strong>Date:</strong> {item.date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FoundItemsList;
