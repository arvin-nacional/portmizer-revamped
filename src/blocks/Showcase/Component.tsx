import React from 'react'

import type { ShowcaseBlock as ShowcaseBlockProps } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'

export const ShowcaseBlock: React.FC<ShowcaseBlockProps> = ({
  cards,
  description,
  eyebrow,
  title,
}) => {
  return (
    <section className="bg-ink-50 py-16 lg:py-24">
      <div className="container flex flex-col gap-10">
        <div className="flex max-w-2xl flex-col gap-3">
          {eyebrow && (
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-600">
              {eyebrow}
            </span>
          )}
          <h2 className="text-3xl font-bold text-ink-900 md:text-4xl">{title}</h2>
          {description && <p className="text-ink-500">{description}</p>}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(cards || []).map((card, i) => {
            return (
              <div
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-sm transition-shadow hover:shadow-brand"
                key={card.id || i}
              >
                {card.image && typeof card.image === 'object' && (
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Media
                      className="absolute inset-0"
                      fill
                      imgClassName="object-cover transition-transform duration-500 group-hover:scale-105"
                      resource={card.image}
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <h3 className="text-lg font-semibold text-ink-900">{card.title}</h3>
                  {card.text && <p className="text-sm leading-relaxed text-ink-500">{card.text}</p>}
                  {card.link?.label && (
                    <CMSLink
                      {...card.link}
                      appearance="link"
                      className="mt-auto pt-2 text-sm font-semibold text-brand-600 no-underline hover:text-brand-700"
                    />
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
