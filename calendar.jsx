
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { currentUser, logout, isAuthenticated } = useAuth();

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Clases', path: '/clases' },
    { name: 'Equipo', path: '/equipo' },
    { name: 'Contacto', path: '/contacto' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center transition-opacity hover:opacity-90">
            <span className="jj-studio-logo text-3xl md:text-4xl font-bold">
              <span className="text-[hsl(var(--burgundy))]">J</span>
              <span className="text-[hsl(var(--white))]">J</span>
              <span className="text-[hsl(var(--white))] ml-2 text-xl md:text-2xl tracking-[0.2em] font-medium uppercase">
                Studio
              </span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-all duration-200 ${
                  isActive(link.path)
                    ? 'text-primary font-semibold'
                    : 'text-foreground/80 hover:text-primary'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard">
                  <Button variant="ghost" size="sm" className="text-foreground/80 hover:text-primary">
                    <User className="w-4 h-4 mr-2" />
                    {currentUser?.name || 'Mi Cuenta'}
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="text-foreground/80 hover:text-destructive"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Salir
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="text-foreground/80 hover:text-primary">
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link to="/login?signup=true">
                  <Button size="sm" className="bg-primary hover:bg-primary-dark text-white">
                    Registrarse
                  </Button>
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-foreground/80 hover:text-primary transition-colors duration-200"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block text-base font-medium transition-colors duration-200 ${
                  isActive(link.path) ? 'text-primary' : 'text-foreground/80 hover:text-primary'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-border space-y-3">
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full justify-start">
                      <User className="w-4 h-4 mr-2" />
                      {currentUser?.name || 'Mi Cuenta'}
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full justify-start text-destructive hover:text-destructive"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Salir
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Iniciar Sesión
                    </Button>
                  </Link>
                  <Link to="/login?signup=true" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-primary hover:bg-primary-dark text-white">
                      Registrarse
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
