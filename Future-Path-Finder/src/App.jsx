import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './HomePage/HomePage';
import CarrerasPage from './CarrerasPage/CarrerasPage';
import TestPage from './TestPage/TestPage';
import FormularioPage from './FormularioPage/FormularioPage';
import CalificacionesPage from './CalificacionesPage/CalificacionesPage'; 

function App() {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/carreras" element={<CarrerasPage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/formulario" element={<FormularioPage />} />
          <Route path="/calificaciones" element={<CalificacionesPage />} /> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
