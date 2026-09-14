import { defineField, defineType } from 'sanity';

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Headline',
      type: 'string',
      initialValue: "I'm AY, an Israel-based photographer for family portraits and events.",
      description: 'Concise editorial headline for the homepage introduction',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'supportingCopy',
      title: 'Supporting Copy',
      type: 'text',
      rows: 2,
      description: 'Optional brief supporting sentence (keep minimal to preserve photography-first focus)'
    }),
    defineField({
      name: 'featuredPhotos',
      title: 'Curated Homepage Photography',
      description: 'Manually chosen photographs displayed on the homepage in exact sequence. If empty, the site falls back to photos flagged as "Featured".',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'photo' }]
        }
      ]
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Call To Action Label',
      type: 'string',
      initialValue: 'Book a Session'
    }),
    defineField({
      name: 'ctaDestination',
      title: 'Call To Action Destination',
      type: 'string',
      initialValue: '/contact'
    }),
    defineField({
      name: 'seo',
      title: 'Home SEO Overrides',
      type: 'seo'
    })
  ],
  preview: {
    select: {
      title: 'heading'
    },
    prepare({ title }) {
      return {
        title: 'Home Page Configuration',
        subtitle: title
      };
    }
  }
});
