// src/Header.jsx
import React from 'react';
import logo from '../Logo.png'; // Asegúrate de que la ruta sea correcta
import './styles/Header.css'; // Asegúrate de que la ruta sea correcta

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="title">Instiform</h1>
       
      </div>
    </header>
  );
};

export default Header;


