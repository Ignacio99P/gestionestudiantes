import React, { useState } from "react";
import StudentForm from "estudianteFormulario";
import StudentList from "estudianteLista";
import Filter from "detalleEstudiante";
import 'App.css';


const App = () => {
  // Estado para almacenar la lista de alumnos y el filtro
  const [students, setStudents] = useState([]);
  const [filter, setFilter] = useState('');

  // Función para agregar un nuevo alumno
  const addStudent = (student) => {
    setStudents([...students, student]);
  };

  // Función para eliminar un alumno por DNI
  const deleteStudent = (dni) => {
    setStudents(students.filter(student => student.dni !== dni));
  };

  // Filtrar la lista de alumnos según el nombre
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="app-container">
      <h1>Gestión de Alumnos</h1>
      <StudentForm onSubmit={addStudent} />
      <Filter setFilter={setFilter} />
      <StudentList students={filteredStudents} onDelete={deleteStudent} />
    </div>
  );
};

export default App;
