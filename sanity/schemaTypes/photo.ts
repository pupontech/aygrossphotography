import { defineField, defineType } from 'sanity';

export const photo = defineType({
  name: 'photo',
  title: 'Portfolio Photo',
  type: 'document',
  fields: [
    defineField({
      name: 'internalTitle',
      title: 'Internal Title',
      type: 'string',
      description: 'Descriptive title for studio identification and organization',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'image',
      title: 'Photograph',
      type: 'image',
      options: {
        hotspot: true,
        metadata: ['blurhash', 'lqip', 'palette']
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      description: 'Accurate text description for accessibility and screen readers (Mandatory for publication)',
      validation: (Rule) => Rule.required().error('Alt text is required for accessibility')
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Optional subtle caption displayed within the lightbox'
    }),
    defineField({
      name: 'location',
      title: 'Location Photographed',
      type: 'string',
      description: 'e.g. Jerusalem, Old City, Yemin Moshe'
    }),
    defineField({
      name: 'datePhotographed',
      title: 'Date Photographed',
      type: 'date',
      options: { dateFormat: 'YYYY-MM-DD' }
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      description: 'Tags for internal editorial categorization and search'
    }),
    defineField({
      name: 'featured',
      title: 'Featured Photo',
      type: 'boolean',
      initialValue: false,
      description: 'Candidate for automatic homepage display when not manually overridden'
    }),
    defineField({
      name: 'internalNotes',
      title: 'Internal Notes',
      type: 'text',
      rows: 2,
      description: 'Private editor notes (never published publicly)'
    }),
    // Migration audit tracking fields
    defineField({
      name: 'legacyFilename',
      title: 'Legacy Filename',
      type: 'string',
      readOnly: true,
      hidden: ({ currentUser }) => !currentUser
    }),
    defineField({
      name: 'legacySourceUrl',
      title: 'Legacy Source URL',
      type: 'url',
      readOnly: true,
      hidden: ({ currentUser }) => !currentUser
    }),
    defineField({
      name: 'legacyWordPressMediaId',
      title: 'Legacy WordPress Media ID',
      type: 'number',
      readOnly: true,
      hidden: ({ currentUser }) => !currentUser
    }),
    defineField({
      name: 'migrationHash',
      title: 'Migration SHA-256 Hash',
      type: 'string',
      readOnly: true,
      hidden: ({ currentUser }) => !currentUser
    })
  ],
  preview: {
    select: {
      title: 'internalTitle',
      media: 'image',
      alt: 'alt',
      featured: 'featured'
    },
    prepare({ title, media, alt, featured }) {
      return {
        title: title || 'Untitled Photo',
        subtitle: `${featured ? '★ Featured | ' : ''}${alt ? alt : 'Missing alt text'}`,
        media
      };
    }
  }
});
