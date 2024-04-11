import React from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';

const links = [
    {
        name: "Carreras",
        href: "/carreras"
    },
    {
        name: "Test",
        href: "/test"
    },
    {
        name: "Formulario",
        href: "/formulario"
    }
];

function HomePage() {
    return (
        <div>
            <header>
                <h1>Future Path Finder</h1>
            </header>
            <nav>
                {links.map((x) => (
                    <Link to={x.href} className="linkBarra" key={x.name}>{x.name}</Link>
                ))}
            </nav>
            <section className="spacer"></section>

            <section id="que-es-future-path-finder">
                <h2>¿Qué es Future Path Finder?</h2>
                <p>Descripción de Future Path Finder</p>
            </section>

            <section className="spacer"></section>

            <section id="que-es-stem">
                <h2>¿Qué es STEM?</h2>
                <p>
                    <span role="img" aria-label="Ciencia">🔬</span> Ciencia (S): La ciencia es el estudio sistemático de la naturaleza y el universo. Se enfoca en comprender cómo funcionan las cosas a través de la observación, la experimentación y la formulación de teorías.
                </p>
                <p>
                    <span role="img" aria-label="Tecnología">💻</span> Tecnología (T): La tecnología se refiere a la aplicación del conocimiento científico para diseñar y crear herramientas, dispositivos y sistemas que satisfagan necesidades humanas y mejoren la calidad de vida.
                </p>
                <p>
                    <span role="img" aria-label="Ingeniería">🛠️</span> Ingeniería (E): La ingeniería implica el diseño, la construcción y la optimización de estructuras, máquinas, sistemas y procesos para resolver problemas y satisfacer necesidades específicas de manera eficiente y segura.
                </p>
                <p>
                    <span role="img" aria-label="Matemáticas">📐</span> Matemáticas (M): Las matemáticas son un lenguaje universal que se utiliza para describir y analizar patrones, relaciones y cantidades. Se aplican en una amplia gama de campos, desde la física y la ingeniería hasta la economía y la biología.
                </p>
            </section>

            <section className="spacer"></section>

            <Link to="/test">
                <button className="linkTest">Test</button>
            </Link>
        </div>
    );
}

export default HomePage;
