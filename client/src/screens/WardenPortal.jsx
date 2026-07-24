import { Search, Filter, Download, Home, Edit, Trash2, ChevronLeft, ChevronRight, Ban } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import HostelForm from '../components/HostelForm';
import { cn } from '@/src/lib/utils';

export default function WardenPortal() {
  const [dynamicListings, setDynamicListings] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingHostel, setEditingHostel] = useState(null);
  const navigate = useNavigate();

  const fetchPortalData = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');

    try {
      const meRes = await fetch('http://localhost:5000/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const meData = await meRes.json();
      if (!meData.success) throw new Error('Not verified');

      const wardenId = meData.data._id;
      const hostelsRes = await fetch(`http://localhost:5000/api/hostels?warden=${wardenId}`);
      const hostelsData = await hostelsRes.json();

      if (hostelsData.success) {
        setDynamicListings(hostelsData.data);
      }
    } catch (err) {
      console.error(err);
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    fetchPortalData();
  }, [fetchPortalData]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this listing? This action cannot be undone.')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/hostels/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        fetchPortalData();
      } else {
        alert(data.error || 'Failed to delete.');
      }
    } catch (err) {
      console.error(err);
      alert('Network error occurred.');
    }
  };

  const openAddForm = () => {
    setEditingHostel(null);
    setIsFormOpen(true);
  };

  const openEditForm = (hostel) => {
    setEditingHostel(hostel);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingHostel(null);
  };

  const handleFormSuccess = () => {
    closeForm();
    fetchPortalData();
  };

  return (
    <div className="min-h-screen">
      <Sidebar />
      <main className="lg:ml-72 min-h-screen pt-24 p-6 lg:p-12">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <span className="text-[10px] uppercase tracking-[0.15em] text-secondary font-bold">Management Overview</span>
            <h2 className="text-[2.5rem] font-black text-on-surface tracking-tighter leading-none mt-2">Manage Listings</h2>
            <p className="text-on-surface-variant mt-4 max-w-md leading-relaxed opacity-80">Oversee and optimize your property portfolio within the Qayam ecosystem.</p>
          </div>
          {!isFormOpen && (
            <button onClick={openAddForm} className="px-8 py-4 bg-tertiary text-white rounded-full font-bold text-xs uppercase tracking-[0.05em] flex items-center gap-3 shadow-xl active:scale-95 transition-all">
              <Home className="w-4 h-4" />
              Add New Hostel
            </button>
          )}
        </header>

        {isFormOpen ? (
          <div className="max-w-4xl max-h-screen overflow-auto">
            <HostelForm 
              editingId={editingHostel?._id || null} 
              initialData={editingHostel} 
              onSuccess={handleFormSuccess} 
              onCancel={closeForm} 
            />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                { label: "Total Capacity", val: dynamicListings.reduce((sum, h) => sum + h.capacity, 0).toString(), unit: "Beds" },
                { label: "Monthly Revenue", val: "N/A", unit: "↑ 12%", border: true },
                { label: "Active Listings", val: dynamicListings.length.toString(), unit: "Units" },
                { label: "Occupancy Rate", val: "94%", progress: 94 }
              ].map((stat, i) => (
                <div key={i} className={cn("bg-surface-container-lowest p-6 rounded-xl shadow-sm flex flex-col justify-between", stat.border && "border-l-4 border-primary/20")}>
                  <span className="text-[10px] uppercase tracking-widest text-secondary/60 font-bold">{stat.label}</span>
                  <div className="mt-4">
                    <span className="text-3xl font-black text-primary tracking-tighter">{stat.val}</span>
                    {stat.unit && <span className={cn("text-xs ml-2", stat.unit.includes('↑') ? "text-primary" : "text-secondary")}>{stat.unit}</span>}
                    {stat.progress && (
                      <div className="w-full bg-surface-container h-1 rounded-full mt-2">
                        <div className="bg-tertiary h-full rounded-full" style={{ width: `${stat.progress}%` }}></div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-surface-container-low rounded-2xl overflow-hidden shadow-sm">
              <div className="p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-surface-container-lowest/50 backdrop-blur-md">
                <div className="relative w-full md:w-72">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary/40 w-4 h-4" />
                  <input className="w-full pl-10 pr-4 py-2 bg-background border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/20 transition-all" placeholder="Filter properties..." type="text" />
                </div>
                <div className="flex gap-4 w-full md:w-auto">
                  <button className="flex-1 md:flex-none flex justify-center items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-secondary hover:bg-surface-container-high rounded-lg transition-colors">
                    <Filter className="w-4 h-4" /> Status
                  </button>
                  <button className="flex-1 md:flex-none flex justify-center items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-secondary hover:bg-surface-container-high rounded-lg transition-colors">
                    <Download className="w-4 h-4" /> Export
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                <thead>
                  <tr className="text-left bg-surface-container-high/30">
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.1em] text-secondary/60">Property Details</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.1em] text-secondary/60">Status</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.1em] text-secondary/60">Revenue</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.1em] text-secondary/60">Occupancy</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.1em] text-secondary/60 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary/5">
                  {dynamicListings.length === 0 && (
                    <tr><td colSpan={5} className="py-10 text-center font-bold text-on-surface-variant">No hostels managed yet. Add one!</td></tr>
                  )}
                  {dynamicListings.map((item, i) => (
                    <tr key={i} className="group hover:bg-surface-container-lowest transition-colors">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <img src={item.image || "https://via.placeholder.com/400"} className="w-16 h-12 rounded-lg object-cover" alt={item.name} referrerPolicy="no-referrer" />
                          <div>
                            <p className="font-bold text-on-surface">{item.name}</p>
                            <p className="text-xs text-on-surface-variant/70">{item.location}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className={cn("px-3 py-1 text-[10px] font-bold uppercase rounded-full tracking-wider", "bg-primary/10 text-primary")}>
                          Active
                        </span>
                      </td>
                      <td className="px-8 py-6 font-medium text-sm">₨ {item.price || "N/A"}</td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 max-w-[80px] bg-surface-container h-1 rounded-full">
                            <div className={cn("h-full rounded-full", "bg-primary")} style={{ width: `70%` }}></div>
                          </div>
                          <span className="text-xs font-bold text-secondary">70%</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => openEditForm(item)} title="Edit Listing" className="w-8 h-8 rounded-full flex items-center justify-center text-secondary hover:bg-primary-fixed transition-colors"><Edit className="w-4 h-4" /></button>
                          <button onClick={() => handleDelete(item._id)} title="Delete Listing" className="w-8 h-8 rounded-full flex items-center justify-center text-error hover:bg-error/10 transition-colors"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
