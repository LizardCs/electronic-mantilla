'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Home, Users, Search, X } from 'lucide-react';

export default function ReportesPage() {
  const router = useRouter();
  const [filtro, setFiltro] = useState('');
  const [reportes, setReportes] = useState([
    { id: 1, titulo: 'Reporte de Ventas', fecha: '2025-11-05' },
    { id: 2, titulo: 'Reporte de Inventario', fecha: '2025-11-04' },
    { id: 3, titulo: 'Reporte de Usuarios', fecha: '2025-11-03' },
  ]);
  const [usuario, setUsuario] = useState('Johancuricho935');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!storedUser || isAuthenticated !== 'true') {
      router.push('/login');
    } else {
      const parsedUser = JSON.parse(storedUser);
      setUsuario(parsedUser.user || parsedUser.email.split('@')[0]);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    router.push('/');
  };

  const handleClear = () => setFiltro('');

  const reportesFiltrados = reportes.filter((r) =>
    r.titulo.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-lg py-4 px-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <nav className="flex items-center space-x-8 text-gray-700 font-medium">
            <Link href="/" className="flex items-center hover:text-blue-600">
              <Home size={18} className="mr-2" />
              Inicio
            </Link>
            <Link href="/usuarios" className="flex items-center hover:text-blue-600">
              <Users size={18} className="mr-2" />
              Usuarios
            </Link>
          </nav>

          <div className="flex items-center space-x-6">
            <span className="text-gray-700 font-semibold">
              Usuario: <span className="text-blue-600">{usuario}</span>
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-700 hover:text-red-600 font-medium transition-colors"
            >
              <LogOut size={18} />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="flex-grow p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">
            📊 Reportes
          </h1>

          {/* 🔍 Barra de búsqueda mejorada */}
          <div className="flex items-center space-x-3 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
              <input
                type="text"
                placeholder="Buscar reporte..."
                className="border border-gray-400 rounded-md pl-10 pr-4 py-2 w-full text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
              />
            </div>

            {/* Botones */}
            <button
              onClick={() => {}}
              className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              <Search size={16} />
              <span>Buscar</span>
            </button>
            <button
              onClick={handleClear}
              disabled={!filtro}
              className={`flex items-center space-x-1 border border-gray-400 px-4 py-2 rounded-md transition-colors ${
                filtro
                  ? 'hover:bg-gray-100 text-gray-700'
                  : 'opacity-50 cursor-not-allowed text-gray-400'
              }`}
            >
              <X size={16} />
              <span>Limpiar</span>
            </button>
          </div>

          {/* Lista de reportes */}
          <div className="space-y-3">
            {reportesFiltrados.length > 0 ? (
              reportesFiltrados.map((r) => (
                <div
                  key={r.id}
                  className="border border-gray-200 p-4 rounded-md hover:shadow-sm transition"
                >
                  <h2 className="text-lg font-semibold text-gray-700">{r.titulo}</h2>
                  <p className="text-sm text-gray-500">Fecha: {r.fecha}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No se encontraron reportes.</p>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-4 mt-8">
        <div className="max-w-6xl mx-auto text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Electronic Mantilla Reports — Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
