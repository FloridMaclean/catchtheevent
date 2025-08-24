'use client'

import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function CommunityPage() {
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
                Community Guidelines
              </h1>
              <p className="text-lg text-gray-600">
                Building a safe and respectful community for everyone
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-8">
                <p className="text-green-800">
                  Welcome to "Catch The Event"! Our platform is built on a foundation of trust, respect, and safety for everyone who uses our Services, whether you are an event organizer or an attendee. These Community Guidelines outline the standards of conduct and content we expect from all users to ensure a positive and secure environment for event discovery, creation, and participation.
                </p>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
                <p className="text-yellow-800 font-semibold">
                  By accessing or using "Catch The Event" Services, you agree to adhere to these Guidelines, in addition to our Terms of Service and Privacy Policy.
                </p>
              </div>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Our Purpose</h2>
                <p className="text-gray-700 mb-4">
                  "Catch The Event" aims to connect people with incredible experiences and empower organizers to bring their events to life. To achieve this, we rely on the cooperation and responsible behavior of our entire community. These Guidelines are designed to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Foster a welcoming, inclusive, and safe environment for all users.</li>
                  <li>Promote respectful and ethical conduct.</li>
                  <li>Ensure the integrity and authenticity of events and tickets.</li>
                  <li>Outline clear expectations for appropriate use of our platform.</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Scope of Guidelines</h2>
                <p className="text-gray-700 mb-4">These Community Guidelines apply to all content, interactions, and activities on "Catch The Event" Services, including:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Event listings, descriptions, images, and promotional materials.</li>
                  <li>User profiles and account information.</li>
                  <li>Communications between users, where applicable.</li>
                  <li>Ticket sales, transfers, and check-in processes.</li>
                  <li>Any other use of the "Catch The Event" website and platform.</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Core Principles</h2>
                <p className="text-gray-700 mb-4">Our community operates on the following core principles:</p>
                <ul className="list-disc pl-6 space-y-3 text-gray-700">
                  <li><strong>Respect:</strong> Treat all members of the "Catch The Event" community with respect, dignity, and courtesy. Disagreements should be handled constructively and respectfully.</li>
                  <li><strong>Safety:</strong> Prioritize the safety and well-being of all attendees and participants. Do not engage in or promote any activity that could cause harm, fear, or distress.</li>
                  <li><strong>Integrity:</strong> Be honest and transparent in all your dealings on the platform. Misrepresentation, fraud, and deceptive practices are strictly prohibited.</li>
                  <li><strong>Inclusivity:</strong> We celebrate diversity and do not tolerate discrimination or harassment of any kind.</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Guidelines for Event Organizers</h2>
                <p className="text-gray-700 mb-4">As an event organizer on "Catch The Event," you play a crucial role in maintaining our community standards. You are responsible for your events and all content associated with them.</p>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">a. Event Content & Accuracy</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li><strong>Accurate Representation:</strong> Ensure all event descriptions, dates, times, locations, and ticket details are accurate, complete, and up-to-date. Misleading information is prohibited.</li>
                      <li><strong>Legal Compliance:</strong> All events must comply with all applicable local, provincial, federal, and international laws and regulations.</li>
                      <li><strong>Appropriate Content:</strong> Event content (descriptions, images, videos) must be suitable for a general audience and not contain hate speech, sexually explicit material, or illegal activities.</li>
                      <li><strong>Transparent Pricing:</strong> Adhere strictly to our "all-in pricing" policy for all paid tickets. Ensure the total cost, including all fees, is clearly displayed upfront to attendees before purchase.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">b. Promotional Practices</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li><strong>Truthful Promotion:</strong> Promote your events truthfully and avoid deceptive marketing tactics.</li>
                      <li><strong>No Spam:</strong> Do not engage in spamming or unsolicited promotion outside the designated platform features.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">c. Attendee Management & Communication</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li><strong>Respectful Interaction:</strong> All interactions with attendees must be professional and respectful.</li>
                      <li><strong>Refund Policy Adherence:</strong> Process refunds in accordance with "Catch The Event's" stated refund policy.</li>
                      <li><strong>Data Use:</strong> If you export attendee data, ensure lawful use and compliance with privacy regulations (e.g., PIPEDA).</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">d. Platform Security & Compliance</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li><strong>Check-in System Integrity:</strong> Use QR codes for secure check-ins. Do not attempt to bypass fraud detection algorithms.</li>
                      <li><strong>No Custom Fees:</strong> Organizers cannot add their own custom fees beyond the standard "Catch The Event" and payment processing fees.</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Guidelines for Attendees</h2>
                <ul className="list-disc pl-6 space-y-3 text-gray-700">
                  <li><strong>Respectful Conduct:</strong> Treat organizers, other attendees, and platform staff with respect.</li>
                  <li><strong>Ticket Use:</strong> Use your purchased tickets lawfully and for their intended purpose. Do not attempt to duplicate, alter, or use tickets that are not legitimately yours.</li>
                  <li><strong>Honest Information:</strong> Provide accurate and truthful information when creating an account or purchasing tickets.</li>
                  <li><strong>Reporting Issues:</strong> If you encounter any suspicious activity, inappropriate content, or accessibility barriers, report it to us immediately.</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Prohibited Conduct</h2>
                <p className="text-gray-700 mb-4">
                  The following actions and content are strictly prohibited on "Catch The Event." Violation of these prohibitions may result in immediate suspension or termination of your account, removal of content, and/or other legal action.
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><strong>Illegal Activities:</strong> Do not promote or facilitate illegal activities such as the sale of illegal goods or gambling.</li>
                  <li><strong>Hate Speech & Discrimination:</strong> No content promoting hate, violence, or discrimination.</li>
                  <li><strong>Harassment & Bullying:</strong> No harassment, stalking, or intimidation.</li>
                  <li><strong>Misinformation & Deception:</strong> No spreading false information or impersonation.</li>
                  <li><strong>Malware & Hacking:</strong> No uploading or transmitting viruses, malware, or engaging in unauthorized system access.</li>
                  <li><strong>Spam & Unsolicited Content:</strong> No spamming or irrelevant commercial content.</li>
                  <li><strong>Infringement of Intellectual Property:</strong> Do not post content that violates copyrights or trademarks.</li>
                  <li><strong>Privacy Violations:</strong> No unauthorized collection or distribution of personal information.</li>
                  <li><strong>Self-Harm & Dangerous Content:</strong> Do not promote harmful or dangerous activities.</li>
                  <li><strong>Exploitation of Minors:</strong> Any content that exploits minors is prohibited and will be reported to authorities.</li>
                  <li><strong>Circumvention of Security:</strong> Do not attempt to bypass security features or fraud detection.</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Enforcement & Reporting</h2>
                <p className="text-gray-700 mb-4">
                  "Catch The Event" reserves the right, at its sole discretion, to take necessary actions to enforce these Community Guidelines, including:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Removing prohibited content.</li>
                  <li>Suspending or terminating user accounts.</li>
                  <li>Reporting illegal activities to law enforcement.</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  If you witness any violations, please report them to us immediately. Your reports help maintain a safe community.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Changes to These Community Guidelines</h2>
                <p className="text-gray-700">
                  We may update these Community Guidelines from time to time. You will be notified of significant changes by a revised date.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Contact Us</h2>
                <p className="text-gray-700 mb-4">If you have any questions or wish to report a violation, please contact us at:</p>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Email:</strong> <a href="mailto:info@catchtheevent.com" className="text-primary-600 hover:text-primary-800 transition-colors duration-200">info@catchtheevent.com</a></p>
                  <p><strong>Via our Self-service Help Center/FAQs:</strong> Available on our website.</p>
                </div>
              </section>

              <div className="bg-green-50 border-l-4 border-green-400 p-4 mt-8">
                <p className="text-green-800 font-semibold">
                  Thank you for being a responsible member of the "Catch The Event" community!
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