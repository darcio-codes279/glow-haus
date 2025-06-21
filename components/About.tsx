'use client'

import { motion } from 'framer-motion'

const About = () => {
  const features = [
    {
      emoji: '🛡️',
      title: 'Trusted & Insured',
      description: 'Fully licensed and insured for your peace of mind'
    },
    {
      emoji: '💚',
      title: 'Eco-Friendly',
      description: 'Safe, non-toxic cleaning products for your family'
    },
    {
      emoji: '✨',
      title: 'Attention to Detail',
      description: 'Every corner cleaned to perfection'
    },
    {
      emoji: '🏆',
      title: 'Quality Guaranteed',
      description: '100% satisfaction guarantee on all services'
    }
  ]

  return (
    <section id="about" className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
                alt="Professional cleaning team"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Floating stats */}
            <motion.div
              className="absolute -bottom-6 -right-6 bg-white rounded-xl p-6 shadow-lg"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600">2+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center bg-primary-100 rounded-full px-4 py-1.5 mb-6">
              <span className="text-sm font-medium text-primary-700">About Glow Haus</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black">
              Making Your Space <span className="gradient-text">Shine</span> Since 2023
            </h2>

            <p className="text-lg text-gray-600 mb-8">
              At Glow Haus, we believe that a clean space is more than just aesthetics—it's about creating an environment where you can thrive. Our team of dedicated professionals brings years of experience and a passion for excellence to every cleaning project.
            </p>

            <p className="text-gray-600 mb-8">
              We use only the finest eco-friendly cleaning products and state-of-the-art equipment to ensure your space not only looks immaculate but is also safe for your family and pets.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-3"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <span className="text-xl">{feature.emoji}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About