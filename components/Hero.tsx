'use client'

import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

const Hero = () => {
  return (
    <section className="pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center bg-primary-100 rounded-full px-4 py-1.5 mb-6">
              <Sparkles className="w-4 h-4 text-primary-600 mr-2" />
              <span className="text-sm font-medium text-primary-700">Premium Cleaning Services</span>
            </div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              <span className="block text-black">Transform Your Space</span>
              <span className="block mt-2 text-black">With <span className="text-[#50ade6]">GLOW HAUS</span></span>
            </motion.h1>

            <motion.p
              className="text-lg text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              Experience the difference with our professional cleaning services. We bring the sparkle back to your home or office with eco-friendly products and attention to detail.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <button className="bg-gradient-to-r from-primary-500 to-primary-700 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-200 glow-effect">
                Book Now
              </button>
              <button className="bg-white text-primary-600 border border-primary-500 px-8 py-3 rounded-full font-medium hover:bg-primary-50 transition-all duration-200">
                Our Services
              </button>
            </motion.div>

            <motion.div
              className="mt-10 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.7 }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">500+</div>
                <div className="text-sm text-gray-500">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">5000+</div>
                <div className="text-sm text-gray-500">Cleanings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">4.9</div>
                <div className="text-sm text-gray-500">Star Rating</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-500/20 mix-blend-overlay z-10"></div>
              <img
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
                alt="Professional cleaning service"
                className="w-full h-full object-cover"
              />

              {/* Floating elements */}
              <motion.div
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg z-20"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <div className="flex items-center">
                  <div className="bg-green-500 rounded-full w-3 h-3 mr-2"></div>
                  <span className="text-sm font-medium">Available Today</span>
                </div>
              </motion.div>

              <motion.div
                className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg z-20"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                <div className="flex items-center">
                  <div className="text-amber-500 font-bold mr-1">★★★★★</div>
                  <span className="text-sm font-medium">Trusted Service</span>
                </div>
              </motion.div>
            </div>

            {/* Background decoration */}
            <div className="absolute -z-10 -top-10 -right-10 w-64 h-64 bg-primary-100 rounded-full blur-3xl opacity-70"></div>
            <div className="absolute -z-10 -bottom-10 -left-10 w-64 h-64 bg-accent-400/30 rounded-full blur-3xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero