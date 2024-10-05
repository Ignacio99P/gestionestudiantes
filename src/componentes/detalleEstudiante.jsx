import React from "react";
import "./detalleEstudiante.css";

const DetalleEstudiante = ({ student }) => {
  return (
    <div className="student-detail">
      <h2>Detalle del Estudiante</h2>
      <p>Nombre: {student.nombre}</p>
    </div>
  );
};

export default DetalleEstudiante;

