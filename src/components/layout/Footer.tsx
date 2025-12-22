'use client';

import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, Wrench } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[#0f172a] bg-[linear-gradient(135deg,#0f172a_0%,#1e293b_50%,#1e1b4b_100%)] text-white">
      
      {/* LÍNEA CURVA DIAGONAL (Mismo estilo que el Hero) */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-20" 
        viewBox="0 0 1000 400" 
        preserveAspectRatio="none"
      >
        <path 
          d="M0,400 C200,350 600,100 1000,0" 
          fill="none" 
          stroke="#fde68a" 
          strokeWidth="1" 
        />
        <path 
          d="M0,420 C250,370 650,150 1050,-20" 
          fill="none" 
          stroke="white" 
          strokeWidth="6" 
          className="opacity-5"
        />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Información de la empresa y Logo */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-[#0f172a] to-[#0047ab] rounded-xl flex items-center justify-center shadow-xl border-2 border-[#fde68a]/20">
                <Wrench className="text-white" size={28} />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-xl font-black tracking-widest uppercase">ELECTRONICA</span>
                <span className="text-4xl font-bold text-[#fde68a] italic -mt-1">Mantilla</span>
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/60 mt-1">Centro de Servicio Autorizado</span>
              </div>
            </div>
            
            <p className="text-white/60 mb-8 max-w-md text-sm leading-relaxed italic">
              Especialistas en la reparación y mantenimiento preventivo de equipos electrónicos y línea blanca. 
              Garantizamos soluciones técnicas con estándares de calidad y repuestos originales en Ambato.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-white/80 hover:text-[#fde68a] transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-[#fde68a]/10">
                  <Phone size={16} className="text-[#fde68a]" />
                </div>
                <span className="text-sm font-medium">+593 098 341 1212</span>
              </div>
              <div className="flex items-center space-x-3 text-white/80 hover:text-[#fde68a] transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-[#fde68a]/10">
                  <Mail size={16} className="text-[#fde68a]" />
                </div>
                <span className="text-sm font-medium">servicio@electronicamantilla.com</span>
              </div>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="text-[#fde68a] text-sm font-black uppercase tracking-widest mb-6">Explorar</h3>
            <ul className="space-y-4">
              {['Inicio', 'Servicios', 'Nosotros', 'Contacto'].map((item) => (
                <li key={item}>
                  <Link 
                    href={`#${item.toLowerCase()}`} 
                    className="text-white/60 hover:text-white text-sm font-bold transition-all hover:translate-x-1 inline-block"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Horario e información de ubicación */}
          <div>
            <h3 className="text-[#fde68a] text-sm font-black uppercase tracking-widest mb-6">Atención</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-3 text-white/60">
                <Clock size={18} className="text-[#fde68a] mt-0.5" />
                <div className="text-sm">
                  <p className="font-bold text-white/90">Lunes - Viernes</p>
                  <p>08:00 AM - 06:00 PM</p>
                  <p className="font-bold text-white/90 mt-2">Sábados</p>
                  <p>09:00 AM - 02:00 PM</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 text-white/60">
                <MapPin size={18} className="text-[#fde68a] mt-0.5" />
                <div className="text-sm">
                  <p className="font-bold text-white/90">Ambato, Ecuador</p>
                  <p>Cobertura en sectores aledaños.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Línea divisoria y Copyright */}
        <div className="border-t border-white/10 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-xs tracking-wide">
              © {currentYear} <span className="text-white/60 font-bold uppercase">Electrónica Mantilla</span>. Todos los derechos reservados.
            </p>
            <div className="flex space-x-8">
              <Link href="/privacy" className="text-white/40 hover:text-[#fde68a] text-xs transition-colors font-bold uppercase tracking-tighter">
                Privacidad
              </Link>
              <Link href="/terms" className="text-white/40 hover:text-[#fde68a] text-xs transition-colors font-bold uppercase tracking-tighter">
                Términos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};