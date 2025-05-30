import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Roadmap from './components/Roadmap';
import Scholarship from './components/Scholarship';
import './App.css';

function App() {

  return (
    <Router>
      <div className="app-container">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/scholarship" element={<Scholarship />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
