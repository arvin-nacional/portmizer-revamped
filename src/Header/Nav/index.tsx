'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import { MenuIcon, SearchIcon, XIcon } from 'lucide-react'

type Props = {
  data: HeaderType
  mobileOpen: boolean
  onMobileToggle: (open: boolean) => void
}

export const HeaderNav: React.FC<Props> = ({ data, mobileOpen, onMobileToggle }) => {
  const navItems = data?.navItems || []
  const ctaLink = data?.cta?.link

  return (
    <React.Fragment>
      <nav className="hidden items-center gap-8 lg:flex">
        {navItems.map(({ link }, i) => (
          <CMSLink
            key={i}
            {...link}
            appearance="link"
            className="text-sm font-medium text-ink-700 no-underline transition-colors hover:text-brand-600"
          />
        ))}
      </nav>

      <div className="flex items-center gap-3">
        <Link
          className="hidden text-ink-700 transition-colors hover:text-brand-600 lg:block"
          href="/search"
        >
          <span className="sr-only">Search</span>
          <SearchIcon className="w-5" />
        </Link>

        {ctaLink && (
          <CMSLink {...ctaLink} appearance="default" size="sm" className="hidden lg:inline-flex" />
        )}

        <button
          aria-expanded={mobileOpen}
          aria-label="Toggle navigation"
          className="text-ink-900 lg:hidden"
          onClick={() => onMobileToggle(!mobileOpen)}
          type="button"
        >
          {mobileOpen ? <XIcon className="w-6" /> : <MenuIcon className="w-6" />}
        </button>
      </div>

      <div
        className={cn(
          'absolute inset-x-0 top-20 border-b border-border bg-background lg:hidden',
          mobileOpen ? 'block' : 'hidden',
        )}
      >
        <nav className="container flex flex-col gap-4 py-6">
          {navItems.map(({ link }, i) => (
            <CMSLink
              key={i}
              {...link}
              appearance="link"
              className="text-base font-medium text-ink-700 no-underline"
            />
          ))}
          <Link className="text-base font-medium text-ink-700" href="/search">
            Search
          </Link>
          {ctaLink && <CMSLink {...ctaLink} appearance="default" className="self-start" />}
        </nav>
      </div>
    </React.Fragment>
  )
}
