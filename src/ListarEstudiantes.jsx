import React, { useState, useEffect } from 'react';
import './styles/ListarEstudiantes.css'; // Asegúrate de tener estilos

const ListarEstudiantes = ({ onBack }) => {
  // Datos de ejemplo (esto debería venir de una API o base de datos)
  const [estudiantes, setEstudiantes] = useState([
    { id: 1, nombre: 'Juan Pérez', edad: 22, email: 'juan@mail.com', telefono: '123456789' },
    { id: 2, nombre: 'Ana García', edad: 21, email: 'ana@mail.com', telefono: '987654321' }
  ]);

  // Estado para manejar los estudiantes editados
  const [editingStudent, setEditingStudent] = useState(null);

  // Manejar los cambios de los inputs cuando se está editando un estudiante
  const handleInputChange = (e, id) => {
    const { name, value } = e.target;
    setEstudiantes((prevEstudiantes) =>
      prevEstudiantes.map((est) =>
        est.id === id ? { ...est, [name]: value } : est
      )
    );
  };

  // Guardar los cambios del estudiante editado
  const handleSave = (id) => {
    console.log('Estudiante actualizado:', estudiantes.find((est) => est.id === id));
    setEditingStudent(null); // Salir del modo de edición
  };

  // Eliminar estudiante
  const handleDelete = (id) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este estudiante?');
    if (confirmDelete) {
      setEstudiantes((prevEstudiantes) =>
        prevEstudiantes.filter((est) => est.id !== id)
      );
      console.log('Estudiante eliminado:', id);
    }
  };

  return (
    <div className="form-container">
      <h2>Listado de Alumnos</h2>
      
      {estudiantes.map((estudiante) => (
        <div key={estudiante.id} className="estudiante-item">
          {editingStudent === estudiante.id ? (
            <div>
              <label>Nombre:</label>
              <input
                type="text"
                name="nombre"
                value={estudiante.nombre}
                onChange={(e) => handleInputChange(e, estudiante.id)}
              />

              <label>Edad:</label>
              <input
                type="number"
                name="edad"
                value={estudiante.edad}
                onChange={(e) => handleInputChange(e, estudiante.id)}
              />

              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={estudiante.email}
                onChange={(e) => handleInputChange(e, estudiante.id)}
              />

              <label>Teléfono:</label>
              <input
                type="tel"
                name="telefono"
                value={estudiante.telefono}
                onChange={(e) => handleInputChange(e, estudiante.id)}
              />

              <button onClick={() => handleSave(estudiante.id)}>Guardar</button>
            </div>
          ) : (
            <div>
              <p><strong>Nombre:</strong> {estudiante.nombre}</p>
              <p><strong>Edad:</strong> {estudiante.edad}</p>
              <p><strong>Email:</strong> {estudiante.email}</p>
              <p><strong>Teléfono:</strong> {estudiante.telefono}</p>

              <button onClick={() => setEditingStudent(estudiante.id)}>Editar</button>
              <button onClick={() => handleDelete(estudiante.id)} style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}>Eliminar</button>
            </div>
          )}
        </div>
      ))}

      <button className="back-home-button" onClick={onBack}>Volver a Inicio</button>
    </div>
  );
};

export default ListarEstudiantes;
