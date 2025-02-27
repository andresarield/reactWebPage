import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav style={{ backgroundColor: '#333', padding: '10px', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none', marginRight: '15px' }}>
          Inicio
        </Link>
        <Link to="/admin" style={{ color: '#fff', textDecoration: 'none', marginRight: '15px' }}>
          Admin
        </Link>
      </div>
      <div>
        {localStorage.getItem('token') ? (
          <button onClick={handleLogout} style={{ padding: '8px 12px', backgroundColor: '#dc3545', color: '#fff', border: 'none', cursor: 'pointer' }}>
            Cerrar Sesión
          </button>
        ) : (
          <>
            <Link to="/login" style={{ color: '#fff', textDecoration: 'none', marginRight: '15px' }}>
              Iniciar Sesión
            </Link>
            <Link to="/register" style={{ color: '#fff', textDecoration: 'none' }}>
              Registrarse
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;