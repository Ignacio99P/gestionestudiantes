import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import AgregarEstudiante from "./AgregarEstudiante";
import ListarEstudiantes from "./ListarEstudiantes";
import Header from "./Header"; // Asegúrate de que la ruta sea correcta
import './styles/App.css';

const AppContent = () => {
  const [showWelcome, setShowWelcome] = useState(true); // Estado para mostrar el mensaje de bienvenida
  const [menuOpen, setMenuOpen] = useState(false); // Estado para controlar si el menú desplegable está abierto
  const navigate = useNavigate();

  const handleMenuClick = (path) => {
    setShowWelcome(false); // Ocultar el mensaje de bienvenida
    setMenuOpen(false); // Cerrar el menú
    navigate(path); // Navegar a la nueva ruta
  };

  return (
    <div className="app-container">
      {showWelcome && (
        <>
          <h1 className="welcome-title">¡Bienvenido al Sistema de Gestión de Estudiantes de Instiform!</h1>
          <div className="navbar">
            <button 
              className="dropdown-button" 
              onClick={() => setMenuOpen(!menuOpen)} // Alternar el estado del menú
            >
              Menu
            </button>
            {menuOpen && ( // Solo mostrar el menú si está abierto
              <div className="dropdown-menu">
                <ul>
                  <li>
                    <a onClick={() => handleMenuClick("/agregar-estudiante")}>Agregar Estudiante</a>
                  </li>
                  <li>
                    <a onClick={() => handleMenuClick("/listar-estudiantes")}>Listar Estudiantes</a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </>
      )}
      
      <Routes>
        <Route path="/agregar-estudiante" element={<AgregarEstudiante />} />
        <Route path="/listar-estudiantes" element={<ListarEstudiantes />} />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Header />
      <AppContent />
    </Router>
  );
};

export default App;
