import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const goToDashboard = () => {
    if (role === 'USER') navigate('/user/dashboard');
    else if (role === 'STAFF') navigate('/staff/dashboard');
    else if (role === 'ADMIN') navigate('/admin/dashboard');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">
          Lost & Found
        </Link>

        <div className="d-flex align-items-center gap-2">
          {!token && (
            <>
              <Link className="btn btn-outline-light btn-sm" to="/login">
                Login
              </Link>
              <Link className="btn btn-outline-light btn-sm" to="/signup">
                Signup
              </Link>
            </>
          )}

          {token && (
            <>
              <button onClick={goToDashboard} className="btn btn-outline-info btn-sm">
                Dashboard
              </button>
              <button onClick={handleLogout} className="btn btn-danger btn-sm">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
