'use client'

import { motion } from 'framer-motion'
import { Sparkles, Shield, Clock, Star, Phone, Mail, MapPin } from 'lucide-react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import About from '@/components/About'
import Gallery from '@/components/Gallery'
import Testimonials from '@/components/Testimonials'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <About />
      <Services />
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  )
}