'use client'

import React, { useEffect, useState } from 'react'

import type { Media as MediaType } from '@/payload-types'

import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'

export const HeroCarousel: React.FC<{
  children?: React.ReactNode
  slides: ({ image: number | string | MediaType | null | undefined } | null | undefined)[]
}> = ({ children, slides }) => {
  const [active, setActive] = useState(0)
  const count = slides.filter((s) => s && typeof s.image === 'object').length

  useEffect(() => {
    if (count < 2) return

    const id = setInterval(() => setActive((i) => (i + 1) % count), 6000)
    return () => clearInterval(id)
  }, [count])

  let slideIndex = 0

  return (
    <div className="absolute inset-0 overflow-hidden">
      {slides.map((slide, i) => {
        const image = slide?.image
        if (!image || typeof image !== 'object') return null

        const index = slideIndex++
        const isActive = index === active

        return (
          <div
            aria-hidden={!isActive}
            className={cn(
              'absolute inset-0 transition-opacity duration-1000',
              isActive ? 'opacity-100' : 'opacity-0',
            )}
            key={index}
          >
            <Media fill imgClassName="object-cover" priority={index === 0} resource={image} />
          </div>
        )
      })}

      <div className="absolute inset-0 bg-gradient-to-r from-ink-900/85 via-ink-900/55 to-ink-900/25" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-900/80 to-transparent" />

      {count > 1 && (
        <div className="absolute bottom-24 left-1/2 z-20 flex -translate-x-1/2 gap-2 md:left-auto md:right-8 md:translate-x-0">
          {Array.from({ length: count }).map((_, i) => (
            <button
              aria-label={`Show slide ${i + 1}`}
              className={cn(
                'h-1.5 rounded-full transition-all',
                i === active ? 'w-8 bg-brand-400' : 'w-3 bg-white/40 hover:bg-white/70',
              )}
              key={i}
              onClick={() => setActive(i)}
              type="button"
            />
          ))}
        </div>
      )}

      {children}
    </div>
  )
}
