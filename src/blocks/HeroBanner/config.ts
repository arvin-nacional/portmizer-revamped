import type { Block } from 'payload'

import { link } from '@/fields/link'
export const HeroBanner: Block = {
  slug: 'heroBanner',
  interfaceName: 'HeroBannerBlock',
  labels: {
    singular: 'Hero banner',
    plural: 'Hero banners',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: 'Since 1990',
    },
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Driving Excellence in Port and Container Handling',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue:
        "At Portmizer, we don't just provide equipment — we provide peace of mind. Trust us to be your steadfast partner in driving progress and achieving operational excellence in the dynamic world of port and container handling.",
    },
    link({
      appearances: false,
      overrides: {
        defaultValue: { type: 'custom', label: 'Ask for a free consult', url: '/contact' },
      },
    }),
    {
      name: 'slides',
      type: 'array',
      label: 'Background slides',
      minRows: 1,
      required: true,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
      admin: {
        initCollapsed: true,
      },
    },
  ],
}
