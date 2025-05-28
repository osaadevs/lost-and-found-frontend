import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Item {
  name: string;
  description: string;
  location: string;
  date: string;
  status: string;
}

interface Request {
  id: number;
  item: Item;
  status: string;
  message: string;
}

const UserClaimList: React.FC = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserRequests = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:8080/api/requests/my', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRequests(res.data);
      } catch (err) {
        setError('Failed to load your requests.');
      }
    };

    fetchUserRequests();
  }, []);

  const getStatusBadgeClass = (status: string): string => {
    switch (status) {
      case 'APPROVED':
        return 'badge bg-success';
      case 'REJECTED':
        return 'badge bg-danger';
      case 'PENDING':
      default:
        return 'badge bg-warning text-dark';
    }
  };

  return (
    <div className="container mt-5">
      <h2>My Claim Requests</h2>
      {error && <p className="text-danger">{error}</p>}
      {requests.length === 0 ? (
        <p>You haven't submitted any claims.</p>
      ) : (
        <div className="list-group">
          {requests.map(req => (
            <div key={req.id} className="list-group-item mb-3">
              <h5>
                Item: {req.item.name}{' '}
                <span className={getStatusBadgeClass(req.status)}>{req.status}</span>
              </h5>
              <p><strong>Message:</strong> {req.message}</p>
              <p><strong>Item Description:</strong> {req.item.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserClaimList;
