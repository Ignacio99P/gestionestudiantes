import React, { useState } from "react";
import EstudianteFormulario from "./componentes/estudianteFormulario";
import EstudianteLista from "./componentes/estudianteLista";
import DetalleEstudiante from "./componentes/detalleEstudiante";
import Filtro from "./componentes/filtro";

import "./App.css";  // Para agregar estilos globales si necesitas

const App = () => {
  const [estudiantes, setEstudiantes] = useState([]);

  const agregarEstudiante = (nuevoEstudiante) => {
    setEstudiantes([...estudiantes, nuevoEstudiante]);
  };

  return (
    <div className="app-container">
      <h1>Gestión de Estudiantes</h1>
      <EstudianteFormulario onSubmit={agregarEstudiante} />
      <Filtro />
      <EstudianteLista students={estudiantes} />
      {estudiantes.length > 0 && <DetalleEstudiante student={estudiantes[0]} />}
    </div>
  );
};

export default App;
