'use client';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google'
import './globals.css'
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoadingScreen from '../components/LoadingScreen';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <AnimatePresence mode="wait">
          {isLoading ? (
            <LoadingScreen onLoadingComplete={handleLoadingComplete} />
          ) : (
            children
          )}
        </AnimatePresence>
      </body>
    </html>
  )
}
