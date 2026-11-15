import React, { useRef, useState } from 'react';
import {
  Building,
  Calculator,
  ChevronRight,
  Download,
  MapPin,
  TrendingUp,
  Users,
} from 'lucide-react';
import HubPluralMenu from './HubPluralMenu';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const USD_PER_UF = 40;
const BRL_PER_UF = 230;

const RATES = {
  USD: 1,
  UF: 1 / USD_PER_UF,
  BRL: BRL_PER_UF / USD_PER_UF,
};

const CAPEX_PARTS = [
  { key: 'fitout', ratio: 0.6, color: '#111111' },
  { key: 'furniture', ratio: 0.2, color: '#525252' },
  { key: 'tech', ratio: 0.1, color: '#22c55e' },
  { key: 'marketing', ratio: 0.1, color: '#d4d4d4' },
];

const CURRENCIES = ['UF', 'USD', 'BRL'];

const copy = {
  es: {
    nav: {
      market: 'Mercado',
      simulator: 'Simulador ROI',
      zones: 'Zonas',
      team: 'Dirección',
    },
    hero: {
      title: 'El Futuro del Espacio de Trabajo llega a Chile',
      subtitle:
        'Propuesta estratégica de expansión para HubPlural en Santiago. Conectando el ecosistema de innovación brasileño con el hub financiero del Pacífico.',
      cta: 'Ver Proyección Financiera',
    },
    sim: {
      title: 'Simulador de Expansión',
      intro:
        'Ajusta el tamaño, la ocupación y la moneda para proyectar el CAPEX inicial y los ingresos de la Fase 1 en Santiago.',
      rateNote: 'Referencia: 1 UF ≈ 40 USD ≈ 230 BRL.',
      currency: 'Moneda',
      size: 'Tamaño del Hub (m²)',
      occupancy: 'Ocupación Proyectada (%)',
      phase: 'Proyección Fase 1',
      capex: 'Inversión Estimada (CAPEX)',
      capexNote: 'Habilitación prime en Providencia / Las Condes',
      mrr: 'Ingreso Mensual (MRR)',
      mrrNote: 'Basado en mix de oficinas privadas y coworking',
      breakdown: 'Composición del CAPEX',
      splits: {
        fitout: 'Habilitación',
        furniture: 'Mobiliario',
        tech: 'Tecnología',
        marketing: 'Marketing / Legal',
      },
      breakEvenLabel: 'Punto de equilibrio',
      months: 'meses',
      breakEvenNote:
        'CAPEX inicial dividido por el MRR proyectado al 70% de ocupación. No depende del porcentaje del control.',
      pdf: 'Descargar proyección PDF',
      pdfBusy: 'Generando PDF…',
    },
    market: {
      title: '¿Por qué Santiago de Chile?',
      subtitle: 'Un ecosistema maduro, estable y hambriento de espacios flexibles.',
      cards: [
        {
          title: 'Estabilidad Corporativa',
          body: 'Uno de los mercados corporativos más sólidos de LatAm, ideal para asentar un hub internacional.',
        },
        {
          title: 'Demanda Híbrida',
          body: 'Aumento sostenido en la demanda de modelos híbridos y oficinas satélites post-2020.',
        },
        {
          title: 'Puente al Pacífico',
          body: 'Ubicación estratégica y puerta de entrada natural para startups brasileñas en internacionalización.',
        },
      ],
    },
    zones: {
      title: 'Zonas estratégicas',
      subtitle: 'Tres polos para anclar la Fase 1 en Santiago.',
      cards: [
        {
          title: 'Providencia',
          body: 'Conectividad y ecosistema startup.',
        },
        {
          title: 'El Golf / Las Condes',
          body: 'Hub corporativo y financiero (Sanhattan).',
        },
        {
          title: 'Ciudad Empresarial',
          body: 'Espacios híbridos y corporaciones tecnológicas.',
        },
      ],
    },
    team: {
      title: 'Dirección Comercial del Proyecto',
      role: 'Ingeniero Comercial & Desarrollador Full-Stack',
      bio: 'Liderazgo de la expansión integrando visión de negocios y tecnología. Experiencia comprobada en gestión comercial y automatización de procesos mediante análisis de datos (Python) y desarrollo web (React), garantizando una implementación eficiente en el mercado chileno.',
      tags: ['Business Strategy', 'Data Analytics', 'React / Tech'],
    },
  },
  pt: {
    nav: {
      market: 'Mercado',
      simulator: 'Simulador de ROI',
      zones: 'Zonas',
      team: 'Direção',
    },
    hero: {
      title: 'O futuro do espaço de trabalho chega ao Chile',
      subtitle:
        'Proposta estratégica de expansão da HubPlural em Santiago. Conectando o ecossistema de inovação brasileiro ao hub financeiro do Pacífico.',
      cta: 'Ver projeção financeira',
    },
    sim: {
      title: 'Simulador de expansão',
      intro:
        'Ajuste o tamanho, a ocupação e a moeda para projetar o CAPEX inicial e a receita da Fase 1 em Santiago.',
      rateNote: 'Referência: 1 UF ≈ 40 USD ≈ 230 BRL.',
      currency: 'Moeda',
      size: 'Tamanho do hub (m²)',
      occupancy: 'Ocupação projetada (%)',
      phase: 'Projeção Fase 1',
      capex: 'Investimento estimado (CAPEX)',
      capexNote: 'Implantação prime em Providencia / Las Condes',
      mrr: 'Receita mensal (MRR)',
      mrrNote: 'Com base no mix de escritórios privados e coworking',
      breakdown: 'Composição do CAPEX',
      splits: {
        fitout: 'Implantação',
        furniture: 'Mobiliário',
        tech: 'Tecnologia',
        marketing: 'Marketing / Jurídico',
      },
      breakEvenLabel: 'Ponto de equilíbrio',
      months: 'meses',
      breakEvenNote:
        'CAPEX inicial dividido pelo MRR projetado a 70% de ocupação. Não depende da porcentagem do controle.',
      pdf: 'Baixar projeção PDF',
      pdfBusy: 'Gerando PDF…',
    },
    market: {
      title: 'Por que Santiago do Chile?',
      subtitle: 'Um ecossistema maduro, estável e com forte demanda por espaços flexíveis.',
      cards: [
        {
          title: 'Estabilidade corporativa',
          body: 'Um dos mercados corporativos mais sólidos da América Latina, ideal para estabelecer um hub internacional.',
        },
        {
          title: 'Demanda híbrida',
          body: 'Crescimento sustentado da demanda por modelos híbridos e escritórios satélite após 2020.',
        },
        {
          title: 'Ponte para o Pacífico',
          body: 'Localização estratégica e porta de entrada natural para startups brasileiras em internacionalização.',
        },
      ],
    },
    zones: {
      title: 'Zonas estratégicas',
      subtitle: 'Três polos para ancorar a Fase 1 em Santiago.',
      cards: [
        {
          title: 'Providencia',
          body: 'Conectividade e ecossistema de startups.',
        },
        {
          title: 'El Golf / Las Condes',
          body: 'Hub corporativo e financeiro (Sanhattan).',
        },
        {
          title: 'Ciudad Empresarial',
          body: 'Espaços híbridos e corporações de tecnologia.',
        },
      ],
    },
    team: {
      title: 'Direção comercial do projeto',
      role: 'Engenheiro comercial e desenvolvedor full-stack',
      bio: 'Liderança da expansão integrando visão de negócios e tecnologia. Experiência comprovada em gestão comercial e automação de processos por meio de análise de dados (Python) e desenvolvimento web (React), garantindo uma implantação eficiente no mercado chileno.',
      tags: ['Estratégia de negócios', 'Análise de dados', 'React / Tech'],
    },
  },
};

