import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/AgregarEstudiante.css';

const AgregarEstudiante = ({ onBack }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [dni, setDni] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre || !apellido || !dni || !fechaNacimiento || !email || !telefono) {
      setError('Todos los campos son obligatorios');
      return;
    }

    try {
      const respuesta = await fetch('http://localhost:3000/api/estudiantes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre,
          apellido,
          dni,
          fecha_nacimiento: fechaNacimiento, // Asegúrate de que esta clave coincida con el modelo
          email,
          telefono,
        }),
      });

      if (respuesta.ok) {
        setMensaje('Estudiante agregado exitosamente');
        setError('');
        setNombre('');
        setApellido('');
        setDni('');
        setFechaNacimiento('');
        setEmail('');
        setTelefono('');
      } else {
        const data = await respuesta.json();
        setError(data.error);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setError('Error al conectar con el servidor');
    }
  };

  return (
    <div className="form-container">
      <Link to="/" className="back-home-button" onClick={onBack}>Volver a Inicio</Link>
      <h2>Agregar Estudiante</h2>
      {error && <p className="error">{error}</p>}
      {mensaje && <p className="success">{mensaje}</p>}
      <form onSubmit={handleSubmit}>
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
          <label>DNI:</label>
          <input
            type="text" // Cambiado a texto para que funcione con cualquier formato
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Fecha de Nacimiento:</label>
          <input
            type="date"
            value={fechaNacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
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
        <div className="form-group">
          <label>Teléfono:</label>
          <input
            type="tel"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Agregar</button>
      </form>
    </div>
  );
};

export default AgregarEstudiante;
