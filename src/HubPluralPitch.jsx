import React, { useState } from 'react';
import { MapPin, Building, TrendingUp, Users, ChevronRight, Calculator, DollarSign } from 'lucide-react';

export default function HubPluralSantiagoPitch() {
  // Estados para la calculadora interactiva
  const [metros, setMetros] = useState(500);
  const [ocupacion, setOcupacion] = useState(60);

  // Cálculos dinámicos (Valores referenciales en USD para el pitch)
  const costoImplementacion = metros * 600; // Ej: $600 USD por m2 de habilitación
  const ingresoMensual = metros * 45 * (ocupacion / 100); // Ej: $45 USD el m2 comercializado

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 scroll-smooth">
      {/* Navbar / Header */}
      <header className="bg-white shadow-sm py-4 px-8 flex justify-between items-center sticky top-0 z-50">
        <div className="text-2xl font-bold text-indigo-700 tracking-tight">
          HubPlural <span className="text-gray-500 font-light">| Santiago</span>
        </div>
        <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
          <a href="#mercado" className="hover:text-indigo-600 transition">Mercado</a>
          <a href="#simulador" className="hover:text-indigo-600 transition">Simulador ROI</a>
          <a href="#propuesta" className="hover:text-indigo-600 transition">La Propuesta</a>
          <a href="#equipo" className="hover:text-indigo-600 transition">Dirección</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-indigo-900 text-white py-24 px-8 text-center">
        <h1 className="text-5xl font-extrabold mb-6 animate-fade-in-up">
          El Futuro del Espacio de Trabajo llega a Chile
        </h1>
        <p className="text-xl text-indigo-200 mb-10 max-w-2xl mx-auto">
          Propuesta estratégica de expansión para HubPlural en Santiago. 
          Conectando el ecosistema de innovación brasileño con el hub financiero del Pacífico.
        </p>
        <a href="#simulador" className="bg-white text-indigo-900 px-8 py-3 rounded-full font-bold hover:bg-indigo-50 transition flex items-center mx-auto gap-2 w-fit">
          Ver Proyección Financiera <ChevronRight size={20} />
        </a>
      </section>

      {/* Simulador Interactivo */}
      <section id="simulador" className="py-20 px-8 max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden flex flex-col md:flex-row">
          
          {/* Controles */}
          <div className="p-8 md:w-1/2 bg-gray-50 border-r border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <Calculator className="text-indigo-600" size={28} />
              <h2 className="text-2xl font-bold text-gray-900">Simulador de Expansión</h2>
            </div>
            <p className="text-sm text-gray-600 mb-8">
              Ajusta los parámetros para proyectar el CAPEX inicial y los ingresos estimados de la Fase 1 en Santiago (Valores en USD).
            </p>

            <div className="space-y-6">
              <div>
                <label className="flex justify-between text-sm font-bold text-gray-700 mb-2">
                  <span>Tamaño del Hub (m²)</span>
                  <span className="text-indigo-600">{metros} m²</span>
                </label>
                <input 
                  type="range" min="200" max="1500" step="50"
                  value={metros} onChange={(e) => setMetros(e.target.value)}
                  className="w-full accent-indigo-600"
                />
              </div>

              <div>
                <label className="flex justify-between text-sm font-bold text-gray-700 mb-2">
                  <span>Ocupación Proyectada (%)</span>
                  <span className="text-indigo-600">{ocupacion}%</span>
                </label>
                <input 
                  type="range" min="30" max="100" step="5"
                  value={ocupacion} onChange={(e) => setOcupacion(e.target.value)}
                  className="w-full accent-indigo-600"
                />
              </div>
            </div>
          </div>

          {/* Resultados (Reactivos) */}
          <div className="p-8 md:w-1/2 bg-indigo-900 text-white flex flex-col justify-center">
            <h3 className="text-xl font-medium text-indigo-200 mb-6">Proyección Fase 1</h3>
            
            <div className="mb-6">
              <p className="text-sm text-indigo-300 mb-1">Inversión Estimada (CAPEX)</p>
              <div className="flex items-center text-4xl font-bold">
                <DollarSign size={36} className="text-green-400" />
                {costoImplementacion.toLocaleString('en-US')}
              </div>
              <p className="text-xs text-indigo-400 mt-1">Habilitación prime en Providencia/Las Condes</p>
            </div>

            <div>
              <p className="text-sm text-indigo-300 mb-1">Ingreso Mensual (MRR)</p>
              <div className="flex items-center text-3xl font-bold">
                <DollarSign size={28} className="text-green-400" />
                {ingresoMensual.toLocaleString('en-US')}
              </div>
              <p className="text-xs text-indigo-400 mt-1">Basado en mix de oficinas privadas y coworking</p>
            </div>
          </div>
          
        </div>
      </section>

      {/* Por qué Santiago (Mercado) */}
      <section id="mercado" className="py-16 px-8 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Por qué Santiago de Chile?</h2>
          <p className="text-gray-600">Un ecosistema maduro, estable y hambriento de espacios flexibles.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <TrendingUp className="text-indigo-600 mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">Estabilidad Corporativa</h3>
            <p className="text-gray-600 text-sm">Uno de los mercados corporativos más sólidos de LatAm, ideal para asentar un hub internacional.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <Building className="text-indigo-600 mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">Demanda Híbrida</h3>
            <p className="text-gray-600 text-sm">Aumento sostenido en la demanda de modelos híbridos y oficinas satélites post-2020.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <MapPin className="text-indigo-600 mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">Puente al Pacífico</h3>
            <p className="text-gray-600 text-sm">Ubicación estratégica y puerta de entrada natural para startups brasileñas en internacionalización.</p>
          </div>
        </div>
      </section>

      {/* Perfil del Project Manager */}
      <section id="equipo" className="py-20 px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <Users className="text-indigo-600 mb-6 mx-auto" size={40} />
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Dirección Comercial del Proyecto</h2>
          
          <div className="bg-gray-50 p-8 rounded-2xl shadow-sm border border-gray-100 text-left md:flex gap-8 items-center">
            <div className="md:w-2/3">
              <h3 className="text-2xl font-bold text-gray-900">Felipe Rebolledo</h3>
              <p className="text-indigo-600 font-medium mb-4">Ingeniero Comercial & Desarrollador Full-Stack</p>
              <p className="text-gray-700 text-sm leading-relaxed mb-6">
                Liderazgo de la expansión integrando visión de negocios y tecnología. Experiencia comprobada en gestión comercial y automatización de procesos mediante análisis de datos (Python) y desarrollo web (React), garantizando una implementación eficiente en el mercado chileno.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs font-bold">Business Strategy</span>
                <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs font-bold">Data Analytics</span>
                <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs font-bold">React / Tech</span>
              </div>
            </div>
            
            <div className="hidden md:flex md:w-1/3 justify-center items-center">
              <div className="w-32 h-32 rounded-full border-4 border-indigo-100 bg-gray-200 flex items-center justify-center text-gray-400 font-bold">
                [ FOTO ]
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}