import { notFound } from 'next/navigation'
import { imageUrl } from "../../utils/imageUrl"

const CONDITION_LABELS = {
  NEW: "Neuf",
  USED_GOOD: "Occasion - Bon état",
  USED_FAIR: "Occasion - Etat correct",
  FOR_PARTS: "Pour pièces / non fonctionnel",
}

async function getPiece(id) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/parts/${id}`, {
      cache: 'no-store',
    })
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

export default async function PieceDetailPage({ params }) {
  const { id } = await params
  const piece = await getPiece(id)

  if (!piece) notFound()

  const coverImage = piece.images?.find((img) => img.is_cover) || piece.images?.[0]
  const otherImages = piece.images?.filter((img) => img.id !== coverImage?.id) || []

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">

      {/* Retour */}
      <a
        href="/pieces"
        style={{ color: 'var(--color-accent)' }}
        className="text-sm uppercase tracking-widest font-bold hover:opacity-70 transition-opacity mb-8 inline-block"
      >
        ← Retour aux pièces
      </a>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-6">

        {/* Photos */}
        <div>
          <div
            className="w-full h-72 flex items-center justify-center mb-3"
            style={{ backgroundColor: 'var(--color-border)' }}
          >
            {coverImage ? (
              <img
                src={imageUrl(coverImage.image_url)}
                alt={coverImage.alt_text || piece.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-6xl">🔧</span>
            )}
          </div>

          {otherImages.length > 0 && (
            <div className="grid grid-cols-4 gap-2">
              {otherImages.map((img) => (
                <div
                  key={img.id}
                  className="h-20"
                  style={{ backgroundColor: 'var(--color-border)' }}
                >
                  <img
                    src={imageUrl(img.image_url)}
                    alt={img.alt_text || piece.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Infos */}
        <div>
          <p
            style={{ color: 'var(--color-accent)' }}
            className="text-sm uppercase tracking-widest font-bold mb-2"
          >
            {piece.category}
          </p>

          <h1
            className="text-3xl font-black uppercase tracking-tight mb-2"
            style={{ color: 'var(--color-text)' }}
          >
            {piece.title}
          </h1>

          <p
            className="text-3xl font-black mb-6"
            style={{ color: 'var(--color-accent)' }}
          >
            {piece.price.toLocaleString('fr-FR')} €
          </p>

          {/* Caractéristiques */}
          <div
            className="mb-6"
            style={{ border: '1px solid var(--color-border)' }}
          >
            {[
              { label: 'Marque', value: piece.brand },
              { label: 'État', value: CONDITION_LABELS[piece.condition] || piece.condition },
              { label: 'Modèles compatibles', value: piece.compatible_models },
            ].map((item, index) => (
              <div
                key={item.label}
                className="flex justify-between px-4 py-3"
                style={{
                  backgroundColor: index % 2 === 0 ? 'var(--color-surface)' : 'transparent',
                  borderBottom: '1px solid var(--color-border)',
                }}
              >
                <span
                  className="text-sm uppercase tracking-wider font-bold"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {item.label}
                </span>
                <span
                  className="text-sm font-bold text-right"
                  style={{ color: 'var(--color-text)' }}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          {/* Description */}
          {piece.description && (
            <div className="mb-6">
              <h2
                className="text-sm uppercase tracking-widest font-bold mb-3"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Description
              </h2>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'var(--color-text)' }}
              >
                {piece.description}
              </p>
            </div>
          )}

          {/* Statut */}
          {piece.status === 'RESERVED' && (
            <div
              className="mb-6 px-4 py-3 text-center font-bold uppercase tracking-wider text-sm"
              style={{ backgroundColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}
            >
              Cette pièce est réservée
            </div>
          )}

          {/* CTA Contact */}
          <a
            href="/contact"
            style={{ backgroundColor: 'var(--color-accent)', color: '#111111' }}
            className="block w-full text-center px-8 py-4 font-black uppercase tracking-wider text-sm hover:opacity-90 transition-opacity"
          >
            Nous contacter pour cette pièce
          </a>
        </div>

      </div>
    </div>
  )
}