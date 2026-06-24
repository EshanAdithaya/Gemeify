import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import JsonLd from '@/components/JsonLd';
import { SITE, buildMetadata } from '@/lib/seo';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL(SITE.url),
  ...buildMetadata({}),
};

export const viewport = {
  themeColor: SITE.themeColor,
  width: 'device-width',
  initialScale: 1,
};

const organizationLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE.name,
  url: SITE.url,
  logo: `${SITE.url}/logo512.png`,
  description: SITE.description,
  sameAs: [
    'https://twitter.com/gemify',
    'https://instagram.com/gemify',
    'https://linkedin.com/company/gemify',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    availableLanguage: ['English', 'Arabic', 'French', 'German'],
  },
};

const websiteLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE.name,
  url: SITE.url,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE.url}/marketplace?search={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body>
        <JsonLd data={organizationLd} />
        <JsonLd data={websiteLd} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
