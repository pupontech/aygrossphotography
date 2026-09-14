import { defineField, defineType } from 'sanity';

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Client Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'clientName',
      title: 'Client Name / Family',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'clientCompany',
      title: 'Company / Organization (Optional)',
      type: 'string'
    }),
    defineField({
      name: 'quote',
      title: 'Testimonial Quote',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'featured',
      title: 'Feature on Homepage',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0
    })
  ],
  preview: {
    select: {
      title: 'clientName',
      subtitle: 'quote',
      featured: 'featured'
    },
    prepare({ title, subtitle, featured }) {
      return {
        title,
        subtitle: `${featured ? '★ Featured | ' : ''}${subtitle ? subtitle.slice(0, 60) + '...' : ''}`
      };
    }
  }
});
