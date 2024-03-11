import React from 'react';
import './CarrerasPage.css';

function CarrerasPage() {
    return (
        <div>
            <header>
                <h1>Future Path Finder</h1>
            </header>
            <nav>
                <ul>
                    <li><a className="linkBarra" href="#">Carreras</a></li>
                </ul>
                <ul>
                    <li><a className="linkBarra" href="#">Test</a></li>
                </ul>
            </nav>
            <section className="spacer"></section>
        </div>
    );
}

export default CarrerasPage;