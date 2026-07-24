import { Link } from 'react-router-dom';
import { Search, Filter, Bed, ArrowRight, ShieldCheck, Map as MapIcon, Quote } from 'lucide-react';
import { motion } from 'motion/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { cn } from '@/src/lib/utils';

const areas = [
  {
    name: "University Town",
    hub: "Academic Hub",
    count: 42,
    description: "Peshawar’s premiere educational district, offering a vibrant lifestyle for students and professionals alike.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAIZVFa8J3b43ZfaQiU4FYe2acSCcG4uMmiuzvKTGUEVej_5UxrriS0MdrHFaIrh-mN_QcmUjuzFnae3Zxfv2dIjrxOy42D4zg0gfKfD3i-gO9BtUt8sD_OSboqF9KZ-RUcsXbNGg5gudW9FemvFvHKAKv7x58mSM6Bp38XlA6197-NDckYfdL3GxDGX9q3xc7nZcGw-MbCSz-hUZNJyPTUadyCm9e5dwiRKvVYDLa1XEnB9kHa5TlP1Y6NriCXchZNkcoRih9IwSU",
    large: true
  },
  {
    name: "Hayatabad",
    count: 28,
    description: "A planned, serene residential sanctuary with wide roads and modern parks.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD_r3pXjH-jZsM2tld9C37Kgu8tXtVLW6pNQ6xtCOKmEGRG_3fVnC4NTBDDxGZsV9IYHrPEp-D200q42ZD4ezuKN87UgOmP8y_syJGRZhIShbCrmdEQcyRjiqN8ifIq3itVpL2UgG3vYAv58BhGu_IFzRwi64-GXJPx65NUWCss2Zw8GUsfxXCJNp3GYF1IgOcNdGjw7TysnE96i3E1rpP9hBzD7FyW4dSSq_qhitqEh77A27LLDaDYaHy7LlFrEX5OyQ-7HEiK0xs"
  },
  {
    name: "Board Bazaar",
    count: 15,
    description: "Energetic and central, perfect for those who love being in the heart of the action.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZzLlFW4V8uV5ZIkqmbnoFUqtH_ESMdPXj5CAAf362IHlFL76waKGcC-taQvYjhx5SKAR9WAAyh-wmdZknkjj9anHu4SY537-yJep3pbc2JH4PvHA9KuASjCQCuqOsqWVHItc5T6a5XGC9K1UntodUDlYUSt40nptiDIwBEtz3MQa6k0rCRXKmQY_giPt6GYVqjU6b4eAWOG-fo8f07xVvmY8U8q-pD9OkxqNR7mMYhBGpgqC1B82sspXPfRDTBIdv0sZ3KndhL-s"
  },
  {
    name: "Tehkal",
    count: 12,
    description: "Historic charm meets modern living in one of Peshawar's oldest neighborhoods.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA_4q9qke2Fb0r-Vw4WhgqKOZxQaE9l61K43rkjYX9FTJxTs7F_13HNIkCJy5p9RwMLpOURIQ70Y5_0Y_Z0OcoCw2hfSycsRYXJNT637OpYgd_cl9SxsqfUxB5J_xA_FpSap6YqIKl8S52EYy4Xzeec1Yw3P7TogyjodjTDR3D0YKqTw4dSRw2gaDfbf-rDaf2HlnQ65nGJffJN7uhnhKLIV7pFszgm8LUBtgXv2jg-zJknZP0BuZ7p325Gnv7TGa2IRoqdC6dGD-Y"
  },
  {
    name: "Saddar",
    count: 31,
    description: "The commercial heartbeat of the city, where everything is just a walk away.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCg5RTOcZl3a6XZhhjtcihznIGgceh5Dardbqip4S87ovuONrgluKPxKGZbP8zWSUsecig5tO8Nu5Sspc6jOeZBkHBXSugDloIbHpY1NGUUIMBeqffdL7WhZOcfctdPJVb_gjmeSEHJ790ZMR6ZtkqEPRwHEvoPuh6qlmfcMsks6B6j0TJEDQrYzhWIPSFBszTXyxE4rbRiQswPStNDzqFJoTaLKo8NsRmNqSXbppqvhYtcwlgH52jkOPV75DdAJbZ52RWReH9hp08"
  }
];

