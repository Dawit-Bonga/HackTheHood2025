import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/ui/Footer';
import Home from './components/Home';
import About from './components/About';
import Basicinfo from './components/Basicinfo';
import CareerQuiz from './components/CareerQuiz';
import Roadmap from './components/Roadmap';
import Scholarship from './components/Scholarship';
import EssayPage from './components/Essay';
import Login from './components/Login';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

// Protected Route component
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return children;
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-white">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<About />} />
                <Route path="/about" element={<About />} />
                <Route path="/career-quiz" element={<CareerQuiz />} />
                <Route path="/scholarship" element={<Scholarship />} />
                
                {/* Protected routes */}
                <Route path="/basicInfo" element={
                  <ProtectedRoute>
                    <Basicinfo />
                  </ProtectedRoute>
                } />
                <Route path="/roadmap" element={
                  <ProtectedRoute>
                    <Roadmap />
                  </ProtectedRoute>
                } />
                {/* <Route path="/roadmap" element={<Roadmap />} /> */}
                <Route path="/essay" element={
                  <ProtectedRoute>
                    <EssayPage />
                  </ProtectedRoute>
                } />
                {/* <Route path="/essay" element={<EssayPage />} /> */}
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
