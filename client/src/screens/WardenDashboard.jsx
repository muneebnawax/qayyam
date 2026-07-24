import React from 'react';
import { Building2, TrendingUp, Edit, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { cn } from '@/src/lib/utils';

export default function WardenDashboard() {
  const [hostels, setHostels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      const hasVisited = localStorage.getItem('hasVisited');
      if (!hasVisited) {
        localStorage.setItem('hasVisited', 'true');
        navigate('/signup');
      } else {
        navigate('/login');
      }
    }
  }, [navigate]);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const res = await fetch('http://localhost:5000/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const meData = await res.json();
      if (!meData.success) return;

      const wardenId = meData.data._id;
      const hostelRes = await fetch(`http://localhost:5000/api/hostels?warden=${wardenId}`);
      const hostelData = await hostelRes.json();

      if (hostelData.success) {
        setHostels(hostelData.data);
      }
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen">
      <Sidebar />
      <main className="lg:ml-72 min-h-screen pt-24 px-6 pb-8 lg:p-12">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12">
          <div>
            <h2 className="text-4xl font-black text-primary tracking-tighter mb-2">Warden Dashboard</h2>
            <p className="text-on-surface-variant font-medium">Quick analytics and property highlights.</p>
          </div>
          <button 
            onClick={() => navigate('/management')}
            className="bg-primary text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest active:scale-95 transition-transform shadow-xl">
            Go to Management Portal
          </button>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          <section className="xl:col-span-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-primary-container text-white p-6 rounded-xl flex flex-col justify-between h-36 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <TrendingUp className="w-20 h-20" />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-80 z-10">Total Asset Value</p>
                <p className="text-3xl font-black z-10">₨ {(hostels.length * 150000).toLocaleString()}</p>
              </div>
              <div className="bg-surface-container-lowest p-6 rounded-xl border border-primary/20 flex flex-col justify-between h-36 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 text-primary">
                  <Building2 className="w-20 h-20" />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary z-10">Active Properties</p>
                <p className="text-3xl font-black text-on-surface z-10">{hostels.length}</p>
              </div>
              <div 
                onClick={() => navigate('/warden-guidance')}
                className="bg-surface-container-lowest p-6 rounded-xl border border-primary/20 cursor-pointer hover:shadow-lg transition-shadow h-36 flex flex-col justify-center gap-2 group">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Need Help?</span>
                <h4 className="text-lg font-bold text-on-surface leading-tight">Read Warden Guidance Interface</h4>
                <div className="text-tertiary text-xs font-bold uppercase tracking-widest mt-1 group-hover:translate-x-1 transition-transform">
                  Learn Best Practices &rarr;
                </div>
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-xl overflow-hidden editorial-shadow">
              <div className="p-8 pb-4 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-on-surface">Recent Active Properties</h3>
                  <p className="text-xs text-on-surface-variant mt-1">A snapshot of your owned hostels. Add, edit or delete them from the Management view.</p>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-low">
                      <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-wider text-secondary">Hostel Data</th>
                      <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-wider text-secondary">Location</th>
                      <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-wider text-secondary">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container">
                    {hostels.length === 0 && (
                      <tr>
                        <td colSpan={3} className="px-8 py-6 text-center text-on-surface-variant text-sm">No hostels found. Head to the Management portal to add one!</td>
                      </tr>
                    )}
                    {hostels.map((hostel, i) => {
                      const status = "Active";
                      return (
                        <tr key={hostel._id || i} className="hover:bg-surface-container-high/30 transition-colors">
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-3">
                              <img src={hostel.image || 'https://via.placeholder.com/400x300'} className="w-12 h-12 rounded-lg object-cover" alt={hostel.name} referrerPolicy="no-referrer" />
                              <div>
                                <p className="text-sm font-bold text-on-surface">{hostel.name}</p>
                                <p className="text-[10px] text-on-surface-variant">{hostel.capacity} Beds • ₨ {hostel.price}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-6 text-xs font-medium text-on-surface-variant">{hostel.area || hostel.city || hostel.location}</td>
                          <td className="px-4 py-6">
                            <div className="flex items-center gap-2">
                              <div className={cn("w-10 h-5 rounded-full relative flex items-center px-1", status === 'Active' ? "bg-primary/20" : "bg-on-surface-variant/20")}>
                                <div className={cn("w-3 h-3 rounded-full absolute", status === 'Active' ? "bg-primary right-1" : "bg-on-surface-variant left-1")}></div>
                              </div>
                              <span className={cn("text-[10px] font-bold uppercase", status === 'Active' ? "text-primary" : "text-on-surface-variant")}>{status}</span>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
