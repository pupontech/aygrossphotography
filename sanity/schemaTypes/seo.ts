import { defineField, defineType } from 'sanity';

export const seo = defineType({
  name: 'seo',
  title: 'SEO Settings',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Title tag for search engines (falls back to page title)',
      validation: (Rule) => Rule.max(65).warning('Longer titles may be truncated in search results')
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Brief summary for search engine snippets and social cards',
      validation: (Rule) => Rule.max(160).warning('Descriptions over 160 characters may be truncated')
    }),
    defineField({
      name: 'ogImage',
      title: 'Social Share Image',
      type: 'image',
      description: 'Image displayed when sharing this page on social platforms (1200x630 recommended)',
      options: { hotspot: true }
    }),
    defineField({
      name: 'noIndex',
      title: 'Prevent Search Indexing',
      type: 'boolean',
      initialValue: false,
      description: 'Set to true to instruct search engines not to index this page'
    })
  ]
});
