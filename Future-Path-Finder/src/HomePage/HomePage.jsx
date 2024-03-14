import React from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';

const links=[
    {
        name: "Carreras",
        href: "/CarrerasPage"
    },
    {
        name: "TestPage",
        href: "/TestPage"
    },
];


function HomePage() {
    return (
        <div>
            <header>
                <h1>Future Path Finder</h1>
            </header>
            <nav>
                {links.map(x=>(
                    <Link to={x.href}></Link>
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
                <p>Descripción de STEM</p>
            </section>

            <section className="spacer"></section>

            <section>
                <div className="stem-acronimo">
                    <div>S - Ciencia</div>
                    <div>T - Tecnología</div>
                    <div>E - Ingeniería</div>
                    <div>M - Matemáticas</div>
                </div>
            </section>

            <section className="spacer"></section>

            <a className="linkTest" href="https://www.youtube.com/"> Test </a>
        </div>
    );
}

export default HomePage;