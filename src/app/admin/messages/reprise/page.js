"use client"

import { useEffect, useState } from "react"
import { useAuth } from "../../../hooks/useAuth"
import AdminSidebar from "../../components/AdminSidebar"

export default function AdminRepriseMessagesPage() {
  const { ready, logout, authHeaders } = useAuth()
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    if (!ready) return
    fetchMessages()
  }, [ready])

  async function fetchMessages() {
    try {
      const res = await fetch("http://127.0.0.1:8000/admin/trade-in-requests?limit=50", {
        headers: authHeaders(),
      })
      const data = await res.json()
      setMessages(data)
    } finally {
      setLoading(false)
    }
  }

  async function handleSelect(message) {
    setSelected(message)
    if (!message.is_read) {
      await fetch(`http://127.0.0.1:8000/admin/trade-in-requests/${message.id}`, {
        method: "PATCH",
        headers: authHeaders(),
        body: JSON.stringify({ is_read: true }),
      })
      setMessages(messages.map(m => m.id === message.id ? { ...m, is_read: true } : m))
    }
  }

  if (!ready) return null

  return (
    <div className="flex min-h-screen">
      <AdminSidebar onLogout={logout} />

      <main className="flex-1 p-10">
        <h1
          className="text-3xl font-black uppercase tracking-tight mb-8"
          style={{ color: 'var(--color-text)' }}
        >
          Demandes de reprise
        </h1>

        {loading && (
          <p style={{ color: 'var(--color-text-muted)' }} className="text-sm">Chargement...</p>
        )}

        {!loading && messages.length === 0 && (
          <div
            className="p-12 text-center"
            style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
          >
            <p style={{ color: 'var(--color-text-muted)' }}>Aucun message pour le moment.</p>
          </div>
        )}

        {!loading && messages.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Liste */}
            <div className="flex flex-col gap-3">
              {messages.map((message) => (
                <button
                  key={message.id}
                  onClick={() => handleSelect(message)}
                  className="text-left px-5 py-4 transition-colors"
                  style={{
                    backgroundColor: selected?.id === message.id ? 'var(--color-accent)' : 'var(--color-surface)',
                    border: selected?.id === message.id ? '1px solid var(--color-accent)' : '1px solid var(--color-border)',
                    borderLeft: !message.is_read ? '3px solid var(--color-accent)' : '3px solid var(--color-border)',
                  }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <p
                      className="font-black text-sm uppercase tracking-wide"
                      style={{ color: selected?.id === message.id ? '#111' : 'var(--color-text)' }}
                    >
                      {message.name}
                      {!message.is_read && selected?.id !== message.id && (
                        <span
                          className="ml-2 text-xs px-2 py-0.5 font-black uppercase"
                          style={{ backgroundColor: 'var(--color-accent)', color: '#111' }}
                        >
                          Nouveau
                        </span>
                      )}
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: selected?.id === message.id ? '#111' : 'var(--color-text-muted)' }}
                    >
                      {new Date(message.created_at).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  <p
                    className="text-xs truncate"
                    style={{ color: selected?.id === message.id ? '#333' : 'var(--color-text-muted)' }}
                  >
                    {message.brand} {message.model} · {message.year}
                  </p>
                </button>
              ))}
            </div>

            {/* Détail */}
            {selected ? (
              <div
                className="p-6"
                style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
              >
                <div className="mb-6">
                  <p className="text-xs uppercase tracking-widest font-bold mb-1" style={{ color: 'var(--color-accent)' }}>
                  </p>
                  <h2 className="text-xl font-black uppercase" style={{ color: 'var(--color-text)' }}>
                    {selected.name}
                  </h2>
                </div>

                <div className="flex flex-col gap-3 mb-6">
                  {[
                    { label: "Email", value: selected.email },
                    { label: "Téléphone", value: selected.phone },
                    { label: "Marque", value: selected.brand },
                    { label: "Modèle", value: selected.model },
                    { label: "Année", value: selected.year },
                    { label: "Kilométrage", value: `${selected.mileage.toLocaleString('fr-FR')} km` },
                    { label: "Date", value: new Date(selected.created_at).toLocaleDateString('fr-FR') },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between py-2"
                      style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <span className="text-xs uppercase tracking-wider font-bold" style={{ color: 'var(--color-text-muted)' }}>
                        {item.label}
                      </span>
                      <span className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mb-6">
                <p className="text-xs uppercase tracking-wider font-bold mb-2" style={{ color: 'var(--color-text-muted)' }}>
                    État du véhicule
                </p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text)' }}>
                    {selected.condition_note}
                </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider font-bold mb-2" style={{ color: 'var(--color-text-muted)' }}>
                    Message
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text)' }}>
                    {selected.message}
                  </p>
                </div>
              </div>
            ) : (
              <div
                className="p-6 flex items-center justify-center"
                style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
              >
                <p style={{ color: 'var(--color-text-muted)' }} className="text-sm">
                  Sélectionnez un message pour le lire
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}