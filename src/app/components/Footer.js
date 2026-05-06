export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      style={{
        backgroundColor: 'var(--color-surface)',
        borderTop: '2px solid var(--color-accent)',
      }}
      className="mt-auto"
    >
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Colonne 1 : Identité */}
          <div>
            <p
              className="text-2xl font-black uppercase tracking-widest mb-2"
              style={{ color: 'var(--color-accent)' }}
            >
              GLF Auto
            </p>
            <p
              className="text-xs uppercase tracking-widest mb-4"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Service et Réparation Mécanique
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Spécialiste de la vente de véhicules et pièces d&apos;occasion.
              Expertise mécanique au service de votre budget.
            </p>
          </div>

          {/* Colonne 2 : Navigation */}
          <div>
            <p
              className="text-xs uppercase tracking-widest font-black mb-4"
              style={{ color: 'var(--color-text)' }}
            >
              Navigation
            </p>
            <ul className="flex flex-col gap-3">
              {[
                { label: 'Accueil', href: '/' },
                { label: 'Véhicules', href: '/vehicules' },
                { label: 'Pièces', href: '/pieces' },
                { label: 'Services', href: '/services' },
                { label: 'Reprise', href: '/reprise' },
                { label: 'Contact', href: '/contact' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm hover:opacity-70 transition-opacity"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 : Contact */}
          <div>
            <p
              className="text-xs uppercase tracking-widest font-black mb-4"
              style={{ color: 'var(--color-text)' }}
            >
              Nous trouver
            </p>
            <ul className="flex flex-col gap-3">
              <li className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                📍 Adresse du garage
              </li>
              <li className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                📞 Numéro de téléphone
              </li>
              <li className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                ✉️ Email du garage
              </li>
              <li className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                🕐 Lun–Ven : 8h–18h
              </li>
            </ul>
          </div>

        </div>

        {/* Bas de footer */}
        <div
          className="mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid var(--color-border)' }}
        >
          <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
            © {currentYear} GLF Auto — Tous droits réservés
          </p>
          <a
            href="/contact"
            className="text-xs uppercase tracking-widest font-bold hover:opacity-70 transition-opacity"
            style={{ color: 'var(--color-accent)' }}
          >
            Nous contacter →
          </a>
        </div>

      </div>
    </footer>
  )
}