"use client"

import { usePathname } from "next/navigation"

const navItems = [
  { label: "Tableau de bord", href: "/admin/dashboard", icon: "📊" },
  { label: "Véhicules", href: "/admin/vehicules", icon: "🚗" },
  { label: "Pièces", href: "/admin/pieces", icon: "🔧" },
  { label: "Services", href: "/admin/services", icon: "⚙️" },
  { label: "Messages", href: "/admin/messages/contact", icon: "✉️" },
  { label: "Reprises", href: "/admin/messages/reprise", icon: "🔄" },
]

export default function AdminSidebar({ onLogout }) {
  const pathname = usePathname()

  return (
    <aside
      className="w-64 min-h-screen flex flex-col"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderRight: '1px solid var(--color-border)',
      }}
    >
      {/* Logo */}
      <div
        className="px-6 py-6"
        style={{ borderBottom: '2px solid var(--color-accent)' }}
      >
        <p
          className="text-xl font-black uppercase tracking-widest"
          style={{ color: 'var(--color-accent)' }}
        >
          GLF Auto
        </p>
        <p
          className="text-xs uppercase tracking-widest mt-1"
          style={{ color: 'var(--color-text-muted)' }}
        >
          Administration
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href)
          return (
            <a
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 text-sm font-bold uppercase tracking-wider transition-colors"
              style={{
                backgroundColor: isActive ? 'var(--color-accent)' : 'transparent',
                color: isActive ? '#111111' : 'var(--color-text-muted)',
              }}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </a>
          )
        })}
      </nav>

      {/* Déconnexion */}
      <div
        className="px-4 py-6"
        style={{ borderTop: '1px solid var(--color-border)' }}
      >
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold uppercase tracking-wider hover:opacity-70 transition-opacity"
          style={{ color: 'var(--color-text-muted)' }}
        >
          <span>🚪</span>
          <span>Déconnexion</span>
        </button>
      </div>
    </aside>
  )
}