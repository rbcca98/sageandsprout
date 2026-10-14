import type { ToolCopy } from './_types';
import { author, authorRef, orgRef } from '../entities';
import { graphicFor } from '../tool-graphics';

/** Builds the JSON-LD (WebApplication + WebPage/MedicalWebPage) from a tool's copy. */
export function toolSchema(copy: ToolCopy): object[] {
  const url = `https://sage-and-sprout.com${copy.path}`;

  // The tool's chart, so image search and link previews have a named,
  // captioned image that belongs to this page.
  const graphic = graphicFor(copy);
  const image = graphic
    ? {
        '@type': 'ImageObject',
        '@id': `${url}#primaryimage`,
        url: `https://sage-and-sprout.com${graphic.src2x}`,
        contentUrl: `https://sage-and-sprout.com${graphic.src2x}`,
        thumbnailUrl: `https://sage-and-sprout.com${graphic.src}`,
        width: graphic.width * 2,
        height: graphic.height * 2,
        name: `${copy.headline} chart`,
        caption: graphic.caption,
        creator: orgRef,
        creditText: 'Sage & Sprout',
        copyrightNotice: 'Sage & Sprout',
      }
    : null;

  const app = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: copy.headline,
    url,
    applicationCategory: copy.category ?? 'HealthApplication',
    description: copy.description,
    operatingSystem: 'All',
    isAccessibleForFree: true,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    publisher: orgRef,
    ...(image ? { image } : {}),
  };

  // Every tool page names its author and review date. For clinical tools we
  // use MedicalWebPage (with a patient audience); for the rest, WebPage.
  const page = {
    '@context': 'https://schema.org',
    '@type': copy.medical === false ? 'WebPage' : 'MedicalWebPage',
    name: copy.headline,
    url,
    description: copy.description,
    author: authorRef,
    reviewedBy: authorRef,
    lastReviewed: copy.reviewedDate,
    dateModified: copy.reviewedDate,
    ...(image ? { image, primaryImageOfPage: { '@id': image['@id'] } } : {}),
    ...(copy.medical === false
      ? {}
      : { medicalAudience: { '@type': 'MedicalAudience', audienceType: 'Patient' } }),
  };

  // The full author definition, so the @id references above resolve.
  const authorNode = { '@context': 'https://schema.org', ...author };

  return [app, page, authorNode];
}
