"use client"

import { useEffect, useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import AdminSidebar from "../components/AdminSidebar"

export default function AdminServicesPage() {
  const { ready, logout, authHeaders } = useAuth()
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!ready) return
    fetchServices()
  }, [ready])

  async function fetchServices() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/services?limit=20`, {
        headers: authHeaders(),
      })
      const data = await res.json()
      setServices(data)
    } finally {
      setLoading(false)
    }
  }

  async function toggleActive(service) {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/services/${service.id}`, {
      method: "PATCH",
      headers: authHeaders(),
      body: JSON.stringify({ is_active: !service.is_active }),
    })
    fetchServices()
  }

  async function handleDelete(service) {
    if (!confirm(`Supprimer le service "${service.title}" ?`)) return
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/services/${service.id}`, {
      method: "DELETE",
      headers: authHeaders(),
    })
    fetchServices()
  }

  if (!ready) return null

  return (
    <div className="flex min-h-screen">
      <AdminSidebar onLogout={logout} />

      <main className="flex-1 p-10">
        <div className="flex items-center justify-between mb-8">
          <h1
            className="text-3xl font-black uppercase tracking-tight"
            style={{ color: 'var(--color-text)' }}
          >
            Services
          </h1>
          <a
            href="/admin/services/nouveau"
            className="px-6 py-3 font-black uppercase tracking-wider text-sm hover:opacity-90 transition-opacity"
            style={{ backgroundColor: 'var(--color-accent)', color: '#111111' }}
          >
            + Ajouter
          </a>
        </div>

        {loading && (
          <p style={{ color: 'var(--color-text-muted)' }} className="text-sm">Chargement...</p>
        )}

        {!loading && services.length === 0 && (
          <div
            className="p-12 text-center"
            style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
          >
            <p style={{ color: 'var(--color-text-muted)' }}>Aucun service pour le moment.</p>
          </div>
        )}

        {!loading && services.length > 0 && (
          <div className="flex flex-col gap-3">
            {services.map((service) => (
              <div
                key={service.id}
                className="flex items-center justify-between px-6 py-4 gap-4"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  opacity: service.is_active ? 1 : 0.6,
                }}
              >
                {/* Infos */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <p className="font-black uppercase tracking-wide text-sm" style={{ color: 'var(--color-text)' }}>
                      {service.title}
                    </p>
                    <span
                      className="text-xs px-2 py-0.5 font-bold uppercase"
                      style={{
                        color: service.is_active ? '#16a34a' : 'var(--color-text-muted)',
                        border: `1px solid ${service.is_active ? '#16a34a' : 'var(--color-border)'}`,
                      }}
                    >
                      {service.is_active ? "Actif" : "Inactif"}
                    </span>
                  </div>
                  <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                    {service.short_description}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleActive(service)}
                    className="text-xs px-3 py-2 font-bold uppercase tracking-wider hover:opacity-70 transition-opacity"
                    style={{ border: '1px solid var(--color-border)', color: 'var(--color-text-muted)' }}
                  >
                    {service.is_active ? "Désactiver" : "Activer"}
                  </button>
                  <a
                    href={`/admin/services/${service.id}`}
                    className="text-xs px-3 py-2 font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: 'var(--color-accent)', color: '#111111' }}
                  >
                    Modifier
                  </a>
                  <button
                    onClick={() => handleDelete(service)}
                    className="text-xs px-3 py-2 font-bold uppercase tracking-wider hover:opacity-70 transition-opacity"
                    style={{ border: '1px solid #7f1d1d', color: '#fca5a5' }}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}