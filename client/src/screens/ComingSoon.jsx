import { Link } from 'react-router-dom';
import { Hammer, Clock, ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ComingSoon() {
  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center pt-20 px-8">
        <div className="max-w-2xl w-full bg-surface-container-low rounded-[3rem] p-12 text-center editorial-shadow border border-surface-container-high/50">
          
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary animate-pulse">
                <Hammer className="w-12 h-12" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-surface-container-highest rounded-full flex items-center justify-center text-secondary shadow-lg">
                <Clock className="w-5 h-5" />
              </div>
            </div>
          </div>

          <h1 className="text-4xl font-headline font-black text-on-surface mb-4">Coming Soon</h1>
          <p className="text-on-surface-variant text-lg max-w-lg mx-auto mb-8">
            We are actively building this feature to make your hostel management experience even better. Stay tuned for the upcoming update!
          </p>

          <Link to="/dashboard" className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-secondary transition-all active:scale-95 shadow-lg shadow-primary/20">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
