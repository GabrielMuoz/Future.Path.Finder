import React, { useState, useEffect } from 'react';
import './TestPage.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';


const links = [
    {
        name: "Regresar al inicio",
        href: "/"
    },
    {
        name: "Formulario",
        href: "/formulario"
    },
];


const generatePDF = (contadores, carreras) => {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text('Resultados del Test', 10, 10);

  
  let yPos = 30;
  Object.keys(contadores).forEach((area, index) => {
      const porcentaje = contadores[area];
      doc.setFontSize(12);
      doc.text(`${area}: ${porcentaje}%`, 10, yPos);
      yPos += 10;
      doc.rect(10, yPos, porcentaje * 1.5, 5, 'F');
      yPos += 10;
  });

  
  yPos += 10;
  doc.setFontSize(16);
  doc.text('Carreras Recomendadas:', 10, yPos);
  yPos += 10;
  carreras.forEach((carrera, index) => {
      doc.text(`${index + 1}. ${carrera.nombre} - ${carrera.area}`, 15, yPos);
      yPos += 10;
  });

  return doc.output('blob'); 
};


function TestPage() {
    const [preguntas, setPreguntas] = useState([]);
    const [respuestas, setRespuestas] = useState({});
    const [contadores, setContadores] = useState({});
    const [showPopup, setShowPopup] = useState(false);
    const [carreras, setCarreras] = useState([]);

    useEffect(() => {
        const storedAnswers = JSON.parse(localStorage.getItem('respuestas'));
        if (storedAnswers) {
            setRespuestas(storedAnswers);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('respuestas', JSON.stringify(respuestas));
    }, [respuestas]);

    useEffect(() => {
      const fetchData = async () => {
          try {
              const [preguntasResponse, carrerasResponse] = await Promise.all([
                  axios.get('http://localhost:3000/api/test'),
                  axios.get('http://localhost:3000/api/carreras')
              ]);
  
              const areas = preguntasResponse.data.reduce((acc, pregunta) => {
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
              setCarreras(carrerasResponse.data.slice(0, 3)); 
          } catch (error) {
              console.error('Error al obtener los datos:', error);
          }
      };
      fetchData();
  }, []);

    const handleRespuesta = (area, indexPregunta, opcionSeleccionada) => {
        setRespuestas(prevRespuestas => ({
            ...prevRespuestas,
            [`${area}-${indexPregunta}`]: opcionSeleccionada
        }));
    };

    const limpiarRespuestas = () => {
        setRespuestas({});
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
        setShowPopup(true);
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
                                                checked={respuestas[`${area}-${indexPregunta}`] === i}
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
                <button className="botonTerminar" onClick={() => { calcularContadores(); limpiarRespuestas(); }}>Terminar</button>
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
                    </div>
                    <h3>Carreras Recomendadas:</h3>
                    <ul>
                      {carreras.map((carrera, index) => (
                      <li key={index}>{carrera.nombre} - {carrera.area}</li>
                       ))}
                    </ul>
                    <button className="botonDescargarPDF" onClick={() => { 
                        const pdfBlob = generatePDF(contadores, carreras.map(carrera => ({ nombre: carrera.nombre, area: carrera.area })));
                        // Descargar PDF
                        const link = document.createElement('a');
                        link.href = window.URL.createObjectURL(pdfBlob);
                        link.download = 'resultados_test.pdf';
                        link.click();
                    }}>
                        Descargar PDF
                    </button>
                    <button className="botonEnviarCorreo" onClick={solicitarCorreo}>
                      Enviar por Correo Electrónico
                    </button>
                </div>
            )}
        </div>
    );
}

export default TestPage;
