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
                📍 20 rue des noyers, 26750 Geyssans
              </li>
              <li className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                📞 06 95 31 59 19
              </li>
              <li className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                ✉️ loanfruchon26@outlook.fr
              </li>
              <li className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                <details className="group">
                  <summary className="cursor-pointer list-none hover:opacity-70 transition-opacity">
                    🕐 Horaires
                  </summary>

                  <ul className="mt-3 ml-6 flex flex-col gap-2 text-sm">
                    <li>Lundi : 10h–15h</li>
                    <li>Mardi : 10h–17h</li>
                    <li>Mercredi : 10h–19h</li>
                    <li>Jeudi : 10h–17h</li>
                    <li>Vendredi : Sur rendez-vous</li>
                    <li>Samedi : Sur rendez-vous</li>
                    <li>Dimanche : Fermé</li>
                  </ul>
                </details>
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