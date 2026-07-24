import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function TermsOfService() {
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 px-8 max-w-4xl mx-auto w-full">
        <h1 className="text-4xl font-headline font-black text-on-surface mb-8">Terms of Service</h1>
        
        <div className="space-y-8 text-on-surface-variant leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-on-surface">1. Agreement to Terms</h2>
            <p>By accessing or using the Qayam platform, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access our service.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-on-surface">2. Description of Service</h2>
            <p>Qayam provides an online aggregation platform connecting students searching for housing with verified hostel owners (Wardens). Qayam itself does not own, manage, or operate any of the listed properties.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-on-surface">3. Financial Transactions</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Zero Commission:</strong> Qayam operates on a 0% commission model for students. We do not charge students for browsing or contacting properties.</li>
              <li><strong>Direct Dealings:</strong> Any rental agreements, security deposits, or monetary transactions are exclusively between the student and the Warden. Qayam assumes no liability for financial disputes.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-on-surface">4. User Responsibilities</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Students:</strong> You agree to provide accurate information when utilizing contact forms and expect to adhere to the personal codes of conduct maintained by the properties you inquire with.</li>
              <li><strong>Wardens:</strong> You guarantee that submitted property details, pricing, and images are strictly accurate. You agree to immediately update the platform if capacity or pricing changes.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-on-surface">5. Verification Badge</h2>
            <p>The "Verified" badge on Qayam signifies that basic due diligence checks have been processed for a property. However, it does not act as an absolute guarantee of quality or safety. Users are strongly encouraged to visit the property physically before authorizing any payments.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-on-surface">6. Termination</h2>
            <p>We may terminate or suspend access to our service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
          </section>

          <section className="space-y-4 pt-8 border-t border-surface-container-high text-sm">
            <p><em>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</em></p>
            <p>If you have any questions about these Terms, please contact us at <a href="mailto:mrqasimhaleem@gmail.com" className="text-primary font-bold">mrqasimhaleem@gmail.com</a>.</p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
