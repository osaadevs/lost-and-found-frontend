import React from 'react';
import { Link } from 'react-router-dom';

const StaffDashboard: React.FC = () => {
  return (
    <div className="container mt-5">
      <h2>Welcome, Staff</h2>
      <div className="row mt-4">
        <div className="col-md-6 mb-3">
          <Link to="/staff/report" className="btn btn-primary w-100">Report Found Item</Link>
        </div>
        <div className="col-md-6 mb-3">
          <Link to="/staff/found" className="btn btn-outline-primary w-100">View Found Items</Link>
        </div>
        <div className="col-md-6 mb-3">
          <Link to="/staff/claims" className="btn btn-outline-primary w-100">Manage Claims</Link>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
