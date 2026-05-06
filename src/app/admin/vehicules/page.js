"use client"

import { useEffect, useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import AdminSidebar from "../components/AdminSidebar"

const STATUS_LABELS = {
  AVAILABLE: { label: "Disponible", color: "#16a34a" },
  RESERVED: { label: "Réservé", color: "#d97706" },
  SOLD: { label: "Vendu", color: "#dc2626" },
}

export default function AdminVehiculesPage() {
  const { ready, logout, authHeaders } = useAuth()
  const [vehicules, setVehicules] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!ready) return
    fetchVehicules()
  }, [ready])

  async function fetchVehicules() {
    try {
      const res = await fetch("http://127.0.0.1:8000/admin/vehicles?limit=20", {
        headers: authHeaders(),
      })
      const data = await res.json()
      setVehicules(data)
    } catch {
      // silencieux
    } finally {
      setLoading(false)
    }
  }

  async function togglePublish(vehicule) {
    await fetch(`http://127.0.0.1:8000/admin/vehicles/${vehicule.id}`, {
      method: "PATCH",
      headers: authHeaders(),
      body: JSON.stringify({ is_published: !vehicule.is_published }),
    })
    fetchVehicules()
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
            Véhicules
          </h1>
          <a
            href="/admin/vehicules/nouveau"
            className="px-6 py-3 font-black uppercase tracking-wider text-sm hover:opacity-90 transition-opacity"
            style={{ backgroundColor: 'var(--color-accent)', color: '#111111' }}
          >
            + Ajouter
          </a>
        </div>

        {loading && (
          <p style={{ color: 'var(--color-text-muted)' }} className="text-sm">Chargement...</p>
        )}

        {!loading && vehicules.length === 0 && (
          <div
            className="p-12 text-center"
            style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
          >
            <p style={{ color: 'var(--color-text-muted)' }}>Aucun véhicule pour le moment.</p>
          </div>
        )}

        {!loading && vehicules.length > 0 && (
          <div className="flex flex-col gap-3">
            {vehicules.map((vehicule) => {
              const status = STATUS_LABELS[vehicule.status] || { label: vehicule.status, color: 'gray' }
              return (
                <div
                  key={vehicule.id}
                  className="flex items-center justify-between px-6 py-4 gap-4"
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    opacity: vehicule.is_published ? 1 : 0.6,
                  }}
                >
                  {/* Infos */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <p className="font-black uppercase tracking-wide text-sm" style={{ color: 'var(--color-text)' }}>
                        {vehicule.title}
                      </p>
                      <span
                        className="text-xs px-2 py-0.5 font-bold uppercase"
                        style={{ color: status.color, border: `1px solid ${status.color}` }}
                      >
                        {status.label}
                      </span>
                      {!vehicule.is_published && (
                        <span
                          className="text-xs px-2 py-0.5 font-bold uppercase"
                          style={{ color: 'var(--color-text-muted)', border: '1px solid var(--color-border)' }}
                        >
                          Non publié
                        </span>
                      )}
                    </div>
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                      {vehicule.year} · {vehicule.mileage.toLocaleString('fr-FR')} km · {vehicule.price.toLocaleString('fr-FR')} €
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => togglePublish(vehicule)}
                      className="text-xs px-3 py-2 font-bold uppercase tracking-wider hover:opacity-70 transition-opacity"
                      style={{
                        border: '1px solid var(--color-border)',
                        color: 'var(--color-text-muted)',
                      }}
                    >
                      {vehicule.is_published ? "Dépublier" : "Publier"}
                    </button>
                    <a
                      href={`/admin/vehicules/${vehicule.id}`}
                      className="text-xs px-3 py-2 font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: 'var(--color-accent)', color: '#111111' }}
                    >
                      Modifier
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}