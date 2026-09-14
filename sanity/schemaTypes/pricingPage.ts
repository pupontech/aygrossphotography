import { defineField, defineType } from 'sanity';

export const pricingPage = defineType({
  name: 'pricingPage',
  title: 'Pricing Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Page Heading',
      type: 'string',
      initialValue: 'Investment & Packages',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'introduction',
      title: 'Introduction Copy',
      type: 'text',
      rows: 3,
      initialValue: 'All sessions include individually hand-edited, high-resolution photographs delivered via a private online gallery with full print release and industry-leading turnaround times.'
    }),
    defineField({
      name: 'packages',
      title: 'Photography Packages',
      type: 'array',
      of: [
        defineField({
          name: 'packageItem',
          title: 'Package',
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Package Name',
              type: 'string',
              validation: (Rule) => Rule.required()
            }),
            defineField({
              name: 'shortDescription',
              title: 'Short Description',
              type: 'string'
            }),
            defineField({
              name: 'priceText',
              title: 'Price Display Text',
              type: 'string',
              description: 'e.g. "Starting at ₪1,200", "Custom Quote", "Contact for details"',
              validation: (Rule) => Rule.required()
            }),
            defineField({
              name: 'features',
              title: 'Included Features',
              type: 'array',
              of: [{ type: 'string' }]
            }),
            defineField({
              name: 'ctaLabel',
              title: 'CTA Button Label',
              type: 'string',
              initialValue: 'Inquire Now'
            }),
            defineField({
              name: 'ctaDestination',
              title: 'CTA Destination Link',
              type: 'string',
              initialValue: '/contact'
            })
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'priceText'
            }
          }
        })
      ]
    }),
    defineField({
      name: 'customNote',
      title: 'Additional Notes / Print Information',
      type: 'text',
      rows: 2,
      initialValue: 'Custom albums, wall art, and physical print delivery across Israel and direct to the USA are available upon request.'
    }),
    defineField({
      name: 'seo',
      title: 'Pricing SEO Overrides',
      type: 'seo'
    })
  ],
  preview: {
    select: {
      title: 'heading'
    }
  }
});
