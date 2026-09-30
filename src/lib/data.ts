/**
 * Static site content — single source of truth.
 * Edit this file to update any text, photos, or page data on the site.
 */
import type {
  SiteSettings,
  HomePageData,
  AboutPageData,
  FaqPageData,
  PricingPageData,
  ContactPageData,
  Gallery,
  Testimonial,
  Photo
} from './types';

// ─── Helpers ────────────────────────────────────────────────

const photo = (id: string, title: string, filename: string, alt: string, featured = false): Photo => ({
  id,
  internalTitle: title,
  image: {
    asset: {
      url: `/images/photos/${filename}`
    }
  },
  alt,
  featured
});

// ─── Photos ─────────────────────────────────────────────────

export const portraitPhotos: Photo[] = [
  // pattern slot: natural — 3:2 landscape, let CSS be natural
  photo('photo-ayg8503', 'AYG8503', 'AYG8503-scaled.jpg', 'Girl smiling during outdoor portrait session', true),
  // pattern slot: natural — 1.41 ratio (slightly taller), natural variety
  photo('photo-mg6397', 'MG_6397', 'MG_6397-scaled.jpg', 'Family group portrait with parents and children', true),
  // pattern slot: tall crop — 3:2 landscape gets cropped to portrait
  photo('photo-ayg6788', 'AYG6788', 'AYG6788-scaled.jpg', 'Young boy smiling outdoors', true),
  // pattern slot: natural — 1.32 ratio, natural variety
  photo('photo-ayg160501', 'AYG160501_57', 'AYG160501_-57-scaled.jpg', 'Mother and children outdoors', true),
  // pattern slot: sq crop — 0.76 portrait image, square crop works great
  photo('photo-export0010', 'Untitled Export 0010', 'Untitled_Export-0010-scaled.jpg', 'Sisters hugging', true),
  // pattern slot: natural — 3:2 landscape
  photo('photo-ayg0704', 'AYG0704', 'AYG0704-scaled.jpg', 'Family portrait outdoors in natural sunlight', true),
  // pattern slot: natural — 3:2 landscape
  photo('photo-ayg9405', 'AYG9405', 'AYG9405-scaled.jpg', 'Children laughing together outdoors', true),
  // pattern slot: tall crop — 1.15 ratio (already tallish), cropped taller
  photo('photo-ayg160621', 'AYG160621_218_1', 'ayg160621-218_1-scaled.jpg', 'Brothers smiling together outdoors', true),
  // pattern slot: sq crop — 3:2 landscape gets cropped to square
  photo('photo-ayg7972', 'AYG7972', 'AYG7972-scaled.jpg', 'Siblings outdoors', true),
  // pattern slot: natural — 3:2 landscape
  photo('photo-mg4278', 'MG_4278', 'MG_4278-scaled.jpg', 'Baby smiling portrait', false),
  // pattern slot: natural — 3:2 landscape
  photo('photo-mg5920', 'MG_5920', 'MG_5920-scaled.jpg', 'Boy sitting on grass outdoors', false),
  // pattern slot: natural — 1.17 ratio (taller), natural variety
  photo('photo-ayg160518', 'AYG160518_105', 'AYG160518_-105-scaled.jpg', 'Outdoor child portrait with soft background', false),
  // pattern slot: natural — 3:2 landscape
  photo('photo-mg1982', 'MG_1982_Edit', 'MG_1982-Edit-scaled.jpg', 'Family sitting together smiling in Jerusalem park', true),
  // pattern slot: natural — 3:2 landscape
  photo('photo-mg4526', 'MG_4526_1', 'MG_4526_1-scaled.jpg', 'Family walking together in park', false),
  // pattern slot: tall crop — 1.29 ratio, cropped taller
  photo('photo-ayg160525', 'AYG160525_277', 'AYG160525_-277-scaled.jpg', 'Father and child', true),
  // pattern slot: natural — 3:2 landscape
  photo('photo-ayg160705', 'AYG160705_159_1', 'ayg160705-159-1-scaled.jpg', 'Boy smiling in outdoor portrait', true),
  // pattern slot: sq crop — 3:2 landscape gets cropped to square
  photo('photo-ayg0089', 'AYG0089', 'AYG0089-scaled.jpg', 'Family portrait in a grove', false),
  // pattern slot: natural — 3:2 landscape
  photo('photo-mg5960', 'MG_5960', 'mg_5960-scaled.jpg', 'Toddler playing outside', false),
  // pattern slot: natural — 3:2 landscape
  photo('photo-ayg0384', 'AYG0384', 'AYG0384-scaled.jpg', 'Brother and sister portrait', false),
  // pattern slot: natural — 3:2 landscape
  photo('photo-mg1445', 'MG_1445_Edit', 'MG_1445-Edit-scaled.jpg', 'Boy in white shirt natural portrait', false),
  // pattern slot: natural — 3:2 landscape
  photo('photo-ayg9991', 'AYG9991', 'AYG9991-scaled.jpg', 'Young girl outdoor portrait', false),
  // pattern slot: natural — 1.48 ratio
  photo('photo-mg1236', 'MG_1236', 'MG_1236-scaled.jpg', 'Family portrait in an open field', false)
];

