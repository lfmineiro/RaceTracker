import React from 'react';
import Sidebar from './components/sidebar';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className="h-screen bg-slate-50 font-sans">
      <div className="flex h-full">
        <Sidebar />
        <main className="flex-1 ml-64 overflow-y-auto relative z-0">
          <Dashboard />
        </main>
      </div>
    </div>
  );
}

export default App;