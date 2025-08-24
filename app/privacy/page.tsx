'use client'

import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function PrivacyPage() {
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
                Privacy Policy
              </h1>
              <p className="text-lg text-gray-600">
                How we collect, use, and protect your information
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8">
                <p className="text-blue-800">
                  This Privacy Policy ("Policy") sets forth the policies and procedures governing the collection, use, and disclosure of information by "Catch The Event" ("we," "us," or "our") in connection with your access and use of our website, platform, and related services (collectively, the "Services"). By utilizing our Services, you acknowledge and agree to the terms and conditions set forth in this Policy. We are committed to upholding your privacy rights and ensuring the security of your personal information.
                </p>
              </div>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information Collection</h2>
                <p className="text-gray-700 mb-4">We collect various categories of information from users interacting with our Services:</p>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">a. Information Voluntarily Provided by You</h3>
                    <div className="space-y-3 text-gray-700">
                      <p><strong>Account Information:</strong> Upon registration for an account (whether as an event organizer or an attendee), we collect personal identifiers and contact details, including but not limited to your full name, email address, and a designated password. For event organizers, this may additionally encompass business-related information.</p>
                      <p><strong>Event Creation Data (Organizers):</strong> When you create an event listing, we collect comprehensive details pertaining to the event, including its title, descriptive content, scheduled dates, geographical location, associated banner images, organizational logos, and specified ticket categories (e.g., complimentary, multi-day access, or specialized passes).</p>
                      <p><strong>Ticket Transaction Data (Attendees):</strong> When you engage in the purchase of event tickets, we collect your name, email address, and requisite payment instrument details (e.g., credit card information, debit card details, or account particulars for PayPal and Cash App). All payment transactions are processed securely via third-party payment gateways (Stripe/PayPal), and we expressly state that we do not retain or store your full payment card numbers on our systems. Furthermore, we collect any custom information fields stipulated by the event organizer during the registration process (e.g., dietary preferences, apparel sizing).</p>
                      <p><strong>Communication Records:</strong> Should you initiate contact with our designated support channels (via email correspondence or our self-service help center), we maintain records of such communications, including the content of your messages and any supplementary information you elect to provide during such interactions.</p>
                      <p><strong>Donation Transaction Data:</strong> In instances where you elect to solicit or remit donations through the platform, we collect relevant transaction details associated with such contributions.</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">b. Information Automatically Collected</h3>
                    <div className="space-y-3 text-gray-700">
                      <p><strong>Usage Data:</strong> We automatically gather data concerning your engagement with our Services, including, but not limited to, pages viewed, events searched, functionalities accessed, and timestamps of your activities. For event organizers, this encompasses real-time sales tracking data and check-in reports.</p>
                      <p><strong>Device Information:</strong> We collect information pertaining to the device(s) employed to access our Services, which may include your Internet Protocol (IP) address, browser type, operating system, and mobile network specifics.</p>
                      <p><strong>Geographical Data:</strong> We may infer your generalized geographical location (e.g., city, province, country) based on your IP address. This information is utilized for purposes such as providing personalized event recommendations and displaying relevant currency denominations (CAD/USD).</p>
                      <p><strong>Cookies and Equivalent Technologies:</strong> We deploy cookies and similar tracking technologies to monitor and retain certain information concerning activity on our Service. These technologies facilitate an understanding of platform usage, enhance user experience, and serve essential security functions (e.g., generation of unique QR codes for tickets, implementation of fraud detection mechanisms).</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Utilization of Information</h2>
                <ul className="list-disc pl-6 space-y-3 text-gray-700">
                  <li><strong>Service Provision and Maintenance:</strong> To operate, manage, and enhance the functionality and accessibility of our website and ticketing platform, encompassing features such as event creation, ticket sales facilitation, attendee management, and check-in systems.</li>
                  <li><strong>Transaction Processing:</strong> To execute ticket purchase transactions, administer payouts to event organizers (facilitated via Stripe/PayPal), and manage donation contributions.</li>
                  <li><strong>Communication:</strong> To dispatch essential transactional communications (e.g., electronic tickets, purchase confirmations, refund notifications), deliver automated event reminders as configured by organizers, and respond to inquiries submitted by users.</li>
                  <li><strong>Personalization:</strong> To deliver personalized event recommendations to users holding active accounts.</li>
                  <li><strong>Analytical and Reporting Purposes:</strong> To conduct analyses of usage trends, monitor sales performance (including real-time sales tracking), generate comprehensive attendee demographic and contact information reports for organizers, and derive insights for continuous Service enhancement.</li>
                  <li><strong>Security and Fraud Prevention:</strong> To ensure a "safe and secure ticket-buying experience," actively prevent fraudulent activities (e.g., through the deployment of unique QR codes and sophisticated fraud detection algorithms), and safeguard user data through robust encryption protocols and payment security systems.</li>
                  <li><strong>Regulatory Compliance:</strong> To fulfill our legal obligations, including adherence to Canadian "all-in pricing" mandates and other applicable statutory and regulatory requirements.</li>
                  <li><strong>Marketing and Promotional Activities:</strong> To facilitate the sharing of events across social media platforms (e.g., Instagram, Facebook, and via direct URL links), and for our internal marketing and promotional endeavors, utilizing collected data as delineated in our competitive analysis.</li>
                  <li><strong>Future Service Development:</strong> Collected information serves as a basis for informing the development and integration of "coming soon" features, such as artificial intelligence assistance, seating chart functionalities, dedicated mobile applications, and virtual/hybrid event support capabilities.</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Information Disclosure</h2>
                <ul className="list-disc pl-6 space-y-3 text-gray-700">
                  <li><strong>To Event Organizers:</strong> For all ticketed events, we share the names, contact information, and any custom data collected during attendee registration with the relevant event organizer, solely for attendee management and reporting functions.</li>
                  <li><strong>To Payment Processors:</strong> We disclose necessary transaction data to our trusted third-party payment gateways, Stripe and PayPal, to ensure the secure and efficient processing of payments and payouts.</li>
                  <li><strong>To Third-Party Service Providers:</strong> We may engage third-party vendors and service providers to perform functions on our behalf, including but not limited to cloud hosting, data analytics, marketing services, and security services.</li>
                  <li><strong>For Legal Compliance and Enforcement:</strong> We may disclose your information if mandated by applicable law, regulation, legal process, or governmental request.</li>
                  <li><strong>Business Transfers:</strong> In the event of a corporate merger, acquisition, asset sale, or similar transaction involving all or a portion of our assets, your information may be transferred as part of that transaction.</li>
                  <li><strong>With Your Express Consent:</strong> We may share your information with additional third parties contingent upon your explicit consent.</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Security Measures</h2>
                <p className="text-gray-700 mb-4">We implement a comprehensive array of technical, administrative, and physical security measures designed to safeguard your personal information against unauthorized access, disclosure, alteration, or destruction. These measures include:</p>
                <ul className="list-disc pl-6 space-y-3 text-gray-700">
                  <li><strong>Data Encryption:</strong> Personal information is subjected to encryption to enhance the confidentiality and integrity of your data.</li>
                  <li><strong>Payment Security Protocols:</strong> Robust payment security protocols are maintained to ensure the secure handling of financial transactions.</li>
                  <li><strong>Unique QR Codes & Fraud Detection:</strong> Our check-in module leverages unique, non-repeating QR codes for each ticket and incorporates sophisticated backend fraud detection algorithms to mitigate fraudulent activities and affirm ticket authenticity ("100% Real Tickets").</li>
                  <li><strong>Utilization of Trusted Payment Gateways:</strong> All payouts and payments are processed through globally recognized and trusted payment gateways, Stripe and PayPal, thereby ensuring "100% Secure Event Payments."</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Your Rights and Choices</h2>
                <ul className="list-disc pl-6 space-y-3 text-gray-700">
                  <li><strong>Access and Rectification:</strong> You are entitled to access and modify most of your account information directly through your "Catch The Event" account settings.</li>
                  <li><strong>Data Export (Organizers):</strong> Event organizers are provided with the capability to export their attendee lists and associated contact information for their independent operational use.</li>
                  <li><strong>Account Deletion:</strong> You may request the deletion of your account by contacting our support team. Please be advised that certain information may be retained for legitimate business purposes or to comply with legal obligations.</li>
                  <li><strong>Marketing Communication Preferences:</strong> You retain the right to opt-out of receiving promotional emails from us by adhering to the unsubscribe instructions embedded within such communications.</li>
                  <li><strong>Custom Information (Attendees):</strong> Event organizers may configure custom data fields during event registration. Your explicit consent to provide such information will be sought at the time of registration.</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Children's Privacy</h2>
                <p className="text-gray-700">
                  Our Services are not directed to individuals under the age of thirteen (13) years. We do not knowingly solicit or collect personally identifiable information from children under 13. If you are a parent or legal guardian and become aware that your child has provided us with personal information without verifiable parental consent, please contact us promptly. Should we become aware that we have inadvertently collected personal information from a child under the age of 13 without appropriate parental consent, we shall undertake immediate steps to remove such information from our servers.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Revisions to This Privacy Policy</h2>
                <p className="text-gray-700">
                  We reserve the right to revise or update this Privacy Policy periodically. We will apprise you of any material changes by publishing the updated Privacy Policy on this page and revising the "Last Updated" date prominently displayed at the commencement of this Policy. You are encouraged to review this Privacy Policy periodically for any modifications. All modifications to this Privacy Policy become effective upon their publication on this page.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Contact Information</h2>
                <p className="text-gray-700 mb-4">For any inquiries or concerns pertaining to this Privacy Policy, please contact us via:</p>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Email:</strong> <a href="mailto:info@catchtheevent.com" className="text-primary-600 hover:text-primary-800 transition-colors duration-200">info@catchtheevent.com</a></p>
                  <p><strong>Self-service Help Center/FAQs:</strong> Available on our website.</p>
                </div>
              </section>

              <div className="bg-green-50 border-l-4 border-green-400 p-4 mt-8">
                <p className="text-green-800 font-semibold">
                  We are committed to protecting your privacy and ensuring the security of your personal information. If you have any questions about this Privacy Policy, please don't hesitate to contact us.
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