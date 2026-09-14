import { defineField, defineType } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'businessName',
      title: 'Business Name',
      type: 'string',
      initialValue: 'AY Gross Photography',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'shortName',
      title: 'Short Name / Branding',
      type: 'string',
      initialValue: 'AY Gross',
      description: 'Used in compact header and mobile view'
    }),
    defineField({
      name: 'siteDescription',
      title: 'Site Description',
      type: 'text',
      rows: 2,
      initialValue: 'Jerusalem & Israel family portrait and event photographer. Natural, candid, joyful photography.'
    }),
    defineField({
      name: 'logo',
      title: 'Logo Image',
      type: 'image',
      description: 'Transparent SVG or high-res PNG branding mark',
      options: { hotspot: true }
    }),
    defineField({
      name: 'email',
      title: 'Contact Email',
      type: 'string',
      initialValue: 'aygrossphotography@gmail.com',
      validation: (Rule) => Rule.email()
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      initialValue: '058-772-5628'
    }),
    defineField({
      name: 'whatsApp',
      title: 'WhatsApp Number / Link',
      type: 'string',
      initialValue: '+972587725628',
      description: 'International format (e.g. +972587725628)'
    }),
    defineField({
      name: 'location',
      title: 'Base Location & Service Area',
      type: 'string',
      initialValue: 'Kiryat Yearim, Jerusalem & all of Israel'
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        defineField({ name: 'facebook', title: 'Facebook Page URL', type: 'url' }),
        defineField({ name: 'instagram', title: 'Instagram Profile URL', type: 'url' })
      ]
    }),
    defineField({
      name: 'editingServicesUrl',
      title: 'Editing Services External URL',
      type: 'url',
      initialValue: 'https://darkroomedits.com/',
      description: 'Destination for the "Editing Services ↗" sidebar link',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'defaultSeo',
      title: 'Default SEO Metadata',
      type: 'seo'
    }),
    defineField({
      name: 'footerText',
      title: 'Footer Copyright Text',
      type: 'string',
      initialValue: '© AY Gross Photography. All rights reserved.'
    })
  ],
  preview: {
    select: {
      title: 'businessName',
      subtitle: 'email',
      media: 'logo'
    }
  }
});
