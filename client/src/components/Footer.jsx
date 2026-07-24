import { Share2, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const handleShare = async () => {
    const shareData = {
      title: 'Qayam - Student Housing',
      text: 'Check out Qayam, the best verified student housing platform in the City of Flowers!',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy link:', err);
      }
    }
  };

  return (
    <footer className="bg-[#0b1f18] text-surface w-full py-16 px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="space-y-6 max-w-sm">
            <div className="text-2xl font-bold text-surface">Qayam</div>
            <p className="text-surface/60 text-sm leading-relaxed">
              Redefining the student housing experience in the heart of Khyber Pakhtunkhwa.
              We bridge the gap between quality living and academic success.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <p className="font-bold text-xs uppercase tracking-widest text-primary-fixed">Platform</p>
              <nav className="flex flex-col gap-3">
                <Link className="text-sm text-surface/60 hover:text-white transition-colors" to="/">Discover</Link>
                <Link className="text-sm text-surface/60 hover:text-white transition-colors" to="/map">Map View</Link>
                <Link className="text-sm text-surface/60 hover:text-white transition-colors" to="/dashboard">Hostel Owner</Link>
              </nav>
            </div>

            <div className="space-y-4">
              <p className="font-bold text-xs uppercase tracking-widest text-primary-fixed">Company</p>
              <nav className="flex flex-col gap-3">
                <Link className="text-sm text-surface/60 hover:text-white transition-colors" to="/privacy">Privacy Policy</Link>
                <Link className="text-sm text-surface/60 hover:text-white transition-colors" to="/terms">Terms of Service</Link>
                <Link className="text-sm text-surface/60 hover:text-white transition-colors" to="/contact">Contact Us</Link>
              </nav>
            </div>

            <div className="space-y-4 col-span-2 md:col-span-1">
              <p className="font-bold text-xs uppercase tracking-widest text-primary-fixed">Connect</p>
              <div className="flex gap-4">
                <button onClick={handleShare} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors hover:cursor-pointer" aria-label="Share">
                  <Share2 className="w-4 h-4" />
                </button>
                <a className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors" href="mailto:support@qayam.com">
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] tracking-wide uppercase text-surface/60">
            © 2026 Qayam - Your Home in the City of Flowers.
          </p>
          <div className="flex gap-8">
            <a className="text-[10px] tracking-wide uppercase text-surface/60 hover:text-white underline transition-colors" href="#">Support</a>
            <Link className="text-[10px] tracking-wide uppercase text-surface/60 hover:text-white transition-colors" to="/contact">Contact Us</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