export const eventPhotos: Photo[] = [
  // slot: natural — 3:2 landscape
  photo('photo-mg9223', 'MG_9223', 'MG_9223-scaled.jpg', 'Bar Mitzvah boy with family', true),
  // slot: natural — 3:2 landscape
  photo('photo-mg5400', 'MG_5400', 'MG_5400-scaled.jpg', 'Guests dancing at an event', true),
  // slot: tall crop — 3:2 gets cropped portrait
  photo('photo-y7633', 'Y_7633', 'Y__7633-scaled.jpg', 'Laughing at a family event', true),
  // slot: natural — 1.34 ratio (naturally taller)
  photo('photo-mg4771', 'MG_4771', 'MG_4771-scaled.jpg', 'Grandparents and children at a simcha', true),
  // slot: sq crop — 0.94 ratio (near-square), square crop fits perfectly
  photo('photo-ayg9271', 'AYG9271', 'AYG9271-scaled.jpg', 'Dinner gathering in Jerusalem', true),
  // slot: natural — 3:2 landscape
  photo('photo-ayg160626', 'AYG160626_368_1', 'ayg160626-368_1.jpg', 'Guests celebrating at a simcha', true),
  // slot: natural — 3:2 landscape
  photo('photo-ayg9192', 'AYG9192', 'AYG9192-scaled.jpg', 'Dancing at an event', true),
  // slot: tall crop — 3:2 gets cropped portrait
  photo('photo-mg9242', 'MG_9242_Edit', 'MG_9242-Edit-scaled.jpg', 'Bar Mitzvah family formal portrait', true)
];

// ─── Site Settings ──────────────────────────────────────────

export const siteSettings: SiteSettings = {
  businessName: 'AY Gross Photography',
  shortName: 'AY Gross',
  siteDescription: 'Natural, relaxed family and event photography in Jerusalem and across Israel.',
  email: 'aygrossphotography@gmail.com',
  phone: '058-772-5628',
  whatsApp: '+972587725628',
  location: 'Kiryat Yearim, Jerusalem & all of Israel',
  socialLinks: {
    facebook: 'https://www.facebook.com/Aygrossphotography'
  },
  editingServicesUrl: 'https://darkroomedits.com/',
  defaultSeo: {
    metaTitle: 'AY Gross Photography | Family Portraits & Events in Jerusalem & Israel',
    metaDescription: "Jerusalem & Israel based photographer specializing in natural family portraits, kids, and events. Fast turnaround and reasonable pricing."
  },
  footerText: '© AY Gross Photography. All rights reserved.'
};

// ─── Testimonials ───────────────────────────────────────────

export const testimonials: Testimonial[] = [
  {
    clientName: 'Shulamis Katz',
    quote: "We have been using AY Gross for many years for our family pictures. He is a pleasure to work with and he makes it fun for the kids so they don't get tired of posing. We have beautiful family pictures and would highly recommend him!",
    featured: true,
    order: 1
  },
  {
    clientName: 'Tohn Family',
    quote: "AY did an amazing job, not only did he get the little kids to pose perfectly, but he got the adults to behave too!! We couldn't be more happy with the results. Thank you",
    featured: true,
    order: 2
  },
  {
    clientName: 'ER Lubling',
    quote: "AY took beautiful family portraits for us. The best part was that he had endless patience for the kids and knew how to get them interested in complying with the poses. Thank you AY!",
    featured: true,
    order: 3
  },
  {
    clientName: 'Reingold Family',
    quote: "We just wanted to thank you so much. I can't stop looking at the pictures. Your eye for symmetry is wonderful. Thank you for giving us so much pleasure!",
    featured: true,
    order: 4
  },
  {
    clientName: 'Eli Weiss',
    quote: "AY did an amazing job with our family pictures. He worked within the available environment and made the pictures look incredible. He had the patience to not only take pictures of adults but also our 1.5 year old who he got to pose and smile! Within the time frame AY was able to get pictures in multiple locations and they all turned out amazing.",
    featured: true,
    order: 5
  }
];

