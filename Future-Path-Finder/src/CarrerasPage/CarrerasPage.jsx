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
          <div className="area-title">Science</div>
          <div className="area-description">
            <ul>
              <li>Biology</li>
              <li>Description: Study of living organisms.</li>
              <li>Duration: 4 years</li>
            </ul>
          </div>
        </div>

        <div className="area-box">
          <div className="area-title">Technology</div>
          <div className="area-description">
            <ul>
              <li>Computer Science</li>
              <li>Description: Study of algorithms, programming languages, and computer hardware.</li>
              <li>Duration: 4 years</li>
            </ul>
          </div>
        </div>

        <div className="area-box">
          <div className="area-title">Engineering</div>
          <div className="area-description">
            <ul>
              <li>Mechanical Engineering</li>
              <li>Description: Study of mechanical systems.</li>
              <li>Duration: 4 years</li>
            </ul>
          </div>
        </div>

        <div className="area-box">
          <div className="area-title">Math</div>
          <div className="area-description">
            <ul>
              <li>Math</li>
              <li>Description: Study of numbers, quantities, and shapes.</li>
              <li>Duration: 4 years</li>
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
