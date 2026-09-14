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

export const fallbackSiteSettings: SiteSettings = {
  _id: 'siteSettings',
  _type: 'siteSettings',
  businessName: 'AY Gross Photography',
  shortName: 'AY Gross',
  siteDescription: 'Jerusalem & Israel family portrait and event photographer. Natural, candid, joyful photography.',
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

export const fallbackTestimonials: Testimonial[] = [
  {
    _id: 't-1',
    _type: 'testimonial',
    clientName: 'Shulamis Katz',
    quote: "We have been using AY Gross for many years for our family pictures. He is a pleasure to work with and he makes it fun for the kids so they don't get tired of posing. We have beautiful family pictures and would highly recommend him!",
    featured: true,
    order: 1
  },
  {
    _id: 't-2',
    _type: 'testimonial',
    clientName: 'Tohn Family',
    quote: "AY did an amazing job, not only did he get the little kids to pose perfectly, but he got the adults to behave too!! We couldn't be more happy with the results. Thank you",
    featured: true,
    order: 2
  },
  {
    _id: 't-3',
    _type: 'testimonial',
    clientName: 'ER Lubling',
    quote: "AY took beautiful family portraits for us. The best part was that he had endless patience for the kids and knew how to get them interested in complying with the poses. Thank you AY!",
    featured: true,
    order: 3
  },
  {
    _id: 't-4',
    _type: 'testimonial',
    clientName: 'Reingold Family',
    quote: "We just wanted to thank you so much. I can't stop looking at the pictures. Your eye for symmetry is wonderful. Thank you for giving us so much pleasure!",
    featured: true,
    order: 4
  },
  {
    _id: 't-5',
    _type: 'testimonial',
    clientName: 'Eli Weiss',
    quote: "AY did an amazing job with our family pictures. He worked within the available environment and made the pictures look incredible. He had the patience to not only take pictures of adults but also our 1.5 year old who he got to pose and smile! Within the time frame AY was able to get pictures in multiple locations and they all turned out amazing.",
    featured: true,
    order: 5
  }
];

export const fallbackAboutPage: AboutPageData = {
  _id: 'aboutPage',
  _type: 'aboutPage',
  title: 'About Me',
  portrait: {
    asset: {
      url: 'https://aygrossphotography.com/wp-content/uploads/2023/04/EBA9BE3B-D978-4EF0-A42A-F21E63AE472B-1152x2048.jpg'
    }
  },
  portraitAlt: 'AY Gross holding a camera',
  bioParagraphs: [
    "Hi! I am AY Gross and I’m originally from Cleveland, OH.",
    "I’ve always enjoyed a very close relationship with my fantastic grandfather, Dr. Jeff Gross. When I was in 7th grade, my grandfather generously offered to teach me everything he knew about photography. He had been taking pictures since the 1960s and wanted to show me how rewarding and also challenging the medium could be.",
    "I’ll admit now that I agreed to be his student mostly so I would have an excuse to spend more time with him! As our lessons progressed however, I realized that I enjoyed the art almost as much as I enjoyed the instruction (and the instructor!). I was hooked. I loved how photography let me look at everyday things like a flower or a lake and decide with my camera that this simple thing could be captured and made into art.",
    "I spent my high school years busy, taking both classes and pictures. During that time, I happily took pictures of families and small simchas. Coming to yeshiva in Israel in 2017, I quickly realized that there was need in the Anglo community for quality photography at a reasonable price. I have proudly served as a photographer here in Israel since then.",
    "I love photographing families; watching them interact and the dynamics between all the different members. I specialize in photographing kids. Keeping them happy and engaged is my number one priority. I love watching them as they delight in the small, seemingly mundane details of our gorgeous world. And you will love how natural and happy the photos are. I try to keep my prices reasonable and my turnaround times (unreasonably) fast. I want you and your family to enjoy your new pictures as quickly as possible. I usually answer questions within 24 hours. I am looking forward to hearing from you and meeting you and your gang!"
  ],
  seo: {
    metaTitle: 'About AY Gross | Jerusalem Family & Event Photographer',
    metaDescription: 'Learn about AY Gross, his background, his mentorship under Dr. Jeff Gross, and his passion for family, kids, and event photography in Israel.'
  }
};

export const fallbackFaqPage: FaqPageData = {
  _id: 'faqPage',
  _type: 'faqPage',
  title: "Frequently Asked Questions",
  intro: 'Answers to common questions about preparing for your family portrait session or event.',
  faqs: [
    {
      question: 'What should we wear for our session?',
      answer: 'The best advice is to choose clothes that you feel comfortable in, and that are simple and neutral as possible. Choose clothes without an illustration, text or logo. For adults, one plain color is best – although bear in mind that plain black or white clothes don’t photograph that well. Should you wear a watch? Yes, if it’s a piece of jewelry. No, if it’s constantly lighting up with incoming text notifications.'
    },
    {
      question: 'When is the best time of day to take pictures?',
      answer: 'Lighting wise the “golden hour” (1 hour before sunset) is ideal. But it is more important for your kids to be happy and well rested when they come to the session. If that’s in the middle of the day, then we will find a shady area.'
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

export const fallbackPricingPage: PricingPageData = {
  _id: 'pricingPage',
  _type: 'pricingPage',
  heading: 'Investment & Pricing',
  introduction: 'Straightforward, honest pricing for families living in or visiting Israel. Every session is shot with patience and delivered with fast turnaround.',
  packages: [
    {
      name: 'Family Portrait Session',
      shortDescription: 'Ideal for immediate families and children in Jerusalem and surrounding areas.',
      priceText: 'Inquire for current rates',
      features: [
        'Up to 60-minute outdoor session in scenic Jerusalem location',
        'Endless patience for kids to ensure genuine smiles',
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
        'Coordinated pacing so everyone stays relaxed and happy',
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
        'Candid, unobtrusive storytelling and joyful coverage',
        'Pre-event family portraits included',
        'Fast turnaround so you can share memories promptly',
        'Full resolution downloadable gallery'
      ],
      ctaLabel: 'Inquire for Event Coverage',
      ctaDestination: '/contact'
    }
  ],
  customNote: 'Fine art prints and custom album design are available for both local Israeli residents and American visitors with home delivery.',
  seo: {
    metaTitle: 'Pricing & Packages | AY Gross Photography',
    metaDescription: 'Pricing and session details for family portraits and event photography in Jerusalem and Israel.'
  }
};

export const fallbackContactPage: ContactPageData = {
  _id: 'contactPage',
  _type: 'contactPage',
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

// Audited real active photographs from the live website
const createAuditedPhoto = (id: string, title: string, filename: string, alt: string, featured = false): Photo => ({
  _id: id,
  _type: 'photo',
  internalTitle: title,
  image: {
    asset: {
      url: `https://aygrossphotography.com/wp-content/uploads/2023/04/${filename}`
    }
  },
  alt,
  featured
});

export const auditedPortraitPhotos: Photo[] = [
  createAuditedPhoto('photo-ayg0704', 'AYG0704', 'AYG0704-scaled.jpg', 'Family portrait outdoors in natural sunlight', true),
  createAuditedPhoto('photo-ayg6788', 'AYG6788', 'AYG6788-scaled.jpg', 'Young boy smiling outdoors', true),
  createAuditedPhoto('photo-ayg7972', 'AYG7972', 'AYG7972-scaled.jpg', 'Siblings posing warmly in nature', true),
  createAuditedPhoto('photo-ayg8503', 'AYG8503', 'AYG8503-scaled.jpg', 'Candid portrait of smiling girl in golden hour', true),
  createAuditedPhoto('photo-ayg9405', 'AYG9405', 'AYG9405-scaled.jpg', 'Children laughing together outdoors', true),
  createAuditedPhoto('photo-mg4278', 'MG_4278', 'MG_4278-scaled.jpg', 'Baby smiling portrait', false),
  createAuditedPhoto('photo-mg4526', 'MG_4526_1', 'MG_4526_1-scaled.jpg', 'Family walking together in park', false),
  createAuditedPhoto('photo-mg5920', 'MG_5920', 'MG_5920-scaled.jpg', 'Boy sitting on grass enjoying nature', false),
  createAuditedPhoto('photo-mg5960', 'MG_5960', 'mg_5960-scaled.jpg', 'Toddler playful candid moment', false),
  createAuditedPhoto('photo-mg6397', 'MG_6397', 'MG_6397-scaled.jpg', 'Family group portrait with parents and children', true),
  createAuditedPhoto('photo-export0010', 'Untitled Export 0010', 'Untitled_Export-0010-scaled.jpg', 'Sisters embracing lovingly', true),
  createAuditedPhoto('photo-ayg160705', 'AYG160705_159_1', 'ayg160705-159-1-scaled.jpg', 'Boy joyful expression in outdoor portrait', true),
  createAuditedPhoto('photo-ayg0089', 'AYG0089', 'AYG0089-scaled.jpg', 'Family smiling in scenic Israeli grove', false),
  createAuditedPhoto('photo-ayg0384', 'AYG0384', 'AYG0384-scaled.jpg', 'Brother and sister candid outdoor portrait', false),
  createAuditedPhoto('photo-ayg160518', 'AYG160518_105', 'AYG160518_-105-scaled.jpg', 'Outdoor child portrait with soft background', false),
  createAuditedPhoto('photo-ayg160525', 'AYG160525_277', 'AYG160525_-277-scaled.jpg', 'Father and child playful portrait', true),
  createAuditedPhoto('photo-ayg160501', 'AYG160501_57', 'AYG160501_-57-scaled.jpg', 'Mother and children tender portrait', true),
  createAuditedPhoto('photo-mg1445', 'MG_1445_Edit', 'MG_1445-Edit-scaled.jpg', 'Boy in white shirt natural portrait', false),
  createAuditedPhoto('photo-mg1982', 'MG_1982_Edit', 'MG_1982-Edit-scaled.jpg', 'Family sitting together smiling in Jerusalem park', true),
  createAuditedPhoto('photo-ayg160621', 'AYG160621_218_1', 'ayg160621-218_1-scaled.jpg', 'Brothers smiling together in golden hour', true),
  createAuditedPhoto('photo-ayg9991', 'AYG9991', 'AYG9991-scaled.jpg', 'Young girl gentle portrait outdoors', false),
  createAuditedPhoto('photo-mg1236', 'MG_1236', 'MG_1236-scaled.jpg', 'Family celebrating together in field', false)
];

export const auditedEventPhotos: Photo[] = [
  createAuditedPhoto('photo-mg5400', 'MG_5400', 'MG_5400-scaled.jpg', 'Event guests dancing and celebrating with joy', true),
  createAuditedPhoto('photo-mg9223', 'MG_9223', 'MG_9223-scaled.jpg', 'Bar Mitzvah boy celebrating with family', true),
  createAuditedPhoto('photo-ayg9271', 'AYG9271', 'AYG9271-scaled.jpg', 'Celebration banquet gathering in Jerusalem', true),
  createAuditedPhoto('photo-ayg160626', 'AYG160626_368_1', 'ayg160626-368_1.jpg', 'Simcha celebration moment with joyful guests', true),
  createAuditedPhoto('photo-mg9242', 'MG_9242_Edit', 'MG_9242-Edit-scaled.jpg', 'Bar Mitzvah family formal portrait', true),
  createAuditedPhoto('photo-mg4771', 'MG_4771', 'MG_4771-scaled.jpg', 'Grandparents and children celebrating at simcha', true),
  createAuditedPhoto('photo-y7633', 'Y_7633', 'Y__7633-scaled.jpg', 'Candid laughter at family event', true),
  createAuditedPhoto('photo-ayg9192', 'AYG9192', 'AYG9192-scaled.jpg', 'Joyful celebration moment on the dance floor', true)
];

export const fallbackPortraitsGallery: Gallery = {
  _id: 'gallery-portraits',
  _type: 'gallery',
  title: 'Portraits',
  slug: { current: 'portraits' },
  categoryType: 'portraits',
  intro: 'A celebration of families, children, and spontaneous joy captured across the landscapes of Jerusalem and Israel.',
  coverPhoto: auditedPortraitPhotos[0],
  photos: auditedPortraitPhotos,
  seo: {
    metaTitle: 'Family Portraits | AY Gross Photography Jerusalem',
    metaDescription: 'Explore our portfolio of candid, natural family and children portraits in Jerusalem and throughout Israel.'
  }
};

export const fallbackEventsGallery: Gallery = {
  _id: 'gallery-events',
  _type: 'gallery',
  title: 'Events',
  slug: { current: 'events' },
  categoryType: 'events',
  intro: 'Heartfelt, authentic event photography for Bar & Bat Mitzvahs, Brit Milahs, and family celebrations.',
  coverPhoto: auditedEventPhotos[0],
  photos: auditedEventPhotos,
  seo: {
    metaTitle: 'Event Photography | AY Gross Photography Israel',
    metaDescription: 'Storytelling photography for Bar Mitzvahs, Brit Milahs, and family simchas in Jerusalem and across Israel.'
  }
};

export const fallbackHomePage: HomePageData = {
  _id: 'homePage',
  _type: 'homePage',
  heading: "I'm AY, an Israel-based photographer for family portraits and events.",
  supportingCopy: "Capturing natural expressions, joyful connections, and spontaneous family moments with timeless simplicity.",
  featuredPhotos: [
    auditedPortraitPhotos[0],
    auditedPortraitPhotos[1],
    auditedPortraitPhotos[2],
    auditedPortraitPhotos[3],
    auditedPortraitPhotos[4],
    auditedPortraitPhotos[9],
    auditedPortraitPhotos[10],
    auditedPortraitPhotos[11],
    auditedPortraitPhotos[15],
    auditedPortraitPhotos[16],
    auditedPortraitPhotos[18],
    auditedPortraitPhotos[19],
    auditedEventPhotos[0],
    auditedEventPhotos[1]
  ],
  ctaLabel: 'Book a Session',
  ctaDestination: '/contact',
  seo: {
    metaTitle: 'AY Gross Photography | Jerusalem Family Portraits & Events',
    metaDescription: "Jerusalem & Israel based photographer for family portraits and events. Candid, natural, and timeless photography."
  }
};
