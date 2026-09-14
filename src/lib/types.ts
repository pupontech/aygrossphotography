// Clean type definitions for site content — no CMS dependency

export interface ImageSource {
  asset: {
    url: string;
  };
  alt?: string;
}

export interface SeoData {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: ImageSource;
  noIndex?: boolean;
}

export interface Photo {
  id: string;
  internalTitle: string;
  image: ImageSource;
  alt: string;
  caption?: string;
  location?: string;
  datePhotographed?: string;
  tags?: string[];
  featured?: boolean;
}

export interface Gallery {
  title: string;
  slug: string;
  categoryType: string;
  intro?: string;
  coverPhoto?: Photo;
  photos: Photo[];
  seo?: SeoData;
}

export interface SiteSettings {
  businessName: string;
  shortName: string;
  siteDescription: string;
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
  heading: string;
  supportingCopy?: string;
  featuredPhotos: Photo[];
  ctaLabel?: string;
  ctaDestination?: string;
  seo?: SeoData;
}

export interface AboutPageData {
  title: string;
  portrait?: ImageSource;
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
  heading: string;
  introduction?: string;
  packages: PricingPackage[];
  customNote?: string;
  seo?: SeoData;
}

export interface ContactPageData {
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
  clientName: string;
  quote: string;
  featured?: boolean;
  order?: number;
}

