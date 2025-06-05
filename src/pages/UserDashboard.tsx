import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100">
      <div className="text-center mb-5">
        <h2 className="fw-bold">Welcome, User</h2>
        <p className="text-muted">What would you like to do today?</p>
      </div>

      <div className="w-100" style={{ maxWidth: '400px' }}>
        <button
          className="btn btn-primary w-100 py-4 fs-5 mb-3"
          onClick={() => navigate('/user/report')}
        >
          Report Lost Item
        </button>

        <button
          className="btn btn-outline-primary w-100 py-4 fs-5 mb-3"
          onClick={() => navigate('/user/lost')}
        >
          View Lost Items
        </button>

        <button
          className="btn btn-outline-primary w-100 py-4 fs-5 mb-3"
          onClick={() => navigate('/user/found')}
        >
          View Found Items
        </button>

        <button
          className="btn btn-outline-secondary w-100 py-4 fs-5"
          onClick={() => navigate('/user/claims')}
        >
          My Claims
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;
