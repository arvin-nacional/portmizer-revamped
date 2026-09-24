import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter, Youtube } from 'lucide-react'

const socialIcons = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  x: Twitter,
  youtube: Youtube,
}

export async function Footer() {
  const footerData = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []
  const socialLinks = footerData?.socialLinks || []
  const contact = footerData?.contact

  return (
    <footer className="mt-auto bg-surface-dark text-white">
      <div className="container grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-5 lg:col-span-2">
          <Link className="flex items-center" href="/">
            <Logo className="h-10" variant="white" />
          </Link>
          {footerData?.description && (
            <p className="max-w-md text-sm leading-relaxed text-white/70">
              {footerData.description}
            </p>
          )}
          {socialLinks.length > 0 && (
            <div className="flex items-center gap-3">
              {socialLinks.map(({ platform, url, id }) => {
                const Icon = socialIcons[platform]
                return (
                  <a
                    className="flex size-9 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-brand-500 hover:bg-brand-600 hover:text-white"
                    href={url}
                    key={id || platform}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span className="sr-only">{platform}</span>
                    <Icon className="size-4" />
                  </a>
                )
              })}
            </div>
          )}
        </div>

        {navItems.length > 0 && (
          <div className="flex flex-col gap-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white">Explore</h2>
            <nav className="flex flex-col gap-3">
              {navItems.map(({ link }, i) => (
                <CMSLink
                  className="text-sm text-white/70 no-underline transition-colors hover:text-brand-400"
                  key={i}
                  {...link}
                />
              ))}
            </nav>
          </div>
        )}

        {(contact?.phone || contact?.email || contact?.address) && (
          <div className="flex flex-col gap-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white">Contact</h2>
            <ul className="flex flex-col gap-3 text-sm text-white/70">
              {contact?.phone && (
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 size-4 shrink-0 text-brand-400" />
                  <a className="hover:text-brand-400" href={`tel:${contact.phone}`}>
                    {contact.phone}
                  </a>
                </li>
              )}
              {contact?.email && (
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 size-4 shrink-0 text-brand-400" />
                  <a className="hover:text-brand-400" href={`mailto:${contact.email}`}>
                    {contact.email}
                  </a>
                </li>
              )}
              {contact?.address && (
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-brand-400" />
                  <span>{contact.address}</span>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col gap-2 py-6 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
          <span>
            &copy; {new Date().getFullYear()} Portmizer Philippines Corporation. All rights
            reserved.
          </span>
        </div>
      </div>
    </footer>
  )
}
