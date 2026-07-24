import React from 'react';
import Sidebar from '../components/Sidebar';
import { BookOpen, Image as ImageIcon, MapPin, DollarSign, Settings, CheckCircle2 } from 'lucide-react';

export default function WardenGuidance() {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <main className="lg:ml-72 min-h-screen p-8 lg:p-12">
        <header className="mb-12">
          <h2 className="text-4xl font-black text-primary tracking-tighter mb-2">Warden Guidance</h2>
          <p className="text-on-surface-variant font-medium">Best practices for managing your hostel listings on Qayam.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
          
          <section className="bg-surface-container-lowest rounded-xl p-8 editorial-shadow">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
              <ImageIcon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">1. High-Quality Images</h3>
            <p className="text-sm text-on-surface-variant mb-4 leading-relaxed">
              Clear, well-lit photos increase booking rates by 40%. Ensure your photos showcase the common areas, bedrooms, and the exterior of the building.
            </p>
            <ul className="space-y-2">
              <li className="flex gap-2 text-sm text-on-surface"><CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Use natural light when possible.</li>
              <li className="flex gap-2 text-sm text-on-surface"><CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Landscape (horizontal) orientation works best.</li>
              <li className="flex gap-2 text-sm text-on-surface"><CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Keep file sizes under 5MB for faster loading.</li>
            </ul>
          </section>

          <section className="bg-surface-container-lowest rounded-xl p-8 editorial-shadow">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
              <DollarSign className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">2. Accurate Pricing & Details</h3>
            <p className="text-sm text-on-surface-variant mb-4 leading-relaxed">
              Transparency builds trust with students. Your listed monthly rent should include standard utility expectations unless otherwise stated.
            </p>
            <ul className="space-y-2">
              <li className="flex gap-2 text-sm text-on-surface"><CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Update pricing immediately if costs change.</li>
              <li className="flex gap-2 text-sm text-on-surface"><CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Clearly state what amenities are included in the price.</li>
            </ul>
          </section>

          <section className="bg-surface-container-lowest rounded-xl p-8 editorial-shadow">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">3. Managing Amenities</h3>
            <p className="text-sm text-on-surface-variant mb-4 leading-relaxed">
              Students frequently filter hostels based on available amenities. Selecting the right amenities makes your hostel more discoverable.
            </p>
            <ul className="space-y-2">
              <li className="flex gap-2 text-sm text-on-surface"><CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Make sure to toggle on "WiFi" and "AC" if provided.</li>
              <li className="flex gap-2 text-sm text-on-surface"><CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Mention power backup setups to attract more views.</li>
            </ul>
          </section>

          <section className="bg-surface-container-lowest rounded-xl p-8 editorial-shadow">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">4. Profile Maintenance</h3>
            <p className="text-sm text-on-surface-variant mb-4 leading-relaxed">
              Keep your contact information updated. If your phone number changes, update it in your profile so students can reach you.
            </p>
            <ul className="space-y-2">
              <li className="flex gap-2 text-sm text-on-surface"><CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Use the dashboard to Delete closed locations.</li>
              <li className="flex gap-2 text-sm text-on-surface"><CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Use the dashboard Edit button to modify details.</li>
            </ul>
          </section>

        </div>
      </main>
    </div>
  );
}
