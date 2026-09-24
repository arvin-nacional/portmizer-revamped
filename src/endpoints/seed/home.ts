import type { RequiredDataFromCollectionSlug } from 'payload'
import type { Media } from '@/payload-types'

type HomeArgs = {
  heroImage: Media
  aboutImages: Media[]
  productImages: Media[]
  serviceImages: Media[]
  clientLogos: Media[]
  partnerLogos: Media[]
  metaImage: Media
}

type Node = { [k: string]: unknown; type: string; version: number }

const textNode = (text: string): Node => ({
  type: 'text',
  detail: 0,
  format: 0,
  mode: 'normal',
  style: '',
  text,
  version: 1,
})

const heading = (tag: string, text: string): Node => ({
  type: 'heading',
  children: [textNode(text)],
  direction: 'ltr',
  format: '',
  indent: 0,
  tag,
  version: 1,
})

const paragraph = (text: string): Node => ({
  type: 'paragraph',
  children: [textNode(text)],
  direction: 'ltr',
  format: '',
  indent: 0,
  textFormat: 0,
  textStyle: '',
  version: 1,
})

const richText = (...children: Node[]): RequiredDataFromCollectionSlug<'pages'>['hero']['richText'] => ({
  root: {
    type: 'root',
    children,
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  },
})

const products = [
  {
    title: 'Kalmar Port and Terminal System',
    text: 'Kalmar offers a wide range of cargo handling solutions and services to ports, terminals, distribution centres and to heavy industry.',
  },
  {
    title: 'Sumitomo Rubber Industries',
    text: "Sumitomo Rubber Industry is the world's top rubber fender producer, meeting global needs with advanced technology and high quality.",
  },
  {
    title: 'Dafo Vehicle Fire Protection',
    text: 'Dafo offers complete extinguishing systems for heavy vehicles, ships and buses — protecting people and equipment where it matters most.',
  },
  {
    title: 'Tec Container',
    text: 'Tec Container delivers specialised attachments and spreaders for container and bulk handling across ports and terminals worldwide.',
  },
  {
    title: 'Mantsinen Mobile Harbor Crane',
    text: 'Mantsinen cranes set the standard in material handling, combining reach, capacity and efficiency for demanding port operations.',
  },
  {
    title: 'Actiw Loadplate',
    text: 'Actiw Loadplate automates container stuffing and unstuffing, cutting loading times and improving safety at the warehouse door.',
  },
]

const services = [
  {
    title: 'Genuine Spare Parts',
    text: 'Supplying authentic spare parts for optimal equipment performance.',
  },
  {
    title: 'Preventive Maintenance',
    text: 'Ensuring equipment longevity and reliability through preventive maintenance.',
  },
  {
    title: 'Performance Upgrade',
    text: 'Enhancing equipment efficiency with targeted performance upgrades.',
  },
  {
    title: 'Conversions and Overhauling',
    text: 'Transforming and overhauling equipment for improved functionality and extended service life.',
  },
  {
    title: 'Maintenance and Operators Training',
    text: 'Training programs that keep your operators safe and your equipment productive.',
  },
]

export const home: (args: HomeArgs) => RequiredDataFromCollectionSlug<'pages'> = ({
  heroImage,
  aboutImages,
  productImages,
  serviceImages,
  clientLogos,
  partnerLogos,
  metaImage,
}) => {
  return {
    slug: 'home',
    _status: 'published',
    hero: {
      type: 'highImpact',
      links: [
        {
          link: {
            type: 'custom',
            appearance: 'default',
            label: 'Ask for a free consult',
            url: '/contact',
          },
        },
      ],
      media: heroImage.id,
      richText: richText(
        heading('h1', 'Driving Excellence in Port and Container Handling since 1990'),
        paragraph(
          "At Portmizer, we don't just provide equipment — we provide peace of mind. Trust us to be your steadfast partner in driving progress and achieving operational excellence in the dynamic world of port and container handling.",
        ),
      ),
    },
    layout: [
      {
        blockType: 'splitFeature',
        eyebrow: 'About Us',
        title: 'Portmizer Philippines Corporation',
        richText: richText(
          paragraph(
            'Established since 1990, Portmizer Philippines Corporation shifted its focus to catering the needs of the shipping, stevedoring and container yard operators when the demand for a more efficient and reliable container and bulk handling equipment became apparent.',
          ),
          paragraph(
            "Over our 34-year journey, we've consistently delivered genuine spare parts and top-notch crane services. Upholding the highest standards for every customer, our operations span across Service Stations worldwide, catering to a growing network of crane owners, managers, and operators.",
          ),
        ),
        link: {
          type: 'custom',
          label: 'Find Out More',
          url: '/about',
        },
        images: aboutImages.map((image) => ({ image: image.id })),
      },
      {
        blockType: 'showcase',
        eyebrow: 'Our Products',
        title: 'Only the Best for Customers',
        description:
          'We provide top-tier machinery services for a range of high-performance equipment, ensuring optimal operation and safety in your port operations. Our expertise covers:',
        cards: products.map((product, i) => ({
          image: productImages[i]?.id,
          title: product.title,
          text: product.text,
          link: {
            type: 'custom',
            label: 'Learn more',
            url: '/products',
          },
        })),
      },
      {
        blockType: 'showcase',
        eyebrow: 'Our Services',
        title: 'Parts and Engineering Services',
        description:
          'We offer genuine spare parts, preventive maintenance, performance upgrades, conversions, overhauling, and training to keep your port equipment running efficiently. Trust our experts for reliable support and solutions.',
        cards: services.map((service, i) => ({
          image: serviceImages[i]?.id,
          title: service.title,
          text: service.text,
          link: {
            type: 'custom',
            label: 'Learn more',
            url: '/services',
          },
        })),
      },
      {
        blockType: 'logoCloud',
        eyebrow: 'Our Clients',
        title: 'Our Valued Industry Clients',
        logos: clientLogos.map((logo, i) => ({
          logo: logo.id,
          name: logo.alt || `Client ${i + 1}`,
        })),
      },
      {
        blockType: 'logoCloud',
        eyebrow: 'Our Partners',
        title: 'Trusted by Leading Industry Partners',
        logos: partnerLogos.map((logo, i) => ({
          logo: logo.id,
          name: logo.alt || `Partner ${i + 1}`,
        })),
      },
      {
        blockType: 'cta',
        richText: richText(
          paragraph('Want to know more about our Products and Services?'),
        ),
        links: [
          {
            link: {
              type: 'custom',
              label: 'Ask for a free consult',
              url: '/contact',
            },
          },
        ],
      },
    ],
    meta: {
      description:
        'Portmizer Philippines Corporation — driving excellence in port and container handling since 1990. Genuine spare parts, crane services, and material handling equipment.',
      image: metaImage.id,
      title: 'Portmizer Philippines Corporation',
    },
    title: 'Home',
  }
}