// ─── Page Data ──────────────────────────────────────────────

export const homePage: HomePageData = {
  heroDescriptor: 'AY Gross Photography · Jerusalem & Israel',
  heading: 'Family & event photography in Jerusalem.',
  supportingCopy: 'Relaxed family portraits and honest event photography throughout Jerusalem and Israel.',
  heroSlides: [
    {
      id: 'slide-1',
      photo: portraitPhotos[0],
      title: 'Sunset Sessions',
      subtitle: 'Outdoor family portraits at golden hour',
      categoryLabel: 'Portraits',
      gallerySlug: '/portraits',
      objectPosition: 'center 25%'
    },
    {
      id: 'slide-2',
      photo: eventPhotos[0],
      title: 'Events & Simchas',
      subtitle: 'Real moments from family celebrations',
      categoryLabel: 'Events',
      gallerySlug: '/events',
      objectPosition: 'center 35%'
    },
    {
      id: 'slide-3',
      photo: portraitPhotos[1],
      title: 'Family Groups',
      subtitle: 'Extended family sessions across Israel',
      categoryLabel: 'Portraits',
      gallerySlug: '/portraits',
      objectPosition: 'center 30%'
    },
    {
      id: 'slide-4',
      photo: portraitPhotos[3],
      title: 'Kids Being Kids',
      subtitle: 'Patience with kids, always',
      categoryLabel: 'Portraits',
      gallerySlug: '/portraits',
      objectPosition: 'center 30%'
    },
    {
      id: 'slide-5',
      photo: eventPhotos[1],
      title: 'On the Dance Floor',
      subtitle: 'Real moments from real celebrations',
      categoryLabel: 'Events',
      gallerySlug: '/events',
      objectPosition: 'center 30%'
    }
  ],
  introHeading: 'Natural, candid photography for families and simchas.',
  introText: [
    'Based in Jerusalem and serving clients across Israel, I specialize in relaxed family portraits and authentic event photography.',
    'My focus is on patience, natural light, and keeping sessions comfortable—so your images reflect genuine warmth rather than stiff poses.'
  ],
  featuredGalleries: [
    {
      title: 'Family & Portraits',
      slug: '/portraits',
      coverPhoto: portraitPhotos[0],
      subtitle: 'Children, parents, and multi-generational outdoor sessions',
      photoCount: portraitPhotos.length
    },
    {
      title: 'Events & Simchas',
      slug: '/events',
      coverPhoto: eventPhotos[0],
      subtitle: 'Bar & Bat Mitzvahs, Brit Milahs, banquets, and celebrations',
      photoCount: eventPhotos.length
    }
  ],
  featuredPhotos: [
    portraitPhotos[0],
    portraitPhotos[5],
    portraitPhotos[1],
    eventPhotos[0],
    portraitPhotos[3],
    portraitPhotos[8],
    portraitPhotos[4],
    portraitPhotos[7],
    portraitPhotos[11],
    eventPhotos[2],
    portraitPhotos[14],
    portraitPhotos[2],
    portraitPhotos[12],
    portraitPhotos[9]
  ],
  ctaLabel: 'Book a Session',
  ctaDestination: '/contact',
  seo: {
    metaTitle: 'AY Gross Photography | Family Portraits & Events in Jerusalem & Israel',
    metaDescription: 'Jerusalem & Israel photographer specializing in natural family portraits, kids, and events. Timeless photography with fast turnaround.'
  }
};

