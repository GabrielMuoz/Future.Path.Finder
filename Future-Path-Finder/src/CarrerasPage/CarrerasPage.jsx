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

function CarrerasPage() {
  const [areas, setAreas] = useState([]);
  const [filtro, setFiltro] = useState('Mostrar todas'); // Nuevo estado para el filtro
  const [isOpen, setIsOpen] = useState(false); // Nuevo estado para controlar la apertura del menú

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

  const opciones = ['Mostrar todas', ...new Set(areas.map(area => area.area))]; // Opciones para el filtro

  const handleFilterChange = (opcion) => {
    setFiltro(opcion);
    setIsOpen(false);
    window.scrollTo(0, 0); // Desplaza la ventana al inicio de la página
  };

  return (
    <div>
      <header>
        <h1>Future Path Finder</h1>
        <nav>
          {links.map((link, index) => (
            <Link key={index} to={link.href} className="linkBarra">
              {link.name}
            </Link>
          ))}
        </nav>
      </header>
      <div className="filter-container">
        <button className="menu-button" onClick={() => setIsOpen(!isOpen)}>
          Filtrar por área STEM
          <i className={isOpen ? "arrow up" : "arrow down"}></i>
        </button>
        {isOpen && (
          <div className="dropdown-menu">
            {opciones.map(opcion => (
              <button key={opcion} onClick={() => handleFilterChange(opcion)} className="dropdown-item">
                {opcion}
              </button>
            ))}
          </div>
        )}
      </div>
      <section>
        {Array.isArray(areas) && areas
          .filter(area => filtro === 'Mostrar todas' || area.area === filtro)
          .map(area => (
            <div key={area._id} className="area-box">
              <div className="area-title">{area.area}</div>
              <div className="area-description">
                {Array.isArray(area.carreras) && area.carreras
                  .map(carrera => (
                    <div key={carrera.nombre} className="carrera-box">
                      <h3>{carrera.nombre}</h3>
                      <p><strong>Duración:</strong> {carrera.duracion}</p>
                      <p>{carrera.descripcion}</p>
                    </div>
                  ))}
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
