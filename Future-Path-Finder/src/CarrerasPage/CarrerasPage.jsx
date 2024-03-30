import React, { useState, useEffect } from 'react';
import './CarrerasPage.css'; // Importa los estilos CSS
import axios from 'axios'; // Importa Axios para hacer solicitudes HTTP

function CarrerasPage() {
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/carreras');
        setAreas(response.data);
      } catch (error) {
        console.error('Error al obtener las áreas:', error);
      }
    };

    fetchAreas();
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
        {/* Verifica si areas es un array antes de usar map */}
        {Array.isArray(areas) && areas.map(area => (
          <div key={area._id} className="area-box">
            <div className="area-title">{area.area}</div>
            <div className="area-description">
              <ul>
                {Array.isArray(area.carreras) && area.carreras.map(carrera => (
                  <li key={carrera}>{carrera}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </section>
      <footer>
      </footer>
    </div>
  );
}

export default CarrerasPage;