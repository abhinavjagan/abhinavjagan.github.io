import type { Metadata } from 'next';
import type { Viewport } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AsciiBackdrop from '@/components/AsciiBackdrop';
import '@/styles/globals.css';
import { generateMetadata as generateMetaData } from '@/utils/seo';

export const metadata: Metadata = {
  ...generateMetaData(
    'AI Applications, Infrastructure & Distributed Systems',
    'Software engineer building reliable AI applications and the distributed, networked systems beneath them.',
    '/'
  ),
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23000'/><text x='12' y='73' font-size='68' font-family='monospace' font-weight='bold' fill='%23fff'>A</text></svg>" />
      </head>
      <body className="noise-overlay">
        <a href="#main-content" className="skip-link">Skip to content</a>
        <AsciiBackdrop />
        <Header />
        <main id="main-content" className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
