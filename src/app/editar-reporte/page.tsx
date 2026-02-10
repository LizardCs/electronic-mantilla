// src/app/editar-reporte/page.tsx
'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { ArrowLeft, Hammer, Construction, FileEdit } from 'lucide-react';

function EditarReporteContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const numServicio = searchParams.get('id'); // Recuperamos el ID de la URL

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <Header />
      
      <main className="flex-grow pt-28 pb-10 px-4 flex items-center justify-center">
        <div className="max-w-md w-full text-center bg-white rounded-[3rem] p-10 shadow-2xl shadow-blue-900/10 border border-gray-100 flex flex-col items-center animate-in zoom-in-95 duration-500">
          
          {/* Icono de Construcción */}
          <div className="relative mb-8">
            <div className="w-28 h-28 bg-[#FFF9E6] rounded-full flex items-center justify-center shadow-inner">
              <Construction size={56} className="text-[#F59E0B]" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center border border-gray-100">
              <Hammer size={24} className="text-[#001C38] animate-bounce" />
            </div>
          </div>

          <h1 className="text-3xl font-extrabold text-[#001C38] tracking-tight italic uppercase mb-2">
            En Desarrollo
          </h1>
          
          <div className="bg-blue-50/50 p-4 rounded-2xl w-full border border-blue-100 mt-2 mb-6">
            <p className="text-gray-500 text-sm font-medium leading-relaxed">
              La edición profunda del reporte <span className="font-bold text-[#2563eb]">#{numServicio || 'Desconocido'}</span> con manejo avanzado de imágenes y PDF estará disponible en la próxima actualización.
            </p>
          </div>

          <button 
            onClick={() => router.back()}
            className="w-full flex items-center justify-center gap-3 py-4 bg-[#001C38] text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#002b5e] transition-all shadow-xl shadow-blue-900/20"
          >
            <ArrowLeft size={18} />
            Volver a Reportes
          </button>
        </div>
      </main>
    </div>
  );
}

export default function EditarReportePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="animate-spin text-[#001C38]"><FileEdit size={32} /></div>
      </div>
    }>
      <EditarReporteContent />
    </Suspense>
  );
}