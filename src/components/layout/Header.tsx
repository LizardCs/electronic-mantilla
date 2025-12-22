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

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    const storedUser = localStorage.getItem('user');
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (storedUser && isAuthenticated === 'true') {
      try { setUser(JSON.parse(storedUser)); } catch (e) { console.error("Error al leer sesión"); }
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    setUser(null);
    router.push('/');
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => pathname === path;
  if (!mounted) return null;

  const headerBg = isScrolled 
    ? 'bg-white/95 backdrop-blur-md shadow-xl py-2' 
    : 'bg-transparent py-4';
  
  const textColor = (isScrolled || isAuthPage) ? 'text-[#00122e]' : 'text-white';
  const logoBorder = (isScrolled || isAuthPage) ? 'border-[#00122e]/10' : 'border-[#ffcc00]/30';
  const activeYellow = 'text-[#fde68a]'; 

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${headerBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Corporativo */}
          <Link href="/" className="flex items-center group">
            <div className={`transition-all duration-300 rounded-2xl flex items-center justify-center border-2 ${logoBorder} bg-gradient-to-br from-[#00122e] to-[#0047ab] shadow-xl w-14 h-14`}>
              <Wrench className="text-white" size={28} strokeWidth={2.5} />
            </div>
          </Link>

          {/* Navegación Desktop */}
          <nav className="hidden md:flex items-center space-x-10">
            <Link 
              href="/" 
              className={`font-black uppercase tracking-widest text-sm transition-all ${
                isActive('/') ? activeYellow : `${textColor} hover:text-[#fde68a]`
              }`}
            >
              Inicio
            </Link>
            
            {user ? (
              <div className={`flex items-center space-x-8 border-l-2 pl-8 ${(isScrolled || isAuthPage) ? 'border-gray-200' : 'border-white/20'}`}>
                <div className={`flex items-center space-x-3 ${textColor}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${(isScrolled || isAuthPage) ? 'bg-[#0047ab]/10' : 'bg-white/10'}`}>
                    <User size={18} className={(isScrolled || isAuthPage) ? 'text-[#0047ab]' : 'text-white'} />
                  </div>
                  <span className="font-bold text-sm">{user.usuario || 'Técnico'}</span>
                </div>
                
                <Link 
                  href="/reportes" 
                  className={`flex items-center space-x-2 font-black uppercase tracking-widest text-xs transition-colors ${
                    isActive('/reportes') ? activeYellow : `${textColor} hover:text-[#fde68a]`
                  }`}
                >
                  <FileText size={18} className={isActive('/reportes') ? 'text-[#fde68a]' : 'text-[#ffcc00]'} />
                  <span>Reportes</span>
                </Link>

                {/* --- BOTÓN SALIR AMARILLO BAJITO --- */}
                <button
                  onClick={handleLogout}
                  className="bg-[#fde68a] hover:bg-[#fcd34d] text-[#00122e] px-6 py-2.5 rounded-full font-black uppercase tracking-widest text-[10px] transition-all shadow-lg hover:shadow-[#fde68a]/20 active:scale-95 flex items-center gap-2"
                >
                  <LogOut size={14} />
                  Salir
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-6">
                <Link 
                  href="/login" 
                  className={`${textColor} hover:text-[#0047ab] font-black uppercase tracking-widest text-sm transition-colors`}
                >
                  Ingresar
                </Link>
                <Link 
                  href="/register" 
                  className={`px-8 py-3 rounded-xl font-black uppercase tracking-widest text-xs transition-all shadow-lg ${
                    (isScrolled || isAuthPage)
                      ? 'bg-[#00122e] text-white hover:bg-[#0047ab]' 
                      : 'bg-white text-[#00122e] hover:bg-[#ffcc00]'
                  }`}
                >
                  Registrarse
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button className={`md:hidden p-3 ${textColor}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Menú Mobile con Blur */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#00122e]/95 backdrop-blur-xl border-t border-white/10 py-8 px-6 space-y-4 absolute w-full left-0 top-full shadow-2xl animate-in fade-in slide-in-from-top-4">
          <Link href="/" className="block py-4 text-white font-black uppercase tracking-widest border-b border-white/5">Inicio</Link>
          {user ? (
            <>
              <Link href="/reportes" className="block py-4 text-white font-black uppercase tracking-widest border-b border-white/5">Reportes</Link>
              <div className="pt-4">
                <button 
                  onClick={handleLogout} 
                  className="w-full py-4 bg-[#fde68a] text-[#00122e] font-black uppercase tracking-widest rounded-xl shadow-lg flex items-center justify-center gap-2"
                >
                  <LogOut size={18} />
                  Salir
                </button>
              </div>
            </>
          ) : (
            <div className="grid grid-cols-1 gap-4 pt-4">
              <Link href="/login" className="py-4 text-center text-white font-black uppercase border-2 border-white/20 rounded-xl">Ingresar</Link>
              <Link href="/register" className="py-4 text-center font-black uppercase bg-[#ffcc00] text-[#00122e] rounded-xl">Registrarse</Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};