import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100">
      <div className="text-center mb-5">
        <h2 className="fw-bold">Admin Dashboard</h2>
        <p className="text-muted">Administrative Controls and User Management</p>
      </div>

      <div className="w-100" style={{ maxWidth: '400px' }}>
        <button
          className="btn btn-primary w-100 py-4 fs-5 mb-3"
          onClick={() => navigate('/admin/users')}
        >
          Manage Users
        </button>

        <button
          className="btn btn-outline-primary w-100 py-4 fs-5 mb-3"
          onClick={() => navigate('/admin/items')}
        >
          View All Items
        </button>

        <button
          className="btn btn-outline-secondary w-100 py-4 fs-5"
          onClick={() => navigate('/admin/requests')}
        >
          All Claim Requests
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
