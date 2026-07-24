import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactUs() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: "247db73c-3d82-4e72-b23c-8854b61ee427", // <--- PLACE KEY HERE
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `Qayam Contact Form: Message from ${formData.name}`
        })
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setFormData({ name: '', email: '', message: '' });
        }, 3000);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to send message. Check your internet connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 px-8 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-5xl font-headline font-black text-on-surface">Get in Touch</h1>
          <p className="text-on-surface-variant max-w-2xl mx-auto text-lg">We're here to help! Whether you're a student looking for the perfect room or a warden wanting to list a new property, send us a message.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-surface-container-low p-8 rounded-3xl editorial-shadow space-y-6">
              <h2 className="text-2xl font-bold text-on-surface">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-on-surface">Main Office</h3>
                    <p className="text-on-surface-variant text-sm mt-1">Qayam Headquarters, Main University Road, Peshawar, KPK 25000</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-on-surface">Phone Support</h3>
                    <p className="text-on-surface-variant text-sm mt-1">+92 300 1234567<br />Mon-Fri from 9am to 6pm</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-on-surface">Email Us</h3>
                    <p className="text-on-surface-variant text-sm mt-1">mrqasimhaleem@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-highest p-8 rounded-3xl text-center">
              <h3 className="font-bold text-on-surface mb-2">Are you a Hostel Owner?</h3>
              <p className="text-sm text-on-surface-variant mb-4">You can list your hostel and gain visibility by navigating directly to our Wardens Dashboard.</p>
              <a href="/login" className="inline-block bg-primary text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-secondary transition-colors">List Your Property</a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-surface-container-lowest p-8 md:p-10 rounded-3xl editorial-shadow border border-surface-container-high/50">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full py-12 space-y-4 text-center">
                <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center">
                  <Send className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold">Message Sent!</h3>
                <p className="text-on-surface-variant">Thank you for reaching out to Qayam. One of our support representatives will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-secondary">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-surface-container-low border-0 rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-on-surface-variant/50"
                    placeholder="e.g. John Doe"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-secondary">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-surface-container-low border-0 rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-on-surface-variant/50"
                    placeholder="e.g. email@university.edu"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-secondary">Message</label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-surface-container-low border-0 rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-on-surface-variant/50 resize-y"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full bg-primary text-white py-4 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-secondary active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
                  <Send className="w-4 h-4" />
                  {isSubmitting ? "Sending Route..." : "Send Message"}
                </button>
              </form>
            )}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
