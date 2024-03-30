import React, { useState, useEffect } from 'react';
import './TestPage.css'; 
import { Link } from 'react-router-dom';
import axios from 'axios';

const links=[
    {
        name: "Regresar al inicio",
        href: "/"
    },
];

function TestPage() {
  const [preguntas, setPreguntas] = useState([]);

  useEffect(() => {
    const fetchPreguntas = async () => {
      try {
        const response = await axios.get('/api/test');
        console.log('Datos devueltos de la API:', response.data); 
        setPreguntas(response.data);
      } catch (error) {
        console.error('Error al obtener las preguntas:', error);
      }
    };
  
    fetchPreguntas();
  }, []);

  return (
    <div>
      <header>
        <h1>Future Path Finder</h1>
      </header>
      <nav>
        {links.map((y, index) => (
          <Link key={index} to={y.href} className="linkBarra">{y.name}</Link>
        ))}
      </nav>
      <h2 className="tituloTest">Test</h2>
      <p className="cajaAdvertencia">recordatorio</p>

      <div className="recuadroPreguntas">
        {Array.isArray(preguntas) ? preguntas.map((pregunta, index) => (
          <div className="container" key={pregunta._id}>
            <section id={`p${index}`}>
              <h3>{pregunta.pregunta}</h3>
              {pregunta.opciones.map((opcion, i) => (
                <label key={i}>
                  <input type="radio" value={opcion.texto} name={`p${index}`}/> {opcion.texto} {opcion.correcta ? '(correcta)' : ''}
                </label>
              ))}
            </section>
          </div>
        )) : <p>No hay preguntas disponibles</p>}
        <div className="centrarBoton">
          <button className="botonTerminar">Terminar</button>
        </div>
      </div>
    </div>
  );
}

export default TestPage;