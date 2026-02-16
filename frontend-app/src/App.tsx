import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Schedule from './pages/Schedule';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthProvider';
import Races from './pages/Races';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Rotas públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Rotas privadas (protegidas) */}
          <Route element={<PrivateRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/races" element={<Races />} /> 
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

const AppLayout = () => {
  return (
    <div className="h-screen bg-slate-50 font-sans">
      <div className="flex h-full">
        <Sidebar />
        <main className="flex-1 overflow-y-auto relative z-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default App;