import type { Block } from 'payload'

import { link } from '@/fields/link'

export const Showcase: Block = {
  slug: 'showcase',
  interfaceName: 'ShowcaseBlock',
  labels: {
    singular: 'Showcase',
    plural: 'Showcases',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: 'Our Products',
    },
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Only the Best for Customers',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue:
        'We provide top-tier machinery services for a range of high-performance equipment, ensuring optimal operation and safety in your port operations.',
    },
    {
      name: 'cards',
      type: 'array',
      required: true,
      defaultValue: [
        {
          title: 'Kalmar Port and Terminal System',
          text: 'Kalmar offers a wide range of cargo handling solutions and services to ports, terminals, distribution centres and to heavy industry.',
          link: { type: 'custom', label: 'Learn more', url: '/products' },
        },
        {
          title: 'Sumitomo Rubber Industries',
          text: "Sumitomo Rubber Industry is the world's top rubber fender producer, meeting global needs with advanced technology and high quality.",
          link: { type: 'custom', label: 'Learn more', url: '/products' },
        },
        {
          title: 'Dafo Vehicle Fire Protection',
          text: 'Dafo offers complete extinguishing systems for heavy vehicles, ships and buses — protecting people and equipment where it matters most.',
          link: { type: 'custom', label: 'Learn more', url: '/products' },
        },
      ],
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'title',
          type: 'text',
          defaultValue: 'New product',
          required: true,
        },
        {
          name: 'text',
          type: 'textarea',
          defaultValue: 'Describe the product or service and what it delivers for your port operations.',
        },
        link({
          appearances: false,
          overrides: {
            defaultValue: { type: 'custom', label: 'Learn more', url: '/products' },
          },
        }),
      ],
      admin: {
        initCollapsed: true,
      },
    },
  ],
}
