import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Request {
  id: number;
  item: {
    name: string;
    description: string;
    location: string;
    date: string;
  };
  message: string;
  status: string;
}

const UserClaimList: React.FC = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  const fetchRequests = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/user/claims', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRequests(res.data);
    } catch (err) {
      setError('Failed to fetch claim requests.');
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const getBadgeClass = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return 'bg-success';
      case 'REJECTED':
        return 'bg-danger';
      case 'PENDING':
        return 'bg-warning text-dark';
      default:
        return 'bg-secondary';
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">My Claim Requests</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      {requests.length === 0 ? (
        <div className="alert alert-info">You haven't submitted any claims yet.</div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {requests.map(req => (
            <div key={req.id} className="col">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title d-flex justify-content-between align-items-center">
                    {req.item.name}
                    <span className={`badge ${getBadgeClass(req.status)}`}>{req.status}</span>
                  </h5>
                  <p className="card-text mb-1"><strong>Description:</strong> {req.item.description}</p>
                  <p className="card-text mb-1"><strong>Location:</strong> {req.item.location}</p>
                  <p className="card-text mb-1"><strong>Date:</strong> {req.item.date}</p>
                  <p className="card-text mt-3"><strong>Your Claim Message:</strong> {req.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserClaimList;
