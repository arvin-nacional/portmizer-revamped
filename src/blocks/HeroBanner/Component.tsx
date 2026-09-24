import React from 'react'

import type { HeroBannerBlock as HeroBannerBlockProps } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { ArrowRightIcon } from 'lucide-react'
import { HeroCarousel } from './Carousel'

export const HeroBannerBlock: React.FC<HeroBannerBlockProps> = ({
  description,
  eyebrow,
  heading,
  link,
  quickLinks,
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

      {quickLinks && quickLinks.length > 0 && (
        <div className="absolute inset-x-0 bottom-0 z-10 border-t border-white/15 bg-ink-900/60 backdrop-blur-sm">
          <div className="container flex items-stretch gap-6 overflow-x-auto py-5">
            {quickLinks.map(({ link: quickLink }, i) => {
              if (!quickLink?.label) return null

              return (
                <CMSLink
                  className="group flex items-center gap-2 whitespace-nowrap text-sm font-medium text-white/75 no-underline transition-colors hover:text-brand-300"
                  key={i}
                  {...quickLink}
                >
                  {quickLink.label}
                  <ArrowRightIcon className="size-4 text-brand-400 transition-transform group-hover:translate-x-1" />
                </CMSLink>
              )
            })}
          </div>
        </div>
      )}
    </section>
  )
}
