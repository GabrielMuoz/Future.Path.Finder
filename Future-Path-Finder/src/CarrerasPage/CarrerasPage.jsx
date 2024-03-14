import React from 'react';
import './CarrerasPage.css'; // Importa los estilos CSS

function CarrerasPage() {
  return (
    <div>
      <header>
        <h1>Future Path Finder</h1>
      </header>
      <nav>
        <ul>
          <li><a className="linkBarra" href="#">Inicio</a></li>
        </ul>
        <ul>
          <li><a className="linkBarra" href="#">Test</a></li>
        </ul>
      </nav>
      <section>
        <div className="area-box">
          <div className="area-title">Ciencia</div>
          <div className="area-description">
            <ul>
              <li>Biología</li>
              <li>Química</li>
              <li>Física</li>
              <li>Astronomía</li>
              <li>Geología</li>
              <li>Oceanografía</li>
              <li>Biomedicina</li>
              <li>Ecología</li>
            </ul>
          </div>
        </div>

        <div className="area-box">
          <div className="area-title">Tecnología</div>
          <div className="area-description">
            <ul>
              <li>Ingeniería en Sistemas Computacionales</li>
              <li>Ingeniería en Software</li>
              <li>Ingeniería en Telecomunicaciones</li>
              <li>Ingeniería en Redes y Servicios de Cómputo</li>
              <li>Ingeniería en Ciberseguridad</li>
              <li>Ingeniería en Computación</li>
              <li>Ingeniería en Informática</li>
              <li>Ingeniería en Robótica</li>
              <li>Ingeniería en Electrónica</li>
              <li>Ingeniería en Mecatrónica</li>
              <li>Ingeniería en Automatización y Control</li>
            </ul>
          </div>
        </div>

        <div className="area-box">
          <div className="area-title">Ingeniería</div>
          <div className="area-description">
            <ul>
              <li>Ingeniería Civil</li>
              <li>Ingeniería Mecánica</li>
              <li>Ingeniería Eléctrica</li>
              <li>Ingeniería Aeroespacial</li>
              <li>Ingeniería Biomédica</li>
              <li>Ingeniería Ambiental</li>
              <li>Ingeniería Geológica</li>
              <li>Ingeniería Petrolera</li>
              <li>Ingeniería en Energías Renovables</li>
              <li>Ingeniería Agroalimentaria</li>
              <li>Ingeniería en Materiales</li>
              <li>Ingeniería Química</li>
              <li>Ingeniería en Biotecnología</li>
              <li>Ingeniería en Telecomunicaciones</li>
              <li>Ingeniería en Electrónica y Telecomunicaciones</li>
              <li>Ingeniería Industrial</li>
            </ul>
          </div>
        </div>

        <div className="area-box">
          <div className="area-title">Matemáticas</div>
          <div className="area-description">
            <ul>
              <li>Matemáticas Pura</li>
              <li>Matemáticas Aplicadas</li>
              <li>Estadística</li>
              <li>Actuaría</li>
              <li>Matemáticas Computacionales</li>
              <li>Matemáticas Financieras</li>
            </ul>
          </div>
        </div>
      </section>
      <footer>
      </footer>
    </div>
  );
}

export default CarrerasPage;
