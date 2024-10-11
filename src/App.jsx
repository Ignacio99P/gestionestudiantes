import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AgregarEstudiante from "./AgregarEstudiante";
import ListarEstudiantes from "./ListarEstudiantes";
import './styles/App.css'; // Asegúrate de que este archivo esté correctamente referenciado

const App = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <Router>
      <div className="app-container">
        {/* Mensaje de Bienvenida */}
        <h1 className="welcome-title">Bienvenido al Sistema de Gestión de Estudiantes</h1>

        {/* Menú de Navegación */}
        <div className="navbar">
          <button className="dropdown-button" onClick={toggleDropdown}>
            Menú
          </button>
          {dropdownOpen && (
            <ul className="dropdown-menu">
              <li>
                <Link to="/agregar-estudiante">Agregar Estudiante</Link>
              </li>
              <li>
                <Link to="/listar-estudiantes">Listar Estudiantes</Link>
              </li>
            </ul>
          )}
        </div>

        {/* Rutas */}
        <Routes>
          <Route path="/agregar-estudiante" element={<AgregarEstudiante />} />
          <Route path="/listar-estudiantes" element={<ListarEstudiantes />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
