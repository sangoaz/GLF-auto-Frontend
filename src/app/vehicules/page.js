import { imageUrl } from "../utils/imageUrl"

async function getVehicules() {
  try {
    const res = await fetch('http://127.0.0.1:8000/vehicles/', {
      cache: 'no-store',
    })
    if (!res.ok) return []
    return await res.json()
  } catch {
    return []
  }
}

const FUEL_LABELS = {
  PETROL: 'Essence',
  DIESEL: 'Diesel',
  HYBRID: 'Hybride',
  PLUG_IN_HYBRID: 'Hybride rechargeable',
  ELECTRIC: 'Electrique',
  LPG: 'GPL',
  CNG: 'Gaz naturel',
}

const TRANSMISSION_LABELS = {
  MANUAL: 'Manuelle',
  AUTOMATIC: 'Automatique',
  SEMI_AUTOMATIC: 'Semi-automatique',
}

export default async function VehiculesPage() {
  const vehicules = await getVehicules()

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">

      {/* Titre */}
      <div className="mb-10">
        <p style={{ color: 'var(--color-accent)' }} className="text-sm uppercase tracking-widest font-bold mb-2">
          Notre stock
        </p>
        <h1 className="text-4xl font-black uppercase tracking-tight" style={{ color: 'var(--color-text)' }}>
          Véhicules d&apos;occasion
        </h1>
      </div>

      {/* Aucun véhicule */}
      {vehicules.length === 0 && (
        <div
          style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
          className="p-12 text-center"
        >
          <p style={{ color: 'var(--color-text-muted)' }} className="text-lg">
            Aucun véhicule disponible pour le moment.
          </p>
          <p style={{ color: 'var(--color-text-muted)' }} className="text-sm mt-2">
            Revenez bientôt ou contactez-nous directement.
          </p>
        </div>
      )}

      {/* Grille de véhicules */}
      {vehicules.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicules.map((vehicule) => {
            const coverImage = vehicule.images?.find((img) => img.is_cover) || vehicule.images?.[0]

            return (
              <a
                key={vehicule.id}
                href={`/vehicules/${vehicule.id}`}
                style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
                className="block hover:border-yellow-600 transition-colors"
              >
                {/* Image */}
                <div className="h-48 flex items-center justify-center" style={{ backgroundColor: 'var(--color-border)' }}>
                  {coverImage ? (
                    <img
                      src={imageUrl(coverImage.image_url)}
                      alt={coverImage.alt_text || vehicule.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span style={{ color: 'var(--color-text-muted)' }} className="text-4xl">🚗</span>
                  )}
                </div>

                {/* Infos */}
                <div className="p-5">
                  <h2 className="font-black uppercase tracking-wide mb-1" style={{ color: 'var(--color-text)' }}>
                    {vehicule.title}
                  </h2>
                  <p style={{ color: 'var(--color-text-muted)' }} className="text-sm mb-4">
                    {vehicule.year} · {vehicule.mileage.toLocaleString('fr-FR')} km · {FUEL_LABELS[vehicule.fuel] || vehicule.fuel} · {TRANSMISSION_LABELS[vehicule.transmission] || vehicule.transmission}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-black" style={{ color: 'var(--color-accent)' }}>
                      {vehicule.price.toLocaleString('fr-FR')} €
                    </span>
                    {vehicule.status === 'RESERVED' && (
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