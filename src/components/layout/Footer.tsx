// src/components/layout/Footer.tsx
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, Wrench } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Información de la empresa */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Wrench className="text-white" size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold">Electrónica</span>
                <span className="text-lg font-bold text-blue-400">Mantilla</span>
              </div>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Servicio técnico especializado en reparación y mantenimiento de dispositivos electrónicos. 
              Más de 10 años de experiencia brindando soluciones confiables.
            </p>
            <div className="flex items-center space-x-2 text-gray-400 mb-2">
              <Phone size={16} />
              <span>+57 123 456 7890</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-400">
              <Mail size={16} />
              <span>servicio@electronicamantilla.com</span>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-gray-400 hover:text-white transition-colors">
                  Servicios
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-gray-400 hover:text-white transition-colors">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-gray-400 hover:text-white transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Horario e información de contacto */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Horario de Atención</h3>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center space-x-2">
                <Clock size={16} />
                <div>
                  <p>Lunes - Viernes: 8:00 - 18:00</p>
                  <p>Sábados: 9:00 - 14:00</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin size={16} className="mt-1" />
                <div>
                  <p>Bogotá, Colombia</p>
                  <p className="text-sm">Servicio a domicilio disponible</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Electrónica Mantilla. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacidad
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Términos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};