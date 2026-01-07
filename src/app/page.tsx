// src/app/page.tsx
'use client';

import { 
  Wrench, Truck, ShieldCheck, Zap, Tv, Settings, Wind, Star
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

// 1. Importaciones de Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow } from 'swiper/modules';

// Importar estilos base de Swiper
import 'swiper/css';
import 'swiper/css/effect-coverflow';

const brandLogos = [
  { name: 'SAMSUNG', iconUrl: 'https://cdn.simpleicons.org/samsung/1428A0' },
  { name: 'LG', iconUrl: 'https://cdn.simpleicons.org/lg/A50034' },
  { name: 'SONY', iconUrl: 'https://cdn.simpleicons.org/sony/000000' },
  { name: 'PANASONIC', iconUrl: 'https://cdn.simpleicons.org/panasonic/0F58A8' },
  { name: 'TCL', iconUrl: 'https://www.tcltech.com/brand-tcl.png' },
  { name: 'DAEWOO', iconUrl: 'https://cdn.worldvectorlogo.com/logos/daewoo-logo-1.svg' },
  // Logo de Philips actualizado con tu URL
  { name: 'PHILIPS', iconUrl: 'https://cdn.worldvectorlogo.com/logos/philips.svg' },
  { name: 'RIVIERA', iconUrl: 'https://images.seeklogo.com/logo-png/16/1/riviera-logo-png_seeklogo-169523.png' },
  { name: 'RCA', iconUrl: 'https://cdn.worldvectorlogo.com/logos/rca-3.svg' },
  { name: 'GLOBAL', iconUrl: 'https://cdn.worldvectorlogo.com/logos/global.svg' }
];

const mainServices = [
  {
    title: "Revision de hogar",
    icon: <Wind className="text-[#1e40af]" size={30} />,
    items: ["Lavadoras y Secadoras", "Refrigeradoras", "Cocinas de Inducción", "Mantenimiento Preventivo"]
  },
  {
    title: "Revisión de dispositivos de audio y video",
    icon: <Tv className="text-[#1e40af]" size={30} />,
    items: ["Smart TV", "Sistemas de Cine en Casa", "4K / OLED", "Equipos de Sonido"]
  },
  {
    title: "Instalaciones",
    icon: <Settings className="text-[#1e40af]" size={30} />,
    items: ["Instalación de Equipos", "Repuestos Originales", "Configuración", "Soporte Técnico"]
  }
];

const stats = [
  { icon: <Truck size={28} />, title: "A Domicilio", desc: "Ambato y alrededores." },
  { icon: <ShieldCheck size={28} />, title: "Garantía Real", desc: "Respaldo total." },
  { icon: <Zap size={28} />, title: "Servicio Rápido", desc: "Solución en tiempo récord." },
  { icon: <Star size={28} />, title: "Originalidad", desc: "Repuestos 100% garantizados." }
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-grow">
        {/* 1. HERO SECTION */}
        <section className="relative overflow-hidden pt-44 pb-32 bg-[#0f172a] bg-[linear-gradient(135deg,#0f172a_0%,#1e3a8a_50%,#1e40af_100%)]">
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-20" 
            viewBox="0 0 1000 400" 
            preserveAspectRatio="none"
          >
            <path 
              d="M0,400 C200,350 600,100 1000,0" 
              fill="none" 
              stroke="#fde68a" 
              strokeWidth="1" 
            />
          </svg>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                <div className="flex flex-col items-start w-full lg:w-1/2">
                    <div className="mb-6">
                        <h1 className="text-3xl md:text-5xl font-black text-white tracking-[0.15em] uppercase leading-none">ELECTRONICA</h1>
                        <div className="text-6xl md:text-8xl font-bold text-[#fde68a] italic leading-tight -mt-2 ml-2">Mantilla</div>
                        <div className="text-xs md:text-sm font-bold text-white tracking-[0.3em] uppercase opacity-90 ml-3 mt-1 border-l-4 border-[#fde68a] pl-4">Centro de Servicio Autorizado</div>
                    </div>
                    <p className="text-base md:text-lg text-white/80 mb-8 max-w-lg font-light italic leading-relaxed">
                      Especialistas en reparación y mantenimiento con tecnología de vanguardia. Garantizamos la vida útil de sus equipos.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <a href="#servicios" className="bg-[#fde68a] hover:bg-[#fcd34d] text-[#0f172a] px-8 py-3 text-sm font-black uppercase tracking-wider rounded-md transition-all shadow-lg shadow-[#fde68a]/10">Nuestros Servicios</a>
                      <a href="#" className="bg-transparent hover:bg-white/10 text-white px-8 py-3 text-sm font-bold uppercase tracking-wider rounded-md border-2 border-white/20 transition-all backdrop-blur-sm">Soporte Técnico</a>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 w-full lg:w-[45%]">
                    {stats.map((stat, i) => (
                        <div key={i} className="bg-[#001c38]/90 backdrop-blur-lg border border-white/10 p-5 rounded-2xl group hover:border-[#fde68a]/40 hover:scale-[1.02] transition-all duration-300 shadow-2xl">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#fde68a]/5 text-[#fde68a] mb-3 group-hover:bg-[#fde68a]/10 transition-colors">
                                {stat.icon}
                            </div>
                            <h4 className="text-white font-bold text-sm mb-1 uppercase tracking-tight">{stat.title}</h4>
                            <p className="text-white/60 text-[11px] leading-tight font-medium">{stat.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-b from-transparent to-white z-0 pointer-events-none"></div>
        </section>

        {/* 2. EXPERTOS EN MARCAS LÍDERES */}
        <section className="relative z-20 -mt-24 pb-16 text-center"> 
            <h2 className="text-[10px] font-black text-slate-800 uppercase tracking-[0.5em] mb-4 drop-shadow-sm">Expertos en Marcas Líderes</h2>
            <div className="w-12 h-1 bg-[#fde68a] mx-auto rounded-full mb-10"></div>
            <div className="max-w-5xl mx-auto px-4">
              <Swiper
                modules={[Autoplay, EffectCoverflow]}
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                  rotate: 0,
                  stretch: 0,
                  depth: 80,
                  modifier: 2,
                  slideShadows: false,
                }}
                autoplay={{
                  delay: 2800,
                  disableOnInteraction: false,
                }}
                className="!overflow-visible pt-4 pb-14"
              >
                {brandLogos.map((brand) => (
                  <SwiperSlide key={brand.name} className="!w-48 md:!w-56">
                    {({ isActive }) => (
                      <div className={`
                        relative flex flex-col items-center justify-center transition-all duration-500 bg-white
                        ${isActive 
                          ? 'p-3 rounded-[2rem] border-[5px] border-[#fde68a] shadow-2xl scale-135 z-50' 
                          : 'p-6 rounded-[2rem] border border-slate-100 opacity-40 scale-90 blur-[1px]'
                        }
                      `}>
                        <div className={`
                          flex items-center justify-center mb-3 transition-all duration-500
                          ${isActive ? 'w-36 h-24 grayscale-0' : 'w-24 h-16 grayscale'}
                        `}>
                          <img 
                            src={brand.iconUrl} 
                            alt={brand.name} 
                            className="max-w-full max-h-full object-contain px-2"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        </div>
                        <span className={`
                          font-black tracking-[0.2em] uppercase transition-colors
                          ${isActive ? 'text-[13px] text-slate-900' : 'text-[9px] text-slate-300'}
                        `}>
                          {brand.name}
                        </span>
                      </div>
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
        </section>

        {/* 3. ¿QUÉ PODEMOS REPARAR? */}
        <section id="servicios" className="py-16 bg-[#f8fafc]">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-[#1e40af] mb-2 uppercase tracking-tighter italic">¿QUÉ PODEMOS REALIZAR?</h2>
              <div className="w-20 h-1 bg-[#fde68a] mx-auto rounded-full mb-4"></div>
              <p className="text-slate-500 text-sm max-w-xl mx-auto italic">Técnicos certificados para brindar soluciones de alta calidad.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {mainServices.map((service, index) => (
                <div key={index} className="bg-white p-6 rounded-[2rem] shadow-xl border border-slate-100 hover:border-blue-200 transition-all">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold text-[#1e40af] mb-3">{service.title}</h3>
                  <ul className="space-y-2">
                    {service.items.map((item, i) => (
                      <li key={i} className="flex items-center text-slate-500 text-xs font-medium">
                        <div className="w-1.5 h-1.5 bg-[#fde68a] rounded-full mr-2"></div>{item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}