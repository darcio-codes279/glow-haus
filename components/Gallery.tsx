'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const galleryImages = [
    {
      src: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
      title: 'Living Room Deep Clean',
      category: 'Residential'
    },
    {
      src: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
      title: 'Kitchen Sanitization',
      category: 'Residential'
    },
    {
      src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80',
      title: 'Office Space Cleaning',
      category: 'Commercial'
    },
    {
      src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
      title: 'Bathroom Deep Clean',
      category: 'Residential'
    },
    {
      src: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
      title: 'Window Cleaning',
      category: 'Specialized'
    },
    {
      src: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
      title: 'Carpet Cleaning',
      category: 'Specialized'
    }
  ]

  const openModal = (index: number) => {
    setSelectedImage(index)
    setCurrentIndex(index)
  }

  const closeModal = () => {
    setSelectedImage(null)
  }

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  return (
    <section id="gallery" className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center bg-primary-100 rounded-full px-4 py-1.5 mb-6">
            <span className="text-sm font-medium text-primary-700">Our Work</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">
            See the <span className="gradient-text">Transformation</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Take a look at some of our recent projects and see the difference professional cleaning makes.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg"
              onClick={() => openModal(index)}
            >
              <div className="aspect-w-4 aspect-h-3 relative">
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Overlay Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <div className="bg-primary-500/20 backdrop-blur-sm rounded-lg p-3">
                    <h3 className="font-semibold mb-1">{image.title}</h3>
                    <span className="text-sm opacity-90">{image.category}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal */}
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              >
                <X className="w-8 h-8" />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
              >
                <ChevronRight className="w-8 h-8" />
              </button>

              {/* Image */}
              <motion.img
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                src={galleryImages[currentIndex].src}
                alt={galleryImages[currentIndex].title}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />

              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                <h3 className="text-white text-xl font-semibold mb-1">
                  {galleryImages[currentIndex].title}
                </h3>
                <span className="text-gray-300">{galleryImages[currentIndex].category}</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold mb-4 text-black">Ready to Transform Your Space?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join hundreds of satisfied customers who trust Glow Haus for their cleaning needs.
          </p>
          <button className="bg-gradient-to-r from-primary-500 to-primary-700 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-200 glow-effect">
            Schedule Your Cleaning
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default Gallery