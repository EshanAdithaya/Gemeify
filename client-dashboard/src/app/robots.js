import { SITE } from '@/lib/seo';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Keep auth-gated and transactional routes out of the index.
        disallow: ['/login', '/signup', '/checkout', '/account'],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
