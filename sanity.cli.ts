import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: process.env.PUBLIC_SANITY_PROJECT_ID || '8wvwf5ai',
    dataset: process.env.PUBLIC_SANITY_DATASET || 'production'
  },
  studioHost: 'aygrossphotography',
  deployment: {
    appId: 'gt8ujk3sq28mdjd48t67ar9n'
  }
});
