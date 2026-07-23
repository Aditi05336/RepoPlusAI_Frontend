import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AnalysisProvider } from './context/AnalysisContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { AppRouter } from './router';

export function App() {
  return (
    <Router>
      <AnalysisProvider>
        <div className="flex min-h-screen flex-col bg-transparent text-[#12172A] selection:bg-[#1C2541] selection:text-white overflow-x-hidden">
          <Navbar />
          <main className="flex-1 w-full">
            <AppRouter />
          </main>
          <Footer />
        </div>
      </AnalysisProvider>
    </Router>
  );
}

export default App;
