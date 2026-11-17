import type { Metadata } from "next";
import { SITE } from "./site";
import { SERVICE_CATEGORIES } from "./services";

export function pageMetadata({
  title,
  description,
  path,
}: {
  title?: string;
  description?: string;
  path: string;
}): Metadata {
  const desc = description ?? SITE.description;
  const fullTitle = title ? `${title} | ${SITE.name}` : `${SITE.legalName}`;
  return {
    title: title ?? { absolute: `${SITE.name} – ${SITE.tagline} | ${SITE.slogan}` },
    description: desc,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: SITE.locale,
      url: path,
      siteName: SITE.legalName,
      title: fullTitle,
      description: desc,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
    },
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE.url}/#business`,
    name: SITE.legalName,
    alternateName: SITE.name,
    slogan: SITE.slogan,
    description: SITE.description,
    url: SITE.url,
    logo: `${SITE.url}/brand/logo-icon.svg`,
    image: `${SITE.url}/opengraph-image`,
    telephone: SITE.phoneHref,
    email: SITE.email,
    address: { "@type": "PostalAddress", addressCountry: "CL" },
    areaServed: SITE.coverage.areas.map((a) => ({ "@type": "Place", name: a })),
    openingHours: SITE.hours.schema,
    priceRange: "$$",
    sameAs: Object.values(SITE.social).filter(Boolean),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios",
      itemListElement: SERVICE_CATEGORIES.map((cat) => ({
        "@type": "OfferCatalog",
        name: cat.name,
        itemListElement: cat.services.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.name, description: s.description },
        })),
      })),
    },
  };
}
