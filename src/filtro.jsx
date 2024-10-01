import React from "react";
import 'Filtro.css';

const Filter = ({ setFilter }) => (
  <input
    className="filter-input"
    type="text"
    placeholder="Buscar alumno"
    onChange={(e) => setFilter(e.target.value)}
  />
);

export default Filter;
