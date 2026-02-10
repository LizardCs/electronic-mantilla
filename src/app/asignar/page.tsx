// app/asignar/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { supabase } from '@/lib/supabase';
import { 
  ArrowLeft, Camera, Hash, User, MapPin, 
  Wrench, Eye, Receipt, Users, Image as ImageIcon,
  CheckCircle2, AlertCircle, AlertTriangle
} from 'lucide-react';

export default function AsignarServicioPage() {
  const router = useRouter();
  
  const [loading, setLoading] = useState(false);
  const [tecnicos, setTecnicos] = useState<any[]>([]);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [errorModal, setErrorModal] = useState({ show: false, message: "" });
  const [successModal, setSuccessModal] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    SERV_NUM: "",
    SERV_NOM_CLI: "",
    SERV_TEL_CLI: "",
    SERV_CIUDAD: "",
    SERV_DIR: "",
    SERV_DESCRIPCION: "",
    SERV_OBS: "",
    SERV_REQUIERE_FACT: null as boolean | null,
    SERV_CED_REC: "",
    SERV_NOM_REC: "",
    SERV_IMG_ENV: null as string | null,
    SERV_CED_ENV: "AdminWeb", 
    SERV_NOM_ENV: "Administrador Web", 
    SERV_EST: 0
  });

  useEffect(() => {
    const cargarDatosIniciales = async () => {
      try {
        const resTec = await fetch('/api/tecnicos');
        if (resTec.ok) {
          const dataTec = await resTec.json();
          const listaTecnicos = Array.isArray(dataTec) ? dataTec : (dataTec.tecnicos || dataTec.data || []);
          setTecnicos(listaTecnicos);
        }

        const sesionLocal = localStorage.getItem('usuario_web') || localStorage.getItem('session') || localStorage.getItem('user'); 
        
        if (sesionLocal) {
          const webUser = JSON.parse(sesionLocal);
          const cedulaWeb = webUser.WEB_CED || webUser.cedula; 

          if (cedulaWeb) {
            const { data: webAdmin, error } = await supabase
              .from('usersweb')
              .select('WEB_CED, WEB_NOMBRES, WEB_APELLIDOS')
              .eq('WEB_CED', cedulaWeb)
              .single();

            if (webAdmin && !error) {
              setFormData(prev => ({
                ...prev,
                SERV_CED_ENV: webAdmin.WEB_CED,
                SERV_NOM_ENV: `${webAdmin.WEB_NOMBRES} ${webAdmin.WEB_APELLIDOS}`.trim()
              }));
            }
          }
        }
      } catch (err) {
        console.error("Error al cargar datos iniciales:", err);
      }
    };

    cargarDatosIniciales();
  }, []);

  const handleChange = (field: string, value: any) => {
    if (field === 'SERV_CED_REC') {
      const tec = tecnicos.find(t => t.MOV_CED === value);
      setFormData(prev => ({ 
        ...prev, 
        SERV_CED_REC: value, 
        SERV_NOM_REC: tec ? tec.nombre_completo : "" 
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const resultString = reader.result as string;
        setImagePreview(resultString);
        const base64String = resultString.split(',')[1];
        setFormData(prev => ({ ...prev, SERV_IMG_ENV: base64String }));
      };
      reader.readAsDataURL(file);
    }
  };

  const showError = (msg: string) => {
    setErrorModal({ show: true, message: msg });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.SERV_NUM.trim()) return showError("El número de servicio es obligatorio.");
    if (!formData.SERV_NOM_CLI.trim()) return showError("El nombre del cliente es obligatorio.");
    if (!formData.SERV_TEL_CLI.trim()) return showError("El teléfono del cliente es obligatorio.");
    if (!formData.SERV_CIUDAD.trim()) return showError("La ciudad es obligatoria.");
    if (!formData.SERV_DIR.trim()) return showError("La dirección del cliente es obligatoria.");
    if (!formData.SERV_DESCRIPCION.trim()) return showError("Debe describir el daño o problema.");
    if (formData.SERV_REQUIERE_FACT === null) return showError("Debe indicar si requiere factura o no.");
    
    setLoading(true);
    try {
      const res = await fetch('/api/asignar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        // 👇 LLAMAMOS AL MODAL DE ÉXITO EN LUGAR DEL ALERT 👇
        setSuccessModal(true);
      } else {
        const errData = await res.json();
        showError(`Error al guardar: ${errData.error || 'Desconocido'}`);
      }
    } catch (error) {
      showError("Error de conexión al servidor.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (formData.SERV_NUM || formData.SERV_NOM_CLI) {
      setShowCancelModal(true);
    } else {
      router.push('/reportes');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <Header />
      
      <main className="flex-grow pt-28 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <button 
                onClick={handleCancel}
                className="p-3 bg-white text-[#001C38] rounded-xl shadow-sm border border-gray-200 hover:bg-gray-50 transition-all"
              >
                <ArrowLeft size={24} />
              </button>
              <div>
                <h1 className="text-3xl font-extrabold text-[#001C38] tracking-tight italic uppercase">
                  Nueva Asignación
                </h1>
                <p className="text-sm font-medium text-gray-500">
                  Crea un nuevo servicio • Asigna: <span className="font-bold text-[#001C38]">{formData.SERV_NOM_ENV}</span>
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-[2rem] shadow-xl shadow-blue-900/5 border border-gray-100 p-8 grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10">
            
            {/* COLUMNA IZQUIERDA */}
            <div className="space-y-8">
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[#001C38] font-black uppercase tracking-wider text-sm">
                  <Hash size={18} className="text-[#2563eb]" /> N° de Servicio <span className="text-red-500">*</span>
                </div>
                <input
                  type="text"
                  placeholder="Ej: A-10542"
                  maxLength={20}
                  className="w-full px-5 py-4 bg-[#f8fafc] border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb] transition-all uppercase font-bold text-[#001C38]"
                  value={formData.SERV_NUM}
                  onChange={(e) => handleChange('SERV_NUM', e.target.value)}
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[#001C38] font-black uppercase tracking-wider text-sm">
                  <User size={18} className="text-[#2563eb]" /> Datos del Cliente <span className="text-red-500">*</span>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <input
                    type="text"
                    placeholder="Nombres y Apellidos completos"
                    className="w-full px-5 py-4 bg-[#f8fafc] border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#2563eb]/20 transition-all text-[#001C38]"
                    value={formData.SERV_NOM_CLI}
                    onChange={(e) => handleChange('SERV_NOM_CLI', e.target.value)}
                  />
                  <input
                    type="tel"
                    placeholder="Teléfono (Ej: 0987654321)"
                    className="w-full px-5 py-4 bg-[#f8fafc] border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#2563eb]/20 transition-all text-[#001C38]"
                    value={formData.SERV_TEL_CLI}
                    onChange={(e) => handleChange('SERV_TEL_CLI', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[#001C38] font-black uppercase tracking-wider text-sm">
                  <MapPin size={18} className="text-[#2563eb]" /> Ubicación <span className="text-red-500">*</span>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <input
                    type="text"
                    placeholder="Ciudad"
                    className="w-full px-5 py-4 bg-[#f8fafc] border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#2563eb]/20 transition-all text-[#001C38]"
                    value={formData.SERV_CIUDAD}
                    onChange={(e) => handleChange('SERV_CIUDAD', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Dirección Exacta"
                    className="w-full px-5 py-4 bg-[#f8fafc] border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#2563eb]/20 transition-all text-[#001C38]"
                    value={formData.SERV_DIR}
                    onChange={(e) => handleChange('SERV_DIR', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#001C38] font-black uppercase tracking-wider text-sm">
                    <Camera size={18} className="text-[#2563eb]" /> Foto del Equipo <span className="text-gray-400 font-normal text-xs">(Opcional)</span>
                  </div>
                  {imagePreview && (
                    <button type="button" onClick={() => {setImagePreview(null); handleChange('SERV_IMG_ENV', null)}} className="text-red-500 text-xs font-bold hover:underline">
                      Quitar foto
                    </button>
                  )}
                </div>
                
                {!imagePreview ? (
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50 hover:bg-gray-100 cursor-pointer transition-all">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 text-gray-400">
                      <ImageIcon size={32} className="mb-2" />
                      <p className="text-sm font-medium">Click para subir foto</p>
                    </div>
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                  </label>
                ) : (
                  <div className="relative w-full h-48 rounded-2xl overflow-hidden border border-gray-200">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

            </div>

            {/* COLUMNA DERECHA */}
            <div className="space-y-8 flex flex-col justify-between">
              
              <div className="space-y-8">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[#001C38] font-black uppercase tracking-wider text-sm">
                    <Wrench size={18} className="text-[#2563eb]" /> Daño / Problema <span className="text-red-500">*</span>
                  </div>
                  <textarea
                    placeholder="Describa la falla reportada detalladamente..."
                    rows={4}
                    className="w-full px-5 py-4 bg-[#f8fafc] border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#2563eb]/20 transition-all text-[#001C38] resize-none"
                    value={formData.SERV_DESCRIPCION}
                    onChange={(e) => handleChange('SERV_DESCRIPCION', e.target.value)}
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[#001C38] font-black uppercase tracking-wider text-sm">
                    <Eye size={18} className="text-[#2563eb]" /> Observaciones <span className="text-gray-400 font-normal text-xs">(Opcional)</span>
                  </div>
                  <textarea
                    placeholder="Detalles extra (llamar antes, timbre dañado, etc.)"
                    rows={2}
                    className="w-full px-5 py-4 bg-[#f8fafc] border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#2563eb]/20 transition-all text-[#001C38] resize-none"
                    value={formData.SERV_OBS}
                    onChange={(e) => handleChange('SERV_OBS', e.target.value)}
                  />
                </div>

                <div className="space-y-3 bg-[#f8fafc] p-5 rounded-2xl border border-gray-100">
                  <div className="flex items-center gap-2 text-[#001C38] font-black uppercase tracking-wider text-sm mb-2">
                    <Receipt size={18} className="text-[#2563eb]" /> ¿Requiere Factura? <span className="text-red-500">*</span>
                  </div>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${formData.SERV_REQUIERE_FACT === true ? 'border-[#2563eb]' : 'border-gray-300 group-hover:border-[#2563eb]/50'}`}>
                        {formData.SERV_REQUIERE_FACT === true && <div className="w-3 h-3 bg-[#2563eb] rounded-full" />}
                      </div>
                      <span className={`font-bold ${formData.SERV_REQUIERE_FACT === true ? 'text-[#2563eb]' : 'text-gray-600'}`}>Sí, requiere</span>
                      <input type="radio" name="factura" className="hidden" onChange={() => handleChange('SERV_REQUIERE_FACT', true)} />
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${formData.SERV_REQUIERE_FACT === false ? 'border-[#2563eb]' : 'border-gray-300 group-hover:border-[#2563eb]/50'}`}>
                        {formData.SERV_REQUIERE_FACT === false && <div className="w-3 h-3 bg-[#2563eb] rounded-full" />}
                      </div>
                      <span className={`font-bold ${formData.SERV_REQUIERE_FACT === false ? 'text-[#2563eb]' : 'text-gray-600'}`}>No requiere</span>
                      <input type="radio" name="factura" className="hidden" onChange={() => handleChange('SERV_REQUIERE_FACT', false)} />
                    </label>
                  </div>
                  {formData.SERV_REQUIERE_FACT === null && <p className="text-red-500 text-xs mt-2 italic">* Selección obligatoria</p>}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[#001C38] font-black uppercase tracking-wider text-sm">
                      <Users size={18} className="text-[#2563eb]" /> Asignar Técnico <span className="text-gray-400 font-normal text-xs">(Opcional)</span>
                    </div>
                    {formData.SERV_CED_REC && (
                      <button type="button" onClick={() => handleChange('SERV_CED_REC', '')} className="text-red-500 text-xs font-bold hover:underline">
                        Quitar selección
                      </button>
                    )}
                  </div>
                  <select
                    className="w-full px-5 py-4 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#2563eb]/20 transition-all text-[#001C38] font-medium appearance-none cursor-pointer"
                    value={formData.SERV_CED_REC}
                    onChange={(e) => handleChange('SERV_CED_REC', e.target.value)}
                  >
                    <option value="" disabled className="text-gray-400">-- Seleccione un técnico (Puede ser después) --</option>
                    {tecnicos.length > 0 ? (
                      tecnicos.map(t => (
                        <option key={t.MOV_CED} value={t.MOV_CED}>{t.nombre_completo} (CI: {t.MOV_CED})</option>
                      ))
                    ) : (
                      <option value="" disabled>Cargando técnicos...</option>
                    )}
                  </select>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row gap-4 mt-8">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="w-full sm:w-1/3 py-4 bg-gray-100 text-gray-500 font-black rounded-2xl uppercase tracking-widest hover:bg-gray-200 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-2/3 py-4 bg-[#001C38] text-white font-black rounded-2xl uppercase tracking-widest hover:bg-[#002b5e] transition-all shadow-xl shadow-blue-900/20 flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {loading ? (
                     <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <CheckCircle2 size={20} /> Guardar Servicio
                    </>
                  )}
                </button>
              </div>

            </div>
          </form>
        </div>
      </main>

      {/* Modal de Éxito (NUEVO) */}
      {successModal && (
        <div className="fixed inset-0 z-[120] bg-[#001C38]/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-[3rem] p-10 shadow-2xl text-center flex flex-col items-center gap-6 animate-in zoom-in-95 duration-200 border-2 border-green-100">
            <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-2">
              <CheckCircle2 size={48} className="animate-bounce" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-[#001C38] uppercase tracking-tight">¡Éxito!</h3>
              <p className="text-gray-500 text-sm font-medium mt-2 leading-relaxed">
                El servicio ha sido creado y guardado correctamente.
              </p>
            </div>
            <button 
              onClick={() => router.push('/reportes')}
              className="w-full mt-4 py-4 bg-[#34C759] text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-green-600 transition-colors shadow-lg shadow-green-200"
            >
              Aceptar
            </button>
          </div>
        </div>
      )}

      {/* Modal de Errores de Validación */}
      {errorModal.show && (
        <div className="fixed inset-0 z-[120] bg-[#001C38]/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-[3rem] p-8 shadow-2xl text-center flex flex-col items-center gap-4 animate-in zoom-in-95 duration-200 border-2 border-red-100">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-1">
              <AlertTriangle size={32} />
            </div>
            <div>
              <h3 className="text-xl font-black text-[#001C38] uppercase tracking-tight">Falta Información</h3>
              <p className="text-gray-500 text-sm font-medium mt-2 leading-relaxed">
                {errorModal.message}
              </p>
            </div>
            <button 
              onClick={() => setErrorModal({ show: false, message: "" })}
              className="w-full mt-4 py-4 bg-red-50 text-red-600 border border-red-100 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-100 transition-colors"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      {/* Modal de Confirmación de Cancelación */}
      {showCancelModal && (
        <div className="fixed inset-0 z-[110] bg-[#001C38]/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-[3rem] p-10 shadow-2xl text-center flex flex-col items-center gap-6 animate-in zoom-in-95 duration-200">
            <div className="w-20 h-20 bg-yellow-50 text-yellow-500 rounded-full flex items-center justify-center mb-2">
              <AlertCircle size={40} />
            </div>
            <div>
              <h3 className="text-xl font-black text-[#001C38] uppercase tracking-tight">¿Descartar cambios?</h3>
              <p className="text-gray-500 text-sm font-medium mt-2">
                Se perderá toda la información que has ingresado.
              </p>
            </div>
            <div className="flex flex-col w-full gap-3">
              <button 
                onClick={() => router.push('/reportes')}
                className="w-full py-4 bg-red-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-700 transition-colors shadow-lg shadow-red-200"
              >
                Sí, salir
              </button>
              <button 
                onClick={() => setShowCancelModal(false)}
                className="w-full py-4 bg-gray-100 text-gray-500 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-200 transition-colors"
              >
                Continuar Editando
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}