import type { Block } from 'payload'

export const LogoCloud: Block = {
  slug: 'logoCloud',
  interfaceName: 'LogoCloudBlock',
  labels: {
    singular: 'Logo cloud',
    plural: 'Logo clouds',
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
      name: 'logos',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'name',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        initCollapsed: true,
      },
    },
  ],
}
