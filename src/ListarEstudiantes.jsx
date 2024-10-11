// src/ListarEstudiantes.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/ListarEstudiantes.css';

const ListarEstudiantes = () => {
  const navigate = useNavigate();

  // Estado para los estudiantes
  const [estudiantes, setEstudiantes] = useState([
    { id: 1, nombre: 'Juan Pérez', edad: 20, email: 'juan@example.com', telefono: '123456789' },
    { id: 2, nombre: 'María Gómez', edad: 22, email: 'maria@example.com', telefono: '987654321' },
    // Agrega más estudiantes según sea necesario
  ]);
  
  // Estado para el estudiante a editar
  const [estudianteEdit, setEstudianteEdit] = useState(null);

  // Función para eliminar estudiante
  const handleDelete = (id) => {
    const nuevosEstudiantes = estudiantes.filter(estudiante => estudiante.id !== id);
    setEstudiantes(nuevosEstudiantes);
  };

  // Función para preparar el formulario de edición
  const handleEdit = (estudiante) => {
    setEstudianteEdit(estudiante);
  };

  // Función para manejar la actualización del estudiante
  const handleUpdate = (e) => {
    e.preventDefault();
    const { id, nombre, edad, email, telefono } = estudianteEdit;
    const nuevosEstudiantes = estudiantes.map(estudiante => 
      estudiante.id === id ? { id, nombre, edad, email, telefono } : estudiante
    );
    setEstudiantes(nuevosEstudiantes);
    setEstudianteEdit(null); // Limpiar el formulario
  };

  return (
    <div className="list-container">
      <button className="back-button" onClick={() => navigate('/')}>
        Volver a Inicio
      </button>
      <h2>Listado de Estudiantes</h2>
      <table className="estudiantes-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Edad</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Acciones</th> {/* Nueva columna para acciones */}
          </tr>
        </thead>
        <tbody>
          {estudiantes.map(estudiante => (
            <tr key={estudiante.id}>
              <td>{estudiante.id}</td>
              <td>{estudiante.nombre}</td>
              <td>{estudiante.edad}</td>
              <td>{estudiante.email}</td>
              <td>{estudiante.telefono}</td>
              <td>
                <button onClick={() => handleEdit(estudiante)} className="edit-button">Actualizar</button>
                <button onClick={() => handleDelete(estudiante.id)} className="delete-button">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Formulario de actualización */}
      {estudianteEdit && (
        <div className="edit-form">
          <h3>Actualizar Estudiante</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-group">
              <label>Nombre:</label>
              <input
                type="text"
                value={estudianteEdit.nombre}
                onChange={(e) => setEstudianteEdit({ ...estudianteEdit, nombre: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Edad:</label>
              <input
                type="number"
                value={estudianteEdit.edad}
                onChange={(e) => setEstudianteEdit({ ...estudianteEdit, edad: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={estudianteEdit.email}
                onChange={(e) => setEstudianteEdit({ ...estudianteEdit, email: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Teléfono:</label>
              <input
                type="tel"
                value={estudianteEdit.telefono}
                onChange={(e) => setEstudianteEdit({ ...estudianteEdit, telefono: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="submit-button">Guardar Cambios</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ListarEstudiantes;

