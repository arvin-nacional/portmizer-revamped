import React from 'react'

import type { SplitFeatureBlock as SplitFeatureBlockProps } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'

export const SplitFeatureBlock: React.FC<SplitFeatureBlockProps> = ({
  eyebrow,
  images,
  link,
  reverse,
  richText,
  title,
}) => {
  const hasImages = Array.isArray(images) && images.length > 0

  return (
    <section className="py-16 lg:py-24">
      <div
        className={cn(
          'container grid items-center gap-10 lg:grid-cols-2 lg:gap-16',
          reverse && 'lg:[&>*:first-child]:order-2',
        )}
      >
        <div className="flex flex-col gap-5">
          {eyebrow && (
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-600">
              {eyebrow}
            </span>
          )}
          <h2 className="text-3xl font-bold text-ink-900 md:text-4xl">{title}</h2>
          {richText && (
            <RichText className="mb-0 text-ink-500" data={richText} enableGutter={false} />
          )}
          {link?.label && (
            <CMSLink
              {...link}
              appearance="default"
              size="sm"
              className="mt-2 self-start"
            />
          )}
        </div>

        {hasImages && (
          <div className="relative grid gap-4">
            {images.map(({ image, id }, i) => {
              if (!image || typeof image !== 'object') return null

              return (
                <div
                  className={cn(
                    'relative overflow-hidden rounded-2xl border border-border',
                    images.length > 1 && i === 0 && 'mr-12',
                    images.length > 1 && i === 1 && 'ml-12 -mt-8 aspect-[4/3] lg:absolute lg:bottom-0 lg:right-0 lg:ml-0 lg:w-2/3 lg:border-8 lg:border-white',
                  )}
                  key={id || i}
                >
                  <Media
                    className="h-full w-full"
                    imgClassName={cn('object-cover', images.length > 1 && i === 0 && 'aspect-[4/3]')}
                    resource={image}
                  />
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
