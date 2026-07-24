import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 px-8 max-w-4xl mx-auto w-full">
        <h1 className="text-4xl font-headline font-black text-on-surface mb-8">Privacy Policy</h1>
        
        <div className="space-y-8 text-on-surface-variant leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-on-surface">1. Introduction</h2>
            <p>Welcome to Qayam. We respect your privacy and are committed to protecting your personal data. This Privacy Policy outlines how we collect, use, and safeguard your information when you use our hostel connection platform.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-on-surface">2. Information We Collect</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Personal Identification Data:</strong> Name, email address, phone number, and account credentials when you register.</li>
              <li><strong>Location Data:</strong> With your permission, we use your device's geographical location to provide the "Near Me" GPS functionality.</li>
              <li><strong>Hostel & Property Data:</strong> If you are a Warden, we collect details regarding your properties, capacities, and uploaded verification media.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-on-surface">3. How We Use Your Information</h2>
            <p>We use your data strictly to operate our platform effectively. This includes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Facilitating direct communication between students and Wardens (via WhatsApp/Call integrations).</li>
              <li>Providing highly accurate local search results.</li>
              <li>Verifying the authenticity of property listings to ensure student safety.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-on-surface">4. Third-Party Sharing</h2>
            <p>Qayam is a 0% commission direct-connect platform. We do not sell, trade, or rent your personal identification information to unauthorized third-party vendors. Your contact details are only shared directly between verified Wardens and inquiring students.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-on-surface">5. Data Security</h2>
            <p>We adopt appropriate data collection, storage, and processing practices alongside elite security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information, username, and password stored on our platform.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-on-surface">6. Changes to this Policy</h2>
            <p>Qayam has the discretion to update this privacy policy at any time. We encourage users to frequently check this page for any changes to stay informed about how we are helping to protect the personal information we collect.</p>
          </section>

          <section className="space-y-4 pt-8 border-t border-surface-container-high text-sm">
            <p><em>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</em></p>
            <p>If you have any questions about this Privacy Policy, the practices of this site, or your dealings with this site, please contact us at <a href="mailto:support@qayam.com" className="text-primary font-bold">support@qayam.com</a>.</p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
