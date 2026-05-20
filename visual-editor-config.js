import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react';
const Footer = () => {
  const quickLinks = [{
    name: 'Inicio',
    path: '/'
  }, {
    name: 'Clases',
    path: '/clases'
  }, {
    name: 'Equipo',
    path: '/equipo'
  }, {
    name: 'Contacto',
    path: '/contacto'
  }];
  return <footer className="bg-[#0D0D0D] text-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <Link to="/" className="mb-6 inline-block transition-opacity hover:opacity-90">
              <span className="jj-studio-logo text-2xl font-bold">
                <span className="text-[hsl(var(--burgundy))]">J</span>
                <span className="text-[hsl(var(--white))]">J</span>
                <span className="text-[hsl(var(--white))] ml-1.5 text-sm tracking-[0.2em] font-medium uppercase">
                  Studio
                </span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              Experiencia de fitness boutique para profesionistas exigentes. Método Lagree Elite en Querétaro.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center hover:bg-primary transition-all duration-200">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center hover:bg-primary transition-all duration-200">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <span className="text-lg font-semibold mb-6 block" style={{
            fontFamily: 'Playfair Display, serif'
          }}>
              Enlaces Rápidos
            </span>
            <ul className="space-y-3">
              {quickLinks.map(link => <li key={link.path}>
                  <Link to={link.path} className="text-sm hover:text-primary transition-colors duration-200">
                    {link.name}
                  </Link>
                </li>)}
            </ul>
          </div>

          <div>
            <span className="text-lg font-semibold mb-6 block" style={{
            fontFamily: 'Playfair Display, serif'
          }}>
              Contacto
            </span>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm">+523318373447</span>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm">administracion@jjstudio.mx</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm">Av. Constituyentes 123, Centro<br />Querétaro, Qro. 76000</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary/20 mt-12 pt-8 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} JJStudio. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;