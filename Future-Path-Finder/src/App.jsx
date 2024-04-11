import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './HomePage/HomePage';
import CarrerasPage from './CarrerasPage/CarrerasPage';
import TestPage from './TestPage/TestPage';
import FormularioPage from './FormularioPage/FormularioPage';

function App() {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/carreras" element={<CarrerasPage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/formulario" element={<FormularioPage />} /> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;