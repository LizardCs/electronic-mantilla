'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  // --- ESTADOS PARA LOS NUEVOS CAMPOS ---
  const [cedula, setCedula] = useState('');
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [usuario, setUsuario] = useState('');
  const [celular, setCelular] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // --- VALIDACIONES ---
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      setLoading(false);
      return;
    }

    if (cedula.length < 10) {
      setError('La cédula debe tener 10 dígitos');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Enviamos los nombres de variables que espera la API
        body: JSON.stringify({ 
          cedula, 
          nombres, 
          apellidos, 
          usuario, 
          password, 
          celular 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/login?message=Registro exitoso. Ahora puedes iniciar sesión.');
      } else {
        setError(data.error || 'Error en el registro');
      }
    } catch (error) {
      setError('Error de conexión con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-[#001C38]">
            Crear Cuenta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-500">
            Electronic Mantilla Reports - Registro Web
          </p>
        </div>
        
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 text-sm rounded">
              {error}
            </div>
          )}
          
          <div className="space-y-3">
            {/* CÉDULA */}
            <input
              type="text"
              required
              className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Cédula de Identidad"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
            />

            {/* NOMBRES Y APELLIDOS */}
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                required
                className="appearance-none rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-blue-500 sm:text-sm"
                placeholder="Nombres"
                value={nombres}
                onChange={(e) => setNombres(e.target.value)}
              />
              <input
                type="text"
                required
                className="appearance-none rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-blue-500 sm:text-sm"
                placeholder="Apellidos"
                value={apellidos}
                onChange={(e) => setApellidos(e.target.value)}
              />
            </div>

            {/* USUARIO Y CELULAR */}
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                required
                className="appearance-none rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-blue-500 sm:text-sm"
                placeholder="Usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
              />
              <input
                type="text"
                className="appearance-none rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-blue-500 sm:text-sm"
                placeholder="Celular (Opcional)"
                value={celular}
                onChange={(e) => setCelular(e.target.value)}
              />
            </div>

            {/* CONTRASEÑAS */}
            <input
              type="password"
              required
              className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 sm:text-sm"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              required
              className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 sm:text-sm"
              placeholder="Confirmar Contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#001C38] hover:bg-[#002d5a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all shadow-md"
          >
            {loading ? 'Procesando...' : 'Crear Cuenta Web'}
          </button>

          <div className="text-center mt-4">
            <Link 
              href="/login" 
              className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
            >
              ¿Ya tienes cuenta? Inicia sesión aquí
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}