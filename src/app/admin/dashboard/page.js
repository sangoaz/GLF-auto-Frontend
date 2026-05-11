"use client"

import { useEffect, useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import AdminSidebar from "../components/AdminSidebar"

export default function DashboardPage() {
  const { ready, logout, authHeaders } = useAuth()
  const [stats, setStats] = useState(null)

  useEffect(() => {
    if (!ready) return

    async function fetchStats() {
      try {
        const [vehicules, pieces, contacts, reprises] = await Promise.all([
          fetch("${process.env.NEXT_PUBLIC_API_URL}/admin/vehicles?limit=1", { headers: authHeaders() }),
          fetch("${process.env.NEXT_PUBLIC_API_URL}/admin/parts?limit=1", { headers: authHeaders() }),
          fetch("${process.env.NEXT_PUBLIC_API_URL}/admin/contact-requests?limit=5", { headers: authHeaders() }),
          fetch("${process.env.NEXT_PUBLIC_API_URL}/admin/trade-in-requests?limit=5", { headers: authHeaders() }),
        ])

        const [vehiculesData, piecesData, contactsData, reprisesData] = await Promise.all([
          vehicules.json(),
          pieces.json(),
          contacts.json(),
          reprises.json(),
        ])

        setStats({
          contacts: contactsData,
          reprises: reprisesData,
          nonLusContacts: contactsData.filter(c => !c.is_read).length,
          nonLusReprises: reprisesData.filter(r => !r.is_read).length,
        })
      } catch {
        // silencieux
      }
    }

    fetchStats()
  }, [ready])

  if (!ready) return null

  return (
    <div className="flex min-h-screen">
      <AdminSidebar onLogout={logout} />

      <main className="flex-1 p-10">
        <h1
          className="text-3xl font-black uppercase tracking-tight mb-8"
          style={{ color: 'var(--color-text)' }}
        >
          Tableau de bord
        </h1>

        {/* Cartes stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Véhicules", href: "/admin/vehicules", icon: "🚗", desc: "Gérer le stock" },
            { label: "Pièces", href: "/admin/pieces", icon: "🔧", desc: "Gérer les pièces" },
            {
              label: "Messages",
              href: "/admin/messages/contact",
              icon: "✉️",
              desc: stats ? `${stats.nonLusContacts} non lu(s)` : "...",
              alert: stats?.nonLusContacts > 0,
            },
            {
              label: "Reprises",
              href: "/admin/messages/reprise",
              icon: "🔄",
              desc: stats ? `${stats.nonLusReprises} non lu(s)` : "...",
              alert: stats?.nonLusReprises > 0,
            },
          ].map((card) => (
            <a
              key={card.label}
              href={card.href}
              className="p-6 block hover:opacity-90 transition-opacity"
              style={{
                backgroundColor: 'var(--color-surface)',
                border: card.alert ? '1px solid var(--color-accent)' : '1px solid var(--color-border)',
              }}
            >
              <div className="text-3xl mb-3">{card.icon}</div>
              <p
                className="font-black uppercase tracking-wider"
                style={{ color: 'var(--color-text)' }}
              >
                {card.label}
              </p>
              <p
                className="text-sm mt-1"
                style={{ color: card.alert ? 'var(--color-accent)' : 'var(--color-text-muted)' }}
              >
                {card.desc}
              </p>
            </a>
          ))}
        </div>

        {/* Derniers messages */}
        {stats && stats.contacts.length > 0 && (
          <div className="mb-10">
            <h2
              className="text-sm uppercase tracking-widest font-black mb-4"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Derniers messages de contact
            </h2>
            <div className="flex flex-col gap-3">
              {stats.contacts.map((contact) => (
                <div
                  key={contact.id}
                  className="flex items-center justify-between px-5 py-4"
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderLeft: contact.is_read ? '3px solid var(--color-border)' : '3px solid var(--color-accent)',
                  }}
                >
                  <div>
                    <p className="font-bold text-sm" style={{ color: 'var(--color-text)' }}>
                      {contact.name}
                      {!contact.is_read && (
                        <span
                          className="ml-2 text-xs px-2 py-0.5 font-black uppercase"
                          style={{ backgroundColor: 'var(--color-accent)', color: '#111' }}
                        >
                          Nouveau
                        </span>
                      )}
                    </p>
                    <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>
                      {contact.subject}
                    </p>
                  </div>
                  <a
                    href="/admin/messages/contact"
                    className="text-xs uppercase tracking-wider font-bold hover:opacity-70"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    Voir →
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Dernières reprises */}
        {stats && stats.reprises.length > 0 && (
          <div>
            <h2
              className="text-sm uppercase tracking-widest font-black mb-4"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Dernières demandes de reprise
            </h2>
            <div className="flex flex-col gap-3">
              {stats.reprises.map((reprise) => (
                <div
                  key={reprise.id}
                  className="flex items-center justify-between px-5 py-4"
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderLeft: reprise.is_read ? '3px solid var(--color-border)' : '3px solid var(--color-accent)',
                  }}
                >
                  <div>
                    <p className="font-bold text-sm" style={{ color: 'var(--color-text)' }}>
                      {reprise.name}
                      {!reprise.is_read && (
                        <span
                          className="ml-2 text-xs px-2 py-0.5 font-black uppercase"
                          style={{ backgroundColor: 'var(--color-accent)', color: '#111' }}
                        >
                          Nouveau
                        </span>
                      )}
                    </p>
                    <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>
                      {reprise.brand} {reprise.model} — {reprise.year}
                    </p>
                  </div>
                  <a
                    href="/admin/messages/reprise"
                    className="text-xs uppercase tracking-wider font-bold hover:opacity-70"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    Voir →
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}