/**
 * Shared schema.org entities, defined once and reused across every page.
 *
 * Consistent @id values let Google resolve the same Author, Organization,
 * and WebSite across all pages, which is the E-E-A-T signal that matters
 * most for a YMYL (health) site: a single, named, credentialed reviewer
 * standing behind every tool.
 *
 * Honesty guardrail: the author is a senior medical student, never an MD.
 * Do not add credentials, a school name, or claims that are not true.
 */

const SITE = 'https://sage-and-sprout.com';

export const AUTHOR_ID = `${SITE}/about/#author`;
export const ORG_ID = `${SITE}/#organization`;
export const WEBSITE_ID = `${SITE}/#website`;

/** The person who writes and reviews every tool. Named consistently sitewide. */
export const author = {
  '@type': 'Person',
  '@id': AUTHOR_ID,
  name: 'Rebecca',
  jobTitle: 'Senior Medical Student',
  description: 'Senior medical student at an Ivy League institution. Writes and reviews every calculator on Sage & Sprout against primary medical literature.',
  url: `${SITE}/about/`,
  knowsAbout: [
    'Pregnancy',
    'Obstetrics',
    'Fertility',
    'Prenatal care',
    'Infant nutrition',
    'Child growth',
  ],
};

/** A compact reference to the author, for use inside other nodes. */
export const authorRef = { '@id': AUTHOR_ID };

export const organization = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: 'Sage & Sprout',
  url: SITE,
  description: 'Free, evidence-based pregnancy and baby calculators.',
  logo: {
    '@type': 'ImageObject',
    url: `${SITE}/icon-512.png`,
    width: 512,
    height: 512,
  },
  founder: authorRef,
};

export const orgRef = { '@id': ORG_ID };

export const website = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  name: 'Sage & Sprout',
  url: SITE,
  description: 'Free, evidence-based pregnancy and baby calculators for expecting and new parents.',
  publisher: orgRef,
};

/** The graph included in the sitewide <head> on every page. */
export function baseGraph(): object {
  return {
    '@context': 'https://schema.org',
    '@graph': [organization, website],
  };
}
