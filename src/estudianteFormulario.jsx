import React, { useState } from "react";
import 'estudianteFormulario.css';

const StudentForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dni, setDni] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && lastName && dni) {
      onSubmit({ name, lastName, dni });
      setName('');
      setLastName('');
      setDni('');
    } else {
      alert("Todos los campos son obligatorios");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="student-form">
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Apellido"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        type="text"
        placeholder="DNI"
        value={dni}
        onChange={(e) => setDni(e.target.value)}
      />
      <button type="submit">Agregar Alumno</button>
    </form>
  );
};

export default StudentForm;


 

