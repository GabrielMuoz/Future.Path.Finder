import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import HomePage from './HomePage/HomePage';
import CarrerasPage from './CarrerasPage/CarrerasPage';
import TestPage from './TestPage/TestPage';

function App() {
  return (
    <Router>
      <div className="">
        <HomePage/>
        <CarrerasPage/>
        <TestPage/>
      </div>
    </Router>
  );
}

export default App;