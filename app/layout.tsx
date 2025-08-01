import type { Metadata } from 'next';
import { Inter, Hanken_Grotesk } from 'next/font/google'
import './globals.css'
import ClientLayout from './ClientLayout';
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })
const hankenGrotesk = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['700', '800', '900'],
  variable: '--font-hanken-grotesk'
})

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

// Metadata with comprehensive favicon configuration
export const metadata: Metadata = {
  title: 'Glow Haus - Premium Professional Cleaning Services | Residential & Commercial',
  description: 'Transform your space with Glow Haus premium cleaning services. Expert residential and commercial cleaning, deep cleaning, and maintenance services. Book your professional cleaning today for a spotless, gleaming home or office.',
  keywords: 'professional cleaning services, house cleaning, office cleaning, deep cleaning, residential cleaning, commercial cleaning, cleaning company, premium cleaning, home cleaning services, professional cleaners',
  icons: {
    icon: [
      {
        url: '/images/logoIcon.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/images/logoIcon.png',
        sizes: '16x16',
        type: 'image/png',
      }
    ],
    shortcut: '/images/logoIcon.png',
    apple: [
      {
        url: '/images/logoIcon.png',
        sizes: '180x180',
        type: 'image/png',
      }
    ],
    other: [
      {
        rel: 'icon',
        url: '/images/logoIcon.png',
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
      <head>
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </head>
      <body className={`${inter.className} ${hankenGrotesk}`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}