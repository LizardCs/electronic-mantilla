'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { 
  Search, FileText, RefreshCw, ClipboardList, 
  Clock, CheckCircle2, X, Download, User, Calendar, AlertCircle
} from 'lucide-react';

export default function ReportesPage() {
  const [servicios, setServicios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');

  const fetchServicios = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/servicios');
      const data = await res.json();
      if (Array.isArray(data)) setServicios(data);
    } catch (err) {
      console.error("Error al sincronizar datos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServicios();
  }, []);

  // Ahora handleVerPdf recibe directamente el string base64 procesado por la API
  const handleVerPdf = (base64Data: string | null) => {
    if (!base64Data) {
      alert("Este servicio aún no cuenta con un archivo PDF generado.");
      return;
    }
    setPdfUrl(base64Data);
    setModalOpen(true);
  };

  const total = servicios.length;
  const enProceso = servicios.filter(s => parseInt(s.estado) === 0).length;
  const completados = servicios.filter(s => parseInt(s.estado) === 1).length;

  const filtrados = servicios.filter(s => 
    s.tecnico_nombre?.toLowerCase().includes(filtro.toLowerCase()) ||
    s.numero_servicio?.toString().includes(filtro) ||
    s.descripcion_trabajo?.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <Header />
      
      <main className="flex-grow py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-extrabold text-[#001C38] tracking-tight italic uppercase">
              Gestión de <span className="text-[#2563eb]">Reportes</span>
            </h1>
            <button onClick={fetchServicios} className="p-3 bg-white rounded-xl shadow-sm border border-gray-100 text-[#2563eb] hover:bg-blue-50 transition-all">
              <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
            </button>
          </div>

          {/* Panel de Totales */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white p-6 rounded-[2rem] shadow-xl shadow-blue-900/5 border border-gray-50 flex items-center gap-5">
              <div className="w-14 h-14 bg-[#001C38] rounded-2xl flex items-center justify-center text-white"><ClipboardList size={28} /></div>
              <div><p className="text-[#88BBDC] text-[10px] font-black uppercase tracking-widest">Totales</p><h3 className="text-3xl font-black text-[#001C38]">{total}</h3></div>
            </div>
            <div className="bg-white p-6 rounded-[2rem] shadow-xl shadow-blue-900/5 border border-gray-50 flex items-center gap-5">
              <div className="w-14 h-14 bg-[#2563eb] rounded-2xl flex items-center justify-center text-white"><Clock size={28} /></div>
              <div><p className="text-[#88BBDC] text-[10px] font-black uppercase tracking-widest">En Proceso</p><h3 className="text-3xl font-black text-[#2563eb]">{enProceso}</h3></div>
            </div>
            <div className="bg-white p-6 rounded-[2rem] shadow-xl shadow-blue-900/5 border border-gray-50 flex items-center gap-5">
              <div className="w-14 h-14 bg-[#34C759] rounded-2xl flex items-center justify-center text-white"><CheckCircle2 size={28} /></div>
              <div><p className="text-[#88BBDC] text-[10px] font-black uppercase tracking-widest">Completados</p><h3 className="text-3xl font-black text-[#34C759]">{completados}</h3></div>
            </div>
          </div>

          {/* Buscador */}
          <div className="relative mb-10">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={22} />
            <input 
              type="text" 
              placeholder="Buscar por técnico, descripción o número de servicio..." 
              className="w-full pl-16 pr-6 py-5 bg-white border border-gray-100 rounded-[1.5rem] shadow-sm focus:ring-2 focus:ring-[#2563eb] outline-none font-medium text-[#001C38]"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            />
          </div>

          <div className="space-y-6">
            {loading ? (
              <div className="text-center py-20 bg-white rounded-[2rem] text-gray-400 font-black uppercase tracking-widest text-xs italic">Cargando datos maestros...</div>
            ) : filtrados.map((s) => (
              <div key={s.id} className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-blue-900/5 border border-transparent hover:border-[#2563eb]/20 transition-all flex flex-col md:flex-row justify-between items-start md:items-center group">
                
                <div className="flex-grow space-y-4 w-full">
                  <div className="flex items-center gap-4">
                    <div className="bg-[#001C38] text-white px-4 py-1 rounded-xl text-[10px] font-black tracking-[0.2em] uppercase">NÚMERO SERVICIO</div>
                    <span className="text-4xl font-black text-[#001C38] tracking-tighter">#{s.numero_servicio}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 pt-2">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black uppercase text-[#88BBDC] tracking-widest">Técnico asignado</span>
                      <p className="text-sm font-bold text-[#001C38] uppercase">{s.tecnico_nombre || 'Pendiente de asignar'}</p>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-[10px] font-black uppercase text-[#88BBDC] tracking-widest">Fecha Inicio</span>
                      <p className="text-sm font-bold text-[#001C38]">{new Date(s.fecha_inicio).toLocaleString()}</p>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-[10px] font-black uppercase text-[#88BBDC] tracking-widest">Fecha y hora finalización</span>
                      <p className="text-sm font-bold text-[#2563eb]">{s.fecha_fin ? new Date(s.fecha_fin).toLocaleString() : 'En curso...'}</p>
                    </div>

                    <div className="flex flex-col md:col-span-2">
                      <span className="text-[10px] font-black uppercase text-[#88BBDC] tracking-widest">Descripción trabajo</span>
                      <p className="text-sm font-bold text-gray-500 italic border-l-4 border-gray-100 pl-4">{s.descripcion_trabajo}</p>
                    </div>

                    <div className="flex flex-col md:col-span-2">
                      <span className="text-[10px] font-black uppercase text-[#88BBDC] tracking-widest">Descripción técnico (REP_TIPO)</span>
                      <p className="text-sm font-bold text-[#001C38]">{s.descripcion_tecnico || 'Sin informe registrado'}</p>
                    </div>

                    <div className="flex items-center gap-4 pt-2">
                      <div className={`flex items-center gap-2 px-5 py-1.5 rounded-full font-black text-[10px] uppercase tracking-widest border-2 ${
                        parseInt(s.estado) === 1 
                        ? 'bg-[#34C759]/10 text-[#34C759] border-[#34C759]/20' 
                        : 'bg-[#2563eb]/10 text-[#2563eb] border-[#2563eb]/20'
                      }`}>
                        <div className={`w-2 h-2 rounded-full ${parseInt(s.estado) === 1 ? 'bg-[#34C759]' : 'bg-[#2563eb]'}`} />
                        {parseInt(s.estado) === 1 ? 'Completado' : 'En Proceso'}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 md:mt-0 md:ml-10 flex-shrink-0 w-full md:w-auto">
                  <button 
                    onClick={() => handleVerPdf(s.documento_pdf)}
                    className={`w-full md:w-auto flex items-center justify-center gap-3 px-10 py-5 rounded-[2rem] font-black text-xs transition-all shadow-xl group/btn border ${
                      s.documento_pdf 
                      ? 'bg-red-50 text-red-600 border-red-100 hover:bg-red-600 hover:text-white shadow-red-900/5' 
                      : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed shadow-none'
                    }`}
                  >
                    <FileText size={24} className="group-hover/btn:scale-110 transition-transform" />
                    VER PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Visor de PDF Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-5xl h-[92vh] rounded-[3rem] overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95">
            <div className="bg-[#001C38] p-6 flex justify-between items-center text-white">
              <div className="flex items-center gap-4">
                <div className="bg-red-500 p-2.5 rounded-2xl"><FileText size={24} /></div>
                <div>
                  <h3 className="font-black text-sm uppercase tracking-tighter">Reporte Técnico Oficial</h3>
                  <p className="text-[10px] text-[#88BBDC] font-black uppercase tracking-[0.2em]">Electrónica Mantilla</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <a href={pdfUrl} download="Reporte_Tecnico.pdf" className="p-3 hover:bg-white/10 rounded-2xl"><Download size={24} /></a>
                <button onClick={() => setModalOpen(false)} className="p-3 bg-red-500 hover:bg-red-600 text-white rounded-2xl transition-all"><X size={24} /></button>
              </div>
            </div>
            <div className="flex-grow bg-white">
              {/* Usamos el PDF en Base64 directamente en el iframe */}
              <iframe src={pdfUrl} className="w-full h-full border-none" title="PDF Viewer" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}