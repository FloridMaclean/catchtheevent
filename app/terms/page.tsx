'use client'

import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function TermsPage() {
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
                Terms of Service
              </h1>
              <p className="text-lg text-gray-600">
                Please read these terms carefully before using our platform
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
                <p className="text-yellow-800 font-semibold">
                  PLEASE READ THESE TERMS OF SERVICE CAREFULLY. BY CLICKING "I ACCEPT" OR BY ACCESSING OR USING ANY PART OF THE "CATCH THE EVENT" SERVICES, YOU AGREE TO BE BOUND BY THESE TERMS AND ALL POLICIES REFERENCED HEREIN.
                </p>
              </div>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Definitions</h2>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>"Services":</strong> Refers to the "Catch The Event" website, platform, and all associated products, services, features, content, and applications, including but not limited to event creation, ticket sales, attendee management, and check-in systems.</li>
                  <li><strong>"User":</strong> Any individual or entity accessing or using the Services, including Organizers and Attendees.</li>
                  <li><strong>"Organizer":</strong> A User who creates, lists, promotes, and manages events on the Services.</li>
                  <li><strong>"Attendee":</strong> A User who browses, registers for, purchases tickets for, or attends events listed on the Services.</li>
                  <li><strong>"Content":</strong> Any and all text, images, graphics, audio, video, software, data, or other materials made available through the Services.</li>
                  <li><strong>"Ticket Face Value":</strong> The base price of a ticket set by the Organizer, excluding any Service Fees or Payment Processing Fees.</li>
                  <li><strong>"Service Fees":</strong> Fees charged by "Catch The Event" for the use of its ticketing services.</li>
                  <li><strong>"Payment Processing Fees":</strong> Fees charged by payment gateways (Stripe/PayPal) for processing transactions.</li>
                  <li><strong>"All-in Pricing":</strong> The display of the total cost of a ticket, inclusive of all applicable fees and taxes, upfront to the Attendee before purchase.</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Acceptance of Terms</h2>
                <p className="text-gray-700">
                  By creating an account, accessing, or using the Services, you affirm that you are at least 18 years of age and are legally capable of entering into this binding agreement. If you are accessing or using the Services on behalf of a company or other legal entity, you represent that you have the authority to bind such entity to these Terms.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Account Registration and Eligibility</h2>
                <div className="space-y-4 text-gray-700">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Account Creation:</h3>
                    <p>To access certain features of the Services, you may be required to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Account Security:</h3>
                    <p>You are solely responsible for maintaining the confidentiality of your account password and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account. We are not liable for any loss or damage arising from your failure to comply with this security obligation.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Eligibility:</h3>
                    <p>You must not be a person barred from receiving the Services under the laws of Canada or other applicable jurisdiction. We reserve the right to refuse service, terminate accounts, or remove or edit content in our sole discretion.</p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Organizer Responsibilities</h2>
                <p className="text-gray-700 mb-4">If you are an Organizer, the following responsibilities apply to you:</p>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">a. Event Content and Accuracy</h3>
                    <div className="space-y-3 text-gray-700">
                      <p><strong>Truthful Representation:</strong> You represent and warrant that all information provided about your events, including descriptions, dates, times, locations, ticket types, pricing, and availability, is accurate, complete, and not misleading.</p>
                      <p><strong>Legal Compliance:</strong> Your events and all associated content must comply with all applicable local, provincial, federal, and international laws, regulations, and industry standards, including those pertaining to intellectual property, privacy, public health, and safety.</p>
                      <p><strong>Appropriate Content:</strong> You shall ensure that all Content associated with your events (e.g., text, images, videos, logos) is suitable for a general audience and does not contain:</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Hate speech, discriminatory remarks, or incitement to violence.</li>
                        <li>Sexually explicit, obscene, or unlawful material.</li>
                        <li>Promotion of illegal activities or regulated goods/services (e.g., firearms, illegal drugs).</li>
                        <li>Content that infringes upon the intellectual property rights (e.g., copyright, trademark) of any third party.</li>
                      </ul>
                      <p><strong>"All-in Pricing" Compliance:</strong> For all paid tickets, you shall adhere strictly to our "All-in Pricing" policy. This requires that the total cost of a ticket, inclusive of all Service Fees and Payment Processing Fees, is clearly and transparently displayed upfront to the Attendee before the final purchase confirmation.</p>
                      <p><strong>Event Cancellation/Postponement:</strong> You agree to promptly notify Attendees of any event cancellations, postponements, or significant changes.</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">b. Promotional Practices</h3>
                    <div className="space-y-3 text-gray-700">
                      <p><strong>Truthful Advertising:</strong> You shall promote your events truthfully and shall not engage in any deceptive, misleading, or unfair advertising or marketing practices.</p>
                      <p><strong>No Spam:</strong> You shall not engage in unauthorized or unsolicited commercial messages, including but not limited to spamming, chain letters, or any form of aggressive, unconsented promotional activities outside the designated features of the Services.</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">c. Attendee Management and Communication</h3>
                    <div className="space-y-3 text-gray-700">
                      <p><strong>Attendee List Management:</strong> You shall utilize the provided tools to view and manage your attendee lists.</p>
                      <p><strong>Ticket Transfers/Name Changes:</strong> You shall facilitate ticket transfers or name changes for Attendees in accordance with the features provided by the Services.</p>
                      <p><strong>Custom Information Collection:</strong> You may utilize the "custom datacells" feature to collect additional information from Attendees during registration, provided that such collection complies with all applicable privacy laws and is clearly disclosed to the Attendee.</p>
                      <p><strong>Automated Reminders:</strong> You may configure and utilize automated event reminders for Attendees through the Organizer dashboard.</p>
                      <p><strong>Communication:</strong> While direct platform communication with Attendees is not generally provided, you may communicate with Attendees via email to resolve inquiries or issues they raise. All such communications must be professional and respectful.</p>
                      <p><strong>Data Use:</strong> If you export Attendee data (e.g., CSV or Excel files), you are solely responsible for its lawful use, including compliance with all applicable data protection and privacy regulations (e.g., Canada's Personal Information Protection and Electronic Documents Act (PIPEDA)) for any subsequent marketing or Customer Relationship Management (CRM) activities. "Catch The Event" may also use this data for its own marketing purposes.</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">d. Platform Security and Compliance</h3>
                    <div className="space-y-3 text-gray-700">
                      <p><strong>Check-in System Integrity:</strong> You shall utilize the unique QR codes provided for each ticket for secure check-in purposes. You shall not attempt to bypass, disable, or undermine the platform's fraud detection algorithms or any other security features.</p>
                      <p><strong>No Custom Fees:</strong> Currently, Organizers are prohibited from adding their own custom fees to tickets beyond the standard "Catch The Event" Service Fees and Payment Processing Fees. Any future allowance for custom fees will be explicitly communicated and governed by updated Terms.</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Attendee Responsibilities</h2>
                <p className="text-gray-700 mb-4">If you are an Attendee, the following responsibilities apply to you:</p>
                <div className="space-y-3 text-gray-700">
                  <p><strong>Respectful Conduct:</strong> You shall treat Organizers, other Attendees, and "Catch The Event" staff with respect, courtesy, and professionalism.</p>
                  <p><strong>Lawful Ticket Use:</strong> You shall use tickets purchased through the Services lawfully and for their intended purpose. You shall not engage in unauthorized duplication, fraudulent alteration, or use of tickets that are not legitimately yours. Resale policies are determined by the individual event Organizer, and "Catch The Event" is not responsible for secondary market transactions unless explicitly facilitated by our Services.</p>
                  <p><strong>Accurate Information:</strong> You shall provide accurate and truthful information when creating an account or purchasing tickets.</p>
                  <p><strong>Reporting Issues:</strong> You are encouraged to report any suspicious activity, inappropriate Content, or accessibility barriers encountered on the Services to us immediately.</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Fees, Payments, and Payouts</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">a. Fees</h3>
                    <div className="space-y-3 text-gray-700">
                      <p><strong>Organizer Listing Fee:</strong> Listing events on "Catch The Event" is free for Organizers.</p>
                      <p><strong>Service Fees:</strong> A Service Fee of 2.5% of the Ticket Face Value + C$1.20 per ticket is charged.</p>
                      <p><strong>Payment Processing Fees:</strong> A Payment Processing Fee of 2.4% of the total order is charged.</p>
                      <p><strong>Fee Allocation:</strong> All Service Fees and Payment Processing Fees are charged directly to the Attendee.</p>
                      <p><strong>At-the-Door Fees:</strong> The same fee structure (2.5% + C$1.20 + 2.4%) applies to tickets sold at the event location via our web-based check-in system.</p>
                      <p><strong>Donation Fees:</strong> "Catch The Event" levies no fee at all on donations collected through the platform.</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">b. Payments</h3>
                    <div className="space-y-3 text-gray-700">
                      <p><strong>Supported Currencies:</strong> Transactions are supported in Canadian Dollars (CAD) and United States Dollars (USD).</p>
                      <p><strong>Supported Payment Methods:</strong> We accept credit cards, debit cards, PayPal, and Cash App for ticket purchases.</p>
                      <p><strong>Secure Processing:</strong> All payments are processed securely through renowned and trusted payment gateways (Stripe/PayPal). We do not store sensitive payment card information on our servers.</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">c. Payouts to Organizers</h3>
                    <div className="space-y-3 text-gray-700">
                      <p><strong>Payout Schedule:</strong> Funds from ticket sales are generally deposited into the Organizer's designated account immediately after the event is completed. The usual processing time for funds to be deposited is 3 business days, with an actual timeline of up to 7 business days.</p>
                      <p><strong>Early Payouts:</strong> Organizers may request early payouts by contacting info@catchtheevent.com. Such requests will be evaluated on a case-by-case basis. For approved early payouts, a 30% hold of the payment will be retained to cover potential refunds or cancellations. Early payouts are not always guaranteed and are subject to our sole discretion and risk assessment.</p>
                      <p><strong>No Funds Held by "Catch The Event":</strong> For standard payouts, "Catch The Event" does not hold Organizer funds directly; rather, funds are managed by the payment gateways until transferred to the Organizer's account.</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">d. Refund Policy for Fees</h3>
                    <div className="space-y-3 text-gray-700">
                      <p><strong>Refunds on Cancellation:</strong> In the event of an event cancellation or delay, refunds will be issued for the Ticket Face Value.</p>
                      <p><strong>Non-Refundable Fees:</strong> Service Fees (2.5% + C$1.20) and Payment Processing Fees (2.4%) are strictly non-refundable under any circumstances, except where explicitly mandated by law. Organizers are responsible for communicating this policy to Attendees.</p>
                      <p><strong>Refund Workflow:</strong> The refund workflow is available within the Organizer dashboard.</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Content Ownership and Licenses</h2>
                <div className="space-y-4 text-gray-700">
                  <p><strong>User Content:</strong> You retain all ownership rights to the Content you submit, post, or display on or through the Services.</p>
                  <p><strong>License to "Catch The Event":</strong> By submitting, posting, or displaying Content on or through the Services, you grant us a worldwide, non-exclusive, royalty-free, transferable, and sublicensable license to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, publicly perform, and publicly display such Content in connection with the operation of the Services and for our own marketing and promotional purposes, across all media now known or hereafter devised. This license includes the right for "Catch The Event" to use organizer logos and banner images for promotional purposes.</p>
                  <p><strong>Feedback:</strong> If you provide us with any suggestions, comments, or other feedback relating to our Services, you grant us a worldwide, perpetual, irrevocable, royalty-free license to use, reproduce, modify, distribute, and otherwise exploit such feedback for any purpose, without obligation or compensation to you.</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Prohibited Conduct</h2>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Using the Services for any unlawful purpose or in violation of any applicable laws or regulations.</li>
                  <li>Posting or transmitting any Content that is illegal, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, invasive of another's privacy, hateful, or racially, ethnically, or otherwise objectionable.</li>
                  <li>Impersonating any person or entity, or falsely stating or otherwise misrepresenting your affiliation with a person or entity.</li>
                  <li>Engaging in spamming, phishing, or other deceptive practices.</li>
                  <li>Uploading or transmitting viruses, worms, Trojan horses, or any other malicious code, files, or programs designed to interrupt, destroy, or limit the functionality of any computer software, hardware, or telecommunications equipment.</li>
                  <li>Attempting to gain unauthorized access to our systems, other user accounts, or any network connected to the Services.</li>
                  <li>Interfering with or disrupting the integrity or performance of the Services or the data contained therein.</li>
                  <li>Circumventing, disabling, or otherwise interfering with security-related features of the Services, including unique QR codes and fraud detection algorithms.</li>
                  <li>Collecting or harvesting any personally identifiable information from the Services without explicit consent.</li>
                  <li>Reproducing, duplicating, copying, selling, reselling, or exploiting any portion of the Services without our express written permission.</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Intellectual Property</h2>
                <div className="space-y-4 text-gray-700">
                  <p><strong>Our Intellectual Property:</strong> All rights, title, and interest in and to the Services (excluding Content provided by Users) are and will remain the exclusive property of "Catch The Event" and its licensors. The Services are protected by copyright, trademark, and other laws of both Canada and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent.</p>
                  <p><strong>User Compliance:</strong> You agree to respect the intellectual property rights of others. You shall not upload, post, or otherwise make available any Content that infringes any copyright, trademark, patent, trade secret, or other proprietary right of any party.</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Disclaimers and Limitation of Liability</h2>
                <div className="space-y-4 text-gray-700">
                  <p><strong>Services Provided "AS IS":</strong> The Services are provided on an "AS IS" and "AS AVAILABLE" basis. We make no warranties, expressed or implied, regarding the Services, including but not limited to implied warranties of merchantability, fitness for a particular purpose, non-infringement, or course of performance.</p>
                  <p><strong>No Warranty of Uninterrupted Service:</strong> We do not warrant that the Services will be uninterrupted, secure, or error-free, or that defects will be corrected.</p>
                  <p><strong>Organizer Responsibility for Events:</strong> We are not responsible for the quality, safety, legality, or any other aspect of events listed on our platform. Organizers are solely responsible for their events and compliance with all applicable laws.</p>
                  <p><strong>Limitation of Liability:</strong> To the fullest extent permitted by applicable law, in no event shall "Catch The Event," its affiliates, directors, employees, or agents be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Services; (ii) any conduct or content of any third party on the Services; (iii) any content obtained from the Services; and (iv) unauthorized access, use, or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence), or any other legal theory, whether or not we have been informed of the possibility of such damage.</p>
                  <p><strong>Maximum Liability:</strong> In no event shall our total liability to you for all damages, losses, and causes of action exceed the amount paid by you, if any, for accessing or using the Services during the twelve (12) months immediately preceding the date of the claim, or C$100.00, whichever is greater.</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Indemnification</h2>
                <p className="text-gray-700">
                  You agree to defend, indemnify, and hold harmless "Catch The Event" and its licensees and licensors, and their employees, contractors, agents, officers, and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees), resulting from or arising out of a) your use and access of the Services, by you or any person using your account and password; b) a breach of these Terms; or c) Content posted by you on the Services.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Termination</h2>
                <div className="space-y-4 text-gray-700">
                  <p>We may terminate or suspend your account and bar access to the Services immediately, without prior notice or liability, in our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of these Terms. If you wish to terminate your account, you may do so by contacting us.</p>
                  <p>All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Governing Law and Dispute Resolution</h2>
                <div className="space-y-4 text-gray-700">
                  <p><strong>Governing Law:</strong> These Terms shall be governed and construed in accordance with the laws of the Province of Ontario, Canada, without regard to its conflict of law provisions.</p>
                  <p><strong>Jurisdiction:</strong> Any dispute arising under these Terms shall be resolved in the courts located in Toronto, Ontario, Canada.</p>
                  <p><strong>Informal Resolution:</strong> We encourage you to contact us directly to resolve any concerns or disputes informally.</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Changes to Terms</h2>
                <p className="text-gray-700">
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                </p>
                <p className="text-gray-700 mt-4">
                  By continuing to access or use our Services after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the Services.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Miscellaneous</h2>
                <div className="space-y-4 text-gray-700">
                  <p><strong>Entire Agreement:</strong> These Terms, together with the Privacy Policy, Accessibility Statement, and Community Guidelines, constitute the entire agreement between you and "Catch The Event" regarding the Services.</p>
                  <p><strong>Waiver and Severability:</strong> Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.</p>
                  <p><strong>Assignment:</strong> You may not assign or transfer these Terms, by operation of law or otherwise, without our prior written consent. Any attempt by you to assign or transfer these Terms, without such consent, will be null and of no effect. We may assign or transfer these Terms, at our sole discretion, without restriction.</p>
                </div>
              </section>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-8">
                <p className="text-blue-800 font-semibold">
                  By continuing to use our Services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
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