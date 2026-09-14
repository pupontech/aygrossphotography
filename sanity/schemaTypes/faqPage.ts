import { defineField, defineType } from 'sanity';

export const faqPage = defineType({
  name: 'faqPage',
  title: 'FAQ Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Frequently Asked Questions',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'intro',
      title: 'Introduction Note',
      type: 'text',
      rows: 2,
      description: 'Optional introductory note before questions'
    }),
    defineField({
      name: 'faqs',
      title: 'Questions & Answers',
      type: 'array',
      of: [
        defineField({
          name: 'faqItem',
          title: 'FAQ Item',
          type: 'object',
          fields: [
            defineField({
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: (Rule) => Rule.required()
            }),
            defineField({
              name: 'answer',
              title: 'Answer',
              type: 'text',
              rows: 4,
              validation: (Rule) => Rule.required()
            })
          ],
          preview: {
            select: {
              title: 'question'
            }
          }
        })
      ]
    }),
    defineField({
      name: 'seo',
      title: 'FAQ SEO Overrides',
      type: 'seo'
    })
  ],
  preview: {
    select: {
      title: 'title',
      faqs: 'faqs'
    },
    prepare({ title, faqs }) {
      const count = faqs ? faqs.length : 0;
      return {
        title: title || 'FAQ Page',
        subtitle: `${count} FAQ item${count === 1 ? '' : 's'}`
      };
    }
  }
});
