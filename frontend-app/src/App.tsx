import React from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Schedule from './pages/Schedule';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="h-screen bg-slate-50 font-sans">
        <div className="flex h-full">
          <Sidebar />
          <main className="flex-1 overflow-y-auto relative z-0">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/schedule" element={<Schedule />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;