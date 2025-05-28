import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="container text-center mt-5">
      <h1 className="display-4">Welcome to Lost & Found</h1>
      <p className="lead mt-3 mb-4">
        Easily report and search for lost or found items within your institute.
      </p>
      <div className="d-flex justify-content-center gap-3">
        <Link to="/login" className="btn btn-primary btn-lg">Login</Link>
        <Link to="/signup" className="btn btn-outline-primary btn-lg">Signup</Link>
      </div>
    </div>
  );
};

export default HomePage;
