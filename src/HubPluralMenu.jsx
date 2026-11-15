const hubLinks = ['Personal Business', 'Grupos Pequeños', 'Grupos Grandes'];

const moreLinks = [
  'CAJA POSTAL',
  'ESTACIÓN FIJA',
  'OFICINA FLEXIBLE',
  'SALAS DE REUNIÓN',
  'MEMBRESÍA',
  'COWORKING PLURAL',
  'EVENTOS',
];

const mainLinks = ['HOME', 'SOBRE', 'BLOG', 'LOCALIZACIÓN', 'CONTACTO'];

const cities = [
  {
    title: 'SANTIAGO',
    places: ['PROVIDENCIA', 'LAS CONDES', 'CIUDAD EMPRESARIAL', 'ÑUÑOA', 'SANTIAGO CENTRO'],
  },
  {
    title: 'VALPARAÍSO',
    places: ['CERRO ALEGRE'],
  },
];

function DividerLink({ children, yellow = false }) {
  return (
    <a
      href={`#${children.toLowerCase().replace(/\s+/g, '-')}`}
      className={`block border-b border-gray-800 pb-2 mb-4 text-sm sm:text-base font-bold uppercase tracking-wide transition ${
        yellow ? 'text-[#FFB800] hover:text-yellow-300' : 'text-white hover:text-gray-300'
      }`}
    >
      {children}
    </a>
  );
}

export default function HubPluralMenu() {
  return (
    <section className="min-h-screen w-full bg-black text-white">
      <div className="grid min-h-screen w-full grid-cols-1 md:grid-cols-2">
        <div className="px-6 py-12 sm:px-12 md:border-r md:border-gray-800 md:px-16 md:py-16">
          <h2 className="mb-8 text-3xl font-bold text-[#FFB800] sm:text-4xl">quero um HUB para</h2>
          <nav>
            {hubLinks.map((item) => (
              <DividerLink key={item}>{item}</DividerLink>
            ))}
          </nav>

          <h2 className="mb-8 mt-12 text-3xl font-bold text-[#FFB800] sm:text-4xl">y mucho más...</h2>
          <nav>
            {moreLinks.map((item) => (
              <DividerLink key={item}>{item}</DividerLink>
            ))}
          </nav>
        </div>

        <div className="px-6 py-12 sm:px-12 md:px-16 md:py-16">
          <img src="/hubplural-logo.png" alt="hub—PLURAL" className="mb-12 h-10 w-auto invert sm:h-12" />

          <nav className="mb-14">
            {mainLinks.map((item) => (
              <DividerLink key={item}>{item}</DividerLink>
            ))}
          </nav>

          <h2 className="mb-8 text-3xl font-bold text-[#FFB800] sm:text-4xl">Cada Rincón</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {cities.map((city) => (
              <div key={city.title}>
                <p className="mb-4 text-sm font-bold uppercase tracking-wide text-white">{city.title}</p>
                <ul className="space-y-3">
                  {city.places.map((place) => (
                    <li key={place}>
                      <a
                        href={`#${place.toLowerCase().replace(/\s+/g, '-')}`}
                        className="text-sm font-bold uppercase tracking-wide text-[#FFB800] transition hover:text-yellow-300"
                      >
                        {place}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
