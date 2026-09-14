export interface SanityImageSource {
  _type?: 'image';
  asset: {
    _ref?: string;
    _type?: 'reference';
    url?: string;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  alt?: string;
}

export interface SeoData {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: SanityImageSource;
  noIndex?: boolean;
}

export interface Photo {
  _id: string;
  _type: 'photo';
  internalTitle: string;
  image: SanityImageSource;
  alt: string;
  caption?: string;
  location?: string;
  datePhotographed?: string;
  tags?: string[];
  featured?: boolean;
  legacyFilename?: string;
  legacySourceUrl?: string;
  legacyWordPressMediaId?: number;
  migrationHash?: string;
}

export interface Gallery {
  _id: string;
  _type: 'gallery';
  title: string;
  slug: {
    current: string;
  };
  categoryType: string;
  intro?: string;
  coverPhoto?: Photo;
  photos: Photo[];
  seo?: SeoData;
}

export interface SiteSettings {
  _id: string;
  _type: 'siteSettings';
  businessName: string;
  shortName: string;
  siteDescription: string;
  logo?: SanityImageSource;
  email: string;
  phone: string;
  whatsApp: string;
  whatsapp?: string;
  location: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
  };
  editingServicesUrl: string;
  defaultSeo?: SeoData;
  footerText: string;
}

export interface HomePageData {
  _id: string;
  _type: 'homePage';
  heading: string;
  supportingCopy?: string;
  featuredPhotos: Photo[];
  ctaLabel?: string;
  ctaDestination?: string;
  seo?: SeoData;
}

export interface AboutPageData {
  _id: string;
  _type: 'aboutPage';
  title: string;
  portrait?: SanityImageSource;
  portraitAlt?: string;
  bioParagraphs: string[];
  bio?: string[];
  seo?: SeoData;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqPageData {
  _id: string;
  _type: 'faqPage';
  title: string;
  intro?: string;
  faqs: FaqItem[];
  seo?: SeoData;
}

export interface PricingPackage {
  name: string;
  shortDescription?: string;
  priceText: string;
  features?: string[];
  ctaLabel?: string;
  ctaDestination?: string;
}

export interface PricingPageData {
  _id: string;
  _type: 'pricingPage';
  heading: string;
  introduction?: string;
  packages: PricingPackage[];
  customNote?: string;
  seo?: SeoData;
}

export interface ContactPageData {
  _id: string;
  _type: 'contactPage';
  heading: string;
  intro?: string;
  letterbirdUser: string;
  letterbirdUsername?: string;
  email: string;
  phone: string;
  whatsApp: string;
  whatsapp?: string;
  location: string;
  responseTime?: string;
  seo?: SeoData;
}

export interface Testimonial {
  _id: string;
  _type: 'testimonial';
  clientName: string;
  clientCompany?: string;
  quote: string;
  featured?: boolean;
  order?: number;
}

// Convenient type aliases
export type SanityPhoto = Photo;
export type SanitySiteSettings = SiteSettings;
export type SanitySEO = SeoData;
export type SanityGallery = Gallery;

