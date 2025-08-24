'use client'

import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
          >
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Accessibility Statement
              </h1>
              <p className="text-lg text-gray-600">
                Ensuring digital accessibility for all users
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <div className="bg-purple-50 border-l-4 border-purple-400 p-4 mb-8">
                <p className="text-purple-800">
                  "Catch The Event" is committed to ensuring digital accessibility for all users, including those with disabilities.
                </p>
              </div>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Our Commitment to Accessibility</h2>
                <p className="text-gray-700 mb-4">
                  At "Catch The Event," we believe that everyone should have equal access to information and functionality on our platform. We are dedicated to making our website, catchtheevent.com, and all our related services accessible to the widest possible audience, regardless of ability or assistive technology used.
                </p>
                <p className="text-gray-700">
                  We strive to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards. These guidelines explain how to make web content more accessible for people with disabilities, and user-friendly for everyone. Our efforts are ongoing and include regular reviews and updates to enhance accessibility.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Accessibility Features Implemented</h2>
                <p className="text-gray-700 mb-4">
                  While accessibility is an ongoing process, "Catch The Event" incorporates several features and practices designed to enhance usability for all users:
                </p>
                <ul className="list-disc pl-6 space-y-3 text-gray-700">
                  <li><strong>Semantic HTML:</strong> We use meaningful HTML markup to structure content, making it easier for screen readers and other assistive technologies to interpret and navigate.</li>
                  <li><strong>Keyboard Navigation:</strong> Our website is designed to be fully navigable using a keyboard, allowing users who cannot use a mouse to access all interactive elements.</li>
                  <li><strong>Clear and Consistent Layout:</strong> We prioritize a consistent and intuitive layout, making it easier for users to understand where they are on the site and how to find information.</li>
                  <li><strong>High Contrast and Legible Typography:</strong> We employ sufficient color contrast between text and background elements to improve readability for users with visual impairments.</li>
                  <li><strong>Responsive Design:</strong> The "Catch The Event" website is designed to be mobile UI friendly and fully responsive, ensuring optimal viewing and interaction across different devices (mobile phones, tablets, laptops, and desktop computers).</li>
                  <li><strong>Image Alternatives (Alt Text):</strong> We strive to provide descriptive alternative text for all meaningful images, allowing screen readers to convey image content to visually impaired users.</li>
                  <li><strong>Form Accessibility:</strong> Our forms are designed with clear labels, logical tab order, and error identification to ensure they are accessible and easy to complete.</li>
                  <li><strong>Scalable Text:</strong> Users can adjust text size through their browser settings without loss of content or functionality.</li>
                  <li><strong>Focus Management:</strong> We ensure that focus indicators are visible when navigating with a keyboard, helping users track their position on the page.</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Areas for Ongoing Improvement</h2>
                <p className="text-gray-700 mb-4">
                  We recognize that accessibility is a journey, not a destination. We are continuously working to improve the accessibility of "Catch The Event." Our ongoing efforts include:
                </p>
                <ul className="list-disc pl-6 space-y-3 text-gray-700">
                  <li>Regular accessibility audits and testing, including testing with assistive technologies.</li>
                  <li>Training our development and content teams on accessibility best practices.</li>
                  <li>Monitoring and addressing new accessibility challenges as technology and standards evolve.</li>
                  <li>Incorporating accessibility considerations into the design and development of all new features, including upcoming mobile apps, virtual event integrations, and AI assistance.</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Feedback Mechanism</h2>
                <p className="text-gray-700">
                  Your feedback is invaluable to our efforts to improve accessibility. If you encounter any accessibility barriers while using "Catch The Event," or have suggestions on how we can improve, please do not hesitate to contact us.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Contact Us</h2>
                <p className="text-gray-700 mb-4">For any accessibility-related inquiries or to report an issue, please reach out to us:</p>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Email:</strong> <a href="mailto:info@catchtheevent.com" className="text-primary-600 hover:text-primary-800 transition-colors duration-200">info@catchtheevent.com</a></p>
                  <p><strong>Via our Self-service Help Center/FAQs:</strong> Available on our website.</p>
                </div>
              </section>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-8">
                <p className="text-blue-800 font-semibold">
                  We appreciate your patience and support as we work to make "Catch The Event" accessible for everyone.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
} 