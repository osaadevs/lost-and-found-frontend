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

const FoundItemsForUser: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [claimMsg, setClaimMsg] = useState<{ [key: number]: string }>({});

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
      setError('Failed to fetch items.');
    }
  };

  const handleClaim = async (itemId: number) => {
    try {
      await axios.post(
        `http://localhost:8080/api/requests/${itemId}?message=${claimMsg[itemId] || ''}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage('Claim request sent!');
    } catch (err) {
      setMessage('Failed to send claim request.');
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="container py-5">
      <h2 className="mb-4">Available Found Items</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {message && <div className="alert alert-success">{message}</div>}

      {items.length === 0 ? (
        <div className="alert alert-info">No found items available.</div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {items.map(item => (
            <div key={item.id} className="col">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text mb-1"><strong>Description:</strong> {item.description}</p>
                  <p className="card-text mb-1"><strong>Location:</strong> {item.location}</p>
                  <p className="card-text mb-3"><strong>Date:</strong> {item.date}</p>

                  <textarea
                    className="form-control mb-3"
                    rows={2}
                    placeholder="Enter claim message"
                    value={claimMsg[item.id] || ''}
                    onChange={e =>
                      setClaimMsg({ ...claimMsg, [item.id]: e.target.value })
                    }
                  ></textarea>

                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleClaim(item.id)}
                  >
                    Send Claim Request
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

export default FoundItemsForUser;
