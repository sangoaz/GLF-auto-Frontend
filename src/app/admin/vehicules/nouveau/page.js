"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../../../hooks/useAuth"
import AdminSidebar from "../../components/AdminSidebar"

const FUELS = [
  { value: "PETROL", label: "Essence" },
  { value: "DIESEL", label: "Diesel" },
  { value: "HYBRID", label: "Hybride" },
  { value: "PLUG_IN_HYBRID", label: "Hybride rechargeable" },
  { value: "ELECTRIC", label: "Electrique" },
  { value: "LPG", label: "GPL" },
  { value: "CNG", label: "Gaz naturel" },
]

const TRANSMISSIONS = [
  { value: "MANUAL", label: "Manuelle" },
  { value: "AUTOMATIC", label: "Automatique" },
  { value: "SEMI_AUTOMATIC", label: "Semi-automatique" },
]

export default function NouveauVehiculePage() {
  const { ready, logout, authHeaders } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [formData, setFormData] = useState({
    title: "",
    brand: "",
    model: "",
    year: "",
    mileage: "",
    fuel: "PETROL",
    transmission: "MANUAL",
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
      const res = await fetch("${process.env.NEXT_PUBLIC_API_URL}/admin/vehicles", {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({
          ...formData,
          year: parseInt(formData.year),
          mileage: parseInt(formData.mileage),
          price: parseInt(formData.price),
        }),
      })

      if (!res.ok) throw new Error()
      const data = await res.json()
      router.push(`/admin/vehicules/${data.id}`)
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
            href="/admin/vehicules"
            className="text-sm font-bold uppercase tracking-wider hover:opacity-70"
            style={{ color: 'var(--color-accent)' }}
          >
            ← Retour
          </a>
          <h1
            className="text-3xl font-black uppercase tracking-tight"
            style={{ color: 'var(--color-text)' }}
          >
            Nouveau véhicule
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
              placeholder="Peugeot 308 SW 1.6 HDi"
              className="px-4 py-3 text-sm outline-none" style={inputStyle}
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Marque */}
            <div className="flex flex-col gap-2">
              <label className={labelClass} style={{ color: 'var(--color-text-muted)' }}>Marque *</label>
              <input
                name="brand" type="text" required
                value={formData.brand} onChange={handleChange}
                placeholder="Peugeot"
                className="px-4 py-3 text-sm outline-none" style={inputStyle}
              />
            </div>
            {/* Modèle */}
            <div className="flex flex-col gap-2">
              <label className={labelClass} style={{ color: 'var(--color-text-muted)' }}>Modèle *</label>
              <input
                name="model" type="text" required
                value={formData.model} onChange={handleChange}
                placeholder="308 SW"
                className="px-4 py-3 text-sm outline-none" style={inputStyle}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* Année */}
            <div className="flex flex-col gap-2">
              <label className={labelClass} style={{ color: 'var(--color-text-muted)' }}>Année *</label>
              <input
                name="year" type="number" required min="1900" max="2100"
                value={formData.year} onChange={handleChange}
                placeholder="2020"
                className="px-4 py-3 text-sm outline-none" style={inputStyle}
              />
            </div>
            {/* Kilométrage */}
            <div className="flex flex-col gap-2">
              <label className={labelClass} style={{ color: 'var(--color-text-muted)' }}>Kilométrage *</label>
              <input
                name="mileage" type="number" required min="0"
                value={formData.mileage} onChange={handleChange}
                placeholder="45000"
                className="px-4 py-3 text-sm outline-none" style={inputStyle}
              />
            </div>
            {/* Prix */}
            <div className="flex flex-col gap-2">
              <label className={labelClass} style={{ color: 'var(--color-text-muted)' }}>Prix (€) *</label>
              <input
                name="price" type="number" required min="0"
                value={formData.price} onChange={handleChange}
                placeholder="14900"
                className="px-4 py-3 text-sm outline-none" style={inputStyle}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Carburant */}
            <div className="flex flex-col gap-2">
              <label className={labelClass} style={{ color: 'var(--color-text-muted)' }}>Carburant *</label>
              <select
                name="fuel" value={formData.fuel} onChange={handleChange}
                className="px-4 py-3 text-sm outline-none" style={inputStyle}
              >
                {FUELS.map(f => (
                  <option key={f.value} value={f.value}>{f.label}</option>
                ))}
              </select>
            </div>
            {/* Transmission */}
            <div className="flex flex-col gap-2">
              <label className={labelClass} style={{ color: 'var(--color-text-muted)' }}>Transmission *</label>
              <select
                name="transmission" value={formData.transmission} onChange={handleChange}
                className="px-4 py-3 text-sm outline-none" style={inputStyle}
              >
                {TRANSMISSIONS.map(t => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <label className={labelClass} style={{ color: 'var(--color-text-muted)' }}>Description *</label>
            <textarea
              name="description" required rows={5}
              value={formData.description} onChange={handleChange}
              placeholder="Description du véhicule..."
              className="px-4 py-3 text-sm outline-none resize-none" style={inputStyle}
            />
          </div>

          <button
            type="submit" disabled={loading}
            className="px-10 py-4 font-black uppercase tracking-wider text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
            style={{ backgroundColor: 'var(--color-accent)', color: '#111111' }}
          >
            {loading ? "Création en cours..." : "Créer le véhicule"}
          </button>

        </form>
      </main>
    </div>
  )
}