import React from 'react'

import type { HeroBannerBlock as HeroBannerBlockProps } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { HeroCarousel } from './Carousel'

export const HeroBannerBlock: React.FC<HeroBannerBlockProps> = ({
  description,
  eyebrow,
  heading,
  link,
  slides,
}) => {
  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden bg-ink-900 text-white">
      <HeroCarousel slides={slides || []} />

      <div className="container relative z-10 flex flex-col gap-6 py-24">
        <div className="max-w-2xl">
          {eyebrow && (
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-400/50 bg-brand-900/40 px-4 py-1.5 text-sm font-semibold text-brand-300">
              <span className="size-1.5 rounded-full bg-brand-400" />
              {eyebrow}
            </span>
          )}
          <h1 className="text-display text-balance">{heading}</h1>
          {description && (
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
              {description}
            </p>
          )}
          {link?.label && (
            <CMSLink
              {...link}
              appearance="default"
              size="lg"
              className="mt-8 shadow-brand"
            />
          )}
        </div>
      </div>
    </section>
  )
}
