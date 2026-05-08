"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { useAuth } from "../../../hooks/useAuth"
import AdminSidebar from "../../components/AdminSidebar"

const CONDITION = [
    {value: "NEW", label: "Neuf"},
    {value: "USED_GOOD", label: "Occasion - Bon état"},
    {value: "USED_FAIR", label: "Occasion - Etat correct"},
    {value: "FOR_services", label: "Pour pièces / non fonctionnel"},
]


const STATUSES = [
  { value: "AVAILABLE", label: "Disponible" },
  { value: "RESERVED", label: "Réservé" },
  { value: "SOLD", label: "Vendu" },
]


export default function EditServicePage() {
  const { ready, logout, authHeaders } = useAuth()
  const router = useRouter()
  const params = useParams()
  const id = params.id

  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (!ready) return
    fetchService()
  }, [ready])

  async function fetchService() {
    try {
      const res = await fetch(`http://127.0.0.1:8000/admin/services/${id}`, {
        headers: authHeaders(),
      })
      const data = await res.json()
      setService(data)
    } finally {
      setLoading(false)
    }
  }


  function handleChange(e) {
    setService({ ...service, [e.target.name]: e.target.value })
  }

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setSuccess(false)

    try {
      const res = await fetch(`http://127.0.0.1:8000/admin/services/${id}`, {
        method: "PATCH",
        headers: authHeaders(),
        body: JSON.stringify({
          title: service.title,
          short_description: service.short_description,
          full_description: service.full_description,
          display_order: service.display_order,
        }),
      })
      if (!res.ok) throw new Error()
      setSuccess(true)
      fetchService()
    } catch {
      setError("Une erreur est survenue lors de la sauvegarde.")
    } finally {
      setSaving(false)
    }
  }


  if (!ready || loading) return null

  const inputStyle = {
    backgroundColor: 'var(--color-background)',
    border: '1px solid var(--color-border)',
    color: 'var(--color-text)',
  }
  const labelClass = "text-xs uppercase tracking-widest font-bold"

  return (
    <div className="flex min-h-screen">
      <AdminSidebar onLogout={logout} />

      <main className="flex-1 p-10">
        <div className="flex items-center gap-4 mb-8">
          <a
            href="/admin/services"
            className="text-sm font-bold uppercase tracking-wider hover:opacity-70"
            style={{ color: 'var(--color-accent)' }}
          >
            ← Retour
          </a>
          <h1
            className="text-3xl font-black uppercase tracking-tight"
            style={{ color: 'var(--color-text)' }}
          >
            Modifier le service
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Formulaire */}
          <div className="lg:col-span-2">
            {error && (
              <div className="mb-6 p-4 text-sm font-bold uppercase tracking-wider"
                style={{ backgroundColor: '#450a0a', color: '#fca5a5', border: '1px solid #7f1d1d' }}>
                ✗ {error}
              </div>
            )}
            {success && (
              <div className="mb-6 p-4 text-sm font-bold uppercase tracking-wider"
                style={{ backgroundColor: '#14532d', color: '#86efac', border: '1px solid #166534' }}>
                ✓ Modifications sauvegardées
              </div>
            )}

            <form onSubmit={handleSave} className="flex flex-col gap-6">

              {/* Titre */}
              <div className="flex flex-col gap-2">
                <label className={labelClass} style={{ color: 'var(--color-text-muted)' }}>Titre *</label>
                <input name="title" type="text" required value={service.title} onChange={handleChange}
                  className="px-4 py-3 text-sm outline-none" style={inputStyle} />
              </div>

              {/* Ordre d'affichage */}
              <div className="flex flex-col gap-2">
                <label className={labelClass} style={{ color: 'var(--color-text-muted)' }}>
                    Ordre d'affichage
                </label>
                <input
                    name="display_order"
                    type="number"
                    min="0"
                    value={service.display_order ?? 0}
                    onChange={handleChange}
                    className="px-4 py-3 text-sm outline-none"
                    style={inputStyle}
                />
              </div>

              <div className="grid grid-cols-1 gap-6">
                {/* Résumé du service */}
                <div className="flex flex-col gap-2">
                  <label className={labelClass} style={{ color: 'var(--color-text-muted)' }}>Résumé du service *</label>
                  <input name="short_description" type="text" required value={service.short_description} onChange={handleChange}
                    className="px-4 py-3 text-sm outline-none" style={inputStyle} />
                </div>
              </div>

              {/* Description */}
              <div className="flex flex-col gap-2">
                <label className={labelClass} style={{ color: 'var(--color-text-muted)' }}>Description *</label>
                <textarea name="full_description" required rows={5} value={service.full_description} onChange={handleChange}
                  className="px-4 py-3 text-sm outline-none resize-none" style={inputStyle} />
              </div>

              <button type="submit" disabled={saving}
                className="px-10 py-4 font-black uppercase tracking-wider text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
                style={{ backgroundColor: 'var(--color-accent)', color: '#111111' }}>
                {saving ? "Sauvegarde..." : "Sauvegarder"}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}