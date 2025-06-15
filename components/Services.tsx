'use client'

import { motion } from 'framer-motion'
import { Home, Building, Sparkles, Clock, CheckCircle } from 'lucide-react'

const Services = () => {
  const services = [
    {
      icon: Home,
      title: 'Residential Cleaning',
      description: 'Complete home cleaning services tailored to your needs',
      features: ['Deep cleaning', 'Regular maintenance', 'Move-in/out cleaning', 'Post-construction cleanup'],
      price: 'Starting at $120',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80'
    },
    {
      icon: Building,
      title: 'Commercial Cleaning',
      description: 'Professional office and commercial space cleaning',
      features: ['Office buildings', 'Retail spaces', 'Medical facilities', 'Educational institutions'],
      price: 'Custom quotes',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80'
    },
    {
      icon: Sparkles,
      title: 'Deep Cleaning',
      description: 'Intensive cleaning for a fresh start',
      features: ['Detailed sanitization', 'Hard-to-reach areas', 'Appliance cleaning', 'Window cleaning'],
      price: 'Starting at $200',
      image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80'
    }
  ]

  return (
    <section id="services" className="py-16 md:py-24">
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
            <span className="text-sm font-medium text-primary-700">Our Services</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">
            Professional Cleaning <span className="gradient-text">Solutions</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From residential homes to commercial spaces, we provide comprehensive cleaning services that exceed expectations.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {/* Service Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <div className="absolute top-4 left-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <service.icon className="w-6 h-6 text-primary-600" />
                </div>
              </div>

              {/* Service Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>

                {/* Features List */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Price and CTA */}
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-primary-600">{service.price}</span>
                  <button className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors duration-200">
                    Learn More
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-primary-500 to-primary-700 rounded-2xl p-8 text-white text-center"
        >
          <h3 className="text-2xl font-bold mb-4">Need Something Specific?</h3>
          <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
            We offer customized cleaning solutions for unique requirements. From carpet cleaning to window washing, we've got you covered.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center bg-white/10 rounded-full px-4 py-2">
              <Clock className="w-4 h-4 mr-2" />
              <span className="text-sm">Flexible Scheduling</span>
            </div>
            <div className="flex items-center bg-white/10 rounded-full px-4 py-2">
              <CheckCircle className="w-4 h-4 mr-2" />
              <span className="text-sm">Quality Guaranteed</span>
            </div>
            <div className="flex items-center bg-white/10 rounded-full px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              <span className="text-sm">Eco-Friendly Products</span>
            </div>
          </div>
          <button className="mt-6 bg-white text-primary-600 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors duration-200">
            Get Custom Quote
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default Services