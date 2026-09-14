import { defineField, defineType } from 'sanity';

export const gallery = defineType({
  name: 'gallery',
  title: 'Gallery Collection',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Gallery Title',
      type: 'string',
      description: 'Public title of the gallery (e.g. Portraits, Events)',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'categoryType',
      title: 'Category Type',
      type: 'string',
      description: 'Category key for grouping (e.g. portraits, events, simchas)',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'intro',
      title: 'Introductory Text',
      type: 'text',
      rows: 3,
      description: 'Optional introductory paragraph displayed above the photography grid'
    }),
    defineField({
      name: 'coverPhoto',
      title: 'Cover Photograph',
      type: 'reference',
      to: [{ type: 'photo' }],
      description: 'Photograph used as gallery cover or thumbnail preview'
    }),
    defineField({
      name: 'photos',
      title: 'Gallery Photographs (Manual Editorial Order)',
      description: 'Drag and drop photos to customize gallery sequence. Photographs are reusable references.',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'photo' }]
        }
      ],
      validation: (Rule) => Rule.unique()
    }),
    defineField({
      name: 'seo',
      title: 'SEO Overrides',
      type: 'seo'
    })
  ],
  preview: {
    select: {
      title: 'title',
      category: 'categoryType',
      photos: 'photos',
      cover: 'coverPhoto.image'
    },
    prepare({ title, category, photos, cover }) {
      const count = photos ? photos.length : 0;
      return {
        title,
        subtitle: `${category ? `[${category}] ` : ''}${count} photograph${count === 1 ? '' : 's'}`,
        media: cover
      };
    }
  }
});
