import './globals.css';
import Providers from './providers';

export const metadata = {
  title: 'Gemify — Investment Grade Gems',
  description:
    "Curated collection of certified precious gems, personally selected by expert gemologists.",
  icons: { icon: '/favicon.ico' },
};

export const viewport = {
  themeColor: '#0f172a',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
