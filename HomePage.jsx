
import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from '@/components/ui/sonner';
import ScrollToTop from '@/components/ScrollToTop';
import ProtectedRoute from '@/components/ProtectedRoute';
import HomePage from '@/pages/HomePage';
import ClasesPage from '@/pages/ClasesPage';
import EquipoPage from '@/pages/EquipoPage';
import ContactoPage from '@/pages/ContactoPage';
import LoginPage from '@/pages/LoginPage';
import DashboardPage from '@/pages/DashboardPage';
import RegistroClasesPage from '@/pages/RegistroClasesPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/clases" element={<ClasesPage />} />
          <Route path="/equipo" element={<EquipoPage />} />
          <Route path="/contacto" element={<ContactoPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/registro-clases"
            element={
              <ProtectedRoute>
                <RegistroClasesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={
              <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center">
                  <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                    404
                  </h1>
                  <p className="text-foreground/60 mb-6">Página no encontrada</p>
                  <a href="/" className="text-primary hover:underline">
                    Volver al inicio
                  </a>
                </div>
              </div>
            }
          />
        </Routes>
        <Toaster />
      </AuthProvider>
    </Router>
  );
}

export default App;
