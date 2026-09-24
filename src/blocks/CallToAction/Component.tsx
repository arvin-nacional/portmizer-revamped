import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'

export const CallToActionBlock: React.FC<CTABlockProps> = ({ links, richText }) => {
  return (
    <section className="bg-brand-600 py-14">
      <div className="container flex flex-col items-center gap-8 text-center md:flex-row md:justify-between md:text-left">
        <div className="max-w-3xl">
          {richText && (
            <RichText
              className="mb-0 text-2xl font-semibold text-white md:text-3xl"
              data={richText}
              enableGutter={false}
            />
          )}
        </div>
        <div className="flex shrink-0 flex-col gap-4 sm:flex-row">
          {(links || []).map(({ link }, i) => {
            return (
              <CMSLink
                className="bg-white text-brand-700 hover:bg-brand-50"
                key={i}
                size="lg"
                {...link}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
