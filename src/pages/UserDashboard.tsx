import React from 'react';
import { Link } from 'react-router-dom';

const UserDashboard: React.FC = () => {
  return (
    <div className="container mt-5">
      <h2>Welcome, User</h2>
      <div className="row mt-4">
        <div className="col-md-6 mb-3">
          <Link to="/user/report" className="btn btn-primary w-100">Report Lost Item</Link>
        </div>
        <div className="col-md-6 mb-3">
          <Link to="/user/lost" className="btn btn-outline-primary w-100">View Lost Items</Link>
        </div>
        <div className="col-md-6 mb-3">
          <Link to="/user/found" className="btn btn-outline-primary w-100">View Found Items</Link>
        </div>
        <div className="col-md-6 mb-3">
          <Link to="/user/claims" className="btn btn-outline-primary w-100">My Claims</Link>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
