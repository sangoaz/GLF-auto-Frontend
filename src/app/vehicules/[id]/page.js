import { notFound } from 'next/navigation'
import { imageUrl } from "../../utils/imageUrl"
import ImageLightbox from "../../components/ImageLightBox"
import { FUEL_LABELS, TRANSMISSION_LABELS } from '@/app/utils/constants'

async function getVehicule(id) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/vehicles/${id}`, {
      cache: 'no-store',
    })
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}


export default async function VehiculeDetailPage({ params }) {
  const { id } = await params
  const vehicule = await getVehicule(id)

  if (!vehicule) notFound()

  const coverImage = vehicule.images?.find((img) => img.is_cover) || vehicule.images?.[0]
  const otherImages = vehicule.images?.filter((img) => img.id !== coverImage?.id) || []

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">

      {/* Retour */}
      <a
        href="/vehicules"
        style={{ color: 'var(--color-accent)' }}
        className="text-sm uppercase tracking-widest font-bold hover:opacity-70 transition-opacity mb-8 inline-block"
      >
        ← Retour aux véhicules
      </a>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-6">

        {/* Photos */}
        <div>
          <ImageLightbox
            images={vehicule.images || []}
            title={vehicule.title}
          />
        </div>

        {/* Infos */}
        <div>
          <h1
            className="text-3xl font-black uppercase tracking-tight mb-2"
            style={{ color: 'var(--color-text)' }}
          >
            {vehicule.title}
          </h1>

          <p
            className="text-3xl font-black mb-6"
            style={{ color: 'var(--color-accent)' }}
          >
            {vehicule.price.toLocaleString('fr-FR')} €
          </p>

          {/* Caractéristiques */}
          <div
            className="mb-6"
            style={{ border: '1px solid var(--color-border)' }}
          >
            {[
              { label: 'Marque', value: vehicule.brand },
              { label: 'Modèle', value: vehicule.model },
              { label: 'Année', value: vehicule.year },
              { label: 'Kilométrage', value: `${vehicule.mileage.toLocaleString('fr-FR')} km` },
              { label: 'Carburant', value: FUEL_LABELS[vehicule.fuel] || vehicule.fuel },
              { label: 'Transmission', value: TRANSMISSION_LABELS[vehicule.transmission] || vehicule.transmission },
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
                  className="text-sm font-bold"
                  style={{ color: 'var(--color-text)' }}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          {/* Description */}
          {vehicule.description && (
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
                {vehicule.description}
              </p>
            </div>
          )}

          {/* Statut */}
          {vehicule.status === 'RESERVED' && (
            <div
              className="mb-6 px-4 py-3 text-center font-bold uppercase tracking-wider text-sm"
              style={{ backgroundColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}
            >
              Ce véhicule est réservé
            </div>
          )}

          {/* CTA Contact */}
          <
            a href={`/contact?sujet=${encodeURIComponent(vehicule.title)}`}
            style={{ backgroundColor: 'var(--color-accent)', color: '#111111' }}
            className="block w-full text-center px-8 py-4 font-black uppercase tracking-wider text-sm hover:opacity-90 transition-opacity"
          >
            Nous contacter pour ce véhicule
          </a>
        </div>

      </div>
    </div>
  )
}