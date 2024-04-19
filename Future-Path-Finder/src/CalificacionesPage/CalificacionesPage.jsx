import React, { useState, useEffect } from 'react';
import './CalificacionesPage.css'; 
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

function CalificacionesPage() {
  const location = useLocation();
  const calificaciones = location.state ? location.state.calificaciones : null;

  return (
    <div>
      <h2>Calificaciones</h2>
      {calificaciones ? (
        <div>
          <p>Ciencia: {calificaciones.ciencia}</p>
          <p>Matemáticas: {calificaciones.matematicas}</p>
          <p>Ingeniería: {calificaciones.ingenieria}</p>
          <p>Tecnología: {calificaciones.tecnologia}</p>
        </div>
      ) : (
        <p>No hay calificaciones disponibles</p>
      )}
    </div>
  );
}

export default CalificacionesPage;
