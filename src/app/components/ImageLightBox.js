"use client"

import { useState, useEffect } from "react"
import { imageUrl } from "../utils/imageUrl"

export default function ImageLightbox({ images = [], title }) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!images || images.length === 0) {
    return (
      <div
        className="w-full h-72 flex items-center justify-center"
        style={{ backgroundColor: "var(--color-border)" }}
      >
        <span className="text-6xl">🚗</span>
      </div>
    )
  }

  const coverIndex = images.findIndex((img) => img.is_cover)
  const orderedImages =
    coverIndex > 0
      ? [images[coverIndex], ...images.filter((_, i) => i !== coverIndex)]
      : images

  const coverImage = orderedImages[0]

  function openLightbox(index) {
    setCurrentIndex(index)
    setLightboxOpen(true)
  }

  function closeLightbox() {
    setLightboxOpen(false)
  }

  function prev(e) {
    e?.stopPropagation()
    setCurrentIndex((i) => (i - 1 + orderedImages.length) % orderedImages.length)
  }

  function next(e) {
    e?.stopPropagation()
    setCurrentIndex((i) => (i + 1) % orderedImages.length)
  }

  useEffect(() => {
    if (!lightboxOpen) return

    function handleKey(e) {
      if (e.key === "Escape") closeLightbox()
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
    }

    window.addEventListener("keydown", handleKey)
    document.body.style.overflow = "hidden"

    return () => {
      window.removeEventListener("keydown", handleKey)
      document.body.style.overflow = ""
    }
  }, [lightboxOpen])

  return (
    <>
      <div
        className="w-full h-72 overflow-hidden mb-3"
        style={{
          backgroundColor: "var(--color-border)",
          cursor: "zoom-in",
        }}
        onClick={() => openLightbox(0)}
      >
        <img
          src={imageUrl(coverImage.image_url)}
          alt={coverImage.alt_text || title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {orderedImages.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {orderedImages.slice(1).map((img, i) => (
            <div
              key={img.id}
              className="h-20 overflow-hidden"
              style={{
                backgroundColor: "var(--color-border)",
                cursor: "zoom-in",
              }}
              onClick={() => openLightbox(i + 1)}
            >
              <img
                src={imageUrl(img.image_url)}
                alt={img.alt_text || title}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      )}

      {lightboxOpen && (
        <div
          onClick={closeLightbox}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999999,
            backgroundColor: "rgba(0,0,0,0.92)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              closeLightbox()
            }}
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              zIndex: 1000000,
              color: "white",
              backgroundColor: "rgba(0,0,0,0.5)",
              width: 42,
              height: 42,
              fontSize: 24,
              fontWeight: 900,
            }}
          >
            ×
          </button>

          <div
            style={{
              position: "absolute",
              top: 16,
              left: "50%",
              transform: "translateX(-50%)",
              color: "white",
              backgroundColor: "rgba(0,0,0,0.5)",
              padding: "8px 16px",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.1em",
            }}
          >
            {currentIndex + 1} / {orderedImages.length}
          </div>

          {orderedImages.length > 1 && (
            <button
              type="button"
              onClick={prev}
              style={{
                position: "absolute",
                left: 16,
                zIndex: 1000000,
                color: "white",
                backgroundColor: "rgba(0,0,0,0.5)",
                width: 48,
                height: 48,
                fontSize: 36,
                fontWeight: 900,
              }}
            >
              ‹
            </button>
          )}

          <img
            src={imageUrl(orderedImages[currentIndex].image_url)}
            alt={orderedImages[currentIndex].alt_text || title}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "90vw",
              maxHeight: "75vh",
              objectFit: "contain",
              boxShadow: "0 0 60px rgba(0,0,0,0.8)",
            }}
          />

          {orderedImages.length > 1 && (
            <button
              type="button"
              onClick={next}
              style={{
                position: "absolute",
                right: 16,
                zIndex: 1000000,
                color: "white",
                backgroundColor: "rgba(0,0,0,0.5)",
                width: 48,
                height: 48,
                fontSize: 36,
                fontWeight: 900,
              }}
            >
              ›
            </button>
          )}
        </div>
      )}
    </>
  )
}