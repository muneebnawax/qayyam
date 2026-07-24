import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { cn } from '@/src/lib/utils';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md px-8 h-20 max-w-full mx-auto shadow-sm">
      <div className="flex justify-between items-center h-full">
        <Link to="/" className="text-2xl font-black text-primary tracking-tighter">Qayam</Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className={cn(
              "font-medium text-sm tracking-tight transition-all duration-300 pb-1",
              location.pathname === '/' ? "text-primary border-b-2 border-primary" : "text-on-surface opacity-70 hover:opacity-100"
            )}
          >
            Discover
          </Link>
          <Link
            to="/areas"
            className={cn(
              "font-medium text-sm tracking-tight transition-all duration-300 pb-1",
              location.pathname === '/areas' ? "text-primary border-b-2 border-primary" : "text-on-surface opacity-70 hover:opacity-100"
            )}
          >
            Areas
          </Link>
          <Link
            to="/map"
            className={cn(
              "font-medium text-sm tracking-tight transition-all duration-300 pb-1",
              location.pathname === '/map' ? "text-primary border-b-2 border-primary" : "text-on-surface opacity-70 hover:opacity-100"
            )}
          >
            Map View
          </Link>
          <Link
            to="/contact"
            className={cn(
              "font-medium text-sm tracking-tight transition-all duration-300 pb-1",
              location.pathname === '/contact' ? "text-primary border-b-2 border-primary" : "text-on-surface opacity-70 hover:opacity-100"
            )}
          >
            Contact Us
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link to="/signup" className="hidden lg:block text-primary font-medium text-sm px-4 py-2 rounded-lg active:scale-95 transition-transform">
            List Your Hostel
          </Link>
          <Link to="/login" className="bg-primary text-white px-6 py-2.5 rounded-full font-semibold text-sm active:scale-95 transition-transform shadow-lg shadow-primary/20">
            Sign In
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-primary p-2 focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-surface-container-low border-b border-primary/10 shadow-lg flex flex-col px-8 py-6 gap-4 z-40">
          <Link to="/" onClick={() => setIsOpen(false)} className={cn("font-bold text-lg", location.pathname === '/' ? "text-primary" : "text-on-surface")}>Discover</Link>
          <Link to="/areas" onClick={() => setIsOpen(false)} className={cn("font-bold text-lg", location.pathname === '/areas' ? "text-primary" : "text-on-surface")}>Areas</Link>
          <Link to="/map" onClick={() => setIsOpen(false)} className={cn("font-bold text-lg", location.pathname === '/map' ? "text-primary" : "text-on-surface")}>Map View</Link>
          <Link to="/contact" onClick={() => setIsOpen(false)} className={cn("font-bold text-lg", location.pathname === '/contact' ? "text-primary" : "text-on-surface")}>Contact Us</Link>
          <div className="h-px bg-primary/10 my-2"></div>
          <Link to="/signup" onClick={() => setIsOpen(false)} className="text-primary font-bold text-lg">List Your Hostel / Warden Support</Link>
          <Link to="/login" onClick={() => setIsOpen(false)} className="bg-primary text-white text-center py-4 rounded-xl font-bold mt-2 shadow-sm">Sign In to Dashboard</Link>
        </div>
      )}
    </nav>
  );
}
