import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import AgregarEstudiante from "./AgregarEstudiante";
import ListarEstudiantes from "./ListarEstudiantes";
import Header from "./Header";
import './styles/App.css';

const AppContent = () => {
  const [showWelcome, setShowWelcome] = useState(true); // Estado para mostrar el mensaje de bienvenida
  const [menuOpen, setMenuOpen] = useState(false); // Estado para controlar si el menú desplegable está abierto
  const navigate = useNavigate();

  const handleMenuClick = (path) => {
    setShowWelcome(false); // Ocultar el mensaje de bienvenida cuando navegamos
    setMenuOpen(false); // Cerrar el menú
    navigate(path); // Navegar a la nueva ruta
  };

  const handleBackToHome = () => {
    setShowWelcome(true); // Mostrar de nuevo el mensaje de bienvenida
    setMenuOpen(false); // Cerrar el menú
    navigate('/'); // Navegar de vuelta a la página principal
  };

  return (
    <div className="app-container">
      <Header />
      {showWelcome && ( // Mostrar solo si estamos en la página de inicio
        <>
          <h1 className="welcome-title">¡Bienvenido al Sistema de Gestión de Estudiantes de Instiform!</h1>
          <div className="navbar">
            <button 
              className="dropdown-button" 
              onClick={() => setMenuOpen(!menuOpen)} // Alternar el estado del menú
            >
              Menú
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
        <Route path="/agregar-estudiante" element={<AgregarEstudiante onBack={handleBackToHome} />} />
        <Route path="/listar-estudiantes" element={<ListarEstudiantes onBack={handleBackToHome} />} />

      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
