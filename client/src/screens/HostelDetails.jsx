import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { MapPin, Phone, User, Users, CheckCircle2, ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { cn } from '../lib/utils';

export default function HostelDetails() {
    const { id } = useParams();
    const [hostel, setHostel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeImageIdx, setActiveImageIdx] = useState(0);

    useEffect(() => {
        const fetchHostel = async () => {
            try {
                setLoading(true);
                const res = await fetch(`http://localhost:5000/api/hostels/${id}`);
                const data = await res.json();

                if (data.success) {
                    setHostel(data.data);
                } else {
                    setError(data.error || 'Failed to fetch hostel details');
                }
            } catch (err) {
                setError('Ensure backend server is running. ' + err.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchHostel();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-20">
                <div className="animate-pulse text-2xl font-bold text-primary">Loading Insights...</div>
            </div>
        );
    }

    if (error || !hostel) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-20 flex-col gap-4">
                <div className="text-xl text-error">{error || 'Hostel not found'}</div>
                <Link to="/" className="text-primary hover:underline font-medium">&larr; Return Home</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-surface">
            <Navbar />

            <main className="pt-24 pb-16 px-6 max-w-6xl mx-auto space-y-10">
                <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-secondary font-bold active:scale-95 transition-transform">
                    <ArrowLeft className="w-5 h-5" />
                    Back to Listings
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col gap-4 sticky top-28"
                    >
                        <div className="rounded-3xl overflow-hidden editorial-shadow h-[65vh] w-full bg-surface-container-low">
                            <img
                                src={(hostel.images && hostel.images.length > 0) ? hostel.images[activeImageIdx] : (hostel.image || 'https://via.placeholder.com/600x800')}
                                alt={hostel.name}
                                className="w-full h-full object-cover transition-opacity duration-500 rounded-3xl"
                            />
                        </div>
                        
                        {/* Thumbnail Strip */}
                        {hostel.images && hostel.images.length > 1 && (
                            <div className="flex gap-3 overflow-x-auto pb-2 snap-x hide-scrollbar flex-nowrap w-full">
                                {hostel.images.map((img, idx) => (
                                    <button 
                                        key={idx}
                                        onClick={() => setActiveImageIdx(idx)}
                                        className={cn(
                                            "flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden border-[3px] transition-all snap-start",
                                            activeImageIdx === idx ? "border-primary shadow-lg shadow-primary/20 scale-100" : "border-transparent scale-[0.95] opacity-60 hover:opacity-100 hover:scale-100"
                                        )}
                                    >
                                        <img src={img} alt={`Gallery view ${idx+1}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="py-6 space-y-8"
                    >
                        <div>
                            <div className="flex gap-2 mb-4">
                                <span className="px-3 py-1 bg-surface-container text-primary text-xs font-bold uppercase rounded-full tracking-widest">{hostel.gender}</span>
                                {hostel.tag && <span className="px-3 py-1 bg-primary text-white text-xs font-bold uppercase rounded-full tracking-widest">{hostel.tag}</span>}
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-on-surface mb-2">{hostel.name}</h1>
                            <div className="flex items-center gap-2 text-on-surface-variant font-medium text-lg">
                                <MapPin className="w-5 h-5 text-primary" /> {hostel.location}
                            </div>
                        </div>

                        <div className="bg-surface-container-lowest p-6 rounded-2xl editorial-shadow">
                            <p className="text-on-surface-variant uppercase text-xs font-bold tracking-widest mb-1">Pricing</p>
                            <div className="flex items-baseline gap-2 text-primary">
                                <span className="text-4xl font-black">₨ {hostel.price}</span>
                                <span className="text-on-surface-variant font-medium">/ month</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xl font-bold border-b border-surface-container pb-2">Facility Insights</h3>

                            <div className="grid grid-cols-2 gap-4 text-on-surface">
                                <div className="flex items-center gap-3">
                                    <Users className="w-5 h-5 text-secondary" />
                                    <span className="font-medium">Capacity: <span className="text-on-surface-variant">{hostel.capacity} Occupants</span></span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <User className="w-5 h-5 text-secondary" />
                                    <span className="font-medium">Warden: <span className="text-on-surface-variant">{hostel.wardenName}</span></span>
                                </div>
                                <div className="flex items-center gap-3 col-span-2">
                                    <Phone className="w-5 h-5 text-secondary" />
                                    <span className="font-medium">Contact: <span className="text-on-surface-variant">{hostel.contactNumber}</span></span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xl font-bold border-b border-surface-container pb-2">Included Amenities</h3>
                            <div className="flex flex-wrap gap-3">
                                {hostel.amenities && hostel.amenities.map((item, idx) => (
                                    <span key={idx} className="flex items-center gap-2 bg-surface-container-low px-4 py-2 rounded-xl text-sm font-bold text-on-surface">
                                        <CheckCircle2 className="w-4 h-4 text-primary" />
                                        {item}
                                    </span>
                                ))}
                                {(!hostel.amenities || hostel.amenities.length === 0) && (
                                    <p className="text-on-surface-variant italic text-sm">Amenities unspecified in database.</p>
                                )}
                            </div>
                        </div>

                        <div className="pt-6">
                            <a 
                                href={hostel.contactNumber ? `https://wa.me/${hostel.contactNumber.replace(/\D/g, '')}` : '#'}
                                target="_blank" 
                                rel="noreferrer"
                                className="block text-center w-full bg-primary hover:bg-secondary text-white py-4 rounded-xl font-black uppercase tracking-widest transition-colors active:scale-95 editorial-shadow">
                                Reserve Your Spot Now
                            </a>
                            <p className="text-center text-xs text-on-surface-variant font-medium mt-4">For immediate bookings, call the warden directly.</p>
                        </div>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
