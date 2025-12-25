'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Lock, User, Wrench, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const message = searchParams.get('message');
    if (message) setSuccessMsg(message);
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMsg('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('isAuthenticated', 'true');
        router.push('/reportes');
      } else {
        setError(data.error || 'Credenciales incorrectas');
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    // Fondo sutilmente más cálido
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Logo e Identidad - ACTUALIZADO A AZUL VIBRANTE */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#1e40af] rounded-[2rem] shadow-xl mb-6 transform -rotate-3 border-4 border-[#fde68a]/30">
            <Wrench className="text-white" size={36} />
          </div>
          <h2 className="text-4xl font-black text-[#1e3a8a] tracking-tight uppercase italic leading-none">
            Bienvenido
          </h2>
          <p className="mt-3 text-[#1e40af] font-bold uppercase text-[10px] tracking-[0.3em] border-l-4 border-[#fde68a] inline-block pl-3">
            Electrónica Mantilla Reportes
          </p>
        </div>

        {/* Tarjeta de Login */}
        <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-blue-900/10 border border-slate-100">
          
          {/* Alertas */}
          {error && (
            <div className="mb-6 flex items-center gap-3 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl text-red-700 text-sm animate-in fade-in slide-in-from-top-2">
              <AlertCircle size={18} />
              <p className="font-medium">{error}</p>
            </div>
          )}

          {successMsg && (
            <div className="mb-6 flex items-center gap-3 bg-green-50 border-l-4 border-green-500 p-4 rounded-r-xl text-green-700 text-sm animate-in fade-in slide-in-from-top-2">
              <CheckCircle2 size={18} />
              <p className="font-medium">{successMsg}</p>
            </div>
          )}
          
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Campo Usuario */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#1e40af] transition-colors">
                <User size={20} />
              </div>
              <input
                type="text"
                required
                className="block w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 text-sm focus:ring-2 focus:ring-[#fde68a] focus:border-[#1e40af] focus:bg-white outline-none transition-all"
                placeholder="Nombre de usuario"
                value={user}
                onChange={(e) => setUser(e.target.value)}
              />
            </div>

            {/* Campo Password */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#1e40af] transition-colors">
                <Lock size={20} />
              </div>
              <input
                type="password"
                required
                className="block w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 text-sm focus:ring-2 focus:ring-[#fde68a] focus:border-[#1e40af] focus:bg-white outline-none transition-all"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Botón Submit - ACTUALIZADO A AZUL REY */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1e40af] hover:bg-[#1e3a8a] text-white py-4 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-lg shadow-blue-600/20 disabled:opacity-70 mt-8"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Iniciar Sesión
                  <ArrowRight size={20} />
                </>
              )}
            </button>

            {/* Link a Registro */}
            <div className="pt-6 text-center border-t border-slate-50">
              <p className="text-sm text-slate-500 font-medium">
                ¿No tienes una cuenta?{' '}
                <Link 
                  href="/register" 
                  className="text-[#1e40af] font-black hover:text-[#1e3a8a] underline underline-offset-4 decoration-[#fde68a] decoration-2"
                >
                  Regístrate ahora
                </Link>
              </p>
            </div>
          </form>
        </div>
        
        <p className="mt-8 text-center text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
          © {new Date().getFullYear()} Electrónica Mantilla — Sistema de Gestión Web
        </p>
      </div>
    </div>
  );
}