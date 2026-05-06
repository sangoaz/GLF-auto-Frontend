export default function Home() {
  return (
    <div>

      {/* Hero Section */}
      <section
        style={{ borderBottom: '1px solid var(--color-border)' }}
        className="min-h-[80vh] flex items-center justify-center text-center px-6"
      >
        <div className="max-w-3xl">
          <p style={{ color: 'var(--color-accent)' }} className="text-sm uppercase tracking-widest font-bold mb-4">
            Service et Réparation Mécanique
          </p>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight mb-6" style={{ color: 'var(--color-text)' }}>
            GLF <span style={{ color: 'var(--color-accent)' }}>Auto</span>
          </h1>
          <p style={{ color: 'var(--color-text-muted)' }} className="text-lg mb-10 max-w-xl mx-auto">
            Spécialiste de la vente de véhicules et pièces d&apos;occasion.
            Expertise mécanique au service de votre budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/vehicules"
              style={{ backgroundColor: 'var(--color-accent)', color: '#111111' }}
              className="px-8 py-3 font-black uppercase tracking-wider text-sm hover:opacity-90 transition-opacity"
            >
              Voir les véhicules
            </a>
            <a
              href="/contact"
              style={{ border: '2px solid var(--color-accent)', color: 'var(--color-accent)' }}
              className="px-8 py-3 font-black uppercase tracking-wider text-sm hover:opacity-90 transition-opacity"
            >
              Nous contacter
            </a>
          </div>
        </div>
      </section>

      {/* Points forts */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-2xl font-black uppercase tracking-widest text-center mb-12" style={{ color: 'var(--color-text)' }}>
          Pourquoi choisir <span style={{ color: 'var(--color-accent)' }}>GLF Auto</span> ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { titre: "Véhicules d'occasion", desc: "Une sélection rigoureuse de véhicules contrôlés et garantis.", icon: "🚗" },
            { titre: "Pièces détachées", desc: "Large stock de pièces d'occasion testées à prix compétitifs.", icon: "🔧" },
            { titre: "Expertise mécanique", desc: "Des techniciens qualifiés pour l'entretien et la réparation.", icon: "⚙️" },
          ].map((item) => (
            <div
              key={item.titre}
              style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
              className="p-8 text-center"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="font-black uppercase tracking-wider mb-3" style={{ color: 'var(--color-accent)' }}>
                {item.titre}
              </h3>
              <p style={{ color: 'var(--color-text-muted)' }} className="text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Appel à l'action */}
      <section style={{ backgroundColor: 'var(--color-surface)', borderTop: '1px solid var(--color-border)' }} className="py-16">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-black uppercase tracking-widest text-xl" style={{ color: 'var(--color-text)' }}>
            Un projet ? Une question ?
          </p>
          <a
            href="/contact"
            style={{ backgroundColor: 'var(--color-accent)', color: '#111111' }}
            className="px-10 py-4 font-black uppercase tracking-wider text-sm hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            Contactez-nous
          </a>
        </div>
      </section>

    </div>
  )
}