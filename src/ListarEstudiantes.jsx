import React, { useState, useEffect } from 'react';
import './styles/ListarEstudiantes.css'; // Asegúrate de tener estilos

const ListarEstudiantes = ({ onBack }) => {
  const [estudiantes, setEstudiantes] = useState([]); // Array vacío inicialmente
  const [editingStudentId, setEditingStudentId] = useState(null); // Estado para editar
  const [formValues, setFormValues] = useState({}); // Almacena los valores del formulario

  // Función para formatear la fecha en DD/MM/YYYY
  const formatFechaNacimiento = (fechaISO) => {
    const fecha = new Date(fechaISO);
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const anio = fecha.getFullYear();
    return `${dia}/${mes}/${anio}`;
  };

  // Cargar estudiantes desde la API al montar el componente
  useEffect(() => {
    const fetchEstudiantes = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/estudiantes');
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setEstudiantes(data); // Guardar los estudiantes en el estado
      } catch (error) {
        console.error('Error fetching students:', error);
        alert('Hubo un problema al cargar los estudiantes.');
      }
    };

    fetchEstudiantes();
  }, []);

  // Manejar cambios de inputs al editar
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Actualiza los valores del formulario
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Al hacer clic en editar, inicializamos los valores del formulario
  const handleEditClick = (estudiante) => {
    setEditingStudentId(estudiante.id);
    setFormValues({
      dni: estudiante.dni,
      nombre: estudiante.nombre,
      apellido: estudiante.apellido,
      fecha_nacimiento: estudiante.fecha_nacimiento.split('T')[0], // Mostrar solo la fecha
      telefono: estudiante.telefono,
      email: estudiante.email,
    });
    console.log('Editando estudiante:', estudiante); // Añadir logging
  };

  // Guardar cambios del estudiante editado
  const handleSave = async () => {
    console.log('Guardando cambios para estudiante:', formValues); // Añadir logging
    if (!editingStudentId) return;

    try {
      const response = await fetch(`http://localhost:3000/api/estudiantes/${formValues.dni}`, {
        method: 'PUT', // Cambiado a PUT si actualizas todos los campos
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues), // Enviamos los nuevos valores
      });

      if (!response.ok) {
        throw new Error(`Error al actualizar el estudiante: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Estudiante actualizado en la base de datos:', data);

      // Actualiza la lista de estudiantes en el estado local
      setEstudiantes((prevEstudiantes) =>
        prevEstudiantes.map((est) => (est.dni === formValues.dni ? { ...est, ...formValues } : est))
      );

      setEditingStudentId(null); // Salir del modo edición
      alert('Estudiante actualizado correctamente');
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
      alert('Hubo un problema al guardar los cambios.');
    }
  };

  // Eliminar estudiante (solo en el estado local)
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

      {estudiantes.length > 0 ? (
        estudiantes.map((estudiante) => (
          <div key={estudiante.id} className="estudiante-item">
            {editingStudentId === estudiante.id ? (
              <div>
                <label>DNI:</label>
                <input
                  type="text"
                  name="dni"
                  value={formValues.dni}
                  readOnly // Hacer que el DNI no se pueda editar
                />
                <label>Nombre:</label>
                <input
                  type="text"
                  name="nombre"
                  value={formValues.nombre}
                  onChange={handleInputChange}
                />
                <label>Apellido:</label>
                <input
                  type="text"
                  name="apellido"
                  value={formValues.apellido}
                  onChange={handleInputChange}
                />
                <label>Fecha de Nacimiento:</label>
                <input
                  type="date"
                  name="fecha_nacimiento"
                  value={formValues.fecha_nacimiento} // Usa los valores del formulario
                  onChange={handleInputChange}
                />
                <label>Teléfono:</label>
                <input
                  type="tel"
                  name="telefono"
                  value={formValues.telefono}
                  onChange={handleInputChange}
                />
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formValues.email}
                  onChange={handleInputChange}
                />

                <button onClick={handleSave}>Guardar</button> {/* Asegúrate de que este botón llama a handleSave */}
              </div>
            ) : (
              <div>
                <p><strong>DNI:</strong> {estudiante.dni}</p>
                <p><strong>Nombre:</strong> {estudiante.nombre}</p>
                <p><strong>Apellido:</strong> {estudiante.apellido}</p>
                <p><strong>Fecha de Nacimiento:</strong> {formatFechaNacimiento(estudiante.fecha_nacimiento)}</p>
                <p><strong>Teléfono:</strong> {estudiante.telefono}</p>
                <p><strong>Email:</strong> {estudiante.email}</p>

                <button onClick={() => handleEditClick(estudiante)}>Editar</button>
                <button
                  onClick={() => handleDelete(estudiante.id)}
                  style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}
                >
                  Eliminar
                </button>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No hay estudiantes disponibles.</p>
      )}

      <button className="back-home-button" onClick={onBack}>Volver a Inicio</button>
    </div>
  );
};

export default ListarEstudiantes;
