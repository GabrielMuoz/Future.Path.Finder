import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CarrerasPage.css'; // Importa los estilos CSS
import axios from 'axios'; // Importa Axios para hacer solicitudes HTTP

const links = [
  {
      name: "Inicio",
      href: "/"
  },
  {
      name: "Test",
      href: "/test"
  },
];

const opciones = ['Tecnología', 'Ciencia', 'Ingeniería', 'Matemáticas']; // Opciones para el filtro

function CarrerasPage() {
  const [areas, setAreas] = useState([]);
  const [filtro, setFiltro] = useState(''); // Nuevo estado para el filtro

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
        {links.map((link, index) => (
          <Link key={index} to={link.href} className="linkBarra">{link.name}</Link>
        ))}
      </nav>
      <select 
        value={filtro} 
        onChange={e => setFiltro(e.target.value)} 
      > {/* Selector para el filtro */}
        <option value="">Selecciona una opción</option>
        {opciones.map(opcion => (
          <option key={opcion} value={opcion}>{opcion}</option>
        ))}
      </select>
      <section>
        {/* Filtra las áreas basándote en el valor del filtro antes de mapearlas */}
        {Array.isArray(areas) && areas.filter(area => area.area.includes(filtro)).map(area => (
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