export const aboutPage: AboutPageData = {
  title: 'About Me',
  portrait: {
    asset: {
      url: '/images/photos/EBA9BE3B-D978-4EF0-A42A-F21E63AE472B-1152x2048.jpg'
    }
  },
  portraitAlt: 'AY Gross holding a camera',
  bioParagraphs: [
    "Hi! I am AY Gross and I'm originally from Cleveland, OH.",
    "I've always enjoyed a very close relationship with my fantastic grandfather, Dr. Jeff Gross. When I was in 7th grade, my grandfather generously offered to teach me everything he knew about photography. He had been taking pictures since the 1960s and wanted to show me how rewarding and also challenging the medium could be.",
    "I'll admit now that I agreed to be his student mostly so I would have an excuse to spend more time with him! As our lessons progressed however, I realized that I enjoyed the art almost as much as I enjoyed the instruction (and the instructor!). I was hooked. I loved how photography let me look at everyday things like a flower or a lake and decide with my camera that this simple thing could be captured and made into art.",
    "I spent my high school years busy, taking both classes and pictures. During that time, I happily took pictures of families and small simchas. Coming to yeshiva in Israel in 2017, I quickly realized that there was need in the Anglo community for quality photography at a reasonable price. I have proudly served as a photographer here in Israel since then.",
    "I love photographing families; watching them interact and the dynamics between all the different members. I specialize in photographing kids. Keeping them happy and engaged is my number one priority. I love watching them as they delight in the small, seemingly mundane details of our gorgeous world. And you will love how natural and happy the photos are. I try to keep my prices reasonable and my turnaround times (unreasonably) fast. I want you and your family to enjoy your new pictures as quickly as possible. I usually answer questions within 24 hours. I am looking forward to hearing from you and meeting you and your gang!"
  ],
  seo: {
    metaTitle: 'About AY Gross | Jerusalem Family & Event Photographer',
    metaDescription: 'Learn about AY Gross, his background, his mentorship under Dr. Jeff Gross, and his passion for family, kids, and event photography in Israel.'
  }
};

export const faqPage: FaqPageData = {
  title: "Frequently Asked Questions",
  intro: 'Answers to common questions about preparing for your family portrait session or event.',
  faqs: [
    {
      question: 'What should we wear for our session?',
      answer: "The best advice is to choose clothes that you feel comfortable in, and that are simple and neutral as possible. Choose clothes without an illustration, text or logo. For adults, one plain color is best \u2013 although bear in mind that plain black or white clothes don't photograph that well. Should you wear a watch? Yes, if it's a piece of jewelry. No, if it's constantly lighting up with incoming text notifications."
    },
    {
      question: 'When is the best time of day to take pictures?',
      answer: 'Lighting wise the "golden hour" (1 hour before sunset) is ideal. But it is more important for your kids to be happy and well rested when they come to the session. If that\'s in the middle of the day, then we will find a shady area.'
    },
    {
      question: 'What if it rains on the day of our session?',
      answer: 'I check the weather a day or two before the session; if rain is predicted we will simply reschedule for another date. If you have an indoor location that can be an option as well.'
    },
    {
      question: 'When and how do I receive my images?',
      answer: 'I offer some of the fastest turnaround times in the industry. I will deliver them within 10 business days* of your session. You will receive your images on an online gallery in full resolution ready to be printed. (*Unless noted otherwise)'
    },
    {
      question: 'Will the photos be edited?',
      answer: 'Yes! Every picture is individually edited to fit my natural style. Extensive editing requests will be an extra charge.'
    },
    {
      question: 'Is there an option to print pictures and albums through you?',
      answer: 'For those living in Israel I offer high quality prints, printed in Israel. For Americans visiting Israel I offer products shipped directly to your door in America! Album and Photobook design are available at an additional cost.'
    }
  ],
  seo: {
    metaTitle: 'FAQ | AY Gross Photography',
    metaDescription: 'Frequently asked questions about session clothing, timing, weather rescheduling, turnaround times, and print options.'
  }
};

