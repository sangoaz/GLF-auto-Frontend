async function getServices() {
  try {
    const res = await fetch('http://127.0.0.1:8000/services/', {
      cache: 'no-store',
    })
    if (!res.ok) return []
    return await res.json()
  } catch {
    return []
  }
}

export default async function ServicesPage() {
  const services = await getServices()

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">

      {/* Titre */}
      <div className="mb-12">
        <p style={{ color: 'var(--color-accent)' }} className="text-sm uppercase tracking-widest font-bold mb-2">
          Ce que nous proposons
        </p>
        <h1 className="text-4xl font-black uppercase tracking-tight" style={{ color: 'var(--color-text)' }}>
          Nos Services
        </h1>
      </div>

      {/* Aucun service */}
      {services.length === 0 && (
        <div
          style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
          className="p-12 text-center"
        >
          <p style={{ color: 'var(--color-text-muted)' }} className="text-lg">
            Aucun service disponible pour le moment.
          </p>
        </div>
      )}

      {/* Liste des services */}
      {services.length > 0 && (
        <div className="flex flex-col gap-6">
          {services.map((service, index) => (
            <div
              key={service.id}
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderLeft: '4px solid var(--color-accent)',
              }}
              className="p-8"
            >
              <div className="flex items-start gap-6">
                {/* Numéro */}
                <span
                  className="text-4xl font-black shrink-0"
                  style={{ color: 'var(--color-border)' }}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>

                {/* Contenu */}
                <div className="flex-1">
                  <h2
                    className="text-xl font-black uppercase tracking-wide mb-2"
                    style={{ color: 'var(--color-text)' }}
                  >
                    {service.title}
                  </h2>
                  <p
                    className="text-sm font-bold mb-4"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    {service.short_description}
                  </p>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    {service.full_description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CTA */}
      <div
        className="mt-16 p-10 text-center"
        style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
      >
        <p
          className="text-xl font-black uppercase tracking-widest mb-6"
          style={{ color: 'var(--color-text)' }}
        >
          Besoin d&apos;un de nos services ?
        </p>
        <a
          href="/contact"
          style={{ backgroundColor: 'var(--color-accent)', color: '#111111' }}
          className="inline-block px-10 py-4 font-black uppercase tracking-wider text-sm hover:opacity-90 transition-opacity"
        >
          Prendre contact
        </a>
      </div>

    </div>
  )
}