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
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'cards',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'text',
          type: 'textarea',
        },
        link({
          appearances: false,
        }),
      ],
      admin: {
        initCollapsed: true,
      },
    },
  ],
}
