import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './styles/AgregarEstudiante.css';

const AgregarEstudiante = () => {
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre || !edad || !email || !telefono) {
      setError('Todos los campos son obligatorios');
      return;
    }

    console.log('Estudiante agregado:', { nombre, edad, email, telefono });
    navigate('/listar-estudiantes');
  };

  return (
    <div className="form-container">
      <Link to="/" className="back-home-button">Volver a Inicio</Link> {/* Botón de volver a inicio */}
      <h2>Agregar Estudiante</h2>
      {error && <p className="error">{error}</p>}
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
          <label>Edad:</label>
          <input
            type="number"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
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
