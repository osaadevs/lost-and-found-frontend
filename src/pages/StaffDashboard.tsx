import React from 'react';
import { useNavigate } from 'react-router-dom';

const StaffDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100">
      <div className="text-center mb-5">
        <h2 className="fw-bold">Welcome, Staff</h2>
        <p className="text-muted">Manage lost and found item requests</p>
      </div>

      <div className="w-100" style={{ maxWidth: '400px' }}>
        <button
          className="btn btn-primary w-100 py-4 fs-5 mb-3"
          onClick={() => navigate('/staff/found')}
        >
          View All Items
        </button>

        <button
          className="btn btn-outline-primary w-100 py-4 fs-5 mb-3"
          onClick={() => navigate('/staff/claims')}
        >
          View Claim Requests
        </button>
        <button
          className="btn btn-success w-100 py-4 fs-5"
          onClick={() => navigate('/staff/report')}
        >
          Report Found Item
        </button>
      </div>
    </div>
  );
};

export default StaffDashboard;
