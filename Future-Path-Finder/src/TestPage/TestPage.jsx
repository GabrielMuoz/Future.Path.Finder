import React, { useState, useEffect } from 'react';
import './TestPage.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import emailjs from 'emailjs-com';


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

const sendEmail = (pdfBlob, toEmail) => {
  // Configura tu servicio de EmailJS
  const serviceID = 'resultados_gmail_02';
  const templateID = 'Resultados_dgh4ojp';
  const userID = 'an_HLuUyQ2XaG8pc0';

  // Configura los parámetros para enviar el correo
  const emailParams = {
    to_email: toEmail, // Usar el correo proporcionado por el usuario
    message: 'Adjunto encontrarás los resultados del test.',
  };

  // Configura los archivos adjuntos
  const attachments = {
    'resultados_test.pdf': pdfBlob,
  };

  // Llama a la API de EmailJS para enviar el correo
  emailjs.send(serviceID, templateID, emailParams, userID, attachments)
    .then((response) => {
      console.log('Correo enviado con éxito:', response);
      alert('El correo electrónico se ha enviado correctamente.');
    })
    .catch((error) => {
      console.error('Error al enviar el correo electrónico:', error);
      alert('Ocurrió un error al enviar el correo electrónico. Por favor, inténtalo de nuevo más tarde.');
    });
};

// Función para solicitar el correo electrónico al usuario
const solicitarCorreo = () => {
  const toEmail = prompt('Ingresa tu correo electrónico:');
  if (toEmail) {
    // Si se proporciona un correo electrónico, generar el PDF y enviar el correo
    const pdfBlob = generatePDF(contadores, carreras.map(carrera => ({ nombre: carrera.nombre, area: carrera.area })));
    sendEmail(pdfBlob, toEmail);
  } else {
    alert('Debes ingresar un correo electrónico válido.');
  }
};


const generatePDF = (contadores, carreras) => {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text('Resultados del Test', 10, 10);

  // Agregar resultados del test al PDF
  let yPos = 30;
  Object.keys(contadores).forEach((area, index) => {
      const porcentaje = contadores[area];
      doc.setFontSize(12);
      doc.text(`${area}: ${porcentaje}%`, 10, yPos);
      yPos += 10;
      doc.rect(10, yPos, porcentaje * 1.5, 5, 'F');
      yPos += 10;
  });

  // Agregar carreras recomendadas al PDF
  yPos += 10;
  doc.setFontSize(16);
  doc.text('Carreras Recomendadas:', 10, yPos);
  yPos += 10;
  carreras.forEach((carrera, index) => {
      doc.text(`${index + 1}. ${carrera.nombre} - ${carrera.area}`, 15, yPos);
      yPos += 10;
  });

  return doc.output('blob'); // Devolver el objeto Blob del PDF
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
              setCarreras(carrerasResponse.data.slice(0, 3)); // Mostrar solo las primeras tres carreras
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
                    <button className="botonEnviarCorreo" onClick={() => { 
                        const toEmail = prompt('Ingresa tu correo electrónico:');
                        const fromName = prompt('Ingresa tu nombre:');
                        const pdfBlob = generatePDF(contadores, carreras.map(carrera => ({ nombre: carrera.nombre, area: carrera.area })));
                        sendEmail(pdfBlob, toEmail, fromName);
                      }}>
                        Enviar por Correo Electrónico
                    </button>


                </div>
            )}
        </div>
    );
}

export default TestPage;
