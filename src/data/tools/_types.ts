/**
 * Shared shape for a tool page's editable copy.
 * One file per tool lives beside this (e.g. pregnancy-weight-gain.ts).
 * Edit the strings there — headline, hook, FAQs, sources, and the
 * article — and the page updates. The calculator itself stays in the
 * matching src/pages/tools/<slug>.astro file.
 */
export interface FAQ {
  question: string;
  answer: string;
}

export interface Source {
  label: string;
  url: string;
}

export interface Related {
  href: string;
  label: string;
  description: string;
}

export interface ToolCopy {
  /** Browser tab title + social title */
  title: string;
  /** Meta description (search snippet) */
  description: string;
  /** URL path, e.g. '/tools/pregnancy-weight-gain/' */
  path: string;
  /** Breadcrumb label */
  breadcrumb: string;
  /** Big H1 on the page */
  headline: string;
  /** One-line intro under the H1 */
  hook: string;
  /** Date the page was last reviewed, YYYY-MM-DD */
  reviewedDate: string;
  /** schema.org applicationCategory (default HealthApplication) */
  category?: string;
  /** Include the "reviewed by a medical student" MedicalWebPage schema (default true) */
  medical?: boolean;
  faqs: FAQ[];
  sources: Source[];
  related: Related[];
  /** The article shown below the tool. Plain HTML — edit the words freely. */
  contentHtml: string;
}
