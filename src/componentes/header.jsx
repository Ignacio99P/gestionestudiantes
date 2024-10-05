// Header.jsx
import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="app-header">
      <h1>Gestión de Estudiantes</h1>
      <nav>
        <ul>
          <li><Link to="/ingresar-estudiante">Ingresar Estudiante</Link></li>
          <li><Link to="/listar-estudiantes">Listar Estudiantes</Link></li>
          <li><Link to="/filtros">Filtros</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
