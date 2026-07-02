import type { ToolCopy } from './_types';
import { author, authorRef, orgRef } from '../entities';

/** Builds the JSON-LD (WebApplication + WebPage/MedicalWebPage) from a tool's copy. */
export function toolSchema(copy: ToolCopy): object[] {
  const url = `https://sage-and-sprout.com${copy.path}`;

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
    ...(copy.medical === false
      ? {}
      : { medicalAudience: { '@type': 'MedicalAudience', audienceType: 'Patient' } }),
  };

  // The full author definition, so the @id references above resolve.
  const authorNode = { '@context': 'https://schema.org', ...author };

  return [app, page, authorNode];
}
