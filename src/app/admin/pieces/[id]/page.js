"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { useAuth } from "../../../hooks/useAuth"
import AdminSidebar from "../../components/AdminSidebar"
import { imageUrl } from "../../../utils/imageUrl"

const CONDITION = [
    {value: "NEW", label: "Neuf"},
    {value: "USED_GOOD", label: "Occasion - Bon état"},
    {value: "USED_FAIR", label: "Occasion - Etat correct"},
    {value: "FOR_PARTS", label: "Pour pièces / non fonctionnel"},
]


const STATUSES = [
  { value: "AVAILABLE", label: "Disponible" },
  { value: "RESERVED", label: "Réservé" },
  { value: "SOLD", label: "Vendu" },
]

export default function EditPiecePage() {
  const { ready, logout, authHeaders } = useAuth()
  const router = useRouter()
  const params = useParams()
  const id = params.id

  const [piece, setPiece] = useState(null)
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (!ready) return
    fetchPiece()
    fetchImages()
  }, [ready])

  async function fetchPiece() {
    try {
      const res = await fetch(`http://127.0.0.1:8000/admin/parts/${id}`, {
        headers: authHeaders(),
      })
      const data = await res.json()
      setPiece(data)
    } finally {
      setLoading(false)
    }
  }

  async function fetchImages() {
    const res = await fetch(`http://127.0.0.1:8000/admin/parts/${id}/images`, {
      headers: authHeaders(),
    })
    const data = await res.json()
    setImages(data)
  }

  function handleChange(e) {
    setPiece({ ...piece, [e.target.name]: e.target.value })
  }

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setSuccess(false)

    try {
      const res = await fetch(`http://127.0.0.1:8000/admin/parts/${id}`, {
        method: "PATCH",
        headers: authHeaders(),
        body: JSON.stringify({
          title: piece.title,
          category: piece.category,
          brand: piece.brand,
          compatible_models: piece.compatible_models,
          condition: piece.condition,
          price: parseInt(piece.price),
          description: piece.description,
          is_published: piece.is_published,
          is_featured: piece.is_featured,
        }),
      })
      if (!res.ok) throw new Error()
      setSuccess(true)
      fetchPiece()
    } catch {
      setError("Une erreur est survenue lors de la sauvegarde.")
    } finally {
      setSaving(false)
    }
  }

  async function handleUploadImage(e) {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)

    const formData = new FormData()
    formData.append("file", file)
    formData.append("display_order", images.length)

    const headers = authHeaders()
    delete headers["Content-Type"]

    await fetch(`http://127.0.0.1:8000/admin/parts/${id}/images/upload`, {
      method: "POST",
      headers,
      body: formData,
    })

    await fetchImages()
    setUploading(false)
    e.target.value = ""
  }

  async function handleSetCover(imageId) {
    await fetch(`http://127.0.0.1:8000/admin/parts/${id}/images/${imageId}/cover`, {
      method: "PATCH",
      headers: authHeaders(),
    })
    fetchImages()
  }

  async function handleDeleteImage(imageId) {
    if (!confirm("Supprimer cette image ?")) return
    await fetch(`http://127.0.0.1:8000/admin/parts/${id}/images/${imageId}`, {
      method: "DELETE",
      headers: authHeaders(),
    })
    fetchImages()
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
            Modifier la pièce
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
                <input name="title" type="text" required value={piece.title} onChange={handleChange}
                  className="px-4 py-3 text-sm outline-none" style={inputStyle} />
              </div>

              <div className="grid grid-cols-2 gap-6">
                {/* Catégorie */}
                <div className="flex flex-col gap-2">
                  <label className={labelClass} style={{ color: 'var(--color-text-muted)' }}>Catégorie *</label>
                  <input name="category" type="text" required value={piece.category} onChange={handleChange}
                    className="px-4 py-3 text-sm outline-none" style={inputStyle} />
                </div>
                {/* Marque */}
                <div className="flex flex-col gap-2">
                  <label className={labelClass} style={{ color: 'var(--color-text-muted)' }}>Marque *</label>
                  <input name="brand" type="text" required value={piece.brand} onChange={handleChange}
                    className="px-4 py-3 text-sm outline-none" style={inputStyle} />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {/* Modèles Compatibles */}
                <div className="flex flex-col gap-2">
                  <label className={labelClass} style={{ color: 'var(--color-text-muted)' }}>Modèles Compatibles *</label>
                  <input name="compatible_models" type="text" required value={piece.compatible_models} onChange={handleChange}
                    className="px-4 py-3 text-sm outline-none" style={inputStyle} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                {/* Etat */}
                <div className="flex flex-col gap-2">
                  <label className={labelClass} style={{ color: 'var(--color-text-muted)' }}>état *</label>
                  <select 
                    name="condition" required value={piece.condition} onChange={handleChange}
                    className="px-4 py-3 text-sm outline-none" style={inputStyle}
                  >
                    {CONDITION.map(f => (
                    <option key={f.value} value={f.value}>{f.label}</option>
                ))}
                  </select>
                </div>
                {/* Prix */}
                <div className="flex flex-col gap-2">
                  <label className={labelClass} style={{ color: 'var(--color-text-muted)' }}>Prix (€) *</label>
                  <input name="price" type="number" required value={piece.price} onChange={handleChange}
                    className="px-4 py-3 text-sm outline-none" style={inputStyle} />
                </div>
                {/* Status */}
                <div className="flex flex-col gap-2">
                  <label className={labelClass} style={{ color: 'var(--color-text-muted)' }}>Statut</label>
                  <select name="status" value={piece.status} onChange={handleChange}
                    className="px-4 py-3 text-sm outline-none" style={inputStyle}>
                    {STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                  </select>
                </div>
              </div>

              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={piece.is_published}
                    onChange={e => setPiece({ ...piece, is_published: e.target.checked })} />
                  <span className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>Publié</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={piece.is_featured}
                    onChange={e => setPiece({ ...piece, is_featured: e.target.checked })} />
                  <span className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>Mis en avant</span>
                </label>
              </div>
              
              {/* Description */}
              <div className="flex flex-col gap-2">
                <label className={labelClass} style={{ color: 'var(--color-text-muted)' }}>Description *</label>
                <textarea name="description" required rows={5} value={piece.description} onChange={handleChange}
                  className="px-4 py-3 text-sm outline-none resize-none" style={inputStyle} />
              </div>

              <button type="submit" disabled={saving}
                className="px-10 py-4 font-black uppercase tracking-wider text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
                style={{ backgroundColor: 'var(--color-accent)', color: '#111111' }}>
                {saving ? "Sauvegarde..." : "Sauvegarder"}
              </button>
            </form>
          </div>

          {/* Gestion photos */}
          <div>
            <h2 className="text-sm uppercase tracking-widest font-black mb-4"
              style={{ color: 'var(--color-text-muted)' }}>
              Photos
            </h2>

            {/* Upload */}
            <label
              className="flex items-center justify-center gap-2 px-4 py-3 mb-4 cursor-pointer text-sm font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
              style={{ border: '2px dashed var(--color-border)', color: 'var(--color-text-muted)' }}
            >
              {uploading ? "Upload..." : "+ Ajouter une photo"}
              <input type="file" accept="image/*" className="hidden" onChange={handleUploadImage} disabled={uploading} />
            </label>

            {/* Liste images */}
            <div className="flex flex-col gap-3">
              {images.map((img) => (
                <div
                  key={img.id}
                  className="flex items-center gap-3 p-3"
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    border: img.is_cover ? '1px solid var(--color-accent)' : '1px solid var(--color-border)',
                  }}
                >
                  <img
                    src={imageUrl(img.image_url)}
                    alt=""
                    className="w-16 h-16 object-cover shrink-0"
                  />
                  <div className="flex-1">
                    {img.is_cover && (
                      <span className="text-xs font-black uppercase px-2 py-0.5"
                        style={{ backgroundColor: 'var(--color-accent)', color: '#111' }}>
                        Couverture
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    {!img.is_cover && (
                      <button onClick={() => handleSetCover(img.id)}
                        className="text-xs px-2 py-1 font-bold uppercase hover:opacity-70"
                        style={{ border: '1px solid var(--color-border)', color: 'var(--color-text-muted)' }}>
                        Couv.
                      </button>
                    )}
                    <button onClick={() => handleDeleteImage(img.id)}
                      className="text-xs px-2 py-1 font-bold uppercase hover:opacity-70"
                      style={{ border: '1px solid #7f1d1d', color: '#fca5a5' }}>
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}