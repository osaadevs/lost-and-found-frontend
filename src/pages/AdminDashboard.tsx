import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  return (
    <div className="container mt-5">
      <h2>Welcome, Admin</h2>
      <div className="row mt-4">
        <div className="col-md-6 mb-3">
          <Link to="/admin/items" className="btn btn-danger w-100">View All Items</Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
