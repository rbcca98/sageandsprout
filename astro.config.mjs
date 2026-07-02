// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://sage-and-sprout.com',

  vite: {
    plugins: [tailwindcss()],
  },

  // Keep the noindex embed widgets out of the sitemap; the canonical tool
  // pages are what should be crawled and ranked.
  integrations: [sitemap({ filter: (page) => !page.includes('/embed/') })],

  adapter: cloudflare(),
});