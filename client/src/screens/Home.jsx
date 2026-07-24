import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Search, Map as MapIcon, Wifi, BadgeCheck, Navigation, Phone, MessageCircle, Shield, UtilityPole, CheckCircle, Snowflake, Droplets, MapPin, Building, Flame, Coffee, Camera, Star, HelpCircle, ChevronDown, ChevronUp, UserCheck, ShieldCheck, HeartHandshake } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { cn } from '@/src/lib/utils';

// Helper to calculate distance in km using Haversine formula
const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of Earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Map amenities to their appropriate Lucide generic icons
const amenityIconMap = {
  'WiFi': Wifi,
  'AC': Snowflake,
  'Geyser': Flame,
  'Laundry': Droplets,
  'Parking': Building,
  'Kitchen': Coffee,
  'Mess': Coffee,
  'UPS/Generator': UtilityPole,
  'CCTV': Camera,
  'Study Room': Shield,
  'Default': CheckCircle
};

const testimonials = [
  { name: "Ali Khan", university: "UET Peshawar", quote: "Finding a secure boys hostel used to be a massive headache. Using Qayam, I found a verified room right next to campus without paying an agent commission.", stars: 5 },
  { name: "Ayesha Ahmed", university: "Peshawar University", quote: "As a female student, safety and verified wardens are my number one priority. Qayam made it so transparent. Highly recommend for any student moving to the city.", stars: 5 },
  { name: "Usman Raza", university: "City University", quote: "The contact feature skipping the middle-man saved me thousands. Reached out on WhatsApp, booked the hostel directly. Unbelievably smooth experience.", stars: 4 },
];

const faqs = [
  { q: "Is Qayam completely free for students to use?", a: "Yes, our portal operates on a 0% commission model for students. You can search, browse, and directly contact wardens absolutely free of charge." },
  { q: "How do you ensure properties are verified?", a: "Wardens are required to submit verification proofs. Properties with 'Verified' badges have undergone explicit scrutiny for the safety of our users." },
  { q: "Can I contact the owner directly?", a: "Absolutely! We provide direct Dial and WhatsApp buttons on the listings. There is no middle-man. You talk directly with the property management." },
  { q: "Is there a refund policy if I book through the website?", a: "Currently, Qayam serves as an aggregation platform to connect you with wardens. Financial deposits happen directly with the hostel management subject to their specific policies." },
];

