import React from "react";
import 'DetalleEstudiante.css';

const StudentDetail = ({ student }) => (
  <div className="student-detail">
    <h2>{student.name} {student.lastName}</h2>
    <p>DNI: {student.dni}</p>
  </div>
);

export default StudentDetail;
