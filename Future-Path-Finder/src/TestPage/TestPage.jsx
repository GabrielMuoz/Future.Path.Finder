import React from 'react';
import './TestPage.css'; 
import { Link } from 'react-router-dom';

const links=[
    {
        name: "Regresar al inicio",
        href: "/"
    },
];

function TestPage() {
  return (
    <body>
  <header>
    <h1>Future Path Finder</h1>
  </header>
  <nav>
    {links.map((y)=>(
        <Link to={y.href} classname="linkBarra">{y.name}</Link>
    ))}
  </nav>
  <h2 class="tituloTest">Test</h2>
  <p class="cajaAdvertencia">recordatorio</p>

    <div className="recuadroPreguntas">
      <div className="container">
        <section id="p1">
          <h3>primera pregunta?</h3>
          <label>
            <input type="radio" value="1" name="p0"/> respuesta 1
          </label>
          <label>
            <input type="radio" value="2" name="p0"/> respuesta 2
          </label>
          <label>
            <input type="radio" value="3" name="p0"/> respuesta 3
          </label>
        </section>
        <section id="p2">
          <h3>segunda pregunta?</h3>
          <label>
            <input type="radio" value="1" name="p1"/> respuesta 1
          </label>
          <label>
            <input type="radio" value="2" name="p1"/> respuesta 2
          </label>
          <label>
            <input type="radio" value="3" name="p1"/> respuesta 3
          </label>
        </section>
      </div>
      <div className="centrarBoton">
        <button className="botonTerminar">Terminar</button>
      </div>
    </div>
    </body>
  );
}

export default TestPage;