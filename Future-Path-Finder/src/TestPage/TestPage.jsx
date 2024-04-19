import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

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

function TestPage() {
  const [preguntas, setPreguntas] = useState([]);
  const [respuestas, setRespuestas] = useState([]);
  const [terminado, setTerminado] = useState(false);

  useEffect(() => {
    const fetchPreguntas = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/test');
        console.log('Datos devueltos de la API:', response.data); 
        setPreguntas(response.data);
        // Inicializar el estado de respuestas con un array vacío para cada pregunta
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
    // Aquí puedes realizar cualquier lógica adicional antes de redirigir al usuario
    setTerminado(true);
  };

  if (terminado) {
    // Redirigir al usuario a la página de calificaciones si el test ha sido terminado
    return <Redirect to="/calificaciones" />;
  }

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
                  <input 
                    type="radio" 
                    value={opcion.texto} 
                    name={`p${index}`} 
                    onChange={() => handleRespuestaChange(index, opcion.texto)}
                  /> {opcion.texto} {opcion.correcta ? '' : ''}
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
