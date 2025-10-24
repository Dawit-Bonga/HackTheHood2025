import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Basicinfo from './components/Basicinfo';
import CareerQuiz from './components/CareerQuiz';
import Roadmap from './components/Roadmap';
import Scholarship from './components/Scholarship';
import EssayPage from './components/Essay';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

function App() {

  return (
    <ErrorBoundary>
      <Router>
        <div className="bg-white">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/basicInfo" element={<Basicinfo />} />
            <Route path="/career-quiz" element={<CareerQuiz />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/scholarship" element={<Scholarship />} />
            <Route path="essay" element={<EssayPage />} />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
