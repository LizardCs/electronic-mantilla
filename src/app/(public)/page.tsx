// src/app/(public)/page.tsx
import { 
  Smartphone, 
  Laptop, 
  Tv, 
  Tablet, 
  CheckCircle, 
  Wrench,
  Shield,
  Zap,
  Clock,
  Users,
  Award
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Servicio Técnico
              <span className="text-blue-600 block">Especializado</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Reparación y mantenimiento profesional de todos tus dispositivos electrónicos. 
              Más de 10 años de experiencia garantizando soluciones confiables y duraderas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#contact" className="btn-primary text-lg px-8 py-4">
                Solicitar Servicio
              </a>
              <a href="#services" className="btn-secondary text-lg px-8 py-4">
                Ver Servicios
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nuestros Servicios
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Reparamos todo tipo de dispositivos electrónicos con técnicos especializados 
              y repuestos de calidad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Por qué elegirnos */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              ¿Por Qué Elegirnos?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Contáctanos
            </h2>
            <p className="text-xl text-gray-600">
              ¿Necesitas ayuda con tu dispositivo? Estamos aquí para ayudarte.
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Información de Contacto
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Smartphone className="text-blue-600" size={20} />
                    <span className="text-gray-700">+57 123 456 7890</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Award className="text-blue-600" size={20} />
                    <span className="text-gray-700">servicio@electronicamantilla.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="text-blue-600" size={20} />
                    <span className="text-gray-700">Lun-Vie: 8:00-18:00 / Sáb: 9:00-14:00</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Solicitar Servicio
                </h3>
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Tu nombre"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="email"
                    placeholder="Tu correo electrónico"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <textarea
                    placeholder="Describe el problema de tu dispositivo..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button type="submit" className="btn-primary w-full">
                    Enviar Solicitud
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const services = [
  {
    icon: <Smartphone className="text-blue-600" size={32} />,
    title: 'Smartphones',
    description: 'Reparación de pantallas, baterías, cámaras y problemas de software.'
  },
  {
    icon: <Laptop className="text-blue-600" size={32} />,
    title: 'Laptops & Computadoras',
    description: 'Mantenimiento, upgrades, reparación de hardware y eliminación de virus.'
  },
  {
    icon: <Tv className="text-blue-600" size={32} />,
    title: 'Televisores',
    description: 'Reparación de pantallas, fuentes de poder y problemas de imagen/sonido.'
  },
  {
    icon: <Tablet className="text-blue-600" size={32} />,
    title: 'Tablets',
    description: 'Reparación integral de tablets de todas las marcas y modelos.'
  }
];

const features = [
  {
    icon: <Wrench className="text-green-600" size={32} />,
    title: 'Técnicos Certificados',
    description: 'Personal especializado con certificaciones internacionales.'
  },
  {
    icon: <Shield className="text-green-600" size={32} />,
    title: 'Garantía en Reparaciones',
    description: 'Todas nuestras reparaciones incluyen garantía por escrito.'
  },
  {
    icon: <Clock className="text-green-600" size={32} />,
    title: 'Servicio Rápido',
    description: 'Tiempos de reparación optimizados sin comprometer la calidad.'
  },
  {
    icon: <Zap className="text-green-600" size={32} />,
    title: 'Repuestos Originales',
    description: 'Utilizamos repuestos de calidad garantizada y originales.'
  }
];
