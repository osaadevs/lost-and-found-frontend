import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Request {
  id: number;
  status: string;
  message: string;
  item: { name: string };
  requestedBy: { username: string };
}

const AdminRequestManagement: React.FC = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/requests', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRequests(res.data);
      } catch (err) {
        alert('Failed to load requests');
      }
    };

    fetchRequests();
  }, [token]);

  return (
    <div className="container mt-5">
      <h3 className="mb-4">All Claim Requests</h3>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Item</th>
              <th>Requested By</th>
              <th>Status</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(req => (
              <tr key={req.id}>
                <td>{req.id}</td>
                <td>{req.item.name}</td>
                <td>{req.requestedBy.username}</td>
                <td>{req.status}</td>
                <td>{req.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminRequestManagement;
