import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from './types';

// Standalone builder for Sanity image URLs
const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID || 'dummy_project_id';
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production';

export const builder = imageUrlBuilder({
  projectId,
  dataset
});

/**
 * Basic image URL builder with auto-format and sensible quality.
 */
export function urlFor(source: SanityImageSource) {
  // If the asset has a direct source URL (e.g. from migration fallback), handle gracefully
  if (typeof source?.asset?.url === 'string' && source.asset.url.startsWith('http') && !source?.asset?._ref) {
    return {
      width: (_w: number) => ({
        quality: (_q: number) => ({
          auto: (_fmt: string) => ({
            url: () => source.asset.url as string
          }),
          url: () => source.asset.url as string
        }),
        url: () => source.asset.url as string
      }),
      url: () => source.asset.url as string
    };
  }

  return builder
    .image(source)
    .auto('format')
    .quality(85);
}

/**
 * Generate a responsive srcSet string for a given image source and list of widths.
 * Caps at max available or sensible long edge (never exposes print-resolution masters).
 */
export function buildSrcSet(source: SanityImageSource, widths: number[] = [480, 768, 1024, 1440, 1920]) {
  // Fallback for direct URLs
  if (typeof source?.asset?.url === 'string' && source.asset.url.startsWith('http') && !source?.asset?._ref) {
    return `${source.asset.url} 1200w`;
  }

  return widths
    .map((w) => {
      const url = builder
        .image(source)
        .width(w)
        .auto('format')
        .quality(85)
        .fit('max')
        .url();
      return `${url} ${w}w`;
    })
    .join(', ');
}

/**
 * Formats a lightbox-ready transformed URL capped at max 2200px width.
 * Prevents casual scraping of original print-resolution masters.
 */
export function getLightboxImageUrl(source: SanityImageSource, maxWidth = 2200) {
  if (typeof source?.asset?.url === 'string' && source.asset.url.startsWith('http') && !source?.asset?._ref) {
    return source.asset.url;
  }

  return builder
    .image(source)
    .width(maxWidth)
    .auto('format')
    .quality(86)
    .fit('max')
    .url();
}

/**
 * Generates low-quality image placeholder URL or thumbnail.
 */
export function getLqipUrl(source: SanityImageSource) {
  if (typeof source?.asset?.url === 'string' && source.asset.url.startsWith('http') && !source?.asset?._ref) {
    return source.asset.url;
  }

  return builder
    .image(source)
    .width(24)
    .blur(50)
    .auto('format')
    .quality(20)
    .url();
}
