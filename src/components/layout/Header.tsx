// src/components/layout/Header.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Phone, Wrench } from 'lucide-react';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Inicio
            </Link>
            <Link href="#services" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Servicios
            </Link>
            <Link href="#about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Nosotros
            </Link>
            <Link href="#contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Contacto
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Ingresar
              </Link>
              <Link href="/register" className="btn-primary">
                Registrarse
              </Link>
            </div>
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
              <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">
                Inicio
              </Link>
              <Link href="#services" className="text-gray-700 hover:text-blue-600 font-medium">
                Servicios
              </Link>
              <Link href="#about" className="text-gray-700 hover:text-blue-600 font-medium">
                Nosotros
              </Link>
              <Link href="#contact" className="text-gray-700 hover:text-blue-600 font-medium">
                Contacto
              </Link>
              <div className="flex flex-col space-y-2 pt-4 border-t">
                <Link href="/login" className="text-gray-700 hover:text-blue-600 font-medium">
                  Ingresar
                </Link>
                <Link href="/register" className="btn-primary text-center">
                  Registrarse
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};