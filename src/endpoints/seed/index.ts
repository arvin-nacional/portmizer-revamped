import type { CollectionSlug, GlobalSlug, Payload, PayloadRequest, File } from 'payload'

import { contactForm as contactFormData } from './contact-form'
import { contact as contactPageData } from './contact-page'
import { home } from './home'
import { image1 } from './image-1'
import { image2 } from './image-2'
import { imageHero1 } from './image-hero-1'
import { post1 } from './post-1'
import { post2 } from './post-2'
import { post3 } from './post-3'

const collections: CollectionSlug[] = [
  'categories',
  'media',
  'pages',
  'posts',
  'forms',
  'form-submissions',
  'search',
]

const globals: GlobalSlug[] = ['header', 'footer']

const categories = ['Technology', 'News', 'Finance', 'Design', 'Software', 'Engineering']

// Next.js revalidation errors are normal when seeding the database without a server running
// i.e. running `yarn seed` locally instead of using the admin UI within an active app
// The app is not running to revalidate the pages and so the API routes are not available
// These error messages can be ignored: `Error hitting revalidate route for...`
export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Seeding database...')

  // we need to clear the media directory before seeding
  // as well as the collections and globals
  // this is because while `yarn seed` drops the database
  // the custom `/api/seed` endpoint does not
  payload.logger.info(`— Clearing collections and globals...`)

  // clear the database
  await Promise.all(
    globals.map((global) =>
      payload.updateGlobal({
        slug: global,
        data: {
          navItems: [],
        },
        depth: 0,
        context: {
          disableRevalidate: true,
        },
      }),
    ),
  )

  await Promise.all(
    collections.map((collection) => payload.db.deleteMany({ collection, req, where: {} })),
  )

  await Promise.all(
    collections
      .filter((collection) => Boolean(payload.collections[collection].config.versions))
      .map((collection) => payload.db.deleteVersions({ collection, req, where: {} })),
  )

  payload.logger.info(`— Seeding demo author and user...`)

  await payload.delete({
    collection: 'users',
    depth: 0,
    where: {
      email: {
        equals: 'demo-author@example.com',
      },
    },
  })

  payload.logger.info(`— Seeding media...`)

  const [image1Buffer, image2Buffer, image3Buffer, hero1Buffer] = await Promise.all([
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/3.x/templates/website/src/endpoints/seed/image-post1.webp',
    ),
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/3.x/templates/website/src/endpoints/seed/image-post2.webp',
    ),
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/3.x/templates/website/src/endpoints/seed/image-post3.webp',
    ),
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/3.x/templates/website/src/endpoints/seed/image-hero1.webp',
    ),
  ])

  const portmizerAssets = [
    { url: 'https://www.portmizer.com/assets/images/slider-2.jpg', alt: 'Port and container handling operations' },
    { url: 'https://www.portmizer.com/assets/images/home-about-image1.svg', alt: 'Portmizer operations' },
    { url: 'https://www.portmizer.com/assets/images/home-about-image2.svg', alt: 'Portmizer team' },
    { url: 'https://www.portmizer.com/assets/images/home-product-kalmar.jpg', alt: 'Kalmar Port and Terminal System' },
    { url: 'https://www.portmizer.com/assets/images/home-product-sumitomo.jpg', alt: 'Sumitomo Rubber Industries' },
    { url: 'https://www.portmizer.com/assets/images/home-product-dafo.jpg', alt: 'Dafo Vehicle Fire Protection' },
    { url: 'https://www.portmizer.com/assets/images/home-product-tecContainer.jpg', alt: 'Tec Container' },
    { url: 'https://www.portmizer.com/assets/images/home-products-mantsinen.jpg', alt: 'Mantsinen Mobile Harbor Crane' },
    { url: 'https://www.portmizer.com/assets/images/home-product-actiw.jpg', alt: 'Actiw Loadplate' },
    { url: 'https://www.portmizer.com/assets/images/services1.jpg', alt: 'Genuine Spare Parts' },
    { url: 'https://www.portmizer.com/assets/images/preventive-maintenance.jpg', alt: 'Preventive Maintenance' },
    { url: 'https://www.portmizer.com/assets/images/services3.jpg', alt: 'Performance Upgrade' },
    { url: 'https://www.portmizer.com/assets/images/services4.jpg', alt: 'Conversions and Overhauling' },
    { url: 'https://www.portmizer.com/assets/images/training.jpg', alt: 'Maintenance and Operators Training' },
    ...[0, 1, 2, 3, 4, 5, 6, 7].map((n) => ({
      url: `https://www.portmizer.com/assets/logo/${n}.svg`,
      alt: `Client logo ${n + 1}`,
    })),
    ...[1, 2, 3, 4, 5, 6].map((n) => ({
      url: `https://www.portmizer.com/assets/logo/partner-logo-${n}.${n === 1 ? 'png' : 'svg'}`,
      alt: `Partner logo ${n}`,
    })),
  ]

  const portmizerBuffers = await Promise.all(
    portmizerAssets.map((asset) => fetchFileByURL(asset.url)),
  )

  const portmizerMedia = await Promise.all(
    portmizerAssets.map((asset, i) =>
      payload.create({
        collection: 'media',
        data: { alt: asset.alt },
        file: portmizerBuffers[i],
      }),
    ),
  )

  const [heroImage, aboutImage1, aboutImage2, ...restMedia] = portmizerMedia
  const productImages = restMedia.slice(0, 6)
  const serviceImages = restMedia.slice(6, 11)
  const clientLogos = restMedia.slice(11, 19)
  const partnerLogos = restMedia.slice(19, 25)
  const aboutImages = [aboutImage1, aboutImage2].filter(Boolean)

  const [demoAuthor, image1Doc, image2Doc, image3Doc] = await Promise.all([
    payload.create({
      collection: 'users',
      data: {
        name: 'Demo Author',
        email: 'demo-author@example.com',
        password: 'password',
      },
    }),
    payload.create({
      collection: 'media',
      data: image1,
      file: image1Buffer,
    }),
    payload.create({
      collection: 'media',
      data: image2,
      file: image2Buffer,
    }),
    payload.create({
      collection: 'media',
      data: image2,
      file: image3Buffer,
    }),
    payload.create({
      collection: 'media',
      data: imageHero1,
      file: hero1Buffer,
    }),
    categories.map((category) =>
      payload.create({
        collection: 'categories',
        data: {
          title: category,
          slug: category,
        },
      }),
    ),
  ])

  payload.logger.info(`— Seeding posts...`)

  // Do not create posts with `Promise.all` because we want the posts to be created in order
  // This way we can sort them by `createdAt` or `publishedAt` and they will be in the expected order
  const post1Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: post1({ heroImage: image1Doc, blockImage: image2Doc, author: demoAuthor }),
  })

  const post2Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: post2({ heroImage: image2Doc, blockImage: image3Doc, author: demoAuthor }),
  })

  const post3Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: post3({ heroImage: image3Doc, blockImage: image1Doc, author: demoAuthor }),
  })

  // update each post with related posts
  await payload.update({
    id: post1Doc.id,
    collection: 'posts',
    data: {
      relatedPosts: [post2Doc.id, post3Doc.id],
    },
  })
  await payload.update({
    id: post2Doc.id,
    collection: 'posts',
    data: {
      relatedPosts: [post1Doc.id, post3Doc.id],
    },
  })
  await payload.update({
    id: post3Doc.id,
    collection: 'posts',
    data: {
      relatedPosts: [post1Doc.id, post2Doc.id],
    },
  })

  payload.logger.info(`— Seeding contact form...`)

  const contactForm = await payload.create({
    collection: 'forms',
    depth: 0,
    data: contactFormData,
  })

  payload.logger.info(`— Seeding pages...`)

  const [_, contactPage] = await Promise.all([
    payload.create({
      collection: 'pages',
      depth: 0,
      data: home({
        heroImage,
        aboutImages,
        productImages,
        serviceImages,
        clientLogos,
        partnerLogos,
        metaImage: image2Doc,
      }),
    }),
    payload.create({
      collection: 'pages',
      depth: 0,
      data: contactPageData({ contactForm: contactForm }),
    }),
  ])

  payload.logger.info(`— Seeding globals...`)

  await Promise.all([
    payload.updateGlobal({
      slug: 'header',
      data: {
        navItems: [
          {
            link: {
              type: 'custom',
              label: 'Products',
              url: '/products',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'Services',
              url: '/services',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'Locations',
              url: '/locations',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'Posts',
              url: '/posts',
            },
          },
        ],
        cta: {
          link: {
            type: 'reference',
            label: 'Contact Us',
            reference: {
              relationTo: 'pages',
              value: contactPage.id,
            },
          },
        },
      },
    }),
    payload.updateGlobal({
      slug: 'footer',
      data: {
        description:
          'Portmizer Philippines Corporation supplies and services port and material handling equipment, delivering only the best for its customers.',
        contact: {
          phone: '02-85245514',
          email: 'info@portmizer.com',
          address:
            'Rm. 117 Mercantile Insurance Bldg. Gen. Luna St. corner Beaterio St. Intramuros, Manila 1002',
        },
        socialLinks: [
          { platform: 'facebook', url: 'https://www.facebook.com/portmizer' },
          { platform: 'instagram', url: 'https://www.instagram.com/portmizer' },
          { platform: 'linkedin', url: 'https://www.linkedin.com/company/portmizer' },
        ],
        navItems: [
          {
            link: {
              type: 'custom',
              label: 'Products',
              url: '/products',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'Services',
              url: '/services',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'Locations',
              url: '/locations',
            },
          },
          {
            link: {
              type: 'reference',
              label: 'Contact',
              reference: {
                relationTo: 'pages',
                value: contactPage.id,
              },
            },
          },
        ],
      },
    }),
  ])

  payload.logger.info('Seeded database successfully!')
}

async function fetchFileByURL(url: string): Promise<File> {
  const res = await fetch(url, {
    credentials: 'include',
    method: 'GET',
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch file from ${url}, status: ${res.status}`)
  }

  const data = await res.arrayBuffer()

  return {
    name: url.split('/').pop() || `file-${Date.now()}`,
    data: Buffer.from(data),
    mimetype: `image/${url.split('.').pop()}`,
    size: data.byteLength,
  }
}
