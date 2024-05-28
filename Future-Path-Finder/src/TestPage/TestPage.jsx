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
    {
        name: "Carreras",
        href: "/carreras"
    }
];

function TestPage() {
    const [preguntas, setPreguntas] = useState([]);
    const [respuestas, setRespuestas] = useState({});
    const [contadores, setContadores] = useState({});
    const [showPopup, setShowPopup] = useState(false);
    const [correoDestinatario, setCorreoDestinatario] = useState('');
    const [menuOpen, setMenuOpen] = useState(false); // Estado para el menú
    const [emailSent, setEmailSent] = useState(false); // Estado para el mensaje de correo enviado

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
                limpiarRespuestas(); // Limpiar respuestas al cargar nuevas preguntas
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        };
        fetchData();
    }, []);

    const handleRespuesta = (area, indexPregunta, opcionSeleccionada) => {
        setRespuestas(prevRespuestas => {
            return {
                ...prevRespuestas,
                [`${area}-${indexPregunta}`]: opcionSeleccionada
            };
        });
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

    const enviarCorreo = async (pdfBlob) => {
        const formData = new FormData();
        formData.append('pdf', pdfBlob, 'Resultados_Test.pdf');
        formData.append('correoDestinatario', correoDestinatario);

        try {
            await axios.post('http://localhost:3000/api/enviar-correo', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Correo enviado correctamente');
            setEmailSent(true); // Mostrar mensaje de éxito
            setTimeout(() => setEmailSent(false), 5000); // Ocultar mensaje después de 5 segundos
        } catch (error) {
            console.error('Error al enviar el correo:', error);
        }
    };

    const handleEnviarCorreo = () => {
        if (correoDestinatario) {
            const pdfBlob = generatePDF(contadores);
            enviarCorreo(pdfBlob);
        } else {
            alert('Por favor ingrese su dirección de correo electrónico.');
        }
    };

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
        return doc.output('blob');
    };

    return (
        <div>
            <header>
                <h1>Future Path Finder</h1>
            </header>
            <nav>
                <button className="menuButton" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
                <ul className={menuOpen ? 'menuOpen' : ''}>
                    {links.map((link, index) => (
                        <li key={index}>
                            <Link to={link.href} className="linkBarra">{link.name}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <h2 className="tituloTest">Test</h2>
            <p className="cajaAdvertencia">Ten presente que no es una evaluación, es una herramienta para que explores tus habilidades, responde tranquilamente. Si necesitas información para responder, ve a nuestra página de Formulario. Responder con honestidad te llevará a un resultado certero. ¡Buena Suerte!</p>
            <div className="recuadroPreguntas">
                {Object.keys(preguntas).map((area, index) => (
                    <div key={index}>
                        {preguntas[area].map((pregunta, indexPregunta) => (
                            <div className="container" key={pregunta._id}>
                                <section id={`p${area}-${indexPregunta}`}>
                                    <h3>{pregunta.pregunta}</h3>
                                    {pregunta.opciones.map((opcion, i) => (
                                        <label key={i}>
                                            <input
                                                type="radio"
                                                value={opcion.texto}
                                                name={`p${area}-${indexPregunta}`}
                                                onChange={() => handleRespuesta(area, indexPregunta, i)}
                                                checked={respuestas[`${area}-${indexPregunta}`] === i}
                                            /> {opcion.texto} {opcion.correcta ? '' : ''}
                                        </label>
                                    ))}
                                </section>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className="centrarBoton">
                <button className="botonTerminar" onClick={() => { calcularContadores(); }}>Terminar</button>
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
                    {emailSent && (
                        <p className="mensajeExito">Correo enviado correctamente.</p>
                    )}
                    <button className="botonDescargarPDF" onClick={() => {
                        const pdfBlob = generatePDF(contadores);

                        const link = document.createElement('a');
                        link.href = window.URL.createObjectURL(pdfBlob);
                        link.download = 'resultados_test.pdf';
                        link.click();
                    }}>
                        Descargar PDF
                    </button>
                    <button className="botonEnviarCorreo" onClick={handleEnviarCorreo}>
                        Enviar por Correo Electrónico
                    </button>
                    <input
                        className="inputCorreo"
                        type="email"
                        value={correoDestinatario}
                        onChange={(e) => setCorreoDestinatario(e.target.value)}
                        placeholder="Ingrese su correo electrónico"
                    />
                    <button className="botonIrCarreras">
                        <Link to="/carreras" className="linkIrCarreras">
                            Ir a Carreras
                        </Link>
                    </button>
                </div>
            )}
        </div>
    );
}

export default TestPage;
