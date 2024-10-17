import React, { useState, useEffect } from 'react';
import './styles/ListarEstudiantes.css';

const ListarEstudiantes = ({ onBack }) => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [error, setError] = useState('');

  // Obtener estudiantes al cargar el componente
  useEffect(() => {
    const fetchEstudiantes = async () => {
      try {
        const respuesta = await fetch('http://localhost:3000/api/estudiantes');
        const data = await respuesta.json();
        setEstudiantes(data);
      } catch (error) {
        setError('Error al obtener los estudiantes');
      }
    };

    fetchEstudiantes();
  }, []);

  // Manejar los cambios de los inputs al editar
  const handleInputChange = (e, id) => {
    const { name, value } = e.target;
    setEstudiantes((prevEstudiantes) =>
      prevEstudiantes.map((est) =>
        est._id === id ? { ...est, [name]: value } : est
      )
    );
  };

  // Guardar los cambios del estudiante (actualiza en el backend)
  const handleSave = async (id) => {
    const estudianteActualizado = estudiantes.find((est) => est._id === id);

    try {
      const respuesta = await fetch(`http://localhost:3000/api/estudiantes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(estudianteActualizado), // Envía los datos actualizados
      });

      if (respuesta.ok) {
        console.log('Estudiante actualizado:', estudianteActualizado);
        setEditingStudent(null); // Salir del modo edición
      } else {
        const data = await respuesta.json();
        setError(data.error || 'Error al actualizar el estudiante');
      }
    } catch (error) {
      console.error('Error al conectar con el servidor:', error);
      setError('Error al conectar con el servidor');
    }
  };

  // Eliminar estudiante y recargar la página
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este estudiante?');

    if (confirmDelete) {
      try {
        const respuesta = await fetch(`http://localhost:3000/api/estudiantes/${id}`, {
          method: 'DELETE',
        });

        if (respuesta.ok) {
          console.log(`Estudiante con ID ${id} eliminado.`);
          window.location.reload(); // Recargar la página automáticamente
        } else {
          const data = await respuesta.json();
          console.error('Error:', data.error);
          alert(`Error: ${data.error}`);
        }
      } catch (error) {
        console.error('Error al conectar con el servidor:', error);
        alert('Error al conectar con el servidor.');
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Listado de Alumnos</h2>

      {error && <p className="error">{error}</p>}

      {estudiantes.map((estudiante) => (
        <div key={estudiante._id} className="estudiante-item">
          {editingStudent === estudiante._id ? (
            <div>
              <label>Nombre:</label>
              <input
                type="text"
                name="nombre"
                value={estudiante.nombre}
                onChange={(e) => handleInputChange(e, estudiante._id)}
              />

              <label>Apellido:</label>
              <input
                type="text"
                name="apellido"
                value={estudiante.apellido}
                onChange={(e) => handleInputChange(e, estudiante._id)}
              />

              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={estudiante.email}
                onChange={(e) => handleInputChange(e, estudiante._id)}
              />

              <label>Teléfono:</label>
              <input
                type="tel"
                name="telefono"
                value={estudiante.telefono}
                onChange={(e) => handleInputChange(e, estudiante._id)}
              />

              <button onClick={() => handleSave(estudiante._id)}>Guardar</button>
            </div>
          ) : (
            <div>
              <p><strong>Nombre:</strong> {estudiante.nombre}</p>
              <p><strong>Apellido:</strong> {estudiante.apellido}</p>
              <p><strong>Email:</strong> {estudiante.email}</p>
              <p><strong>Teléfono:</strong> {estudiante.telefono}</p>

              <button onClick={() => setEditingStudent(estudiante._id)}>Editar</button>
              <button
                onClick={() => handleDelete(estudiante._id)}
                style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}
              >
                Eliminar
              </button>
            </div>
          )}
        </div>
      ))}

      <button className="back-home-button" onClick={onBack}>
        Volver a Inicio
      </button>
    </div>
  );
};

export default ListarEstudiantes;
