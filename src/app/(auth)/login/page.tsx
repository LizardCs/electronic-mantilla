'use client';

import { useState, useEffect, Suspense } from 'react'; // Importamos Suspense
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, User, Wrench, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';

// 1. Creamos un componente interno para el contenido del login
function LoginForm() {
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
      setError('Error crítico de conexión. Verifica tu internet.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full">
      {/* Identidad de Marca */}
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

      {/* Formulario de Acceso */}
      <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-blue-900/10 border border-slate-100">
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
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#1e40af] transition-colors">
              <User size={20} />
            </div>
            <input
              type="text"
              required
              autoComplete="username"
              className="block w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 text-sm focus:ring-2 focus:ring-[#fde68a] focus:border-[#1e40af] focus:bg-white outline-none transition-all"
              placeholder="Nombre de usuario"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
          </div>

          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#1e40af] transition-colors">
              <Lock size={20} />
            </div>
            <input
              type="password"
              required
              autoComplete="current-password"
              className="block w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 text-sm focus:ring-2 focus:ring-[#fde68a] focus:border-[#1e40af] focus:bg-white outline-none transition-all"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1e40af] hover:bg-[#1e3a8a] text-white py-4 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-lg shadow-blue-600/20 disabled:opacity-70 mt-8"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Entrar al Sistema
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>
      </div>
      
      <p className="mt-8 text-center text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
        © {new Date().getFullYear()} Electrónica Mantilla — Panel Administrativo
      </p>
    </div>
  );
}

// 2. Export predeterminado que envuelve todo en un Suspense Boundary
export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <Suspense fallback={
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#1e40af] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[#1e40af] font-bold animate-pulse text-xs uppercase tracking-widest">Iniciando...</p>
        </div>
      }>
        <LoginForm />
      </Suspense>
    </div>
  );
}