const MARKET_ICONS = [TrendingUp, Building, MapPin];

function formatMoney(amountUsd, currency) {
  const value = amountUsd * RATES[currency];
  if (currency === 'USD') {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    });
  }
  if (currency === 'BRL') {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    });
  }
  return `${value.toLocaleString('es-CL', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} UF`;
}

function neutralizeModernColors(css) {
  return css
    .replace(/oklch\((?:[^()]|\([^()]*\))*\)/g, '#111111')
    .replace(/oklab\((?:[^()]|\([^()]*\))*\)/g, '#111111')
    .replace(/color-mix\((?:[^()]|\([^()]*\))*\)/g, '#111111');
}

function paintPdfClone(doc) {
  doc.querySelectorAll('style').forEach((style) => {
    style.textContent = neutralizeModernColors(style.textContent);
  });

  const root = doc.querySelector('[data-pdf-root]');
  if (!root) return;

  const paint = (el) => {
    const bg = el.getAttribute('data-pdf-bg');
    const color = el.getAttribute('data-pdf-color');
    const border = el.getAttribute('data-pdf-border');
    if (bg) el.style.backgroundColor = bg;
    if (color) el.style.color = color;
    if (border) el.style.borderColor = border;
    el.style.boxShadow = 'none';
  };

  paint(root);
  root.querySelectorAll('*').forEach(paint);
}

