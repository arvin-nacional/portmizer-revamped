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
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'richText',
      type: 'richText',
    },
    link({
      appearances: false,
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
      label: 'Show text on the right',
    },
  ],
}
