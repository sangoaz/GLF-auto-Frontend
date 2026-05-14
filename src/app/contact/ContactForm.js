"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

export default function ContactForm() {
  const searchParams = useSearchParams()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const [status, setStatus] = useState(null)

  useEffect(() => {
    const sujet = searchParams.get("sujet")

    if (sujet) {
      setFormData((prev) => ({
        ...prev,
        subject: `Demande concernant : ${sujet}`,
      }))
    }
  }, [searchParams])

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus("loading")

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error()

      setStatus("success")
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })
    } catch {
      setStatus("error")
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="mb-10">
        <p
          style={{ color: "var(--color-accent)" }}
          className="text-sm uppercase tracking-widest font-bold mb-2"
        >
          On vous répond rapidement
        </p>

        <h1
          className="text-4xl font-black uppercase tracking-tight"
          style={{ color: "var(--color-text)" }}
        >
          Contactez-nous
        </h1>
      </div>

      {status === "success" && (
        <div
          className="mb-8 p-5 font-bold text-sm uppercase tracking-wider"
          style={{
            backgroundColor: "#14532d",
            color: "#86efac",
            border: "1px solid #166534",
          }}
        >
          ✓ Votre message a bien été envoyé. Nous vous répondrons dans les plus
          brefs délais.
        </div>
      )}

      {status === "error" && (
        <div
          className="mb-8 p-5 font-bold text-sm uppercase tracking-wider"
          style={{
            backgroundColor: "#450a0a",
            color: "#fca5a5",
            border: "1px solid #7f1d1d",
          }}
        >
          ✗ Une erreur est survenue. Veuillez réessayer ou nous appeler
          directement.
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="name"
              className="text-xs uppercase tracking-widest font-bold"
              style={{ color: "var(--color-text-muted)" }}
            >
              Nom complet *
            </label>

            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Jean Dupont"
              className="px-4 py-3 text-sm outline-none"
              style={{
                backgroundColor: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                color: "var(--color-text)",
              }}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-xs uppercase tracking-widest font-bold"
              style={{ color: "var(--color-text-muted)" }}
            >
              Email *
            </label>

            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="jean@exemple.fr"
              className="px-4 py-3 text-sm outline-none"
              style={{
                backgroundColor: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                color: "var(--color-text)",
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="phone"
              className="text-xs uppercase tracking-widest font-bold"
              style={{ color: "var(--color-text-muted)" }}
            >
              Téléphone *
            </label>

            <input
              id="phone"
              name="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="06 01 02 03 04"
              className="px-4 py-3 text-sm outline-none"
              style={{
                backgroundColor: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                color: "var(--color-text)",
              }}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="subject"
              className="text-xs uppercase tracking-widest font-bold"
              style={{ color: "var(--color-text-muted)" }}
            >
              Sujet *
            </label>

            <input
              id="subject"
              name="subject"
              type="text"
              required
              value={formData.subject}
              onChange={handleChange}
              placeholder="Demande de renseignement"
              className="px-4 py-3 text-sm outline-none"
              style={{
                backgroundColor: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                color: "var(--color-text)",
              }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="message"
            className="text-xs uppercase tracking-widest font-bold"
            style={{ color: "var(--color-text-muted)" }}
          >
            Message *
          </label>

          <textarea
            id="message"
            name="message"
            required
            rows={6}
            value={formData.message}
            onChange={handleChange}
            placeholder="Votre message..."
            className="px-4 py-3 text-sm outline-none resize-none"
            style={{
              backgroundColor: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              color: "var(--color-text)",
            }}
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="px-10 py-4 font-black uppercase tracking-wider text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
          style={{
            backgroundColor: "var(--color-accent)",
            color: "#111111",
          }}
        >
          {status === "loading" ? "Envoi en cours..." : "Envoyer le message"}
        </button>
      </form>
    </div>
  )
}