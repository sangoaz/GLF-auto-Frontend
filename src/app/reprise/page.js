"use client"

import { useState } from "react"

export default function ReprisePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    brand: "",
    model: "",
    year: "",
    mileage: "",
    condition_note: "",
    message: "",
  })
  const [status, setStatus] = useState(null)

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus("loading")

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/trade-in`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          year: parseInt(formData.year),
          mileage: parseInt(formData.mileage),
        }),
      })

      if (!res.ok) throw new Error()
      setStatus("success")
      setFormData({
        name: "", email: "", phone: "", brand: "",
        model: "", year: "", mileage: "", condition_note: "", message: "",
      })
    } catch {
      setStatus("error")
    }
  }

  const inputStyle = {
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    color: 'var(--color-text)',
  }

  const labelClass = "text-xs uppercase tracking-widest font-bold"
  const inputClass = "px-4 py-3 text-sm outline-none w-full"

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">

      {/* Titre */}
      <div className="mb-10">
        <p style={{ color: 'var(--color-accent)' }} className="text-sm uppercase tracking-widest font-bold mb-2">
          Vous souhaitez vendre votre véhicule ?
        </p>
        <h1 className="text-4xl font-black uppercase tracking-tight" style={{ color: 'var(--color-text)' }}>
          Demande de reprise
        </h1>
        <p className="mt-4 text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
          Remplissez ce formulaire et nous vous contacterons rapidement avec une estimation de reprise.
        </p>
      </div>

      {/* Message succès */}
      {status === "success" && (
        <div
          className="mb-8 p-5 font-bold text-sm uppercase tracking-wider"
          style={{ backgroundColor: '#14532d', color: '#86efac', border: '1px solid #166534' }}
        >
          ✓ Votre demande a bien été envoyée. Nous vous recontacterons rapidement.
        </div>
      )}

      {/* Message erreur */}
      {status === "error" && (
        <div
          className="mb-8 p-5 font-bold text-sm uppercase tracking-wider"
          style={{ backgroundColor: '#450a0a', color: '#fca5a5', border: '1px solid #7f1d1d' }}
        >
          ✗ Une erreur est survenue. Veuillez réessayer ou nous appeler directement.
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-8">

        {/* Section : Vos coordonnées */}
        <div>
          <h2
            className="text-sm uppercase tracking-widest font-black mb-4 pb-2"
            style={{ color: 'var(--color-accent)', borderBottom: '1px solid var(--color-border)' }}
          >
            Vos coordonnées
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className={labelClass} style={{ color: 'var(--color-text-muted)' }}>
                Nom complet *
              </label>
              <input
                id="name" name="name" type="text" required
                value={formData.name} onChange={handleChange}
                placeholder="Jean Dupont"
                className={inputClass} style={inputStyle}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className={labelClass} style={{ color: 'var(--color-text-muted)' }}>
                Email *
              </label>
              <input
                id="email" name="email" type="email" required
                value={formData.email} onChange={handleChange}
                placeholder="jean@exemple.fr"
                className={inputClass} style={inputStyle}
              />
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <label htmlFor="phone" className={labelClass} style={{ color: 'var(--color-text-muted)' }}>
                Téléphone *
              </label>
              <input
                id="phone" name="phone" type="tel" required
                value={formData.phone} onChange={handleChange}
                placeholder="06 01 02 03 04"
                className={inputClass} style={inputStyle}
              />
            </div>
          </div>
        </div>

        {/* Section : Votre véhicule */}
        <div>
          <h2
            className="text-sm uppercase tracking-widest font-black mb-4 pb-2"
            style={{ color: 'var(--color-accent)', borderBottom: '1px solid var(--color-border)' }}
          >
            Votre véhicule
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="brand" className={labelClass} style={{ color: 'var(--color-text-muted)' }}>
                Marque *
              </label>
              <input
                id="brand" name="brand" type="text" required
                value={formData.brand} onChange={handleChange}
                placeholder="Renault"
                className={inputClass} style={inputStyle}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="model" className={labelClass} style={{ color: 'var(--color-text-muted)' }}>
                Modèle *
              </label>
              <input
                id="model" name="model" type="text" required
                value={formData.model} onChange={handleChange}
                placeholder="Clio"
                className={inputClass} style={inputStyle}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="year" className={labelClass} style={{ color: 'var(--color-text-muted)' }}>
                Année *
              </label>
              <input
                id="year" name="year" type="number" required
                min="1900" max="2100"
                value={formData.year} onChange={handleChange}
                placeholder="2015"
                className={inputClass} style={inputStyle}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="mileage" className={labelClass} style={{ color: 'var(--color-text-muted)' }}>
                Kilométrage *
              </label>
              <input
                id="mileage" name="mileage" type="number" required
                min="0"
                value={formData.mileage} onChange={handleChange}
                placeholder="120000"
                className={inputClass} style={inputStyle}
              />
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <label htmlFor="condition_note" className={labelClass} style={{ color: 'var(--color-text-muted)' }}>
                État général *
              </label>
              <input
                id="condition_note" name="condition_note" type="text" required
                value={formData.condition_note} onChange={handleChange}
                placeholder="Bon état, quelques rayures..."
                className={inputClass} style={inputStyle}
              />
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="flex flex-col gap-2">
          <label htmlFor="message" className={labelClass} style={{ color: 'var(--color-text-muted)' }}>
            Message complémentaire *
          </label>
          <textarea
            id="message" name="message" required rows={4}
            value={formData.message} onChange={handleChange}
            placeholder="Informations supplémentaires sur votre véhicule..."
            className="px-4 py-3 text-sm outline-none resize-none"
            style={inputStyle}
          />
        </div>

        {/* Bouton */}
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-10 py-4 font-black uppercase tracking-wider text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
          style={{ backgroundColor: 'var(--color-accent)', color: '#111111' }}
        >
          {status === "loading" ? "Envoi en cours..." : "Envoyer ma demande"}
        </button>

      </form>
    </div>
  )
}