export default function Home() {
  const [allHostels, setAllHostels] = useState([]);
  const [dynamicHostels, setDynamicHostels] = useState([]);
  
  // Smart Search States
  const [cityFilter, setCityFilter] = useState("All Cities");
  const [locationFilter, setLocationFilter] = useState("All Areas");
  const [genderFilter, setGenderFilter] = useState("All Genders");
  
  const [loading, setLoading] = useState(true);
  const [locating, setLocating] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const fetchHostels = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:5000/api/hostels`);
      const data = await res.json();
      if (data.success) {
        setAllHostels(data.data);
        setDynamicHostels(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHostels();
  }, []);

  const handleSmartSearch = () => {
    let filtered = [...allHostels];
    if (cityFilter !== "All Cities") {
      filtered = filtered.filter(h => h.city?.toLowerCase() === cityFilter.toLowerCase());
    }
    if (locationFilter !== "All Areas") {
      filtered = filtered.filter(h => h.area?.toLowerCase() === locationFilter.toLowerCase() || h.location?.toLowerCase().includes(locationFilter.toLowerCase()));
    }
    if (genderFilter !== "All Genders") {
      const matchGender = genderFilter.replace(" Only", "");
      filtered = filtered.filter(h => h.gender?.toLowerCase() === matchGender.toLowerCase());
    }
    setDynamicHostels(filtered);
    window.scrollTo({ top: 800, behavior: 'smooth' });
  };

  const handleNearMe = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    
    setLocating(true);
    navigator.geolocation.getCurrentPosition((position) => {
      const userLat = position.coords.latitude;
      const userLng = position.coords.longitude;
      
      const hostelsWithDistance = allHostels.map(hostel => {
        if (!hostel.coordinates || !hostel.coordinates.lat || !hostel.coordinates.lng) {
          return { ...hostel, distance: Infinity };
        }
        const dist = getDistance(userLat, userLng, hostel.coordinates.lat, hostel.coordinates.lng);
        return { ...hostel, distance: dist };
      });
      
      hostelsWithDistance.sort((a, b) => a.distance - b.distance);
      
      setDynamicHostels(hostelsWithDistance);
      setLocating(false);
      window.scrollTo({ top: 800, behavior: 'smooth' });
    }, () => {
      alert("Unable to retrieve your location. Please ensure location services are enabled.");
      setLocating(false);
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-20">
        {/* Centered Hero Section with Original Colors */}
        <section className="relative min-h-[750px] flex flex-col items-center justify-center px-8 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              className="w-full h-full object-cover brightness-[0.70]"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-AEASaioC0PzjjJlh7quNiFxXQ0LybBu61pWG3ggK6GOEIl_mR--IbynLMU8DaoabmChIWJG_FHVNw1hQl90H1y-ok0T9bCUiDV4W1nCXObgWcyrhGiySoTXmWTAZayBv5Po_RLIMwbf5wapTFUdTbLwlAU_kbqra95_V3JLJhr0bULwXxgW5L1pWmpSaw8AgYm0O9VaGdWx6Z5inrNwoNE-zh-p7Y3_run5bLg_G8vcRG65oQpxQfNhXuR_t2o8CMYVmfwRwkcA"
              alt="Hero background"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background"></div>
          </div>

          <div className="relative z-10 max-w-4xl w-full text-center space-y-12 my-auto flex flex-col justify-center items-center h-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <span className="inline-flex items-center gap-2 px-5 py-2 bg-primary text-white rounded-full text-xs font-bold tracking-widest uppercase shadow-xl shadow-primary/20">
                <BadgeCheck className="w-4 h-4 text-white" />
                Verified Student Housing
              </span>
              <h1 className="text-5xl md:text-7xl font-headline font-black tracking-tighter text-white drop-shadow-lg">
                Find Sanctuary in the <span className="text-primary italic">City of Flowers</span>
              </h1>
              <p className="text-white/90 max-w-2xl mx-auto text-lg leading-relaxed font-medium drop-shadow-md">
                Find zero-commission, fully vetted boys and girls hostels near your university. Experience safety and comfort seamlessly with direct communication.
              </p>
            </motion.div>

            {/* Smart Tracking Engine (Restored Solid Colors & Centered) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="bg-surface/95 backdrop-blur-xl rounded-[2.5rem] p-4 editorial-shadow flex flex-col md:flex-row items-center gap-3 w-full border border-surface-container-high"
            >
              <div className="flex-1 flex items-center gap-3 px-6 py-4 bg-surface-container-low border border-surface-container-highest rounded-3xl w-full hover:bg-surface-container transition-colors">
                <MapPin className="w-5 h-5 text-primary" />
                <select
                  value={cityFilter}
                  onChange={(e) => setCityFilter(e.target.value)}
                  className="bg-transparent border-none focus:ring-0 text-on-surface font-bold text-sm w-full appearance-none">
                  <option value="All Cities">All Cities</option>
                  <option value="Peshawar">Peshawar</option>
                  <option value="Islamabad">Islamabad</option>
                </select>
              </div>

              <div className="flex-1 flex items-center gap-3 px-6 py-4 bg-surface-container-low border border-surface-container-highest rounded-3xl w-full hover:bg-surface-container transition-colors">
                <Building className="w-5 h-5 text-primary" />
                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="bg-transparent border-none focus:ring-0 text-on-surface font-bold text-sm w-full appearance-none">
                  <option value="All Areas">All Areas</option>
                  <option value="University Town">University Town</option>
                  <option value="Hayatabad">Hayatabad</option>
                  <option value="Board Bazaar">Board Bazaar</option>
                </select>
              </div>

              <div className="flex-1 flex items-center gap-3 px-6 py-4 bg-surface-container-low border border-surface-container-highest rounded-3xl w-full hover:bg-surface-container transition-colors">
                <Shield className="w-5 h-5 text-primary" />
                <select
                  value={genderFilter}
                  onChange={(e) => setGenderFilter(e.target.value)}
                  className="bg-transparent border-none focus:ring-0 text-on-surface font-bold text-sm w-full appearance-none">
                  <option value="All Genders">All Hostels Type</option>
                  <option value="Boys Only">Boys Only</option>
                  <option value="Girls Only">Girls Only</option>
                </select>
              </div>

              <button
                onClick={handleSmartSearch}
                className="bg-primary hover:bg-secondary text-white w-full md:w-auto px-10 py-5 rounded-3xl font-black text-sm uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2 shadow-xl shadow-primary/20">
                <Search className="w-5 h-5" />
                Search
              </button>
            </motion.div>
            
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.5 }}
               className="pt-4"
            >
              <button 
                onClick={handleNearMe}
                disabled={locating}
                className="group flex items-center gap-2 px-8 py-3 bg-white/10 backdrop-blur-md rounded-full text-white font-bold text-sm hover:bg-white/20 transition-all active:scale-95 border border-white/20 shadow-lg">
                <Navigation className={cn("w-4 h-4 text-primary group-hover:text-primary transition-colors", locating && "animate-spin")} />
                {locating ? "Acquiring SAT coordinates..." : "Use GPS to Find Verified Hostels Near Me"}
              </button>
            </motion.div>
          </div>
        </section>

        {/* Dynamic Listings Component moved up */}
        <section className="bg-surface pt-20">
          <div className="max-w-7xl mx-auto px-8 mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
            <div className="space-y-2">
              <h2 className="text-4xl font-headline font-black tracking-tight text-on-surface">Featured Hostels</h2>
              <p className="text-on-surface-variant font-medium text-lg">Showing {dynamicHostels.length} verified properties based on your active search.</p>
            </div>
            <Link to="/map" className="flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-full font-bold text-sm uppercase tracking-widest active:scale-95 transition-all editorial-shadow group">
              <MapIcon className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Interactive Map
            </Link>
          </div>

          <div className="max-w-7xl mx-auto px-8 pb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {loading ? (
                <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-20 text-xl font-bold text-primary animate-pulse">Loading amazing properties...</div>
              ) : dynamicHostels.map((hostel) => (
                <motion.div
                  key={hostel._id}
                  whileHover={{ y: -8 }}
                  className="group bg-surface-container-lowest rounded-[2rem] overflow-hidden editorial-shadow transition-all duration-500 border border-transparent hover:border-primary/30"
                >
                  <div className="relative h-64 overflow-hidden bg-surface-container">
                    <img
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      src={hostel.image || "https://via.placeholder.com/600"}
                      alt={hostel.name}
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                    
                    <div className="absolute top-4 left-4 flex gap-2 flex-wrap max-w-[80%]">
                      <span className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-widest text-primary shadow-sm">
                        {hostel.gender}
                      </span>
                      <span className="bg-primary text-white px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-widest shadow-sm">
                        NO COMMISSION
                      </span>
                    </div>
                    
                    <div className="absolute bottom-4 left-4 flex gap-2">
                      <h3 className="text-xl font-black text-white leading-tight drop-shadow-md flex items-center gap-2">
                         {hostel.name}
                         <BadgeCheck className="w-5 h-5 text-blue-400" />
                      </h3>
                    </div>
                  </div>
                  
                  <div className="p-8 space-y-6">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col">
                        <p className="text-sm font-semibold text-on-surface-variant flex items-center gap-1">
                          <MapPin className="w-4 h-4 text-primary" /> {hostel.area}, {hostel.city}
                        </p>
                        {hostel.distance !== undefined && hostel.distance !== Infinity && (
                          <p className="text-[10px] uppercase font-bold text-tertiary tracking-widest mt-1 ml-5">
                             {(hostel.distance).toFixed(1)} km away
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <span className="block text-2xl font-black text-primary leading-none">₨ {hostel.price}</span>
                        <span className="text-[10px] uppercase font-bold text-on-surface-variant tracking-widest mt-1 block">per month</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 flex-wrap h-16 overflow-hidden">
                      {hostel.amenities && hostel.amenities.slice(0, 3).map((amenity, i) => {
                        const IconComponent = amenityIconMap[amenity] || amenityIconMap['Default'];
                        return (
                          <div key={i} className="flex flex-col items-center justify-center w-16 h-16 bg-surface-container-low rounded-2xl border border-surface-container-high">
                            <IconComponent className="w-5 h-5 text-primary mb-1" />
                            <span className="text-[9px] font-bold text-center text-on-surface uppercase">{amenity.split('/')[0]}</span>
                          </div>
                        )
                      })}
                      {hostel.amenities && hostel.amenities.length > 3 && (
                        <div className="flex flex-col items-center justify-center w-16 h-16 bg-surface-container-low rounded-2xl border border-surface-container-high">
                          <span className="text-sm font-black text-secondary">+{hostel.amenities.length - 3}</span>
                          <span className="text-[9px] font-bold text-center text-on-surface uppercase">More</span>
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t border-surface-container-high flex gap-3">
                      <Link to={`/hostel/${hostel._id}`} className="w-full bg-primary hover:bg-secondary text-white py-4 flex items-center justify-center rounded-xl font-bold text-xs uppercase tracking-widest transition-colors active:scale-95 shadow-md">
                        View Details
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="bg-surface py-24 px-8 border-t border-surface-container-high/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl font-headline font-black text-on-surface">Why Choose Qayam?</h2>
              <p className="text-on-surface-variant max-w-2xl mx-auto">Skip the hassle of brokers and untrustworthy listings. We provide a transparent environment engineered for student success.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-surface-container-low p-10 rounded-[3rem] editorial-shadow text-center space-y-6">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                  <ShieldCheck className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black">Verified Wardens</h3>
                <p className="text-on-surface-variant">We strictly vet property owners and managers before their hostels are listed dynamically to maximize structural safety.</p>
              </div>
              <div className="bg-surface-container-low p-10 rounded-[3rem] editorial-shadow text-center space-y-6 border border-primary/20">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                  <HeartHandshake className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-primary">0% Commission</h3>
                <p className="text-on-surface-variant">Say goodbye to middlemen draining your budget. Students use this platform totally free, interacting directly with owners.</p>
              </div>
              <div className="bg-surface-container-low p-10 rounded-[3rem] editorial-shadow text-center space-y-6">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                  <UserCheck className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black">Direct Access</h3>
                <p className="text-on-surface-variant">Find a listing you like? The Warden's direct WhatsApp and cellular dial inputs are provided upfront for quick bookings.</p>
              </div>
            </div>
          </div>
        </section>

        {/* User Guidance / How It Works */}
        <section className="bg-surface-container-highest py-24 px-8 border-y border-surface-container-high/50">
          <div className="max-w-7xl mx-auto flex flex-col items-center">
            <span className="text-primary font-bold tracking-widest uppercase text-xs mb-3">Simple Process</span>
            <h2 className="text-4xl font-headline font-black text-on-surface mb-16 text-center">How to Find Your Best Hostel</h2>
            
            <div className="flex flex-col md:flex-row gap-8 w-full relative">
              <div className="hidden md:block absolute top-[40%] left-[10%] right-[10%] h-1 bg-surface-container-high z-0"></div>
              
              <div className="flex-1 flex flex-col items-center text-center space-y-4 z-10 relative">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center font-black text-2xl shadow-xl shadow-primary/20 mb-4">1</div>
                <h3 className="text-xl font-bold">Search & Filter</h3>
                <p className="text-on-surface-variant text-sm max-w-[200px]">Use our smart search or GPS to locate verified hostels matching your specific lifestyle needs.</p>
              </div>
              
              <div className="flex-1 flex flex-col items-center text-center space-y-4 z-10 relative">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center font-black text-2xl shadow-xl shadow-primary/20 mb-4">2</div>
                <h3 className="text-xl font-bold">Review & Verify</h3>
                <p className="text-on-surface-variant text-sm max-w-[200px]">Check out amenities, distances, and ensure the property carries our premium verified badge.</p>
              </div>
              
              <div className="flex-1 flex flex-col items-center text-center space-y-4 z-10 relative">
                <div className="w-16 h-16 bg-tertiary text-white rounded-full flex items-center justify-center font-black text-2xl shadow-xl shadow-tertiary/20 mb-4">3</div>
                <h3 className="text-xl font-bold">Contact Warden</h3>
                <p className="text-on-surface-variant text-sm max-w-[200px]">Hit the WhatsApp or Call button right on the card and establish terms directly with the owner.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-surface-container-lowest py-24 px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-headline font-black text-center mb-16 text-on-surface">What Our Students Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((t, i) => (
                <div key={i} className="bg-surface-container-low p-10 rounded-3xl editorial-shadow space-y-6">
                  <div className="flex gap-1">
                    {[...Array(t.stars)].map((_, idx) => (
                      <Star key={idx} className="w-5 h-5 fill-tertiary text-tertiary" />
                    ))}
                  </div>
                  <p className="text-lg font-medium text-on-surface-variant italic leading-relaxed">"{t.quote}"</p>
                  <div className="border-t border-surface-container-high pt-6 flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center font-bold text-primary text-xl uppercase">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="font-bold text-on-surface">{t.name}</p>
                      <p className="text-xs text-secondary">{t.university}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Frequently Asked Questions */}
        <section className="bg-surface py-24 px-8">
          <div className="max-w-3xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <span className="text-primary font-bold tracking-widest uppercase text-xs">Help Center</span>
              <h2 className="text-4xl font-headline font-black text-on-surface">Frequently Asked Questions</h2>
            </div>
            
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-surface-container-lowest rounded-2xl border border-surface-container-high overflow-hidden">
                  <button 
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full px-8 py-6 text-left flex justify-between items-center bg-surface-container-lowest hover:bg-surface-container-low transition-colors"
                  >
                    <span className="font-bold text-lg">{faq.q}</span>
                    {openFaq === i ? <ChevronUp className="w-5 h-5 text-primary" /> : <ChevronDown className="w-5 h-5 text-secondary" />}
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-8 pb-6 text-on-surface-variant border-t border-surface-container-high/50 pt-4"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