export const pricingPage: PricingPageData = {
  heading: 'Packages & Pricing',
  introduction: 'Straightforward, honest pricing for families living in or visiting Israel. Every session is shot with patience and delivered with fast turnaround.',
  packages: [
    {
      name: 'Family Portrait Session',
      shortDescription: 'Ideal for immediate families and children in Jerusalem and surrounding areas.',
      priceText: 'Inquire for current rates',
      features: [
        'Up to 60-minute outdoor session in scenic Jerusalem location',
        'Patient with kids — we take the time they need',
        'Individually edited, high-resolution photographs',
        'Private online gallery with full print release',
        'Fast turnaround within 10 business days'
      ],
      ctaLabel: 'Book a Family Session',
      ctaDestination: '/contact'
    },
    {
      name: 'Extended Family Session',
      shortDescription: 'Multi-generational sessions for families gathering in Israel.',
      priceText: 'Custom quote based on family size',
      features: [
        'Complete multi-generational group portraits',
        'Breakdowns of individual families, grandchildren, grandparents',
        'Scheduled breakdowns by family group so nobody gets tired',
        'Direct print ordering shipped to Israel or the USA',
        'High-resolution digital delivery'
      ],
      ctaLabel: 'Inquire for Extended Family',
      ctaDestination: '/contact'
    },
    {
      name: 'Events & Simchas',
      shortDescription: 'Bar/Bat Mitzvahs, Brit Milahs, family milestones, and celebrations.',
      priceText: 'Hourly packages available',
      features: [
        'Candid event coverage without getting in the way',
        'Pre-event family portraits included',
        'Fast turnaround so you can share memories promptly',
        'Full resolution downloadable gallery'
      ],
      ctaLabel: 'Inquire for Event Coverage',
      ctaDestination: '/contact'
    }
  ],
  customNote: 'Quality prints and album design available for Israeli residents and American visitors with home delivery.',
  seo: {
    metaTitle: 'Pricing & Packages | AY Gross Photography',
    metaDescription: 'Pricing and session details for family portraits and event photography in Jerusalem and Israel.'
  }
};

export const contactPage: ContactPageData = {
  heading: "Let's Connect",
  intro: "Have questions about scheduling a family shoot, event availability, or location ideas? Send a message below or reach out directly.",
  letterbirdUser: 'aygrossphotography',
  email: 'aygrossphotography@gmail.com',
  phone: '058-772-5628',
  whatsApp: '+972587725628',
  location: 'Kiryat Yearim, Jerusalem & all of Israel',
  responseTime: 'I usually answer questions within 24 hours.',
  seo: {
    metaTitle: 'Contact AY Gross | Family Photographer in Jerusalem',
    metaDescription: 'Get in touch with AY Gross to book family portrait sessions or event photography in Israel.'
  }
};

export const portraitsGallery: Gallery = {
  title: 'Portraits',
  slug: 'portraits',
  categoryType: 'portraits',
  intro: 'Family and children portraits from sessions across Jerusalem and Israel.',
  coverPhoto: portraitPhotos[0],
  photos: portraitPhotos,
  seo: {
    metaTitle: 'Family Portraits | AY Gross Photography Jerusalem',
    metaDescription: 'Explore our portfolio of candid, natural family and children portraits in Jerusalem and throughout Israel.'
  }
};

export const eventsGallery: Gallery = {
  title: 'Events',
  slug: 'events',
  categoryType: 'events',
  intro: 'Bar & Bat Mitzvahs, Brit Milahs, and family celebrations throughout Israel.',
  coverPhoto: eventPhotos[0],
  photos: eventPhotos,
  seo: {
    metaTitle: 'Event Photography | AY Gross Photography Israel',
    metaDescription: 'Photography for Bar Mitzvahs, Brit Milahs, and family simchas in Jerusalem and across Israel.'
  }
};

// ─── Data Accessor Functions ────────────────────────────────
// Same signatures the pages used before — drop-in replacements.

export function getSiteSettings(): SiteSettings {
  return siteSettings;
}

export function getHomePage(): HomePageData {
  return homePage;
}

export function getAboutPage(): AboutPageData {
  return aboutPage;
}

export function getFaqPage(): FaqPageData {
  return faqPage;
}

export function getPricingPage(): PricingPageData {
  return pricingPage;
}

export function getContactPage(): ContactPageData {
  return contactPage;
}

export function getTestimonials(): Testimonial[] {
  return testimonials;
}

export function getGallery(slug: string): Gallery | null {
  if (slug === 'portraits') return portraitsGallery;
  if (slug === 'events' || slug === 'events-photography') return eventsGallery;
  return null;
}

export const getGalleryBySlug = getGallery;

export function getAllGalleries(): Gallery[] {
  return [portraitsGallery, eventsGallery];
}

