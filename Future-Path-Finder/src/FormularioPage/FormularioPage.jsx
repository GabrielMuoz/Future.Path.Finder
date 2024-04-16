import React from 'react';
import { Link } from 'react-router-dom';
import './FormularioPage.css'; 

// Componente principal de la página de inicio que muestra todas las fórmulas y la sintaxis básica de Python
function HomePage() {
  return (
    <div>
      <h1>Future Path Finder</h1>
      <nav className="navigation">
        <Link to="/carreras" className="nav-link">Carreras</Link>
        <Link to="/test" className="nav-link">Test</Link>
        <Link to="/formulario" className="nav-link">Formulario</Link>
      </nav>
      <div className="formulas-container">
        <FormulasFisica />
        <FormulasQuimica />
        <FormulasMatematica />
      </div>
      <SintaxisPython />
    </div>
  );
}
// Componentes para mostrar fórmulas de física, química y matemáticas, y explicar la sintaxis básica de Python
function FormulasFisica() {
  return (
    <div className="formula-box">
      <h2>Fórmulas de Física</h2>
      <ul>
        <li>Fórmula de la ley de Newton</li>
        <li>Fórmula de la ley de gravitación universal</li>
        <li>Fórmula de la ley de Ohm</li>
      </ul>
    </div>
  );
}

function FormulasQuimica() {
  return (
    <div className="formula-box">
      <h2>Fórmulas de Química</h2>
      <ul>
        <li>Fórmula de la ley de conservación de la masa</li>
        <li>Fórmula del número de Avogadro</li>
        <li>Fórmula de la ley de los gases ideales</li>
      </ul>
    </div>
  );
}

function FormulasMatematica() {
  return (
    <div className="formula-box">
      <h2>Fórmulas de Matemáticas</h2>
      <ul>
        <li>Fórmula del teorema de Pitágoras</li>
        <li>Fórmula de la ecuación cuadrática</li>
        <li>Fórmula del área de un círculo</li>
      </ul>
    </div>
  );
}

function SintaxisPython() {
  return (
    <div className="python-syntax">
      <h2>Sintaxis Básica de Python</h2>
      <p>Python es un lenguaje de programación de alto nivel conocido por su sintaxis clara y legible. Aquí hay algunos conceptos básicos:</p>
      <ul>
        <li><strong>Variables:</strong> En Python, no es necesario declarar el tipo de variable. Simplemente asigna un valor y Python inferirá el tipo.</li>
        <li><strong>Indentación:</strong> Python utiliza la indentación para definir bloques de código. Esto significa que la estructura del código se basa en la correcta indentación.</li>
        <li><strong>Tipos de datos:</strong> Python tiene varios tipos de datos, como enteros, flotantes, cadenas, listas, tuplas, conjuntos y diccionarios.</li>
        <li><strong>Comentarios:</strong> Puedes usar el símbolo "#" para hacer comentarios en Python. Los comentarios son útiles para explicar el código o hacer notas.</li>
        <li><strong>Funciones:</strong> Puedes definir funciones en Python usando la palabra clave "def". Las funciones pueden tener argumentos y devolver valores.</li>
        <li><strong>Estructuras de control:</strong> Python admite estructuras de control como if, else, elif para la toma de decisiones, y bucles como for y while para la iteración.</li>
      </ul>
      <p>Estos son solo algunos aspectos básicos de Python. ¡Puedes aprender mucho más explorando la documentación oficial y practicando con ejemplos!</p>
    </div>
  );
}

export default HomePage;
