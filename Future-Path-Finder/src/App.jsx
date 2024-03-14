import React from 'react';
import './App.css';
import HomePage from './HomePage/HomePage';
import CarrerasPage from './CarrerasPage/CarrerasPage';
import TestPage from './TestPage/TestPage';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

function App() {
  return (
    <div className="">

      <Router>
        <Routes> 
          <Route path="/" element={<HomePage/>} />
          <Route path="/carreras" element={<CarrerasPage/>}/>
          <Route path="/test" element={<TestPage/>}/>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;

