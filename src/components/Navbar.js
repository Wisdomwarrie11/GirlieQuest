import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Nvabar.css'; // Optional if you want custom styles

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Pages where navbar should NOT show (like home/login etc)
  const hideOnPaths = ['/', '/login'];
  if (hideOnPaths.includes(location.pathname)) return null;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top px-3">
      <span className="navbar-brand fw-bold text-white"><button className="btn btn-outline-light btn-sm" onClick={() => navigate('/')}>GirlieQuest</button></span>
      <div className="ms-auto d-flex gap-3">
        <button className="btn btn-outline-light btn-sm" onClick={() => navigate('/levels')}>
          🔙 Back to Levels
        </button>
        
        <button className="btn btn-outline-light btn-sm" onClick={() => navigate('/periodcal')}>
          ❤️ Period Calculator
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
