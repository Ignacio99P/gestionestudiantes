import React from 'react';
import { Link } from 'react-router-dom';
import './styles/ListarEstudiantes.css';

const ListarEstudiantes = () => {
  // Simulación de una lista de estudiantes, reemplaza con tus datos reales
  const estudiantes = [
    { id: 1, nombre: "Juan Pérez", edad: 20, email: "juan.perez@example.com", telefono: "1234567890" },
    { id: 2, nombre: "Ana Gómez", edad: 22, email: "ana.gomez@example.com", telefono: "0987654321" },
    // Agrega más estudiantes según sea necesario
  ];

  return (
    <div className="list-container">
      <Link to="/" className="back-home-button">Volver a Inicio</Link>
      <h2>Lista de Estudiantes</h2>

      {estudiantes.length === 0 ? (
        <p>No hay estudiantes registrados.</p>
      ) : (
        <table className="estudiantes-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Edad</th>
              <th>Email</th>
              <th>Teléfono</th>
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
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListarEstudiantes;
