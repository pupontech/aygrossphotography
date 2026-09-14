import { defineField, defineType } from 'sanity';

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: "Let's Connect",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'intro',
      title: 'Introduction Copy',
      type: 'text',
      rows: 3,
      initialValue: "Whether you're planning a family portrait session, Bar/Bat Mitzvah, Brit, or special celebration, I'd love to hear from you. Send a message below or contact me directly."
    }),
    defineField({
      name: 'letterbirdUser',
      title: 'Letterbird Username / Slug',
      type: 'string',
      initialValue: 'aygrossphotography',
      description: 'Your Letterbird form account username (embeds via official script)',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'email',
      title: 'Direct Email',
      type: 'string',
      initialValue: 'aygrossphotography@gmail.com'
    }),
    defineField({
      name: 'phone',
      title: 'Direct Phone',
      type: 'string',
      initialValue: '058-772-5628'
    }),
    defineField({
      name: 'whatsApp',
      title: 'WhatsApp Number',
      type: 'string',
      initialValue: '+972587725628'
    }),
    defineField({
      name: 'location',
      title: 'Location & Availability',
      type: 'string',
      initialValue: 'Kiryat Yearim, Jerusalem & all regions of Israel'
    }),
    defineField({
      name: 'responseTime',
      title: 'Response Time Note',
      type: 'string',
      initialValue: 'I usually answer questions within 24 hours.'
    }),
    defineField({
      name: 'seo',
      title: 'Contact SEO Overrides',
      type: 'seo'
    })
  ],
  preview: {
    select: {
      title: 'heading'
    }
  }
});
