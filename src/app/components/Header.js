"use client"

import { useState } from "react"

const links = [
  { label: 'Accueil', href: '/' },
  { label: 'Véhicules', href: '/vehicules' },
  { label: 'Pièces', href: '/pieces' },
  { label: 'Services', href: '/services' },
  { label: 'Reprise', href: '/reprise' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header
      style={{
        backgroundColor: 'var(--color-surface)',
        borderBottom: '2px solid var(--color-accent)',
      }}
      className="w-full"
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <a href="/" className="flex items-center gap-3">
          <span
            style={{ color: 'var(--color-accent)' }}
            className="text-2xl font-black tracking-widest uppercase"
          >
            GLF Auto
          </span>
          <span
            style={{ color: 'var(--color-text-muted)' }}
            className="text-xs uppercase tracking-widest hidden md:block"
          >
            Service et Réparation Mécanique
          </span>
        </a>

        {/* Navigation desktop */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{ color: 'var(--color-text)' }}
              className="text-sm uppercase tracking-wider hover:text-yellow-500 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/contact"
            style={{ backgroundColor: 'var(--color-accent)', color: '#111111' }}
            className="text-sm uppercase tracking-wider font-bold px-4 py-2 hover:opacity-90 transition-opacity"
          >
            Contact
          </a>
        </nav>

        {/* Bouton burger mobile */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span
            className="block w-6 h-0.5 transition-all"
            style={{
              backgroundColor: 'var(--color-text)',
              transform: menuOpen ? 'translateY(8px) rotate(45deg)' : 'none',
            }}
          />
          <span
            className="block w-6 h-0.5 transition-all"
            style={{
              backgroundColor: 'var(--color-text)',
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            className="block w-6 h-0.5 transition-all"
            style={{
              backgroundColor: 'var(--color-text)',
              transform: menuOpen ? 'translateY(-8px) rotate(-45deg)' : 'none',
            }}
          />
        </button>

      </div>

      {/* Menu mobile déroulant */}
      {menuOpen && (
        <div
          style={{
            backgroundColor: 'var(--color-surface)',
            borderTop: '1px solid var(--color-border)',
          }}
          className="md:hidden px-6 py-4 flex flex-col gap-4"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{ color: 'var(--color-text)' }}
              className="text-sm uppercase tracking-wider hover:text-yellow-500 transition-colors py-2"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/contact"
            onClick={() => setMenuOpen(false)}
            style={{ backgroundColor: 'var(--color-accent)', color: '#111111' }}
            className="text-sm uppercase tracking-wider font-bold px-4 py-3 text-center hover:opacity-90 transition-opacity"
          >
            Contact
          </a>
        </div>
      )}

    </header>
  )
}