'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Wrench, User, LogOut, FileText } from 'lucide-react';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const isAuthPage = pathname === '/login';
  const isReportPage = pathname.startsWith('/reportes');

  // 1. Sincronización de sesión y scroll
  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Sesión corrupta o inválida");
        localStorage.removeItem('user');
      }
    } else {
      setUser(null);
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  if (!mounted) return null;

  // 2. Función de Cierre de Sesión mejorada
  const handleLogout = async () => {
    try {
      // Limpieza inmediata en el cliente para evitar parpadeos
      localStorage.removeItem('user');
      localStorage.removeItem('isAuthenticated');
      setUser(null);

      // Llamada al servidor para borrar la cookie HttpOnly
      await fetch('/api/auth/logout', { method: 'POST' });

      // Redirigir al Inicio y refrescar para que el Middleware se entere
      router.push('/');
      
      // Forzamos un refresco de rutas para limpiar el caché de Next.js
      setTimeout(() => {
        router.refresh();
      }, 100);

    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      router.push('/');
    }
  };

  // 3. Definición de estilos dinámicos
  const headerStyle = isReportPage
    ? 'bg-[#1e3a8a] shadow-2xl py-3'
    : (isScrolled || isAuthPage ? 'bg-white shadow-xl py-2' : 'bg-transparent py-4');

  const textColor = isReportPage
    ? 'text-white'
    : (isScrolled || isAuthPage ? 'text-[#1e3a8a]' : 'text-white');

  const hoverColor = isReportPage || (!isScrolled && !isAuthPage)
    ? 'hover:text-[#fde68a]'
    : 'hover:text-blue-600';

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${headerStyle}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* LOGO */}
          <Link href="/" className="flex items-center group">
            <div className="bg-gradient-to-br from-[#1e40af] to-[#1e3a8a] p-2.5 rounded-xl border border-[#fde68a]/30 shadow-lg group-hover:scale-110 transition-transform">
              <Wrench className="text-white" size={24} />
            </div>
            <div className="ml-3 flex flex-col leading-none">
              <span className={`text-[10px] font-black uppercase tracking-tighter ${textColor}`}>Electrónica</span>
              <span className="text-lg font-bold text-[#fde68a] italic -mt-1">Mantilla</span>
            </div>
          </Link>

          {/* NAVEGACIÓN */}
          <nav className="flex items-center space-x-8">
            <Link href="/" className={`text-[11px] font-black uppercase tracking-widest transition-colors ${textColor} ${hoverColor}`}>
              Inicio
            </Link>

            {user ? (
              <div className="flex items-center space-x-6 border-l border-white/20 pl-6">
                {/* Perfil de Usuario */}
                <div className={`hidden sm:flex items-center gap-2 ${textColor}`}>
                  <User size={16} className="text-[#fde68a]" />
                  <span className="text-[11px] font-bold uppercase tracking-tight">
                    {user.nombre_completo?.split(' ')[0] || 'Admin'}
                  </span>
                </div>

                {/* Enlace al Panel */}
                <Link
                  href="/reportes"
                  className={`flex items-center gap-2 text-[11px] font-black uppercase tracking-widest transition-all ${
                    isReportPage ? 'text-[#fde68a] scale-105' : `${textColor} ${hoverColor}`
                  }`}
                >
                  <FileText size={16} />
                  Reportes
                </Link>

                {/* Botón Logout */}
                <button
                  onClick={handleLogout}
                  className="bg-[#fde68a] text-[#1e3a8a] px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-white hover:scale-105 transition-all flex items-center gap-2 shadow-lg shadow-yellow-500/20"
                >
                  <LogOut size={14} /> Cerrar Sesión
                </button>
              </div>
            ) : (
              /* Botón de Ingreso (Solo si no estamos en la página de login) */
              !isAuthPage && (
                <Link 
                  href="/login" 
                  className="bg-[#fde68a] text-[#1e3a8a] px-6 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all shadow-lg shadow-yellow-500/10"
                >
                  Ingresar
                </Link>
              )
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};