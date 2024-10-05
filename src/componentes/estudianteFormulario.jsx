import React, { useState } from "react";
import "./estudianteFormulario.css";

const EstudianteFormulario = ({ onSubmit }) => {
  const [nombre, setNombre] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ nombre });
    setNombre("");
  };

  return (
    <form onSubmit={handleSubmit} className="formulario">
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nombre del estudiante"
        className="form-input"
      />
      <button type="submit" className="form-button">Agregar Estudiante</button>
    </form>
  );
};

export default EstudianteFormulario;
