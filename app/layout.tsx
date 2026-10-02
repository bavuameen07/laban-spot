import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const jakarta = localFont({ src: '../public/fonts/plus-jakarta-sans.woff2', variable: '--font-jakarta', display: 'swap', weight: '200 800' });

export const viewport: Viewport = { width: 'device-width', initialScale: 1, maximumScale: 5, themeColor: '#073fd8' };

export const metadata: Metadata = {
  title: 'The Laban Spot | Egyptian Desserts & Signature Laban',
  description: 'Discover creamy, crunchy Egyptian-inspired desserts from The Laban Spot. Explore our story, signature treats, and store locations.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={jakarta.variable}><body>{children}</body></html>;
}
