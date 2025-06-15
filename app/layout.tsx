import type { Metadata } from 'next';
import { Inter } from 'next/font/google'
import './globals.css'
import ClientLayout from './ClientLayout';

const inter = Inter({ subsets: ['latin'] })

// Metadata with comprehensive favicon configuration
export const metadata: Metadata = {
  title: 'Glow Haus - Premium Professional Cleaning Services | Residential & Commercial',
  description: 'Transform your space with Glow Haus premium cleaning services. Expert residential and commercial cleaning, deep cleaning, and maintenance services. Book your professional cleaning today for a spotless, gleaming home or office.',
  keywords: 'professional cleaning services, house cleaning, office cleaning, deep cleaning, residential cleaning, commercial cleaning, cleaning company, premium cleaning, home cleaning services, professional cleaners',
  icons: {
    icon: [
      {
        url: '/images/glow-haus-logo.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/images/glow-haus-logo.png',
        sizes: '16x16',
        type: 'image/png',
      }
    ],
    shortcut: '/images/glow-haus-logo.png',
    apple: [
      {
        url: '/images/glow-haus-logo.png',
        sizes: '180x180',
        type: 'image/png',
      }
    ],
    other: [
      {
        rel: 'icon',
        url: '/images/glow-haus-logo.png',
      }
    ]
  },
  manifest: '/manifest.json',
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#50ade6',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}