import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const getDashboardRoute = () => {
    if (role === 'USER') return '/user/dashboard';
    if (role === 'STAFF') return '/staff/dashboard';
    if (role === 'ADMIN') return '/admin/dashboard';
    return '/';
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">Lost & Found</Link>
      <div className="ms-auto d-flex gap-3">
        {token ? (
          <>
            <NavLink className="nav-link text-white" to={getDashboardRoute()}>
              Dashboard
            </NavLink>
            <button onClick={handleLogout} className="btn btn-sm btn-outline-light">
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink className="nav-link text-white" to="/login">Login</NavLink>
            <NavLink className="nav-link text-white" to="/signup">Signup</NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
