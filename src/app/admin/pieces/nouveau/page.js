"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../../../hooks/useAuth"
import AdminSidebar from "../../components/AdminSidebar"

const CONDITION = [
    {value: "NEW", label: "Neuf"},
    {value: "USED_GOOD", label: "Occasion - Bon état"},
    {value: "USED_FAIR", label: "Occasion - Etat correct"},
    {value: "FOR_PARTS", label: "Pour pièces / non fonctionnel"},
]

export default function NouvellePiecePage() {
  const { ready, logout, authHeaders } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    brand: "",
    compatible_models: "",
    condition: "",
    price: "",
    description: "",
  })

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("http://127.0.0.1:8000/admin/parts", {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({
          ...formData,
          price: parseInt(formData.price),
        }),
      })

      if (!res.ok) throw new Error()
      const data = await res.json()
      router.push(`/admin/pieces/${data.id}`)
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
            href="/admin/pieces"
            className="text-sm font-bold uppercase tracking-wider hover:opacity-70"
            style={{ color: 'var(--color-accent)' }}
          >
            ← Retour
          </a>
          <h1
            className="text-3xl font-black uppercase tracking-tight"
            style={{ color: 'var(--color-text)' }}
          >
            Nouvelle pièce d'occasion
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
            <label className={labelClass} style={{ color: 'var(--color-text-muted)' }}>Titre de l&apos;annonce *</label>
            <input
              name="title" type="text" required
              value={formData.title} onChange={handleChange}
              placeholder="Embrayage Peugeot 308"
              className="px-4 py-3 text-sm outline-none" style={inputStyle}
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Catégorie */}
            <div className="flex flex-col gap-2">
              <label className={labelClass} style={{ color: 'var(--color-text-muted)' }}>Catégorie *</label>
              <input
                name="category" type="text" required
                value={formData.category} onChange={handleChange}
                placeholder="Embrayage"
                className="px-4 py-3 text-sm outline-none" style={inputStyle}
              />
            </div>
            {/* Marque */}
            <div className="flex flex-col gap-2">
              <label className={labelClass} style={{ color: 'var(--color-text-muted)' }}>Marque *</label>
              <input
                name="brand" type="text" required
                value={formData.brand} onChange={handleChange}
                placeholder="Sachs"
                className="px-4 py-3 text-sm outline-none" style={inputStyle}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {/* Modèles Compatibles */}
            <div className="flex flex-col gap-2">
              <label className={labelClass} style={{ color: 'var(--color-text-muted)' }}>Modèles Compatibles *</label>
              <input
                name="compatible_models" type="text" required
                value={formData.compatible_models} onChange={handleChange}
                placeholder="Peugeot 308, ..."
                className="px-4 py-3 text-sm outline-none" style={inputStyle}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {/* Etat */}
            <div className="flex flex-col gap-2">
              <label className={labelClass} style={{ color: 'var(--color-text-muted)' }}>état *</label>
              <select
                name="condition" value={formData.condition} onChange={handleChange}
                className="px-4 py-3 test-sm outline-none" style={inputStyle}
              >
                {CONDITION.map(f => (
                    <option key={f.value} value={f.value}>{f.label}</option>
                ))}
              </select>
            </div>
            {/* Prix */}
            <div className="flex flex-col gap-2">
              <label className={labelClass} style={{ color: 'var(--color-text-muted)' }}>Prix (€) *</label>
              <input
                name="price" type="number" required min="0"
                value={formData.price} onChange={handleChange}
                placeholder="25"
                className="px-4 py-3 text-sm outline-none" style={inputStyle}
              />
            </div>
          </div>
          {/* Description */}
          <div className="flex flex-col gap-2">
            <label className={labelClass} style={{ color: 'var(--color-text-muted)' }}>Description *</label>
            <textarea
              name="description" required rows={5}
              value={formData.description} onChange={handleChange}
              placeholder="Description de la pièce"
              className="px-4 py-3 text-sm outline-none resize-none" style={inputStyle}
            />
          </div>

          <button
            type="submit" disabled={loading}
            className="px-10 py-4 font-black uppercase tracking-wider text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
            style={{ backgroundColor: 'var(--color-accent)', color: '#111111' }}
          >
            {loading ? "Création en cours..." : "Créer la pièce"}
          </button>

        </form>
      </main>
    </div>
  )
}