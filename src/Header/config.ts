import type { Field, GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

const makeOptional = (field: Field): Field => {
  const next = { ...field }

  if ('required' in next) next.required = false
  if ('fields' in next) next.fields = next.fields.map(makeOptional)

  return next
}

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'cta',
      type: 'group',
      label: 'Call to action',
      admin: {
        description: 'Leave the label empty to hide the call to action button.',
      },
      fields: [
        makeOptional(
          link({
            appearances: false,
          }),
        ),
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
