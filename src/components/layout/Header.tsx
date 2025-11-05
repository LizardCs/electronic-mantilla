'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Menu, X, Phone, Wrench, User, LogOut, FileText } from 'lucide-react';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Verificar si el usuario está autenticado al cargar el componente
    const storedUser = localStorage.getItem('user');
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    
    if (storedUser && isAuthenticated === 'true') {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    setUser(null);
    router.push('/');
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => pathname === path;

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <Wrench className="text-white" size={24} />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900">Electrónica</span>
              <span className="text-xl font-bold text-blue-600">Mantilla</span>
            </div>
          </Link>

          {/* Navegación Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className={`font-medium transition-colors ${
                isActive('/') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Inicio
            </Link>
            <Link 
              href="#services" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Servicios
            </Link>
            <Link 
              href="#about" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Nosotros
            </Link>
            <Link 
              href="#contact" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Contacto
            </Link>
            
            {/* Menú de usuario autenticado */}
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-gray-700">
                  <User size={18} />
                  <span className="font-medium">Hola, {user.email.split('@')[0]}</span>
                </div>
                <Link 
                  href="/reportes" 
                  className={`flex items-center space-x-1 font-medium transition-colors ${
                    isActive('/reportes') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  <FileText size={18} />
                  <span>Reportes</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-gray-700 hover:text-red-600 font-medium transition-colors"
                >
                  <LogOut size={18} />
                  <span>Salir</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  href="/login" 
                  className={`font-medium transition-colors ${
                    isActive('/login') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  Ingresar
                </Link>
                <Link 
                  href="/register" 
                  className={`font-medium transition-colors ${
                    isActive('/register') ? 'btn-primary' : 'btn-primary'
                  }`}
                >
                  Registrarse
                </Link>
              </div>
            )}
          </nav>

          {/* Botón menú móvil */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Menú móvil */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className={`font-medium ${
                  isActive('/') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link 
                href="#services" 
                className="text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Servicios
              </Link>
              <Link 
                href="#about" 
                className="text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Nosotros
              </Link>
              <Link 
                href="#contact" 
                className="text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contacto
              </Link>
              
              {/* Menú móvil de usuario */}
              {user ? (
                <div className="flex flex-col space-y-2 pt-4 border-t">
                  <div className="flex items-center space-x-2 text-gray-700 font-medium">
                    <User size={18} />
                    <span>{user.email}</span>
                  </div>
                  <Link 
                    href="/reportes" 
                    className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FileText size={18} />
                    <span>Reportes</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-gray-700 hover:text-red-600 font-medium text-left"
                  >
                    <LogOut size={18} />
                    <span>Cerrar Sesión</span>
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 pt-4 border-t">
                  <Link 
                    href="/login" 
                    className={`font-medium ${
                      isActive('/login') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Ingresar
                  </Link>
                  <Link 
                    href="/register" 
                    className="btn-primary text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Registrarse
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
