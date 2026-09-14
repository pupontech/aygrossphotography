import type { StructureResolver } from 'sanity/structure';

// Singletons to pin at top and exclude from generic document lists
const singletonTypes = new Set([
  'siteSettings',
  'homePage',
  'aboutPage',
  'faqPage',
  'pricingPage',
  'contactPage'
]);

export const structure: StructureResolver = (S) =>
  S.list()
    .title('AY Gross Photography CMS')
    .items([
      // Singletons group
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Site Settings')
        ),

      S.divider(),

      // Page Singletons
      S.listItem()
        .title('Pages')
        .child(
          S.list()
            .title('Pages')
            .items([
              S.listItem()
                .title('Homepage')
                .id('homePage')
                .child(
                  S.document()
                    .schemaType('homePage')
                    .documentId('homePage')
                    .title('Homepage Settings')
                ),
              S.listItem()
                .title('About Page')
                .id('aboutPage')
                .child(
                  S.document()
                    .schemaType('aboutPage')
                    .documentId('aboutPage')
                    .title('About Page Content')
                ),
              S.listItem()
                .title('FAQ Page')
                .id('faqPage')
                .child(
                  S.document()
                    .schemaType('faqPage')
                    .documentId('faqPage')
                    .title('FAQ Page Content')
                ),
              S.listItem()
                .title('Pricing Page')
                .id('pricingPage')
                .child(
                  S.document()
                    .schemaType('pricingPage')
                    .documentId('pricingPage')
                    .title('Pricing Packages')
                ),
              S.listItem()
                .title('Contact Page')
                .id('contactPage')
                .child(
                  S.document()
                    .schemaType('contactPage')
                    .documentId('contactPage')
                    .title('Contact Page Info')
                )
            ])
        ),

      S.divider(),

      // Photography Core Content
      S.listItem()
        .title('All Photographs')
        .schemaType('photo')
        .child(
          S.documentTypeList('photo')
            .title('All Photographs (Master Library)')
        ),

      S.listItem()
        .title('Galleries & Collections')
        .schemaType('gallery')
        .child(
          S.documentTypeList('gallery')
            .title('Galleries')
        ),

      S.divider(),

      // Testimonials
      S.listItem()
        .title('Client Testimonials')
        .schemaType('testimonial')
        .child(
          S.documentTypeList('testimonial')
            .title('Testimonials')
        ),

      // Filter out singletons from remaining default document lists
      ...S.documentTypeListItems().filter(
        (listItem: any) =>
          !singletonTypes.has(listItem.getId() || '') &&
          !['photo', 'gallery', 'testimonial'].includes(listItem.getId() || '')
      )
    ]);
