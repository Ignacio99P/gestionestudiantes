import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/AgregarEstudiante.css';

const AgregarEstudiante = ({ onBack }) => {
  const [dni, setDni] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [fecha_nacimiento, setFechaNacimiento] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de campos
    if (!dni || !nombre || !apellido || !fecha_nacimiento || !telefono || !email) {
      setError('Todos los campos son obligatorios');
      return;
    }

    // Limpiar error si todo está bien
    setError('');

    const nuevoEstudiante = {
      dni,
      nombre,
      apellido,
      fecha_nacimiento,
      telefono,
      email,
    };

    try {
      const response = await fetch('http://localhost:3000/api/estudiantes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoEstudiante), // Enviar el estudiante como JSON
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Estudiante agregado:', data);
      alert('Estudiante agregado con éxito.');

      // Limpiar los campos después de agregar el estudiante
      setDni('');
      setNombre('');
      setApellido('');
      setFechaNacimiento('');
      setTelefono('');
      setEmail('');
    } catch (error) {
      console.error('Error al agregar el estudiante:', error);
      alert('Hubo un problema al agregar el estudiante. Inténtalo de nuevo.');
    }
  };

  return (
    <div className="form-container">
      <Link to="/" className="back-home-button" onClick={onBack}>Volver a Inicio</Link>

      <h2>Agregar Estudiante</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>DNI:</label>
          <input
            type="number"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Apellido:</label>
          <input
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Fecha De Nacimiento:</label>
          <input
            type="date"
            value={fecha_nacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Teléfono:</label>
          <input
            type="tel"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="submit-button">Agregar</button>
      </form>
    </div>
  );
};

export default AgregarEstudiante;
