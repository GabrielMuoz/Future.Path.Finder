import React, { useState, useEffect } from 'react';
import './TestPage.css'; 
import { Link } from 'react-router-dom';
import axios from 'axios';

const links=[
    {
        name: "Regresar al inicio",
        href: "/"
    },
    {
        name: "Formulario",
        href: "/formulario"
    },
];


function TestPage() {
  const history = useHistory();
  const [preguntas, setPreguntas] = useState([]);
  const [respuestas, setRespuestas] = useState([]);

  useEffect(() => {
    const fetchPreguntas = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/test');
        console.log('Datos devueltos de la API:', response.data); 
        setPreguntas(response.data);
        setRespuestas(Array(response.data.length).fill(''));
      } catch (error) {
        console.error('Error al obtener las preguntas:', error);
      }
    };
  
    fetchPreguntas();
  }, []);

  const handleRespuestaChange = (index, value) => {
    const nuevasRespuestas = [...respuestas];
    nuevasRespuestas[index] = value;
    setRespuestas(nuevasRespuestas);
  };

  const calcularCalificaciones = () => {
    const calificaciones = {
      ciencia: 0,
      matematicas: 0,
      ingenieria: 0,
      tecnologia: 0
    };

    preguntas.forEach((pregunta, index) => {
      const respuestaSeleccionada = respuestas[index];
      const respuestaCorrecta = pregunta.opciones.findIndex(opcion => opcion.correcta);

      if (!respuestaSeleccionada || respuestaSeleccionada !== pregunta.opciones[respuestaCorrecta].texto) {
        calificaciones[pregunta.area.toLowerCase()]++;
      }
    });

    console.log('Calificaciones:', calificaciones);

    // Redirige a la página de calificaciones con las calificaciones como parámetro de consulta
    history.push({
      pathname: '/calificaciones',
      state: { calificaciones: calificaciones }
    });
  };

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
                  <input type="radio" value={opcion.texto} name={`p${index}`}/> {opcion.texto} {opcion.correcta ? '' : ''}
                </label>
              ))}
            </section>
          </div>
        )) : <p>No hay preguntas disponibles</p>}
        <div className="centrarBoton">
         <button className="botonTerminar" onClick={calcularCalificaciones}>Terminar</button>
        </div>
      </div>
    </div>
  );
}

export default TestPage;