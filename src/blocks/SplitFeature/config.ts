import type { Block } from 'payload'

import { link } from '@/fields/link'

export const SplitFeature: Block = {
  slug: 'splitFeature',
  interfaceName: 'SplitFeatureBlock',
  labels: {
    singular: 'Split feature',
    plural: 'Split features',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: 'About Us',
    },
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Portmizer Philippines Corporation',
      required: true,
    },
    {
      name: 'richText',
      type: 'richText',
    },
    link({
      appearances: false,
      overrides: {
        defaultValue: { type: 'custom', label: 'Find Out More', url: '/about' },
      },
    }),
    {
      name: 'images',
      type: 'array',
      maxRows: 2,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'reverse',
      type: 'checkbox',
      defaultValue: false,
      label: 'Show text on the right',
    },
  ],
}
