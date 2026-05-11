"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../../../hooks/useAuth"
import AdminSidebar from "../../components/AdminSidebar"


export default function NouveauServicePage() {
  const { ready, logout, authHeaders } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [formData, setFormData] = useState({
    title: "",
    short_description: "",
    full_description: "",
    display_order: "",
  })

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("${process.env.NEXT_PUBLIC_API_URL}/admin/services", {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({
            title: formData.title,
            short_description: formData.short_description,
            full_description: formData.full_description,
})
      })

      if (!res.ok) throw new Error()
      const data = await res.json()
      router.push(`/admin/services/${data.id}`)
    } catch {
      setError("Une erreur est survenue. Vérifiez les champs et réessayez.")
    } finally {
      setLoading(false)
    }
  }

  if (!ready) return null

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
            Nouveau Service
          </h1>
        </div>

        {error && (
          <div
            className="mb-6 p-4 text-sm font-bold uppercase tracking-wider"
            style={{ backgroundColor: '#450a0a', color: '#fca5a5', border: '1px solid #7f1d1d' }}
          >
            ✗ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="max-w-3xl flex flex-col gap-6">

          {/* Titre */}
          <div className="flex flex-col gap-2">
            <label className={labelClass} style={{ color: 'var(--color-text-muted)' }}>Service Proposé *</label>
            <input
              name="title" type="text" required
              value={formData.title} onChange={handleChange}
              placeholder="Révision"
              className="px-4 py-3 text-sm outline-none" style={inputStyle}
            />
          </div>

          <div className="grid grid-cols-1 gap-6">
            {/* Résumé du service */}
            <div className="flex flex-col gap-2">
              <label className={labelClass} style={{ color: 'var(--color-text-muted)' }}>Résumé du Service *</label>
              <input
                name="short_description" type="text" required
                value={formData.short_description} onChange={handleChange}
                placeholder="Révision complète pour entretenir votre véhicule en toute sérénité."
                className="px-4 py-3 text-sm outline-none" style={inputStyle}
              />
            </div>
          </div>

          {/* Description détaillée */}
          <div className="flex flex-col gap-2">
            <label className={labelClass} style={{ color: 'var(--color-text-muted)' }}>Description *</label>
            <textarea
              name="full_description" required rows={5}
              value={formData.full_description} onChange={handleChange}
              placeholder="Révision incluant la vérification des niveaux, filtres, freins et éléments de sécurité. Permet de prévenir les pannes et d’assurer le bon fonctionnement du véhicule au quotidien."
              className="px-4 py-3 text-sm outline-none resize-none" style={inputStyle}
            />
          </div>

          <button
            type="submit" disabled={loading}
            className="px-10 py-4 font-black uppercase tracking-wider text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
            style={{ backgroundColor: 'var(--color-accent)', color: '#111111' }}
          >
            {loading ? "Création en cours..." : "Créer le service"}
          </button>

        </form>
      </main>
    </div>
  )
}