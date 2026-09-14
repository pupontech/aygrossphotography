import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './sanity/schemaTypes';
import { structure } from './sanity/deskStructure';

const singletonTypes = new Set([
  'siteSettings',
  'homePage',
  'aboutPage',
  'faqPage',
  'pricingPage',
  'contactPage'
]);

export default defineConfig({
  name: 'aygrossphotography',
  title: 'AY Gross Photography',
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID || 'dummy_project_id',
  dataset: process.env.PUBLIC_SANITY_DATASET || 'production',
  plugins: [
    structureTool({ structure })
  ],
  schema: {
    types: schemaTypes,
    // Prevent creating duplicate singleton documents from the global "+ New" menu
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType))
  },
  document: {
    // Disallow deleting or unpublishing singletons
    actions: (prev, context) => {
      if (singletonTypes.has(context.schemaType)) {
        return prev.filter(({ action }) => action !== 'delete' && action !== 'unpublish' && action !== 'duplicate');
      }
      return prev;
    }
  }
});
