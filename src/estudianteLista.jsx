import React from "react";
import 'Estudiantelista.css';

const StudentList = ({ students, onDelete }) => (
  <ul className="student-list">
    {students.map((student, index) => (
      <li key={index} className="student-item">
        {student.name} {student.lastName}
        <button onClick={() => onDelete(student.dni)}>Eliminar</button>
      </li>
    ))}
  </ul>
);

export default StudentList;
