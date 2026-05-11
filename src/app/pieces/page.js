import { imageUrl } from "../utils/imageUrl"

const CONDITION_LABELS = {
  NEW: "Neuf",
  USED_GOOD: "Occasion - Bon état",
  USED_FAIR: "Occasion - Etat correct",
  FOR_PARTS: "Pour pièces / non fonctionnel",
}

async function getPieces() {
  try {
    const res = await fetch('${process.env.NEXT_PUBLIC_API_URL}/parts/', {
      cache: 'no-store',
    })
    if (!res.ok) return []
    return await res.json()
  } catch {
    return []
  }
}

export default async function PiecesPage() {
  const pieces = await getPieces()

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">

      {/* Titre */}
      <div className="mb-10">
        <p style={{ color: 'var(--color-accent)' }} className="text-sm uppercase tracking-widest font-bold mb-2">
          Notre stock
        </p>
        <h1 className="text-4xl font-black uppercase tracking-tight" style={{ color: 'var(--color-text)' }}>
          Pièces d&apos;occasion
        </h1>
      </div>

      {/* Aucune pièce */}
      {pieces.length === 0 && (
        <div
          style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
          className="p-12 text-center"
        >
          <p style={{ color: 'var(--color-text-muted)' }} className="text-lg">
            Aucune pièce disponible pour le moment.
          </p>
          <p style={{ color: 'var(--color-text-muted)' }} className="text-sm mt-2">
            Revenez bientôt ou contactez-nous directement.
          </p>
        </div>
      )}

      {/* Grille de pièces */}
      {pieces.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pieces.map((piece) => {
            const coverImage = piece.images?.find((img) => img.is_cover) || piece.images?.[0]

            return (
              <a
                key={piece.id}
                href={`/pieces/${piece.id}`}
                style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
                className="block hover:border-yellow-600 transition-colors"
              >
                {/* Image */}
                <div className="h-48 flex items-center justify-center" style={{ backgroundColor: 'var(--color-border)' }}>
                  {coverImage ? (
                    <img
                      src={imageUrl(coverImage.image_url)}
                      alt={coverImage.alt_text || piece.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span style={{ color: 'var(--color-text-muted)' }} className="text-4xl">🔧</span>
                  )}
                </div>

                {/* Infos */}
                <div className="p-5">
                  <p style={{ color: 'var(--color-accent)' }} className="text-xs uppercase tracking-widest font-bold mb-1">
                    {piece.category}
                  </p>
                  <h2 className="font-black uppercase tracking-wide mb-1" style={{ color: 'var(--color-text)' }}>
                    {piece.title}
                  </h2>
                  <p style={{ color: 'var(--color-text-muted)' }} className="text-sm mb-4">
                    {piece.brand} · {CONDITION_LABELS[piece.condition] || piece.condition}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-black" style={{ color: 'var(--color-accent)' }}>
                      {piece.price.toLocaleString('fr-FR')} €
                    </span>
                    {piece.status === 'RESERVED' && (
                      <span
                        style={{ backgroundColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}
                        className="text-xs uppercase tracking-wider px-2 py-1 font-bold"
                      >
                        Réservé
                      </span>
                    )}
                  </div>
                </div>
              </a>
            )
          })}
        </div>
      )}

    </div>
  )
}