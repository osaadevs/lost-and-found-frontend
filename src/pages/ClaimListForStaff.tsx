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
  requestedBy: {
    username: string;
  };
  status: string;
  message: string;
}

const ClaimListForStaff: React.FC = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:8080/api/requests', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(res.data);
    } catch (err) {
      setError('Failed to load requests.');
    }
  };

  const updateStatus = async (id: number, status: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:8080/api/requests/${id}`, null, {
        headers: { Authorization: `Bearer ${token}` },
        params: { status },
      });
      setMessage(`Request #${id} marked as ${status}.`);
      fetchRequests(); // refresh list
    } catch (err) {
      setMessage('Failed to update request.');
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="container mt-5">
      <h2>User Claim Requests</h2>
      {error && <p className="text-danger">{error}</p>}
      {message && <p className="text-success">{message}</p>}
      {requests.length === 0 ? (
        <p>No claims available.</p>
      ) : (
        <div className="list-group">
          {requests.map(request => (
            <div key={request.id} className="list-group-item mb-3">
              <h5>Item: {request.item.name}</h5>
              <p><strong>Requested By:</strong> {request.requestedBy.username}</p>
              <p><strong>Status:</strong> {request.status}</p>
              <p><strong>Message:</strong> {request.message}</p>
              <p><strong>Item Desc:</strong> {request.item.description}</p>
              <button
                className="btn btn-success btn-sm me-2"
                onClick={() => updateStatus(request.id, 'APPROVED')}
              >
                Approve
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => updateStatus(request.id, 'REJECTED')}
              >
                Reject
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClaimListForStaff;
