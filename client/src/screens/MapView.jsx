import { Search, Filter, Plus, Minus, Navigation, Heart, Wifi, Wind, User, Utensils, Shield, WashingMachine, Zap, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import Navbar from '../components/Navbar';
import { cn } from '@/src/lib/utils';

const hostels = [
  {
    id: 1,
    name: "The Heritage Residency",
    location: "University Town, Peshawar",
    price: "15,000",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgEfRv3mtLT11pnFTgntIX7dDMkaZ0kS30nGLr9QJpREbwPHKy8aK-ERRNIKRgO_ARJDXlyYgOSxIiqauHCzznxtzKE_xoyvu6Mhr0lPMqlxe56ayuiH2NMX7FAhNnsVq5I2FUudYCbOQiEj_CJuCsz5PSFgb6Dp4B2gTAiVgudPU7HLLN5AEI1M6AJGouIxnFbTt7PpvTh6R3KCZyMTUGolBz8viPOlXeitIOC0tkDwQGaLLmADJh5UgMELgKZSrraW0prGXvBwE",
    tag: "Featured Sanctuary",
    amenities: [
      { icon: Wifi, label: "Fiber" },
      { icon: Wind, label: "Full AC" },
      { icon: User, label: "Male" }
    ]
  },
  {
    id: 2,
    name: "Gulbahar Executive Hostel",
    location: "Gulbahar, Peshawar",
    price: "12,500",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAbghUxLUMkrzhpjfE1T0dyXP8OqSqL0QUy7W1YQSYZzMs98BlbgyBeyiGDkdxNICnogJZXPKZC3wEafmQuJOHorf1A-dWI5moPsw4MwNDtI1DBktdZL-SB_ydbzgrr7KCrnqwHgUs7iA4vgyfPDsZ3T1huOWjWO7WrxQRf0QUxqKap1v9siceiW8XDcArthfGr9VIQYapEUiIbj3OwyvCh7vjFgwYdNMDdHxjqG8bbQ5y8DQ67I-UPuktxJBPPqYoTl3pyvpsLpgU",
    tag: "Girls Only",
    tagColor: "bg-tertiary text-white",
    amenities: [
      { icon: Utensils, label: "3 Meals" },
      { icon: Shield, label: "24/7 CCTV" },
      { icon: User, label: "Female" }
    ]
  },
  {
    id: 3,
    name: "The Scholars' Inn",
    location: "Hayatabad Phase 3",
    price: "9,000",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpGOE-Nru7zS8Dhzuv1ytRaI8cRloSWBFU8ce615Gl3qHzLd2LmZIHLy6qmiwBY8uisHq65_HEQ6k0c9kgNDWDizcOpqiQ94S7_FQ2BDFlavVRJnRnczuZIIVACb1kNDmfSOi5AugGuAZocXwu3nMVnDBaZ7Ng_me2MJLrB7TIoQl4NfnE8Q2EuC2-D_42A-RPm2FdbVc61CeTGY91mKrOKTWcNVqvEMeiDpzWcvq_g1pNv8DMxXXuHWWgutLD8GB5ITM5JEcmbuY",
    amenities: [
      { icon: WashingMachine, label: "Laundry" },
      { icon: Zap, label: "Backup Generator" }
    ]
  }
];

export default function MapView() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Navbar />
      <main className="pt-20 flex-1 flex overflow-hidden">
        <section className="relative flex-1 hidden lg:block bg-surface-container-low overflow-hidden">
          <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10 w-full max-w-xl px-6">
            <div className="bg-surface-container-lowest/80 backdrop-blur-[15px] rounded-xl p-2 shadow-xl flex items-center gap-3">
              <div className="flex-1 flex items-center px-4 gap-3 bg-surface-container-low rounded-lg py-3">
                <Search className="w-4 h-4 text-primary" />
                <input className="bg-transparent border-none focus:ring-0 text-sm w-full font-medium placeholder:text-on-surface-variant/40" placeholder="Search by area, hostel name, or university..." type="text" />
              </div>
              <button className="flex items-center justify-center p-3 text-primary hover:bg-surface-container-high rounded-lg transition-colors">
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="w-full h-full bg-[#f0f9f4] relative">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#0b6947 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-1/3 left-1/4 group cursor-pointer">
              <div className="bg-primary text-white px-3 py-1 rounded-lg text-sm font-bold shadow-lg flex items-center gap-1 group-hover:scale-110 transition-transform">
                <span>₨12k</span>
              </div>
              <div className="mx-auto w-2 h-2 bg-primary rotate-45 -mt-1"></div>
            </motion.div>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1 }} className="absolute top-1/2 left-1/2 group cursor-pointer">
              <div className="bg-tertiary text-white px-3 py-1 rounded-lg text-sm font-bold shadow-lg flex items-center gap-1 group-hover:scale-110 transition-transform">
                <span>₨15k</span>
                <span className="text-[10px]">★</span>
              </div>
              <div className="mx-auto w-2 h-2 bg-tertiary rotate-45 -mt-1"></div>
            </motion.div>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }} className="absolute bottom-1/4 right-1/3 group cursor-pointer">
              <div className="bg-primary text-white px-3 py-1 rounded-lg text-sm font-bold shadow-lg flex items-center gap-1 group-hover:scale-110 transition-transform">
                <span>₨9.5k</span>
              </div>
              <div className="mx-auto w-2 h-2 bg-primary rotate-45 -mt-1"></div>
            </motion.div>
          </div>
          <div className="absolute bottom-10 right-6 flex flex-col gap-2">
            <button className="bg-surface-container-lowest p-3 rounded-xl shadow-lg text-primary hover:bg-surface-container-high transition-all"><Plus className="w-5 h-5" /></button>
            <button className="bg-surface-container-lowest p-3 rounded-xl shadow-lg text-primary hover:bg-surface-container-high transition-all"><Minus className="w-5 h-5" /></button>
            <button className="bg-surface-container-lowest p-3 rounded-xl shadow-lg text-primary hover:bg-surface-container-high mt-2 transition-all"><Navigation className="w-5 h-5" /></button>
          </div>
          <button className="absolute bottom-8 left-8 flex items-center gap-3 bg-tertiary text-white px-6 py-4 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all">
            <MapPin className="w-4 h-4" />
            <span className="font-bold uppercase tracking-widest text-xs">Request New Area</span>
          </button>
        </section>
        <section className="w-full lg:w-[480px] bg-surface flex flex-col border-l border-on-surface-variant/10">
          <div className="p-6 pb-2">
            <h1 className="text-2xl font-bold tracking-tight text-on-surface">Stay in Peshawar</h1>
            <p className="text-sm text-secondary font-medium mt-1">42 hostels available near your location</p>
            <div className="flex gap-2 mt-6 overflow-x-auto hide-scrollbar pb-2">
              <button className="px-4 py-2 bg-primary text-white rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap">Price: Low to High</button>
              <button className="px-4 py-2 bg-surface-container-high text-secondary rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap">Male Only</button>
              <button className="px-4 py-2 bg-surface-container-high text-secondary rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap">Female Only</button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-8 hide-scrollbar">
            {hostels.map((hostel) => (
              <div key={hostel.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-xl aspect-[16/9] mb-4">
                  <img className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" src={hostel.image} alt={hostel.name} referrerPolicy="no-referrer" />
                  {hostel.tag && (
                    <div className={cn("absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur", hostel.tagColor || "bg-surface-container-lowest/90 text-primary")}>
                      {hostel.tag}
                    </div>
                  )}
                  <button className="absolute top-4 right-4 text-white/90 hover:text-white transition-colors"><Heart className="w-6 h-6" /></button>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-on-surface leading-tight">{hostel.name}</h3>
                    <div className="flex items-center gap-2 mt-1"><MapPin className="w-4 h-4 text-tertiary" /><span className="text-sm text-on-surface-variant">{hostel.location}</span></div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-black text-primary">₨ {hostel.price}</div>
                    <div className="text-[10px] text-on-surface-variant font-bold uppercase tracking-tighter">Per Month</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-4">
                  {hostel.amenities?.map((amenity, i) => (
                    <div key={i} className="flex items-center gap-1 bg-secondary/10 px-2 py-1 rounded-lg">
                      <amenity.icon className="w-4 h-4 text-secondary" /><span className="text-[10px] font-bold text-secondary uppercase">{amenity.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <footer className="bg-surface-container-low p-6 flex items-center justify-between border-t border-on-surface-variant/10">
            <span className="text-[10px] uppercase tracking-widest text-on-surface-variant/60 font-bold">© 2024 Qayam</span>
            <div className="flex gap-4">
              <a className="text-[10px] uppercase tracking-widest text-secondary font-bold hover:text-primary transition-colors" href="#">Privacy</a>
              <a className="text-[10px] uppercase tracking-widest text-secondary font-bold hover:text-primary transition-colors" href="#">Terms</a>
            </div>
          </footer>
        </section>
      </main>
    </div>
  );
}
