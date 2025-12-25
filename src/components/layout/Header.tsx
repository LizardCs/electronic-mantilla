'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Menu, X, Wrench, User, LogOut, FileText } from 'lucide-react';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const isAuthPage = pathname === '/login' || pathname === '/register';
  // NUEVO: Detectar si estamos en la página de reportes
  const isReportPage = pathname.startsWith('/reportes');

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try { setUser(JSON.parse(storedUser)); } catch (e) { console.error("Error de sesión"); }
    }
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) return null;

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    setUser(null);
    router.push('/');
  };

  // LÓGICA DE COLORES PARA REPORTES (Diferente al Home)
  // En reportes usamos un fondo azul sólido siempre para mejor contraste
  const headerStyle = isReportPage 
    ? 'bg-[#1e3a8a] shadow-2xl py-3' 
    : (isScrolled || isAuthPage ? 'bg-white shadow-xl py-2' : 'bg-transparent py-4');

  const textColor = isReportPage 
    ? 'text-white' 
    : (isScrolled || isAuthPage ? 'text-[#1e3a8a]' : 'text-white');

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${headerStyle}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* LOGO */}
          <Link href="/" className="flex items-center group">
            <div className="bg-gradient-to-br from-[#1e40af] to-[#1e3a8a] p-2.5 rounded-xl border border-[#fde68a]/30 shadow-lg">
              <Wrench className="text-white" size={24} />
            </div>
            <div className="ml-3 flex flex-col leading-none">
              <span className={`text-[10px] font-black uppercase tracking-tighter ${textColor}`}>Electrónica</span>
              <span className="text-lg font-bold text-[#fde68a] italic -mt-1">Mantilla</span>
            </div>
          </Link>

          {/* NAVEGACIÓN DESKTOP */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className={`text-[11px] font-black uppercase tracking-widest transition-colors ${textColor} hover:text-[#fde68a]`}>
              Inicio
            </Link>

            {user ? (
              <div className="flex items-center space-x-6 border-l border-white/20 pl-6">
                <div className={`flex items-center gap-2 ${textColor}`}>
                  <User size={16} className="text-[#fde68a]" />
                  <span className="text-[11px] font-bold uppercase tracking-tight">{user.usuario || 'Técnico'}</span>
                </div>
                
                <Link href="/reportes" className={`flex items-center gap-2 text-[11px] font-black uppercase tracking-widest ${pathname === '/reportes' ? 'text-[#fde68a]' : textColor}`}>
                  <FileText size={16} />
                  Reportes
                </Link>

                <button onClick={handleLogout} className="bg-[#fde68a] text-[#1e3a8a] px-5 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-yellow-400 transition-all flex items-center gap-2">
                  <LogOut size={14} /> Salir
                </button>
              </div>
            ) : (
              <Link href="/login" className="bg-[#fde68a] text-[#1e3a8a] px-6 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest">
                Ingresar
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};