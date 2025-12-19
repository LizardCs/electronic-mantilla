'use client';

import { 
  Wrench, Truck, ShieldCheck, Zap, Tv, Settings, Wind, Star
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const brandLogos = [
  { name: 'SAMSUNG', iconUrl: 'https://cdn.simpleicons.org/samsung/1428A0' },
  { name: 'LG', iconUrl: 'https://cdn.simpleicons.org/lg/A50034' },
  { name: 'SONY', iconUrl: 'https://cdn.simpleicons.org/sony/000000' },
  { name: 'PANASONIC', iconUrl: 'https://cdn.simpleicons.org/panasonic/0F58A8' },
  { name: 'TCL', iconUrl: 'https://cdn.simpleicons.org/tcl/E41E26' },
  { name: 'DAEWOO', iconUrl: 'https://cdn.simpleicons.org/daewoo/0033A0' },
  { name: 'PHILIPS', iconUrl: 'https://cdn.simpleicons.org/philips/0F5CA8' }
];

const mainServices = [
  {
    title: "Línea Blanca",
    icon: <Wind className="text-[#0047ab]" size={30} />,
    items: ["Lavadoras y Secadoras", "Refrigeradoras", "Cocinas de Inducción", "Mantenimiento Preventivo"]
  },
  {
    title: "Audio y Video",
    icon: <Tv className="text-[#0047ab]" size={30} />,
    items: ["Q-LEDS / Smart TV", "Sistemas de Cine en Casa", "Televisores 4K / OLED", "Equipos de Sonido"]
  },
  {
    title: "Instalaciones",
    icon: <Settings className="text-[#0047ab]" size={30} />,
    items: ["Instalación de Equipos", "Repuestos Originales", "Configuración de Software", "Soporte Técnico"]
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
        {/* 1. HERO SECTION CON ESTADÍSTICAS AL LADO DERECHO */}
        <section className="relative overflow-hidden pt-36 pb-20 bg-[#00122e] bg-[linear-gradient(135deg,#00122e_0%,#0047ab_100%)]">
          {/* Fondo Dinámico con líneas diagonales (estilo image_9c3014.jpg) */}
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40" 
            viewBox="0 0 1000 400" 
            preserveAspectRatio="none"
          >
            <path d="M0,400 C200,350 600,100 1000,0" fill="none" stroke="#ffcc00" strokeWidth="1" />
            <path d="M0,420 C250,370 650,150 1050,-20" fill="none" stroke="white" strokeWidth="6" className="opacity-5" />
          </svg>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                
                {/* Lado Izquierdo: Títulos y Texto */}
                <div className="flex flex-col items-start w-full lg:w-1/2">
                    <div className="mb-6">
                        <h1 className="text-3xl md:text-5xl font-black text-white tracking-[0.15em] uppercase leading-none">ELECTRONICA</h1>
                        <div className="text-6xl md:text-8xl font-bold text-[#ffcc00] italic leading-tight -mt-2 ml-2">Mantilla</div>
                        <div className="text-xs md:text-sm font-bold text-white tracking-[0.3em] uppercase opacity-90 ml-3 mt-1 border-l-4 border-[#ffcc00] pl-4">Centro de Servicio Autorizado</div>
                    </div>

                    <p className="text-base md:text-lg text-white/80 mb-8 max-w-lg font-light italic">
                      Especialistas en reparación y mantenimiento con tecnología de vanguardia. Garantizamos la vida útil de sus equipos.
                    </p>

                    <div className="flex flex-wrap gap-4">
                      <a href="#servicios" className="bg-[#ffcc00] hover:bg-[#e6b800] text-[#00122e] px-8 py-3 text-sm font-black uppercase tracking-wider rounded-md transition-all shadow-lg shadow-[#ffcc00]/20">Nuestros Servicios</a>
                      <a href="https://wa.me/tu-numero" className="bg-transparent hover:bg-white/10 text-white px-8 py-3 text-sm font-bold uppercase tracking-wider rounded-md border-2 border-white/30 transition-all backdrop-blur-sm">Soporte Técnico</a>
                    </div>
                </div>

                {/* Lado Derecho: Bloque de Estadísticas (A domicilio, Garantía, etc.) */}
                <div className="grid grid-cols-2 gap-4 w-full lg:w-[45%]">
                    {stats.map((stat, i) => (
                        <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-2xl group hover:bg-[#ffcc00]/10 transition-all duration-300">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#ffcc00]/10 text-[#ffcc00] mb-3 group-hover:scale-110 transition-transform">
                                {stat.icon}
                            </div>
                            <h4 className="text-white font-bold text-sm mb-1 uppercase tracking-tight">{stat.title}</h4>
                            <p className="text-white/60 text-[11px] leading-tight font-medium">{stat.desc}</p>
                        </div>
                    ))}
                </div>

            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-b from-transparent via-white/40 to-white z-0 pointer-events-none"></div>
        </section>

        {/* 2. EXPERTOS EN MARCAS LÍDERES */}
        <section className="pt-10 pb-12 bg-white relative z-10">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-xs font-black text-[#0047ab] uppercase tracking-[0.4em] mb-4">Expertos en Marcas Líderes</h2>
            <div className="w-16 h-1 bg-[#ffcc00] mx-auto rounded-full mb-10"></div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
              {brandLogos.map((brand) => (
                <div key={brand.name} className="flex flex-col items-center justify-center p-4 rounded-2xl border-2 border-[#ffcc00] bg-white shadow-sm shadow-[#ffcc00]/10 hover:shadow-lg transition-all duration-300 group">
                  <div className="w-12 h-12 flex items-center justify-center mb-3 grayscale group-hover:grayscale-0 transition-all">
                    <img src={brand.iconUrl} alt={brand.name} className="max-w-full max-h-full object-contain" />
                  </div>
                  <span className="text-[10px] font-black text-[#00122e] tracking-widest uppercase">{brand.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. ¿QUÉ PODEMOS REPARAR? */}
        <section id="servicios" className="py-16 bg-[#f8fafc]">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-[#00122e] mb-2 uppercase tracking-tighter">¿QUÉ PODEMOS REPARAR?</h2>
              <div className="w-20 h-1 bg-[#ffcc00] mx-auto rounded-full mb-4"></div>
              <p className="text-gray-500 text-sm max-w-xl mx-auto italic">Técnicos certificados para cada categoría de línea blanca y electrónica.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {mainServices.map((service, index) => (
                <div key={index} className="bg-white p-6 rounded-[2rem] shadow-xl border border-gray-100 hover:border-[#0047ab]/30 transition-all">
                  <div className="w-12 h-12 bg-[#0047ab]/10 rounded-xl flex items-center justify-center mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold text-[#00122e] mb-3">{service.title}</h3>
                  <ul className="space-y-2">
                    {service.items.map((item, i) => (
                      <li key={i} className="flex items-center text-gray-600 text-xs font-medium">
                        <div className="w-1.5 h-1.5 bg-[#ffcc00] rounded-full mr-2"></div>{item}
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