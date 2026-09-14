export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  _id,
  _type,
  businessName,
  shortName,
  siteDescription,
  logo,
  email,
  phone,
  whatsApp,
  location,
  socialLinks,
  editingServicesUrl,
  defaultSeo,
  footerText
}`;

export const homePageQuery = `*[_type == "homePage"][0]{
  _id,
  _type,
  heading,
  supportingCopy,
  ctaLabel,
  ctaDestination,
  seo,
  "featuredPhotos": coalesce(
    featuredPhotos[]->{
      _id,
      _type,
      internalTitle,
      image,
      alt,
      caption,
      location,
      tags,
      featured
    },
    *[_type == "photo" && featured == true]{
      _id,
      _type,
      internalTitle,
      image,
      alt,
      caption,
      location,
      tags,
      featured
    }
  )
}`;

export const galleryBySlugQuery = `*[_type == "gallery" && slug.current == $slug][0]{
  _id,
  _type,
  title,
  slug,
  categoryType,
  intro,
  coverPhoto->{
    _id,
    image,
    alt
  },
  photos[]->{
    _id,
    _type,
    internalTitle,
    image,
    alt,
    caption,
    location,
    datePhotographed,
    tags,
    featured
  },
  seo
}`;

export const allGalleriesQuery = `*[_type == "gallery"]{
  _id,
  title,
  slug,
  categoryType,
  coverPhoto->{
    _id,
    image,
    alt
  },
  "photoCount": count(photos)
}`;

export const aboutPageQuery = `*[_type == "aboutPage"][0]{
  _id,
  _type,
  title,
  portrait,
  portraitAlt,
  bioParagraphs,
  seo
}`;

export const faqPageQuery = `*[_type == "faqPage"][0]{
  _id,
  _type,
  title,
  intro,
  faqs[]{
    question,
    answer
  },
  seo
}`;

export const pricingPageQuery = `*[_type == "pricingPage"][0]{
  _id,
  _type,
  heading,
  introduction,
  packages[]{
    name,
    shortDescription,
    priceText,
    features,
    ctaLabel,
    ctaDestination
  },
  customNote,
  seo
}`;

export const contactPageQuery = `*[_type == "contactPage"][0]{
  _id,
  _type,
  heading,
  intro,
  letterbirdUser,
  email,
  phone,
  whatsApp,
  location,
  responseTime,
  seo
}`;

export const testimonialsQuery = `*[_type == "testimonial"] | order(order asc, _createdAt asc){
  _id,
  _type,
  clientName,
  clientCompany,
  quote,
  featured,
  order
}`;
