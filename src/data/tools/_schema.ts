import type { ToolCopy } from './_types';

/** Builds the JSON-LD (WebApplication + optional MedicalWebPage) from a tool's copy. */
export function toolSchema(copy: ToolCopy): object[] {
  const app = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: copy.headline,
    url: `https://sage-and-sprout.com${copy.path}`,
    applicationCategory: copy.category ?? 'HealthApplication',
    description: copy.description,
    operatingSystem: 'All',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };
  if (copy.medical === false) return [app];
  const med = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: copy.headline,
    medicalAudience: { '@type': 'MedicalAudience', audienceType: 'Patient' },
    reviewedBy: {
      '@type': 'Person',
      jobTitle: 'Senior Medical Student',
      affiliation: { '@type': 'Organization', name: 'Ivy League Medical School' },
    },
    lastReviewed: copy.reviewedDate,
  };
  return [app, med];
}
