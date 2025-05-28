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
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [claimMessage, setClaimMessage] = useState<{ [key: number]: string }>({});

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

  const handleClaim = async (itemId: number) => {
    try {
      const token = localStorage.getItem('token');
      const messageToSend = claimMessage[itemId] || '';
      await axios.post(
        `http://localhost:8080/api/requests/${itemId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { message: messageToSend },
        }
      );
      setMessage('Claim request submitted.');
    } catch (err) {
      setMessage('Failed to submit claim.');
    }
  };

  const handleMessageChange = (itemId: number, value: string) => {
    setClaimMessage(prev => ({ ...prev, [itemId]: value }));
  };

  return (
    <div className="container mt-5">
      <h2>Items Reported as Found</h2>
      {error && <p className="text-danger">{error}</p>}
      {message && <p className="text-success">{message}</p>}
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
              <textarea
                className="form-control mt-2"
                placeholder="Why do you believe this is your item?"
                value={claimMessage[item.id] || ''}
                onChange={e => handleMessageChange(item.id, e.target.value)}
              />
              <button
                className="btn btn-outline-primary btn-sm mt-2"
                onClick={() => handleClaim(item.id)}
              >
                Claim
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FoundItemsForUser;
