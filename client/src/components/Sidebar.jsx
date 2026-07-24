import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { cn } from '@/src/lib/utils';
import { LayoutDashboard, Building2, CalendarCheck, Wallet, Settings, HelpCircle, LogOut, Menu, X } from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Building2, label: 'Hostel Listings', href: '/management' },
  { icon: HelpCircle, label: 'Warden Guidance', href: '/warden-guidance' },
  { icon: CalendarCheck, label: 'Bookings', href: '/coming-soon' },
  { icon: Wallet, label: 'Revenue', href: '/coming-soon' },
  { icon: Settings, label: 'Settings', href: '/coming-soon' },
];

export default function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-surface-container-low border-b border-primary/10 flex items-center justify-between px-6 z-40">
        <h1 className="text-lg font-bold text-primary">Warden Portal</h1>
        <button onClick={() => setIsOpen(true)} className="text-primary p-2">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {isOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setIsOpen(false)} />
      )}

      <aside className={cn(
        "h-screen w-72 fixed left-0 top-0 bg-surface-container-low border-r border-primary/10 flex-col py-8 pl-0 pr-4 z-50 transition-transform duration-300",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        "flex"
      )}>
        <div className="flex justify-between items-center px-8 mb-10">
          <div>
            <h1 className="text-xl font-bold text-primary">Warden Portal</h1>
            <p className="text-xs text-secondary/60">Qayam Management</p>
          </div>
          <button onClick={() => setIsOpen(false)} className="lg:hidden text-secondary p-1">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex flex-col gap-1 flex-grow">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-4 px-8 py-3 transition-all duration-200",
                  isActive
                    ? "bg-primary-fixed text-primary font-semibold rounded-r-full"
                    : "text-secondary hover:bg-surface-container-high hover:translate-x-1"
                )}
              >
                <item.icon className={cn("w-5 h-5", isActive && "fill-current")} />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-8 px-8">
          <button className="w-full py-3 bg-primary text-white rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all">
            <span className="text-lg">+</span>
            Add New Entry
          </button>
        </div>

        <div className="mt-10 border-t border-primary/5 pt-6 space-y-1">
          <Link to="/coming-soon" onClick={() => setIsOpen(false)} className="flex items-center gap-4 px-8 py-3 text-secondary hover:bg-surface-container-high hover:translate-x-1 transition-all">
            <Settings className="w-5 h-5" />
            <span className="text-sm font-medium">Settings</span>
          </Link>
          <Link to="/contact" onClick={() => setIsOpen(false)} className="flex items-center gap-4 px-8 py-3 text-secondary hover:bg-surface-container-high hover:translate-x-1 transition-all">
            <HelpCircle className="w-5 h-5" />
            <span className="text-sm font-medium">Support</span>
          </Link>
        </div>

        <div className="mt-auto px-8 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center overflow-hidden">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyM7aR-jlrTcMKwh0meV2eqR71ZYbKqRbhfcI8B28ILRjQzwLBATQmt6_0K0HyZu-fxMGDieOhfMxrzsvVl5Ip8LK2uFis-IXxSjoxauZRNfHfXXPpsRuiJ-_G3tS-o3eUew5NYUzhlbUI4xSr0rZoI2cgH77ZYgjwEevnCfZVRHUnYZCkZLgT13QXwG6IH4rIouQFpl5Ab5JJdqdcbvirJCTfrl2GdgGHxVOXyQS9oKZhtCJ5SWGZVs4kPtto5JzY2JEj0QmMLQ8"
              alt="Warden Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-xs font-bold">Warden Ahmed</p>
            <p className="text-[10px] text-secondary/60">Senior Administrator</p>
          </div>
        </div>
      </aside>
    </>
  );
}
