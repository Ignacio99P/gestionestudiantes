import React from "react";
import "./estudianteLista.css";

const EstudianteLista = ({ students }) => {
  return (
    <ul className="student-list">
      {students.map((student, index) => (
        <li key={index} className="student-item">
          {student.nombre}
        </li>
      ))}
    </ul>
  );
};

export default EstudianteLista;