export default function AreasExplorer() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-32 pb-20 px-8 max-w-screen-2xl mx-auto">
        {/* Editorial Header Section */}
        <section className="mb-16 max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-[3.5rem] font-black leading-[1.1] tracking-tighter mb-6 text-on-surface"
          >
            Discover the <span className="text-primary">Soul</span> of Peshawar
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="leading-[1.6] text-on-surface-variant text-lg"
          >
            Explore our curated selection of neighborhoods. From the bustling academic hub of University Town to the serene residential enclaves of Hayatabad, find a sanctuary that feels like home.
          </motion.p>
        </section>

        {/* Floating Search Portal */}
        <section className="mb-20">
          <div className="bg-surface-container-lowest/80 backdrop-blur-[15px] p-4 rounded-xl shadow-[0_12px_40px_rgba(11,31,24,0.06)] flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 w-full relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/60 w-5 h-5" />
              <input
                className="w-full pl-12 pr-4 py-4 bg-transparent border-none focus:ring-0 text-on-surface placeholder:text-on-surface-variant/40 text-lg"
                placeholder="Search specific neighborhood..."
                type="text"
              />
            </div>
            <div className="h-10 w-px bg-on-surface-variant/10 hidden md:block"></div>
            <div className="flex gap-4 w-full md:w-auto">
              <button className="flex items-center gap-2 px-6 py-4 rounded-lg bg-surface-container-high text-on-surface-variant font-medium hover:bg-surface-container-highest transition-colors">
                <Filter className="w-4 h-4" />
                Filters
              </button>
              <button className="flex-1 md:flex-none bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary-container transition-all active:scale-95">
                Find Hostels
              </button>
            </div>
          </div>
        </section>

        {/* Bento Grid Layout */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {areas.map((area) => (
            <motion.div
              key={area.name}
              whileHover={{ scale: 1.02 }}
              className={cn(
                "group relative overflow-hidden rounded-xl bg-surface-container-low",
                area.large ? "md:col-span-8 h-[500px]" : "md:col-span-4 h-[400px]"
              )}
            >
              <img
                src={area.image}
                alt={area.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 via-on-surface/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-10 text-white">
                <div className="flex items-center gap-3 mb-4">
                  {area.hub && (
                    <span className="bg-tertiary text-white text-[0.75rem] font-bold uppercase tracking-[0.05em] px-3 py-1 rounded-full">
                      {area.hub}
                    </span>
                  )}
                  <span className="text-white/80 text-sm font-medium flex items-center gap-1">
                    <Bed className="w-4 h-4" /> {area.count} Available
                  </span>
                </div>
                <h2 className={cn("font-bold mb-3 tracking-tight", area.large ? "text-3xl" : "text-2xl")}>{area.name}</h2>
                <p className="text-white/80 max-w-md leading-relaxed mb-6">{area.description}</p>
                <Link to="/map" className={cn(
                  "flex items-center gap-2 transition-all",
                  area.large
                    ? "bg-white/20 backdrop-blur-md border border-white/30 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-white hover:text-primary"
                    : "text-white text-sm font-bold group/btn"
                )}>
                  Explore {area.large ? area.name : 'Area'}
                  {!area.large && <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />}
                </Link>
              </div>
            </motion.div>
          ))}
        </section>

        {/* Asymmetric Editorial Quote Section */}
        <section className="mt-32 flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2 relative">
            <div className="w-full aspect-square bg-surface-container-high rounded-xl overflow-hidden">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBk2eOteQiiUKjcDlMOeSe2nF8Y2Ur-6NVBbnucTLXMvR0CsZkfjuMwjV_antRobLt3o16gQAV7o6pHLhWfSU2U3H5d5VoMuiG0A1nHn9kJg2oYGYBUUgtCnTZ5d4wmoULvDcztDQR8o8LIDh2f-BdPkAn0Atu0scNB4M81qO04YHd3VbTjAbfLad4tDSMWza_HS_pjZMcBFMH0vhQUvslWCM73fxKVhlX_HVvs2wJL0EnvNz7brqZ57sCuijVzpG-rqHDUXOZ0QvM"
                alt="Community Life"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
            </div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              className="absolute -bottom-10 -right-10 bg-white p-8 rounded-xl shadow-xl hidden md:block max-w-xs"
            >
              <Quote className="text-tertiary w-10 h-10 mb-4" />
              <p className="text-on-surface font-medium italic mb-4">
                "Found a perfect spot in Hayatabad through Qayam. The area is quiet, safe, and close to my work."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary-fixed"></div>
                <div className="text-xs">
                  <p className="font-bold">Ahmed Khan</p>
                  <p className="text-on-surface-variant">Medical Professional</p>
                </div>
              </div>
            </motion.div>
          </div>
          <div className="md:w-1/2">
            <h3 className="text-[2.5rem] font-bold tracking-tight mb-8 leading-tight">
              We help you find the right <span className="text-primary italic">community</span>, not just a room.
            </h3>
            <div className="space-y-6">
              <div className="flex gap-6 items-start">
                <div className="p-3 bg-secondary/10 rounded-full">
                  <ShieldCheck className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Verified Safety</h4>
                  <p className="text-on-surface-variant leading-relaxed">
                    All listed areas are vetted for safety and security standards to ensure your peace of mind.
                  </p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="p-3 bg-secondary/10 rounded-full">
                  <MapIcon className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Proximity Guides</h4>
                  <p className="text-on-surface-variant leading-relaxed">
                    Detailed commute maps for students from all major Peshawar universities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Map View CTA */}
      <section className="bg-surface-container-low py-24">
        <div className="max-w-screen-2xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold mb-4">Prefer a Geographic View?</h2>
            <p className="text-on-surface-variant text-lg leading-relaxed">
              Switch to our interactive map to see hostel locations relative to your university, workplace, or preferred landmarks.
            </p>
          </div>
          <button className="bg-primary text-white px-12 py-5 rounded-full font-bold flex items-center gap-3 hover:shadow-xl hover:-translate-y-1 transition-all group">
            <MapIcon className="w-5 h-5" />
            Open Map View
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
