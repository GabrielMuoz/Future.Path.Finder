import React, { useState, useEffect } from 'react';
import './CarrerasPage.css'; // Importa los estilos CSS
import axios from 'axios'; // Importa Axios para hacer solicitudes HTTP

function CarrerasPage() {
  const [carreras, setCarreras] = useState([]);

  useEffect(() => {
    const fetchCarreras = async () => {
      try {
        const response = await axios.get('/api/carreras');
        setCarreras(response.data);
      } catch (error) {
        console.error('Error al obtener las carreras:', error);
      }
    };

    fetchCarreras();
  }, []);

  return (
    <div>
      <header>
        <h1>Future Path Finder</h1>
      </header>
      <nav>
        <ul>
          <li><a className="linkBarra" href="#">Inicio</a></li>
        </ul>
        <ul>
          <li><a className="linkBarra" href="#">Test</a></li>
        </ul>
      </nav>
      <section>
        <div className="area-container">
          {carreras.map(carrera => (
            <div key={carrera._id} className="area-box">
              <div className="area-title">{carrera.area}</div>
              <div className="area-description">
                <ul>
                  <li><strong>Área:</strong> {carrera.area}</li>
                  <li><strong>Nombre de Carrera:</strong> {carrera.nombre}</li>
                  <li><strong>Duración:</strong> {carrera.duracion}</li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
      <footer>
      </footer>
    </div>
  );
}

export default CarrerasPage;
