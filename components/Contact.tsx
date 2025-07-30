'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { event } from '@/lib/gtag'
import emailjs from '@emailjs/browser'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    squareFootage: '',
    budget: '',
    message: '',
    pictures: [] as File[]
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setFormData({
      ...formData,
      pictures: files
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      let pictureUrls: string[] = []
      let uploadErrors: string[] = []

      // Upload pictures to Cloudinary if any
      if (formData.pictures.length > 0) {
        for (const file of formData.pictures) {
          const uploadData = new FormData()
          uploadData.append('file', file)
          uploadData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!)
          uploadData.append('folder', 'contact-form')

          try {
            const response = await fetch(
              `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
              {
                method: 'POST',
                body: uploadData
              }
            )

            if (response.ok) {
              const data = await response.json()
              pictureUrls.push(data.secure_url)
              console.log('Image uploaded successfully:', data.secure_url)
            } else {
              const errorText = await response.text()
              console.error('Failed to upload image:', errorText)
              uploadErrors.push(`Failed to upload ${file.name}`)
            }
          } catch (uploadError) {
            console.error('Upload error for file:', file.name, uploadError)
            uploadErrors.push(`Error uploading ${file.name}`)
          }
        }
      }

      // Prepare email data with guaranteed values
      const emailData = {
        from_name: formData.name || 'Not provided',
        from_email: formData.email || 'Not provided',
        phone: formData.phone || 'Not provided',
        service: formData.service || 'Not specified',
        square_footage: formData.squareFootage || 'Not specified',
        budget: formData.budget || 'Not specified',
        message: formData.message || 'No message provided',
        picture_urls: pictureUrls.length > 0 ? pictureUrls.join('\n\n') : 'No pictures uploaded',
        picture_count: pictureUrls.length.toString(),
        has_pictures: pictureUrls.length > 0 ? 'Yes' : 'No',
        upload_errors: uploadErrors.length > 0 ? uploadErrors.join(', ') : 'None',
        to_email: 'glowhauscleaning@gmail.com'
      }

      console.log('Sending email with data:', emailData)

      // Send email with picture URLs
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        emailData,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )

      // Track successful submission
      event({
        action: 'contact_form_submit',
        category: 'lead_generation',
        label: 'Contact Form',
        value: 1
      })

      // Track picture uploads if any
      if (pictureUrls.length > 0) {
        event({
          action: 'pictures_uploaded',
          category: 'contact',
          label: 'Contact Form Pictures',
          value: pictureUrls.length
        })
      }

      setIsSubmitted(true)
      console.log('Email sent successfully!')

      // Show upload errors if any (but still allow form submission)
      if (uploadErrors.length > 0) {
        console.warn('Some images failed to upload:', uploadErrors)
      }

    } catch (error) {
      console.error('Failed to send email:', error)
      alert('Failed to send message. Please try again or call us directly at +44 7766 932674.')
    } finally {
      setIsLoading(false)
    }

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        squareFootage: '',
        budget: '',
        message: '',
        pictures: []
      })
      // Reset file input
      const fileInput = document.getElementById('pictures') as HTMLInputElement
      if (fileInput) fileInput.value = ''
    }, 3000)
  }

  const contactInfo = [
    {
      emoji: '📞',
      title: 'Phone',
      content: '+44 7766 932674',
      link: 'tel:+447766932674'
    },
    {
      emoji: '📧',
      title: 'Email',
      content: 'glowhauscleaning@gmail.com',
      link: 'mailto:glowhauscleaning@gmail.com'
    },
    {
      emoji: '🕒',
      title: 'Hours',
      content: '24/7 • 7 days a week',
      link: '#'
    }
  ]

  const services = [
    'Domestic Household / University Accomodation Cleaning ',
    'University Accommodations ',
    'Office Cleaning',
    'Post Construction Cleaning',
    'End of Tenancy Cleaning',
    'Holiday Lets/ Airbnb',
    'Post Event cleaning',
    'Other'
  ]

  return (
    <section id="contact" className="py-16 md:py-24 bg-gray-50 relative">
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
            <span className="text-sm font-medium text-primary-700">Get In Touch</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">
            Ready to <span className="gradient-text">Get Started?</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Contact us today for a free quote and let us transform your space with our professional cleaning services.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <span className="text-6xl block mb-4">✅</span>
                <h4 className="text-xl font-semibold text-green-600 mb-2">Message Sent!</h4>
                <p className="text-gray-600">Thank you for contacting us. We'll get back to you within 24 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                      placeholder="Your full name"
                      disabled={isLoading}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                      placeholder="your@email.com"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                      placeholder="(555) 123-4567"
                      disabled={isLoading}
                    />
                  </div>
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                      Service Needed
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                      disabled={isLoading}
                    >
                      <option value="">Select a service</option>
                      {services.map((service) => (
                        <option key={service} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="squareFootage" className="block text-sm font-medium text-gray-700 mb-2">
                      Square Footage
                    </label>
                    <input
                      type="number"
                      id="squareFootage"
                      name="squareFootage"
                      value={formData.squareFootage}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                      placeholder="e.g. 1200"
                      min="1"
                      disabled={isLoading}
                    />
                  </div>
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                      Budget Range
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                      disabled={isLoading}
                    >
                      <option value="">Select budget range</option>
                      <option value="Under £50">Under £50</option>
                      <option value="£50 - £100">£50 - £100</option>
                      <option value="£100 - £200">£100 - £200</option>
                      <option value="£200 - £300">£200 - £300</option>
                      <option value="£300 - £500">£300 - £500</option>
                      <option value="Over £500">Over £500</option>
                      <option value="Custom quote needed">Custom quote needed</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none"
                    placeholder="Tell us about your cleaning needs..."
                    disabled={isLoading}
                  ></textarea>
                </div>

                <div>
                  <label htmlFor="pictures" className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Pictures (Optional)
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      id="pictures"
                      name="pictures"
                      multiple
                      accept="image/*"
                      onChange={handleFileChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                      disabled={isLoading}
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      📸 Upload photos of the area to be cleaned (Max 5 files, 10MB each)
                    </p>
                    {formData.pictures.length > 0 && (
                      <div className="mt-2">
                        <p className="text-sm text-green-600">
                          ✅ {formData.pictures.length} file(s) selected
                        </p>
                        <ul className="text-xs text-gray-600 mt-1">
                          {formData.pictures.map((file, index) => (
                            <li key={index} className="truncate">
                              • {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-primary-500 to-primary-700 text-white px-8 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-200 flex items-center justify-center glow-effect disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <span className="mr-2">⏳</span>
                      Sending...
                    </>
                  ) : (
                    <>
                      <span className="mr-2">📤</span>
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6 text-black">Get in Touch</h3>
              <p className="text-gray-600 mb-8">
                We're here to help! Reach out to us through any of the following methods, and we'll respond promptly to discuss your cleaning needs.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.title}
                  href={info.link}
                  onClick={() => {
                    if (info.title === 'Phone') {
                      event({
                        action: 'phone_click',
                        category: 'contact',
                        label: 'Phone Number'
                      })
                    } else if (info.title === 'Email') {
                      event({
                        action: 'email_click',
                        category: 'contact',
                        label: 'Email Address'
                      })
                    }
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 block"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">{info.emoji}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{info.title}</h4>
                      <p className="text-gray-600 whitespace-pre-line">{info.content}</p>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Emergency Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-primary-500 to-primary-700 rounded-xl p-6 text-white"
            >
              <h4 className="font-semibold mb-2">Need Emergency Cleaning?</h4>
              <p className="text-primary-100 mb-4">
                We offer 24/7 emergency cleaning services for urgent situations.
              </p>
              <a
                href="tel:+447766932674"
                onClick={() => event({
                  action: 'emergency_phone_click',
                  category: 'contact',
                  label: 'Emergency Phone'
                })}
                className="inline-block bg-white text-primary-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Call Emergency Line
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact