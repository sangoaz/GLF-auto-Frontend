"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminLoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({ username: "", password: "" })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError(null)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // FastAPI attend un form-data pour OAuth2
      const body = new URLSearchParams()
      body.append("username", formData.username)
      body.append("password", formData.password)

      const res = await fetch("${process.env.NEXT_PUBLIC_API_URL}/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      })

      if (!res.ok) {
        setError("Email ou mot de passe incorrect.")
        return
      }

      const data = await res.json()

      // Stocker le token dans localStorage
      localStorage.setItem("glf_admin_token", data.access_token)

      // Rediriger vers le dashboard
      router.push("/admin/dashboard")
    } catch {
      setError("Impossible de contacter le serveur.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ backgroundColor: 'var(--color-background)' }}
    >
      <div
        className="w-full max-w-md p-10"
        style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
        }}
      >
        {/* Titre */}
        <div className="text-center mb-10">
          <p
            className="text-2xl font-black uppercase tracking-widest"
            style={{ color: 'var(--color-accent)' }}
          >
            GLF Auto
          </p>
          <p
            className="text-xs uppercase tracking-widest mt-1"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Espace administration
          </p>
        </div>

        {/* Erreur */}
        {error && (
          <div
            className="mb-6 p-4 text-sm font-bold uppercase tracking-wider"
            style={{
              backgroundColor: '#450a0a',
              color: '#fca5a5',
              border: '1px solid #7f1d1d',
            }}
          >
            ✗ {error}
          </div>
        )}

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="username"
              className="text-xs uppercase tracking-widest font-bold"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Email
            </label>
            <input
              id="username"
              name="username"
              type="email"
              required
              value={formData.username}
              onChange={handleChange}
              placeholder="admin@glf.fr"
              className="px-4 py-3 text-sm outline-none"
              style={{
                backgroundColor: 'var(--color-background)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text)',
              }}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-xs uppercase tracking-widest font-bold"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="px-4 py-3 text-sm outline-none"
              style={{
                backgroundColor: 'var(--color-background)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text)',
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 px-8 py-4 font-black uppercase tracking-wider text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
            style={{ backgroundColor: 'var(--color-accent)', color: '#111111' }}
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  )
}