// src/app/reportes/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { 
  Search, FileText, RefreshCw, ClipboardList, 
  Clock, CheckCircle2, X, Trash2 
} from 'lucide-react';

export default function ReportesPage() {
  const [servicios, setServicios] = useState<any[]>([]);
  const [reportes, setReportes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState('');
  const [estadoFiltro, setEstadoFiltro] = useState<'todos' | 'proceso' | 'completado'>('todos');
  
  const [modalOpen, setModalOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');
  const [deleteModal, setDeleteModal] = useState({ 
    show: false, 
    id: '', 
    num: '', 
    isSuccess: false 
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [resServ, resRep] = await Promise.all([
        fetch('/api/servicios'),
        fetch('/api/reportes')
      ]);
      const sData = await resServ.json();
      const rData = await resRep.json();
      
      if (Array.isArray(sData)) setServicios(sData);
      if (Array.isArray(rData)) setReportes(rData);
    } catch (err) {
      console.error("❌ Error al sincronizar con Supabase");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);


  const openDeleteConfirm = (id: string, num: string) => {
    setDeleteModal({ show: true, id, num, isSuccess: false });
  };

  const handleConfirmDelete = async () => {
    try {
      const res = await fetch(`/api/servicios?id=${deleteModal.id}&num=${deleteModal.num}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setDeleteModal(prev => ({ ...prev, isSuccess: true }));
        fetchData(); // Refrescar lista de fondo
      } else {
        alert("Error al eliminar el registro");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const closeDeleteModal = () => {
    setDeleteModal({ show: false, id: '', num: '', isSuccess: false });
  };

  const datosMapeados = servicios.map(s => {
    const rep = reportes.find(r => r.REP_SEV_NUM === s.SERV_NUM);
    return {
      id: s.SERV_ID,
      numero_servicio: s.SERV_NUM,
      estado: s.SERV_EST,
      descripcion_trabajo: s.SERV_DESCRIPCION,
      fecha_inicio: s.SERV_FECH_ASIG,
      tecnico_nombre: s.SERV_NOM_REC,
      descripcion_tecnico: rep?.REP_TIPO,
      fecha_fin: rep?.REP_FECHA,
      documento_pdf: rep?.REP_DOC
    };
  });

  const total = datosMapeados.length;
  const enProceso = datosMapeados.filter(s => parseInt(s.estado) === 0).length;
  const completados = datosMapeados.filter(s => parseInt(s.estado) === 1).length;

  const filtrados = datosMapeados.filter(s => {
    const cumpleTexto = 
      s.tecnico_nombre?.toLowerCase().includes(filtro.toLowerCase()) ||
      s.numero_servicio?.toString().includes(filtro) ||
      s.descripcion_trabajo?.toLowerCase().includes(filtro.toLowerCase());

    const cumpleEstado = 
      estadoFiltro === 'todos' || 
      (estadoFiltro === 'proceso' && parseInt(s.estado) === 0) ||
      (estadoFiltro === 'completado' && parseInt(s.estado) === 1);

    return cumpleTexto && cumpleEstado;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <Header />
      <main className="flex-grow pt-28 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-extrabold text-[#001C38] tracking-tight italic uppercase">
              Gestión de Reportes
            </h1>
            <button onClick={fetchData} className="p-3 bg-white rounded-xl shadow-sm border border-gray-100 text-[#2563eb] hover:bg-blue-50 transition-all">
              <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <button 
              onClick={() => setEstadoFiltro('todos')}
              className={`text-left transition-all p-6 rounded-[2rem] shadow-xl shadow-blue-900/5 border flex items-center gap-5 ${estadoFiltro === 'todos' ? 'bg-blue-50 border-blue-200 ring-2 ring-blue-500/20' : 'bg-white border-transparent hover:border-gray-200'}`}
            >
              <div className="w-14 h-14 bg-[#001C38] rounded-2xl flex items-center justify-center text-white"><ClipboardList size={28} /></div>
              <div><p className="text-[#88BBDC] text-[10px] font-black uppercase tracking-widest">Totales</p><h3 className="text-3xl font-black text-[#001C38]">{total}</h3></div>
            </button>

            <button 
              onClick={() => setEstadoFiltro('proceso')}
              className={`text-left transition-all p-6 rounded-[2rem] shadow-xl shadow-blue-900/5 border flex items-center gap-5 ${estadoFiltro === 'proceso' ? 'bg-blue-50 border-blue-200 ring-2 ring-blue-500/20' : 'bg-white border-transparent hover:border-gray-200'}`}
            >
              <div className="w-14 h-14 bg-[#2563eb] rounded-2xl flex items-center justify-center text-white"><Clock size={28} /></div>
              <div><p className="text-[#88BBDC] text-[10px] font-black uppercase tracking-widest">En Proceso</p><h3 className="text-3xl font-black text-[#2563eb]">{enProceso}</h3></div>
            </button>

            <button 
              onClick={() => setEstadoFiltro('completado')}
              className={`text-left transition-all p-6 rounded-[2rem] shadow-xl shadow-blue-900/5 border flex items-center gap-5 ${estadoFiltro === 'completado' ? 'bg-green-50 border-green-200 ring-2 ring-green-500/20' : 'bg-white border-transparent hover:border-gray-200'}`}
            >
              <div className="w-14 h-14 bg-[#34C759] rounded-2xl flex items-center justify-center text-white"><CheckCircle2 size={28} /></div>
              <div><p className="text-[#88BBDC] text-[10px] font-black uppercase tracking-widest">Completados</p><h3 className="text-3xl font-black text-[#34C759]">{completados}</h3></div>
            </button>
          </div>

          <div className="relative mb-10">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={22} />
            <input 
              type="text" 
              placeholder={`Buscar por técnico, número o descripción...`} 
              className="w-full pl-16 pr-6 py-5 bg-white border border-gray-100 rounded-[1.5rem] shadow-sm outline-none font-medium text-[#001C38] focus:ring-2 focus:ring-blue-500/10"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            />
          </div>

          <div className="space-y-6">
            {loading ? (
              <div className="text-center py-20 bg-white rounded-[2rem] text-gray-400 font-black uppercase tracking-widest text-xs italic">Actualizando...</div>
            ) : filtrados.length > 0 ? (
              filtrados.map((s) => (
                <div key={s.id} className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-blue-900/5 border border-transparent hover:border-[#2563eb]/20 transition-all flex flex-col md:flex-row justify-between items-start md:items-center">
                  
                  <div className="flex-grow space-y-4 w-full">
                    <div className="flex items-center gap-4">
                      <div className="bg-[#001C38] text-white px-4 py-1 rounded-xl text-[10px] font-black tracking-[0.2em] uppercase">SERVICIO</div>
                      <span className="text-4xl font-black text-[#001C38]">#{s.numero_servicio}</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 pt-2">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase text-[#88BBDC] tracking-widest">Técnico Responsable</span>
                        <p className="text-sm font-bold text-[#001C38] uppercase">{s.tecnico_nombre || 'Pendiente de asignación'}</p>
                      </div>

                      <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase text-[#88BBDC] tracking-widest">Fecha Ingreso</span>
                        <p className="text-sm font-bold text-[#001C38]">{new Date(s.fecha_inicio).toLocaleString()}</p>
                      </div>

                      <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase text-[#88BBDC] tracking-widest">Finalización</span>
                        <p className="text-sm font-bold text-[#2563eb]">{s.fecha_fin ? new Date(s.fecha_fin).toLocaleString() : 'Pendiente de reporte...'}</p>
                      </div>

                      <div className={`flex items-center gap-2 px-5 py-1.5 rounded-full font-black text-[10px] uppercase tracking-widest border-2 w-fit ${
                        parseInt(s.estado) === 1 
                        ? 'bg-[#34C759]/10 text-[#34C759] border-[#34C759]/20' 
                        : 'bg-[#2563eb]/10 text-[#2563eb] border-[#2563eb]/20'
                      }`}>
                        <div className={`w-2 h-2 rounded-full ${parseInt(s.estado) === 1 ? 'bg-[#34C759]' : 'bg-[#2563eb]'}`} />
                        {parseInt(s.estado) === 1 ? 'Completado' : 'En Proceso'}
                      </div>

                      <div className="flex flex-col md:col-span-2 mt-2">
                        <span className="text-[10px] font-black uppercase text-[#88BBDC] tracking-widest">Problema Reportado</span>
                        <p className="text-sm font-bold text-gray-500 italic border-l-4 border-gray-100 pl-4">{s.descripcion_trabajo}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 md:mt-0 md:ml-10 flex flex-col gap-3 w-full md:w-auto">
                    <button 
                      disabled={!s.documento_pdf}
                      onClick={() => { setPdfUrl(s.documento_pdf); setModalOpen(true); }}
                      className={`flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-black text-[10px] transition-all shadow-lg border ${
                        s.documento_pdf 
                        ? 'bg-yellow-100 text-gray-800 border-yellow-200 hover:bg-yellow-400 hover:text-black hover:border-yellow-400' 
                        : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                      }`}
                    >
                      <FileText size={20} /> VER REPORTE PDF
                    </button>

                    <button 
                      onClick={() => openDeleteConfirm(s.id, s.numero_servicio)}
                      className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-black text-[10px] transition-all bg-white text-gray-400 border border-gray-100 hover:bg-red-50 hover:text-red-600 hover:border-red-200 shadow-sm"
                    >
                      <Trash2 size={20} /> ELIMINAR REGISTRO
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-white rounded-[2rem] text-gray-400 font-bold">No hay servicios que coincidan con la búsqueda.</div>
            )}
          </div>
        </div>
      </main>

      {modalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-5xl h-[92vh] rounded-[3rem] overflow-hidden flex flex-col shadow-2xl">
            <div className="bg-[#001C38] p-6 flex justify-between items-center text-white">
              <div className="flex items-center gap-4">
                <FileText className="text-yellow-500" size={24} />
                <span className="font-black uppercase text-sm tracking-tighter italic">Visor de Reporte Técnico</span>
              </div>
              <button onClick={() => setModalOpen(false)} className="p-3 bg-red-500 hover:bg-red-600 text-white rounded-2xl transition-all"><X size={24} /></button>
            </div>
            <iframe src={pdfUrl} title="Visor PDF" className="flex-grow w-full border-none" />
          </div>
        </div>
      )}

      {deleteModal.show && (
        <div className="fixed inset-0 z-[110] bg-[#001C38]/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-[3rem] p-10 shadow-2xl text-center flex flex-col items-center gap-6 animate-in zoom-in-95 duration-200">
            
            {!deleteModal.isSuccess ? (
              <>
                <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-2">
                  <Trash2 size={40} />
                </div>
                
                <div>
                  <h3 className="text-xl font-black text-[#001C38] uppercase tracking-tight">¿Estás seguro?</h3>
                  <p className="text-gray-500 text-sm font-medium mt-2">
                    Se eliminará el servicio <span className="font-bold text-red-600">#{deleteModal.num}</span>.

                    Esta acción no se puede deshacer.
                  </p>
                </div>

                <div className="flex flex-col w-full gap-3">
                  <button 
                    onClick={handleConfirmDelete}
                    className="w-full py-4 bg-red-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-700 transition-colors shadow-lg shadow-red-200"
                  >
                    Sí, eliminar registro
                  </button>
                  <button 
                    onClick={closeDeleteModal}
                    className="w-full py-4 bg-gray-100 text-gray-500 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-200 transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-2">
                  <CheckCircle2 size={40} className="animate-bounce" />
                </div>
                
                <div>
                  <h3 className="text-xl font-black text-[#001C38] uppercase tracking-tight">Listo</h3>
                  <p className="text-gray-500 text-sm font-medium mt-2">
                    El registro ha sido eliminado correctamente.
                  </p>
                </div>

                <button 
                  onClick={closeDeleteModal}
                  className="w-full py-4 bg-[#001C38] text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:opacity-90 transition-opacity"
                >
                  Aceptar
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}