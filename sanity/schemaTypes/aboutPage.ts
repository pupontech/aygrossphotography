import { defineField, defineType } from 'sanity';

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'About Me',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'portrait',
      title: 'Photographer Portrait',
      type: 'image',
      description: 'Portrait of AY Gross',
      options: { hotspot: true }
    }),
    defineField({
      name: 'portraitAlt',
      title: 'Portrait Alt Text',
      type: 'string',
      initialValue: 'AY Gross holding a camera'
    }),
    defineField({
      name: 'bioParagraphs',
      title: 'Biography Content',
      type: 'array',
      of: [{ type: 'text', rows: 4 }],
      description: 'Story and background text preserved from AY Gross'
    }),
    defineField({
      name: 'seo',
      title: 'About SEO Overrides',
      type: 'seo'
    })
  ],
  preview: {
    select: {
      title: 'title',
      media: 'portrait'
    }
  }
});