export default function HubPluralSantiagoPitch() {
  const [language, setLanguage] = useState('es');
  const [metros, setMetros] = useState(500);
  const [ocupacion, setOcupacion] = useState(60);
  const [currency, setCurrency] = useState('USD');
  const [exporting, setExporting] = useState(false);
  const reportRef = useRef(null);

  const t = copy[language];

  const capexUsd = metros * 600;
  const mrrUsd = metros * 45 * (ocupacion / 100);
  const mrrAtSeventyUsd = metros * 45 * 0.7;
  const breakEvenMonths = mrrAtSeventyUsd > 0 ? Math.ceil(capexUsd / mrrAtSeventyUsd) : 0;

  const slices = CAPEX_PARTS.map((part) => ({
    name: t.sim.splits[part.key],
    value: capexUsd * part.ratio * RATES[currency],
    color: part.color,
    share: `${Math.round(part.ratio * 100)}%`,
  }));

  async function downloadPdf() {
    if (!reportRef.current || exporting) return;
    setExporting(true);
    try {
      const html2pdf = (await import('html2pdf.js')).default;
      await html2pdf()
        .set({
          margin: 0.4,
          filename: 'HubPlural-Santiago-proyeccion.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: {
            scale: 2,
            useCORS: true,
            backgroundColor: '#ffffff',
            onclone: paintPdfClone,
          },
          jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
        })
        .from(reportRef.current)
        .save();
    } finally {
      setExporting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f6f6f6] font-sans text-neutral-800 scroll-smooth">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <img src="/hubplural-logo.png" alt="hub—PLURAL" className="h-9 sm:h-11 w-auto" />
              <span className="text-sm font-light tracking-wide text-neutral-400">Santiago</span>
            </div>
            <div className="flex rounded-full border border-neutral-200 overflow-hidden text-xs font-bold">
              {['es', 'pt'].map((code) => (
                <button
                  key={code}
                  type="button"
                  aria-pressed={language === code}
                  onClick={() => setLanguage(code)}
                  className={`px-3 py-1.5 ${language === code ? 'bg-neutral-950 text-white' : 'bg-white text-neutral-600'}`}
                >
                  {code.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          <nav className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium text-neutral-600">
            <a href="#mercado" className="hover:text-neutral-950 transition">{t.nav.market}</a>
            <a href="#simulador" className="hover:text-neutral-950 transition">{t.nav.simulator}</a>
            <a href="#zonas" className="hover:text-neutral-950 transition">{t.nav.zones}</a>
            <a href="#equipo" className="hover:text-neutral-950 transition">{t.nav.team}</a>
          </nav>
        </div>
      </header>

      <section className="bg-neutral-950 text-white py-16 sm:py-24 px-4 sm:px-8 text-center">
        <h1 className="text-3xl sm:text-5xl font-extrabold mb-6 max-w-4xl mx-auto">
          {t.hero.title}
        </h1>
        <p className="text-base sm:text-xl text-neutral-300 mb-10 max-w-2xl mx-auto">
          {t.hero.subtitle}
        </p>
        <a href="#simulador" className="bg-white text-neutral-950 px-8 py-3 rounded-full font-bold hover:bg-neutral-100 transition flex items-center mx-auto gap-2 w-fit">
          {t.hero.cta} <ChevronRight size={20} />
        </a>
      </section>

      <section id="simulador" className="py-16 sm:py-20 px-4 sm:px-8 max-w-5xl mx-auto">
        <div
          ref={reportRef}
          data-pdf-root
          data-pdf-bg="#ffffff"
          className="rounded-2xl overflow-hidden flex flex-col md:flex-row"
          style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb' }}
        >
          <div
            data-pdf-bg="#f9fafb"
            data-pdf-color="#1f2937"
            data-pdf-border="#e5e7eb"
            className="p-6 sm:p-8 md:w-1/2"
            style={{ backgroundColor: '#f9fafb', color: '#1f2937', borderRight: '1px solid #e5e7eb' }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Calculator color="#111111" size={28} />
              <h2 className="text-xl sm:text-2xl font-bold" style={{ color: '#111827' }} data-pdf-color="#111827">
                {t.sim.title}
              </h2>
            </div>
            <p className="text-sm mb-2" style={{ color: '#4b5563' }} data-pdf-color="#4b5563">
              {t.sim.intro}
            </p>
            <p className="text-xs mb-8" style={{ color: '#6b7280' }} data-pdf-color="#6b7280">
              {t.sim.rateNote}
            </p>

            <div className="mb-8">
              <p className="text-sm font-bold mb-2" style={{ color: '#374151' }} data-pdf-color="#374151">
                {t.sim.currency}
              </p>
              <div className="flex flex-wrap gap-2">
                {CURRENCIES.map((code) => {
                  const active = currency === code;
                  return (
                    <button
                      key={code}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setCurrency(code)}
                      data-pdf-bg={active ? '#111111' : '#ffffff'}
                      data-pdf-color={active ? '#ffffff' : '#374151'}
                      data-pdf-border="#e5e5e5"
                      className="px-4 py-1.5 rounded-full text-xs font-bold"
                      style={{
                        backgroundColor: active ? '#111111' : '#ffffff',
                        color: active ? '#ffffff' : '#374151',
                        border: '1px solid #e5e5e5',
                      }}
                    >
                      {code}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="flex justify-between text-sm font-bold mb-2" style={{ color: '#374151' }}>
                  <span>{t.sim.size}</span>
                  <span style={{ color: '#111111' }}>{metros} m²</span>
                </label>
                <input
                  type="range"
                  min="200"
                  max="1500"
                  step="50"
                  value={metros}
                  onChange={(event) => setMetros(Number(event.target.value))}
                  className="w-full"
                  style={{ accentColor: '#111111' }}
                />
              </div>
              <div>
                <label className="flex justify-between text-sm font-bold mb-2" style={{ color: '#374151' }}>
                  <span>{t.sim.occupancy}</span>
                  <span style={{ color: '#111111' }}>{ocupacion}%</span>
                </label>
                <input
                  type="range"
                  min="30"
                  max="100"
                  step="5"
                  value={ocupacion}
                  onChange={(event) => setOcupacion(Number(event.target.value))}
                  className="w-full"
                  style={{ accentColor: '#111111' }}
                />
              </div>
            </div>
          </div>

          <div
            data-pdf-bg="#111111"
            data-pdf-color="#ffffff"
            className="p-6 sm:p-8 md:w-1/2 flex flex-col justify-center"
            style={{ backgroundColor: '#111111', color: '#ffffff' }}
          >
            <h3 className="text-xl font-medium mb-6" style={{ color: '#e5e5e5' }} data-pdf-color="#e5e5e5">
              {t.sim.phase}
            </h3>

            <div className="mb-6">
              <p className="text-sm mb-1" style={{ color: '#d4d4d4' }} data-pdf-color="#d4d4d4">{t.sim.capex}</p>
              <div className="text-3xl sm:text-4xl font-bold" style={{ color: '#4ade80' }} data-pdf-color="#4ade80">
                {formatMoney(capexUsd, currency)}
              </div>
              <p className="text-xs mt-1" style={{ color: '#a3a3a3' }} data-pdf-color="#a3a3a3">{t.sim.capexNote}</p>
            </div>

            <div className="mb-6">
              <p className="text-sm mb-1" style={{ color: '#d4d4d4' }} data-pdf-color="#d4d4d4">{t.sim.mrr}</p>
              <div className="text-2xl sm:text-3xl font-bold" style={{ color: '#4ade80' }} data-pdf-color="#4ade80">
                {formatMoney(mrrUsd, currency)}
              </div>
              <p className="text-xs mt-1" style={{ color: '#a3a3a3' }} data-pdf-color="#a3a3a3">{t.sim.mrrNote}</p>
            </div>

            <div className="mb-6">
              <p className="text-sm mb-2" style={{ color: '#e5e5e5' }} data-pdf-color="#e5e5e5">{t.sim.breakdown}</p>
              <div style={{ width: '100%', height: 220 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={slices}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={48}
                      outerRadius={78}
                      paddingAngle={2}
                      stroke="#111111"
                    >
                      {slices.map((slice) => (
                        <Cell key={slice.name} fill={slice.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value, name) => [formatMoney(Number(value) / RATES[currency], currency), name]}
                    />
                    <Legend wrapperStyle={{ color: '#e5e5e5', fontSize: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <ul className="mt-2 space-y-1 text-xs">
                {slices.map((slice) => (
                  <li key={slice.name} className="flex justify-between gap-3" style={{ color: '#e5e5e5' }} data-pdf-color="#e5e5e5">
                    <span>{slice.name} · {slice.share}</span>
                    <span>{formatMoney(Number(slice.value) / RATES[currency], currency)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              data-pdf-bg="#262626"
              data-pdf-color="#ffffff"
              className="rounded-xl p-4"
              style={{ backgroundColor: '#262626', color: '#ffffff' }}
            >
              <p className="text-sm" style={{ color: '#d4d4d4' }} data-pdf-color="#d4d4d4">{t.sim.breakEvenLabel}</p>
              <p className="text-2xl font-bold mt-1" style={{ color: '#4ade80' }} data-pdf-color="#4ade80">
                {breakEvenMonths} {t.sim.months}
              </p>
              <p className="text-xs mt-2" style={{ color: '#a3a3a3' }} data-pdf-color="#a3a3a3">{t.sim.breakEvenNote}</p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={downloadPdf}
          disabled={exporting}
          className="mt-6 mx-auto flex items-center gap-2 bg-neutral-950 text-white px-6 py-3 rounded-full font-bold hover:bg-neutral-800 transition disabled:opacity-60"
        >
          <Download size={18} />
          {exporting ? t.sim.pdfBusy : t.sim.pdf}
        </button>
      </section>

      <section id="mercado" className="py-16 px-4 sm:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{t.market.title}</h2>
          <p className="text-gray-600">{t.market.subtitle}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {t.market.cards.map((card, index) => {
            const Icon = MARKET_ICONS[index];
            return (
              <div key={card.title} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                <Icon className="text-neutral-950 mb-4" size={32} />
                <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                <p className="text-gray-600 text-sm">{card.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      <div id="zonas" className="scroll-mt-20">
        <HubPluralMenu />
      </div>

      <section id="equipo" className="py-16 sm:py-20 px-4 sm:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <Users className="text-neutral-950 mb-6 mx-auto" size={40} />
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">{t.team.title}</h2>
          <div className="bg-gray-50 p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 text-left md:flex gap-8 items-center">
            <div className="md:w-2/3">
              <h3 className="text-2xl font-bold text-gray-900">Felipe Rebolledo</h3>
              <p className="text-neutral-950 font-medium mb-4">{t.team.role}</p>
              <p className="text-gray-700 text-sm leading-relaxed mb-6">{t.team.bio}</p>
              <div className="flex flex-wrap gap-2">
                {t.team.tags.map((tag) => (
                  <span key={tag} className="bg-neutral-200 text-neutral-900 px-3 py-1 rounded-full text-xs font-bold">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="hidden md:flex md:w-1/3 justify-center items-center">
              <div className="w-32 h-32 rounded-full border-4 border-neutral-200 bg-neutral-100 flex items-center justify-center text-neutral-400 font-bold">
                [ FOTO ]
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
