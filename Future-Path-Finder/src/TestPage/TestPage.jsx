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
  const [preguntas, setPreguntas] = useState([]);
  const [respuestas, setRespuestas] = useState({});
  const [contadores, setContadores] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [carreras, setCarreras] = useState([]);
  const [carrerasAleatorias, setCarrerasAleatorias] = useState([]);

  const obtenerCarreras = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/carreras');
      setCarreras(response.data);
    } catch (error) {
      console.error('Error al obtener las carreras:', error);
    }
  };

  const seleccionarCarrerasAleatorias = () => {
    const carrerasSeleccionadas = [];
    const carrerasDisponibles = [...carreras];
    for (let i = 0; i < 3; i++) {
      const indiceAleatorio = Math.floor(Math.random() * carrerasDisponibles.length);
      const carreraAleatoria = carrerasDisponibles.splice(indiceAleatorio, 1)[0];
      carrerasSeleccionadas.push(carreraAleatoria);
    }
    setCarrerasAleatorias(carrerasSeleccionadas);
    setShowPopup(true);
  };

  useEffect(() => {
    obtenerCarreras();
  }, []);

  useEffect(() => {
    const fetchPreguntas = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/test');
        const areas = response.data.reduce((acc, pregunta) => {
          acc[pregunta.area] = acc[pregunta.area] || [];
          acc[pregunta.area].push(pregunta);
          return acc;
        }, {});
        const initialContadores = Object.keys(areas).reduce((acc, area) => {
          acc[area] = 0;
          return acc;
        }, {});
        setPreguntas(areas);
        setContadores(initialContadores);
      } catch (error) {
        console.error('Error al obtener las preguntas:', error);
      }
    };
    fetchPreguntas();
  }, []);

  const handleRespuesta = (area, indexPregunta, opcionSeleccionada) => {
    setRespuestas(prevRespuestas => ({
      ...prevRespuestas,
      [`${area}-${indexPregunta}`]: opcionSeleccionada
    }));
  };

  const calcularContadores = () => {
    const newContadores = {};
    Object.keys(preguntas).forEach(area => {
      newContadores[area] = 0;
      preguntas[area].forEach((pregunta, indexPregunta) => {
        const opcionSeleccionada = respuestas[`${area}-${indexPregunta}`];
        if (
          opcionSeleccionada !== undefined &&
          pregunta.opciones[opcionSeleccionada].correcta
        ) {
          newContadores[area]++;
        }
      });
      newContadores[area] = (newContadores[area] / 10) * 100;
    });
    setContadores(newContadores);
    seleccionarCarrerasAleatorias(); 
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
        {Object.keys(preguntas).map((area, index) => (
          <div key={index}>
            {preguntas[area].map((pregunta, indexPregunta) => (
              <div className="container" key={pregunta._id}>
                <section id={`p${indexPregunta}`}>
                  <h3>{pregunta.pregunta}</h3>
                  {pregunta.opciones.map((opcion, i) => (
                    <label key={i}>
                      <input 
                        type="radio" 
                        value={opcion.texto} 
                        name={`p${indexPregunta}`} 
                        onChange={() => handleRespuesta(area, indexPregunta, i)}
                      /> {opcion.texto} {opcion.correcta ? '(Correcta)' : ''}
                    </label>
                  ))}
                </section>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="centrarBoton">
        <button className="botonTerminar" onClick={calcularContadores}>Terminar</button>
      </div>
      {showPopup && (
        <div className="popup">
          <span className="close" onClick={() => setShowPopup(false)}>&times;</span>
          <h2>Resultados</h2>
          <div className="Resultados">
            {Object.keys(contadores).map((area, index) => (
              <div key={index}>
                <p>{area}: {contadores[area]}%</p>
                <div className="barraDeCarga">
                  <div className="progreso" style={{ width: `${contadores[area]}%` }}></div>
                </div>
              </div>
            ))}
            {carrerasAleatorias.map((carrera, index) => (
              <div key={index}>
                <p>{carrera.nombre}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default TestPage;
