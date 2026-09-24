import React from 'react'

import type { LogoCloudBlock as LogoCloudBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'

export const LogoCloudBlock: React.FC<LogoCloudBlockProps> = ({ eyebrow, logos, title }) => {
  return (
    <section className="py-16 lg:py-20">
      <div className="container flex flex-col items-center gap-10 text-center">
        <div className="flex max-w-2xl flex-col gap-3">
          {eyebrow && (
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-600">
              {eyebrow}
            </span>
          )}
          <h2 className="text-3xl font-bold text-ink-900 md:text-4xl">{title}</h2>
        </div>

        <ul className="grid w-full grid-cols-2 items-center gap-x-8 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {(logos || []).map(({ id, logo, name }, i) => {
            if (!logo || typeof logo !== 'object') return null

            return (
              <li className="flex items-center justify-center" key={id || i}>
                <Media
                  alt={name}
                  className="max-h-14 w-auto object-contain opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
                  imgClassName="max-h-14 w-auto object-contain"
                  resource={logo}
                />
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
