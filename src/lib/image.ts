import type { ImageSource } from './types';

/**
 * For images with direct URLs (e.g. WordPress legacy URLs),
 * simply returns the URL. No CDN transform needed.
 */
export function getImageUrl(source: ImageSource | string): string {
  if (!source) return '';
  if (typeof source === 'string') return source;
  return source?.asset?.url || '';
}

/**
 * For responsive srcset, returns the direct URL since we're
 * serving full-resolution images from static hosting.
 */
export function buildSrcSet(source: ImageSource | string, _widths?: number[]): string {
  const url = getImageUrl(source);
  return url ? `${url} 1200w` : '';
}

/**
 * Returns a lightbox-ready image URL.
 */
export function getLightboxImageUrl(source: ImageSource | string, _maxWidth?: number): string {
  return getImageUrl(source);
}

/**
 * Chainable builder helper for backward compatibility with urlFor(image).width(...).url()
 */
export function urlFor(source: ImageSource | string) {
  const url = getImageUrl(source);
  const self = {
    width: (_w?: number) => self,
    height: (_h?: number) => self,
    fit: (_f?: string) => self,
    quality: (_q?: number) => self,
    auto: (_a?: string) => self,
    url: () => url,
    toString: () => url
  };
  return self;
}
