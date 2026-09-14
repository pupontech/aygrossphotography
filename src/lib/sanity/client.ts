import { createClient } from '@sanity/client';
import type {
  SiteSettings,
  HomePageData,
  AboutPageData,
  FaqPageData,
  PricingPageData,
  ContactPageData,
  Gallery,
  Testimonial
} from './types';
import {
  siteSettingsQuery,
  homePageQuery,
  galleryBySlugQuery,
  allGalleriesQuery,
  aboutPageQuery,
  faqPageQuery,
  pricingPageQuery,
  contactPageQuery,
  testimonialsQuery
} from './queries';
import {
  fallbackSiteSettings,
  fallbackHomePage,
  fallbackAboutPage,
  fallbackFaqPage,
  fallbackPricingPage,
  fallbackContactPage,
  fallbackPortraitsGallery,
  fallbackEventsGallery,
  fallbackTestimonials
} from './fixtures';

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production';
const apiVersion = import.meta.env.PUBLIC_SANITY_API_VERSION || '2024-01-01';
const token = import.meta.env.SANITY_API_READ_TOKEN;

// Is a real Sanity project configured?
export const isSanityConfigured =
  Boolean(projectId) &&
  projectId !== 'your_sanity_project_id' &&
  projectId !== 'dummy_project_id';

export const client = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      // For static production builds, avoid stale CDN cache to ensure newly published content builds immediately
      useCdn: false,
      token,
      perspective: 'published'
    })
  : null;

/**
 * Safe fetch wrapper that queries Sanity if configured, falling back to verified fixtures.
 */
async function sanityFetch<T>(query: string, params: Record<string, unknown> = {}, fallback: T): Promise<T> {
  if (!client) {
    return fallback;
  }
  try {
    const result = await client.fetch<T>(query, params);
    if (result === null || result === undefined || (Array.isArray(result) && result.length === 0)) {
      return fallback;
    }
    return result;
  } catch (error) {
    console.warn(`[Sanity Fetch Warning]: Failed to fetch query. Falling back to local fixtures.`, error);
    return fallback;
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  return sanityFetch<SiteSettings>(siteSettingsQuery, {}, fallbackSiteSettings);
}

export async function getHomePage(): Promise<HomePageData> {
  return sanityFetch<HomePageData>(homePageQuery, {}, fallbackHomePage);
}

export async function getGalleryBySlug(slug: string): Promise<Gallery | null> {
  let fallback: Gallery | null = null;
  if (slug === 'portraits') fallback = fallbackPortraitsGallery;
  if (slug === 'events' || slug === 'events-photography') fallback = fallbackEventsGallery;

  const result = await sanityFetch<Gallery | null>(galleryBySlugQuery, { slug }, fallback);
  return result;
}

export async function getAllGalleries(): Promise<Gallery[]> {
  const fallback = [fallbackPortraitsGallery, fallbackEventsGallery];
  return sanityFetch<Gallery[]>(allGalleriesQuery, {}, fallback);
}

export async function getAboutPage(): Promise<AboutPageData> {
  return sanityFetch<AboutPageData>(aboutPageQuery, {}, fallbackAboutPage);
}

export async function getFaqPage(): Promise<FaqPageData> {
  return sanityFetch<FaqPageData>(faqPageQuery, {}, fallbackFaqPage);
}

export async function getPricingPage(): Promise<PricingPageData> {
  return sanityFetch<PricingPageData>(pricingPageQuery, {}, fallbackPricingPage);
}

export async function getContactPage(): Promise<ContactPageData> {
  return sanityFetch<ContactPageData>(contactPageQuery, {}, fallbackContactPage);
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return sanityFetch<Testimonial[]>(testimonialsQuery, {}, fallbackTestimonials);
}
